"use client";

import { useState } from 'react';
import AiCoachPanel from '../../src/components/ai/AiCoachPanel';

const articleTracks = [
  {
    id: 'parent-portal',
    title: 'Parent Portal help article',
    audience: 'Parents and front-office handoff',
    prompts: [
      'What exact workflow stage is the article covering?',
      'What safe first checks can the reader do alone?',
      'What private detail must never be requested or reproduced?',
      'When should the article tell the reader to escalate or contact the school?'
    ],
    skeleton: [
      'Purpose and who this is for',
      'What usually causes this issue',
      'What to check first',
      'What information to have ready',
      'When the school needs to take over'
    ]
  },
  {
    id: 'sentral',
    title: 'Sentral quick triage article',
    audience: 'Staff',
    prompts: [
      'Is this article about markbook visibility, access keys, or reporting timing?',
      'What exact screen or function should the reader identify first?',
      'What evidence improves the note if the article does not solve it?',
      'What owner boundary must stay explicit?'
    ],
    skeleton: [
      'What this article helps with',
      'How to describe the exact Sentral issue',
      'Safe first checks',
      'What to include in a support request',
      'Escalation boundary'
    ]
  },
  {
    id: 'password',
    title: 'Password help article',
    audience: 'Staff or students',
    prompts: [
      'How will the article separate forgotten password, lockout, and suspicious behaviour?',
      'What approved self-service step belongs here?',
      'What security warning must be included?',
      'At what point should the article stop and direct the user to support?'
    ],
    skeleton: [
      'Which sign-in state this article covers',
      'Safe self-service path',
      'What not to do',
      'What to tell support if it still fails',
      'Security-sensitive escalation trigger'
    ]
  },
  {
    id: 'onboarding',
    title: 'Onboarding checklist article',
    audience: 'Internal staff workflow owners',
    prompts: [
      'What request details make the workflow complete?',
      'How will the checklist separate request, provisioning, and validation?',
      'What role-based differences must be named?',
      'What items should never be copied into the PD repo?'
    ],
    skeleton: [
      'Request completeness',
      'Approval and owner checkpoints',
      'Provisioning tasks',
      'Day-one validation',
      'Missing-access escalation note'
    ]
  }
];

const sopPrompts = [
  'Write the SOP as a sequence someone else could actually follow under time pressure.',
  'Separate safe Level 1 checks from owner-only actions.',
  'Add one privacy reminder and one escalation trigger.',
  'Finish with the note or evidence the next person would need.'
];

export default function KnowledgeBaseLabPage() {
  const [selectedTrackId, setSelectedTrackId] = useState(articleTracks[0].id);
  const [draft, setDraft] = useState('');
  const selectedTrack = articleTracks.find((track) => track.id === selectedTrackId) || articleTracks[0];

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Knowledge base lab</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Turn repeated support themes into safe articles and SOPs
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Use this lab to practice article and SOP writing that could later become OurDCS-ready help content. Teach
            the workflow clearly, but do not copy private internal documents or live ticket details into the repo.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="space-y-4">
          {articleTracks.map((track) => (
            <button
              key={track.id}
              onClick={() => setSelectedTrackId(track.id)}
              className={`w-full rounded-[2rem] border p-5 text-left shadow-sm ${
                selectedTrack.id === track.id ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-800'
              }`}
            >
              <div className="text-xs uppercase tracking-[0.2em] opacity-70">{track.audience}</div>
              <div className="mt-3 text-xl font-semibold">{track.title}</div>
            </button>
          ))}
        </aside>

        <div className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">{selectedTrack.title}</h2>
            <p className="mt-2 text-sm text-slate-600">Audience: {selectedTrack.audience}</p>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5">
                <div className="font-semibold text-slate-900">Authoring workflow</div>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>- Identify the repeated ticket theme and exact workflow stage.</li>
                  <li>- Strip out private names, IDs, screenshots, and copied internal wording.</li>
                  <li>- Write the safe first checks the user can do alone.</li>
                  <li>- Make the escalation boundary explicit.</li>
                  <li>- End with the evidence the user should provide if it still fails.</li>
                </ul>
              </div>

              <div className="rounded-3xl bg-slate-50 p-5">
                <div className="font-semibold text-slate-900">Prompt set</div>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {selectedTrack.prompts.map((prompt) => (
                    <li key={prompt}>- {prompt}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5">
              <div className="font-semibold text-slate-900">Suggested article skeleton</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {selectedTrack.skeleton.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>

            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              className="mt-5 min-h-56 w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-800"
              placeholder="Draft your article or SOP outline here."
            />

            <div className="mt-6">
              <AiCoachPanel
                input={{
                  contextType: 'freeform',
                  prompt: `Draft a privacy-safe help article/SOP. Audience: ${selectedTrack.audience}.`,
                  userAnswer: draft,
                  rubric: [
                    'Names the exact workflow stage',
                    'Includes safe first checks',
                    'Includes privacy warning',
                    'Includes escalation boundary',
                    'Ends with evidence request for support'
                  ],
                  extraContext: `Track: ${selectedTrack.title}`
                }}
                debounceMs={1200}
                minChars={160}
              />
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">SOP practice route</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {sopPrompts.map((prompt) => (
                <li key={prompt}>- {prompt}</li>
              ))}
            </ul>
            <div className="mt-5 rounded-3xl bg-slate-50 p-5 text-sm text-slate-700">
              A good SOP practice output for this repo should end with one thing:
              <div className="mt-2 font-semibold text-slate-900">
                the clean note, checklist, or escalation handoff someone could really use under pressure.
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
