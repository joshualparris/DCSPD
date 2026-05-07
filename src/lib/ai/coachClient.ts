import { sanitizeForAi } from './sanitizeForAi';
import type { AiCoachFeedback, AiCoachInput } from './coachTypes';

export type CoachResult =
  | { ok: true; feedback: AiCoachFeedback; redactionSummary: string }
  | { ok: false; error: string; redactionSummary: string };

export async function requestAiCoachFeedback(input: AiCoachInput): Promise<CoachResult> {
  const sanitized = sanitizeForAi(input.userAnswer);
  const body: AiCoachInput = {
    ...input,
    userAnswer: sanitized.text,
    redactionSummary: sanitized.redactionSummary
  };

  try {
    const response = await fetch('/api/ai/coach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      return { ok: false, error: payload?.error || 'AI coaching request failed.', redactionSummary: sanitized.redactionSummary };
    }

    const feedback = (await response.json()) as AiCoachFeedback;
    return { ok: true, feedback, redactionSummary: sanitized.redactionSummary };
  } catch {
    return { ok: false, error: 'AI coaching is unavailable right now.', redactionSummary: sanitized.redactionSummary };
  }
}

