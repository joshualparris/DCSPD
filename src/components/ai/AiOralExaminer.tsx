"use client";

import { useState } from 'react';

type AttemptSummary = {
  domain: string;
  weakTopic: string;
  totalScore: number;
};

type AiOralExaminerProps = {
  title: string;
  weakestDomain: string;
  attempts: AttemptSummary[];
};

export default function AiOralExaminer({ title, weakestDomain, attempts }: AiOralExaminerProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<null | {
    score: number;
    feedback: string;
    idealAnswer: string;
    nextQuestionPrompt: string;
  }>(null);

  async function generateQuestions() {
    setLoading(true);
    setError(null);
    setFeedback(null);
    setAnswer('');
    setIndex(0);
    try {
      const response = await fetch('/api/ai/oral-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'generate',
          title,
          weakestDomain,
          attempts
        })
      });
      const payload = await response.json();
      if (!response.ok) {
        setError(payload?.error || 'Could not generate oral exam questions.');
        setQuestions([]);
        return;
      }
      const nextQuestions = Array.isArray(payload?.questions) ? payload.questions.slice(0, 3) : [];
      if (!nextQuestions.length) {
        setError('AI did not return valid questions.');
        setQuestions([]);
        return;
      }
      setQuestions(nextQuestions);
    } catch {
      setError('Could not generate oral exam questions.');
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }

  async function evaluateCurrent() {
    if (!questions[index] || !answer.trim()) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/ai/oral-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'evaluate',
          contextTitle: title,
          question: questions[index],
          answer: answer.trim()
        })
      });
      const payload = await response.json();
      if (!response.ok) {
        setError(payload?.error || 'Could not evaluate answer.');
        return;
      }
      setFeedback({
        score: Number(payload?.score ?? 0),
        feedback: String(payload?.feedback ?? ''),
        idealAnswer: String(payload?.idealAnswer ?? ''),
        nextQuestionPrompt: String(payload?.nextQuestionPrompt ?? '')
      });
    } catch {
      setError('Could not evaluate answer.');
    } finally {
      setLoading(false);
    }
  }

  function nextQuestion() {
    setFeedback(null);
    setAnswer('');
    setIndex((current) => Math.min(current + 1, questions.length - 1));
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">AI oral examiner</div>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">Rapid viva mode</h3>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Simulates short oral exam follow-ups from your weakest area and gives immediate examiner feedback.
          </p>
        </div>
        <button
          onClick={generateQuestions}
          disabled={loading}
          className={`rounded-full px-4 py-2 text-sm text-white ${loading ? 'bg-slate-400' : 'bg-slate-900'}`}
        >
          {loading ? 'Preparing...' : 'Start oral examiner'}
        </button>
      </div>

      {error ? (
        <div className="mt-4 rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{error}</div>
      ) : null}

      {questions.length ? (
        <div className="mt-5 space-y-4">
          <div className="rounded-3xl bg-slate-50 p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Question {index + 1} of {questions.length}
            </div>
            <p className="mt-2 text-sm text-slate-900">{questions[index]}</p>
          </div>

          <textarea
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            className="min-h-28 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800"
            placeholder="Answer as if speaking in an oral exam."
          />

          <div className="flex flex-wrap gap-2">
            <button
              onClick={evaluateCurrent}
              disabled={loading || !answer.trim()}
              className={`rounded-full px-4 py-2 text-sm text-white ${
                loading || !answer.trim() ? 'bg-slate-400' : 'bg-slate-900'
              }`}
            >
              Assess answer
            </button>
            {feedback && index < questions.length - 1 ? (
              <button onClick={nextQuestion} className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700">
                Next viva question
              </button>
            ) : null}
          </div>

          {feedback ? (
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Examiner score</div>
                <div className="mt-2 text-2xl font-semibold text-slate-900">{Math.round(feedback.score)}/100</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 md:col-span-2">
                <div className="text-sm font-semibold text-slate-900">Feedback</div>
                <p className="mt-2 text-sm text-slate-700">{feedback.feedback}</p>
                <div className="mt-3 text-sm font-semibold text-slate-900">Ideal answer</div>
                <p className="mt-2 text-sm text-slate-700">{feedback.idealAnswer}</p>
                <div className="mt-3 text-sm font-semibold text-slate-900">Next prompt</div>
                <p className="mt-2 text-sm text-slate-700">{feedback.nextQuestionPrompt}</p>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-5 rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
          Start oral examiner to get 3 targeted viva questions from your weak areas.
        </div>
      )}
    </section>
  );
}

