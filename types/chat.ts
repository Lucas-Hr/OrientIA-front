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
 * Types de réponse possibles du backend.
 */
export type BackendResponseType =
  | "answer"
  | "formrequest"
  | "recommendation";

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
 * Une recommandation retournée par le modèle ML.
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
 * Profil complet envoyé au moteur d'orientation.
 *
 * Ces champs correspondent aux entrées utilisées
 * par le modèle ML.
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
 * Requête envoyée à POST /api/chat.
 */
export interface BackendChatRequest {
  message: string;
  session_id: string | null;
  profile?: OrientationFormData | null;
}

/**
 * Réponse retournée par POST /api/chat.
 *
 * Ce contrat correspond au schema ChatResponse
 * du backend FastAPI.
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
 * Message affiché dans l'interface.
 */
export interface ChatMessage {
  id: string;
  role: Role;
  kind: MessageKind;

  content?: string;

  formData?: OrientationFormData;

  recommendations?: Recommendation[];

  sources?: Source[];

  createdAt: number;
}