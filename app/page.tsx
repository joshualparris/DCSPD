"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { modules } from '../src/data/modules';
import { getDashboardRecommendation, getCurrentWeakFocus } from '../src/lib/readinessMath';
import { getInitialProgressSnapshot, getStoredProgressSnapshot, type UserProgress } from '../src/lib/progress';
import { isDue } from '../src/lib/spacedRepetition';
import { getOverallProgress } from '../src/lib/moduleMath';

function getMonthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export default function HomePage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot(modules));

  useEffect(() => {
    setProgress(getStoredProgressSnapshot(modules));
  }, []);

  const dueFlashcards = modules.flatMap((module) =>
    Object.values(progress.modules[module.id]?.flashcards || {}).filter(
      (card) => card.reviewCount > 0 && isDue(card.dueDateIso)
    )
  ).length;
  const dueQuestions = progress.assessmentAttempts.filter((attempt) => isDue(attempt.nextReviewDateIso)).length;
  const completedScenarios = progress.scenarioRuns.filter((run) => run.completed).length;
  const monthlyMinutes = progress.pdEntries
    .filter((entry) => entry.createdAtIso.startsWith(getMonthKey(new Date())))
    .reduce((sum, entry) => sum + entry.minutes, 0);
  const recommendation = getDashboardRecommendation(progress);
  const overallProgress = getOverallProgress(modules, progress);
  const weakestFocus = getCurrentWeakFocus(progress);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Professional development dashboard</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
              Professional Development Dashboard
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              This dashboard supports question-first, scenario-based growth across real DCS support themes:
              diagnosis, explanation, escalation, documentation, and practical support outputs.
            </p>
          </div>

          <div className="w-full max-w-sm rounded-[2rem] bg-slate-100 p-5">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Recommended 20-minute block</div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">{recommendation.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">{recommendation.detail}</p>
            <Link
              href={recommendation.ctaHref}
              className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
            >
              {recommendation.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Current weak focus area</div>
          <div className="mt-3 text-2xl font-semibold text-slate-900">{weakestFocus}</div>
          <p className="mt-2 text-sm text-slate-600">Use this as the next priority area for review.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Overall progress</div>
          <div className="mt-3 text-2xl font-semibold text-slate-900">{Math.round(overallProgress)}%</div>
          <p className="mt-2 text-sm text-slate-600">Across modules, flashcards, practical outputs, and assessment sessions.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Due today</div>
          <div className="mt-3 text-2xl font-semibold text-slate-900">{dueFlashcards + dueQuestions}</div>
          <p className="mt-2 text-sm text-slate-600">{dueFlashcards} flashcards and {dueQuestions} question reviews are waiting.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">This month&apos;s logged PD</div>
          <div className="mt-3 text-2xl font-semibold text-slate-900">{monthlyMinutes} min</div>
          <p className="mt-2 text-sm text-slate-600">{completedScenarios} scenario exercises recorded so far.</p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Quick actions</h2>
            <p className="mt-2 text-sm text-slate-600">
              Keep the next action clear. Short, well-defined sessions are easier to complete consistently.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-7">
          {[
            ['Start tiny or focus block', '/focus'],
            ['Start 10-question assessment', '/strict-quiz'],
            ['Scenario Lab for situational practice', '/scenarios'],
            ['Review flashcards due today', '/due-today'],
            ['Add PD log entry', '/pd-log'],
            ['View readiness profiles', '/readiness'],
            ['Open evidence pack', '/evidence-pack']
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-6 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Operational priority</div>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-emerald-900">
          Use this application only during available time that does not conflict with live support responsibilities.
          Tickets, walk-ups, calls, and Paul&apos;s instructions take priority over professional development. This app is
          for personal development only and should never contain sensitive DCS, student, staff, parent, credential,
          or network detail.
        </p>
      </section>
    </div>
  );
}
