"use client";

import React, { type ChangeEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { Copy, Download, RotateCcw, Trash2, Upload, MessageSquare, Microscope, BookOpen, GraduationCap, ClipboardList, HardDrive, CalendarClock, Save, BarChart3, Bell, BellOff, RefreshCcw, AlertTriangle, FileText } from 'lucide-react';
import { modules } from '../../src/data/modules';
import { getSyncSettings, saveSyncSettings, type SyncProvider } from '../../src/lib/sync/syncManager';
import { 
  MODULE_GENERATION_PROMPT, 
  ROLEPLAY_GENERATION_PROMPT, 
  SCENARIO_LAB_GENERATION_PROMPT, 
  ACADEMIC_GENERATION_PROMPT,
  PLAYBOOK_GENERATION_PROMPT,
  ASSET_PROFILE_GENERATION_PROMPT
} from '../../src/data/modulePromptTemplate';
import { 
  clearAllCustomData, 
  saveCustomModule, 
  saveCustomRoleplay, 
  saveCustomScenario, 
  saveCustomAcademic,
  saveCustomPlaybook,
  saveCustomAsset
} from '../../src/lib/customModules';
import {
  getStoredProgressSnapshot,
  parseProgressBackupJson,
  resetProgress,
  saveProgress,
  serializeProgressBackup
} from '../../src/lib/progress';
import type { TrainingModule } from '../../src/types/training';
import type { RoleplayScenario } from '../../src/data/roleplayScenarios';
import type { Scenario } from '../../src/types/scenarios';
import type { AcademicSubject } from '../../src/types/academic';
import type { TroubleshootingPlaybook } from '../../src/types/playbooks';
import type { DcsAssetProfile } from '../../src/types/assets';
import {
  DEFAULT_SCHEDULER_SETTINGS,
  loadSchedulerSettings,
  resetSchedulerSettings,
  saveSchedulerSettings,
  type SchedulerBlockId,
  type SchedulerSettings
} from '../../src/hooks/useScheduler';
import {
  clearUsageEvents,
  exportUsageEvents,
  importUsageEvents,
  isUsageTrackingEnabled,
  parseUsageEventsImport,
  setUsageTrackingEnabled
} from '../../src/lib/usageAnalytics';
import { trackUsageInteraction } from '../../src/hooks/useUsageTracking';

export default function SettingsPage() {
  const [aiStatus, setAiStatus] = useState<{
    state: 'idle' | 'checking' | 'ok' | 'error';
    message: string;
    model?: string;
  }>({
    state: 'idle',
    message: 'Not checked yet.'
  });
  const [backupStatus, setBackupStatus] = useState<{
    state: 'idle' | 'ok' | 'error';
    message: string;
  }>({
    state: 'idle',
    message: 'No backup action yet.'
  });

  const [moduleStatus, setModuleStatus] = useState<{
    state: 'idle' | 'ok' | 'error';
    message: string;
  }>({
    state: 'idle',
    message: 'No module uploaded yet.'
  });
  const [schedulerSettings, setSchedulerSettings] = useState<SchedulerSettings>(DEFAULT_SCHEDULER_SETTINGS);
  const [usageTrackingEnabled, setUsageTrackingEnabledState] = useState(true);
  const [usageStatus, setUsageStatus] = useState<{
    state: 'idle' | 'ok' | 'error';
    message: string;
  }>({
    state: 'idle',
    message: 'Usage analytics are stored locally in this browser.'
  });
  const [schedulerStatus, setSchedulerStatus] = useState<{
    state: 'idle' | 'ok';
    message: string;
  }>({
    state: 'idle',
    message: 'Scheduler settings use the default PD block timetable until saved.'
  });

  const [notificationStatus, setNotificationStatus] = useState<'default' | 'granted' | 'denied'>('default');
  const [syncSettings, setSyncSettings] = useState(() => getSyncSettings());

  useEffect(() => {
    setSchedulerSettings(loadSchedulerSettings());
    setUsageTrackingEnabledState(isUsageTrackingEnabled());
    
    if ('Notification' in window) {
      setNotificationStatus(Notification.permission);
    }
  }, []);

  function handleSaveSyncSettings() {
    saveSyncSettings(syncSettings.provider, syncSettings.cloudUrl);
    setBackupStatus({ state: 'ok', message: 'Sync settings updated locally.' });
  }

  async function requestNotificationPermission() {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notifications.');
      return;
    }

    const permission = await Notification.requestPermission();
    setNotificationStatus(permission);
    
    if (permission === 'granted') {
      new Notification('Notifications Enabled', {
        body: 'You will now receive study reminders and certification alerts.',
        icon: '/icons/icon.svg'
      });
    }
  }

  function handleReset() {
    if (window.confirm('Reset all DCSPrep local progress and logs? This cannot be undone.')) {
      resetProgress();
      window.location.reload();
    }
  }

  function downloadProgressBackup() {
    const json = serializeProgressBackup(getStoredProgressSnapshot(modules));
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dcsprep-progress-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setBackupStatus({
      state: 'ok',
      message: 'Progress backup exported as a privacy-safe JSON file.'
    });
  }

  async function importProgressBackup(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = parseProgressBackupJson(text);

      if (!parsed.ok) {
        setBackupStatus({
          state: 'error',
          message: parsed.error
        });
        event.target.value = '';
        return;
      }

      saveProgress(parsed.progress);
      trackUsageInteraction({
        eventType: 'settings_import',
        route: '/settings',
        label: 'Progress backup imported',
        contentType: 'settings',
        activityCategory: 'settings',
        completed: true
      });
      setBackupStatus({
        state: 'ok',
        message: 'Backup imported. Reloading the app so every page uses the restored progress.'
      });
      event.target.value = '';
      window.setTimeout(() => window.location.reload(), 500);
    } catch {
      setBackupStatus({
        state: 'error',
        message: 'Could not read the selected backup file.'
      });
      event.target.value = '';
    }
  }

  async function copyPrompt(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      setModuleStatus({
        state: 'ok',
        message: `${label} prompt copied to clipboard!`
      });
    } catch {
      setModuleStatus({
        state: 'error',
        message: 'Failed to copy prompt to clipboard.'
      });
    }
  }

  async function importCustomData(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      const trackCustomImport = (contentKind: string, contentId?: string, itemCount = 1) => {
        trackUsageInteraction({
          eventType: 'custom_content_imported',
          route: '/settings',
          label: contentKind,
          contentType: 'settings',
          contentId,
          activityCategory: 'settings',
          completed: true,
          metadata: {
            source: 'custom',
            resultCount: itemCount
          }
        });
      };

      // Simple heuristic to detect type
      if (data.sections && data.learningObjectives) {
        // Ensure mandatory fields exist for rendering
        const trainingModule = {
          modulePattern: {
            diagnosticQuestions: [],
            explainBackPrompt: { id: 'eb', title: 'Explain it back', prompt: 'P' },
            cornellPrompt: { id: 'c', title: 'Cornell', prompt: 'P' },
            sq3rPrompt: { id: 's', title: 'SQ3R', prompt: 'P' }
          },
          scenarioPrompts: [],
          practicalOutputs: [],
          ...data
        };
        // Normalize rubric if needed (AI often makes it an object)
        if (trainingModule.quiz) {
          trainingModule.quiz = trainingModule.quiz.map((q: any) => {
            if (q.type === 'short-answer' && Array.isArray(q.rubric) && typeof q.rubric[0] === 'object') {
              return { ...q, rubric: q.rubric.map((r: any) => r.criterion || r.label || JSON.stringify(r)) };
            }
            return q;
          });
        }
        saveCustomModule(trainingModule as TrainingModule);
        trackCustomImport('Training module', data.id);
        setModuleStatus({ state: 'ok', message: `Training Module "${data.title}" uploaded!` });
      } else if (data.persona && data.itChallenge) {
        saveCustomRoleplay(data as RoleplayScenario);
        trackCustomImport('Roleplay scenario', data.id);
        setModuleStatus({ state: 'ok', message: `Roleplay Scenario "${data.persona}" uploaded!` });
      } else if (data.steps && data.initialReport) {
        saveCustomScenario(data as Scenario);
        trackCustomImport('Scenario lab', data.id);
        setModuleStatus({ state: 'ok', message: `Scenario Lab "${data.title}" uploaded!` });
      } else if (data.silos && data.dcsBridges) {
        saveCustomAcademic(data as AcademicSubject);
        trackCustomImport('Academic subject', data.id);
        setModuleStatus({ state: 'ok', message: `Academic Subject "${data.title}" uploaded!` });
      } else if (data.safeChecks && data.escalationTriggers) {
        saveCustomPlaybook(data as TroubleshootingPlaybook);
        trackCustomImport('Support playbook', data.id);
        setModuleStatus({ state: 'ok', message: `Troubleshooting Playbook "${data.title}" uploaded!` });
      } else if (data.category && data.level1Boundaries) {
        saveCustomAsset(data as DcsAssetProfile);
        trackCustomImport('Asset profile', data.id);
        setModuleStatus({ state: 'ok', message: `Asset Profile "${data.name}" uploaded!` });
      } else {
        setModuleStatus({ state: 'error', message: 'Unknown JSON format. Could not detect data type.' });
      }
      
      event.target.value = '';
    } catch (e) {
      setModuleStatus({ state: 'error', message: 'Invalid JSON file.' });
      event.target.value = '';
    }
  }

  function handleClearCustomModules() {
    if (window.confirm('Delete ALL custom uploaded content (Modules, Roleplays, Labs, Academic)? This cannot be undone.')) {
      clearAllCustomData();
      setModuleStatus({
        state: 'ok',
        message: 'All custom content deleted.'
      });
    }
  }

  function updateSchedulerBlock(blockId: SchedulerBlockId, field: 'startTime' | 'endTime', value: string) {
    setSchedulerSettings((current) => ({
      ...current,
      blocks: current.blocks.map((block) => (block.id === blockId ? { ...block, [field]: value } : block))
    }));
  }

  function updateStudyContext(field: keyof SchedulerSettings['studyContext'], value: string) {
    setSchedulerSettings((current) => ({
      ...current,
      studyContext: {
        ...current.studyContext,
        [field]: value
      }
    }));
  }

  function handleSaveSchedulerSettings() {
    saveSchedulerSettings(schedulerSettings);
    setSchedulerStatus({
      state: 'ok',
      message: 'PD Scheduler timetable and study context saved locally.'
    });
  }

  function handleResetSchedulerSettings() {
    resetSchedulerSettings();
    setSchedulerSettings(DEFAULT_SCHEDULER_SETTINGS);
    setSchedulerStatus({
      state: 'ok',
      message: 'PD Scheduler settings reset to the research-backed defaults.'
    });
  }

  function downloadUsageAnalytics() {
    const json = exportUsageEvents();
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dcsprep-usage-analytics-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setUsageStatus({
      state: 'ok',
      message: 'Usage analytics exported as local JSON.'
    });
  }

  async function importUsageAnalytics(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = parseUsageEventsImport(text);

      if (!parsed.ok) {
        setUsageStatus({
          state: 'error',
          message: parsed.error
        });
        event.target.value = '';
        return;
      }

      importUsageEvents(text);
      setUsageStatus({
        state: 'ok',
        message: `${parsed.events.length} usage analytics events imported.`
      });
      trackUsageInteraction({
        eventType: 'settings_import',
        route: '/settings',
        label: 'Usage analytics imported',
        contentType: 'settings',
        activityCategory: 'settings',
        completed: true,
        metadata: {
          resultCount: parsed.events.length
        }
      });
      event.target.value = '';
    } catch {
      setUsageStatus({
        state: 'error',
        message: 'Could not read the selected usage analytics file.'
      });
      event.target.value = '';
    }
  }

  function handleClearUsageAnalytics() {
    if (!window.confirm('Clear local usage analytics events? Existing learning progress will remain.')) {
      return;
    }

    clearUsageEvents();
    setUsageStatus({
      state: 'ok',
      message: 'Usage analytics events cleared. Tracking setting was not changed.'
    });
  }

  function handleToggleUsageTracking() {
    const nextEnabled = !usageTrackingEnabled;
    setUsageTrackingEnabled(nextEnabled);
    setUsageTrackingEnabledState(nextEnabled);
    setUsageStatus({
      state: 'ok',
      message: nextEnabled
        ? 'Usage analytics tracking is enabled locally.'
        : 'Usage analytics tracking is disabled. Existing events remain until cleared.'
    });
  }

  async function runAiHealthCheck() {
    setAiStatus({
      state: 'checking',
      message: 'Checking Groq configuration...'
    });

    try {
      const response = await fetch('/api/ai/coach/health');
      const payload = (await response.json()) as {
        ok: boolean;
        message?: string;
        model?: string;
      };

      if (!response.ok || !payload.ok) {
        setAiStatus({
          state: 'error',
          message: payload.message || 'AI health check failed.'
        });
        return;
      }

      setAiStatus({
        state: 'ok',
        message: payload.message || 'AI coaching is configured.',
        model: payload.model
      });
    } catch {
      setAiStatus({
        state: 'error',
        message: 'AI health check failed (network/server error).'
      });
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
              <AlertTriangle size={18} />
              Infrastructure Stability
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-amber-900">OneDrive Migration Guide</h2>
            <p className="mt-3 text-sm leading-7 text-amber-800">
              Is your build failing or slow? Move the project out of OneDrive to a local folder to permanently 
              resolve file-locking and sync conflicts.
            </p>
          </div>
          <Link
            href="/migration-guide"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-600 px-6 py-3 text-sm font-medium text-white hover:bg-amber-700 transition-colors shadow-lg"
          >
            <FileText size={18} />
            View Migration Guide
          </Link>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              <RefreshCcw size={18} />
              Cloud Sync Configuration
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Remote database endpoint</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Configure a custom Cloud API URL to enable remote progress synchronization across multiple devices.
            </p>
          </div>
          <button
            type="button"
            onClick={handleSaveSyncSettings}
            className="rounded-full bg-slate-900 px-6 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
          >
            Save sync settings
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="text-sm text-slate-700">
            Default Provider
            <select
              value={syncSettings.provider}
              onChange={(e) => setSyncSettings({ ...syncSettings, provider: e.target.value as SyncProvider })}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900"
            >
              <option value="local-server">Local Next.js Server</option>
              <option value="cloud-api">Custom Cloud API</option>
            </select>
          </label>
          <label className="text-sm text-slate-700">
            Cloud API Base URL
            <input
              type="url"
              value={syncSettings.cloudUrl}
              onChange={(e) => setSyncSettings({ ...syncSettings, cloudUrl: e.target.value })}
              placeholder="https://your-api.com/sync"
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900"
            />
          </label>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              <Bell size={18} />
              Push Notifications
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Study reminders and alerts</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Receive browser notifications for scheduled study blocks, flashcard reviews, and certification expiration alerts.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Permission status: <span className="font-semibold">{notificationStatus}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={requestNotificationPermission}
            disabled={notificationStatus === 'granted' || notificationStatus === 'denied'}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              notificationStatus === 'granted' 
                ? 'bg-emerald-100 text-emerald-700 cursor-default' 
                : notificationStatus === 'denied'
                ? 'bg-red-100 text-red-700 cursor-default'
                : 'bg-slate-900 text-white hover:scale-105 active:scale-95'
            }`}
          >
            {notificationStatus === 'granted' ? (
              <span className="flex items-center gap-2"><Bell size={16} /> Notifications Active</span>
            ) : notificationStatus === 'denied' ? (
              <span className="flex items-center gap-2"><BellOff size={16} /> Notifications Blocked</span>
            ) : (
              'Enable Notifications'
            )}
          </button>
        </div>
      </section>

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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              <BarChart3 size={18} />
              Usage analytics
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Local-only learning insights</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Tracks interaction metadata only: routes, content IDs, activity type, duration, completion, and scores
              already available from progress. It does not store full ticket notes, reflections, roleplay messages, or
              private typed content in the analytics log.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Status: {usageTrackingEnabled ? 'tracking enabled locally' : 'tracking disabled'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleToggleUsageTracking}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              usageTrackingEnabled ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-700'
            }`}
          >
            {usageTrackingEnabled ? 'Disable tracking' : 'Enable tracking'}
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Link
            href="/usage-insights"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            <BarChart3 size={16} />
            View Usage Insights
          </Link>
          <button
            type="button"
            onClick={downloadUsageAnalytics}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
          >
            <Download size={16} />
            Export usage analytics JSON
          </button>
          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
            <Upload size={16} />
            Import usage analytics JSON
            <input type="file" accept="application/json,.json" onChange={importUsageAnalytics} className="sr-only" />
          </label>
          <button
            type="button"
            onClick={handleClearUsageAnalytics}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white"
          >
            <Trash2 size={16} />
            Clear usage analytics
          </button>
        </div>

        <div
          className={`mt-5 rounded-2xl p-4 text-sm ${
            usageStatus.state === 'error'
              ? 'bg-red-50 text-red-800'
              : usageStatus.state === 'ok'
                ? 'bg-emerald-50 text-emerald-800'
                : 'bg-slate-50 text-slate-700'
          }`}
        >
          {usageStatus.message}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              <CalendarClock size={18} />
              PD Scheduler
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Timetable and study context</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              These local settings feed the real-time scheduler page. The defaults match the Thursday/Friday PD block
              structure and current A+ Core 2 focus.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSaveSchedulerSettings}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
            >
              <Save size={16} />
              Save scheduler settings
            </button>
            <button
              type="button"
              onClick={handleResetSchedulerSettings}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
            >
              <RotateCcw size={16} />
              Reset defaults
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {schedulerSettings.blocks.map((block) => (
            <div key={block.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="font-semibold text-slate-900">{block.label}</div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <label className="text-sm text-slate-700">
                  Start
                  <input
                    type="time"
                    value={block.startTime}
                    onChange={(event) => updateSchedulerBlock(block.id, 'startTime', event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                  />
                </label>
                <label className="text-sm text-slate-700">
                  End
                  <input
                    type="time"
                    value={block.endTime}
                    onChange={(event) => updateSchedulerBlock(block.id, 'endTime', event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {(
            [
              ['certificationFocus', 'Certification focus'],
              ['currentTopic', 'Current topic'],
              ['remainingVideo', 'Remaining video'],
              ['videoSource', 'Primary video source'],
              ['flashcardSource', 'Flashcard/SRS source'],
              ['flashcardHref', 'Flashcard route'],
              ['applicationSource', 'Application tasks'],
              ['applicationHref', 'Application route'],
              ['buildingTasks', 'Building tasks'],
              ['writingTasks', 'Writing tasks'],
              ['breakActivities', 'Break activities']
            ] as Array<[keyof SchedulerSettings['studyContext'], string]>
          ).map(([field, label]) => (
            <label key={field} className="text-sm text-slate-700">
              {label}
              <input
                value={schedulerSettings.studyContext[field]}
                onChange={(event) => updateStudyContext(field, event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900"
              />
            </label>
          ))}
        </div>

        <div
          className={`mt-5 rounded-2xl p-4 text-sm ${
            schedulerStatus.state === 'ok' ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-50 text-slate-700'
          }`}
        >
          {schedulerStatus.message}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">AI coaching health check</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Verifies that Groq configuration is available from the server and can complete a minimal test request.
        </p>

        <div className="mt-4 rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
          <div className="font-semibold text-slate-900">Status</div>
          <div className="mt-2">{aiStatus.message}</div>
          {aiStatus.model ? <div className="mt-2 text-xs text-slate-500">Model: {aiStatus.model}</div> : null}
        </div>

        <button
          onClick={runAiHealthCheck}
          disabled={aiStatus.state === 'checking'}
          className={`mt-5 rounded-full px-4 py-2 text-sm text-white ${
            aiStatus.state === 'checking' ? 'bg-slate-400' : 'bg-slate-900'
          }`}
        >
          {aiStatus.state === 'checking' ? 'Checking...' : 'Run AI health check'}
        </button>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Upload custom content</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          You can use an LLM (like Claude or ChatGPT) to generate new content for almost any part of DCSPrep. 
          Copy a prompt template below, generate the JSON in your LLM, and upload the file.
        </p>
        <Link
          href="/admin/custom-content"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          <Save size={16} />
          Open form editor
        </Link>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button
            type="button"
            onClick={() => copyPrompt(MODULE_GENERATION_PROMPT, 'Training Module')}
            className="flex flex-col items-center justify-center gap-3 rounded-[2rem] border border-slate-100 bg-slate-50 p-4 hover:bg-slate-100 transition-colors text-center"
          >
            <BookOpen className="text-blue-600" size={24} />
            <span className="text-xs font-semibold">Training Module</span>
          </button>
          <button
            type="button"
            onClick={() => copyPrompt(ROLEPLAY_GENERATION_PROMPT, 'Roleplay Persona')}
            className="flex flex-col items-center justify-center gap-3 rounded-[2rem] border border-slate-100 bg-slate-50 p-4 hover:bg-slate-100 transition-colors text-center"
          >
            <MessageSquare className="text-emerald-600" size={24} />
            <span className="text-xs font-semibold">Roleplay Persona</span>
          </button>
          <button
            type="button"
            onClick={() => copyPrompt(SCENARIO_LAB_GENERATION_PROMPT, 'Scenario Lab')}
            className="flex flex-col items-center justify-center gap-3 rounded-[2rem] border border-slate-100 bg-slate-50 p-4 hover:bg-slate-100 transition-colors text-center"
          >
            <Microscope className="text-amber-600" size={24} />
            <span className="text-xs font-semibold">Scenario Lab</span>
          </button>
          <button
            type="button"
            onClick={() => copyPrompt(ACADEMIC_GENERATION_PROMPT, 'Academic Subject')}
            className="flex flex-col items-center justify-center gap-3 rounded-[2rem] border border-slate-100 bg-slate-50 p-4 hover:bg-slate-100 transition-colors text-center"
          >
            <GraduationCap className="text-purple-600" size={24} />
            <span className="text-xs font-semibold">Academic Subject</span>
          </button>
          <button
            type="button"
            onClick={() => copyPrompt(PLAYBOOK_GENERATION_PROMPT, 'Troubleshooting Playbook')}
            className="flex flex-col items-center justify-center gap-3 rounded-[2rem] border border-slate-100 bg-slate-50 p-4 hover:bg-slate-100 transition-colors text-center"
          >
            <ClipboardList className="text-rose-600" size={24} />
            <span className="text-xs font-semibold">Support Playbook</span>
          </button>
          <button
            type="button"
            onClick={() => copyPrompt(ASSET_PROFILE_GENERATION_PROMPT, 'Asset Profile')}
            className="flex flex-col items-center justify-center gap-3 rounded-[2rem] border border-slate-100 bg-slate-50 p-4 hover:bg-slate-100 transition-colors text-center"
          >
            <HardDrive className="text-slate-600" size={24} />
            <span className="text-xs font-semibold">Asset Profile</span>
          </button>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800 transition-colors">
            <Upload size={18} />
            Upload generated JSON file
            <input type="file" accept="application/json,.json" onChange={importCustomData} className="sr-only" />
          </label>

          <button
            onClick={handleClearCustomModules}
            className="flex items-center gap-2 text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
          >
            <Trash2 size={14} />
            Delete all custom content
          </button>
        </div>

        <div
          className={`mt-6 rounded-2xl p-4 text-sm ${
            moduleStatus.state === 'error'
              ? 'bg-red-50 text-red-800'
              : moduleStatus.state === 'ok'
                ? 'bg-emerald-50 text-emerald-800'
                : 'bg-slate-50 text-slate-700'
          }`}
        >
          {moduleStatus.message}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Progress backup and restore</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Export your local progress before changing devices, clearing browser data, or moving the app out of OneDrive.
          The backup contains learning progress, assessment feedback, roleplay coaching, and PD evidence summaries.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={downloadProgressBackup}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            <Download size={16} />
            Export progress backup
          </button>
          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
            <Upload size={16} />
            Import progress backup
            <input type="file" accept="application/json,.json" onChange={importProgressBackup} className="sr-only" />
          </label>
        </div>

        <div
          className={`mt-4 rounded-2xl p-4 text-sm ${
            backupStatus.state === 'error'
              ? 'bg-red-50 text-red-800'
              : backupStatus.state === 'ok'
                ? 'bg-emerald-50 text-emerald-800'
                : 'bg-slate-50 text-slate-700'
          }`}
        >
          {backupStatus.message}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Reset local data</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Use this if you want to clear modules, assessment attempts, due items, scenario logs, and PD entries from
          this browser.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm text-white"
        >
          <RotateCcw size={16} />
          Reset local progress
        </button>
      </section>
    </div>
  );
}
