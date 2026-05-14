"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ClipboardCheck, FileText, MessageSquare, ShieldCheck } from 'lucide-react';
import AiCoachPanel from '../../src/components/ai/AiCoachPanel';

const sampleNotes = [
  {
    title: 'Printer queue',
    text:
      'Teacher reports print job not releasing from PaperCut in Staffroom. Confirmed other staff can release jobs. Asked teacher to check selected printer and PaperCut balance. Job still held. Escalating with printer name, user impact, time, and screenshot of safe error only.'
  },
  {
    title: 'Wi-Fi dropout',
    text:
      'Library PC intermittently loses network access. Confirmed one device affected so far; nearby staff laptop remains online. Checked Wi-Fi icon, reconnected to correct SSID, and noted time/location. Escalating if pattern repeats across multiple devices.'
  },
  {
    title: 'Portal login',
    text:
      'Parent cannot access portal before excursion deadline. Confirmed request is about login flow only and avoided discussing student details in the note. Suggested password reset path and escalated deadline risk with contact channel and generic error wording.'
  }
];

const rubric = [
  'Clarifies symptom, scope, location, and impact',
  'Names safe first checks and avoids risky admin changes',
  'Protects privacy by excluding names, credentials, internal URLs, and confidential details',
  'Explains escalation trigger, owner, urgency, and evidence attached',
  'Uses calm, professional wording that a senior tech can act on'
];

export default function PeerReviewPage() {
  const [note, setNote] = useState(sampleNotes[0].text);

  const coachInput = useMemo(
    () => ({
      contextType: 'ticket-note' as const,
      prompt: 'Review this school IT ticket note as a senior technician peer reviewer.',
      userAnswer: note,
      modelAnswer:
        'A strong note states the symptom, scope, affected service/device, business or learning impact, safe checks tried, result, privacy-safe evidence, and clear escalation owner/trigger.',
      rubric,
      weakTopic: 'ticket-quality',
      extraContext:
        'Adopt the voice of Paul, a practical senior DCS IT tech. Be direct, fair, and specific. Focus on whether the note helps the next technician move without asking repeat questions. Do not request real names, passwords, private ticket IDs, internal URLs, IP addresses, or confidential procedures.'
    }),
    [note]
  );

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              <ClipboardCheck size={18} />
              Peer review simulation
            </div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Senior-tech ticket note review</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Practise writing notes that a senior technician can trust, act on, and hand over without repeat questions.
            </p>
          </div>
          <Link
            href="/feedback-log"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white"
          >
            Open Feedback Log
          </Link>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            <FileText size={17} />
            Ticket note draft
          </div>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            className="mt-5 min-h-[300px] w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-7 text-slate-900"
          />

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {sampleNotes.map((sample) => (
              <button
                key={sample.title}
                type="button"
                onClick={() => setNote(sample.text)}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white"
              >
                {sample.title}
              </button>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              <ShieldCheck size={17} />
              Review rubric
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              {rubric.map((item) => (
                <li key={item} className="rounded-2xl bg-slate-50 p-3">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[2rem] border border-indigo-100 bg-indigo-50 p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700">
              <MessageSquare size={17} />
              Review posture
            </div>
            <p className="mt-3 text-sm leading-7 text-indigo-900">
              The coach looks for practical handover value: enough detail to continue safely, no private data, and no vague
              &quot;looked into it&quot; wording.
            </p>
          </section>
        </aside>
      </section>

      <AiCoachPanel input={coachInput} minChars={80} />
    </div>
  );
}
