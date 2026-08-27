// components/chat/OrientationForm.tsx

"use client";

import { useState } from "react";
import type { OrientationFormData } from "@/types/chat";

const SERIES_BAC = [
  { value: "A2", label: "A2" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
  { value: "S", label: "S" },
  {
    value: "Techniques_agricoles",
    label: "Techniques agricoles",
  },
  {
    value: "Toute_serie",
    label: "Toute série",
  },
];

const MATIERES = [
  { value: "Anglais", label: "Anglais" },
  {
    value: "Economie_Gestion",
    label: "Économie / Gestion",
  },
  { value: "Francais", label: "Français" },
  {
    value: "Histoire_Geo",
    label: "Histoire-Géographie",
  },
  {
    value: "Informatique_NSI",
    label: "Informatique / NSI",
  },
  {
    value: "Mathematiques",
    label: "Mathématiques",
  },
  {
    value: "Physique_Chimie",
    label: "Physique-Chimie",
  },
  {
    value: "SVT_Biologie",
    label: "SVT / Biologie",
  },
];

const COMPETENCES = [
  {
    value: "analyse_de_donnees",
    label: "Analyse de données",
  },
  {
    value: "communication",
    label: "Communication",
  },
  {
    value: "creativite",
    label: "Créativité",
  },
  {
    value: "dessin_technique",
    label: "Dessin technique",
  },
  {
    value: "esprit_d_analyse_financiere",
    label: "Analyse financière",
  },
  {
    value: "expression_orale",
    label: "Expression orale",
  },
  {
    value: "gestion_de_projet",
    label: "Gestion de projet",
  },
  {
    value: "gout_du_terrain",
    label: "Goût du terrain",
  },
  {
    value: "langues_etrangeres",
    label: "Langues étrangères",
  },
  {
    value: "leadership",
    label: "Leadership",
  },
  {
    value: "manipulation_de_laboratoire",
    label: "Manipulation de laboratoire",
  },
  {
    value: "negociation",
    label: "Négociation",
  },
  {
    value: "programmation",
    label: "Programmation",
  },
  {
    value: "resolution_de_problemes",
    label: "Résolution de problèmes",
  },
  {
    value: "rigueur_scientifique",
    label: "Rigueur scientifique",
  },
  {
    value: "sens_commercial",
    label: "Sens commercial",
  },
  {
    value: "sens_de_l_organisation",
    label: "Sens de l&apos;organisation",
  },
  {
    value: "sensibilite_environnementale",
    label: "Sensibilité environnementale",
  },
  {
    value: "service_client",
    label: "Service client",
  },
  {
    value: "travail_d_equipe",
    label: "Travail d&apos;équipe",
  },
];

const CENTRES_INTERET = [
  {
    value: "actualite_economique",
    label: "Actualité économique",
  },
  {
    value: "agriculture",
    label: "Agriculture",
  },
  {
    value: "architecture_design",
    label: "Architecture / Design",
  },
  {
    value: "art_et_creation",
    label: "Art et création",
  },
  {
    value: "cuisine",
    label: "Cuisine",
  },
  {
    value: "droit_justice",
    label: "Droit / Justice",
  },
  {
    value: "electronique",
    label: "Électronique",
  },
  {
    value: "entrepreneuriat",
    label: "Entrepreneuriat",
  },
  {
    value: "finance",
    label: "Finance",
  },
  {
    value: "intelligence_artificielle",
    label: "Intelligence artificielle",
  },
  {
    value: "jeux_video",
    label: "Jeux vidéo",
  },
  {
    value: "mecanique_bricolage",
    label: "Mécanique / Bricolage",
  },
  {
    value: "nature_environnement",
    label: "Nature / Environnement",
  },
  {
    value: "nouvelles_technologies",
    label: "Nouvelles technologies",
  },
  {
    value: "reseaux_sociaux",
    label: "Réseaux sociaux",
  },
  {
    value: "sante",
    label: "Santé",
  },
  {
    value: "sciences",
    label: "Sciences",
  },
  {
    value: "sport",
    label: "Sport",
  },
  {
    value: "tourisme_culture",
    label: "Tourisme / Culture",
  },
  {
    value: "voyage",
    label: "Voyage",
  },
];

const ACTIVITES = [
  {
    value: "Aucune activite extrascolaire notable",
    label: "Aucune activité extrascolaire notable",
  },
  {
    value: "Benevolat associatif",
    label: "Bénévolat associatif",
  },
  {
    value: "Club de robotique ou d&apos;electronique",
    label: "Club de robotique ou d&apos;électronique",
  },
  {
    value: "Concours scientifique ou olympiade",
    label: "Concours scientifique ou olympiade",
  },
  {
    value: "Creation d&apos;une petite activite commerciale",
    label: "Création d&apos;une petite activité commerciale",
  },
  {
    value: "Job d&apos;ete en restauration ou hotellerie",
    label: "Job d&apos;été en restauration ou hôtellerie",
  },
  {
    value: "Participation a un club de debat ou de droit",
    label: "Club de débat ou de droit",
  },
  {
    value: "Participation a un hackathon",
    label: "Participation à un hackathon",
  },
  {
    value: "Projet de construction ou maquette",
    label: "Projet de construction ou maquette",
  },
  {
    value: "Projet informatique personnel",
    label: "Projet informatique personnel",
  },
  {
    value: "Stage en entreprise",
    label: "Stage en entreprise",
  },
  {
    value: "Stage en exploitation agricole",
    label: "Stage en exploitation agricole",
  },
  {
    value: "Stage en laboratoire",
    label: "Stage en laboratoire",
  },
  {
    value: "Voyage linguistique",
    label: "Voyage linguistique",
  },
];

const PROFESSIONAL_PREFERENCES = [
  {
    value: "Creer sa propre entreprise",
    label: "Créer ma propre entreprise",
  },
  {
    value: "Pas encore de preference claire",
    label: "Je n&apos;ai pas encore de préférence claire",
  },
  {
    value: "Poursuivre en recherche ou en doctorat",
    label: "Poursuivre en recherche ou en doctorat",
  },
  {
    value: "Travailler a l&apos;international",
    label: "Travailler à l&apos;international",
  },
  {
    value: "Travailler dans la fonction publique",
    label: "Travailler dans la fonction publique",
  },
  {
    value:
      "Travailler dans une ONG ou une structure a impact social",
    label: "Travailler dans une ONG / structure à impact social",
  },
  {
    value: "Travailler dans une grande entreprise",
    label: "Travailler dans une grande entreprise",
  },
];

const WORK_ENVIRONMENTS = [
  {
    value: "atelier_chantier",
    label: "Atelier / chantier",
  },
  {
    value: "bureau",
    label: "Bureau",
  },
  {
    value: "contact_client",
    label: "Contact avec les clients",
  },
  {
    value: "laboratoire",
    label: "Laboratoire",
  },
  {
    value: "mixte",
    label: "Environnement mixte",
  },
  {
    value: "terrain",
    label: "Terrain",
  },
];

interface Props {
  onSubmit: (data: OrientationFormData) => void;
  disabled?: boolean;
}

interface MultiSelectProps {
  title: string;
  values: { value: string; label: string }[];
  selected: string[];
  onChange: (values: string[]) => void;
  disabled?: boolean;
}

function MultiSelect({
  title,
  values,
  selected,
  onChange,
  disabled,
}: MultiSelectProps) {
  function toggle(value: string) {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[#2E3350]">
        {title} <span className="text-red-500">*</span>
      </label>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {values.map((item) => {
          const checked = selected.includes(item.value);

          return (
            <label
              key={item.value}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs transition ${
                checked
                  ? "border-[#078B45] bg-[#078B45]/10 text-[#078B45]"
                  : "border-gray-200 bg-[#F7F5F1] text-[#2E3350]"
              } ${
                disabled
                  ? "cursor-not-allowed opacity-60"
                  : ""
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(item.value)}
                disabled={disabled}
                className="accent-[#078B45]"
              />

              <span>{item.label}</span>
            </label>
          );
        })}
      </div>

      {selected.length > 0 && (
        <p className="text-xs text-gray-500">
          {selected.length} sélectionnée
          {selected.length > 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}

export default function OrientationForm({
  onSubmit,
  disabled,
}: Props) {
  const [formData, setFormData] = useState({
    serie_bac: "",

    note_mathematiques: "",
    note_physique_chimie: "",
    note_svt_biologie: "",
    note_francais: "",
    note_anglais: "",
    note_histoire_geo: "",
    note_economie_gestion: "",
    note_informatique_nsi: "",

    matieres_preferees: [] as string[],
    competences_declarees: [] as string[],
    centres_interet: [] as string[],
    activites_projets: [] as string[],

    preference_professionnelle: "",
    environnement_travail_souhaite: "",
  });

  const [error, setError] = useState<string | null>(null);

  function handleTextChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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
      setError("Veuillez sélectionner votre série du BAC.");
      return;
    }

    if (notes.some((note) => note.trim() === "")) {
      setError("Veuillez renseigner toutes vos notes.");
      return;
    }

    if (
      notes.some(
        (note) =>
          Number(note) < 0 ||
          Number(note) > 20
      )
    ) {
      setError(
        "Les notes doivent être comprises entre 0 et 20."
      );
      return;
    }

    if (formData.matieres_preferees.length === 0) {
      setError(
        "Veuillez sélectionner au moins une matière préférée."
      );
      return;
    }

    if (formData.competences_declarees.length === 0) {
      setError(
        "Veuillez sélectionner au moins une compétence."
      );
      return;
    }

    if (formData.centres_interet.length === 0) {
      setError(
        "Veuillez sélectionner au moins un centre d&apos;intérêt."
      );
      return;
    }

    if (formData.activites_projets.length === 0) {
      setError(
        "Veuillez sélectionner au moins une activité ou un projet."
      );
      return;
    }

    if (!formData.preference_professionnelle) {
      setError(
        "Veuillez sélectionner votre préférence professionnelle."
      );
      return;
    }

    if (!formData.environnement_travail_souhaite) {
      setError(
        "Veuillez sélectionner votre environnement de travail."
      );
      return;
    }

    onSubmit({
      serie_bac: formData.serie_bac,

      note_mathematiques: Number(
        formData.note_mathematiques
      ),
      note_physique_chimie: Number(
        formData.note_physique_chimie
      ),
      note_svt_biologie: Number(
        formData.note_svt_biologie
      ),
      note_francais: Number(formData.note_francais),
      note_anglais: Number(formData.note_anglais),
      note_histoire_geo: Number(
        formData.note_histoire_geo
      ),
      note_economie_gestion: Number(
        formData.note_economie_gestion
      ),
      note_informatique_nsi: Number(
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
    });
  }

  const inputClass =
    "w-full rounded-lg border border-[#078B45]/15 bg-[#F7F5F1] px-3 py-2 text-sm text-[#2E3350] outline-none focus:border-[#D4A24C] focus:ring-2 focus:ring-[#D4A24C]/30";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl space-y-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#078B45]/10 max-h-[85vh] overflow-y-auto"
    >
      <div>
        <p className="font-semibold uppercase tracking-wide text-[#1565C0]">
          Profil bachelier
        </p>

        <p className="mt-1 text-xs text-gray-500">
          Ces informations permettent à notre modèle
          d&apos;analyser votre profil et de proposer les
          parcours les plus adaptés.
        </p>
      </div>

      {/* Série du BAC */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-[#2E3350]">
          Série du BAC{" "}
          <span className="text-red-500">*</span>
        </label>

        <select
          name="serie_bac"
          value={formData.serie_bac}
          onChange={handleTextChange}
          disabled={disabled}
          required
          className={inputClass}
        >
          <option value="">
            Sélectionnez votre série
          </option>

          {SERIES_BAC.map((item) => (
            <option
              key={item.value}
              value={item.value}
            >
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {/* Notes */}
      <div className="space-y-3 border-t border-gray-100 pt-2">
        <h4 className="text-xs font-semibold uppercase text-[#078B45]">
          Notes scolaires (/20)
        </h4>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            [
              "note_mathematiques",
              "Mathématiques",
            ],
            [
              "note_physique_chimie",
              "Physique-Chimie",
            ],
            [
              "note_svt_biologie",
              "SVT / Biologie",
            ],
            ["note_francais", "Français"],
            ["note_anglais", "Anglais"],
            [
              "note_histoire_geo",
              "Histoire-Géographie",
            ],
            [
              "note_economie_gestion",
              "Économie-Gestion",
            ],
            [
              "note_informatique_nsi",
              "Informatique / NSI",
            ],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="mb-1 block text-xs font-medium text-[#2E3350]">
                {label}{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                name={name}
                min={0}
                max={20}
                step={0.25}
                value={
                  formData[
                    name as keyof typeof formData
                  ] as string
                }
                onChange={handleTextChange}
                disabled={disabled}
                required
                placeholder="ex. 14"
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Matières */}
      <div className="space-y-3 border-t border-gray-100 pt-2">
        <h4 className="text-xs font-semibold uppercase text-[#078B45]">
          Matières préférées
        </h4>

        <MultiSelect
          title="Sélectionnez les matières que vous appréciez"
          values={MATIERES}
          selected={formData.matieres_preferees}
          onChange={(values) =>
            setFormData((prev) => ({
              ...prev,
              matieres_preferees: values,
            }))
          }
          disabled={disabled}
        />
      </div>

      {/* Compétences */}
      <div className="space-y-3 border-t border-gray-100 pt-2">
        <h4 className="text-xs font-semibold uppercase text-[#078B45]">
          Compétences
        </h4>

        <MultiSelect
          title="Sélectionnez vos principales compétences"
          values={COMPETENCES}
          selected={formData.competences_declarees}
          onChange={(values) =>
            setFormData((prev) => ({
              ...prev,
              competences_declarees: values,
            }))
          }
          disabled={disabled}
        />
      </div>

      {/* Centres d&apos;intérêt */}
      <div className="space-y-3 border-t border-gray-100 pt-2">
        <h4 className="text-xs font-semibold uppercase text-[#078B45]">
          Centres d&apos;intérêt
        </h4>

        <MultiSelect
          title="Sélectionnez vos centres d&apos;intérêt"
          values={CENTRES_INTERET}
          selected={formData.centres_interet}
          onChange={(values) =>
            setFormData((prev) => ({
              ...prev,
              centres_interet: values,
            }))
          }
          disabled={disabled}
        />
      </div>

      {/* Activités / projets */}
      <div className="space-y-3 border-t border-gray-100 pt-2">
        <h4 className="text-xs font-semibold uppercase text-[#078B45]">
          Activités et projets
        </h4>

        <MultiSelect
          title="Sélectionnez les activités ou projets auxquels vous avez participé"
          values={ACTIVITES}
          selected={formData.activites_projets}
          onChange={(values) =>
            setFormData((prev) => ({
              ...prev,
              activites_projets: values,
            }))
          }
          disabled={disabled}
        />
      </div>

      {/* Préférences */}
      <div className="space-y-3 border-t border-gray-100 pt-2">
        <h4 className="text-xs font-semibold uppercase text-[#078B45]">
          Perspectives d&apos;avenir
        </h4>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#2E3350]">
            Préférence professionnelle{" "}
            <span className="text-red-500">*</span>
          </label>

          <select
            name="preference_professionnelle"
            value={
              formData.preference_professionnelle
            }
            onChange={handleTextChange}
            disabled={disabled}
            required
            className={inputClass}
          >
            <option value="">
              Sélectionnez votre préférence
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

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#2E3350]">
            Environnement de travail souhaité{" "}
            <span className="text-red-500">*</span>
          </label>

          <select
            name="environnement_travail_souhaite"
            value={
              formData.environnement_travail_souhaite
            }
            onChange={handleTextChange}
            disabled={disabled}
            required
            className={inputClass}
          >
            <option value="">
              Sélectionnez votre environnement
            </option>

            {WORK_ENVIRONMENTS.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={disabled}
        className="w-full rounded-lg bg-[#1565C0] py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
      >
        {disabled
          ? "Analyse en cours..."
          : "Trouver ma filière"}
      </button>
    </form>
  );
}