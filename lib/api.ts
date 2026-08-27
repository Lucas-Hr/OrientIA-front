// lib/api.ts

/**
 * Toute la logique réseau vers le backend FastAPI
 * est centralisée ici.
 */

import type {
  BackendChatResponse,
  BackendFormPayload,
  BackendOrientationResponse,
} from "@/types/chat";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "http://127.0.0.1:8000";

/**
 * Erreur provenant de l'API.
 */
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

/**
 * Fonction générique POST JSON.
 */
async function postJSON<T>(
  path: string,
  body: unknown
): Promise<T> {
  let res: Response;

  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
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

  if (!res.ok) {
    const errText = await res.text().catch(() => "");

    throw new ApiError(
      errText || `Erreur serveur (${res.status})`,
      res.status
    );
  }

  return res.json() as Promise<T>;
}

/**
 * Envoie un message conversationnel au backend.
 *
 * Le backend décide :
 *
 * - type = "text"
 *      → réponse normale, généralement RAG
 *
 * - type = "form_request"
 *      → le frontend doit afficher le formulaire
 */
export function sendChatMessage(
  message: string,
  sessionId: string | null
): Promise<BackendChatResponse> {
  return postJSON<BackendChatResponse>("/chat", {
    message,
    session_id: sessionId,
  });
}

/**
 * Envoie le profil complet au moteur d'orientation ML.
 *
 * Endpoint backend :
 *
 * POST /orientation/recommend
 */
export function submitOrientationForm(
  payload: BackendFormPayload
): Promise<BackendOrientationResponse> {
  return postJSON<BackendOrientationResponse>(
    "/orientation/recommend",
    payload
  );
}