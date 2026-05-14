"use client";

import { useEffect, useState } from 'react';
import { Download, Upload, Cloud, Server, Settings as SettingsIcon } from 'lucide-react';
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
import { SyncManager, getSyncSettings, type SyncProvider } from '../../src/lib/sync/syncManager';

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
  const [syncSettings, setSyncSettings] = useState(() => getSyncSettings());
  
  const syncManager = useMemo(() => new SyncManager(syncSettings.cloudUrl), [syncSettings.cloudUrl]);

  useEffect(() => {
    saveSyncSettings(syncSettings.provider, syncSettings.cloudUrl);
  }, [syncSettings]);

  useEffect(() => {
    setProgress(getStoredProgressSnapshot(modules));
    refreshServerSnapshot();
  }, [syncSettings.provider]);

  async function refreshServerSnapshot() {
    try {
      const payload = await syncManager.fetch(syncSettings.provider);
      if (payload.ok) {
        setServerSnapshot(payload.backup);
      }
      return payload.backup;
    } catch (error) {
      console.error('Failed to fetch server snapshot', error);
      return null;
    }
  }

  async function pushProgress() {
    setStatus({ state: 'working', message: `Saving local browser progress to ${syncSettings.provider}...` });

    try {
      const backup = createProgressBackup(getStoredProgressSnapshot(modules));
      const payload = await syncManager.sync(syncSettings.provider, backup);

      if (!payload.ok) {
        throw new Error(payload.message || 'Sync save failed.');
      }

      setServerSnapshot(backup);
      setStatus({
        state: 'ok',
        message: `Progress pushed to ${syncSettings.provider} at ${payload.savedAtIso?.slice(0, 19) || 'now'}.`
      });
    } catch (error) {
      setStatus({
        state: 'error',
        message: error instanceof Error ? error.message : 'Progress push failed.'
      });
    }
  }

  async function pullProgress() {
    setStatus({ state: 'working', message: `Loading snapshot from ${syncSettings.provider}...` });

    try {
      const payload = await syncManager.fetch(syncSettings.provider);

      if (!payload.ok || !payload.backup) {
        setStatus({
          state: 'error',
          message: payload.message || `No snapshot exists on ${syncSettings.provider} yet. Push progress first.`
        });
        return;
      }

      const parsed = parseProgressBackupJson(JSON.stringify(payload.backup));

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
        message: `${syncSettings.provider} snapshot restored into this browser.`
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
            Progress sync and cloud backup
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Sync your versioned DCSPrep progress across devices. Use the local Next.js server for private backup, 
            or configure a Cloud API in Settings for remote access.
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 mb-4">Sync Provider</div>
        <div className="grid gap-4 sm:grid-cols-2">
          <button
            onClick={() => setSyncSettings({ ...syncSettings, provider: 'local-server' })}
            className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
              syncSettings.provider === 'local-server'
                ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Server size={20} />
            <div>
              <div className="font-semibold">Local Server</div>
              <div className="text-xs opacity-70">Saves to .dcsprep-data/</div>
            </div>
          </button>
          <button
            onClick={() => setSyncSettings({ ...syncSettings, provider: 'cloud-api' })}
            className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
              syncSettings.provider === 'cloud-api'
                ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Cloud size={20} />
            <div>
              <div className="font-semibold">Cloud API</div>
              <div className="text-xs opacity-70">{syncSettings.cloudUrl ? 'Remote sync configured' : 'Requires URL in Settings'}</div>
            </div>
          </button>
        </div>
        
        {syncSettings.provider === 'cloud-api' && !syncSettings.cloudUrl && (
          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
            <SettingsIcon size={18} />
            <p>
              Cloud API is selected but no URL is configured. Go to <Link href="/settings" className="font-bold underline">Settings</Link> to add your provider endpoint.
            </p>
          </div>
        )}
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
