"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  getAcademicCatalogueStats,
  getAcademicSourceSummary,
  getAcademicTrackSubjects,
  getRecommendedAcademicBuildPath,
  academicSubjects as baseSubjects
} from '../../src/data/academicSubjects';
import { getAcademicSubjectProgress } from '../../lib/academicProgress';
import { getInitialProgressSnapshot, getStoredProgressSnapshot, type UserProgress } from '../../lib/progress';
import { getCustomAcademic } from '../../src/lib/customModules';
import type { AcademicSubject } from '../../src/types/academic';

const sourceStatusLabels: Record<AcademicSubject['sourceStatus'], string> = {
  canonical: 'Canonical SLG',
  duplicate: 'Duplicate',
  'manual-check': 'Manual check',
  placeholder: 'Placeholder'
};

const sourceStatusClasses: Record<AcademicSubject['sourceStatus'], string> = {
  canonical: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  duplicate: 'border-slate-200 bg-slate-50 text-slate-700',
  'manual-check': 'border-amber-200 bg-amber-50 text-amber-900',
  placeholder: 'border-rose-200 bg-rose-50 text-rose-800'
};

function SubjectCard({ subject, progress }: { subject: AcademicSubject; progress: UserProgress }) {
  const highBridge = subject.dcsBridges.find((bridge) => bridge.relevance === 'high');
  const subjectProgress = getAcademicSubjectProgress(subject, progress.academicAssessmentAttempts);

  return (
    <Link
      href={`/academic-pd/subjects/${subject.code.toLowerCase()}`}
      className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">{subject.code}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{subject.stream}</span>
        <span className={`rounded-full border px-3 py-1 text-xs font-medium ${sourceStatusClasses[subject.sourceStatus]}`}>
          {sourceStatusLabels[subject.sourceStatus]}
        </span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-slate-900">{subject.title}</h3>
      <p className="mt-2 text-sm text-slate-500">
        {subject.provider} | {subject.track} | {subject.level}
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-700">{subject.summary}</p>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="font-semibold text-slate-900">Subject progress</span>
          <span className="text-slate-600">
            {subjectProgress.completedAssessments}/{subjectProgress.totalAssessments} assessments
          </span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-white">
          <div
            className="h-full rounded-full bg-slate-900 transition-all"
            style={{ width: `${subjectProgress.completionPercent}%` }}
          />
        </div>
        <div className="mt-2 flex flex-wrap justify-between gap-2 text-xs text-slate-600">
          <span>{subjectProgress.completionPercent}% complete</span>
          <span>
            {subjectProgress.averageScore === null
              ? 'No score yet'
              : `Average ${Math.round(subjectProgress.averageScore)}/100`}
          </span>
        </div>
      </div>

      {highBridge ? (
        <div className="mt-4 rounded-xl bg-blue-50 p-3 text-sm text-blue-950">
          <div className="font-semibold">{highBridge.dcsArea}</div>
          <p className="mt-1 leading-6">{highBridge.explanation}</p>
        </div>
      ) : null}

      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-slate-600">
        <div className="rounded-xl bg-slate-50 p-2">
          <div className="text-lg font-semibold text-slate-900">{subject.silos.length}</div>
          SILOs
        </div>
        <div className="rounded-xl bg-slate-50 p-2">
          <div className="text-lg font-semibold text-slate-900">{subject.practicalTasks.length}</div>
          tasks
        </div>
        <div className="rounded-xl bg-slate-50 p-2">
          <div className="text-lg font-semibold text-slate-900">{subject.resources.length}</div>
          links
        </div>
      </div>
    </Link>
  );
}

export default function AcademicPDPage() {
  const [customSubjects, setCustomSubjects] = useState<AcademicSubject[]>([]);
  const allSubjects = useMemo(() => [...baseSubjects, ...customSubjects], [customSubjects]);
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot());
  const [hasHydratedProgress, setHasHydratedProgress] = useState(false);
  const rbcSubjects = getAcademicTrackSubjects('RBC', allSubjects);
  const smitbSubjects = getAcademicTrackSubjects('SMITB', allSubjects);
  const stats = getAcademicCatalogueStats(allSubjects);
  const sourceSummary = getAcademicSourceSummary(allSubjects);
  const buildPath = getRecommendedAcademicBuildPath(4, allSubjects);

  useEffect(() => {
    setProgress(getStoredProgressSnapshot());
    setCustomSubjects(getCustomAcademic());
    setHasHydratedProgress(true);
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-4xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Academic PD Track</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
              RBC and SMITB study mapped to practical DCS IT growth.
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              This track turns SLGs and SILOs into DCSPrep learning: diagnose, learn, retrieve, apply, and prove. It keeps
              the university content connected to privacy-safe school support outcomes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/academic-pd/feedback"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white"
            >
              Review AI feedback
            </Link>
            <Link
              href="/academic-pd/bridge"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700"
            >
              Open DCS bridge
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {[
          ['Subjects', stats.subjects],
          ['SILOs mapped', stats.silos],
          ['Weekly modules', stats.weeklyModules],
          ['Assessments', stats.weeklyAssessments],
          ['Practical tasks', stats.practicalTasks],
          ['High DCS bridges', stats.highRelevanceBridges]
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">{label}</div>
            <div className="mt-2 text-3xl font-semibold text-slate-900">{value}</div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Build path</div>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">Recommended implementation order</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {buildPath.map((subject, index) => (
              <Link
                key={subject.id}
                href={`/academic-pd/subjects/${subject.code.toLowerCase()}`}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
              >
                <div className="text-sm font-semibold text-slate-500">Step {index + 1}</div>
                <div className="mt-2 text-lg font-semibold text-slate-900">
                  {subject.code} - {subject.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{subject.recommendedNextAction}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Source health</div>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">SLG coverage</h2>
          <div className="mt-5 space-y-3">
            {(Object.keys(sourceSummary) as AcademicSubject['sourceStatus'][]).map((status) => (
              <div key={status} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-700">{sourceStatusLabels[status]}</span>
                <span className="text-lg font-semibold text-slate-900">{sourceSummary[status]}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Placeholder or manual-check subjects are useful for planning, but should not be treated as complete until the
            source SLG is verified.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">RBC</div>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">La Trobe Bachelor of IT / RBC Bendigo track</h2>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          {rbcSubjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} progress={progress} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">SMITB</div>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Master-level / advanced IT track</h2>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          {smitbSubjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} progress={progress} />
          ))}
        </div>
      </section>
    </div>
  );
}
