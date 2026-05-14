"use client";

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

export default function PlaybookDetailPage({ params }: { params: { id: string } }) {
  const [hasMounted, setHasMounted] = useState(false);
  const [playbook, setPlaybook] = useState<TroubleshootingPlaybook | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const custom = getCustomPlaybooks().find(p => p.id === params.id);
    setPlaybook(custom);
  }, [params.id]);

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

          {/* Ticket Template */}
          <section className="rounded-[2rem] border border-slate-200 bg-slate-900 p-10 text-white shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-blue-400">
                <Info size={24} />
                <h2 className="text-2xl font-bold text-white">Jira / Ticket Template</h2>
              </div>
              <button 
                onClick={() => copyToClipboard(playbook.ticketTemplate)}
                className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold hover:bg-white/20 transition-all"
              >
                {copied ? 'Copied!' : 'Copy Template'}
                <Copy size={14} />
              </button>
            </div>
            <div className="mt-8 rounded-2xl bg-white/5 p-6 font-mono text-sm leading-relaxed text-slate-300 border border-white/10">
              {playbook.ticketTemplate}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* Symptoms & Questions */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3 text-amber-600">
              <HelpCircle size={24} />
              <h2 className="text-xl font-bold text-slate-900">Triage</h2>
            </div>
            
            <div className="mt-6 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Common Symptoms</h4>
                <ul className="mt-3 space-y-2">
                  {playbook.symptoms.map((s, i) => (
                    <li key={i} className="text-sm text-slate-600">• {s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Ask First</h4>
                <ul className="mt-3 space-y-2">
                  {playbook.firstQuestions.map((q, i) => (
                    <li key={i} className="text-sm font-medium text-slate-900">“{q}”</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Boundaries */}
          <section className="rounded-[2rem] border border-rose-100 bg-rose-50 p-8 shadow-sm">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertTriangle size={24} />
              <h2 className="text-xl font-bold text-rose-900">Boundaries</h2>
            </div>
            
            <div className="mt-6 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-rose-400">Do Not Do</h4>
                <ul className="mt-3 space-y-2">
                  {playbook.doNotDo.map((d, i) => (
                    <li key={i} className="text-sm font-medium text-rose-800">• {d}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-rose-400">Escalate If...</h4>
                <ul className="mt-3 space-y-2">
                  {playbook.escalationTriggers.map((t, i) => (
                    <li key={i} className="text-sm text-rose-800">• {t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Related Content */}
          {(playbook.relatedModuleIds?.length || playbook.relatedScenarioIds?.length) && (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Related Training</h2>
              <div className="mt-6 space-y-3">
                {playbook.relatedModuleIds?.map(id => (
                  <Link key={id} href={`/modules/${id}`} className="flex items-center justify-between rounded-xl bg-slate-50 p-4 text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
                    Module: {id}
                    <ExternalLink size={14} />
                  </Link>
                ))}
                {playbook.relatedScenarioIds?.map(id => (
                  <Link key={id} href={`/scenarios`} className="flex items-center justify-between rounded-xl bg-slate-50 p-4 text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
                    Scenario: {id}
                    <ExternalLink size={14} />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
