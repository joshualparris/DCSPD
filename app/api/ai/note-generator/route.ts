import { NextResponse } from 'next/server';
import { z } from 'zod';

const NoteInputSchema = z.object({
  scenarioTitle: z.string(),
  initialReport: z.string(),
  userChoices: z.array(z.string()),
  draftNote: z.string().optional(),
});

const NoteResponseSchema = z.object({
  formattedNote: z.string(),
  explanation: z.string().optional(),
});

function extractJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (match) {
      try {
        return JSON.parse(match[1].trim());
      } catch { }
    }
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      try {
        return JSON.parse(text.substring(firstBrace, lastBrace + 1));
      } catch { }
    }
    throw new Error('Could not extract valid JSON from AI response.');
  }
}

async function callGroq(apiKey: string, model: string, userPayload: unknown, system: string) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      temperature: 0.1,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: JSON.stringify(userPayload) }
      ]
    })
  });

  return response;
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'AI is not configured.' }, { status: 503 });
  }

  let body: any;
  try {
    body = await request.json();
    NoteInputSchema.parse(body);
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const system = `You are a DCS IT Support Documentation Assistant. 
Your goal is to convert a user's scenario results and draft notes into a professional Jira escalation note.

Follow these standards:
1. **Symptom Clarity**: State exactly what is happening (e.g., "Classroom display shows 'No Signal'" instead of "Board not working").
2. **Scope**: Identify if it's one device, one user, one room, or multiple.
3. **Safe Steps Tried**: List the specific, non-invasive troubleshooting steps completed (e.g., "Checked cable connections", "Verified SSID").
4. **Privacy**: Ensure NO student names or staff personal details are included. Use "Staff Member" or "Student" if needed.
5. **Formatting**: Use a clear, structured format (e.g., headings or bullet points) suitable for a Jira ticket.
6. **Tone**: Professional, technical, and objective.

You must return ONLY a JSON object with this shape:
{
  "formattedNote": "The complete Jira note text...",
  "explanation": "Briefly explain why this is a good note (optional)"
}`;

  const response = await callGroq(apiKey, 'llama-3.3-70b-versatile', body, system);

  if (!response.ok) {
    return NextResponse.json({ error: 'AI request failed.' }, { status: 502 });
  }

  try {
    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content ?? '{}';
    const json = extractJson(text);
    const safe = NoteResponseSchema.parse(json);
    return NextResponse.json(safe);
  } catch (err) {
    console.error('AI Note Generator Error:', err);
    return NextResponse.json({ error: 'Failed to generate note.' }, { status: 502 });
  }
}
