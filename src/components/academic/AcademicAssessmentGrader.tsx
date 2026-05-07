"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { requestAiCoachFeedback } from '../../lib/ai/coachClient';
import type { AiCoachFeedback, AiCoachInput } from '../../lib/ai/coachTypes';
import type { AcademicAssessmentItem, AcademicSubject, AcademicWeeklyModule } from '../../types/academic';

export type AcademicAssessmentLogPayload = {
  userAnswer: string;
  score: number;
  verdict: 'Correct' | 'Mostly correct' | 'Partly correct' | 'Needs revision';
  strengths: string[];
  missing: string[];
  riskNotes: string[];
  betterAnswer: string;
  nextPractice: string;
  redactionSummary: string;
};

type AcademicAssessmentGraderProps = {
  subject: AcademicSubject;
  module: AcademicWeeklyModule;
  assessment: AcademicAssessmentItem;
  onLog: (payload: AcademicAssessmentLogPayload) => void;
};

type GradeStatus = 'idle' | 'waiting' | 'loading' | 'ready' | 'error';

const minChars = 40;
const debounceMs = 900;

function getContextType(assessment: AcademicAssessmentItem): AiCoachInput['contextType'] {
  if (assessment.kind === 'coding-exercise' || assessment.kind === 'applied-task') {
    return 'practical-output';
  }

  return 'short-answer';
}

function getVerdict(score: number): {
  label: AcademicAssessmentLogPayload['verdict'];
  detail: string;
  className: string;
} {
  if (score >= 85) {
    return {
      label: 'Correct',
      detail: 'This meets the assessment standard.',
      className: 'border-emerald-200 bg-emerald-50 text-emerald-800'
    };
  }

  if (score >= 70) {
    return {
      label: 'Mostly correct',
      detail: 'This is close, but refine the missing criteria.',
      className: 'border-blue-200 bg-blue-50 text-blue-800'
    };
  }

  if (score >= 50) {
    return {
      label: 'Partly correct',
      detail: 'Some useful ideas are present, but the answer needs revision.',
      className: 'border-amber-200 bg-amber-50 text-amber-900'
    };
  }

  return {
    label: 'Needs revision',
    detail: 'This does not yet meet the assessment standard.',
    className: 'border-rose-200 bg-rose-50 text-rose-800'
  };
}

function stableKey(input: AiCoachInput) {
  return JSON.stringify({
    contextType: input.contextType,
    prompt: input.prompt,
    userAnswer: input.userAnswer,
    modelAnswer: input.modelAnswer,
    rubric: input.rubric,
    extraContext: input.extraContext
  });
}

export default function AcademicAssessmentGrader({
  subject,
  module,
  assessment,
  onLog
}: AcademicAssessmentGraderProps) {
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState<GradeStatus>('idle');
  const [feedback, setFeedback] = useState<AiCoachFeedback | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [redactionSummary, setRedactionSummary] = useState('No redactions applied.');
  const requestIdRef = useRef(0);
  const lastKeyRef = useRef('');

  const aiInput = useMemo<AiCoachInput>(
    () => ({
      contextType: getContextType(assessment),
      prompt: assessment.prompt,
      userAnswer: answer,
      modelAnswer: [
        `A strong answer for ${assessment.title} should directly answer the prompt.`,
        `It should satisfy these success criteria: ${assessment.successCriteria.join('; ')}.`,
        `It should connect to this DCS application: ${assessment.dcsApplication}.`,
        'It should avoid private DCS, student, staff, parent, credential, network, or incident details.'
      ].join(' '),
      rubric: [
        ...assessment.successCriteria,
        'Directly answers the assessment prompt',
        'Clearly states whether the work is based on fake, synthetic, or anonymised information',
        'Connects the answer to practical DCS IT support work',
        'Avoids private DCS operational details'
      ],
      extraContext: [
        'Grade this as an Academic PD assessment.',
        `Subject: ${subject.code} - ${subject.title}.`,
        `Weekly module: ${module.title}.`,
        `Assessment kind: ${assessment.kind}. Evidence type: ${assessment.evidenceType}.`,
        `Mapped SILOs: ${assessment.siloIds.join(', ')}.`,
        'Return clear feedback on whether the answer is correct, mostly correct, partly correct, or needs revision.'
      ].join('\n')
    }),
    [answer, assessment, module.title, subject.code, subject.title]
  );

  const key = useMemo(() => stableKey(aiInput), [aiInput]);
  const answerLength = answer.trim().length;

  useEffect(() => {
    if (!answer.trim()) {
      setStatus('idle');
      setFeedback(null);
      setError(null);
      return;
    }

    if (answerLength < minChars) {
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

      const result = await requestAiCoachFeedback(aiInput);
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

      setFeedback(result.feedback);
      setStatus('ready');
      setError(null);
    }, debounceMs);

    return () => window.clearTimeout(timer);
  }, [aiInput, answer, answerLength, key]);

  const verdict = feedback ? getVerdict(feedback.score) : null;

  return (
    <div className="mt-4 border-t border-slate-200 pt-4">
      <label className="block text-sm font-semibold text-slate-900" htmlFor={`${assessment.id}-answer`}>
        Your answer / evidence description
      </label>
      <p className="mt-1 text-xs leading-5 text-slate-500">
        Use fake, synthetic, or anonymised examples only. The answer is sanitised before AI grading.
      </p>
      <textarea
        id={`${assessment.id}-answer`}
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        className="mt-3 min-h-32 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6 text-slate-800"
        placeholder="Type your answer, flowchart description, script summary, test cases, or reflection here..."
      />

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
          {status === 'loading'
            ? 'Grading...'
            : status === 'ready'
              ? 'Feedback ready'
              : status === 'error'
                ? 'AI unavailable'
                : answerLength < minChars
                  ? `Type ${Math.max(0, minChars - answerLength)} more chars`
                  : 'Waiting to grade'}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
          {redactionSummary}
        </span>
      </div>

      {status === 'error' ? (
        <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          {error || 'AI grading is unavailable right now.'}
        </div>
      ) : null}

      {feedback && verdict ? (
        <div className="mt-4 space-y-3">
          <div className={`rounded-2xl border p-4 ${verdict.className}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">{verdict.label}</div>
                <p className="mt-1 text-sm leading-6">{verdict.detail}</p>
              </div>
              <div className="text-2xl font-semibold">{Math.round(feedback.score)}/100</div>
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-900">What is correct</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">
                {feedback.strengths.length ? feedback.strengths.map((item) => <li key={item}>{item}</li>) : <li>No strengths identified yet.</li>}
              </ul>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-900">What to fix</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">
                {feedback.missing.length ? feedback.missing.map((item) => <li key={item}>{item}</li>) : <li>No missing criteria noted.</li>}
              </ul>
            </div>
          </div>

          {feedback.riskNotes.length ? (
            <div className="rounded-2xl bg-amber-50 p-4">
              <div className="text-sm font-semibold text-amber-950">Risk notes</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-amber-900">
                {feedback.riskNotes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-sm font-semibold text-slate-900">Better answer guide</div>
            <pre className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">{feedback.betterAnswer}</pre>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            <span className="font-semibold text-slate-900">Next practice: </span>
            {feedback.nextPractice}
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => {
          if (!feedback || !verdict) {
            return;
          }

          onLog({
            userAnswer: answer,
            score: feedback.score,
            verdict: verdict.label,
            strengths: feedback.strengths,
            missing: feedback.missing,
            riskNotes: feedback.riskNotes,
            betterAnswer: feedback.betterAnswer,
            nextPractice: feedback.nextPractice,
            redactionSummary
          });
        }}
        className="mt-4 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:bg-slate-300"
        disabled={!feedback || !verdict}
      >
        Log this assessment
      </button>
      {!feedback ? (
        <p className="mt-2 text-xs leading-5 text-slate-500">
          The assessment can be logged after AI feedback is ready, so the score and feedback are stored together.
        </p>
      ) : null}
    </div>
  );
}
