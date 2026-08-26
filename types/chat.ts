// types/chat.ts

export type Role = "user" | "assistant";

/** Type de contenu affiché dans une bulle de chat */
export type MessageKind = "text" | "form_request" | "form_summary";

export interface ChatMessage {
  id: string;
  role: Role;
  kind: MessageKind;
  /** Texte à afficher (message normal, ou intro avant le formulaire) */
  content?: string;
  /** Rempli uniquement pour kind === "form_summary" (récap après envoi du form) */
  formData?: OrientationFormData;
  createdAt: number;
}

export interface BacNote {
  matiere: string;
  note: number; // sur 20
}

// types/chat.ts

export interface OrientationFormData {
  serie_bac: string;
  note_mathematiques: number;
  note_physique_chimie: number;
  note_svt_biologie: number;
  note_francais: number;
  note_anglais: number;
  note_histoire_geo: number;
  note_economie_gestion: number;
  note_informatique_nsi: number;
  matieres_preferees: string;
  competences_declarees: string;
  centres_interet: string;
  activites_projets: string;
  preference_professionnelle: string;
  environnement_travail_souhaite: string;
}

/* ---------------------------------------------------------------------- */
/*  Contrat avec le backend FastAPI                                       */
/* ---------------------------------------------------------------------- */

/** Ce que le backend peut demander d'afficher côté client */
export type BackendResponseType = "text" | "form_request";

export interface BackendChatResponse {
  type: BackendResponseType;
  /** Message à afficher. Pour "form_request", sert d'intro avant le formulaire. */
  content?: string;
  session_id: string;
}

export interface BackendChatRequest {
  message: string;
  session_id: string | null;
}

export interface BackendFormPayload {
  session_id: string | null;
  serie_bac: string | null,
  note_mathematiques: Number | null,
  note_physique_chimie: Number | null,
  note_svt_biologie: Number | null,
  note_francais: Number | null,
  note_anglais: Number | null,
  note_histoire_geo: Number | null,
  note_economie_gestion: Number | null,
  note_informatique_nsi: Number | null,
  matieres_preferees: string | null,
  competences_declarees: string | null,
  centres_interet: string | null,
  activites_projets: string | null,
  preference_professionnelle: string | null,
  environnement_travail_souhaite: string | null,
}
