"use client";

import * as React from 'react';
import Link from 'next/link';
import { AlertCircle, Target, ShieldAlert, ChevronRight } from 'lucide-react';
import { getCommonPitfalls, type CommonPitfall } from '../../lib/pitfalls';
import type { UserProgress } from '../../lib/progress';

interface CommonPitfallsProps {
  progress: UserProgress;
}

const typeIcons = {
  concept: <Target className="text-blue-500" size={18} />,
  criteria: <AlertCircle className="text-amber-500" size={18} />,
  risk: <ShieldAlert className="text-rose-500" size={18} />
};

export default function CommonPitfalls({ progress }: CommonPitfallsProps) {
  const pitfalls = React.useMemo(() => getCommonPitfalls(progress), [progress]);

  if (pitfalls.length === 0) {
    return null;
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Common Pitfalls</h2>
          <p className="text-sm text-slate-500 mt-1">Targeted review based on your frequent mistakes.</p>
        </div>
      </div>

      <div className="space-y-4">
        {pitfalls.map((pitfall) => (
          <div 
            key={pitfall.id}
            className="group flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
          >
            <div className="mt-1 p-2 rounded-xl bg-white shadow-sm shrink-0">
              {typeIcons[pitfall.type]}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-slate-900 truncate">{pitfall.label}</h3>
                <span className="shrink-0 px-2 py-0.5 rounded-full bg-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-600">
                  {pitfall.frequency} occurrences
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed line-clamp-2">
                {pitfall.description}
              </p>
              
              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs font-medium text-slate-500 italic">
                  Advice: {pitfall.recommendation}
                </p>
                
                {pitfall.moduleId && (
                  <Link 
                    href={`/modules/${pitfall.moduleId}`}
                    className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Review
                    <ChevronRight size={14} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
