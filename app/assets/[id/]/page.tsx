"use client";

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
import { getCustomAssets } from '../../../../src/lib/customModules';
import { dcsAssets } from '../../../../src/data/assets';
import type { DcsAssetProfile } from '../../../../src/types/assets';

export default function AssetDetailPage({ params }: { params: { id: string } }) {
  const [hasMounted, setHasMounted] = useState(false);
  const [asset, setAsset] = useState<DcsAssetProfile | undefined>(undefined);

  useEffect(() => {
    setHasMounted(true);
    const custom = getCustomAssets().find(a => a.id === params.id);
    const builtIn = dcsAssets.find(a => a.id === params.id);
    setAsset(custom || builtIn);
  }, [params.id]);

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

        <section className="rounded-[2rem] border border-amber-100 bg-amber-50 p-8 shadow-sm">
          <div className="flex items-center gap-3 text-amber-600">
            <ShieldCheck size={24} />
            <h2 className="text-xl font-bold text-amber-900">Privacy & Support</h2>
          </div>
          <div className="mt-6 space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-amber-500">Privacy Notes</h4>
              <ul className="mt-3 space-y-2">
                {asset.privacyNotes.map((note, i) => (
                  <li key={i} className="text-sm text-amber-800">• {note}</li>
                ))}
              </ul>
            </div>
            {asset.escalationOwner && (
              <div className="flex items-center gap-3 rounded-2xl bg-white p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <User size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Escalation Owner</div>
                  <div className="text-sm font-bold text-slate-900">{asset.escalationOwner}</div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Related Content */}
        {(asset.relatedPlaybookIds?.length || asset.relatedModuleIds?.length) && (
          <section className="md:col-span-2 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Connected Workflows</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {asset.relatedPlaybookIds?.map(id => (
                <Link key={id} href={`/playbooks/${id}`} className="flex items-center justify-between rounded-xl bg-slate-50 p-4 text-sm font-bold text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all">
                  Playbook: {id}
                  <ExternalLink size={14} />
                </Link>
              ))}
              {asset.relatedModuleIds?.map(id => (
                <Link key={id} href={`/modules/${id}`} className="flex items-center justify-between rounded-xl bg-slate-50 p-4 text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
                  Module: {id}
                  <ExternalLink size={14} />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
