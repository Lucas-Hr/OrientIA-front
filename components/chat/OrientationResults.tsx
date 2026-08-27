"use client";

import type {
  Recommendation,
} from "@/types/chat";


interface Props {
  recommendations: Recommendation[];
}


export default function OrientationResults({
  recommendations,
}: Props) {

  if (
    !recommendations ||
    recommendations.length === 0
  ) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-4 text-sm text-gray-500">
        Aucune recommandation n&apos;a été générée.
      </div>
    );
  }


  return (
    <div className="space-y-3">

      <div>
        <p className="font-semibold text-[#092328]">
          Parcours recommandés
        </p>

        <p className="mt-1 text-xs text-gray-500">
          Voici les parcours classés par le modèle
          d&apos;orientation selon votre profil.
        </p>
      </div>


      <div className="space-y-2">

        {recommendations.map(
          (recommendation, index) => {

            const percentage =
              Math.round(
                recommendation.probabilite * 100
              );

            return (
              <div
                key={`${recommendation.parcours}-${index}`}
                className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
              >

                <div className="flex items-center justify-between gap-3">

                  <div className="flex items-center gap-3">

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1565C0] text-sm font-bold text-white">
                      {index + 1}
                    </div>

                    <p className="text-sm font-semibold text-[#2E3350]">
                      {recommendation.parcours}
                    </p>

                  </div>

                  <span className="text-sm font-bold text-[#078B45]">
                    {percentage}%
                  </span>

                </div>


                <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">

                  <div
                    className="h-full rounded-full bg-[#078B45]"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(
                          0,
                          percentage
                        )
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