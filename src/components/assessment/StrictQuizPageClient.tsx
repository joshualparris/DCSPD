"use client";

import { useEffect, useState } from 'react';
import { weakTopicLabels } from '../../data/skillDomains';
import { strictQuestionBank, getQuestionsByWeakTopic } from '../../data/questions';
import {
  getInitialProgressSnapshot,
  getStoredProgressSnapshot,
  recordAssessmentAttempt,
  saveProgress,
  type UserProgress
} from '../../lib/progress';
import AssessmentSession from './AssessmentSession';

type StrictQuizPageClientProps = {
  weakTopic: string | null;
};

function pickQuestions(weakTopic: string | null) {
  const topicQuestions = weakTopic ? getQuestionsByWeakTopic(weakTopic) : [];
  const pool = topicQuestions.length ? topicQuestions : strictQuestionBank;
  return pool.slice(0, 10);
}

export default function StrictQuizPageClient({ weakTopic }: StrictQuizPageClientProps) {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot());
  const [hasHydratedProgress, setHasHydratedProgress] = useState(false);

  useEffect(() => {
    setProgress(getStoredProgressSnapshot());
    setHasHydratedProgress(true);
  }, []);

  useEffect(() => {
    if (!hasHydratedProgress) {
      return;
    }

    saveProgress(progress);
  }, [hasHydratedProgress, progress]);

  const questions = pickQuestions(weakTopic);
  const weakTopicLabel =
    weakTopic && weakTopic in weakTopicLabels
      ? weakTopicLabels[weakTopic as keyof typeof weakTopicLabels]
      : weakTopic;

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Structured assessment</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Assessment with confidence, explanation, and risk judgement
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            This assessment separates correctness, reasoning, and judgement. Multiple-choice items are marked
            automatically, while open responses use a local self-rating step against the model answer and rubric.
          </p>
        </div>
      </section>

      <AssessmentSession
        questions={questions}
        source="strict-quiz"
        title={weakTopicLabel ? `Structured assessment: ${weakTopicLabel}` : 'Structured 10-question assessment'}
        description="Record a clear explanation. A difference between confidence and outcome should be treated as useful assessment data."
        onRecordAttempt={(attempt) => setProgress((current) => recordAssessmentAttempt(current, attempt))}
      />
    </div>
  );
}
