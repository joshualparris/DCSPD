'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Clock, Pencil, RotateCcw } from 'lucide-react';
import { resumeStudyPlan } from '../../data/resumeStudyPlan';
import {
  advanceResumeStudy,
  getDefaultResumeStudyProgress,
  getResumeStudyCompletionPercent,
  getResumeStudyProgress,
  getResumeStudyStepKey,
  markCurrentStudyStepComplete,
  resetResumeStudyProgress,
  saveResumeStudyProgress,
  updateCurrentStudyNote,
  type ResumeStudyProgress,
} from '../../lib/resumeStudyProgress';

function formatLastOpened(value?: string) {
  if (!value) {
    return 'Not started yet';
  }

  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export default function ResumeStudyCard() {
  const [hasMounted, setHasMounted] = useState(false);
  const [progress, setProgress] = useState<ResumeStudyProgress>(() => getDefaultResumeStudyProgress());

  useEffect(() => {
    setProgress(getResumeStudyProgress());
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) {
      return;
    }
    saveResumeStudyProgress(progress);
  }, [hasMounted, progress]);

  const currentDay = resumeStudyPlan[progress.currentDayIndex] || resumeStudyPlan[0];
  const currentStep = currentDay.steps[progress.currentStepIndex] || currentDay.steps[0];
  const currentStepKey = getResumeStudyStepKey(progress.currentDayIndex, progress.currentStepIndex);
  const currentNote = progress.notesByStepKey[currentStepKey] || '';
  const completionPercent = getResumeStudyCompletionPercent(progress);
  const stepIsComplete = progress.completedStepKeys.includes(currentStepKey);

  const completedTodayCount = useMemo(
    () =>
      currentDay.steps.filter((_, index) =>
        progress.completedStepKeys.includes(getResumeStudyStepKey(progress.currentDayIndex, index))
      ).length,
    [currentDay.steps, progress.completedStepKeys, progress.currentDayIndex]
  );

  function handleMarkComplete() {
    setProgress(markCurrentStudyStepComplete(progress));
  }

  function handleNextStep() {
    setProgress(advanceResumeStudy(progress));
  }

  function handleNoteChange(note: string) {
    setProgress(updateCurrentStudyNote(progress, note));
  }

  function handleReset() {
    const confirmed = window.confirm('Reset the 16-day Resume Study plan back to Day 1, Step 1?');
    if (confirmed) {
      setProgress(resetResumeStudyProgress());
    }
  }

  if (!hasMounted) {
    return <div className="p-8 text-slate-700">Loading Resume Study...</div>;
  }

  return (
    <main className="mx-auto max-w-6xl space-y-8 p-6 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm hover:border-rose-200 hover:text-rose-700"
        >
          <RotateCcw className="h-4 w-4" />
          Reset plan
        </button>
      </div>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">Resume Study</div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Day {currentDay.day} of {resumeStudyPlan.length}: {currentDay.topic}
            </h1>
            <p className="mt-4 text-base leading-8 text-slate-600">{currentDay.goal}</p>
          </div>
          <div className="rounded-3xl bg-slate-950 p-5 text-white shadow-sm">
            <div className="text-sm text-slate-300">Overall progress</div>
            <div className="mt-2 text-4xl font-bold">{completionPercent}%</div>
            <div className="mt-1 text-xs text-slate-400">Last opened {formatLastOpened(progress.updatedAtIso)}</div>
          </div>
        </div>

        <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-blue-600" style={{ width: `${completionPercent}%` }} />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-blue-200 bg-blue-50 p-6 shadow-sm md:p-8">
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-blue-800">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm">
              <Clock className="h-4 w-4" />
              {currentStep.minutes} min
            </span>
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">
              Step {progress.currentStepIndex + 1} of {currentDay.steps.length}
            </span>
            {stepIsComplete && (
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-emerald-800">
                <CheckCircle2 className="h-4 w-4" />
                Step complete
              </span>
            )}
          </div>

          <h2 className="mt-5 text-3xl font-bold text-slate-950">{currentStep.label}</h2>
          <p className="mt-4 text-base leading-8 text-slate-700">{currentStep.instruction}</p>

          <div className="mt-6 rounded-3xl border border-blue-100 bg-white p-5">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
              <BookOpen className="h-4 w-4" />
              Exact task
            </div>
            <p className="mt-3 text-lg leading-8 text-slate-900">{currentStep.prompt}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{currentStep.outputHint}</p>
          </div>

          <div className="mt-6">
            <label htmlFor="resume-study-note" className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Pencil className="h-4 w-4" />
              Quick scratch note for this step
            </label>
            <textarea
              id="resume-study-note"
              value={currentNote}
              onChange={(event) => handleNoteChange(event.target.value)}
              className="mt-3 min-h-36 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-800 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100"
              placeholder="Write the answer, ticket note, or reminder you want preserved when you get interrupted."
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleMarkComplete}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              <CheckCircle2 className="h-4 w-4" />
              Mark step complete
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Next step
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">Today’s steps</h2>
            <p className="mt-2 text-sm text-slate-600">
              {completedTodayCount} of {currentDay.steps.length} complete today.
            </p>
            <div className="mt-5 space-y-3">
              {currentDay.steps.map((step, index) => {
                const key = getResumeStudyStepKey(progress.currentDayIndex, index);
                const isCurrent = index === progress.currentStepIndex;
                const isDone = progress.completedStepKeys.includes(key);
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() =>
                      setProgress(
                        saveResumeStudyProgress({
                          ...progress,
                          currentStepIndex: index,
                        })
                      )
                    }
                    className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
                      isCurrent
                        ? 'border-blue-300 bg-blue-50 text-blue-950'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span>
                      <span className="block text-sm font-semibold">{step.label}</span>
                      <span className="text-xs text-slate-500">{step.minutes} min</span>
                    </span>
                    {isDone ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <ArrowRight className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-amber-950">Interrupt-safe rule</h2>
            <p className="mt-3 text-sm leading-7 text-amber-900">
              Tickets and walk-ups come first. This page saves the current day, step, and scratch note in your browser so you can close it and come back later.
            </p>
          </section>
        </aside>
      </section>
    </main>
  );
}
