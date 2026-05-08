"use client";

import { useEffect, useState } from 'react';
import { Download, Upload } from 'lucide-react';
import { modules } from '../../src/data/modules';
import {
  createProgressBackup,
  getInitialProgressSnapshot,
  getStoredProgressSnapshot,
  parseProgressBackupJson,
  saveProgress,
  type ProgressBackup,
  type UserProgress
} from '../../src/lib/progress';

type SyncStatus = {
  state: 'idle' | 'working' | 'ok' | 'error';
  message: string;
};

export default function SyncPage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot(modules));
  const [status, setStatus] = useState<SyncStatus>({
    state: 'idle',
    message: 'No sync action yet.'
  });
  const [serverSnapshot, setServerSnapshot] = useState<ProgressBackup | null>(null);

  useEffect(() => {
    setProgress(getStoredProgressSnapshot(modules));
  }, []);

  async function refreshServerSnapshot() {
    const response = await fetch('/api/progress-sync', { cache: 'no-store' });
    const payload = (await response.json()) as { ok: boolean; backup: ProgressBackup | null; message?: string };

    if (!payload.ok) {
      throw new Error(payload.message || 'Could not read sync snapshot.');
    }

    setServerSnapshot(payload.backup);
    return payload.backup;
  }

  async function pushProgress() {
    setStatus({ state: 'working', message: 'Saving local browser progress to the server-side sync snapshot...' });

    try {
      const backup = createProgressBackup(getStoredProgressSnapshot(modules));
      const response = await fetch('/api/progress-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(backup)
      });
      const payload = (await response.json()) as { ok: boolean; message?: string; savedAtIso?: string };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || 'Sync save failed.');
      }

      setServerSnapshot(backup);
      setStatus({
        state: 'ok',
        message: `Progress pushed to local server snapshot at ${payload.savedAtIso?.slice(0, 19) || 'now'}.`
      });
    } catch (error) {
      setStatus({
        state: 'error',
        message: error instanceof Error ? error.message : 'Progress push failed.'
      });
    }
  }

  async function pullProgress() {
    setStatus({ state: 'working', message: 'Loading server-side sync snapshot...' });

    try {
      const backup = await refreshServerSnapshot();

      if (!backup) {
        setStatus({
          state: 'error',
          message: 'No server-side snapshot exists yet. Push progress first.'
        });
        return;
      }

      const parsed = parseProgressBackupJson(JSON.stringify(backup));

      if (!parsed.ok) {
        setStatus({
          state: 'error',
          message: parsed.error
        });
        return;
      }

      saveProgress(parsed.progress);
      setProgress(parsed.progress);
      setStatus({
        state: 'ok',
        message: 'Server snapshot restored into this browser.'
      });
    } catch (error) {
      setStatus({
        state: 'error',
        message: error instanceof Error ? error.message : 'Progress pull failed.'
      });
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Progress sync</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
            Local server snapshot for progress backup
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            This is a first sync adapter: it saves a versioned DCSPrep progress backup to the local Next.js server. A
            real cloud database still needs provider selection, authentication, and deployment hardening.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">PD entries</div>
          <div className="mt-2 text-3xl font-semibold text-slate-900">{progress.pdEntries.length}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Academic attempts</div>
          <div className="mt-2 text-3xl font-semibold text-slate-900">{progress.academicAssessmentAttempts.length}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Server snapshot</div>
          <div className="mt-2 text-xl font-semibold text-slate-900">
            {serverSnapshot ? serverSnapshot.exportedAtIso.slice(0, 10) : 'Not loaded'}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={pushProgress}
            disabled={status.state === 'working'}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            <Upload size={16} />
            Push browser progress
          </button>
          <button
            type="button"
            onClick={pullProgress}
            disabled={status.state === 'working'}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
          >
            <Download size={16} />
            Pull server snapshot
          </button>
        </div>
        <div
          className={`mt-5 rounded-2xl p-4 text-sm ${
            status.state === 'error'
              ? 'bg-red-50 text-red-800'
              : status.state === 'ok'
                ? 'bg-emerald-50 text-emerald-800'
                : 'bg-slate-50 text-slate-700'
          }`}
        >
          {status.message}
        </div>
      </section>
    </div>
  );
}
