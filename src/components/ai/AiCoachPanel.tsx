"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import type { AiCoachInput, AiCoachFeedback } from '../../lib/ai/coachTypes';
import { requestAiCoachFeedback } from '../../lib/ai/coachClient';

type AiCoachPanelProps = {
  input: AiCoachInput;
  enabled?: boolean;
  debounceMs?: number;
  minChars?: number;
};

function stableKey(input: AiCoachInput) {
  return JSON.stringify({
    contextType: input.contextType,
    moduleId: input.moduleId,
    scenarioId: input.scenarioId,
    prompt: input.prompt,
    userAnswer: input.userAnswer,
    modelAnswer: input.modelAnswer,
    rubric: input.rubric,
    weakTopic: input.weakTopic,
    extraContext: input.extraContext
  });
}

export default function AiCoachPanel({ input, enabled = true, debounceMs = 900, minChars = 60 }: AiCoachPanelProps) {
  const [status, setStatus] = useState<'idle' | 'waiting' | 'loading' | 'ready' | 'error'>('idle');
  const [feedback, setFeedback] = useState<AiCoachFeedback | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [redactionSummary, setRedactionSummary] = useState<string>('No redactions applied.');
  const lastKeyRef = useRef<string>('');
  const requestIdRef = useRef(0);

  const key = useMemo(() => stableKey(input), [input]);
  const answerLength = input.userAnswer?.trim().length ?? 0;

  useEffect(() => {
    if (!enabled) {
      setStatus('idle');
      setFeedback(null);
      setError(null);
      return;
    }

    if (!input.userAnswer?.trim() || answerLength < minChars) {
      setStatus('waiting');
      setFeedback(null);
      setError(null);
      return;
    }

    if (key === lastKeyRef.current) {
      return;
    }

    setStatus('waiting');
    setError(null);

    const timer = window.setTimeout(async () => {
      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;
      setStatus('loading');

      const result = await requestAiCoachFeedback(input);
      if (requestId !== requestIdRef.current) {
        return;
      }

      lastKeyRef.current = key;
      setRedactionSummary(result.redactionSummary);

      if (!result.ok) {
        setStatus('error');
        setFeedback(null);
        setError(result.error);
        return;
      }

      setStatus('ready');
      setFeedback(result.feedback);
      setError(null);
    }, debounceMs);

    return () => window.clearTimeout(timer);
  }, [enabled, input, key, debounceMs, minChars, answerLength]);

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">AI coach</div>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">Realtime feedback (privacy-safe)</h3>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Don&apos;t paste real student/staff names, tickets, internal URLs, passwords, IPs, or confidential procedures. Your text is
            sanitised before sending.
          </p>
        </div>
        <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
          {status === 'loading'
            ? 'Coaching…'
            : status === 'ready'
            ? 'Updated'
            : status === 'error'
            ? 'Unavailable'
            : answerLength < minChars
            ? `Type ${minChars - answerLength} more char(s)…`
            : 'Waiting'}
        </div>
      </div>

      <div className="mt-4 rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
        <div className="font-semibold text-slate-900">Sanitisation</div>
        <div className="mt-2">{redactionSummary}</div>
      </div>

      {status === 'error' ? (
        <div className="mt-4 rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          {error || 'AI coaching is unavailable right now.'}
          <div className="mt-2 text-amber-800">
            If this is your first time enabling it, add <code className="rounded bg-amber-100 px-1">GROQ_API_KEY</code> to{' '}
            <code className="rounded bg-amber-100 px-1">.env.local</code> and restart dev server.
          </div>
        </div>
      ) : null}

      {feedback ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Score</div>
            <div className="mt-2 text-3xl font-semibold text-slate-900">{Math.round(feedback.score)}/100</div>
            <div className="mt-4">
              <div className="font-semibold text-slate-900">Strengths</div>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {feedback.strengths.length ? feedback.strengths.map((item) => <li key={item}>- {item}</li>) : <li>- None yet</li>}
              </ul>
            </div>
            <div className="mt-4">
              <div className="font-semibold text-slate-900">Missing</div>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {feedback.missing.length ? feedback.missing.map((item) => <li key={item}>- {item}</li>) : <li>- None noted</li>}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-50 p-5">
              <div className="font-semibold text-slate-900">Risk notes</div>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {feedback.riskNotes.length ? feedback.riskNotes.map((item) => <li key={item}>- {item}</li>) : <li>- None noted</li>}
              </ul>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <div className="font-semibold text-slate-900">Better answer</div>
              <pre className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-800">{feedback.betterAnswer}</pre>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <div className="font-semibold text-slate-900">Next practice</div>
              <div className="mt-2 text-sm text-slate-800">{feedback.nextPractice}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-3xl bg-slate-50 p-5 text-sm text-slate-700">
          Type a bit more and the coach will respond automatically.
        </div>
      )}
    </section>
  );
}

