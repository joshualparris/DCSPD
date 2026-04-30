"use client";

import { resetProgress } from '../../src/lib/progress';

export default function SettingsPage() {
  function handleReset() {
    if (window.confirm('Reset all DCSPrep local progress and logs? This cannot be undone.')) {
      resetProgress();
      window.location.reload();
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Settings</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Local-only storage, operational boundaries, and privacy reminders.
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            DCSPrep stores progress locally in the browser. There is no external auth or backend in this version.
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Privacy notice</div>
        <p className="mt-3 text-sm leading-7 text-amber-900">
          This app is for personal PD. Do not enter sensitive DCS, student, staff, parent, network, credential,
          or incident details.
        </p>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Reset local data</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Use this if you want to clear modules, assessment attempts, due items, scenario logs, and PD entries from
          this browser.
        </p>
        <button onClick={handleReset} className="mt-5 rounded-full bg-red-600 px-4 py-2 text-sm text-white">
          Reset local progress
        </button>
      </section>
    </div>
  );
}
