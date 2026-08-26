// components/chat/MessageBubble.tsx
import type { ChatMessage } from "@/types/chat";
import { CompassIcon, UserIcon } from "./icons";

const SERIE_LABELS: Record<string, string> = {
  A: "Série A — Littéraire",
  C: "Série C — Maths & Sciences Physiques",
  D: "Série D — Maths & Sciences de la Vie et de la Terre",
  OSE: "Série OSE — Option Sciences Économiques",
  TECHNIQUE: "Série Technique",
};

export default function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex items-end gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser ? "bg-[#D4A24C]/20 text-[#1B2A4A]" : "bg-[#1B2A4A] text-[#D4A24C]"
        }`}
      >
        {isUser ? <UserIcon className="w-4 h-4" /> : <CompassIcon className="w-4 h-4" />}
      </div>

      <div
        className={`max-w-[78%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed shadow-sm ${
          isUser
            ? "rounded-br-sm bg-[#1B2A4A] text-white"
            : "rounded-bl-sm bg-white text-[#2E3350] ring-1 ring-[#1B2A4A]/10"
        }`}
      >
        {message.kind === "form_summary" && message.formData ? (
          <FormSummary data={message.formData} />
        ) : (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}
      </div>
    </div>
  );
}

function FormSummary({ data }: { data: ChatMessage["formData"] }) {
  if (!data) return null;
  return (
    <div className="space-y-1.5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#D4A24C]">
        Profil envoyé
      </p>
      <p>
        <span className="opacity-70">Série du BAC :</span>{" "}
        {SERIE_LABELS[data.serieBac] ?? data.serieBac}
      </p>
      <p>
        <span className="opacity-70">Notes :</span>{" "}
        {data.notes.map((n) => `${n.matiere} (${n.note}/20)`).join(", ") || "—"}
      </p>
      <p>
        <span className="opacity-70">Carrière envisagée :</span> {data.carriereEnvisagee}
      </p>
      <p>
        <span className="opacity-70">Compétences :</span> {data.competences.join(", ") || "—"}
      </p>
      {data.aUneExperiencePro && (
        <p>
          <span className="opacity-70">Parcours professionnel :</span>{" "}
          {data.parcoursProfessionnel}
        </p>
      )}
    </div>
  );
}
