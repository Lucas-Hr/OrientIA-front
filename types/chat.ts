// types/chat.ts

export type Role = "user" | "assistant";

/**
 * Type de contenu affiché dans une bulle de chat.
 */
export type MessageKind =
  | "text"
  | "form_request"
  | "form_summary"
  | "recommendation";

/**
 * Message affiché dans l'interface.
 */
export interface ChatMessage {
  id: string;
  role: Role;
  kind: MessageKind;
  content?: string;
  formData?: OrientationFormData;
  recommendations?: Recommendation[];
  createdAt: number;
}

/**
 * Profil complet envoyé au moteur d'orientation.
 *
 * Ces champs correspondent aux entrées utilisées par le modèle ML.
 */
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

  matieres_preferees: string[];
  competences_declarees: string[];
  centres_interet: string[];
  activites_projets: string[];

  preference_professionnelle: string;
  environnement_travail_souhaite: string;
}

/**
 * Une recommandation retournée par le modèle.
 */
export interface Recommendation {
  parcours: string;
  probabilite: number;
}

/**
 * Résultat complet du modèle ML.
 */
export interface MLResult {
  source: string;
  modele: string;
  resultats: Recommendation[];
}

/**
 * Types réellement utilisés par le backend.
 */
export type BackendResponseType =
  | "answer"
  | "formrequest"
  | "recommendation";

/**
 * Réponse du POST /api/chat.
 */
export interface BackendChatResponse {
  type: BackendResponseType;

  message: string;

  session_id: string;

  sources: Source[];

  recommendations: MLResult | null;

  confidence: number | null;

  uncertainty: string | null;

  missing_information: string[];
}

/**
 * Source documentaire retournée par le RAG.
 */
export interface Source {
  id?: string | null;
  title: string;
  url?: string | null;
  source_type?: string | null;
  consulted_at?: string | null;
  excerpt?: string | null;
}

/**
 * Requête envoyée à POST /api/chat.
 */
export interface BackendChatRequest {
  message: string;
  session_id: string | null;
  profile?: OrientationFormData | null;
}