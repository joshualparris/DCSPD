"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Clipboard, Download, MessageSquare, Save, ShieldCheck } from 'lucide-react';
import {
  buildCustomRoleplay,
  buildCustomTrainingModule,
  DEFAULT_CUSTOM_MODULE_EDITOR_INPUT,
  DEFAULT_CUSTOM_ROLEPLAY_EDITOR_INPUT,
  type CustomModuleEditorInput,
  type CustomRoleplayEditorInput
} from '../../../src/lib/customContentEditor';
import { saveCustomModule, saveCustomRoleplay } from '../../../src/lib/customModules';
import type { ModuleDomain, ModuleLevel } from '../../../src/types/training';
import type { RoleplayScenario } from '../../../src/data/roleplayScenarios';

type EditorMode = 'module' | 'roleplay';

const moduleDomains: ModuleDomain[] = [
  'Foundations',
  'Networking',
  'Endpoint Support',
  'Identity and Access',
  'Cloud and Platforms',
  'Operations'
];

const moduleLevels: ModuleLevel[] = ['L1', 'L2', 'A+', 'DCS Context', 'IT Manager'];
const roleplayPressures: RoleplayScenario['pressure'][] = ['Low', 'Medium', 'High', 'Critical'];

function downloadJson(filename: string, value: unknown) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function copyJson(value: unknown) {
  await navigator.clipboard.writeText(JSON.stringify(value, null, 2));
}

export default function CustomContentEditorPage() {
  const [mode, setMode] = useState<EditorMode>('module');
  const [moduleInput, setModuleInput] = useState<CustomModuleEditorInput>(DEFAULT_CUSTOM_MODULE_EDITOR_INPUT);
  const [roleplayInput, setRoleplayInput] = useState<CustomRoleplayEditorInput>(DEFAULT_CUSTOM_ROLEPLAY_EDITOR_INPUT);
  const [status, setStatus] = useState('No custom content saved yet.');

  const moduleDraft = useMemo(() => buildCustomTrainingModule(moduleInput), [moduleInput]);
  const roleplayDraft = useMemo(() => buildCustomRoleplay(roleplayInput), [roleplayInput]);
  const activeDraft = mode === 'module' ? moduleDraft : roleplayDraft;

  function updateModule<K extends keyof CustomModuleEditorInput>(field: K, value: CustomModuleEditorInput[K]) {
    setModuleInput((current) => ({ ...current, [field]: value }));
  }

  function updateRoleplay<K extends keyof CustomRoleplayEditorInput>(field: K, value: CustomRoleplayEditorInput[K]) {
    setRoleplayInput((current) => ({ ...current, [field]: value }));
  }

  function saveDraft() {
    if (mode === 'module') {
      saveCustomModule(moduleDraft);
      setStatus(`Saved module "${moduleDraft.title}". Open Modules to use it.`);
      return;
    }

    saveCustomRoleplay(roleplayDraft);
    setStatus(`Saved roleplay "${roleplayDraft.issueTitle}". Open Roleplay Bot to use it.`);
  }

  async function handleCopy() {
    try {
      await copyJson(activeDraft);
      setStatus('Draft JSON copied.');
    } catch {
      setStatus('Could not copy JSON in this browser.');
    }
  }

  function handleDownload() {
    const filename =
      mode === 'module'
        ? `${moduleDraft.id}.json`
        : `${roleplayDraft.id}.json`;
    downloadJson(filename, activeDraft);
    setStatus('Draft JSON downloaded.');
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              <ShieldCheck size={18} />
              Custom content editor
            </div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Build safe modules and roleplays</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Create local custom content from structured fields, save it directly into DCSPrep, and export the same JSON for backup or review.
            </p>
          </div>
          <Link
            href={mode === 'module' ? '/modules' : '/simulations/roleplay'}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white"
          >
            Open {mode === 'module' ? 'Modules' : 'Roleplay Bot'}
          </Link>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-3 shadow-sm">
        <div className="grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setMode('module')}
            className={`inline-flex items-center justify-center gap-2 rounded-[1.5rem] px-4 py-3 text-sm font-semibold ${
              mode === 'module' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700'
            }`}
          >
            <BookOpen size={18} />
            Training module
          </button>
          <button
            type="button"
            onClick={() => setMode('roleplay')}
            className={`inline-flex items-center justify-center gap-2 rounded-[1.5rem] px-4 py-3 text-sm font-semibold ${
              mode === 'roleplay' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700'
            }`}
          >
            <MessageSquare size={18} />
            Roleplay persona
          </button>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.7fr)]">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          {mode === 'module' ? (
            <div className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm font-medium text-slate-700">
                  Title
                  <input
                    value={moduleInput.title}
                    onChange={(event) => updateModule('title', event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Minutes
                  <input
                    type="number"
                    min={5}
                    max={120}
                    value={moduleInput.estimatedMinutes}
                    onChange={(event) => updateModule('estimatedMinutes', Number(event.target.value))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Domain
                  <select
                    value={moduleInput.domain}
                    onChange={(event) => updateModule('domain', event.target.value as ModuleDomain)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                  >
                    {moduleDomains.map((domain) => <option key={domain}>{domain}</option>)}
                  </select>
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Level
                  <select
                    value={moduleInput.level}
                    onChange={(event) => updateModule('level', event.target.value as ModuleLevel)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                  >
                    {moduleLevels.map((level) => <option key={level}>{level}</option>)}
                  </select>
                </label>
              </div>

              <label className="block text-sm font-medium text-slate-700">
                Description
                <textarea
                  value={moduleInput.description}
                  onChange={(event) => updateModule('description', event.target.value)}
                  rows={3}
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm font-medium text-slate-700">
                  Objectives
                  <textarea
                    value={moduleInput.objectivesText}
                    onChange={(event) => updateModule('objectivesText', event.target.value)}
                    rows={5}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  DCS relevance
                  <textarea
                    value={moduleInput.relevanceText}
                    onChange={(event) => updateModule('relevanceText', event.target.value)}
                    rows={5}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                  />
                </label>
              </div>

              <label className="block text-sm font-medium text-slate-700">
                Sections, one per line: title | body
                <textarea
                  value={moduleInput.sectionsText}
                  onChange={(event) => updateModule('sectionsText', event.target.value)}
                  rows={6}
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Flashcards, one per line: front | back
                <textarea
                  value={moduleInput.flashcardsText}
                  onChange={(event) => updateModule('flashcardsText', event.target.value)}
                  rows={5}
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm font-medium text-slate-700">
                  Recall prompt
                  <textarea
                    value={moduleInput.recallPrompt}
                    onChange={(event) => updateModule('recallPrompt', event.target.value)}
                    rows={4}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Tags
                  <input
                    value={moduleInput.tagsText}
                    onChange={(event) => updateModule('tagsText', event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                  />
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm font-medium text-slate-700">
                  Persona
                  <input
                    value={roleplayInput.persona}
                    onChange={(event) => updateRoleplay('persona', event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Archetype
                  <input
                    value={roleplayInput.archetype}
                    onChange={(event) => updateRoleplay('archetype', event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Issue title
                  <input
                    value={roleplayInput.issueTitle}
                    onChange={(event) => updateRoleplay('issueTitle', event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Pressure
                  <select
                    value={roleplayInput.pressure}
                    onChange={(event) => updateRoleplay('pressure', event.target.value as RoleplayScenario['pressure'])}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                  >
                    {roleplayPressures.map((pressure) => <option key={pressure}>{pressure}</option>)}
                  </select>
                </label>
              </div>

              {(['scenario', 'itChallenge', 'initialPrompt', 'focusText'] as const).map((field) => (
                <label key={field} className="block text-sm font-medium text-slate-700">
                  {field === 'itChallenge' ? 'IT challenge' : field === 'initialPrompt' ? 'Opening line' : field === 'focusText' ? 'Focus tags' : 'Scenario'}
                  <textarea
                    value={roleplayInput[field]}
                    onChange={(event) => updateRoleplay(field, event.target.value)}
                    rows={field === 'focusText' ? 2 : 4}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                  />
                </label>
              ))}
            </div>
          )}
        </section>

        <aside className="space-y-4">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Draft preview</div>
            <div className="mt-3 text-lg font-semibold text-slate-900">
              {mode === 'module' ? moduleDraft.title : roleplayDraft.issueTitle}
            </div>
            <div className="mt-2 text-xs text-slate-500">{activeDraft.id}</div>
            <pre className="mt-4 max-h-[520px] overflow-auto rounded-2xl bg-slate-950 p-4 text-xs leading-5 text-slate-100">
              {JSON.stringify(activeDraft, null, 2)}
            </pre>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-3">
              <button
                type="button"
                onClick={saveDraft}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-medium text-white"
              >
                <Save size={16} />
                Save to DCSPrep
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700"
              >
                <Download size={16} />
                Download JSON
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700"
              >
                <Clipboard size={16} />
                Copy JSON
              </button>
            </div>
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{status}</div>
          </section>
        </aside>
      </div>
    </div>
  );
}
