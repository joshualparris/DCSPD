"use client";

import { useEffect, useState } from 'react';
import ModuleCard from '../../src/components/modules/ModuleCard';
import { modules } from '../../src/data/modules';
import { getModuleCompletion } from '../../src/lib/moduleMath';
import { getInitialProgressSnapshot, getStoredProgressSnapshot, type UserProgress } from '../../src/lib/progress';

export default function ModulesPage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot(modules));

  useEffect(() => {
    setProgress(getStoredProgressSnapshot(modules));
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Modules</div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              DCS-specific modules for targeted professional development
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              Each module is concise, practical, and aligned to common DCS support scenarios. Review the concept,
              assess retention, apply it in context, and produce a usable reference or note.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-100 px-5 py-4 text-sm text-slate-700">
            {modules.length} modules across foundations, networking, endpoints, identity, cloud, and operations.
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            id={module.id}
            title={module.title}
            description={module.description}
            domain={module.domain}
            level={module.level}
            estimatedMinutes={module.estimatedMinutes}
            tags={module.tags}
            progress={getModuleCompletion(module.id, progress, module)}
          />
        ))}
      </div>
    </div>
  );
}
