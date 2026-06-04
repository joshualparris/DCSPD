"use client";

import { useEffect, useState, useMemo } from 'react';
import ModuleCard from '../../src/components/modules/ModuleCard';
import { modules as baseModules } from '../../src/data/modules';
import { getModuleCompletion } from '../../src/lib/moduleMath';
import { getInitialProgressSnapshot, getStoredProgressSnapshot, type UserProgress } from '../../src/lib/progress';
import { getCustomModules } from '../../src/lib/customModules';
import MindfulnessPause from '../../src/components/mindfulness/MindfulnessPause';

export default function ModulesPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [customModules, setCustomModules] = useState<any[]>([]);
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot(baseModules));

  const careerFocus = useMemo(() => progress.profile?.careerFocus || 'Generic', [progress]);

  const modules = useMemo(() => {
    const base = [...baseModules, ...customModules];
    if (careerFocus === 'MSP') {
      // Hide DCS-only unless already started
      return base.filter(m => m.targetEnvironment !== 'DCS' || progress.modules[m.id]?.quizAttempts?.length);
    }
    if (careerFocus === 'DCS') {
      return base;
    }
    // Generic mode: hide DCS-only unless already started
    return base.filter(m => m.targetEnvironment !== 'DCS' || progress.modules[m.id]?.quizAttempts?.length);
  }, [customModules, careerFocus, progress]);

  useEffect(() => {
    const loadedCustom = getCustomModules();
    setCustomModules(loadedCustom);
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      setProgress(getStoredProgressSnapshot(modules));
    }
  }, [hasMounted, modules]);

  if (!hasMounted) {
    return (
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Modules</div>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                Targeted modules for professional development
              </h1>
            </div>
          </div>
        </section>
        <div className="grid gap-4 xl:grid-cols-2">
          {baseModules.map((module) => (
            <div key={module.id} className="h-48 animate-pulse rounded-[2rem] bg-slate-100" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Modules</div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              {careerFocus === 'DCS' 
                ? 'School-specific modules for targeted professional development' 
                : careerFocus === 'MSP'
                  ? 'MSP transition modules for professional managed services'
                  : 'IT support modules for professional development'}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              Each module is concise, practical, and aligned to 
              {careerFocus === 'DCS' ? ' common DCS support scenarios' : ' industry-standard support workflows'}. 
              Review the concept, assess retention, apply it in context, and produce a usable reference or note.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-100 px-5 py-4 text-sm text-slate-700">
            {modules.length} modules available.
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-4">
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
        <aside className="space-y-6">
          <MindfulnessPause />
        </aside>
      </div>
    </div>
  );
}
