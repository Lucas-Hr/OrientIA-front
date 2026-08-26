// components/chat/OrientationForm.tsx
"use client";

import { useState } from "react";
import type { OrientationFormData } from "@/types/chat";

const SERIES_BAC = [
  { value: "A", label: "Série A" },
  { value: "C", label: "Série C" },
  { value: "D", label: "Série D" },
  { value: "S", label: "Série S" },
  { value: "OSE", label: "Série OSE" },
  { value: "TECHNIQUE", label: "Série Technique" },
  { value: "AUTRE", label: "Autre" },
];

interface Props {
  onSubmit: (data: OrientationFormData) => void;
  disabled?: boolean;
}

export default function OrientationForm({ onSubmit, disabled }: Props) {
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
    matieres_preferees: "",
    competences_declarees: "",
    centres_interet: "",
    activites_projets: "",
    preference_professionnelle: "",
    environnement_travail_souhaite: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Vérification que TOUS les champs sont remplis
    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) {
        setError("Veuillez remplir l'ensemble des champs obligatoires.");
        return;
      }
    }

    // Envoi des données typées
    onSubmit({
      serie_bac: formData.serie_bac,
      note_mathematiques: Number(formData.note_mathematiques),
      note_physique_chimie: Number(formData.note_physique_chimie),
      note_svt_biologie: Number(formData.note_svt_biologie),
      note_francais: Number(formData.note_francais),
      note_anglais: Number(formData.note_anglais),
      note_histoire_geo: Number(formData.note_histoire_geo),
      note_economie_gestion: Number(formData.note_economie_gestion),
      note_informatique_nsi: Number(formData.note_informatique_nsi),
      matieres_preferees: formData.matieres_preferees.trim(),
      competences_declarees: formData.competences_declarees.trim(),
      centres_interet: formData.centres_interet.trim(),
      activites_projets: formData.activites_projets.trim(),
      preference_professionnelle: formData.preference_professionnelle.trim(),
      environnement_travail_souhaite: formData.environnement_travail_souhaite.trim(),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg space-y-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#078B45]/10 max-h-[85vh] overflow-y-auto"
    >
      <div>
        <p className=" font-semibold uppercase tracking-wide text-[#1565C0]">
          Profil bachelier
        </p>
        <p className="text-xs text-gray-500 mt-1">Tous les champs sont obligatoires.</p>
      </div>

      {/* Série du BAC */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-[#2E3350]">
          Série du BAC <span className="text-red-500">*</span>
        </label>
        <select
          name="serie_bac"
          value={formData.serie_bac}
          onChange={handleChange}
          disabled={disabled}
          required
          className="w-full rounded-lg border border-[#078B45]/15 bg-[#F7F5F1] px-3 py-2 text-sm text-[#2E3350] outline-none focus:border-[#D4A24C] focus:ring-2 focus:ring-[#D4A24C]/30"
        >
          <option value="">Sélectionnez votre série</option>
          {SERIES_BAC.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Section Notes */}
      <div className="space-y-3 pt-2 border-t border-gray-100">
        <h4 className="text-xs font-semibold uppercase text-[#078B45]">Notes scolaires (/20)</h4>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-[#2E3350] font-medium block mb-1">
              Mathématiques <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="note_mathematiques"
              min={0}
              max={20}
              step={0.25}
              value={formData.note_mathematiques}
              onChange={handleChange}
              disabled={disabled}
              required
              placeholder="ex. 14"
              className="w-full rounded-lg border border-[#078B45]/15 bg-[#F7F5F1] px-3 py-2 text-sm text-[#2E3350] outline-none focus:border-[#D4A24C]"
            />
          </div>

          <div>
            <label className="text-xs text-[#2E3350] font-medium block mb-1">
              Physique - Chimie <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="note_physique_chimie"
              min={0}
              max={20}
              step={0.25}
              value={formData.note_physique_chimie}
              onChange={handleChange}
              disabled={disabled}
              required
              placeholder="ex. 12.5"
              className="w-full rounded-lg border border-[#078B45]/15 bg-[#F7F5F1] px-3 py-2 text-sm text-[#2E3350] outline-none focus:border-[#D4A24C]"
            />
          </div>

          <div>
            <label className="text-xs text-[#2E3350] font-medium block mb-1">
              SVT / Biologie <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="note_svt_biologie"
              min={0}
              max={20}
              step={0.25}
              value={formData.note_svt_biologie}
              onChange={handleChange}
              disabled={disabled}
              required
              placeholder="ex. 13"
              className="w-full rounded-lg border border-[#078B45]/15 bg-[#F7F5F1] px-3 py-2 text-sm text-[#2E3350] outline-none focus:border-[#D4A24C]"
            />
          </div>

          <div>
            <label className="text-xs text-[#2E3350] font-medium block mb-1">
              Français <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="note_francais"
              min={0}
              max={20}
              step={0.25}
              value={formData.note_francais}
              onChange={handleChange}
              disabled={disabled}
              required
              placeholder="ex. 15"
              className="w-full rounded-lg border border-[#078B45]/15 bg-[#F7F5F1] px-3 py-2 text-sm text-[#2E3350] outline-none focus:border-[#D4A24C]"
            />
          </div>

          <div>
            <label className="text-xs text-[#2E3350] font-medium block mb-1">
              Anglais <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="note_anglais"
              min={0}
              max={20}
              step={0.25}
              value={formData.note_anglais}
              onChange={handleChange}
              disabled={disabled}
              required
              placeholder="ex. 16"
              className="w-full rounded-lg border border-[#078B45]/15 bg-[#F7F5F1] px-3 py-2 text-sm text-[#2E3350] outline-none focus:border-[#D4A24C]"
            />
          </div>

          <div>
            <label className="text-xs text-[#2E3350] font-medium block mb-1">
              Histoire - Géo <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="note_histoire_geo"
              min={0}
              max={20}
              step={0.25}
              value={formData.note_histoire_geo}
              onChange={handleChange}
              disabled={disabled}
              required
              placeholder="ex. 11"
              className="w-full rounded-lg border border-[#078B45]/15 bg-[#F7F5F1] px-3 py-2 text-sm text-[#2E3350] outline-none focus:border-[#D4A24C]"
            />
          </div>

          <div>
            <label className="text-xs text-[#2E3350] font-medium block mb-1">
              Économie - Gestion <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="note_economie_gestion"
              min={0}
              max={20}
              step={0.25}
              value={formData.note_economie_gestion}
              onChange={handleChange}
              disabled={disabled}
              required
              placeholder="ex. 14"
              className="w-full rounded-lg border border-[#078B45]/15 bg-[#F7F5F1] px-3 py-2 text-sm text-[#2E3350] outline-none focus:border-[#D4A24C]"
            />
          </div>

          <div>
            <label className="text-xs text-[#2E3350] font-medium block mb-1">
              Informatique / NSI <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="note_informatique_nsi"
              min={0}
              max={20}
              step={0.25}
              value={formData.note_informatique_nsi}
              onChange={handleChange}
              disabled={disabled}
              required
              placeholder="ex. 17"
              className="w-full rounded-lg border border-[#078B45]/15 bg-[#F7F5F1] px-3 py-2 text-sm text-[#2E3350] outline-none focus:border-[#D4A24C]"
            />
          </div>
        </div>
      </div>

      {/* Section Profil et Aptitudes */}
      <div className="space-y-3 pt-2 border-t border-gray-100">
        <h4 className="text-xs font-semibold uppercase text-[#078B45]">Profil & Aptitudes</h4>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#2E3350]">
            Matières préférées <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="matieres_preferees"
            value={formData.matieres_preferees}
            onChange={handleChange}
            disabled={disabled}
            required
            placeholder="ex. Mathématiques, Informatique, Anglais"
            className="w-full rounded-lg border border-[#078B45]/15 bg-[#F7F5F1] px-3 py-2 text-sm text-[#2E3350] outline-none focus:border-[#D4A24C]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#2E3350]">
            Compétences déclarées <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="competences_declarees"
            value={formData.competences_declarees}
            onChange={handleChange}
            disabled={disabled}
            required
            placeholder="ex. Logique, Résolution de problèmes, Communication"
            className="w-full rounded-lg border border-[#078B45]/15 bg-[#F7F5F1] px-3 py-2 text-sm text-[#2E3350] outline-none focus:border-[#D4A24C]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#2E3350]">
            Centres d&apos;intérêt <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="centres_interet"
            value={formData.centres_interet}
            onChange={handleChange}
            disabled={disabled}
            required
            placeholder="ex. Jeux vidéo, Musique, Robotique, Économie"
            className="w-full rounded-lg border border-[#078B45]/15 bg-[#F7F5F1] px-3 py-2 text-sm text-[#2E3350] outline-none focus:border-[#D4A24C]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#2E3350]">
            Activités & Projets <span className="text-red-500">*</span>
          </label>
          <textarea
            name="activites_projets"
            value={formData.activites_projets}
            onChange={handleChange}
            disabled={disabled}
            required
            rows={2}
            placeholder="ex. Création d'un site web, bénévolat, participation à un club de débat..."
            className="w-full resize-none rounded-lg border border-[#078B45]/15 bg-[#F7F5F1] px-3 py-2 text-sm text-[#2E3350] outline-none focus:border-[#D4A24C]"
          />
        </div>
      </div>

      {/* Section Préférences Professionnelles */}
      <div className="space-y-3 pt-2 border-t border-gray-100">
        <h4 className="text-xs font-semibold uppercase text-[#078B45]">Perspectives d&apos;avenir</h4>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#2E3350]">
            Préférence professionnelle <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="preference_professionnelle"
            value={formData.preference_professionnelle}
            onChange={handleChange}
            disabled={disabled}
            required
            placeholder="ex. Développeur web, Data Analyst, Chef de projet..."
            className="w-full rounded-lg border border-[#078B45]/15 bg-[#F7F5F1] px-3 py-2 text-sm text-[#2E3350] outline-none focus:border-[#D4A24C]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#2E3350]">
            Environnement de travail souhaité <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="environnement_travail_souhaite"
            value={formData.environnement_travail_souhaite}
            onChange={handleChange}
            disabled={disabled}
            required
            placeholder="ex. Startup dynamique, Télétravail, Multinationale, Bureau d'études..."
            className="w-full rounded-lg border border-[#078B45]/15 bg-[#F7F5F1] px-3 py-2 text-sm text-[#2E3350] outline-none focus:border-[#D4A24C]"
          />
        </div>
      </div>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={disabled}
        className="w-full rounded-lg bg-[#1565C0] py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
      >
        {disabled ? "Envoi en cours..." : "Trouver ma filière"}
      </button>
    </form>
  );
}