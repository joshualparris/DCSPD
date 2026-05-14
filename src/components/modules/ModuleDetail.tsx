"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { getModuleCompletion } from '../../lib/moduleMath';
import {
  addPdEntry,
  ensureModuleProgress,
  getInitialProgressSnapshot,
  getStoredProgressSnapshot,
  markSectionRead,
  recordAssessmentAttempt,
  recordFlashcardReview,
  recordModuleQuizAttempt,
  saveProgress,
  saveActiveAssessment,
  clearActiveAssessment,
  togglePracticalOutput,
  type UserProgress
} from '../../lib/progress';
import type { AssessmentAttempt } from '../../types/assessment';
import type { TrainingModule } from '../../types/training';
import AssessmentSession from '../assessment/AssessmentSession';
import FlashcardDeck from '../flashcards/FlashcardDeck';
import { addModulePoints, awardBadge, PREDEFINED_BADGES } from '../../lib/gamification';
import { trackUsageInteraction } from '../../hooks/useUsageTracking';
import { useOfflineDownload } from '../../hooks/useOfflineDownload';
import { Download, Trash2, CheckCircle } from 'lucide-react';
import ModuleQuestionFirst from './ModuleQuestionFirst';
import ModuleTabs from './ModuleTabs';
import SectionReader from './SectionReader';

type ModuleDetailProps = {
  moduleData: TrainingModule;
};

export default function ModuleDetail({ moduleData }: ModuleDetailProps) {
  const [progress, setProgress] = useState<UserProgress>(() =>
    ensureModuleProgress(getInitialProgressSnapshot(), moduleData)
  );
  const [hasHydratedProgress, setHasHydratedProgress] = useState(false);
  const [tab, setTab] = useState('Questions First');
  const openedModuleRef = useRef<string | null>(null);
  const route = `/modules/${moduleData.id}`;

  const { downloadedModuleIds, downloadModule, removeModule } = useOfflineDownload();
  const isDownloaded = downloadedModuleIds.has(moduleData.id);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadModule(moduleData);
    } catch (error) {
      console.error('Download failed', error);
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    setProgress(ensureModuleProgress(getStoredProgressSnapshot(), moduleData));
    setHasHydratedProgress(true);
  }, [moduleData]);

  useEffect(() => {
    if (openedModuleRef.current === moduleData.id) {
      return;
    }

    openedModuleRef.current = moduleData.id;
    trackUsageInteraction({
      eventType: 'module_open',
      route,
      label: moduleData.title,
      contentType: 'module',
      contentId: moduleData.id,
      activityCategory: 'reading',
      metadata: {
        domain: moduleData.domain,
        level: moduleData.level,
        source: 'built-in'
      }
    });
  }, [moduleData.domain, moduleData.id, moduleData.level, moduleData.title, route]);

  useEffect(() => {
    if (!hasHydratedProgress) {
      return;
    }

    saveProgress(progress);
  }, [hasHydratedProgress, progress]);

  const moduleProgress = progress.modules[moduleData.id];
  const completion = getModuleCompletion(moduleData.id, progress, moduleData);

  useEffect(() => {
    if (completion === 100) {
      addModulePoints(moduleData.id);

      // Check for specific badges
      if (moduleData.id === 'cybersecurity-basics') {
        awardBadge(PREDEFINED_BADGES.CYBER_GUARDIAN);
      } else if (moduleData.id === 'device-imaging-workflows') {
        awardBadge(PREDEFINED_BADGES.IMAGING_PRO);
      } else if (moduleData.id === 'accessibility-inclusive-design') {
        awardBadge(PREDEFINED_BADGES.INCLUSIVE_DESIGNER);
      } else if (moduleData.id === 'communication-soft-skills') {
        awardBadge(PREDEFINED_BADGES.SUPPORT_HEART);
      }
    }
  }, [completion, moduleData.id]);

  const latestQuizScore = moduleProgress.quizAttempts.length
    ? moduleProgress.quizAttempts[moduleProgress.quizAttempts.length - 1].score
    : null;

  function handleModuleAttempt(attempt: AssessmentAttempt) {
    trackUsageInteraction({
      eventType: 'quiz_answered',
      route,
      label: `${moduleData.title} quiz question`,
      contentType: 'module',
      contentId: moduleData.id,
      activityCategory: 'quiz',
      completed: true,
      score: Math.round(attempt.scoreBreakdown.total * 100),
      metadata: {
        domain: attempt.domain,
        weakTopic: attempt.weakTopic
      }
    });
    setProgress((current) => recordAssessmentAttempt(current, attempt));
  }

  function handleTabChange(nextTab: string) {
    setTab(nextTab);

    const tabCategory =
      nextTab === 'Assessment'
        ? 'quiz'
        : nextTab === 'Review'
          ? 'flashcards'
          : nextTab === 'DCS Application'
            ? 'building'
            : 'reading';

    trackUsageInteraction({
      eventType: nextTab === 'Assessment' ? 'quiz_started' : 'module_section_view',
      route,
      label: `${moduleData.title}: ${nextTab}`,
      contentType: 'module',
      contentId: moduleData.id,
      activityCategory: tabCategory,
      metadata: {
        domain: moduleData.domain,
        level: moduleData.level
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="underline">
          Dashboard
        </Link>
        <span>/</span>
        <Link href="/modules" className="underline">
          Modules
        </Link>
        <span>/</span>
        <span className="text-slate-700">{moduleData.title}</span>
      </div>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 text-xs text-slate-500">
              <span className="rounded-full bg-slate-100 px-3 py-1">{moduleData.domain}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">{moduleData.level}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">{moduleData.estimatedMinutes} min</span>
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">{moduleData.title}</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">{moduleData.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {moduleData.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              {isDownloaded ? (
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <CheckCircle size={14} />
                    Available offline
                  </span>
                  <button
                    onClick={() => removeModule(moduleData.id)}
                    className="flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-medium text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={12} />
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                  <Download size={16} />
                  {isDownloading ? 'Downloading...' : 'Download for offline use'}
                </button>
              )}
            </div>
          </div>

          <div className="w-full max-w-sm rounded-3xl bg-slate-100 p-5">
            <div className="text-sm text-slate-500">Module completion</div>
            <div className="mt-2 text-4xl font-semibold text-slate-900">{Math.round(completion)}%</div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-white">
              <div className="h-full rounded-full bg-slate-900" style={{ width: `${completion}%` }} />
            </div>
            <div className="mt-4 space-y-2 text-sm text-slate-700">
              <div>
                Flashcards reviewed: {Object.values(moduleProgress.flashcards).filter((card) => card.reviewCount > 0).length}
              </div>
              <div>Latest assessment score: {latestQuizScore === null ? 'No attempt yet' : `${latestQuizScore}%`}</div>
            </div>
          </div>
        </div>
      </section>

      <ModuleTabs tabs={['Questions First', 'Review', 'Assessment', 'Reference', 'DCS Application']} onChange={handleTabChange} />

      {tab === 'Questions First' ? <ModuleQuestionFirst moduleData={moduleData} /> : null}

      {tab === 'Reference' ? (
        <div className="space-y-4">
          {moduleData.sections.map((section) => (
            <SectionReader
              key={section.id}
              id={section.id}
              title={section.title}
              bodyMarkdown={section.bodyMarkdown}
              takeaway={section.takeaway}
              onMarkRead={(sectionId) => {
                trackUsageInteraction({
                  eventType: 'module_section_view',
                  route,
                  label: `${moduleData.title}: ${section.title}`,
                  contentType: 'module',
                  contentId: moduleData.id,
                  activityCategory: 'reading',
                  completed: true,
                  metadata: {
                    domain: moduleData.domain,
                    level: moduleData.level
                  }
                });
                setProgress((current) => markSectionRead(current, moduleData.id, sectionId));
              }}
              isRead={Boolean(moduleProgress.sectionsRead[section.id])}
            />
          ))}
        </div>
      ) : null}

      {tab === 'Review' ? (
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 max-w-2xl">
            <h2 className="text-2xl font-semibold text-slate-900">Flashcard review</h2>
            <p className="mt-2 text-sm text-slate-600">
              Rate each card honestly. The app schedules the next review date locally with no backend needed.
            </p>
          </div>
          <FlashcardDeck
            cards={moduleData.flashcards}
            progress={moduleProgress.flashcards}
            onReview={(cardId, rating) =>
              setProgress((current) => recordFlashcardReview(current, moduleData.id, cardId, rating))
            }
            analyticsContext={{ moduleId: moduleData.id, moduleTitle: moduleData.title, route }}
          />
        </section>
      ) : null}

      {tab === 'Assessment' ? (
        <AssessmentSession
          questions={moduleData.quiz}
          source="module-quiz"
          title={`${moduleData.title} assessment`}
          description="Record confidence first, then provide the answer, explanation, and judgement required for structured review."
          initialIndex={moduleProgress.activeAssessment?.currentIndex}
          initialAttempts={moduleProgress.activeAssessment?.attempts}
          onProgressUpdate={(idx, attempts) => {
            setProgress((current) => saveActiveAssessment(current, moduleData.id, idx, attempts));
          }}
          onRecordAttempt={handleModuleAttempt}
          onSessionComplete={(attempts) => {
            const average = attempts.length
              ? Math.round(
                  (attempts.reduce((sum, attempt) => sum + attempt.scoreBreakdown.total, 0) / attempts.length) *
                    100
                )
              : 0;

            setProgress((current) =>
              addPdEntry(
                recordModuleQuizAttempt(current, moduleData.id, {
                  id: `${moduleData.id}-${Date.now()}`,
                  attemptAtIso: new Date().toISOString(),
                  score: average,
                  questionIds: attempts.map((attempt) => attempt.questionId)
                }),
                {
                  id: `pd-quiz-${moduleData.id}-${Date.now()}`,
                  createdAtIso: new Date().toISOString(),
                  type: 'quiz',
                  title: `${moduleData.title} quiz (${average}%)`,
                  minutes: Math.max(10, Math.round(attempts.length * 1.5)),
                  moduleIds: [moduleData.id],
                  weakTopicsTouched: [...new Set(attempts.map((attempt) => attempt.weakTopic))],
                  evidenceSummary: `Completed a module quiz session and recorded an average score of ${average}%.`,
                  reflection: undefined,
                  privacyChecked: true
                }
              )
            );
            trackUsageInteraction({
              eventType: 'quiz_completed',
              route,
              label: `${moduleData.title} quiz complete`,
              contentType: 'module',
              contentId: moduleData.id,
              activityCategory: 'quiz',
              completed: true,
              score: average,
              metadata: {
                domain: moduleData.domain,
                level: moduleData.level
              }
            });
          }}
        />
      ) : null}

      {tab === 'DCS Application' ? (
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">DCS application</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              {moduleData.dcsRelevance.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-slate-900">Learning objectives</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {moduleData.learningObjectives.map((objective) => (
                  <li key={objective}>- {objective}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-slate-900">Scenario prompts</h3>
              <div className="mt-3 space-y-3">
                {moduleData.scenarioPrompts.map((prompt) => (
                  <div key={prompt.id} className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
                    <div className="font-semibold text-slate-900">{prompt.title}</div>
                    <p className="mt-2">{prompt.prompt}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Practical outputs</h2>
            <p className="mt-2 text-sm text-slate-600">
              These outputs convert study into usable documentation, references, and support material.
            </p>

            <div className="mt-5 space-y-3">
              {moduleData.practicalOutputs.map((output) => (
                <label
                  key={output.id}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4 text-sm text-slate-700"
                >
                  <input
                    type="checkbox"
                    checked={Boolean(moduleProgress.practicalOutputs[output.id])}
                    onChange={() =>
                      setProgress((current) => {
                        const before = Boolean(current.modules[moduleData.id]?.practicalOutputs?.[output.id]);
                        const next = togglePracticalOutput(current, moduleData.id, output.id);
                        const after = Boolean(next.modules[moduleData.id]?.practicalOutputs?.[output.id]);

                        if (!before && after) {
                          trackUsageInteraction({
                            eventType: 'module_section_view',
                            route,
                            label: `Practical output: ${output.title}`,
                            contentType: 'module',
                            contentId: moduleData.id,
                            activityCategory: 'building',
                            completed: true,
                            metadata: {
                              domain: moduleData.domain,
                              level: moduleData.level
                            }
                          });
                          return addPdEntry(next, {
                            id: `pd-output-${moduleData.id}-${output.id}-${Date.now()}`,
                            createdAtIso: new Date().toISOString(),
                            type: 'practical-output',
                            title: `Completed output: ${output.title}`,
                            minutes: 15,
                            moduleIds: [moduleData.id],
                            practicalOutputIds: [output.id],
                            evidenceSummary: `Completed a practical output for "${moduleData.title}".`,
                            reflection: undefined,
                            privacyChecked: true
                          });
                        }

                        return next;
                      })
                    }
                    className="mt-1 h-4 w-4 rounded border-slate-300"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">{output.title}</div>
                    <p className="mt-1">{output.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
