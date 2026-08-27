// components/chat/MessageBubble.tsx

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type {
  ChatMessage,
  OrientationFormData,
  Recommendation,
  Source,
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
            ? "bg-white text-[#1565C0] shadow-md"
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
          <>
            <div
              className={
                isUser
                  ? "prose prose-sm max-w-none prose-p:text-white prose-headings:text-white prose-strong:text-white prose-li:text-white"
                  : "prose prose-sm max-w-none prose-p:text-[#2E3350] prose-headings:text-[#092328] prose-strong:text-[#092328] prose-li:text-[#2E3350]"
              }
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => (
                    <p className="mb-2 last:mb-0 whitespace-pre-wrap">
                      {children}
                    </p>
                  ),

                  h1: ({ children }) => (
                    <h1 className="mb-3 mt-2 text-lg font-bold">
                      {children}
                    </h1>
                  ),

                  h2: ({ children }) => (
                    <h2 className="mb-2 mt-3 text-base font-bold">
                      {children}
                    </h2>
                  ),

                  h3: ({ children }) => (
                    <h3 className="mb-2 mt-3 text-[15px] font-bold">
                      {children}
                    </h3>
                  ),

                  ul: ({ children }) => (
                    <ul className="mb-3 ml-5 list-disc space-y-1">
                      {children}
                    </ul>
                  ),

                  ol: ({ children }) => (
                    <ol className="mb-3 ml-5 list-decimal space-y-1">
                      {children}
                    </ol>
                  ),

                  li: ({ children }) => (
                    <li className="pl-1">
                      {children}
                    </li>
                  ),

                  strong: ({ children }) => (
                    <strong className="font-bold">
                      {children}
                    </strong>
                  ),

                  em: ({ children }) => (
                    <em>{children}</em>
                  ),

                  hr: () => (
                    <hr
                      className={
                        isUser
                          ? "my-3 border-white/30"
                          : "my-3 border-gray-200"
                      }
                    />
                  ),

                  blockquote: ({ children }) => (
                    <blockquote
                      className={
                        isUser
                          ? "my-2 border-l-4 border-white/40 pl-3 italic"
                          : "my-2 border-l-4 border-[#078B45]/30 pl-3 italic"
                      }
                    >
                      {children}
                    </blockquote>
                  ),

                  code: ({
                    children,
                    className,
                  }) => (
                    <code
                      className={
                        className
                          ? className
                          : isUser
                            ? "rounded bg-white/10 px-1 py-0.5 text-sm"
                            : "rounded bg-gray-100 px-1 py-0.5 text-sm"
                      }
                    >
                      {children}
                    </code>
                  ),

                  a: ({
                    children,
                    href,
                  }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        isUser
                          ? "font-medium underline"
                          : "font-medium text-[#1565C0] underline"
                      }
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {message.content ?? ""}
              </ReactMarkdown>
            </div>

            {message.sources &&
              message.sources.length > 0 && (
                <SourceList
                  sources={message.sources}
                />
              )}
          </>
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
      <p className="font-semibold text-[#092328]">
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
      <p className="font-semibold uppercase tracking-wide text-white">
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

function SourceList({
  sources,
}: {
  sources: Source[];
}) {
  return (
    <div className="mt-4 border-t border-gray-200 pt-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#1565C0]">
        Sources consultées
      </p>

      <div className="space-y-2">
        {sources.map((source, index) => {
          const sourceTitle =
            source.title ||
            source.name ||
            `Source ${index + 1}`;

          return (
            <div
              key={
                source.id ??
                `${sourceTitle}-${index}`
              }
              className="rounded-lg bg-[#F7F5F1] p-3 text-xs ring-1 ring-[#078B45]/10"
            >
              <div className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#078B45]/10 text-[10px] font-bold text-[#078B45]">
                  {index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  {source.url ? (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#1565C0] underline"
                    >
                      {sourceTitle}
                    </a>
                  ) : (
                    <p className="font-semibold text-[#2E3350]">
                      {sourceTitle}
                    </p>
                  )}

                  {source.excerpt && (
                    <p className="mt-1 whitespace-pre-wrap leading-relaxed text-gray-500">
                      {source.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}