"use client";

import Link from 'next/link';
import { useState } from 'react';
import AcademicAssessmentGrader, {
  type AcademicAssessmentLogPayload
} from '../../../../src/components/academic/AcademicAssessmentGrader';
import { getAcademicSubjectByCode, getAcademicWeeklyModules } from '../../../../src/data/academicSubjects';
import {
  addPdEntry,
  getStoredProgressSnapshot,
  saveAcademicAssessmentAttempt,
  saveProgress,
  type AcademicAssessmentAttempt,
  type PdEntry
} from '../../../../src/lib/progress';
import type { AcademicSubject } from '../../../../src/types/academic';
import type { AcademicAssessmentItem, AcademicWeeklyModule } from '../../../../src/types/academic';

interface PageProps {
  params: {
    subjectCode: string;
  };
}

const sourceStatusLabels: Record<AcademicSubject['sourceStatus'], string> = {
  canonical: 'Canonical SLG',
  duplicate: 'Duplicate source',
  'manual-check': 'Manual check needed',
  placeholder: 'Placeholder plan'
};

const relevanceClasses = {
  high: 'border-red-200 bg-red-50 text-red-800',
  medium: 'border-amber-200 bg-amber-50 text-amber-900',
  low: 'border-emerald-200 bg-emerald-50 text-emerald-800'
} as const;

const resourceKindLabels: Record<AcademicSubject['resources'][number]['kind'], string> = {
  'official-docs': 'Official docs',
  course: 'Course',
  video: 'Video',
  'youtube-channel': 'YouTube channel',
  pdf: 'PDF',
  book: 'Book',
  tool: 'Tool'
};

const assessmentKindLabels: Record<AcademicAssessmentItem['kind'], string> = {
  'quick-check': 'Quick check',
  'coding-exercise': 'Coding exercise',
  'applied-task': 'Applied task',
  reflection: 'Reflection',
  rubric: 'Rubric'
};

function uniqueList(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function formatLabel(value: string) {
  return value.replace(/-/g, ' ');
}

export default function SubjectPage({ params }: PageProps) {
  const subject = getAcademicSubjectByCode(params.subjectCode);
  const [expandedSilos, setExpandedSilos] = useState<Set<string>>(() =>
    new Set(subject?.silos[0]?.id ? [subject.silos[0].id] : [])
  );
  const [expandedWeeks, setExpandedWeeks] = useState<Set<string>>(() =>
    new Set(
      subject?.weeklyModules?.[0]?.id
        ? [subject.weeklyModules[0].id]
        : subject?.topics[0]?.id
          ? [`${subject.id}-week-1-${subject.topics[0].id}`]
          : []
    )
  );
  const [loggedMessage, setLoggedMessage] = useState('');

  if (!subject) {
    return (
      <div className="space-y-6">
        <Link href="/academic-pd" className="inline-flex text-sm font-medium text-blue-700 hover:text-blue-900">
          Back to Academic PD
        </Link>
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Academic subject not found</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            This subject code is not in the Academic PD catalogue yet. Return to the subject list and choose an available
            RBC or SMITB subject.
          </p>
        </section>
      </div>
    );
  }

  const highBridge = subject.dcsBridges.find((bridge) => bridge.relevance === 'high') ?? subject.dcsBridges[0];
  const relatedModuleIds = uniqueList(subject.dcsBridges.flatMap((bridge) => bridge.relatedDcsModuleIds));
  const practicalOutputIds = uniqueList(subject.practicalTasks.map((task) => task.id));
  const weeklyModules = getAcademicWeeklyModules(subject);
  const sourceSummary = subject.localSources?.length
    ? subject.localSources.map((source) => `${source.fileName} (${source.status})`).join(', ')
    : subject.sourceFileName ?? 'Manual catalogue entry';

  function toggleSilo(siloId: string) {
    setExpandedSilos((current) => {
      const next = new Set(current);
      if (next.has(siloId)) {
        next.delete(siloId);
      } else {
        next.add(siloId);
      }
      return next;
    });
  }

  function toggleWeek(moduleId: string) {
    setExpandedWeeks((current) => {
      const next = new Set(current);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  }

  function logPdEntry(type: PdEntry['type'], minutes: number) {
    if (!subject) return; // Safety check
    
    const progress = getStoredProgressSnapshot();
    const nowIso = new Date().toISOString();
    const isOutput = type === 'practical-output';

    const entry: PdEntry = {
      id: `academic-${subject.id}-${type}-${Date.now()}`,
      createdAtIso: nowIso,
      type,
      title: isOutput
        ? `Academic PD output: ${subject.code} - ${subject.title}`
        : `Academic PD study: ${subject.code} - ${subject.title}`,
      minutes,
      moduleIds: relatedModuleIds.length ? relatedModuleIds : undefined,
      practicalOutputIds: isOutput && practicalOutputIds.length ? practicalOutputIds : undefined,
      evidenceSummary: isOutput
        ? `${subject.finalChallenge.title}: ${subject.finalChallenge.evidence}`
        : `Reviewed ${subject.code} SILOs, mastery criteria, and DCS bridge. Strongest DCS link: ${highBridge.explanation}`,
      reflection: subject.recommendedNextAction,
      privacyChecked: true
    };

    saveProgress(addPdEntry(progress, entry));
    setLoggedMessage(`${minutes} minutes logged as ${type}.`);
  }

  function logWeeklyAssessment(
    module: AcademicWeeklyModule,
    assessment: AcademicAssessmentItem,
    payload: AcademicAssessmentLogPayload
  ) {
    if (!subject) return; // Safety check

    const progress = getStoredProgressSnapshot();
    const nowIso = new Date().toISOString();
    const pdEntryId = `academic-${subject.id}-${assessment.id}-pd-${Date.now()}`;
    const attemptId = `academic-${subject.id}-${assessment.id}-attempt-${Date.now()}`;
    const entry: PdEntry = {
      id: pdEntryId,
      createdAtIso: nowIso,
      type: assessment.kind === 'coding-exercise' || assessment.kind === 'applied-task' ? 'practical-output' : 'module-study',
      title: `${subject.code} ${module.title}: ${assessment.title}`,
      minutes: assessment.minutes,
      moduleIds: relatedModuleIds.length ? relatedModuleIds : undefined,
      practicalOutputIds:
        assessment.kind === 'coding-exercise' || assessment.kind === 'applied-task'
          ? [assessment.id]
          : undefined,
      evidenceSummary: `AI grading score: ${Math.round(payload.score)}/100 (${payload.verdict}). ${assessment.title}. DCS application: ${assessment.dcsApplication}`,
      reflection: `Missing/fix: ${payload.missing.length ? payload.missing.join('; ') : 'No missing criteria noted.'} Next practice: ${payload.nextPractice}`,
      privacyChecked: true
    };

    const attempt: AcademicAssessmentAttempt = {
      id: attemptId,
      createdAtIso: nowIso,
      subjectId: subject.id,
      subjectCode: subject.code,
      subjectTitle: subject.title,
      track: subject.track,
      stream: subject.stream,
      weeklyModuleId: module.id,
      weeklyModuleTitle: module.title,
      week: module.week,
      assessmentId: assessment.id,
      assessmentTitle: assessment.title,
      assessmentKind: assessment.kind,
      evidenceType: assessment.evidenceType,
      prompt: assessment.prompt,
      userAnswer: payload.userAnswer,
      successCriteria: assessment.successCriteria,
      siloIds: assessment.siloIds,
      dcsApplication: assessment.dcsApplication,
      score: payload.score,
      verdict: payload.verdict,
      strengths: payload.strengths,
      missing: payload.missing,
      riskNotes: payload.riskNotes,
      betterAnswer: payload.betterAnswer,
      nextPractice: payload.nextPractice,
      redactionSummary: payload.redactionSummary,
      privacyChecked: true,
      pdEntryId
    };

    saveProgress(saveAcademicAssessmentAttempt(addPdEntry(progress, entry), attempt));
    setLoggedMessage(`${module.title} assessment logged with score ${Math.round(payload.score)}/100.`);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/academic-pd" className="inline-flex text-sm font-medium text-blue-700 hover:text-blue-900">
          Back to Academic PD
        </Link>
        <Link
          href="/academic-pd/feedback"
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
        >
          Review assessment feedback
        </Link>
      </div>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">{subject.code}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{subject.track}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {formatLabel(subject.stream)}
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                {sourceStatusLabels[subject.sourceStatus]}
              </span>
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">
              {subject.code} - {subject.title}
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">{subject.summary}</p>
            <p className="mt-3 text-sm text-slate-500">
              {subject.provider} | {formatLabel(subject.level)} | {subject.sourceType}
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-950 xl:w-96">
            <div className="font-semibold">{highBridge.dcsArea}</div>
            <p className="mt-2 leading-6">{highBridge.explanation}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">SILOs</div>
          <div className="mt-2 text-3xl font-semibold text-slate-900">{subject.silos.length}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Topics</div>
          <div className="mt-2 text-3xl font-semibold text-slate-900">{subject.topics.length}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">DCS bridges</div>
          <div className="mt-2 text-3xl font-semibold text-slate-900">{subject.dcsBridges.length}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Resources</div>
          <div className="mt-2 text-3xl font-semibold text-slate-900">{subject.resources.length}</div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Study cycle</div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Diagnose, learn, retrieve, apply, prove</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-5">
              {subject.learningModes.map((mode) => (
                <div key={mode.id} className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">{mode.label}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{mode.action}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Subject map</div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Concepts to connect with DCS support</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {subject.topics.map((topic) => (
                <div key={topic.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="font-semibold text-slate-900">{topic.title}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{topic.dcsConnection}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Weekly LMS modules</div>
            <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Week-by-week topics and assessment</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Each box turns the SLG schedule into a practical DCSPrep learning block with local app links,
                  external resources, and assessment evidence.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                {weeklyModules.length} modules | {weeklyModules.reduce((sum, module) => sum + module.assessments.length, 0)} assessments
              </div>
            </div>

            <div className="mt-5 grid gap-4">
              {weeklyModules.map((module) => {
                const isExpanded = expandedWeeks.has(module.id);
                return (
                  <article key={module.id} className="overflow-hidden rounded-2xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => toggleWeek(module.id)}
                      className="flex w-full flex-col gap-3 bg-slate-50 p-5 text-left transition hover:bg-slate-100 md:flex-row md:items-start md:justify-between"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                            Week {module.week}
                          </span>
                          {module.dateIso ? (
                            <span className="rounded-full bg-white px-3 py-1 text-xs text-slate-600">{module.dateIso}</span>
                          ) : null}
                          {module.contactHours ? (
                            <span className="rounded-full bg-white px-3 py-1 text-xs text-slate-600">
                              {module.contactHours} contact hours
                            </span>
                          ) : null}
                        </div>
                        <h3 className="mt-3 text-xl font-semibold text-slate-900">{module.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{module.overview}</p>
                      </div>
                      <span className="w-fit rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
                        {isExpanded ? 'Collapse' : 'Open module'}
                      </span>
                    </button>

                    {isExpanded ? (
                      <div className="space-y-5 p-5">
                        <div className="flex flex-wrap gap-2">
                          {module.deliveryModes.map((mode) => (
                            <span key={mode} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                              {mode}
                            </span>
                          ))}
                          {module.siloIds.map((siloId) => (
                            <span key={siloId} className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-800">
                              {siloId.replace(`${subject.id}-`, '').toUpperCase()}
                            </span>
                          ))}
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                          <div className="rounded-2xl bg-slate-50 p-4">
                            <h4 className="text-sm font-semibold text-slate-900">DCS application</h4>
                            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                              {module.dcsConnections.map((connection) => (
                                <li key={connection}>{connection}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="rounded-2xl bg-slate-50 p-4">
                            <h4 className="text-sm font-semibold text-slate-900">DCSPrep links</h4>
                            <div className="mt-3 space-y-2">
                              {module.internalLinks.map((link) => (
                                <Link
                                  key={link.id}
                                  href={link.href}
                                  className="block rounded-xl bg-white p-3 text-sm text-blue-700 transition hover:bg-blue-50"
                                >
                                  <span className="font-semibold">{link.label}</span>
                                  <span className="mt-1 block leading-5 text-slate-600">{link.why}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-slate-900">Learning resources</h4>
                          <div className="mt-3 grid gap-3 lg:grid-cols-3">
                            {module.resources.map((item) => (
                              <a
                                key={item.id}
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:bg-slate-50"
                              >
                                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                                  {resourceKindLabels[item.kind]}
                                </div>
                                <div className="mt-2 text-sm font-semibold text-slate-900">{item.title}</div>
                                <p className="mt-2 text-sm leading-6 text-slate-600">{item.why}</p>
                              </a>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-slate-900">Integrated assessment</h4>
                          <div className="mt-3 grid gap-3 lg:grid-cols-2">
                            {module.assessments.map((assessment) => (
                              <div key={assessment.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                    {assessmentKindLabels[assessment.kind]}
                                  </span>
                                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                                    {assessment.minutes} min
                                  </span>
                                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                                    {assessment.evidenceType}
                                  </span>
                                </div>
                                <h5 className="mt-3 font-semibold text-slate-900">{assessment.title}</h5>
                                <p className="mt-2 text-sm leading-6 text-slate-600">{assessment.prompt}</p>
                                <div className="mt-3 rounded-xl bg-slate-50 p-3">
                                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                                    Success criteria
                                  </div>
                                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">
                                    {assessment.successCriteria.map((criterion) => (
                                      <li key={criterion}>{criterion}</li>
                                    ))}
                                  </ul>
                                </div>
                                <p className="mt-3 text-sm leading-6 text-slate-600">{assessment.dcsApplication}</p>
                                <AcademicAssessmentGrader
                                  subject={subject}
                                  module={module}
                                  assessment={assessment}
                                  onLog={(payload) => logWeeklyAssessment(module, assessment, payload)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">SILOs</div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Learning outcomes with mastery evidence</h2>
            <div className="mt-5 space-y-4">
              {subject.silos.map((silo) => {
                const isExpanded = expandedSilos.has(silo.id);
                return (
                  <div key={silo.id} className="overflow-hidden rounded-2xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => toggleSilo(silo.id)}
                      className="flex w-full items-start justify-between gap-4 bg-slate-50 p-4 text-left transition hover:bg-slate-100"
                    >
                      <div>
                        <div className="text-sm font-semibold text-slate-500">SILO {silo.number}</div>
                        <h3 className="mt-1 font-semibold leading-6 text-slate-900">{silo.text}</h3>
                      </div>
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
                        {isExpanded ? 'Collapse' : 'Expand'}
                      </span>
                    </button>

                    {isExpanded ? (
                      <div className="space-y-5 p-5">
                        <p className="text-sm leading-7 text-slate-700">{silo.plainEnglish}</p>

                        <div className="grid gap-4 lg:grid-cols-3">
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900">Mastery criteria</h4>
                            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                              {silo.masteryCriteria.map((criterion) => (
                                <li key={criterion}>{criterion}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900">Practice prompts</h4>
                            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                              {silo.practicePrompts.map((prompt) => (
                                <li key={prompt}>{prompt}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900">Knowledge checks</h4>
                            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                              {silo.quizItems.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Source evidence</div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Local source coverage</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{sourceSummary}</p>
            {subject.localSources?.length ? (
              <div className="mt-4 space-y-3">
                {subject.localSources.map((source) => (
                  <div key={source.id} className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                    <div className="font-semibold text-slate-900">{source.fileName}</div>
                    <div className="mt-1">{sourceStatusLabels[source.status]}</div>
                    {source.note ? <p className="mt-2 leading-6 text-slate-600">{source.note}</p> : null}
                  </div>
                ))}
              </div>
            ) : null}
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">DCS relevance</div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Bridge map</h2>
            <div className="mt-5 space-y-4">
              {subject.dcsBridges.map((bridge) => (
                <div key={bridge.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-semibold text-slate-900">{bridge.dcsArea}</div>
                    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${relevanceClasses[bridge.relevance]}`}>
                      {bridge.relevance}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{bridge.explanation}</p>
                  {bridge.relatedDcsModuleIds.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {bridge.relatedDcsModuleIds.map((moduleId) => (
                        <span key={moduleId} className="rounded-full bg-white px-3 py-1 text-xs text-slate-600">
                          {moduleId}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {bridge.practicalOutput ? (
                    <div className="mt-3 rounded-xl bg-white p-3 text-sm text-slate-700">
                      <span className="font-semibold text-slate-900">Output: </span>
                      {bridge.practicalOutput}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Outputs</div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Practical tasks</h2>
            <div className="mt-5 space-y-3">
              {subject.practicalTasks.map((task) => (
                <div key={task.id} className="rounded-2xl bg-slate-50 p-4">
                  <div className="font-semibold text-slate-900">{task.title}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{task.description}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{task.privacyReminder}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Resources</div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Learning links</h2>
            <div className="mt-5 space-y-3">
              {subject.resources.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {resourceKindLabels[item.kind]}
                  </div>
                  <div className="mt-2 font-semibold text-slate-900">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.why}</p>
                </a>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Final challenge</div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">{subject.finalChallenge.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{subject.finalChallenge.brief}</p>
            <p className="mt-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">{subject.finalChallenge.evidence}</p>
            {subject.recommendedNextAction ? (
              <p className="mt-3 text-sm leading-6 text-slate-600">{subject.recommendedNextAction}</p>
            ) : null}
            <div className="mt-5 grid gap-3">
              <button
                type="button"
                onClick={() => logPdEntry('module-study', 30)}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
              >
                Log 30 min subject study
              </button>
              <button
                type="button"
                onClick={() => logPdEntry('practical-output', 45)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
              >
                Log 45 min final challenge
              </button>
            </div>
            {loggedMessage ? (
              <p className="mt-3 rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-800">{loggedMessage}</p>
            ) : null}
          </section>
        </aside>
      </section>
    </div>
  );
}
