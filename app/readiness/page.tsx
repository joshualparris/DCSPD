"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getReadinessProfile, type ReadinessScore } from '../../src/lib/readinessMath';
import { getInitialProgressSnapshot, getStoredProgressSnapshot, type UserProgress } from '../../src/lib/progress';

function confidenceStyles(confidence: ReadinessScore['confidence']) {
  if (confidence === 'high') return 'bg-emerald-100 text-emerald-800';
  if (confidence === 'medium') return 'bg-amber-100 text-amber-800';
  return 'bg-slate-200 text-slate-700';
}

function ProfileCard({
  title,
  description,
  scores
}: {
  title: string;
  description: string;
  scores: ReadinessScore[];
}) {
  const average = scores.length
    ? Math.round(scores.reduce((sum, score) => sum + score.score, 0) / scores.length)
    : 0;

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
        </div>
        <div className="rounded-3xl bg-slate-100 px-5 py-4 text-sm text-slate-700">
          Estimated average: <span className="font-semibold text-slate-900">{average}%</span>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {scores.map((score) => (
          <div key={score.id} className="rounded-3xl bg-slate-50 p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-900">{score.label}</div>
                <div className="mt-1 text-sm text-slate-600">{score.note}</div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${confidenceStyles(score.confidence)}`}>
                  {score.confidence} confidence{score.isEstimate ? ' (estimate)' : ''}
                </span>
                <div className="text-lg font-semibold text-slate-900">{Math.round(score.score)}%</div>
              </div>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
              <div className="h-full rounded-full bg-slate-900" style={{ width: `${Math.min(100, score.score)}%` }} />
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-4 text-sm text-slate-700">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Evidence drivers</div>
                <ul className="mt-3 space-y-1">
                  <li>- Assessment: {Math.round(score.drivers.assessment)}%</li>
                  <li>- Scenarios: {Math.round(score.drivers.scenarios)}%</li>
                  <li>- Note quality: {Math.round(score.drivers.noteQuality)}%</li>
                  <li>- Flashcards: {Math.round(score.drivers.flashcards)}%</li>
                  <li>- Practical outputs: {Math.round(score.drivers.practicalOutputs)}%</li>
                  <li>- Weak-area penalty: -{Math.round(score.drivers.weakAreaPenalty)}%</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-white p-4 text-sm text-slate-700">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Next best focus</div>
                <div className="mt-3">
                  <div className="font-semibold text-slate-900">Weakest area</div>
                  <div className="mt-1 text-slate-700">{score.weakestArea}</div>
                </div>
                {score.nextAction ? (
                  <Link
                    href={score.nextAction.href}
                    className="mt-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
                  >
                    {score.nextAction.label}
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ReadinessPage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot());

  useEffect(() => {
    setProgress(getStoredProgressSnapshot());
  }, []);

  const aPlusScores = getReadinessProfile('aPlus', progress);
  const level2Scores = getReadinessProfile('level2', progress);
  const managerScores = getReadinessProfile('schoolItManager', progress);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Readiness graphs</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Readiness profiles based on current evidence</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            These profiles are indicative only and should not be treated as formal credentials. Where assessment
            evidence exists, it influences the score. Where evidence is limited, module coverage contributes to a
            lighter estimate.
          </p>
        </div>
      </section>

      <ProfileCard
        title="CompTIA A+ readiness"
        description="A summary of current foundational capability across core support domains."
        scores={aPlusScores}
      />

      <ProfileCard
        title="Level 2 support readiness"
        description="An estimate of progression from Level 1 support activity toward stronger technical depth."
        scores={level2Scores}
      />

      <ProfileCard
        title="School IT Manager readiness"
        description="A broad estimate of strategic and operational breadth. Confidence is lower where supporting evidence is limited."
        scores={managerScores}
      />
    </div>
  );
}
