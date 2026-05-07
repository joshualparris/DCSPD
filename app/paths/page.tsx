"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { learningPaths } from '../../src/data/learningPaths';
import { modules } from '../../src/data/modules';
import { getInitialProgressSnapshot, getStoredProgressSnapshot } from '../../src/lib/progress';
import { getModuleProgress } from '../../src/lib/moduleMath';

export default function PathsPage() {
  const [progress, setProgress] = useState(() => getInitialProgressSnapshot(modules));

  useEffect(() => {
    setProgress(getStoredProgressSnapshot(modules));
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Structured Learning Paths</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Professional Development Tracks
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Follow a structured path to master specific domains of DCS IT support. Complete all modules in a path to earn a virtual "Specialist" badge.
          </p>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {learningPaths.map((path) => {
          const pathModules = modules.filter((m) => path.moduleIds.includes(m.id));
          const totalProgress = pathModules.reduce((acc, m) => acc + getModuleProgress(m, progress), 0);
          const averageProgress = Math.round(totalProgress / (pathModules.length || 1));
          const isComplete = averageProgress >= 100;

          return (
            <div key={path.id} className="flex flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className={`rounded-2xl p-3 ${isComplete ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                  {path.icon === 'shield-check' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                  )}
                  {path.icon === 'monitor' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                  )}
                  {path.icon === 'lock' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  )}
                </div>
                {isComplete && (
                  <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    CERTIFIED
                  </div>
                )}
              </div>

              <h2 className="mt-5 text-xl font-semibold text-slate-900">{path.title}</h2>
              <p className="mt-2 text-sm text-slate-600 line-clamp-2">{path.description}</p>

              <div className="mt-6 flex-1 space-y-3">
                <div className="flex items-center justify-between text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <span>Progress</span>
                  <span>{averageProgress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div 
                    className={`h-full transition-all duration-500 ${isComplete ? 'bg-emerald-500' : 'bg-slate-900'}`} 
                    style={{ width: `${averageProgress}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Modules</div>
                {pathModules.map((m) => (
                  <Link 
                    key={m.id}
                    href={`/modules/${m.id}`}
                    className="flex items-center justify-between rounded-xl border border-slate-50 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition hover:bg-white hover:border-slate-200"
                  >
                    <span className="truncate pr-2">{m.title}</span>
                    {getModuleProgress(m, progress) >= 100 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{getModuleProgress(m, progress)}%</span>
                    )}
                  </Link>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Final Capstone Project</div>
                <div className="mt-2 rounded-2xl bg-orange-50 p-4 border border-orange-100">
                  <div className="text-sm font-bold text-orange-900">{path.finalProject?.title}</div>
                  <p className="mt-1 text-xs text-orange-800 leading-relaxed">{path.finalProject?.description}</p>
                  <div className="mt-2 text-[10px] font-bold text-orange-700 uppercase">Deliverable: {path.finalProject?.deliverable}</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target Certification</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">{path.certificationLabel}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
