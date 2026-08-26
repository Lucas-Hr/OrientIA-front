// components/chat/OrientationForm.tsx
"use client";

import { useState } from "react";
import type { BacNote, OrientationFormData } from "@/types/chat";
import { CloseIcon, PlusIcon } from "./icons";

const SERIES_BAC = [
  { value: "A", label: "Série A — Littéraire" },
  { value: "C", label: "Série C — Maths & Sciences Physiques" },
  { value: "D", label: "Série D — Maths & SVT" },
  { value: "OSE", label: "Série OSE — Sciences Économiques" },
  { value: "TECHNIQUE", label: "Série Technique" },
  { value: "AUTRE", label: "Autre" },
];

interface Props {
  onSubmit: (data: OrientationFormData) => void;
  disabled?: boolean;
}

export default function OrientationForm({ onSubmit, disabled }: Props) {
  const [serieBac, setSerieBac] = useState("");
  const [notes, setNotes] = useState<BacNote[]>([{ matiere: "", note: 10 }]);
  const [carriereEnvisagee, setCarriereEnvisagee] = useState("");
  const [competenceInput, setCompetenceInput] = useState("");
  const [competences, setCompetences] = useState<string[]>([]);
  const [aUneExperiencePro, setAUneExperiencePro] = useState(false);
  const [parcoursProfessionnel, setParcoursProfessionnel] = useState("");
  const [error, setError] = useState<string | null>(null);

  function updateNote(index: number, patch: Partial<BacNote>) {
    setNotes((prev) => prev.map((n, i) => (i === index ? { ...n, ...patch } : n)));
  }

  function addNoteRow() {
    setNotes((prev) => [...prev, { matiere: "", note: 10 }]);
  }

  function removeNoteRow(index: number) {
    setNotes((prev) => prev.filter((_, i) => i !== index));
  }

  function addCompetence() {
    const val = competenceInput.trim();
    if (!val) return;
    if (!competences.includes(val)) setCompetences((prev) => [...prev, val]);
    setCompetenceInput("");
  }

  function removeCompetence(val: string) {
    setCompetences((prev) => prev.filter((c) => c !== val));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const cleanedNotes = notes.filter((n) => n.matiere.trim().length > 0);

    if (!serieBac) return setError("Merci de sélectionner votre série de BAC.");
    if (cleanedNotes.length === 0) return setError("Ajoutez au moins une note.");
    if (!carriereEnvisagee.trim()) return setError("Indiquez la carrière envisagée.");
    if (competences.length === 0) return setError("Ajoutez au moins une compétence.");

    onSubmit({
      serieBac,
      notes: cleanedNotes,
      carriereEnvisagee: carriereEnvisagee.trim(),
      competences,
      aUneExperiencePro,
      parcoursProfessionnel: aUneExperiencePro ? parcoursProfessionnel.trim() : undefined,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#1B2A4A]/10"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#D4A24C]">
          Profil bachelier
        </p>
        <h3 className="mt-0.5 text-base font-semibold text-[#1B2A4A]">
          Parlez-nous de votre parcours
        </h3>
      </div>

      {/* Série du BAC */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-[#2E3350]">Série du BAC</label>
        <select
          value={serieBac}
          onChange={(e) => setSerieBac(e.target.value)}
          disabled={disabled}
          className="w-full rounded-lg border border-[#1B2A4A]/15 bg-[#F7F5F1] px-3 py-2 text-sm text-[#2E3350] outline-none focus:border-[#D4A24C] focus:ring-2 focus:ring-[#D4A24C]/30"
        >
          <option value="">Sélectionnez votre série</option>
          {SERIES_BAC.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-[#2E3350]">Notes principales (/20)</label>
        <div className="space-y-2">
          {notes.map((n, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Matière (ex. Mathématiques)"
                value={n.matiere}
                onChange={(e) => updateNote(i, { matiere: e.target.value })}
                disabled={disabled}
                className="flex-1 rounded-lg border border-[#1B2A4A]/15 bg-[#F7F5F1] px-3 py-2 text-sm text-[#2E3350] outline-none focus:border-[#D4A24C] focus:ring-2 focus:ring-[#D4A24C]/30"
              />
              <input
                type="number"
                min={0}
                max={20}
                step={0.5}
                value={n.note}
                onChange={(e) => updateNote(i, { note: Number(e.target.value) })}
                disabled={disabled}
                className="w-16 rounded-lg border border-[#1B2A4A]/15 bg-[#F7F5F1] px-2 py-2 text-sm text-[#2E3350] outline-none focus:border-[#D4A24C] focus:ring-2 focus:ring-[#D4A24C]/30"
              />
              {notes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeNoteRow(i)}
                  disabled={disabled}
                  className="shrink-0 rounded-full p-1.5 text-[#1B2A4A]/50 hover:bg-[#1B2A4A]/5 hover:text-[#1B2A4A]"
                  aria-label="Supprimer cette matière"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addNoteRow}
          disabled={disabled}
          className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-[#1B2A4A] hover:text-[#D4A24C]"
        >
          <PlusIcon className="w-3.5 h-3.5" /> Ajouter une matière
        </button>
      </div>

      {/* Carrière envisagée */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-[#2E3350]">Carrière envisagée</label>
        <input
          type="text"
          placeholder="ex. Ingénieur logiciel, Comptable, Diplomate..."
          value={carriereEnvisagee}
          onChange={(e) => setCarriereEnvisagee(e.target.value)}
          disabled={disabled}
          className="w-full rounded-lg border border-[#1B2A4A]/15 bg-[#F7F5F1] px-3 py-2 text-sm text-[#2E3350] outline-none focus:border-[#D4A24C] focus:ring-2 focus:ring-[#D4A24C]/30"
        />
      </div>

      {/* Compétences */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-[#2E3350]">Compétences</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="ex. Leadership, Logique, Rédaction..."
            value={competenceInput}
            onChange={(e) => setCompetenceInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCompetence();
              }
            }}
            disabled={disabled}
            className="flex-1 rounded-lg border border-[#1B2A4A]/15 bg-[#F7F5F1] px-3 py-2 text-sm text-[#2E3350] outline-none focus:border-[#D4A24C] focus:ring-2 focus:ring-[#D4A24C]/30"
          />
          <button
            type="button"
            onClick={addCompetence}
            disabled={disabled}
            className="rounded-lg bg-[#1B2A4A] px-3 py-2 text-sm font-medium text-white hover:bg-[#152239]"
          >
            Ajouter
          </button>
        </div>
        {competences.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {competences.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 rounded-full bg-[#D4A24C]/15 px-2.5 py-1 text-xs font-medium text-[#1B2A4A]"
              >
                {c}
                <button
                  type="button"
                  onClick={() => removeCompetence(c)}
                  disabled={disabled}
                  aria-label={`Retirer ${c}`}
                >
                  <CloseIcon className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Parcours professionnel */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-2 text-sm font-medium text-[#2E3350]">
          <input
            type="checkbox"
            checked={aUneExperiencePro}
            onChange={(e) => setAUneExperiencePro(e.target.checked)}
            disabled={disabled}
            className="h-4 w-4 rounded border-[#1B2A4A]/30 text-[#1B2A4A] focus:ring-[#D4A24C]"
          />
          J&apos;ai déjà un parcours professionnel
        </label>
        {aUneExperiencePro && (
          <textarea
            placeholder="Décrivez brièvement votre expérience (stage, emploi, activité...)"
            value={parcoursProfessionnel}
            onChange={(e) => setParcoursProfessionnel(e.target.value)}
            disabled={disabled}
            rows={3}
            className="w-full resize-none rounded-lg border border-[#1B2A4A]/15 bg-[#F7F5F1] px-3 py-2 text-sm text-[#2E3350] outline-none focus:border-[#D4A24C] focus:ring-2 focus:ring-[#D4A24C]/30"
          />
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={disabled}
        className="w-full rounded-lg bg-[#D4A24C] py-2.5 text-sm font-semibold text-[#1B2A4A] transition hover:bg-[#c08f3b] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {disabled ? "Envoi en cours..." : "Trouver ma filière"}
      </button>
    </form>
  );
}
