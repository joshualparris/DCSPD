"use client";

import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  HardDrive, 
  CheckCircle2, 
  Wrench, 
  AlertTriangle, 
  ShieldCheck, 
  User,
  ExternalLink
} from 'lucide-react';
import { getCustomAssets } from '../../../src/lib/customModules';
import { dcsAssets } from '../../../src/data/assets';
import type { DcsAssetProfile } from '../../../src/types/assets';

export default function AssetDetailPage({ params }: { params: any }) {
  const [id, setId] = useState<string | undefined>(undefined);
  const [hasMounted, setHasMounted] = useState(false);
  const [asset, setAsset] = useState<DcsAssetProfile | undefined>(undefined);

  useEffect(() => {
    setHasMounted(true);
    
    async function resolve() {
      const resolvedParams = await params;
      const resolvedId = resolvedParams?.id;
      setId(resolvedId);

      if (!resolvedId) return;
      const custom = getCustomAssets().find(a => a.id === resolvedId);
      const builtIn = dcsAssets.find(a => a.id === resolvedId);
      setAsset(custom || builtIn);
    }
    
    resolve();
  }, [params]);

  if (!hasMounted) return null;

  if (!asset) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Asset not found</h2>
        <Link href="/assets" className="text-blue-600 hover:underline">Return to assets</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <Link href="/assets" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
        <ArrowLeft size={16} />
        Back to Asset Catalog
      </Link>

      <header className="rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-sm">
        <div className="flex items-center gap-2 text-slate-400">
          <HardDrive size={24} />
          <span className="text-sm font-bold uppercase tracking-widest">{asset.category} Profile</span>
        </div>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900">{asset.name}</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{asset.description}</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3 text-emerald-600">
            <CheckCircle2 size={24} />
            <h2 className="text-xl font-bold text-slate-900">Safe Checks</h2>
          </div>
          <ul className="mt-6 space-y-4">
            {asset.safeChecks.map((check, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                {check}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3 text-blue-600">
            <Wrench size={24} />
            <h2 className="text-xl font-bold text-slate-900">Useful Tools</h2>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {asset.usefulTools.map(tool => (
              <span key={tool} className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-bold text-blue-600">
                {tool}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-rose-100 bg-rose-50 p-8 shadow-sm">
          <div className="flex items-center gap-3 text-rose-600">
            <AlertTriangle size={24} />
            <h2 className="text-xl font-bold text-rose-900">Boundaries</h2>
          </div>
          <ul className="mt-6 space-y-4">
            {asset.level1Boundaries.map((limit, i) => (
              <li key={i} className="flex gap-3 text-sm font-medium text-rose-800">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                {limit}
              </li>
            ))}
          </ul>
        </section>

        {asset.privacyNotes && asset.privacyNotes.length > 0 && (
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3 text-indigo-600">
              <ShieldCheck size={24} />
              <h2 className="text-xl font-bold text-slate-900">Privacy Notes</h2>
            </div>
            <ul className="mt-6 space-y-4">
              {asset.privacyNotes.map((note, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                  {note}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <footer className="grid gap-8 lg:grid-cols-2">
        {asset.escalationOwner && (
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3 text-slate-900">
              <User size={24} />
              <h2 className="text-xl font-bold">Escalation</h2>
            </div>
            <div className="mt-6 space-y-2">
              <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Primary Owner / Escalation</div>
              <p className="text-lg font-semibold text-slate-900">{asset.escalationOwner}</p>
            </div>
          </section>
        )}

        {(asset.relatedModuleIds?.length || asset.relatedScenarioIds?.length) && (
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3 text-slate-900">
              <ExternalLink size={24} />
              <h2 className="text-xl font-bold">Related Training</h2>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {asset.relatedModuleIds?.map(id => (
                <Link 
                  key={id}
                  href={`/modules/${id}`}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Training Module
                </Link>
              ))}
            </div>
          </section>
        )}
      </footer>
    </div>
  );
}
