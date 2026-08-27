// lib/api.ts

import type {
  BackendChatResponse,
  BackendFormPayload,
  OrientationFormData,
} from "@/types/chat";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "https://localhost:8000";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

async function postJSON<T>(
  path: string,
  body: unknown
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
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

      if (typeof data?.detail === "string") {
        message = data.detail;
      }
    } catch {
      // On conserve le message générique.
    }

    throw new ApiError(message, response.status);
  }

  return response.json() as Promise<T>;
}

/**
 * Envoie un message au chatbot.
 *
 * Le backend détermine ensuite s'il s'agit :
 * - d'une réponse générale ;
 * - d'une demande de formulaire ;
 * - d'une recommandation.
 */
export function sendChatMessage(
  message: string,
  sessionId: string | null
): Promise<BackendChatResponse> {
  return postJSON<BackendChatResponse>("/api/chat", {
    message,
    session_id: sessionId,
  });
}

/**
 * Envoie le profil complet au backend pour obtenir
 * une recommandation personnalisée.
 */
export function submitOrientationForm(
  data: OrientationFormData,
  sessionId: string | null
): Promise<BackendChatResponse> {
  return postJSON<BackendChatResponse>("/api/chat", {
    message:
      "Voici mon profil d'orientation. Je souhaite recevoir une recommandation de parcours.",
    session_id: sessionId,
    profile: data,
  });
}