"use client";

import { useEffect, useState } from 'react';
import { modules } from '../../src/data/modules';
import { generateEvidencePackMarkdown, type EvidencePackOptions } from '../../src/lib/evidencePack';
import { getStoredProgressSnapshot, getInitialProgressSnapshot, type UserProgress } from '../../src/lib/progress';

function getTodayDateKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function getMonthStartKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`;
}

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function EvidencePackPage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot(modules));
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<EvidencePackOptions>(() => ({
    startDateIso: getMonthStartKey(),
    endDateIso: getTodayDateKey(),
    includeModules: true,
    includeScenarios: true,
    includePracticalOutputs: true,
    includeReflections: true,
    includeReadiness: true
  }));

  useEffect(() => {
    setProgress(getStoredProgressSnapshot(modules));
  }, []);

  const markdown = generateEvidencePackMarkdown(progress, options);
  const completedOutputs = modules.reduce((sum, module) => {
    return sum + Object.values(progress.modules[module.id]?.practicalOutputs || {}).filter(Boolean).length;
  }, 0);
  const completedScenarios = progress.scenarioRuns.filter((run) => run.completed).length;

  async function copyMarkdown() {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Evidence pack</div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              Gather visible proof of study, practice, and support-quality outputs
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Use this page to collect privacy-safe evidence of learning progress without turning the app into a copy
              of live DCS work records.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={copyMarkdown}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
            >
              {copied ? 'Evidence pack copied' : 'Copy Markdown'}
            </button>
            <button
              onClick={() => downloadTextFile(`dcs-prep-evidence-pack-${options.startDateIso}-to-${options.endDateIso}.md`, markdown)}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
            >
              Download .md
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Privacy guardrail</div>
        <p className="mt-3 text-sm leading-7 text-amber-900">
          Do not include live ticket details, student names, parent names, staff names, credentials, IP addresses,
          internal URLs, screenshots, device serials, or confidential DCS procedures.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Filters</h2>
          <div className="mt-5 grid gap-4">
            <label className="text-sm text-slate-700">
              Start date
              <input
                type="date"
                value={options.startDateIso}
                onChange={(event) => setOptions((current) => ({ ...current, startDateIso: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
              />
            </label>
            <label className="text-sm text-slate-700">
              End date
              <input
                type="date"
                value={options.endDateIso}
                onChange={(event) => setOptions((current) => ({ ...current, endDateIso: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
              />
            </label>

            {(
              [
                ['includeModules', 'Include modules studied'],
                ['includeScenarios', 'Include scenario practice'],
                ['includePracticalOutputs', 'Include practical outputs'],
                ['includeReflections', 'Include reflections (privacy-checked)'],
                ['includeReadiness', 'Include readiness snapshot']
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={options[key]}
                  onChange={(event) => setOptions((current) => ({ ...current, [key]: event.target.checked }))}
                  className="mt-1 h-4 w-4"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <section className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-sm text-slate-500">Focus sessions</div>
              <div className="mt-3 text-2xl font-semibold text-slate-900">{progress.focusSessions.length}</div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-sm text-slate-500">Practical outputs completed</div>
              <div className="mt-3 text-2xl font-semibold text-slate-900">{completedOutputs}</div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-sm text-slate-500">Scenarios completed</div>
              <div className="mt-3 text-2xl font-semibold text-slate-900">{completedScenarios}</div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Markdown preview</h2>
            <pre className="mt-5 overflow-x-auto rounded-3xl bg-slate-950 p-5 text-sm leading-7 text-slate-100">
              {markdown}
            </pre>
          </section>
        </div>
      </section>

    </div>
  );
}
