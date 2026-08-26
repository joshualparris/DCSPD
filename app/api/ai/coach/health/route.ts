import { NextResponse } from 'next/server';

const DEFAULT_MODEL = 'openai/gpt-oss-120b';
const FALLBACK_MODELS = [DEFAULT_MODEL, 'openai/gpt-oss-20b'] as const;
const RETIRED_MODEL_REPLACEMENTS: Record<string, string> = {
  'llama-3.3-70b-versatile': DEFAULT_MODEL,
  'llama-3.1-8b-instant': 'openai/gpt-oss-20b'
};

function resolveModel(model: string) {
  return RETIRED_MODEL_REPLACEMENTS[model] ?? model;
}

function pickModelSequence(configuredModel: string) {
  const sequence = [resolveModel(configuredModel), ...FALLBACK_MODELS];
  return Array.from(new Set(sequence));
}

export async function GET() {
  const apiKey = process.env.GROQ_API_KEY;
  const configuredModel = process.env.GROQ_MODEL ?? DEFAULT_MODEL;

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        status: 'missing_key',
        message: 'GROQ_API_KEY is missing in root .env.local'
      },
      { status: 503 }
    );
  }

  try {
    let lastError: { status: number; message: string } | null = null;

    for (const model of pickModelSequence(configuredModel)) {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model,
          temperature: 0,
          max_tokens: 32,
          messages: [{ role: 'user', content: 'Reply with: ok' }]
        })
      });

      if (response.ok) {
        const resolvedConfiguredModel = resolveModel(configuredModel);
        const message =
          configuredModel !== resolvedConfiguredModel
            ? `Configured Groq model "${configuredModel}" has been retired; using "${resolvedConfiguredModel}".`
            : model !== configuredModel
              ? `Configured model "${configuredModel}" is unavailable; using fallback "${model}".`
              : 'Groq AI coaching is configured and reachable.';

        return NextResponse.json({
          ok: true,
          status: 'configured',
          message,
          model
        });
      }

      const text = await response.text().catch(() => '');
      let providerMessage = text;
      try {
        const parsed = JSON.parse(text);
        providerMessage = parsed?.error?.message || parsed?.message || text;
      } catch {
        // keep raw text
      }

      lastError = { status: response.status, message: providerMessage || 'unknown error' };
      const unavailable = /decommissioned|no longer supported|does not exist|model.*not found|do not have access/i.test(
        providerMessage || ''
      );
      if (!unavailable) {
        break;
      }
    }

    return NextResponse.json(
      {
        ok: false,
        status: 'provider_error',
        message: `Groq rejected request (${lastError?.status ?? 502}): ${lastError?.message ?? 'unknown error'}`,
        model: configuredModel
      },
      { status: 502 }
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        status: 'network_error',
        message: 'Could not reach Groq endpoint from server.'
      },
      { status: 502 }
    );
  }
}
