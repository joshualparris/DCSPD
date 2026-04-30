"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { modules } from '../../src/data/modules';
import { getModuleCompletion, getOverallProgress } from '../../src/lib/moduleMath';
import { getInitialProgressSnapshot, getStoredProgressSnapshot, type UserProgress } from '../../src/lib/progress';

export default function ProgressPage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot(modules));

  useEffect(() => {
    setProgress(getStoredProgressSnapshot(modules));
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Progress snapshot</div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              Compatibility view for the original progress route
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              The main dashboard functions now live in Dashboard, Due Today, Error Log, PD Log, and Readiness, but
              this route still works as a quick summary.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-100 px-5 py-4 text-sm text-slate-700">
            Overall progress: <span className="font-semibold text-slate-900">{Math.round(getOverallProgress(modules, progress))}%</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        {modules.map((module) => (
          <div key={module.id} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-lg font-semibold text-slate-900">{module.title}</div>
                <p className="mt-2 text-sm text-slate-600">{module.description}</p>
              </div>
              <div className="w-full max-w-sm">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Completion</span>
                  <span>{Math.round(getModuleCompletion(module.id, progress, module))}%</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-slate-900"
                    style={{ width: `${getModuleCompletion(module.id, progress, module)}%` }}
                  />
                </div>
                <Link href={`/modules/${module.id}`} className="mt-3 inline-flex text-sm text-slate-700 underline">
                  Open module
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
