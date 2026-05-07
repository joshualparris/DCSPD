"use client";

import { useEffect, useState } from 'react';
import { weakTopicLabels } from '../../src/data/skillDomains';
import { generateMonthlyPdSummary } from '../../src/lib/pdSummary';
import { getCurrentWeakFocus } from '../../src/lib/readinessMath';
import AiCoachPanel from '../../src/components/ai/AiCoachPanel';
import {
  addPdEntry,
  getInitialProgressSnapshot,
  getStoredProgressSnapshot,
  saveProgress,
  type PdEntry,
  type PdEntryType,
  type UserProgress
} from '../../src/lib/progress';

const templates = [
  {
    id: 'a-plus-video',
    label: 'A+ video watched',
    type: 'module-study' as const,
    title: 'A+ concept review',
    evidenceSummary: 'I reviewed one support concept and linked it to a DCS classroom or device situation.'
  },
  {
    id: 'cisco-lesson',
    label: 'Cisco Networking lesson',
    type: 'module-study' as const,
    title: 'Networking concepts',
    evidenceSummary: 'I clarified a networking idea and documented where it would appear during school support.'
  },
  {
    id: 'microsoft-learn',
    label: 'Microsoft Learn lesson',
    type: 'module-study' as const,
    title: 'M365 or identity concept',
    evidenceSummary: 'I mapped a Microsoft concept to a DCS support scenario within operational boundaries.'
  },
  {
    id: 'academic-pd-study',
    label: 'Academic PD subject study',
    type: 'module-study' as const,
    title: 'Academic SLG / SILO study',
    evidenceSummary: 'I studied an RBC or SMITB learning outcome and mapped it to a privacy-safe DCS IT support capability.'
  },
  {
    id: 'scenario-practice',
    label: 'DCS scenario practice',
    type: 'scenario' as const,
    title: 'Scenario practice',
    evidenceSummary: 'I completed a multi-step support scenario and identified an area for further review.'
  },
  {
    id: 'ticket-reflection',
    label: 'Ticket reflection, no private details',
    type: 'reflection' as const,
    title: 'Support reflection',
    evidenceSummary: 'I reflected on the support pattern without copying private operational details.'
  },
  {
    id: 'sop-created',
    label: 'SOP or checklist created',
    type: 'practical-output' as const,
    title: 'Process improvement output',
    evidenceSummary: 'I converted an unclear support area into a cleaner checklist or quick-reference document.'
  }
];

function getTodayDateKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function getMonthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export default function PdLogPage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot());
  const [hasHydratedProgress, setHasHydratedProgress] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState<{
    date: string;
    minutes: number;
    type: PdEntryType;
    title: string;
    evidenceSummary: string;
    reflection: string;
    moduleIds: string;
    scenarioIds: string;
    practicalOutputIds: string;
    templateId?: string;
    privacyChecked: boolean;
  }>({
    date: '',
    minutes: 20,
    type: 'reflection',
    title: '',
    evidenceSummary: '',
    reflection: '',
    moduleIds: '',
    scenarioIds: '',
    practicalOutputIds: '',
    templateId: undefined,
    privacyChecked: false
  });

  useEffect(() => {
    setProgress(getStoredProgressSnapshot());
    setHasHydratedProgress(true);
    setForm((current) => ({
      ...current,
      date: current.date || getTodayDateKey()
    }));
  }, []);

  useEffect(() => {
    if (!hasHydratedProgress) {
      return;
    }

    saveProgress(progress);
  }, [hasHydratedProgress, progress]);

  const monthKey = getMonthKey(new Date());
  const monthlyEntries = progress.pdEntries.filter((entry) => entry.createdAtIso.startsWith(monthKey));
  const monthlyMinutes = monthlyEntries.reduce((sum, entry) => sum + entry.minutes, 0);
  const modulesTouched = new Set(monthlyEntries.flatMap((entry) => entry.moduleIds ?? [])).size;
  const monthlySummary = generateMonthlyPdSummary(progress, monthKey);
  const topWeakAreas = Object.values(progress.weakTopicReviews)
    .sort((left, right) => left.averageScore - right.averageScore)
    .slice(0, 3)
    .map((review) => weakTopicLabels[review.topic]);
  const summaryMarkdown = [
    `# DCSPrep PD Summary (${monthKey})`,
    '',
    '> Keep this personal and privacy-safe. Do not include student, staff, parent, network, or credential details.',
    '',
    `Period: ${monthlySummary.startDateIso} to ${monthlySummary.endDateIso}`,
    '',
    '## Summary',
    `- Total PD minutes: ${monthlySummary.totalMinutes}`,
    `- Entries logged: ${monthlySummary.entryCount}`,
    `- Modules touched: ${monthlySummary.moduleCount}`,
    `- Scenarios completed: ${monthlySummary.scenariosCompleted}`,
    `- Outputs created: ${monthlySummary.outputsCreated}`,
    `- Current weak areas: ${monthlySummary.currentWeakAreas.length ? monthlySummary.currentWeakAreas.join(', ') : 'Not enough evidence yet'}`,
    `- Suggested next focus: ${monthlySummary.suggestedNextFocus}`,
    '',
    '## Entries',
    ...(monthlyEntries.length
      ? monthlyEntries.map((entry) => `- ${entry.createdAtIso.slice(0, 10)} | ${entry.minutes} min | ${entry.type} | ${entry.title}: ${entry.evidenceSummary}`)
      : ['- No PD entries logged yet this month.']),
    ''
  ].join('\n');

  function applyTemplate(templateId: string) {
    const template = templates.find((entry) => entry.id === templateId);
    if (!template) {
      return;
    }

    setForm((current) => ({
      ...current,
      type: template.type,
      title: template.title,
      evidenceSummary: template.evidenceSummary,
      templateId: template.id
    }));
  }

  function parseIdList(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return undefined;
    const parts = trimmed
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean);
    return parts.length ? parts : undefined;
  }

  function submitEntry() {
    if (!form.title || !form.evidenceSummary || !form.privacyChecked) {
      return;
    }

    const entry: PdEntry = {
      id: `pd-${Date.now()}`,
      createdAtIso: `${form.date}T00:00:00.000Z`,
      type: form.type,
      title: form.title,
      minutes: form.minutes,
      moduleIds: parseIdList(form.moduleIds),
      scenarioIds: parseIdList(form.scenarioIds),
      practicalOutputIds: parseIdList(form.practicalOutputIds),
      evidenceSummary: form.evidenceSummary,
      reflection: form.reflection.trim() ? form.reflection.trim() : undefined,
      privacyChecked: form.privacyChecked
    };

    setProgress((current) => addPdEntry(current, entry));

    setForm({
      date: getTodayDateKey(),
      minutes: 20,
      type: 'reflection',
      title: '',
      evidenceSummary: '',
      reflection: '',
      moduleIds: '',
      scenarioIds: '',
      practicalOutputIds: '',
      templateId: undefined,
      privacyChecked: false
    });
  }

  async function copyMarkdown() {
    await navigator.clipboard.writeText(summaryMarkdown);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">PD log</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Record professional development activity that improves support quality.
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Keep entries short, practical, and privacy-safe. This is evidence of learning progress, not a place to
            record confidential ticket detail.
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Privacy reminder</div>
        <p className="mt-3 text-sm leading-7 text-amber-900">
          Do not enter sensitive DCS, student, staff, parent, network, credential, or incident details. Reflect on
          the learning pattern, not the confidential record.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Add PD log entry</h2>

          <div className="mt-5 flex flex-wrap gap-2">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => applyTemplate(template.id)}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"
              >
                {template.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="text-sm text-slate-700">
              Date
              <input
                type="date"
                value={form.date}
                onChange={(event) => setForm({ ...form, date: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
              />
            </label>
            <label className="text-sm text-slate-700">
              Minutes
              <input
                type="number"
                min={5}
                step={5}
                value={form.minutes}
                onChange={(event) => setForm({ ...form, minutes: Number(event.target.value) })}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
              />
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              Entry type
              <select
                value={form.type}
                onChange={(event) => setForm({ ...form, type: event.target.value as PdEntryType })}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
              >
                {(
                  [
                    'module-study',
                    'quiz',
                    'scenario',
                    'flashcards',
                    'practical-output',
                    'focus-block',
                    'reflection',
                    'ai-coaching'
                  ] as const
                ).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              Title
              <input
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
                placeholder="What did you do?"
              />
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              Evidence summary
              <textarea
                value={form.evidenceSummary}
                onChange={(event) => setForm({ ...form, evidenceSummary: event.target.value })}
                className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3"
                placeholder="What improved, changed, or became clearer?"
              />
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              Reflection / next step (optional)
              <textarea
                value={form.reflection}
                onChange={(event) => setForm({ ...form, reflection: event.target.value })}
                className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3"
                placeholder="What will you do next time?"
              />
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              Module IDs (optional, comma-separated)
              <input
                value={form.moduleIds}
                onChange={(event) => setForm({ ...form, moduleIds: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
                placeholder="e.g. dns-dhcp-gateway-ip-basics, printer-troubleshooting"
              />
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              Scenario IDs (optional, comma-separated)
              <input
                value={form.scenarioIds}
                onChange={(event) => setForm({ ...form, scenarioIds: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
                placeholder="e.g. hdmi-works-no-audio"
              />
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              Practical output IDs (optional, comma-separated)
              <input
                value={form.practicalOutputIds}
                onChange={(event) => setForm({ ...form, practicalOutputIds: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
                placeholder="e.g. printer-triage-checklist"
              />
            </label>
          </div>

          <label className="mt-5 flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={form.privacyChecked}
              onChange={(event) => setForm({ ...form, privacyChecked: event.target.checked })}
              className="mt-1 h-4 w-4"
            />
            <span>I confirm this contains no student or staff private details.</span>
          </label>

          <button onClick={submitEntry} className="mt-5 rounded-full bg-slate-900 px-4 py-2 text-sm text-white">
            Save PD entry
          </button>

          <div className="mt-6">
            <AiCoachPanel
              input={{
                contextType: 'freeform',
                prompt: 'Give feedback on a PD log entry. Ensure it is privacy-safe and evidence-based.',
                userAnswer: `Title: ${form.title}\nEvidence: ${form.evidenceSummary}\nNext: ${form.reflection}`.trim(),
                rubric: [
                  'Privacy-safe wording',
                  'Clear evidence of learning or practice',
                  'Concrete next step',
                  'Avoids copying live operational details'
                ],
                extraContext: `Entry type: ${form.type}`
              }}
              debounceMs={1200}
              minChars={120}
            />
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Monthly summary</h2>
            <div className="mt-5 space-y-3 text-sm text-slate-700">
              <div>Total minutes: {monthlyMinutes}</div>
              <div>Modules touched: {modulesTouched}</div>
              <div>
                Top weak areas: {topWeakAreas.length ? topWeakAreas.join(', ') : 'None recorded yet'}
              </div>
              <div>Suggested next focus: {getCurrentWeakFocus(progress)}</div>
            </div>
            <button
              onClick={copyMarkdown}
              className="mt-5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
            >
              {copied ? 'Markdown copied' : 'Export summary as Markdown'}
            </button>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">This month&apos;s entries</h2>
            <div className="mt-5 space-y-4">
              {monthlyEntries.length ? (
                monthlyEntries.map((entry) => (
                  <div key={entry.id} className="rounded-3xl bg-slate-50 p-4">
                    <div className="text-sm font-semibold text-slate-900">
                      {entry.createdAtIso.slice(0, 10)} | {entry.minutes} min | {entry.type} | {entry.title}
                    </div>
                    <p className="mt-2 text-sm text-slate-700">{entry.evidenceSummary}</p>
                    {entry.reflection ? <p className="mt-2 text-sm text-slate-600">Next step: {entry.reflection}</p> : null}
                  </div>
                ))
              ) : (
                <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">No PD entries logged yet this month.</div>
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
