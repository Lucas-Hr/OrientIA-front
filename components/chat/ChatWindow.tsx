// components/chat/ChatWindow.tsx

"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  ChatMessage,
  OrientationFormData,
} from "@/types/chat";

import {
  ApiError,
  sendChatMessage,
  submitOrientationForm,
} from "@/lib/api";

import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import OrientationForm from "./OrientationForm";
import TypingIndicator from "./TypingIndicator";

import { Compass } from "lucide-react";


// ============================================================
// MESSAGE D'ACCUEIL
// ============================================================

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  kind: "text",
  content:
    "Bonjour ! Je suis l'assistant d'orientation de l'ISPM. Posez-moi une question sur les formations de l'ISPM ou demandez-moi une orientation personnalisée.",
  createdAt: Date.now(),
};


// ============================================================
// GENERATION D'ID
// ============================================================

function makeId(): string {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
}


// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================

export default function ChatWindow() {

  const [messages, setMessages] =
    useState<ChatMessage[]>([
      WELCOME_MESSAGE,
    ]);

  /*
   * Le backend RAG actuel ne gère pas encore
   * session_id dans son contrat.
   *
   * On conserve néanmoins cet état car il sera
   * utilisé lors de l'intégration complète
   * de l'orientation personnalisée.
   */
  const [sessionId, setSessionId] =
    useState<string | null>(null);

  const [isLoading, setIsLoading] =
    useState(false);

  const [pendingForm, setPendingForm] =
    useState(false);

  const [errorBanner, setErrorBanner] =
    useState<string | null>(null);

  const scrollRef =
    useRef<HTMLDivElement>(null);


  // ==========================================================
  // SCROLL AUTOMATIQUE
  // ==========================================================

  useEffect(() => {

    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });

  }, [
    messages,
    isLoading,
    pendingForm,
  ]);


  // ==========================================================
  // AJOUT D'UN MESSAGE
  // ==========================================================

  function pushMessage(
    message: ChatMessage
  ) {

    setMessages((previous) => [
      ...previous,
      message,
    ]);

  }


  // ==========================================================
  // ENVOI D'UNE QUESTION AU RAG
  // ==========================================================

  async function handleSend(
    text: string
  ) {

    const cleanedText =
      text.trim();

    if (
      !cleanedText ||
      isLoading
    ) {
      return;
    }

    setErrorBanner(null);

    // --------------------------------------------------------
    // Affichage immédiat du message utilisateur
    // --------------------------------------------------------

    pushMessage({
      id: makeId(),
      role: "user",
      kind: "text",
      content: cleanedText,
      createdAt: Date.now(),
    });

    setIsLoading(true);
    setPendingForm(false);


    try {

      // ------------------------------------------------------
      // Appel du backend
      // ------------------------------------------------------

      const response =
        await sendChatMessage(
          cleanedText,
          sessionId
        );


      /*
       * ======================================================
       * CONTRAT ACTUEL DU BACKEND RAG
       *
       * {
       *   answer: string,
       *   sources: Source[],
       *   chunks: number
       * }
       *
       * Il n'y a actuellement PAS de :
       *
       * - response.type
       * - response.message
       * - response.recommendations
       * - response.session_id
       * ======================================================
       */


      // ------------------------------------------------------
      // Affichage de la réponse RAG
      // ------------------------------------------------------

      pushMessage({
        id: makeId(),
        role: "assistant",
        kind: "text",
        content: response.answer,
        sources: response.sources,
        createdAt: Date.now(),
      });


    } catch (error) {

      setErrorBanner(
        error instanceof ApiError
          ? error.message
          : "Une erreur inattendue est survenue. Réessayez."
      );

    } finally {

      setIsLoading(false);

    }
  }


  // ==========================================================
  // ENVOI DU FORMULAIRE D'ORIENTATION
  // ==========================================================

  /*
   * Cette fonction est conservée pour la prochaine étape.
   *
   * Elle sera reconnectée au backend ML/orientation
   * lorsque nous intégrerons les endpoints correspondants.
   */

  async function handleFormSubmit(
    data: OrientationFormData
  ) {

    setErrorBanner(null);
    setIsLoading(true);
    setPendingForm(false);


    // --------------------------------------------------------
    // Affichage du profil côté utilisateur
    // --------------------------------------------------------

    pushMessage({
      id: makeId(),
      role: "user",
      kind: "form_summary",
      formData: data,
      createdAt: Date.now(),
    });


    try {

      /*
       * Appel actuellement défini dans lib/api.ts.
       *
       * Cette partie sera adaptée au contrat final
       * de l'endpoint d'orientation.
       */

      const response =
        await submitOrientationForm(
          data,
          sessionId
        );


      /*
       * Le backend RAG actuel ne renvoie pas encore
       * les propriétés :
       *
       * response.type
       * response.recommendations
       * response.session_id
       *
       * Nous vérifions donc d'abord si une réponse
       * RAG classique est disponible.
       */

      if (
        response &&
        "answer" in response
      ) {

        pushMessage({
          id: makeId(),
          role: "assistant",
          kind: "text",
          content: response.answer,
          sources: response.sources,
          createdAt: Date.now(),
        });

        return;
      }


      /*
       * Si le contrat d'orientation est implémenté
       * ultérieurement avec un format différent,
       * nous adapterons cette partie à ce moment-là.
       */

    } catch (error) {

      setErrorBanner(
        error instanceof ApiError
          ? error.message
          : "Une erreur inattendue est survenue. Réessayez."
      );

      /*
       * En cas d'échec, on permet à l'utilisateur
       * de resoumettre le formulaire.
       */

      setPendingForm(true);

    } finally {

      setIsLoading(false);

    }
  }


  // ==========================================================
  // INTERFACE
  // ==========================================================

  return (

    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-[#F7F5F1] shadow-xl ring-1 ring-[#1B2A4A]/10">


      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="flex items-center gap-3 bg-[#078B45]/70 px-5 py-4">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#078B45]">

          <Compass className="h-5 w-5" />

        </div>


        <div>

          <p className="text-sm font-semibold text-white">
            OrientIA
          </p>

          <p className="text-xs text-white/80">
            Trouvez la filière qui vous correspond
          </p>

        </div>

      </div>


      {/* =====================================================
          MESSAGES
          ===================================================== */}

      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto px-4 py-5"
      >

        {messages.map((message) => (

          <MessageBubble
            key={message.id}
            message={message}
          />

        ))}


        {/* ===================================================
            FORMULAIRE D'ORIENTATION
            =================================================== */}

        {pendingForm && (

          <div className="flex justify-start pl-0 sm:pl-10">

            <OrientationForm
              onSubmit={handleFormSubmit}
              disabled={isLoading}
            />

          </div>

        )}


        {/* ===================================================
            INDICATEUR DE CHARGEMENT
            =================================================== */}

        {isLoading && (
          <TypingIndicator />
        )}

      </div>


      {/* =====================================================
          MESSAGE D'ERREUR
          ===================================================== */}

      {errorBanner && (

        <div className="mx-4 mb-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 ring-1 ring-red-200">

          {errorBanner}

        </div>

      )}


      {/* =====================================================
          CHAMP DE SAISIE
          ===================================================== */}

      <ChatInput
        onSend={handleSend}
        disabled={
          isLoading ||
          pendingForm
        }
      />

    </div>
  );
}