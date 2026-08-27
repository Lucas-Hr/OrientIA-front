"use client";

import { useState } from "react";
import type { OrientationFormData } from "@/types/chat";

interface Props {
  onSubmit: (data: OrientationFormData) => void;
  disabled?: boolean;
}


// ============================================================
// SERIES BAC
// ============================================================

const SERIES_BAC = [
  {
    value: "A2",
    label: "Série A2",
  },
  {
    value: "C",
    label: "Série C",
  },
  {
    value: "D",
    label: "Série D",
  },
  {
    value: "S",
    label: "Série S",
  },
  {
    value: "Techniques_agricoles",
    label: "Techniques agricoles",
  },
  {
    value: "Toute_serie",
    label: "Toutes séries",
  },
];


// ============================================================
// MATIERES
// ============================================================

const SUBJECTS = [
  "Anglais",
  "Economie_Gestion",
  "Francais",
  "Histoire_Geo",
  "Informatique_NSI",
  "Mathematiques",
  "Physique_Chimie",
  "SVT_Biologie",
];


// ============================================================
// COMPETENCES
// ============================================================

const SKILLS = [
  "analyse_de_donnees",
  "communication",
  "creativite",
  "dessin_technique",
  "esprit_d_analyse_financiere",
  "expression_orale",
  "gestion_de_projet",
  "gout_du_terrain",
  "langues_etrangeres",
  "leadership",
  "manipulation_de_laboratoire",
  "negociation",
  "programmation",
  "resolution_de_problemes",
  "rigueur_scientifique",
  "sens_commercial",
  "sens_de_l_organisation",
  "sensibilite_environnementale",
  "service_client",
  "travail_d_equipe",
];


// ============================================================
// CENTRES D'INTERET
// ============================================================

const INTERESTS = [
  "actualite_economique",
  "agriculture",
  "architecture_design",
  "art_et_creation",
  "cuisine",
  "droit_justice",
  "electronique",
  "entrepreneuriat",
  "finance",
  "intelligence_artificielle",
  "jeux_video",
  "mecanique_bricolage",
  "nature_environnement",
  "nouvelles_technologies",
  "reseaux_sociaux",
  "sante",
  "sciences",
  "sport",
  "tourisme_culture",
  "voyage",
];


// ============================================================
// ACTIVITES / PROJETS
// ============================================================

const ACTIVITIES = [
  "Aucune activite extrascolaire notable",
  "Benevolat associatif",
  "Club de robotique ou d'electronique",
  "Concours scientifique ou olympiade",
  "Creation d'une petite activite commerciale",
  "Job d'ete en restauration ou hotellerie",
  "Participation a un club de debat ou de droit",
  "Participation a un hackathon",
  "Projet de construction ou maquette",
  "Projet informatique personnel",
  "Stage en entreprise",
  "Stage en exploitation agricole",
  "Stage en laboratoire",
  "Voyage linguistique",
];


// ============================================================
// PREFERENCES PROFESSIONNELLES
// ============================================================

const PROFESSIONAL_PREFERENCES = [
  {
    value: "Travailler dans une grande entreprise",
    label: "Travailler dans une grande entreprise",
  },
  {
    value: "Creer sa propre entreprise",
    label: "Créer sa propre entreprise",
  },
  {
    value: "Travailler dans la fonction publique",
    label: "Travailler dans la fonction publique",
  },
  {
    value: "Travailler a l'international",
    label: "Travailler à l'international",
  },
  {
    value:
      "Travailler dans une ONG ou une structure a impact social",
    label:
      "Travailler dans une ONG ou une structure à impact social",
  },
  {
    value:
      "Poursuivre en recherche ou en doctorat",
    label:
      "Poursuivre en recherche ou en doctorat",
  },
  {
    value:
      "Pas encore de preference claire",
    label:
      "Pas encore de préférence claire",
  },
];


// ============================================================
// ENVIRONNEMENTS DE TRAVAIL
// ============================================================

const WORK_ENVIRONMENTS = [
  {
    value: "bureau",
    label: "Bureau",
  },
  {
    value: "laboratoire",
    label: "Laboratoire",
  },
  {
    value: "terrain",
    label: "Terrain",
  },
  {
    value: "atelier_chantier",
    label: "Atelier / chantier",
  },
  {
    value: "contact_client",
    label: "Contact avec les clients",
  },
  {
    value: "mixte",
    label: "Environnement mixte",
  },
];


// ============================================================
// ETAT DU FORMULAIRE
// ============================================================

interface FormState {
  serie_bac: string;

  note_mathematiques: string;
  note_physique_chimie: string;
  note_svt_biologie: string;
  note_francais: string;
  note_anglais: string;
  note_histoire_geo: string;
  note_economie_gestion: string;
  note_informatique_nsi: string;

  matieres_preferees: string[];
  competences_declarees: string[];
  centres_interet: string[];
  activites_projets: string[];

  preference_professionnelle: string;
  environnement_travail_souhaite: string;
}


const INITIAL_FORM: FormState = {
  serie_bac: "",

  note_mathematiques: "",
  note_physique_chimie: "",
  note_svt_biologie: "",
  note_francais: "",
  note_anglais: "",
  note_histoire_geo: "",
  note_economie_gestion: "",
  note_informatique_nsi: "",

  matieres_preferees: [],
  competences_declarees: [],
  centres_interet: [],
  activites_projets: [],

  preference_professionnelle: "",
  environnement_travail_souhaite: "",
};


// ============================================================
// UTILITAIRES
// ============================================================

function labelize(
  value: string
): string {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}


function toggleValue(
  values: string[],
  value: string
): string[] {
  if (values.includes(value)) {
    return values.filter(
      (item) => item !== value
    );
  }

  return [
    ...values,
    value,
  ];
}


function isValidNote(
  value: string
): boolean {
  if (!value.trim()) {
    return false;
  }

  const number = Number(value);

  return (
    Number.isFinite(number) &&
    number >= 0 &&
    number <= 20
  );
}


// ============================================================
// COMPOSANT
// ============================================================

export default function OrientationForm({
  onSubmit,
  disabled = false,
}: Props) {

  const [formData, setFormData] =
    useState<FormState>(
      INITIAL_FORM
    );

  const [error, setError] =
    useState<string | null>(null);


  // ==========================================================
  // CHANGEMENT CHAMP SIMPLE
  // ==========================================================

  function handleTextChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {

    const {
      name,
      value,
    } = e.target;

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  }


  // ==========================================================
  // CHANGEMENT MULTI-LABEL
  // ==========================================================

  function handleMultiChange(
    field:
      | "matieres_preferees"
      | "competences_declarees"
      | "centres_interet"
      | "activites_projets",
    value: string
  ) {

    setFormData(
      (previous) => ({
        ...previous,
        [field]: toggleValue(
          previous[field],
          value
        ),
      })
    );
  }


  // ==========================================================
  // SUBMIT
  // ==========================================================

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();

    setError(null);


    const notes = [
      formData.note_mathematiques,
      formData.note_physique_chimie,
      formData.note_svt_biologie,
      formData.note_francais,
      formData.note_anglais,
      formData.note_histoire_geo,
      formData.note_economie_gestion,
      formData.note_informatique_nsi,
    ];


    if (!formData.serie_bac) {
      setError(
        "Veuillez sélectionner votre série du BAC."
      );
      return;
    }


    if (
      notes.some(
        (note) => !isValidNote(note)
      )
    ) {
      setError(
        "Toutes les notes doivent être renseignées entre 0 et 20."
      );
      return;
    }


    if (
      formData.matieres_preferees.length === 0
    ) {
      setError(
        "Veuillez sélectionner au moins une matière préférée."
      );
      return;
    }


    if (
      formData.competences_declarees.length === 0
    ) {
      setError(
        "Veuillez sélectionner au moins une compétence."
      );
      return;
    }


    if (
      formData.centres_interet.length === 0
    ) {
      setError(
        "Veuillez sélectionner au moins un centre d'intérêt."
      );
      return;
    }


    if (
      formData.activites_projets.length === 0
    ) {
      setError(
        "Veuillez sélectionner au moins une activité ou un projet."
      );
      return;
    }


    if (
      !formData.preference_professionnelle
    ) {
      setError(
        "Veuillez sélectionner une préférence professionnelle."
      );
      return;
    }


    if (
      !formData.environnement_travail_souhaite
    ) {
      setError(
        "Veuillez sélectionner un environnement de travail."
      );
      return;
    }


    const data: OrientationFormData = {

      serie_bac:
        formData.serie_bac,

      note_mathematiques:
        Number(
          formData.note_mathematiques
        ),

      note_physique_chimie:
        Number(
          formData.note_physique_chimie
        ),

      note_svt_biologie:
        Number(
          formData.note_svt_biologie
        ),

      note_francais:
        Number(
          formData.note_francais
        ),

      note_anglais:
        Number(
          formData.note_anglais
        ),

      note_histoire_geo:
        Number(
          formData.note_histoire_geo
        ),

      note_economie_gestion:
        Number(
          formData.note_economie_gestion
        ),

      note_informatique_nsi:
        Number(
          formData.note_informatique_nsi
        ),

      matieres_preferees:
        formData.matieres_preferees,

      competences_declarees:
        formData.competences_declarees,

      centres_interet:
        formData.centres_interet,

      activites_projets:
        formData.activites_projets,

      preference_professionnelle:
        formData.preference_professionnelle,

      environnement_travail_souhaite:
        formData.environnement_travail_souhaite,
    };


    onSubmit(data);
  }


  // ==========================================================
  // RENDU
  // ==========================================================

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl max-h-[85vh] overflow-y-auto space-y-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#078B45]/10"
    >

      <div>
        <p className="font-semibold uppercase tracking-wide text-[#1565C0]">
          Profil d&apos;orientation
        </p>

        <p className="mt-1 text-xs text-gray-500">
          Ces informations seront utilisées par le
          modèle d&apos;orientation pour vous proposer
          les parcours les plus adaptés.
        </p>
      </div>


      {/* ================================================== */}
      {/* SERIE BAC */}
      {/* ================================================== */}

      <section className="space-y-2">

        <h3 className="text-xs font-semibold uppercase text-[#078B45]">
          Série du BAC
        </h3>

        <select
          name="serie_bac"
          value={formData.serie_bac}
          onChange={handleTextChange}
          disabled={disabled}
          className="w-full rounded-lg border border-[#078B45]/15 bg-[#F7F5F1] px-3 py-2 text-sm text-[#2E3350]"
        >

          <option value="">
            Sélectionnez votre série
          </option>

          {SERIES_BAC.map(
            (serie) => (
              <option
                key={serie.value}
                value={serie.value}
              >
                {serie.label}
              </option>
            )
          )}

        </select>

      </section>


      {/* ================================================== */}
      {/* NOTES */}
      {/* ================================================== */}

      <section className="space-y-3 border-t border-gray-100 pt-4">

        <h3 className="text-xs font-semibold uppercase text-[#078B45]">
          Notes scolaires (/20)
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

          {[
            [
              "note_mathematiques",
              "Mathématiques",
            ],
            [
              "note_physique_chimie",
              "Physique - Chimie",
            ],
            [
              "note_svt_biologie",
              "SVT / Biologie",
            ],
            [
              "note_francais",
              "Français",
            ],
            [
              "note_anglais",
              "Anglais",
            ],
            [
              "note_histoire_geo",
              "Histoire - Géo",
            ],
            [
              "note_economie_gestion",
              "Économie - Gestion",
            ],
            [
              "note_informatique_nsi",
              "Informatique / NSI",
            ],
          ].map(
            ([name, label]) => (

              <div key={name}>

                <label className="mb-1 block text-xs font-medium text-[#2E3350]">
                  {label}
                </label>

                <input
                  type="number"
                  name={name}
                  min={0}
                  max={20}
                  step={0.25}
                  value={
                    formData[
                      name as keyof FormState
                    ] as string
                  }
                  onChange={handleTextChange}
                  disabled={disabled}
                  placeholder="ex. 14"
                  className="w-full rounded-lg border border-[#078B45]/15 bg-[#F7F5F1] px-3 py-2 text-sm text-[#2E3350]"
                />

              </div>

            )
          )}

        </div>

      </section>


      {/* ================================================== */}
      {/* MATIERES */}
      {/* ================================================== */}

      <section className="space-y-3 border-t border-gray-100 pt-4">

        <h3 className="text-xs font-semibold uppercase text-[#078B45]">
          Matières préférées
        </h3>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">

          {SUBJECTS.map(
            (subject) => (

              <label
                key={subject}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-100 p-2 text-sm hover:bg-gray-50"
              >

                <input
                  type="checkbox"
                  checked={
                    formData.matieres_preferees.includes(
                      subject
                    )
                  }
                  onChange={() =>
                    handleMultiChange(
                      "matieres_preferees",
                      subject
                    )
                  }
                  disabled={disabled}
                />

                <span>
                  {labelize(subject)}
                </span>

              </label>

            )
          )}

        </div>

      </section>


      {/* ================================================== */}
      {/* COMPETENCES */}
      {/* ================================================== */}

      <section className="space-y-3 border-t border-gray-100 pt-4">

        <h3 className="text-xs font-semibold uppercase text-[#078B45]">
          Compétences
        </h3>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">

          {SKILLS.map(
            (skill) => (

              <label
                key={skill}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-100 p-2 text-sm hover:bg-gray-50"
              >

                <input
                  type="checkbox"
                  checked={
                    formData.competences_declarees.includes(
                      skill
                    )
                  }
                  onChange={() =>
                    handleMultiChange(
                      "competences_declarees",
                      skill
                    )
                  }
                  disabled={disabled}
                />

                <span>
                  {labelize(skill)}
                </span>

              </label>

            )
          )}

        </div>

      </section>


      {/* ================================================== */}
      {/* CENTRES D'INTERET */}
      {/* ================================================== */}

      <section className="space-y-3 border-t border-gray-100 pt-4">

        <h3 className="text-xs font-semibold uppercase text-[#078B45]">
          Centres d&apos;intérêt
        </h3>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">

          {INTERESTS.map(
            (interest) => (

              <label
                key={interest}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-100 p-2 text-sm hover:bg-gray-50"
              >

                <input
                  type="checkbox"
                  checked={
                    formData.centres_interet.includes(
                      interest
                    )
                  }
                  onChange={() =>
                    handleMultiChange(
                      "centres_interet",
                      interest
                    )
                  }
                  disabled={disabled}
                />

                <span>
                  {labelize(interest)}
                </span>

              </label>

            )
          )}

        </div>

      </section>


      {/* ================================================== */}
      {/* ACTIVITES / PROJETS */}
      {/* ================================================== */}

      <section className="space-y-3 border-t border-gray-100 pt-4">

        <div>
          <h3 className="text-xs font-semibold uppercase text-[#078B45]">
            Activités &amp; projets
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            Sélectionnez les activités ou projets qui
            correspondent à votre expérience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2">

          {ACTIVITIES.map(
            (activity) => (

              <label
                key={activity}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-100 p-2 text-sm hover:bg-gray-50"
              >

                <input
                  type="checkbox"
                  checked={
                    formData.activites_projets.includes(
                      activity
                    )
                  }
                  onChange={() =>
                    handleMultiChange(
                      "activites_projets",
                      activity
                    )
                  }
                  disabled={disabled}
                />

                <span>
                  {activity}
                </span>

              </label>

            )
          )}

        </div>

      </section>


      {/* ================================================== */}
      {/* PREFERENCES */}
      {/* ================================================== */}

      <section className="space-y-4 border-t border-gray-100 pt-4">

        <h3 className="text-xs font-semibold uppercase text-[#078B45]">
          Perspectives d&apos;avenir
        </h3>


        {/* PREFERENCE PROFESSIONNELLE */}

        <div>

          <label className="mb-1 block text-sm font-medium text-[#2E3350]">
            Préférence professionnelle
          </label>

          <select
            name="preference_professionnelle"
            value={
              formData.preference_professionnelle
            }
            onChange={handleTextChange}
            disabled={disabled}
            className="w-full rounded-lg border border-[#078B45]/15 bg-[#F7F5F1] px-3 py-2 text-sm"
          >

            <option value="">
              Sélectionnez une préférence
            </option>

            {PROFESSIONAL_PREFERENCES.map(
              (item) => (

                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>

              )
            )}

          </select>

        </div>


        {/* ENVIRONNEMENT */}

        <div>

          <label className="mb-1 block text-sm font-medium text-[#2E3350]">
            Environnement de travail souhaité
          </label>

          <select
            name="environnement_travail_souhaite"
            value={
              formData.environnement_travail_souhaite
            }
            onChange={handleTextChange}
            disabled={disabled}
            className="w-full rounded-lg border border-[#078B45]/15 bg-[#F7F5F1] px-3 py-2 text-sm"
          >

            <option value="">
              Sélectionnez un environnement
            </option>

            {WORK_ENVIRONMENTS.map(
              (item) => (

                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>

              )
            )}

          </select>

        </div>

      </section>


      {/* ================================================== */}
      {/* ERREUR */}
      {/* ================================================== */}

      {error && (

        <p className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600">
          {error}
        </p>

      )}


      {/* ================================================== */}
      {/* BOUTON */}
      {/* ================================================== */}

      <button
        type="submit"
        disabled={disabled}
        className="w-full rounded-lg bg-[#1565C0] py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >

        {disabled
          ? "Analyse en cours..."
          : "Obtenir ma recommandation"}

      </button>

    </form>
  );
}