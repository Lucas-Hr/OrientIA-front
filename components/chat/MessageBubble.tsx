// components/chat/MessageBubble.tsx

import type {
  ChatMessage,
  OrientationFormData,
  Recommendation,
} from "@/types/chat";

import {
  Compass,
  User,
} from "lucide-react";

const SERIE_LABELS: Record<string, string> = {
  A: "Série A",
  C: "Série C",
  D: "Série D",
  S: "Série S",
  OSE: "Série OSE",
  TECHNIQUE: "Série Technique",
  AUTRE: "Autre",
};

export default function MessageBubble({
  message,
}: {
  message: ChatMessage;
}) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-end gap-2.5 ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser
            ? "bg-[#1565C0] text-white"
            : "bg-white text-[#078B45] shadow-md"
        }`}
      >
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Compass className="h-4 w-4" />
        )}
      </div>

      <div
        className={`max-w-[82%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed shadow-sm ${
          isUser
            ? "rounded-br-sm bg-[#078B45] text-white"
            : "rounded-bl-sm bg-white text-[#2E3350] ring-1 ring-[#078B45]/10"
        }`}
      >
        {message.kind === "form_summary" &&
        message.formData ? (
          <FormSummary data={message.formData} />
        ) : message.kind === "recommendation" &&
          message.recommendations ? (
          <RecommendationList
            recommendations={
              message.recommendations
            }
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

function RecommendationList({
  recommendations,
}: {
  recommendations: Recommendation[];
}) {
  return (
    <div className="space-y-4">
      <p className="font-semibold text-[#1565C0]">
        Voici les parcours qui correspondent le
        mieux à votre profil :
      </p>

      <div className="space-y-3">
        {recommendations.map(
          (recommendation, index) => {
            const percentage =
              recommendation.probabilite * 100;

            return (
              <div
                key={`${recommendation.parcours}-${index}`}
                className="rounded-xl border border-[#078B45]/10 bg-[#F7F5F1] p-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-[#2E3350]">
                    {index + 1}.{" "}
                    {recommendation.parcours}
                  </span>

                  <span className="font-semibold text-[#078B45]">
                    {percentage.toFixed(1)} %
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-[#078B45]"
                    style={{
                      width: `${Math.min(
                        percentage,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

function FormSummary({
  data,
}: {
  data: OrientationFormData;
}) {
  return (
    <div className="space-y-3 text-xs">
      <p className="font-semibold uppercase tracking-wide text-[#1565C0]">
        Profil envoyé
      </p>

      <div>
        <span className="font-medium opacity-70">
          Série du BAC :
        </span>{" "}
        {SERIE_LABELS[data.serie_bac] ??
          data.serie_bac}
      </div>

      <div>
        <p className="mb-1 font-medium opacity-70">
          Notes scolaires :
        </p>

        <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
          <li>
            Maths : {data.note_mathematiques}/20
          </li>
          <li>
            Physique : {data.note_physique_chimie}/20
          </li>
          <li>
            SVT : {data.note_svt_biologie}/20
          </li>
          <li>
            Français : {data.note_francais}/20
          </li>
          <li>
            Anglais : {data.note_anglais}/20
          </li>
          <li>
            Histoire-Géo : {data.note_histoire_geo}/20
          </li>
          <li>
            Éco-Gestion :
            {" "}
            {data.note_economie_gestion}/20
          </li>
          <li>
            Informatique :
            {" "}
            {data.note_informatique_nsi}/20
          </li>
        </ul>
      </div>

      <div className="space-y-1">
        <div>
          <span className="font-medium opacity-70">
            Matières préférées :
          </span>{" "}
          {data.matieres_preferees.join(", ")}
        </div>

        <div>
          <span className="font-medium opacity-70">
            Compétences :
          </span>{" "}
          {data.competences_declarees.join(", ")}
        </div>

        <div>
          <span className="font-medium opacity-70">
            Centres d&apos;intérêt :
          </span>{" "}
          {data.centres_interet.join(", ")}
        </div>

        <div>
          <span className="font-medium opacity-70">
            Activités :
          </span>{" "}
          {data.activites_projets.join(", ")}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-2">
        <div>
          <span className="font-medium opacity-70">
            Préférence professionnelle :
          </span>{" "}
          {data.preference_professionnelle}
        </div>

        <div>
          <span className="font-medium opacity-70">
            Environnement :
          </span>{" "}
          {data.environnement_travail_souhaite}
        </div>
      </div>
    </div>
  );
}