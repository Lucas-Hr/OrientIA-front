// components/chat/ChatWindow.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessage, OrientationFormData } from "@/types/chat";
import { ApiError, sendChatMessage, submitOrientationForm } from "@/lib/api";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import OrientationForm from "./OrientationForm";
import TypingIndicator from "./TypingIndicator";
import { CompassIcon } from "./icons";

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  kind: "text",
  content:
    "Bonjour ! Je suis l'assistant d'orientation de l'ISPM. Posez-moi une question sur nos filières, ou dites-moi que vous voulez être orienté(e) pour que je vous aide à trouver la filière qui vous correspond.",
  createdAt: Date.now(),
};

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingForm, setPendingForm] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading, pendingForm]);

  function pushMessage(msg: ChatMessage) {
    setMessages((prev) => [...prev, msg]);
  }

  async function handleSend(text: string) {
    setErrorBanner(null);
    pushMessage({
      id: makeId(),
      role: "user",
      kind: "text",
      content: text,
      createdAt: Date.now(),
    });
    setIsLoading(true);
    setPendingForm(false);

    try {
      const res = await sendChatMessage(text, sessionId);
      setSessionId(res.session_id);

      if (res.content) {
        pushMessage({
          id: makeId(),
          role: "assistant",
          kind: "text",
          content: res.content,
          createdAt: Date.now(),
        });
      }

      if (res.type === "form_request") {
        setPendingForm(true);
      }
    } catch (err) {
      setErrorBanner(
        err instanceof ApiError
          ? err.message
          : "Une erreur inattendue est survenue. Réessayez."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFormSubmit(data: OrientationFormData) {
    setErrorBanner(null);
    setIsLoading(true);

    // Affiche un récapitulatif du profil envoyé, côté utilisateur.
    pushMessage({
      id: makeId(),
      role: "user",
      kind: "form_summary",
      formData: data,
      createdAt: Date.now(),
    });
    setPendingForm(false);

    try {
      const res = await submitOrientationForm({
        session_id: sessionId,
        serie_bac: data.serieBac,
        notes: data.notes.map((n) => ({ matiere: n.matiere, note: n.note })),
        carriere_envisagee: data.carriereEnvisagee,
        competences: data.competences,
        parcours_professionnel: data.parcoursProfessionnel ?? null,
      });
      setSessionId(res.session_id);

      pushMessage({
        id: makeId(),
        role: "assistant",
        kind: "text",
        content: res.content ?? "Voici mon analyse de votre profil.",
        createdAt: Date.now(),
      });
    } catch (err) {
      setErrorBanner(
        err instanceof ApiError
          ? err.message
          : "Une erreur inattendue est survenue. Réessayez."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-[#F7F5F1] shadow-xl ring-1 ring-[#1B2A4A]/10">
      {/* Header */}
      <div className="flex items-center gap-3 bg-[#F1F4F1] px-5 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4A24C]/15 text-[#D4A24C]">
          <CompassIcon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#078B45]">Assistant d&apos;orientation ISPM</p>
          <p className="text-xs text-[#050505]">Trouvez la filière qui vous correspond</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}

        {pendingForm && (
          <div className="flex justify-start pl-10">
            <OrientationForm onSubmit={handleFormSubmit} disabled={isLoading} />
          </div>
        )}

        {isLoading && <TypingIndicator />}
      </div>

      {/* Error banner */}
      {errorBanner && (
        <div className="mx-4 mb-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 ring-1 ring-red-200">
          {errorBanner}
        </div>
      )}

      {/* Input — désactivé pendant qu'un formulaire est en attente de saisie */}
      <ChatInput onSend={handleSend} disabled={isLoading || pendingForm} />
    </div>
  );
}
