"use client";

import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ClipboardList, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Info, 
  Wrench,
  Copy,
  ExternalLink
} from 'lucide-react';
import { getCustomPlaybooks } from '../../../src/lib/customModules';
import type { TroubleshootingPlaybook } from '../../../src/types/playbooks';

export default function PlaybookDetailPage({ params }: { params: any }) {
  const [id, setId] = useState<string | undefined>(undefined);
  const [hasMounted, setHasMounted] = useState(false);
  const [playbook, setPlaybook] = useState<TroubleshootingPlaybook | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    async function resolve() {
      const resolvedParams = await params;
      const resolvedId = resolvedParams?.id;
      setId(resolvedId);

      if (!resolvedId) return;
      const custom = getCustomPlaybooks().find(p => p.id === resolvedId);
      setPlaybook(custom);
    }
    
    resolve();
  }, [params]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!hasMounted) return null;

  if (!playbook) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Playbook not found</h2>
        <Link href="/playbooks" className="text-blue-600 hover:underline">Return to playbooks</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <Link href="/playbooks" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
        <ArrowLeft size={16} />
        Back to Playbooks
      </Link>

      <header className="rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-sm">
        <div className="flex items-center gap-2 text-rose-600">
          <ClipboardList size={24} />
          <span className="text-sm font-bold uppercase tracking-widest">Troubleshooting Playbook</span>
        </div>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900">{playbook.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{playbook.description}</p>
        
        <div className="mt-8 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm font-bold text-slate-600">
            <span className="text-slate-400">Level:</span> {playbook.level}
          </div>
          <div className="flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm font-bold text-slate-600">
            <span className="text-slate-400">Domain:</span> {playbook.domain}
          </div>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {/* Safe Checks Section */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
            <div className="flex items-center gap-3 text-emerald-600">
              <CheckCircle2 size={24} />
              <h2 className="text-2xl font-bold text-slate-900">Step-by-Step Safe Checks</h2>
            </div>
            
            <div className="mt-8 space-y-10">
              {playbook.safeChecks.map((check, index) => (
                <div key={check.id} className="relative pl-12">
                  <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{check.title}</h3>
                  <ul className="mt-4 space-y-3">
                    {check.steps.map((step, i) => (
                      <li key={i} className="flex gap-3 text-slate-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                        {step}
                      </li>
                    ))}
                  </ul>
                  {check.tools && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {check.tools.map(tool => (
                        <span key={tool} className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-bold text-blue-600">
                          <Wrench size={12} />
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Symptoms Section */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
            <div className="flex items-center gap-3 text-indigo-600">
              <HelpCircle size={24} />
              <h2 className="text-2xl font-bold text-slate-900">Common Symptoms</h2>
            </div>
            
            <ul className="mt-8 space-y-4">
              {playbook.symptoms.map((symptom, i) => (
                <li key={i} className="flex gap-3 text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                  {symptom}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-8">
          {/* Boundaries Section */}
          <section className="rounded-[2rem] border border-rose-100 bg-rose-50 p-8 shadow-sm">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertTriangle size={24} />
              <h2 className="text-xl font-bold text-rose-900">Boundaries</h2>
            </div>
            <p className="mt-4 text-sm text-rose-800 leading-relaxed">
              Do not attempt these actions at Level 1 without direct approval or supervision:
            </p>
            <ul className="mt-6 space-y-4">
              {playbook.doNotDo.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm font-medium text-rose-800">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Quick Note Template */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-slate-900">
                <Info size={24} />
                <h2 className="text-xl font-bold">Handoff Note</h2>
              </div>
              <button
                onClick={() => copyToClipboard(playbook.ticketTemplate)}
                className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                title="Copy template"
              >
                <Copy size={18} />
              </button>
            </div>
            <div className="mt-6 rounded-2xl bg-slate-50 p-6">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700 font-mono">
                {playbook.ticketTemplate}
              </pre>
            </div>
          </section>

          {/* Related Training */}
          {(playbook.relatedModuleIds?.length || playbook.relatedScenarioIds?.length) && (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 text-slate-900">
                <ExternalLink size={24} />
                <h2 className="text-xl font-bold">Related Training</h2>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {playbook.relatedModuleIds?.map(moduleId => (
                  <Link 
                    key={moduleId}
                    href={`/modules/${moduleId}`}
                    className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Training Module
                  </Link>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
