"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { CalendarDays, ChevronRight } from 'lucide-react';
import { modules as baseModules } from '../../src/data/modules';
import { scenarios as baseScenarios } from '../../src/data/scenarios';
import { getCustomModules, getCustomScenarios } from '../../src/lib/customModules';
import { getStoredProgressSnapshot, type UserProgress } from '../../src/lib/progress';
import { buildWeeklyPdPath } from '../../src/lib/weeklyPdPath';

export default function WeeklyPdPathPage() {
  const [progress, setProgress] = useState<UserProgress | undefined>(undefined);
  const [customModules, setCustomModules] = useState(baseModules);
  const [customScenarios, setCustomScenarios] = useState(baseScenarios);

  useEffect(() => {
    setProgress(getStoredProgressSnapshot());
    setCustomModules([...baseModules, ...getCustomModules()]);
    setCustomScenarios([...baseScenarios, ...getCustomScenarios()]);
  }, []);

  const weeklyPath = useMemo(
    () => buildWeeklyPdPath(customModules, customScenarios, progress),
    [customModules, customScenarios, progress]
  );

  if (!progress) {
    return <div className="p-8 text-slate-500">Loading weekly PD path...</div>;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          <CalendarDays size={17} />
          Weekly PD path
        </div>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
          Curated DCS IT weekly PD mix
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{weeklyPath.summary}</p>
        <p className="mt-2 text-sm text-amber-800">
          Support tickets, walk-ups, and manager instructions still come first. Use this path only in approved PD
          time.
        </p>
      </section>

      <section className="grid gap-4">
        {weeklyPath.items.map((item) => (
          <Link
            key={item.id}
            href={item.route}
            className="group flex items-center justify-between rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-400"
          >
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">{item.dayLabel}</div>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.reason}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
                  ~{item.estimatedMinutes} min
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">{item.category}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">{item.priority}</span>
              </div>
            </div>
            <ChevronRight className="shrink-0 text-slate-400 transition group-hover:text-slate-900" />
          </Link>
        ))}
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-slate-100 p-6 text-sm text-slate-700">
        Total planned PD this week: <span className="font-semibold text-slate-900">{weeklyPath.totalMinutes} minutes</span>.
        Adjust based on ticket load — swap any day for Focus mode or Skill Coach if that fits better.
      </section>
    </div>
  );
}
