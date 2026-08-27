// lib/api.ts

import type {
  BackendChatRequest,
  BackendChatResponse,
  OrientationFormData,
} from "@/types/chat";


// ============================================================
// URL DU BACKEND
// ============================================================

const API_BASE_URL =
  process.env.NEXT_API_URL?.replace(/\/$/, "") ??
  "https://orientia-codea-backend.onrender.com";


// ============================================================
// ERREUR API
// ============================================================

export class ApiError extends Error {
  status: number;

  constructor(
    message: string,
    status: number
  ) {
    super(message);

    this.status = status;
    this.name = "ApiError";
  }
}


// ============================================================
// POST JSON
// ============================================================

async function postJSON<T>(
  path: string,
  body: unknown
): Promise<T> {

  let response: Response;

  try {

    console.log(
      "[API] POST:",
      `${API_BASE_URL}${path}`
    );

    console.log(
      "[API] BODY:",
      body
    );

    response = await fetch(
      `${API_BASE_URL}${path}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify(body),
      }
    );

  } catch (error) {

    console.error(
      "[API] Erreur réseau:",
      error
    );

    throw new ApiError(
      "Impossible de contacter le serveur. Vérifiez votre connexion.",
      0
    );
  }


  // ==========================================================
  // REPONSE HTTP EN ERREUR
  // ==========================================================

  if (!response.ok) {

    let message =
      `Erreur serveur (${response.status})`;

    try {

      const data =
        await response.json();

      console.error(
        "[API] Réponse erreur:",
        data
      );

      if (
        data &&
        typeof data.detail === "string"
      ) {
        message = data.detail;
      }

    } catch {
      // On conserve le message générique.
    }

    throw new ApiError(
      message,
      response.status
    );
  }


  // ==========================================================
  // LECTURE DE LA REPONSE
  // ==========================================================

  try {

    const data =
      await response.json();

    console.log(
      "[API] STATUS:",
      response.status
    );

    console.log(
      "[API] RESPONSE:",
      data
    );

    return data as T;

  } catch {

    throw new ApiError(
      "Le serveur a retourné une réponse invalide.",
      response.status
    );
  }
}


// ============================================================
// CHAT RAG
// ============================================================

export async function sendChatMessage(
  message: string,
  sessionId: string | null
): Promise<BackendChatResponse> {

  const payload: BackendChatRequest = {

    message,

    session_id: sessionId,

    profile: null,
  };


  const response =
    await postJSON<BackendChatResponse>(
      "/api/chat",
      payload
    );


  // ==========================================================
  // VERIFICATION DU FORMAT
  // ==========================================================

  if (
    !response ||
    typeof response.answer !== "string"
  ) {

    console.error(
      "[API] Format de réponse inattendu:",
      response
    );

    throw new ApiError(
      "Le serveur a retourné une réponse dans un format inattendu.",
      200
    );
  }


  return {

    answer: response.answer,

    sources:
      Array.isArray(response.sources)
        ? response.sources
        : [],

    chunks:
      typeof response.chunks === "number"
        ? response.chunks
        : 0,
  };
}


// ============================================================
// FORMULAIRE D'ORIENTATION
// ============================================================

export async function submitOrientationForm(
  data: OrientationFormData,
  sessionId: string | null
): Promise<BackendChatResponse> {

  const payload: BackendChatRequest = {

    message:
      "Voici mon profil d'orientation. Je souhaite recevoir une recommandation de parcours.",

    session_id: sessionId,

    profile: data,
  };


  return postJSON<BackendChatResponse>(
    "/api/chat",
    payload
  );
}