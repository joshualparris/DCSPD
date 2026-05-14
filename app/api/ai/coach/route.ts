import { NextResponse } from 'next/server';
import { z } from 'zod';

const CoachInputSchema = z.object({
  contextType: z.enum(['scenario', 'ticket-note', 'short-answer', 'practical-output', 'freeform']),
  moduleId: z.string().optional(),
  scenarioId: z.string().optional(),
  prompt: z.string().optional(),
  userAnswer: z.string(),
  modelAnswer: z.string().optional(),
  rubric: z.array(z.string()).optional(),
  weakTopic: z.string().optional(),
  extraContext: z.string().optional(),
  redactionSummary: z.string().optional()
});

const CoachResponseSchema = z.object({
  score: z.number(),
  strengths: z.array(z.string()),
  missing: z.array(z.string()),
  riskNotes: z.array(z.string()),
  betterAnswer: z.string(),
  nextPractice: z.string(),
  rubricGrade: z.object({
    score: z.number(),
    maxScore: z.number(),
    percentage: z.number(),
    level: z.enum(['needs-work', 'developing', 'competent', 'strong', 'excellent']),
    strengths: z.array(z.string()),
    missing: z.array(z.string()),
    privacyFlags: z.array(z.string()),
    escalationFeedback: z.array(z.string()),
    improvedExample: z.string().optional(),
    criteriaResults: z.array(z.object({
      criterionId: z.string(),
      label: z.string(),
      met: z.boolean(),
      pointsAwarded: z.number(),
      pointsPossible: z.number(),
      feedback: z.string()
    }))
  }).optional()
});

/**
 * Extracts the first JSON object from a string, handling triple backticks and filler text.
 */
function extractJson(text: string) {
  try {
    // Try direct parse first
    return JSON.parse(text);
  } catch {
    // Try to find content between triple backticks
    const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (match) {
      try {
        const cleaned = match[1].trim();
        return JSON.parse(cleaned);
      } catch {
        // fall through
      }
    }

    // Try to find the first '{' and last '}'
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      try {
        const candidate = text.substring(firstBrace, lastBrace + 1);
        // Remove common non-JSON characters that might be appended
        const cleanedCandidate = candidate.replace(/^[^{]*/, '').replace(/[^}]$/, '');
        return JSON.parse(cleanedCandidate);
      } catch {
        // fall through
      }
    }

    // Last resort: log what failed and throw
    console.error('FAILED TO PARSE AI RESPONSE:', text);
    throw new Error('Could not extract valid JSON from AI response.');
  }
}

const FALLBACK_MODELS = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant'] as const;

function pickModelSequence(configuredModel: string) {
  // Prefer the current best-performing Groq model
  const bestModel = 'llama-3.3-70b-versatile';
  const sequence = [configuredModel, bestModel, 'llama-3.1-8b-instant'];
  return Array.from(new Set(sequence));
}

async function callGroq(apiKey: string, model: string, userPayload: unknown, system: string) {
  console.log(`Calling Groq with model: ${model}`);
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      temperature: 0.1, // Lower temperature for more consistent JSON
      response_format: { type: 'json_object' }, // Explicit JSON mode
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: JSON.stringify(userPayload) }
      ]
    })
  });

  const text = await response.text().catch(() => '');
  let providerMessage = text;
  try {
    const parsed = JSON.parse(text);
    providerMessage = parsed?.error?.message || parsed?.message || text;
  } catch {
    // keep raw text
  }

  return {
    ok: response.ok,
    status: response.status,
    providerMessage,
    rawText: text
  };
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  const configuredModel = process.env.GROQ_MODEL ?? 'llama-3.3-70b-versatile';

  if (!apiKey) {
    return NextResponse.json({ error: 'AI coaching is not configured.' }, { status: 503 });
  }

  let parsedBody: z.infer<typeof CoachInputSchema>;
  try {
    const body = await request.json();
    parsedBody = CoachInputSchema.parse(body);
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const system = [
    'You are a DCSPrep IT support coach.',
    'Give concise feedback for Level 1 school IT support practice.',
    'Do not invent DCS policies.',
    'Do not request or include confidential information.',
    'Focus on triage, evidence capture, privacy, escalation quality, and safe boundaries.',
    'Scoring rule: if userAnswer is semantically equivalent to modelAnswer and aligns with rubric, score should usually be 85-100.',
    'For assessment grading, use 85-100 for correct, 70-84 for mostly correct, 50-69 for partly correct, and under 50 for needs revision.',
    'If the answer misses required success criteria, name the missing criteria clearly.',
    'Do not give low scores for wording differences when meaning is correct.',
    'If redactionSummary indicates many redactions, mention uncertainty but still score based on remaining meaning.',
    'If a rubric is provided (in the "rubric" field), you MUST also perform a detailed criterion-by-criterion analysis and return it in the "rubricGrade" field.',
    'CRITICAL: You must return ONLY a single JSON object. No conversational filler, no introductory text, no markdown formatting outside the JSON.',
    'CRITICAL: You must return ALL fields in the JSON even if they are empty arrays or placeholder strings.',
    'For "freeform" context (learning plans), use the "betterAnswer" field for the main 7-day plan text.',
    'Return JSON only with this exact shape:',
    JSON.stringify({
      score: 0,
      strengths: ['string'],
      missing: ['string'],
      riskNotes: ['string'],
      betterAnswer: 'string',
      nextPractice: 'string',
      rubricGrade: {
        score: 0,
        maxScore: 0,
        percentage: 0,
        level: 'excellent',
        strengths: ['string'],
        missing: ['string'],
        privacyFlags: ['string'],
        escalationFeedback: ['string'],
        improvedExample: 'string',
        criteriaResults: [{
          criterionId: 'string',
          label: 'string',
          met: true,
          pointsAwarded: 1,
          pointsPossible: 1,
          feedback: 'string'
        }]
      }
    })
  ].join('\n');

  let lastError: { status: number; providerMessage: string } | null = null;
  for (const model of pickModelSequence(configuredModel)) {
    const attempt = await callGroq(apiKey, model, parsedBody, system);

    if (attempt.ok) {
      try {
        const data = JSON.parse(attempt.rawText);
        const text = data?.choices?.[0]?.message?.content ?? '{}';
        
        console.log('--- RAW AI RESPONSE START ---');
        console.log(text);
        console.log('--- RAW AI RESPONSE END ---');

        const json = extractJson(text);
        const safe = CoachResponseSchema.parse(json);
        return NextResponse.json(safe);
      } catch (err) {
        console.error('AI JSON Parse Error:', err);
        return NextResponse.json(
          { error: 'AI coaching returned an invalid response. Try again.' },
          { status: 502 }
        );
      }
    }

    lastError = { status: attempt.status, providerMessage: attempt.providerMessage };
    const decommissioned = /decommissioned|no longer supported|model.*not found/i.test(
      attempt.providerMessage || ''
    );
    if (!decommissioned) {
      break;
    }
    // If decommissioned, try next fallback model.
  }

  const suffix = lastError?.providerMessage ? ` ${lastError.providerMessage}` : '';
  return NextResponse.json(
    { error: `AI coaching request failed (${lastError?.status ?? 502}).${suffix}`.trim() },
    { status: 502 }
  );
}
