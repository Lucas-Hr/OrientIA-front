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

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  kind: "text",
  content:
    "Bonjour ! Je suis l'assistant d'orientation de l'ISPM. Posez-moi une question sur les formations de l'ISPM ou demandez-moi une orientation personnalisée.",
  createdAt: Date.now(),
};

function makeId(): string {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
}

export default function ChatWindow() {
  const [messages, setMessages] =
    useState<ChatMessage[]>([
      WELCOME_MESSAGE,
    ]);

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

  function pushMessage(
    message: ChatMessage
  ) {
    setMessages((previous) => [
      ...previous,
      message,
    ]);
  }

  async function handleSend(
    text: string
  ) {
    const cleanedText = text.trim();

    if (!cleanedText || isLoading) {
      return;
    }

    setErrorBanner(null);

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
      const response =
        await sendChatMessage(
          cleanedText,
          sessionId
        );

      setSessionId(
        response.session_id
      );

      /*
       * Réponse générale du backend.
       */
      if (response.type === "answer") {
        pushMessage({
          id: makeId(),
          role: "assistant",
          kind: "text",
          content: response.message,
          sources: response.sources,
          createdAt: Date.now(),
        });

        return;
      }

      /*
       * Le backend demande le formulaire.
       */
      if (
        response.type === "formrequest"
      ) {
        pushMessage({
          id: makeId(),
          role: "assistant",
          kind: "form_request",
          content: response.message,
          createdAt: Date.now(),
        });

        setPendingForm(true);

        return;
      }

      /*
       * Le backend peut également retourner
       * directement une recommandation.
       */
      if (
        response.type === "recommendation" &&
        response.recommendations
      ) {
        pushMessage({
          id: makeId(),
          role: "assistant",
          kind: "recommendation",
          content:
            response.message ||
            "Voici les parcours correspondant le mieux à votre profil.",
          recommendations:
            response.recommendations.resultats,
          sources: response.sources,
          createdAt: Date.now(),
        });
        return;
      }
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

  async function handleFormSubmit(
    data: OrientationFormData
  ) {
    setErrorBanner(null);
    setIsLoading(true);
    setPendingForm(false);

    /*
     * Affiche le profil envoyé côté utilisateur.
     */
    pushMessage({
      id: makeId(),
      role: "user",
      kind: "form_summary",
      formData: data,
      createdAt: Date.now(),
    });

    try {
      const response =
        await submitOrientationForm(
          data,
          sessionId
        );

      setSessionId(
        response.session_id
      );

      /*
       * Le cas attendu :
       * type = recommendation
       */
      if (
        response.type === "recommendation" &&
        response.recommendations
      ) {
        pushMessage({
          id: makeId(),
          role: "assistant",
          kind: "recommendation",
          content:
            response.message ||
            "Voici les parcours correspondant le mieux à votre profil.",
          recommendations:
            response.recommendations.resultats,
          createdAt: Date.now(),
        });

        return;
      }

      /*
       * Cas où le backend répond simplement.
       */
      if (
        response.type === "answer"
      ) {
        pushMessage({
          id: makeId(),
          role: "assistant",
          kind: "text",
          content: response.message,
          createdAt: Date.now(),
        });

        return;
      }

      /*
       * Sécurité : si le backend demande
       * à nouveau le formulaire.
       */
      if (
        response.type === "formrequest"
      ) {
        pushMessage({
          id: makeId(),
          role: "assistant",
          kind: "form_request",
          content: response.message,
          createdAt: Date.now(),
        });

        setPendingForm(true);
      }
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

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-[#F7F5F1] shadow-xl ring-1 ring-[#1B2A4A]/10">
      {/* Header */}
      <div className="flex items-center gap-3 bg-[#078B45]/70 px-5 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#078B45]">
          <Compass className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm font-semibold text-white">
            Assistant d&apos;orientation ISPM
          </p>

          <p className="text-xs text-white/80">
            Trouvez la filière qui vous correspond
          </p>
        </div>
      </div>

      {/* Messages */}
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

        {pendingForm && (
          <div className="flex justify-start pl-0 sm:pl-10">
            <OrientationForm
              onSubmit={handleFormSubmit}
              disabled={isLoading}
            />
          </div>
        )}

        {isLoading && (
          <TypingIndicator />
        )}
      </div>

      {/* Erreur */}
      {errorBanner && (
        <div className="mx-4 mb-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 ring-1 ring-red-200">
          {errorBanner}
        </div>
      )}

      {/* Champ de chat */}
      <ChatInput
        onSend={handleSend}
        disabled={
          isLoading || pendingForm
        }
      />
    </div>
  );
}