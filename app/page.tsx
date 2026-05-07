"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { modules } from '../src/data/modules';
import { getDashboardRecommendation, getCurrentWeakFocus } from '../src/lib/readinessMath';
import { getInitialProgressSnapshot, getStoredProgressSnapshot, type UserProgress } from '../src/lib/progress';
import { isDue } from '../src/lib/spacedRepetition';
import { getOverallProgress } from '../src/lib/moduleMath';
import { requestAiCoachFeedback } from '../src/lib/ai/coachClient';
import { weakTopicLabels } from '../src/data/skillDomains';
import { getTodayDateKey } from '../src/lib/spacedRepetition';
import { completeDailyChallenge, saveProgress } from '../src/lib/progress';

function getMonthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export default function HomePage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot(modules));
  const [mentorState, setMentorState] = useState<{
    loading: boolean;
    error: string | null;
    output: null | {
      score: number;
      strengths: string[];
      missing: string[];
      riskNotes: string[];
      betterAnswer: string;
      nextPractice: string;
    };
  }>({
    loading: false,
    error: null,
    output: null
  });

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

  const todayKey = getTodayDateKey();
  const challengeDone = progress.dailyChallenge?.lastCompletedDateIso === todayKey;

  // Simple deterministic daily question based on date
  const allQuestions = modules.flatMap((m) => m.quiz);
  const dailyQuestionIndex =
    new Date().getDate() % (allQuestions.length || 1);
  const dailyQuestion = allQuestions[dailyQuestionIndex];

  function handleDailyChallengeComplete() {
    const nextProgress = completeDailyChallenge(progress, dailyQuestion.id);
    setProgress(nextProgress);
    saveProgress(nextProgress);
  }

  async function generateAiMentorPlan() {
    console.log('Generating AI Mentor Plan...');
    setMentorState((current) => ({ ...current, loading: true, error: null }));

    try {
      const weakTopics = Object.values(progress.weakTopicReviews)
        .sort((left, right) => left.averageScore - right.averageScore)
        .slice(0, 5)
        .map((item) => ({
          topic: weakTopicLabels[item.topic] ?? item.topic,
          averageScore: item.averageScore,
          recommendedModuleId: item.recommendedModuleId
        }));

      const payload = {
        contextType: 'freeform' as const,
        prompt: 'Create a practical 7-day learning plan for DCSPrep.',
        userAnswer: JSON.stringify(
          {
            overallProgress: Math.round(overallProgress),
            dueFlashcards,
            dueQuestions,
            completedScenarios,
            monthlyMinutes,
            weakestFocus,
            weakTopics,
            recommendation
          },
          null,
          2
        ),
        rubric: [
          'Prioritise weakest topics first',
          'Keep tasks small (10-20 min)',
          'Include mix of quiz/scenario/flashcards',
          'Keep privacy-safe and Level 1-boundary aware'
        ],
        extraContext:
          'Return coaching in actionable bullet style. No confidential details. Focus on evidence-based progress.'
      };

      console.log('Requesting AI feedback with payload:', payload);
      const result = await requestAiCoachFeedback(payload);
      console.log('AI feedback result:', result);

      if (!result.ok) {
        setMentorState({
          loading: false,
          error: result.error || 'The AI coach returned an error.',
          output: null
        });
        return;
      }

      setMentorState({
        loading: false,
        error: null,
        output: result.feedback
      });
    } catch (err) {
      console.error('Failed to generate AI plan:', err);
      setMentorState({
        loading: false,
        error: 'An unexpected error occurred while generating the plan.',
        output: null
      });
    }
  }

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

      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-amber-900">Operational Priority Reminder</h3>
            <p className="mt-1 text-sm text-amber-800">
              Tickets, walk-ups, calls, and Paul&apos;s instructions always come first. This app is for quiet windows
              only. Stop immediately if support demand arises.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-[2rem] border border-orange-200 bg-orange-50 p-5 shadow-sm">
          <div className="text-sm text-orange-600 font-medium">Learning streak</div>
          <div className="mt-3 flex items-baseline gap-2">
            <div className="text-3xl font-bold text-orange-900">{progress.streak?.current || 0}</div>
            <div className="text-sm text-orange-700 font-medium">days</div>
          </div>
          <p className="mt-2 text-xs text-orange-800">Best: {progress.streak?.best || 0} days</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Current weak focus area</div>
          <div className="mt-3 text-2xl font-semibold text-slate-900 line-clamp-1">{weakestFocus}</div>
          <p className="mt-2 text-sm text-slate-600">Next priority area.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Overall progress</div>
          <div className="mt-3 text-2xl font-semibold text-slate-900">{Math.round(overallProgress)}%</div>
          <p className="mt-2 text-sm text-slate-600">Across all areas.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Due today</div>
          <div className="mt-3 text-2xl font-semibold text-slate-900">{dueFlashcards + dueQuestions}</div>
          <p className="mt-2 text-sm text-slate-600">{dueFlashcards + dueQuestions} items waiting.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">This month logged PD</div>
          <div className="mt-3 text-2xl font-semibold text-slate-900">{monthlyMinutes} min</div>
          <p className="mt-2 text-sm text-slate-600">{completedScenarios} scenarios.</p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Daily Mastery</h2>
            <p className="mt-2 text-sm text-slate-600">
              One small question every day to keep your support skills sharp.
            </p>
          </div>
          {challengeDone && (
            <div className="rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
              Today&apos;s challenge complete!
            </div>
          )}
        </div>

        {!challengeDone && dailyQuestion && (
          <div className="mt-5 rounded-3xl border border-slate-100 bg-slate-50 p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Daily Challenge</div>
            <h3 className="mt-2 text-lg font-medium text-slate-900">{dailyQuestion.prompt}</h3>
            
            {dailyQuestion.type === 'mcq' && (
              <div className="mt-4 grid gap-3">
                {dailyQuestion.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      if (opt.id === dailyQuestion.correctOptionId) {
                        handleDailyChallengeComplete();
                      } else {
                        alert('Not quite! Try again.');
                      }
                    }}
                    className="flex w-full items-center rounded-2xl border border-slate-200 bg-white p-4 text-left text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {dailyQuestion.type !== 'mcq' && (
              <div className="mt-4">
                <p className="text-sm text-slate-600 italic">This is an open-ended question. Reflect on your answer and click complete.</p>
                <button
                  onClick={handleDailyChallengeComplete}
                  className="mt-4 rounded-full bg-slate-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Mark as complete
                </button>
              </div>
            )}
          </div>
        )}
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

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {(
              [
                ['Start tiny or focus block', '/focus'],
                ['Start 10-question assessment', '/strict-quiz'],
                ['Scenario Lab for situational practice', '/scenarios'],
                ['Review flashcards due today', '/due-today'],
                ['Add PD log entry', '/pd-log'],
                ['View readiness profiles', '/readiness'],
                ['Learning Paths', '/paths'],
                ['Feedback Log', '/feedback-log'],
                ['Global Search', '/search'],
                ['Technical Playground', '/playground'],
                ['Open evidence pack', '/evidence-pack']
              ] as [string, string][]
            ).map(([label, href]) => (
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

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4">
          <Link
            href="/feedback-log"
            className="flex flex-col rounded-3xl border border-slate-100 bg-slate-50 p-5 transition hover:border-slate-200 hover:bg-slate-100"
          >
            <div className="font-semibold text-slate-900">Feedback Log</div>
            <p className="mt-1 text-sm text-slate-600">Review all your AI coaching history.</p>
          </Link>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">AI mentor</div>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Generate my 7-day coaching plan</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Uses your real evidence (weak topics, due reviews, scenario history, and study time) to propose high-impact next steps.
            </p>
          </div>
          <button
            onClick={generateAiMentorPlan}
            disabled={mentorState.loading}
            className={`rounded-full px-4 py-2 text-sm text-white ${
              mentorState.loading ? 'bg-slate-400' : 'bg-slate-900'
            }`}
          >
            {mentorState.loading ? 'Planning...' : 'Generate plan'}
          </button>
        </div>

        {mentorState.error ? (
          <div className="mt-4 rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            {mentorState.error}
          </div>
        ) : null}

        {mentorState.output ? (
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-5">
              <div className="text-sm font-semibold text-slate-900">Mentor confidence</div>
              <div className="mt-2 text-3xl font-semibold text-slate-900">{Math.round(mentorState.output.score)}/100</div>
              <div className="mt-4 text-sm font-semibold text-slate-900">Strengths to keep</div>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {mentorState.output.strengths.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
              <div className="mt-4 text-sm font-semibold text-slate-900">Priority gaps</div>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {mentorState.output.missing.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl bg-slate-50 p-5">
                <div className="text-sm font-semibold text-slate-900">Suggested study path</div>
                <pre className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700">{mentorState.output.betterAnswer}</pre>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <div className="text-sm font-semibold text-slate-900">Next high-impact session</div>
                <p className="mt-2 text-sm text-slate-700">{mentorState.output.nextPractice}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
            No plan generated yet. Click <span className="font-semibold">Generate plan</span> when you want an AI mentor roadmap.
          </div>
        )}
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
