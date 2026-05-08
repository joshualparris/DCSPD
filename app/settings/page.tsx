"use client";

import { type ChangeEvent, useState } from 'react';
import { Copy, Download, RotateCcw, Trash2, Upload, MessageSquare, Microscope, BookOpen, GraduationCap, ClipboardList, HardDrive } from 'lucide-react';
import { modules } from '../../src/data/modules';
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
        setModuleStatus({ state: 'ok', message: `Training Module "${data.title}" uploaded!` });
      } else if (data.persona && data.itChallenge) {
        saveCustomRoleplay(data as RoleplayScenario);
        setModuleStatus({ state: 'ok', message: `Roleplay Scenario "${data.persona}" uploaded!` });
      } else if (data.steps && data.initialReport) {
        saveCustomScenario(data as Scenario);
        setModuleStatus({ state: 'ok', message: `Scenario Lab "${data.title}" uploaded!` });
      } else if (data.silos && data.dcsBridges) {
        saveCustomAcademic(data as AcademicSubject);
        setModuleStatus({ state: 'ok', message: `Academic Subject "${data.title}" uploaded!` });
      } else if (data.safeChecks && data.escalationTriggers) {
        saveCustomPlaybook(data as TroubleshootingPlaybook);
        setModuleStatus({ state: 'ok', message: `Troubleshooting Playbook "${data.title}" uploaded!` });
      } else if (data.category && data.level1Boundaries) {
        saveCustomAsset(data as DcsAssetProfile);
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
