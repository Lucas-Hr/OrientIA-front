// lib/api.ts

import type {
  BackendChatRequest,
  BackendChatResponse,
  OrientationFormData,
} from "@/types/chat";

/**
 * URL de base du backend.
 *
 * En local :
 * NEXT_PUBLIC_API_URL=http://localhost:8000
 *
 * En production :
 * NEXT_PUBLIC_API_URL=https://orientia-codea-backend.onrender.com
 */
const API_BASE_URL =
  process.env.NEXT_API_URL?.replace(/\/$/, "") ??
  "http://localhost:8000";

/**
 * Erreur spécifique aux appels API.
 */
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

/**
 * Effectue une requête POST JSON vers le backend.
 */
async function postJSON<T>(
  path: string,
  body: unknown
): Promise<T> {
  let response: Response;

  try {
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
  } catch {
    throw new ApiError(
      "Impossible de contacter le serveur. Vérifiez votre connexion.",
      0
    );
  }

  if (!response.ok) {
    let message = `Erreur serveur (${response.status})`;

    try {
      const data = await response.json();

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

  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiError(
      "Le serveur a retourné une réponse invalide.",
      response.status
    );
  }
}

/**
 * Envoie un message au chatbot.
 *
 * Le backend détermine ensuite s'il s'agit :
 *
 * - d'une réponse RAG ;
 * - d'une demande de formulaire ;
 * - d'une recommandation.
 */
export function sendChatMessage(
  message: string,
  sessionId: string | null
): Promise<BackendChatResponse> {
  const payload: BackendChatRequest = {
    message,
    session_id: sessionId,
    profile: null,
  };

  return postJSON<BackendChatResponse>(
    "/api/chat",
    payload
  );
}

/**
 * Envoie le profil complet au backend pour obtenir
 * une recommandation personnalisée.
 */
export function submitOrientationForm(
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
