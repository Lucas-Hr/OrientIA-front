// ============================================================
// TYPES GENERAUX
// ============================================================

export type Role =
  | "user"
  | "assistant";


// ============================================================
// TYPE DE MESSAGE AFFICHABLE
// ============================================================

export type MessageKind =
  | "text"
  | "form_request"
  | "form_summary"
  | "recommendation";


// ============================================================
// SOURCE DOCUMENTAIRE
// ============================================================

export interface Source {
  id?: string | null;

  name: string;

  page?: string | null;

  title?: string | null;

  url?: string | null;

  source_type?: string | null;

  consulted_at?: string | null;

  excerpt?: string | null;
}


// ============================================================
// RECOMMANDATION
// ============================================================

export interface Recommendation {
  parcours: string;

  probabilite: number;
}


// ============================================================
// RESULTAT ML
// ============================================================

export interface MLResult {
  source: string;

  modele: string;

  resultats: Recommendation[];
}


// ============================================================
// PROFIL D'ORIENTATION
// ============================================================

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


// ============================================================
// REQUETE CHAT
// ============================================================

export interface BackendChatRequest {
  message: string;

  session_id?: string | null;

  profile?: OrientationFormData | null;
}


// ============================================================
// REPONSE RAG ACTUELLE DU BACKEND
// ============================================================

export interface BackendChatResponse {
  answer: string;

  sources: Source[];

  chunks: number;
}


// ============================================================
// MESSAGE INTERNE DE L'INTERFACE
// ============================================================

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