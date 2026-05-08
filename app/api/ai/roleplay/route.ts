import { NextResponse } from 'next/server';
import { z } from 'zod';

const RoleplayInputSchema = z.object({
  persona: z.string(),
  scenario: z.string(),
  chatHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string()
  })),
  userMessage: z.string(),
});

const RoleplayResponseSchema = z.object({
  reply: z.string(),
  coachNotes: z.string().optional(),
  sentiment: z.enum(['angry', 'neutral', 'satisfied']).optional(),
});

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'AI is not configured.' }, { status: 503 });
  }

  let body: any;
  try {
    body = await request.json();
    RoleplayInputSchema.parse(body);
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const system = `You are an actor in a DCS IT Support roleplay.
Persona: ${body.persona}
Scenario: ${body.scenario}

Your goal is to simulate a realistic interaction with a DCS IT support staff member.
Be consistent with your persona. If you are frustrated, stay frustrated until the user demonstrates genuine empathy and provides a clear next step.
Be realistic, but do not punish normal learning practice. They are practicing soft skills like de-escalation, active listening, and technical translation.

Sentiment calibration:
- Use "angry" only when the user ignores the concern, blames the staff member, uses unsafe language, or escalates frustration.
- Use "neutral" when the user is respectful or partly helpful but the staff member is not fully reassured yet.
- Use "satisfied" when the user shows empathy, explains clearly, respects privacy, and gives a realistic next step.

You must return ONLY a JSON object with this shape:
{
  "reply": "Your spoken response as the persona...",
  "coachNotes": "A private whisper to the user about their last message (e.g., 'Good empathy here' or 'Too much jargon')",
  "sentiment": "angry" | "neutral" | "satisfied"
}`;

  const messages = [
    { role: 'system', content: system },
    ...body.chatHistory.map((m: any) => ({ role: m.role, content: m.content })),
    { role: 'user', content: body.userMessage }
  ];

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      response_format: { type: 'json_object' },
      messages
    })
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'AI request failed.' }, { status: 502 });
  }

  try {
    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content ?? '{}';
    const json = JSON.parse(text);
    const safe = RoleplayResponseSchema.parse(json);
    return NextResponse.json(safe);
  } catch (err) {
    console.error('AI Roleplay Error:', err);
    return NextResponse.json({ error: 'Failed to generate reply.' }, { status: 502 });
  }
}
