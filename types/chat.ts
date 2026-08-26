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

export interface OrientationFormData {
  serieBac: string;
  notes: BacNote[];
  carriereEnvisagee: string;
  competences: string[];
  aUneExperiencePro: boolean;
  parcoursProfessionnel?: string;
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
  serie_bac: string;
  notes: { matiere: string; note: number }[];
  carriere_envisagee: string;
  competences: string[];
  parcours_professionnel: string | null;
}
