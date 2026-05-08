"use client";

import { useEffect, useState } from 'react';

const qaItems = [
  'Install from browser and confirm DCSPrep opens as a standalone app.',
  'Open Dashboard, Due Today, Academic PD, Skill Coach, and Roleplay Bot while online.',
  'Turn Wi-Fi off and reload the installed app.',
  'Confirm cached core routes render without a blank screen.',
  'Create one local progress entry while offline.',
  'Reconnect and confirm the progress entry is still present.',
  'Check tap targets, text wrapping, and scroll behaviour on a phone viewport.',
  'Export a progress backup before clearing browser storage.'
];

export default function MobileQaPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      setChecked(JSON.parse(window.localStorage.getItem('dcsprep_mobile_qa') || '{}'));
    } catch {
      setChecked({});
    }
  }, []);

  function toggle(item: string) {
    setChecked((current) => {
      const next = { ...current, [item]: !current[item] };
      window.localStorage.setItem('dcsprep_mobile_qa', JSON.stringify(next));
      return next;
    });
  }

  const complete = qaItems.filter((item) => checked[item]).length;

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Mobile/offline QA</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
            PWA install, offline, and mobile usability checklist
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            The PWA foundation exists, but it should be tested on a real phone and network-offline flow. Tick these as
            you verify behaviour.
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">QA progress</h2>
            <p className="mt-2 text-sm text-slate-600">{complete}/{qaItems.length} checks complete</p>
          </div>
          <div className="h-3 rounded-full bg-slate-100 lg:w-96">
            <div className="h-full rounded-full bg-slate-900" style={{ width: `${Math.round((complete / qaItems.length) * 100)}%` }} />
          </div>
        </div>
        <div className="mt-6 space-y-3">
          {qaItems.map((item) => (
            <label key={item} className="flex cursor-pointer items-start gap-3 rounded-2xl bg-slate-50 p-4">
              <input
                type="checkbox"
                checked={Boolean(checked[item])}
                onChange={() => toggle(item)}
                className="mt-1 h-4 w-4 accent-slate-900"
              />
              <span className="text-sm leading-6 text-slate-700">{item}</span>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}
