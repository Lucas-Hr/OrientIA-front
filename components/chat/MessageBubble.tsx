// components/chat/MessageBubble.tsx
import type {
  ChatMessage,
  OrientationFormData,
  OrientationResult,
} from "@/types/chat";
import { Compass,User } from "lucide-react";

const SERIE_LABELS: Record<string, string> = {
  A2: "Série A2",
  C: "Série C",
  D: "Série D",
  S: "Série S",
  Techniques_agricoles: "Techniques agricoles",
  Toute_serie: "Toute série",
};

export default function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex items-end gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser ? "bg-[#1565C0] text-white" : "text-[#078B45] bg-white shadow-md"
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Compass className="w-4 h-4"/>}
      </div>

      <div
        className={`max-w-[78%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed shadow-sm ${
          isUser
            ? "rounded-br-sm bg-[#078B45] text-white"
            : "rounded-bl-sm bg-white text-[#2E3350] ring-1 ring-[#078B45]/10"
        }`}
      >
        {message.kind === "form_summary" &&
        message.formData ? (
          <FormSummary data={message.formData} />
        ) : message.kind === "orientation_result" &&
          message.orientationResult ? (
          <OrientationResultView
            data={message.orientationResult}
          />
        ) : (
          <p className="whitespace-pre-wrap">
            {message.content}
          </p>
        )}
      </div>
    </div>
  );
}

function FormSummary({ data }: { data: OrientationFormData }) {
  if (!data) return null;

  return (
    <div className="space-y-2 text-xs">
      <p className="mb-2 font-semibold uppercase tracking-wide text-[#1565C0]">
        Profil envoyé
      </p>

      {/* Série du BAC */}
      <div>
        <span className="opacity-70 font-medium">Série du BAC :</span>{" "}
        {SERIE_LABELS[data.serie_bac] ?? data.serie_bac}
      </div>

      {/* Notes */}
      <div className="pt-1">
        <p className="opacity-70 font-medium mb-1">Notes scolaires :</p>
        <ul className="grid grid-cols-2 gap-x-2 gap-y-0.5 pl-2 list-disc list-inside opacity-90">
          <li>Maths : {data.note_mathematiques}/20</li>
          <li>Physique : {data.note_physique_chimie}/20</li>
          <li>SVT : {data.note_svt_biologie}/20</li>
          <li>Français : {data.note_francais}/20</li>
          <li>Anglais : {data.note_anglais}/20</li>
          <li>Histo-Géo : {data.note_histoire_geo}/20</li>
          <li>Éco-Gestion : {data.note_economie_gestion}/20</li>
          <li>Info / NSI : {data.note_informatique_nsi}/20</li>
        </ul>
      </div>

      {/* Profil & Aptitudes */}
      <div className="pt-1 space-y-1">
        <div>
          <span className="opacity-70 font-medium">Matières préférées :</span>{" "}
          {data.matieres_preferees}
        </div>
        <div>
          <span className="opacity-70 font-medium">Compétences :</span>{" "}
          {data.competences_declarees}
        </div>
        <div>
          <span className="opacity-70 font-medium">Centres d&apos;intérêt :</span>{" "}
          {data.centres_interet}
        </div>
        <div>
          <span className="opacity-70 font-medium">Activités & Projets :</span>{" "}
          {data.activites_projets}
        </div>
      </div>

      {/* Préférences Pro */}
      <div className="pt-1 space-y-1 border-t border-white/10">
        <div>
          <span className="opacity-70 font-medium">Préférence pro :</span>{" "}
          {data.preference_professionnelle}
        </div>
        <div>
          <span className="opacity-70 font-medium">Environnement souhaité :</span>{" "}
          {data.environnement_travail_souhaite}
        </div>
      </div>
    </div>
  );
}

function OrientationResultView({
  data,
}: {
  data: OrientationResult;
}) {
  return (
    <div className="space-y-4">
      <div>
        <p className="font-semibold text-[#1565C0]">
          🎓 Recommandations d&apos;orientation
        </p>

        <p className="mt-1 text-xs text-gray-500">
          Voici les parcours les mieux classés pour
          votre profil.
        </p>
      </div>

      <div className="space-y-2">
        {data.resultats.map((resultat, index) => (
          <div
            key={resultat.parcours}
            className="rounded-xl border border-[#078B45]/15 bg-[#F7F5F1] p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#2E3350]">
                  {index === 0 && "🥇 "}
                  {index === 1 && "🥈 "}
                  {index === 2 && "🥉 "}
                  {resultat.parcours}
                </p>
              </div>

              <span className="text-sm font-semibold text-[#078B45]">
                {(resultat.probabilite * 100).toFixed(1)} %
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-[#078B45]"
                style={{
                  width: `${Math.min(
                    resultat.probabilite * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-gray-400">
        Modèle utilisé : {data.modele}
      </p>
    </div>
  );
}