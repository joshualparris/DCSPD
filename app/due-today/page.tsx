"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { weakTopicLabels } from '../../src/data/skillDomains';
import { modules } from '../../src/data/modules';
import {
  getInitialProgressSnapshot,
  getStoredProgressSnapshot,
  recordFlashcardReview,
  saveProgress,
  type UserProgress
} from '../../src/lib/progress';
import { isDue, type ReviewRating } from '../../src/lib/spacedRepetition';

const ratings: ReviewRating[] = ['again', 'hard', 'good', 'easy'];

export default function DueTodayPage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot(modules));
  const [hasHydratedProgress, setHasHydratedProgress] = useState(false);
  const [revealedCards, setRevealedCards] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setProgress(getStoredProgressSnapshot(modules));
    setHasHydratedProgress(true);
  }, []);

  useEffect(() => {
    if (!hasHydratedProgress) {
      return;
    }

    saveProgress(progress);
  }, [hasHydratedProgress, progress]);

  const dueFlashcards = modules.flatMap((module) =>
    module.flashcards
      .filter((card) => {
        const flashcardProgress = progress.modules[module.id]?.flashcards?.[card.id];
        return Boolean(flashcardProgress && flashcardProgress.reviewCount > 0 && isDue(flashcardProgress.dueDateIso));
      })
      .map((card) => ({
        moduleId: module.id,
        moduleTitle: module.title,
        card
      }))
  );

  const latestAttemptsByQuestion = new Map<string, (typeof progress.assessmentAttempts)[number]>();
  progress.assessmentAttempts.forEach((attempt) => {
    if (!latestAttemptsByQuestion.has(attempt.questionId)) {
      latestAttemptsByQuestion.set(attempt.questionId, attempt);
    }
  });

  const dueQuestions = [...latestAttemptsByQuestion.values()].filter((attempt) => isDue(attempt.nextReviewDateIso));
  const dueWeakTopics = Object.values(progress.weakTopicReviews).filter((review) => isDue(review.dueDateIso));

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Due today</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Complete scheduled review items
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Flashcards, missed questions, and weak topics all stay local in the browser. Use this page to clear
            one review queue at a time.
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Flashcards due today</h2>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">{dueFlashcards.length} due</div>
        </div>

        <div className="mt-5 space-y-4">
          {dueFlashcards.length ? (
            dueFlashcards.map(({ moduleId, moduleTitle, card }) => {
              const revealKey = `${moduleId}-${card.id}`;
              const revealed = Boolean(revealedCards[revealKey]);

              return (
                <div key={revealKey} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{moduleTitle}</div>
                  <div className="mt-3 text-xl font-semibold text-slate-900">{revealed ? card.back : card.front}</div>
                  <button
                    onClick={() =>
                      setRevealedCards((current) => ({
                        ...current,
                        [revealKey]: !current[revealKey]
                      }))
                    }
                    className="mt-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                  >
                    {revealed ? 'Show prompt' : 'Reveal answer'}
                  </button>
                  <div className="mt-4 grid gap-3 md:grid-cols-4">
                    {ratings.map((rating) => (
                      <button
                        key={rating}
                        onClick={() =>
                          setProgress((current) => recordFlashcardReview(current, moduleId, card.id, rating))
                        }
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium capitalize text-slate-800"
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">No flashcards are due right now.</div>
          )}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Missed questions due</h2>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">{dueQuestions.length} due</div>
        </div>

        <div className="mt-5 space-y-4">
          {dueQuestions.length ? (
            dueQuestions.map((attempt) => (
              <div key={attempt.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{attempt.domain}</div>
                <div className="mt-2 text-lg font-semibold text-slate-900">{attempt.prompt}</div>
                <div className="mt-3 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Your answer:</span> {attempt.answerSummary}
                </div>
                <div className="mt-2 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Corrected concept:</span>{' '}
                  {attempt.feedback.correctedConcept}
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={`/strict-quiz?topic=${attempt.weakTopic}`}
                    className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
                  >
                    Retake assessment
                  </Link>
                  <Link
                    href={`/modules/${attempt.recommendedModuleId}`}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                  >
                    Open module
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">No assessment reviews are due right now.</div>
          )}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Weak topics due</h2>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">{dueWeakTopics.length} due</div>
        </div>

        <div className="mt-5 space-y-4">
          {dueWeakTopics.length ? (
            dueWeakTopics.map((review) => (
              <div key={review.topic} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-lg font-semibold text-slate-900">{weakTopicLabels[review.topic]}</div>
                <div className="mt-2 text-sm text-slate-700">
                  Average recent score {Math.round(review.averageScore)}%. Next review {review.dueDateIso}.
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={`/strict-quiz?topic=${review.topic}`}
                    className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
                  >
                    Retake assessment
                  </Link>
                  <Link
                    href={`/modules/${review.recommendedModuleId}`}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                  >
                    Recommended module
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">No weak-topic reviews are due right now.</div>
          )}
        </div>
      </section>
    </div>
  );
}
