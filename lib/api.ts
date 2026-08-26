// lib/api.ts
//
// Toute la logique réseau vers le backend FastAPI est centralisée ici.
// Adaptez API_BASE_URL et les chemins ("/api/chat", "/api/chat/form")
// aux routes réellement exposées par le backend.

import type {
  BackendChatResponse,
  BackendFormPayload,
} from "@/types/chat";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "https://orientia-codea-backend.onrender.com";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

async function postJSON<T>(path: string, body: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
 * Envoie un message texte libre de l'utilisateur.
 * Le backend décide s'il répond directement (type: "text")
 * ou s'il demande d'afficher le formulaire (type: "form_request").
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
 * Envoie les données du formulaire d'orientation rempli par l'étudiant.
 * Le backend renvoie généralement une recommandation de filière (type: "text").
 */
export function submitOrientationForm(
  payload: BackendFormPayload
): Promise<BackendChatResponse> {
  return postJSON<BackendChatResponse>("/api/chat", payload);
}
