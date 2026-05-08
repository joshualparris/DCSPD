"use client";

import { useEffect, useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import { modules } from '../../src/data/modules';
import { getInitialProgressSnapshot, getStoredProgressSnapshot, type UserProgress } from '../../src/lib/progress';
import { buildSupervisorCsv, getSupervisorAnalytics } from '../../src/lib/supervisorAnalytics';

function downloadCsv(text: string) {
  const blob = new Blob([text], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'dcsprep-supervisor-summary.csv';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function SupervisorDashboardPage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot(modules));

  useEffect(() => {
    setProgress(getStoredProgressSnapshot(modules));
  }, []);

  const analytics = useMemo(() => getSupervisorAnalytics(progress), [progress]);
  const csv = useMemo(() => buildSupervisorCsv(progress), [progress]);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Supervisor dashboard</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
              Privacy-safe progress, weak areas, and evidence summary
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              This read-only dashboard summarises local progress without showing private answers, transcripts, or
              operational details. It is suitable for a high-level PD conversation, not staff surveillance.
            </p>
          </div>
          <button
            type="button"
            onClick={() => downloadCsv(csv)}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          ['Overall', `${Math.round(analytics.overallProgress)}%`],
          ['Modules', `${analytics.completedModules}/${analytics.totalModules}`],
          ['PD minutes', analytics.totalPdMinutes],
          ['Academic avg', analytics.academicAverage === null ? 'None' : `${Math.round(analytics.academicAverage)}%`]
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">{label}</div>
            <div className="mt-2 text-3xl font-semibold text-slate-900">{value}</div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Manager notes</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            {analytics.managerNotes.map((note) => (
              <li key={note} className="rounded-2xl bg-slate-50 p-4">
                {note}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Weak areas</h2>
          <div className="mt-4 space-y-3">
            {analytics.weakAreas.length ? (
              analytics.weakAreas.map((area) => (
                <div key={area.label} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                  <div className="font-semibold text-slate-900">{area.label}</div>
                  <div className="mt-1">Average score: {Math.round(area.averageScore)}% | Reviews: {area.reviewCount}</div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-600">No weak-topic analytics yet. Complete strict quizzes first.</p>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Academic subjects needing attention</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {analytics.lowAcademicSubjects.map((subject) => (
            <div key={subject.code} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="font-semibold text-slate-900">{subject.code} - {subject.title}</div>
              <div className="mt-2 text-sm text-slate-600">
                Completion {subject.completionPercent}% | Average{' '}
                {subject.averageScore === null ? 'No score yet' : `${Math.round(subject.averageScore)}%`}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
