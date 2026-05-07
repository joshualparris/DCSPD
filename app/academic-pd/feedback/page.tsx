"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  getInitialProgressSnapshot,
  getStoredProgressSnapshot,
  type AcademicAssessmentAttempt,
  type UserProgress
} from '../../../src/lib/progress';

function average(values: number[]) {
  if (!values.length) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function countItems(items: string[]) {
  const counts = new Map<string, number>();
  items.forEach((item) => {
    const key = item.trim();
    if (!key) {
      return;
    }
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });
  return Array.from(counts.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label));
}

function groupAttemptsBy<T extends string>(
  attempts: AcademicAssessmentAttempt[],
  getKey: (attempt: AcademicAssessmentAttempt) => T
) {
  const groups = new Map<T, AcademicAssessmentAttempt[]>();
  attempts.forEach((attempt) => {
    const key = getKey(attempt);
    groups.set(key, [...(groups.get(key) ?? []), attempt]);
  });
  return Array.from(groups.entries()).map(([key, groupAttempts]) => ({
    key,
    attempts: groupAttempts,
    averageScore: average(groupAttempts.map((attempt) => attempt.score)),
    latestAttempt: groupAttempts[0]
  }));
}

function verdictClass(score: number) {
  if (score >= 85) return 'bg-emerald-50 text-emerald-800';
  if (score >= 70) return 'bg-blue-50 text-blue-800';
  if (score >= 50) return 'bg-amber-50 text-amber-900';
  return 'bg-rose-50 text-rose-800';
}

export default function AcademicFeedbackPage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot());

  useEffect(() => {
    setProgress(getStoredProgressSnapshot());
  }, []);

  const attempts = progress.academicAssessmentAttempts;
  const stats = useMemo(() => {
    const scores = attempts.map((attempt) => attempt.score);
    const lowestAttempts = [...attempts].sort((left, right) => left.score - right.score).slice(0, 5);
    const bySubject = groupAttemptsBy(attempts, (attempt) => attempt.subjectCode).sort(
      (left, right) => left.averageScore - right.averageScore
    );
    const byStream = groupAttemptsBy(attempts, (attempt) => attempt.stream).sort(
      (left, right) => left.averageScore - right.averageScore
    );
    const missing = countItems(attempts.flatMap((attempt) => attempt.missing));
    const risks = countItems(attempts.flatMap((attempt) => attempt.riskNotes));
    const belowStandard = attempts.filter((attempt) => attempt.score < 85);

    return {
      averageScore: average(scores),
      lowestAttempts,
      bySubject,
      byStream,
      missing,
      risks,
      belowStandard
    };
  }, [attempts]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/academic-pd" className="inline-flex text-sm font-medium text-blue-700 hover:text-blue-900">
          Back to Academic PD
        </Link>
        <Link
          href="/academic-pd/subjects/cse1pe"
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Continue CSE1PE
        </Link>
      </div>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-4xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Academic feedback</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
            Review AI-graded assessment feedback and find your weakest IT skill gaps.
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            This page collates your logged Academic PD assessment scores, missing criteria, risk notes, better-answer
            guidance, and next-practice prompts so you can decide what to study next.
          </p>
        </div>
      </section>

      {attempts.length ? (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ['Logged assessments', attempts.length],
              ['Average score', `${Math.round(stats.averageScore)}/100`],
              ['Below mastery', stats.belowStandard.length],
              ['Knowledge gaps', stats.missing.length]
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-sm text-slate-500">{label}</div>
                <div className="mt-2 text-3xl font-semibold text-slate-900">{value}</div>
              </div>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Weakest attempts</div>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">Start here for targeted revision</h2>
              <div className="mt-5 space-y-4">
                {stats.lowestAttempts.map((attempt) => (
                  <Link
                    key={attempt.id}
                    href={`/academic-pd/subjects/${attempt.subjectCode.toLowerCase()}`}
                    className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-slate-500">
                          {attempt.subjectCode} | Week {attempt.week} | {attempt.assessmentKind}
                        </div>
                        <h3 className="mt-1 text-lg font-semibold text-slate-900">{attempt.assessmentTitle}</h3>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${verdictClass(attempt.score)}`}>
                        {Math.round(attempt.score)}/100
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {attempt.missing.length ? attempt.missing.slice(0, 2).join(' ') : attempt.nextPractice}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Most common gaps</div>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Missing criteria</h2>
                <div className="mt-5 space-y-3">
                  {stats.missing.slice(0, 8).map((item) => (
                    <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm leading-6 text-slate-700">{item.label}</p>
                        <span className="rounded-full bg-white px-3 py-1 text-xs text-slate-600">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Privacy and risk</div>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Risk notes to watch</h2>
                <div className="mt-5 space-y-3">
                  {stats.risks.length ? (
                    stats.risks.slice(0, 5).map((item) => (
                      <div key={item.label} className="rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                        {item.label}
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                      No recurring risk notes logged yet.
                    </div>
                  )}
                </div>
              </section>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">By subject</div>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">Subject strength map</h2>
              <div className="mt-5 space-y-3">
                {stats.bySubject.map((group) => (
                  <div key={group.key} className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-900">{group.key}</div>
                        <div className="text-sm text-slate-500">{group.attempts.length} attempts</div>
                      </div>
                      <div className="text-lg font-semibold text-slate-900">{Math.round(group.averageScore)}/100</div>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white">
                      <div
                        className="h-full rounded-full bg-slate-900"
                        style={{ width: `${Math.min(100, Math.max(0, group.averageScore))}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">By skill stream</div>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">IT skill area map</h2>
              <div className="mt-5 space-y-3">
                {stats.byStream.map((group) => (
                  <div key={group.key} className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-900">{group.key.replace(/-/g, ' ')}</div>
                        <div className="text-sm text-slate-500">{group.attempts.length} attempts</div>
                      </div>
                      <div className="text-lg font-semibold text-slate-900">{Math.round(group.averageScore)}/100</div>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white">
                      <div
                        className="h-full rounded-full bg-slate-900"
                        style={{ width: `${Math.min(100, Math.max(0, group.averageScore))}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Recent feedback</div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Full assessment feedback history</h2>
            <div className="mt-5 space-y-4">
              {attempts.map((attempt) => (
                <article key={attempt.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-500">
                        {attempt.createdAtIso.slice(0, 10)} | {attempt.subjectCode} | Week {attempt.week}
                      </div>
                      <h3 className="mt-1 text-lg font-semibold text-slate-900">{attempt.assessmentTitle}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{attempt.prompt}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${verdictClass(attempt.score)}`}>
                      {attempt.verdict} | {Math.round(attempt.score)}/100
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 xl:grid-cols-2">
                    <div className="rounded-2xl bg-white p-4">
                      <div className="text-sm font-semibold text-slate-900">Your answer</div>
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">{attempt.userAnswer}</p>
                    </div>
                    <div className="rounded-2xl bg-white p-4">
                      <div className="text-sm font-semibold text-slate-900">Next practice</div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{attempt.nextPractice}</p>
                    </div>
                  </div>

                  <div className="mt-3 grid gap-3 xl:grid-cols-2">
                    <div className="rounded-2xl bg-white p-4">
                      <div className="text-sm font-semibold text-slate-900">What was correct</div>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">
                        {attempt.strengths.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl bg-white p-4">
                      <div className="text-sm font-semibold text-slate-900">What to fix</div>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">
                        {attempt.missing.length ? (
                          attempt.missing.map((item) => <li key={item}>{item}</li>)
                        ) : (
                          <li>No missing criteria noted.</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-3 rounded-2xl bg-white p-4">
                    <div className="text-sm font-semibold text-slate-900">Better answer guide</div>
                    <pre className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">{attempt.betterAnswer}</pre>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">No graded Academic PD assessments yet</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Complete and log a weekly assessment with AI feedback first. Once logged, scores and feedback will appear here
            as your personal knowledge-gap review.
          </p>
          <Link
            href="/academic-pd/subjects/cse1pe"
            className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Start with CSE1PE Week 1
          </Link>
        </section>
      )}
    </div>
  );
}
