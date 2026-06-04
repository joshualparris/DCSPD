"use client";

import * as React from 'react';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import AcademicAssessmentGrader, {
  type AcademicAssessmentLogPayload
} from '../../../../src/components/academic/AcademicAssessmentGrader';
import { getAcademicSubjectByCode as getBaseAcademicSubjectByCode, getAcademicWeeklyModules } from '../../../../src/data/academicSubjects';
import { getCustomAcademic } from '../../../../src/lib/customModules';
import {
  addPdEntry,
  getInitialProgressSnapshot,
  getStoredProgressSnapshot,
  saveAcademicAssessmentAttempt,
  saveProgress,
  toggleAcademicFinalChallengeChecklistItem,
  type AcademicAssessmentAttempt,
  type PdEntry,
  type UserProgress
} from '../../../../src/lib/progress';
import { getAcademicSubjectProgress } from '../../../../src/lib/academicProgress';
import {
  getAcademicFinalChallengeChecklist,
  getAcademicSiloProgress,
  getAcademicSubjectFlashcards
} from '../../../../src/lib/academicSiloProgress';
import type { AcademicSubject } from '../../../../src/types/academic';
import type { AcademicAssessmentItem, AcademicWeeklyModule } from '../../../../src/types/academic';
import { trackUsageInteraction } from '../../../../src/hooks/useUsageTracking';

interface PageProps {
  params: any;
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
  const [subjectCode, setSubjectCode] = useState<string | undefined>(undefined);
  const [hasMounted, setHasMounted] = useState(false);
  const [subject, setSubject] = useState<AcademicSubject | undefined>(undefined);

  const [expandedSilos, setExpandedSilos] = useState<Set<string>>(new Set());
  const [expandedWeeks, setExpandedWeeks] = useState<Set<string>>(new Set());

  useEffect(() => {
    setHasMounted(true);
    
    async function resolve() {
      const resolvedParams = await params;
      const code = resolvedParams?.subjectCode;
      setSubjectCode(code);

      if (!code) return;

      let currentSubject = getBaseAcademicSubjectByCode(code);
      if (!currentSubject) {
        currentSubject = getCustomAcademic().find(s => s.code.toLowerCase() === code.toLowerCase());
      }
      
      if (currentSubject) {
        setSubject(currentSubject);
        setExpandedSilos(new Set([currentSubject.silos[0]?.id].filter(Boolean)));
        setExpandedWeeks(new Set(
          currentSubject.weeklyModules?.[0]?.id
            ? [currentSubject.weeklyModules[0].id]
            : currentSubject.topics[0]?.id
              ? [`${currentSubject.id}-week-1-${currentSubject.topics[0].id}`]
              : []
        ));
      }
    }

    resolve();
  }, [params]);

  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot([]));
  const [assessmentStep, setAssessmentStep] = useState<'intro' | 'active' | 'complete'>('intro');
  const [assessmentIndex, setAssessmentIndex] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState<Record<string, string>>({});
  const [lastLog, setLastLog] = useState<AcademicAssessmentLogPayload | null>(null);

  useEffect(() => {
    if (hasMounted) {
      setProgress(getStoredProgressSnapshot([]));
    }
  }, [hasMounted]);

  const subjectProgress = useMemo(() => {
    if (!subject) return null;
    return getAcademicSubjectProgress(subject, progress.academicAssessmentAttempts);
  }, [subject, progress.academicAssessmentAttempts]);

  const silosProgress = useMemo(() => {
    if (!subject) return [];
    return getAcademicSiloProgress(subject, progress.academicAssessmentAttempts);
  }, [subject, progress.academicAssessmentAttempts]);

  const weeklyModules = useMemo(() => {
    if (!subject) return [];
    const baseModules = getAcademicWeeklyModules(subject);
    
    // Enrich with completion status
    return baseModules.map(module => {
      const isCompleted = module.assessments.every(assessment => 
        progress.academicAssessmentAttempts.some(attempt => attempt.assessmentId === assessment.id)
      );
      return {
        ...module,
        isCompleted,
        weekNumber: module.week
      };
    });
  }, [subject, progress.academicAssessmentAttempts]);

  const flashcards = useMemo(() => {
    if (!subject) return [];
    return getAcademicSubjectFlashcards(subject);
  }, [subject]);

  const finalChecklist = useMemo(() => {
    if (!subject) return [];
    const base = getAcademicFinalChallengeChecklist(subject);
    const stored = progress.academicFinalChallengeChecklists?.[subject.id] || {};
    
    return base.map(item => ({
      ...item,
      isCompleted: !!stored[item.id]
    }));
  }, [subject, progress.academicFinalChallengeChecklists]);

  if (!hasMounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Subject Not Found</h1>
        <p className="mt-4 max-w-md text-lg text-slate-600">
          The subject code &ldquo;{subjectCode}&rdquo; does not match our current academic library.
        </p>
        <Link 
          href="/academic-pd" 
          className="mt-8 rounded-2xl bg-slate-900 px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl transition hover:scale-105 hover:bg-slate-800"
        >
          Return to Library
        </Link>
      </div>
    );
  }

  const toggleSilo = (id: string) => {
    setExpandedSilos(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleWeek = (id: string) => {
    setExpandedWeeks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const currentModule = weeklyModules[assessmentIndex];
  const currentAssessments = currentModule?.assessments || [];

  const handleAssessmentComplete = (payload: AcademicAssessmentLogPayload) => {
    const attempt: AcademicAssessmentAttempt = {
      id: `${subject.id}-${currentModule.id}-${Date.now()}`,
      createdAtIso: new Date().toISOString(),
      subjectId: subject.id,
      subjectCode: subject.code,
      subjectTitle: subject.title,
      track: subject.track,
      stream: subject.stream,
      weeklyModuleId: currentModule.id,
      weeklyModuleTitle: currentModule.title,
      week: currentModule.week,
      assessmentId: currentModule.assessments[0]?.id || 'unknown', // Assuming single assessment for now
      assessmentTitle: currentModule.assessments[0]?.title || 'Weekly Assessment',
      assessmentKind: currentModule.assessments[0]?.kind || 'quick-check',
      evidenceType: currentModule.assessments[0]?.evidenceType || 'reflection',
      prompt: currentModule.assessments[0]?.prompt || '',
      userAnswer: payload.userAnswer,
      successCriteria: currentModule.assessments[0]?.successCriteria || [],
      siloIds: currentModule.siloIds,
      dcsApplication: currentModule.assessments[0]?.dcsApplication || '',
      score: payload.score,
      verdict: payload.verdict,
      strengths: payload.strengths,
      missing: payload.missing,
      riskNotes: payload.riskNotes,
      betterAnswer: payload.betterAnswer,
      nextPractice: payload.nextPractice,
      redactionSummary: payload.redactionSummary,
      privacyChecked: true
    };

    const nextProgress = saveAcademicAssessmentAttempt(progress, attempt);
    
    const entry: PdEntry = {
      id: `pd-${Date.now()}`,
      createdAtIso: new Date().toISOString(),
      type: 'quiz',
      title: `Assessment: ${subject.code} - ${currentModule.title}`,
      minutes: 30,
      evidenceSummary: `Completed AI assessment for ${currentModule.title} with a score of ${Math.round(payload.score)}/100.`,
      privacyChecked: true
    };

    const finalProgress = addPdEntry(nextProgress, entry);
    saveProgress(finalProgress);
    setProgress(finalProgress);
    setLastLog(payload);
    setAssessmentStep('complete');

    trackUsageInteraction({
      eventType: 'quiz_completed',
      route: `/academic-pd/subjects/${subject.code}`,
      label: `${subject.code} - ${currentModule.title}`,
      contentType: 'academic-subject',
      contentId: subject.id,
      activityCategory: 'quiz',
      completed: true
    });
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-20">
      <Link 
        href="/academic-pd" 
        className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
      >
        <span className="text-xl">←</span> Back to Library
      </Link>

      <header className="rounded-[3rem] border border-slate-200 bg-white p-12 shadow-sm">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-white">
                {subject.code}
              </span>
              <span className={`rounded-full border px-4 py-1.5 text-xs font-black uppercase tracking-widest ${relevanceClasses[(subject.relevance || 'medium') as keyof typeof relevanceClasses]}`}>
                {subject.relevance || 'medium'} Relevance
              </span>
              <span className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-slate-500">
                {sourceStatusLabels[subject.sourceStatus]}
              </span>
            </div>
            
            <h1 className="text-5xl font-black tracking-tight text-slate-900">{subject.title}</h1>
            <p className="max-w-3xl text-xl leading-relaxed text-slate-600">{subject.description}</p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-6 py-3">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Total Progress</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">{subjectProgress?.completionPercentage || 0}%</span>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-6 py-3">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Retention Score</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">{subjectProgress?.averageRetentionScore || 0}%</span>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-6 py-3">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Study Points</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">{subjectProgress?.totalPoints || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <section className="rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-sm">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">Weekly Learning Path</h2>
            <p className="mt-2 text-sm text-slate-500">Structured modules aligned with the SLG sequence.</p>
            
            <div className="mt-8 space-y-4">
              {weeklyModules.map((module) => (
                <div 
                  key={module.id} 
                  className={`overflow-hidden rounded-[2rem] border transition-all ${
                    expandedWeeks.has(module.id) ? 'border-slate-300 shadow-md' : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <button
                    onClick={() => toggleWeek(module.id)}
                    className="flex w-full items-center justify-between bg-white p-6 text-left"
                  >
                    <div className="flex items-center gap-6">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl font-black transition-colors ${
                        module.isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {module.weekNumber}
                      </div>
                      <div>
                        <div className="text-sm font-black uppercase tracking-widest text-slate-400">Week {module.weekNumber}</div>
                        <div className="text-xl font-bold text-slate-900">{module.title}</div>
                      </div>
                    </div>
                    <div className="text-2xl text-slate-300">{expandedWeeks.has(module.id) ? '−' : '+'}</div>
                  </button>
                  
                  {expandedWeeks.has(module.id) && (
                    <div className="border-t border-slate-50 bg-slate-50/50 p-8 space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Topic Focus</div>
                          <p className="mt-2 text-sm leading-relaxed text-slate-700">{module.overview}</p>
                        </div>
                        <div className="space-y-4">
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Assessment Items</div>
                          <div className="flex flex-wrap gap-2">
                            {module.assessments.map((a, i) => (
                              <span key={i} className="rounded-lg bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 shadow-sm">
                                {assessmentKindLabels[a.kind]}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end pt-4">
                        <button 
                          onClick={() => {
                            setAssessmentIndex(weeklyModules.findIndex(m => m.id === module.id));
                            setAssessmentStep('active');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="rounded-xl bg-slate-900 px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:scale-105"
                        >
                          Launch Assessment
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-sm">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">Knowledge Silos</h2>
            <p className="mt-2 text-sm text-slate-500">Mastery tracking for core domain concepts.</p>

            <div className="mt-8 space-y-4">
              {silosProgress.map((silo) => (
                <div 
                  key={silo.id} 
                  className={`overflow-hidden rounded-[2rem] border transition-all ${
                    expandedSilos.has(silo.id) ? 'border-slate-300 shadow-md' : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <button
                    onClick={() => toggleSilo(silo.id)}
                    className="flex w-full items-center justify-between bg-white p-6 text-left"
                  >
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between pr-8">
                        <span className="text-lg font-bold text-slate-900">{silo.title}</span>
                        <span className="text-sm font-black text-slate-400">{silo.completionPercentage}%</span>
                      </div>
                      <div className="mr-8 h-2 rounded-full bg-slate-100">
                        <div 
                          className="h-full rounded-full bg-blue-600 transition-all duration-500" 
                          style={{ width: `${silo.completionPercentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-2xl text-slate-300">{expandedSilos.has(silo.id) ? '−' : '+'}</div>
                  </button>

                  {expandedSilos.has(silo.id) && (
                    <div className="border-t border-slate-50 bg-slate-50/50 p-8">
                      <div className="space-y-4">
                        {silo.conceptChecklist.map(item => (
                          <div key={item.id} className="flex items-center gap-3">
                            <div className={`h-5 w-5 rounded border transition-colors ${
                              item.isMastered ? 'border-emerald-500 bg-emerald-500' : 'border-slate-200 bg-white'
                            }`}>
                              {item.isMastered && <span className="flex items-center justify-center text-[10px] text-white">✓</span>}
                            </div>
                            <span className={`text-sm ${item.isMastered ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-black tracking-tight text-slate-900">Final Challenge</h3>
            <p className="mt-2 text-sm text-slate-500">The high-stakes assessment required for subject completion.</p>
            
            <div className="mt-6 space-y-6">
              <div className="rounded-3xl bg-slate-50 p-6">
                <div className="text-sm font-bold text-slate-900">{subject.finalChallenge.title}</div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{subject.finalChallenge.brief}</p>
              </div>

              <div className="space-y-3">
                {finalChecklist.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      const next = toggleAcademicFinalChallengeChecklistItem(progress, subject.id, item.id);
                      saveProgress(next);
                      setProgress(next);
                    }}
                    className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 text-left transition hover:border-slate-300"
                  >
                    <div className={`h-5 w-5 shrink-0 rounded border transition-colors ${
                      item.isCompleted ? 'border-emerald-500 bg-emerald-500' : 'border-slate-200'
                    }`}>
                      {item.isCompleted && <span className="flex items-center justify-center text-[10px] text-white">✓</span>}
                    </div>
                    <span className={`text-xs ${item.isCompleted ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-black tracking-tight text-slate-900">Learning Resources</h3>
            <div className="mt-6 space-y-3">
              {subject.resources.map((resource, i) => (
                <a
                  key={i}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl border border-slate-50 bg-slate-50 p-4 transition hover:border-slate-200 hover:bg-white"
                >
                  <div className="text-[10px] font-black uppercase tracking-widest text-blue-600">{resourceKindLabels[resource.kind]}</div>
                  <div className="mt-1 text-xs font-bold text-slate-900 group-hover:text-blue-600">{resource.title}</div>
                </a>
              ))}
            </div>
          </section>

          {flashcards.length > 0 && (
            <section className="rounded-[2.5rem] border border-amber-100 bg-amber-50 p-8 shadow-sm">
              <h3 className="text-lg font-black tracking-tight text-amber-900">Spaced Repetition</h3>
              <p className="mt-2 text-xs text-amber-800">{flashcards.length} cards due for review.</p>
              <Link 
                href={`/academic-pd/subjects/${subject.code}/review`}
                className="mt-6 block w-full rounded-2xl bg-amber-500 py-4 text-center text-xs font-black uppercase tracking-widest text-white shadow-lg transition hover:scale-105 hover:bg-amber-600"
              >
                Start Review
              </Link>
            </section>
          )}
        </aside>
      </div>

      {assessmentStep === 'active' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[3rem] bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-6">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Topic Assessment</div>
                <h3 className="text-2xl font-black text-slate-900">{currentModule.title}</h3>
              </div>
              <button 
                onClick={() => setAssessmentStep('intro')}
                className="rounded-full bg-slate-100 p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-900"
              >
                ✕
              </button>
            </div>
            
            <div className="mt-8">
              <AcademicAssessmentGrader
                subject={subject}
                module={currentModule}
                assessment={currentAssessments[0]} // Use the first assessment
                onLog={handleAssessmentComplete}
              />
            </div>
          </div>
        </div>
      )}

      {assessmentStep === 'complete' && lastLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[3rem] bg-white p-12 text-center shadow-2xl">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-4xl text-emerald-600">
              ✓
            </div>
            <h3 className="mt-8 text-3xl font-black text-slate-900">Assessment Complete</h3>
            <p className="mt-4 text-lg text-slate-600">You earned 50 study points!</p>
            
            <div className="mt-12 rounded-3xl bg-slate-50 p-8 text-left">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Better Answer Guide</div>
              <div className="mt-4 prose prose-slate prose-sm max-w-none text-slate-700 whitespace-pre-wrap">
                {lastLog.betterAnswer}
              </div>
            </div>

            <button 
              onClick={() => {
                setAssessmentStep('intro');
                setLastLog(null);
              }}
              className="mt-12 w-full rounded-2xl bg-slate-900 py-5 text-sm font-black uppercase tracking-widest text-white shadow-xl transition hover:scale-105 hover:bg-slate-800"
            >
              Return to Path
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
