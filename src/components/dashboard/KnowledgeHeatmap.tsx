"use client";

import { useMemo } from 'react';
import { UserProgress } from '../../lib/progress';
import { weakTopicLabels } from '../../data/skillDomains';
import { WeakTopicKey } from '../../types/assessment';

type HeatmapProps = {
  progress: UserProgress;
};

export default function KnowledgeHeatmap({ progress }: HeatmapProps) {
  const domainHealth = useMemo(() => {
    const health: Record<string, { score: number; count: number; lastUpdate: string }> = {};

    // Process quiz attempts
    Object.values(progress.modules).forEach(m => {
      m.quizAttempts.forEach(attempt => {
        // We don't have domain in ModuleQuizAttempt, so we use a simplified mapping or rely on weakTopics
      });
    });

    // Process weak topic reviews (this is the most reliable source for domain health)
    Object.values(progress.weakTopicReviews).forEach(review => {
      const topic = review.topic;
      const score = review.averageScore;
      health[topic] = {
        score: score * 100,
        count: review.reviewCount,
        lastUpdate: review.dueDateIso
      };
    });

    return health;
  }, [progress]);

  const topics = Object.keys(weakTopicLabels) as WeakTopicKey[];

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Knowledge Health Map</h3>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">Domain strength & decay</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-rose-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">Weak</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">Strong</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {topics.map(topic => {
          const data = domainHealth[topic];
          const score = data?.score ?? 0;
          const hasData = typeof data !== 'undefined';

          return (
            <div 
              key={topic}
              className={`group relative flex flex-col items-center justify-center rounded-2xl p-3 transition-all ${
                !hasData ? 'bg-slate-50 border border-slate-100' : 
                score >= 85 ? 'bg-emerald-50 border border-emerald-100' :
                score >= 60 ? 'bg-orange-50 border border-orange-100' :
                'bg-rose-50 border border-rose-100'
              }`}
            >
              <div className={`h-1.5 w-full rounded-full mb-2 overflow-hidden bg-slate-200`}>
                <div 
                  className={`h-full transition-all duration-1000 ${
                    score >= 85 ? 'bg-emerald-500' :
                    score >= 60 ? 'bg-orange-500' :
                    'bg-rose-500'
                  }`}
                  style={{ width: `${hasData ? score : 0}%` }}
                />
              </div>
              <div className="text-[9px] font-bold text-center leading-tight text-slate-600 group-hover:text-slate-900 uppercase tracking-tighter line-clamp-2">
                {weakTopicLabels[topic]}
              </div>
              
              {/* Tooltip-like info */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 whitespace-nowrap">
                {hasData ? `${Math.round(score)}% Mastery (${data.count} reviews)` : 'No data yet'}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-100">
        <div className="flex items-start gap-3 bg-indigo-50 rounded-2xl p-4 border border-indigo-100">
          <svg className="text-indigo-600 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          <p className="text-xs text-indigo-900 leading-relaxed">
            <strong>How this works:</strong> Colors indicate your average score in assessments. Scores decay over time if you do not revisit flashcards or scenarios in that domain. Aim for an all-green board!
          </p>
        </div>
      </div>
    </div>
  );
}
