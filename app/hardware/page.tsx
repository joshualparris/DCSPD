"use client";

import { useMemo, useState } from 'react';
import { hardwareCatalog, hardwareCategories } from '../../src/data/hardwareCatalog';

export default function HardwareCatalogPage() {
  const [category, setCategory] = useState<string>('all');
  const items = useMemo(
    () => (category === 'all' ? hardwareCatalog : hardwareCatalog.filter((item) => item.category === category)),
    [category]
  );

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Hardware catalogue</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
            DCS IT device patterns, safe checks, and escalation triggers
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            A privacy-safe reference for recognising common device symptoms and writing better Level 1 notes without
            exposing real asset identifiers or private operational details.
          </p>
        </div>
      </section>

      <section className="flex flex-wrap gap-2">
        {['all', ...hardwareCategories].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              category === item ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-700'
            }`}
          >
            {item}
          </button>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {items.map((item) => (
          <article key={item.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{item.category}</div>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{item.name}</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{item.dcsUse}</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.summary}</p>
            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-900">Safe checks</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">
                  {item.safeChecks.map((check) => (
                    <li key={check}>{check}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-900">Symptoms</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">
                  {item.commonSymptoms.map((symptom) => (
                    <li key={symptom}>{symptom}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-900">Escalate when</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">
                  {item.escalationTriggers.map((trigger) => (
                    <li key={trigger}>{trigger}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              {item.privacyBoundary}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
