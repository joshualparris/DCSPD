"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { modules as baseModules } from '../../src/data/modules';
import {
  getStoredProgressSnapshot,
  saveProgress,
  completeDailyChallenge,
} from '../../src/lib/progress';
import { getTodayDateKey } from '../../src/lib/spacedRepetition';

export default function DailyChallengePage() {
  const [progress, setProgress] = useState<any>(null);

  useEffect(() => {
    setProgress(getStoredProgressSnapshot());
  }, []);

  const todayKey = getTodayDateKey();
  const allQuestions = useMemo(
    () => baseModules.flatMap((module) => module.quiz || []),
    []
  );
  const dailyQuestionIndex = useMemo(
    () => (allQuestions.length ? new Date().getDate() % allQuestions.length : 0),
    [allQuestions.length]
  );
  const dailyQuestion = allQuestions[dailyQuestionIndex] || null;
  const challengeDone = progress?.dailyChallenge?.lastCompletedDateIso === todayKey;

  function handleMarkComplete() {
    if (!progress || !dailyQuestion) return;
    const nextProgress = completeDailyChallenge(progress, dailyQuestion.id || 'daily-challenge');
    saveProgress(nextProgress);
    setProgress(nextProgress);
  }

  return (
    <div className="space-y-8 pb-12">
      <header className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="text-sm font-bold uppercase tracking-widest text-slate-400">Daily Challenge</div>
          <h1 className="text-4xl font-bold text-slate-900">Sharpen your skills today</h1>
          <p className="max-w-3xl text-lg text-slate-600">
            Complete one short challenge each day to keep your IT support reasoning fresh and focused.
          </p>
        </div>
      </header>

      {!dailyQuestion ? (
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-slate-700">No challenge is available right now. Try again later.</p>
        </section>
      ) : (
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <div>
              <div className="text-sm font-bold uppercase tracking-widest text-slate-400">Today&apos;s prompt</div>
              <h2 className="mt-3 text-2xl font-bold text-slate-900">{dailyQuestion.prompt}</h2>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6 text-slate-700 shadow-sm">
              <p className="text-sm">
                Write your answer in your own words, then mark the challenge complete when you are ready.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-slate-600">
                {challengeDone ? (
                  <span className="inline-flex items-center gap-2 font-semibold text-emerald-700">
                    <CheckCircle2 size={18} /> Completed today
                  </span>
                ) : (
                  <>Not completed yet.</>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleMarkComplete}
                  disabled={!dailyQuestion || challengeDone}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Mark complete
                  <ArrowRight size={16} />
                </button>
                <Link
                  href="/modules"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Back to modules
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
