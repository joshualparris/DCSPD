import { NextResponse } from 'next/server';
import { z } from 'zod';

const GenerateSchema = z.object({
  mode: z.literal('generate'),
  title: z.string(),
  weakestDomain: z.string(),
  attempts: z.array(
    z.object({
      domain: z.string(),
      weakTopic: z.string(),
      totalScore: z.number()
    })
  )
});

const EvaluateSchema = z.object({
  mode: z.literal('evaluate'),
  question: z.string(),
  answer: z.string(),
  contextTitle: z.string()
});

const RequestSchema = z.union([GenerateSchema, EvaluateSchema]);

const FALLBACK_MODELS = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant'] as const;

function pickModelSequence(configuredModel: string) {
  const sequence = [configuredModel, ...FALLBACK_MODELS];
  return Array.from(new Set(sequence));
}

async function callGroq(apiKey: string, model: string, messages: Array<{ role: string; content: string }>) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages
    })
  });

  const text = await response.text().catch(() => '');
  let providerMessage = text;
  try {
    const parsed = JSON.parse(text);
    providerMessage = parsed?.error?.message || parsed?.message || text;
  } catch {
    // keep raw
  }

  return {
    ok: response.ok,
    status: response.status,
    rawText: text,
    providerMessage
  };
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  const configuredModel = process.env.GROQ_MODEL ?? 'llama-3.3-70b-versatile';

  if (!apiKey) {
    return NextResponse.json({ error: 'AI coaching is not configured.' }, { status: 503 });
  }

  let parsed: z.infer<typeof RequestSchema>;
  try {
    parsed = RequestSchema.parse(await request.json());
  } catch {
    return NextResponse.json({ error: 'Invalid oral exam request.' }, { status: 400 });
  }

  const system =
    parsed.mode === 'generate'
      ? [
          'You are an oral IT examiner for DCSPrep.',
          'Generate exactly 3 short viva questions based on the weakest domain and weak topics.',
          'Questions must be practical, Level 1-safe, and privacy-safe.',
          'Return JSON only: {"questions":["q1","q2","q3"]}'
        ].join('\n')
      : [
          'You are an oral IT examiner for DCSPrep.',
          'Evaluate a short answer fairly.',
          'If meaning is correct, score should be high even if wording differs.',
          'Return JSON only: {"score":number,"feedback":"...","idealAnswer":"...","nextQuestionPrompt":"..."}'
        ].join('\n');

  const userContent =
    parsed.mode === 'generate'
      ? JSON.stringify(parsed)
      : JSON.stringify({
          contextTitle: parsed.contextTitle,
          question: parsed.question,
          answer: parsed.answer
        });

  let lastError: { status: number; message: string } | null = null;
  for (const model of pickModelSequence(configuredModel)) {
    const attempt = await callGroq(apiKey, model, [
      { role: 'system', content: system },
      { role: 'user', content: userContent }
    ]);

    if (attempt.ok) {
      try {
        const payload = JSON.parse(attempt.rawText);
        const text = payload?.choices?.[0]?.message?.content ?? '{}';
        const json = JSON.parse(text);
        return NextResponse.json(json);
      } catch {
        return NextResponse.json({ error: 'Oral exam AI returned invalid JSON.' }, { status: 502 });
      }
    }

    lastError = { status: attempt.status, message: attempt.providerMessage };
    const decommissioned = /decommissioned|no longer supported|model.*not found/i.test(
      attempt.providerMessage || ''
    );
    if (!decommissioned) break;
  }

  return NextResponse.json(
    { error: `Oral exam AI failed (${lastError?.status ?? 502}): ${lastError?.message ?? 'unknown error'}` },
    { status: 502 }
  );
}

