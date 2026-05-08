"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  Brain,
  ClipboardCheck,
  FlaskConical,
  Gauge,
  ListChecks,
  Medal,
  ShieldCheck,
  Sparkles,
  Target
} from 'lucide-react';
import { modules } from '../../src/data/modules';
import { getInitialProgressSnapshot, getStoredProgressSnapshot, type UserProgress } from '../../src/lib/progress';
import {
  getSkillCoachDashboard,
  type SkillCoachBadge,
  type SkillCoachRecommendation,
  type SkillCoachTrack
} from '../../src/lib/skillCoach';

const recommendationStyles: Record<SkillCoachRecommendation['kind'], string> = {
  diagnostic: 'border-blue-200 bg-blue-50 text-blue-900',
  'micro-learning': 'border-emerald-200 bg-emerald-50 text-emerald-900',
  'hands-on-lab': 'border-indigo-200 bg-indigo-50 text-indigo-900',
  'ai-coaching': 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-900',
  badge: 'border-amber-200 bg-amber-50 text-amber-900',
  review: 'border-rose-200 bg-rose-50 text-rose-900'
};

function scoreTone(score: number) {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 60) return 'bg-blue-500';
  if (score >= 40) return 'bg-amber-500';
  return 'bg-rose-500';
}

function badgeTone(status: SkillCoachBadge['status']) {
  if (status === 'earned') return 'border-emerald-200 bg-emerald-50 text-emerald-800';
  if (status === 'in-progress') return 'border-blue-200 bg-blue-50 text-blue-800';
  return 'border-slate-200 bg-slate-50 text-slate-700';
}

function TrackCard({ track }: { track: SkillCoachTrack }) {
  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <Gauge size={16} />
            Skill IQ
          </div>
          <h2 className="mt-3 text-xl font-semibold text-slate-900">{track.title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{track.description}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-semibold text-slate-900">{Math.round(track.score)}</div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{track.confidence}</div>
        </div>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${scoreTone(track.score)}`} style={{ width: `${track.score}%` }} />
      </div>

      <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Weakest area</div>
          <div className="mt-1 font-medium text-slate-900">{track.weakestArea}</div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Evidence</div>
          <div className="mt-1 font-medium text-slate-900">{track.evidenceCount} signals</div>
        </div>
      </div>

      {track.nextAction ? (
        <Link
          href={track.nextAction.href}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          {track.nextAction.label}
          <ArrowRight size={16} />
        </Link>
      ) : null}
    </article>
  );
}

function RecommendationCard({ recommendation }: { recommendation: SkillCoachRecommendation }) {
  return (
    <article className={`rounded-[2rem] border p-5 shadow-sm ${recommendationStyles[recommendation.kind]}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] opacity-80">{recommendation.kind}</div>
          <h3 className="mt-2 text-lg font-semibold">{recommendation.title}</h3>
        </div>
        <div className="rounded-full bg-white/70 px-3 py-1 text-sm font-semibold">{recommendation.minutes} min</div>
      </div>
      <p className="mt-3 text-sm leading-6 opacity-90">{recommendation.description}</p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] opacity-75">{recommendation.reason}</p>
      <Link
        href={recommendation.href}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
      >
        {recommendation.ctaLabel}
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}

function BadgeCard({ badge }: { badge: SkillCoachBadge }) {
  return (
    <article className={`rounded-[2rem] border p-5 shadow-sm ${badgeTone(badge.status)}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] opacity-75">
            <Award size={15} />
            {badge.status}
          </div>
          <h3 className="mt-2 text-lg font-semibold">{badge.title}</h3>
        </div>
        <div className="rounded-full bg-white/75 px-3 py-1 text-sm font-semibold">{Math.round(badge.progressPercent)}%</div>
      </div>
      <p className="mt-3 text-sm leading-6 opacity-90">{badge.description}</p>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/70">
        <div className="h-full rounded-full bg-slate-900" style={{ width: `${badge.progressPercent}%` }} />
      </div>
      <div className="mt-4 text-sm font-semibold">{badge.certificateLabel}</div>
      <div className="mt-1 text-xs opacity-80">{badge.evidenceLabel}</div>
      <Link
        href={badge.href}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
      >
        Continue
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}

export default function SkillCoachPage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot(modules));

  useEffect(() => {
    setProgress(getStoredProgressSnapshot(modules));
  }, []);

  const dashboard = useMemo(() => getSkillCoachDashboard(progress), [progress]);
  const earnedBadges = dashboard.badges.filter((badge) => badge.status === 'earned').length;

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              <Brain size={17} />
              Skill coach
            </div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Adaptive DCS IT growth plan</h1>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Current evidence points to <span className="font-semibold text-slate-900">{dashboard.weakestTrack.title}</span> as the next
              lift, with <span className="font-semibold text-slate-900">{dashboard.strongestTrack.title}</span> as the strongest track.
            </p>
          </div>

          <div className="grid w-full max-w-md grid-cols-3 gap-3">
            <div className="rounded-3xl bg-slate-100 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Skill IQ</div>
              <div className="mt-2 text-3xl font-semibold text-slate-900">{Math.round(dashboard.skillIq)}</div>
            </div>
            <div className="rounded-3xl bg-slate-100 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Progress</div>
              <div className="mt-2 text-3xl font-semibold text-slate-900">{Math.round(dashboard.overallProgress)}%</div>
            </div>
            <div className="rounded-3xl bg-slate-100 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Badges</div>
              <div className="mt-2 text-3xl font-semibold text-slate-900">{earnedBadges}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {dashboard.tracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            <Target size={17} />
            Priority queue
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {dashboard.recommendations.map((recommendation) => (
              <RecommendationCard key={recommendation.id} recommendation={recommendation} />
            ))}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            <ListChecks size={17} />
            20-minute workout
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">{dashboard.workout.title}</h2>
          <div className="mt-5 space-y-3">
            {dashboard.workout.steps.map((step) => (
              <Link
                key={step.id}
                href={step.href}
                className="flex gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4 transition hover:border-slate-200 hover:bg-white"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-900">
                  {step.minutes}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{step.title}</div>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{step.reason}</p>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            <Medal size={17} />
            Badges and certificates
          </div>
          <Link
            href="/certificates"
            className="w-fit rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Export certificates
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dashboard.badges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          <FlaskConical size={17} />
          Hands-on labs
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {dashboard.labs.map((lab) => (
            <Link
              key={lab.id}
              href={lab.href}
              className={`rounded-[2rem] border p-5 shadow-sm transition hover:-translate-y-0.5 ${
                lab.recommended ? 'border-indigo-200 bg-indigo-50' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="rounded-full bg-white/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                  {lab.focus}
                </div>
                <div className="text-sm font-semibold text-slate-700">{lab.minutes} min</div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{lab.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{lab.description}</p>
              {lab.recommended ? (
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-800">
                  <Sparkles size={15} />
                  Recommended
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            <ShieldCheck size={17} />
            Privacy boundary
          </div>
          <p className="mt-3 text-sm leading-7 text-emerald-900">
            Use fake, synthetic, or anonymised evidence only. Skill Coach uses local progress signals and does not need
            private student, staff, parent, credential, or network details.
          </p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            <ClipboardCheck size={17} />
            Current weak topics
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {dashboard.weakTopicLabels.length ? (
              dashboard.weakTopicLabels.map((label) => (
                <span key={label} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700">
                  {label}
                </span>
              ))
            ) : (
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700">
                Complete diagnostics to unlock weak-topic tracking
              </span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
