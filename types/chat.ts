// types/chat.ts

export type Role = "user" | "assistant";

/**
 * Types de contenu pouvant être affichés dans le chat.
 */
export type MessageKind =
  | "text"
  | "form_request"
  | "form_summary"
  | "orientation_result";

export interface ChatMessage {
  id: string;
  role: Role;
  kind: MessageKind;

  /**
   * Texte à afficher pour les messages normaux
   * ou le message introductif du formulaire.
   */
  content?: string;

  /**
   * Données du formulaire après soumission.
   */
  formData?: OrientationFormData;

  /**
   * Résultat ML après recommandation.
   */
  orientationResult?: OrientationResult;

  createdAt: number;
}

/**
 * Données du formulaire d'orientation.
 *
 * Ces noms correspondent directement au ProfileRequest
 * du backend FastAPI.
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
 * Recommandation individuelle produite par le modèle ML.
 */
export interface OrientationRecommendation {
  parcours: string;
  probabilite: number;
}

/**
 * Résultat retourné par le backend d'orientation.
 */
export interface OrientationResult {
  source: string;
  modele: string;
  resultats: OrientationRecommendation[];
}

/**
 * Types de réponses du endpoint /chat.
 */
export type BackendResponseType =
  | "text"
  | "form_request";

/**
 * Réponse du backend après un message utilisateur.
 */
export interface BackendChatResponse {
  type: BackendResponseType;

  /**
   * Message textuel du backend.
   *
   * Pour form_request, il sert de présentation
   * avant l'affichage du formulaire.
   */
  content?: string;

  session_id: string;
}

/**
 * Requête envoyée à POST /chat.
 */
export interface BackendChatRequest {
  message: string;
  session_id: string | null;
}

/**
 * Requête envoyée à POST /orientation/recommend.
 *
 * Elle correspond au ProfileRequest Python.
 */
export interface BackendFormPayload {
  serie_bac: string | null;

  note_mathematiques: number | null;
  note_physique_chimie: number | null;
  note_svt_biologie: number | null;
  note_francais: number | null;
  note_anglais: number | null;
  note_histoire_geo: number | null;
  note_economie_gestion: number | null;
  note_informatique_nsi: number | null;

  matieres_preferees: string[];
  competences_declarees: string[];
  centres_interet: string[];
  activites_projets: string[];

  preference_professionnelle: string | null;
  environnement_travail_souhaite: string | null;
}

/**
 * Réponse de POST /orientation/recommend.
 */
export interface BackendOrientationResponse {
  recommendations: OrientationResult;
}