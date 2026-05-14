"use client";

import { useMemo } from 'react';
import Link from 'next/link';
import { certificationExpansion } from '../../../src/data/certificationExpansion';
import { ShieldCheck, BookOpen, Clock, ExternalLink, ArrowLeft } from 'lucide-react';

export default function CertificationPlaceholderPage({ params }: { params: { certId: string } }) {
  const cert = useMemo(() => 
    certificationExpansion.find(c => c.id === params.certId), 
    [params.certId]
  );

  if (!cert) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Certification Not Found</h1>
        <Link href="/" className="text-blue-600 underline">Return to Dashboard</Link>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-5xl space-y-8 p-4 md:p-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <header className="rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-rose-600">
              <ShieldCheck size={24} />
              <span className="text-sm font-bold uppercase tracking-widest">Certification Pathway</span>
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
              {cert.title} ({cert.code})
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              {cert.description}
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
                <Clock size={18} />
                ~{cert.estimatedHours} Hours
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
                <BookOpen size={18} />
                {cert.objectives.length} Domains
              </div>
            </div>
          </div>
          
          <div className="shrink-0">
            <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-slate-900 text-white shadow-xl">
              <ShieldCheck size={64} />
            </div>
          </div>
        </div>
      </header>

      <section className="rounded-[2.5rem] border border-amber-200 bg-amber-50 p-10 shadow-sm">
        <h2 className="text-2xl font-bold text-amber-900">Coming Soon: Full Lesson Library</h2>
        <p className="mt-4 text-amber-800">
          We are currently importing the full lesson library and AI assessments for this pathway. 
          In the meantime, you can start your study using the official resources below.
        </p>
        <a 
          href={cert.resourceLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-amber-700"
        >
          View Messer Training Course
          <ExternalLink size={18} />
        </a>
      </section>

      <div className="grid gap-8 md:grid-cols-2">
        <section className="rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Exam Domains</h2>
          <div className="mt-6 space-y-4">
            {cert.objectives.map(obj => (
              <div key={obj.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <div className="flex gap-4 items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white font-bold text-slate-900 shadow-sm">
                    {obj.id}
                  </div>
                  <span className="font-semibold text-slate-800">{obj.title}</span>
                </div>
                <span className="text-xs font-bold text-slate-400">{obj.weight}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">DCS Context</h2>
          <div className="mt-6 space-y-4">
            <p className="text-sm leading-7 text-slate-600">
              This certification aligns with our Level 2 growth goals. Mastery of these domains will help you 
              transition from triage and escalation to deeper technical resolution and architecture.
            </p>
            <ul className="space-y-3">
              {[
                'Standard DCS BYOD troubleshooting',
                'Advanced network segmentation & VLAN rules',
                'Server-side identity management (Entra ID)',
                'Automated device deployment (Intune)'
              ].map(item => (
                <li key={item} className="flex gap-3 text-sm text-slate-700">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
