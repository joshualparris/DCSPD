"use client";

import { useEffect, useState } from 'react';
import { createAssessmentAttempt, getDefaultSelfRating } from '../../lib/scoring';
import { gradeRubric } from '../../lib/rubricGrader';
import type { RubricGrade } from '../../types/grading';
import type {
  AssessmentAttempt,
  AssessmentQuestion,
  AssessmentResponse,
  AssessmentSelfRating,
  ConfidenceLevel
} from '../../types/assessment';
import AiCoachPanel from '../ai/AiCoachPanel';
import AiOralExaminer from '../ai/AiOralExaminer';
import { Award, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

type AssessmentSessionProps = {
  questions: AssessmentQuestion[];
  source: 'strict-quiz' | 'module-quiz';
  title: string;
  description?: string;
  onRecordAttempt?: (attempt: AssessmentAttempt) => void;
  onSessionComplete?: (attempts: AssessmentAttempt[]) => void;
  initialIndex?: number;
  initialAttempts?: AssessmentAttempt[];
  onProgressUpdate?: (currentIndex: number, attempts: AssessmentAttempt[]) => void;
};

type DraftResponse = AssessmentResponse & {
  selfRating: AssessmentSelfRating;
};

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function buildInitialDraft(question: AssessmentQuestion): DraftResponse {
  return {
    questionId: question.id,
    confidence: 1,
    answerText: '',
    selectedOptionId: undefined,
    orderedStepIds: question.type === 'order-steps' ? shuffle(question.steps.map((step) => step.id)) : [],
    categorizedItems:
      question.type === 'categorization'
        ? Object.fromEntries(question.items.map((item) => [item.id, '']))
        : undefined,
    reasoning: '',
    judgement: '',
    selfRating: getDefaultSelfRating(question)
  };
}

function confidenceLabel(level: ConfidenceLevel) {
  if (level === 1) {
    return 'Low confidence';
  }

  if (level === 2) {
    return 'Some confidence';
  }

  return 'High confidence';
}

function selfRatingLabel(value: number) {
  if (value === 0) {
    return 'Not close';
  }

  if (value === 1) {
    return 'Partly there';
  }

  return 'Strong match';
}

function weakestTopicText(attempts: AssessmentAttempt[]) {
  const sorted = [...attempts].sort((left, right) => left.scoreBreakdown.total - right.scoreBreakdown.total);
  return sorted[0]?.domain || 'No data yet';
}

export default function AssessmentSession({
  questions,
  source,
  title,
  description,
  onRecordAttempt,
  onSessionComplete,
  initialIndex = 0,
  initialAttempts = [],
  onProgressUpdate
}: AssessmentSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [draft, setDraft] = useState<DraftResponse | null>(questions[initialIndex] ? buildInitialDraft(questions[initialIndex]) : null);
  const [reviewMode, setReviewMode] = useState(false);
  const [sessionAttempts, setSessionAttempts] = useState<AssessmentAttempt[]>(initialAttempts);
  const [isAiGrading, setIsAiGrading] = useState(false);

  const question = questions[currentIndex];
  const sessionComplete = currentIndex >= questions.length;

  useEffect(() => {
    if (!question) {
      return;
    }

    // Only reset draft if it's NOT the initial load OR if we're moving to a NEW question
    // that isn't the one we resumed to.
    setDraft((prevDraft) => {
      if (prevDraft && prevDraft.questionId === question.id) {
        return prevDraft;
      }
      return buildInitialDraft(question);
    });
    setReviewMode(false);
  }, [currentIndex, question]);

  if (!questions.length) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        No questions are available for this session yet.
      </div>
    );
  }

  if (sessionComplete) {
    const averageScore = sessionAttempts.length
      ? Math.round(
          (sessionAttempts.reduce((sum, attempt) => sum + attempt.scoreBreakdown.total, 0) / sessionAttempts.length) *
            100
        )
      : 0;
    const revisitCount = sessionAttempts.filter((attempt) => attempt.shouldRevisit).length;

    return (
      <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6">
        <div>
          <h3 className="text-2xl font-semibold text-slate-900">{title} complete</h3>
          <p className="mt-2 text-sm text-slate-600">
            Average score {averageScore}%. Weakest focus: {weakestTopicText(sessionAttempts)}.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-100 p-4">
            <div className="text-sm text-slate-500">Questions completed</div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">{sessionAttempts.length}</div>
          </div>
          <div className="rounded-2xl bg-slate-100 p-4">
            <div className="text-sm text-slate-500">Marked to revisit</div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">{revisitCount}</div>
          </div>
          <div className="rounded-2xl bg-slate-100 p-4">
            <div className="text-sm text-slate-500">Assessment posture</div>
            <div className="mt-2 text-sm text-slate-700">
              Structured and constructive. Keep weak areas visible and revisit them on schedule.
            </div>
          </div>
        </div>

        <AiCoachPanel
          input={{
            contextType: 'freeform',
            prompt: `${title} debrief and coaching plan`,
            userAnswer: JSON.stringify(
              {
                questionsCompleted: sessionAttempts.length,
                averageScore,
                revisitCount,
                weakestDomain: weakestTopicText(sessionAttempts),
                attempts: sessionAttempts.map((attempt) => ({
                  questionId: attempt.questionId,
                  domain: attempt.domain,
                  weakTopic: attempt.weakTopic,
                  totalScore: Math.round(attempt.scoreBreakdown.total * 100),
                  correctness: Math.round(attempt.scoreBreakdown.correctness * 100),
                  reasoning: Math.round(attempt.scoreBreakdown.reasoning * 100),
                  judgement: Math.round(attempt.scoreBreakdown.judgement * 100),
                  shouldRevisit: attempt.shouldRevisit
                }))
              },
              null,
              2
            ),
            rubric: [
              'Summarise strengths accurately',
              'Identify top weak area',
              'Provide concrete 20-minute next practice',
              'Keep recommendations Level 1-safe'
            ],
            extraContext: 'Return concise coaching suitable for next immediate study block.'
          }}
          debounceMs={400}
          minChars={40}
        />

        <AiOralExaminer
          title={title}
          weakestDomain={weakestTopicText(sessionAttempts)}
          attempts={sessionAttempts.map((attempt) => ({
            domain: attempt.domain,
            weakTopic: attempt.weakTopic,
            totalScore: Math.round(attempt.scoreBreakdown.total * 100)
          }))}
        />

        <button
          onClick={() => {
            setCurrentIndex(0);
            setSessionAttempts([]);
            setDraft(buildInitialDraft(questions[0]));
            setReviewMode(false);
          }}
          className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
        >
          Run this session again
        </button>
      </div>
    );
  }

  if (!question || !draft) {
    return null;
  }

  const attemptPreview = createAssessmentAttempt({
    question,
    response: draft,
    selfRating: draft.selfRating,
    source
  });

  const isAnswerReady =
    Boolean(draft.confidence) &&
    (question.type === 'mcq'
      ? Boolean(draft.selectedOptionId)
      : question.type === 'categorization'
      ? question.items.every((item) => Boolean(draft.categorizedItems?.[item.id]))
      : question.type === 'order-steps'
      ? Boolean(draft.orderedStepIds?.length)
      : Boolean(draft.answerText?.trim())) &&
    Boolean(draft.reasoning.trim()) &&
    Boolean(draft.judgement.trim());

  function moveStep(stepId: string, direction: -1 | 1) {
    if (question.type !== 'order-steps' || !draft) {
      return;
    }

    const currentOrder = draft.orderedStepIds || [];
    const currentPosition = currentOrder.findIndex((value) => value === stepId);
    const nextPosition = currentPosition + direction;

    if (currentPosition < 0 || nextPosition < 0 || nextPosition >= currentOrder.length) {
      return;
    }

    const nextOrder = [...currentOrder];
    const [item] = nextOrder.splice(currentPosition, 1);
    nextOrder.splice(nextPosition, 0, item);

    setDraft({
      ...draft,
      orderedStepIds: nextOrder
    });
  }

  async function advanceWithAttempt() {
    if (!draft) {
      return;
    }

    setIsAiGrading(true);
    let finalRubricGrade: RubricGrade | undefined = undefined;

    if (question.type === 'short-answer' && question.rubric) {
      try {
        // Try AI grading first
        const aiResult = await requestAiCoachFeedback({
          contextType: 'short-answer',
          moduleId: question.recommendedModuleId,
          prompt: question.prompt,
          userAnswer: [
            draft.answerText?.trim() ? `Answer:\n${draft.answerText.trim()}\n` : '',
            draft.reasoning.trim() ? `Reasoning:\n${draft.reasoning.trim()}\n` : '',
            draft.judgement.trim() ? `Judgement:\n${draft.judgement.trim()}\n` : ''
          ].filter(Boolean).join('\n').trim(),
          modelAnswer: question.modelAnswer,
          rubric: question.rubric,
          extraContext: `DCS context: ${question.dcsContext}`
        });

        if (aiResult.ok && aiResult.feedback.rubricGrade) {
          finalRubricGrade = aiResult.feedback.rubricGrade;
        } else {
          // Fallback to deterministic
          finalRubricGrade = gradeRubric({
            text: draft.answerText || '',
            rubric: question.rubric,
            keywordHints: question.keywordHints,
            context: question.prompt
          });
        }
      } catch (error) {
        console.error('AI Grading failed in session, falling back:', error);
        finalRubricGrade = gradeRubric({
          text: draft.answerText || '',
          rubric: question.rubric,
          keywordHints: question.keywordHints,
          context: question.prompt
        });
      }
    }

    const finalAttempt = createAssessmentAttempt({
      question,
      response: draft,
      selfRating: draft.selfRating,
      source
    });

    // Inject rubric grade if calculated
    if (finalRubricGrade) {
      finalAttempt.rubricGrade = finalRubricGrade;
    }

    const nextAttempts = [...sessionAttempts, finalAttempt];

    onRecordAttempt?.(finalAttempt);
    setSessionAttempts(nextAttempts);
    setIsAiGrading(false);

    if (currentIndex === questions.length - 1) {
      onSessionComplete?.(nextAttempts);
      setCurrentIndex(questions.length);
      return;
    }

    const nextIndex = currentIndex + 1;
    onProgressUpdate?.(nextIndex, nextAttempts);
    setCurrentIndex(nextIndex);
  }

  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{title}</div>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">{question.prompt}</h3>
          {description ? <p className="mt-2 text-sm text-slate-600">{description}</p> : null}
        </div>
        <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
          Question {currentIndex + 1} of {questions.length}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Confidence first</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {[1, 2, 3].map((value) => {
            const level = value as ConfidenceLevel;
            const active = draft.confidence === level;
            return (
              <button
                key={value}
                onClick={() => setDraft({ ...draft, confidence: level })}
                className={`rounded-full px-4 py-2 text-sm ${
                  active ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-700'
                }`}
              >
                {value} - {confidenceLabel(level)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4">
        {question.type === 'mcq' ? (
          <div className="grid gap-3">
            {question.options.map((option) => (
              <label
                key={option.id}
                className={`rounded-2xl border p-4 text-sm ${
                  draft.selectedOptionId === option.id
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  className="sr-only"
                  checked={draft.selectedOptionId === option.id}
                  onChange={() => setDraft({ ...draft, selectedOptionId: option.id })}
                />
                {option.label}
              </label>
            ))}
          </div>
        ) : null}

        {question.type === 'categorization' ? (
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm text-slate-700">
              Sort each item into the best category. This is auto-marked, then you still self-rate the reasoning and
              judgement behind your choices.
            </div>
            {question.items.map((item) => (
              <label key={item.id} className="grid gap-2 rounded-2xl bg-white p-4 text-sm text-slate-800 md:grid-cols-[1fr_220px]">
                <span>{item.label}</span>
                <select
                  value={draft.categorizedItems?.[item.id] || ''}
                  onChange={(event) =>
                    setDraft({
                      ...draft,
                      categorizedItems: {
                        ...draft.categorizedItems,
                        [item.id]: event.target.value
                      }
                    })
                  }
                  className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800"
                >
                  <option value="">Select a category</option>
                  {question.categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        ) : null}

        {question.type === 'short-answer' || question.type === 'scenario-response' ? (
          <textarea
            value={draft.answerText}
            onChange={(event) => setDraft({ ...draft, answerText: event.target.value })}
            className="min-h-32 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-slate-900"
            placeholder="Write your answer in plain English."
          />
        ) : null}

        {question.type === 'order-steps' ? (
          <div className="space-y-3">
            {(draft.orderedStepIds || []).map((stepId, index) => {
              const step = question.steps.find((item) => item.id === stepId);
              if (!step) {
                return null;
              }

              return (
                <div
                  key={stepId}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800"
                >
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Step {index + 1}</div>
                    <div className="mt-1">{step.label}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => moveStep(stepId, -1)}
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700"
                    >
                      Up
                    </button>
                    <button
                      onClick={() => moveStep(stepId, 1)}
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700"
                    >
                      Down
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        <textarea
          value={draft.reasoning}
          onChange={(event) => setDraft({ ...draft, reasoning: event.target.value })}
          className="min-h-24 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-slate-900"
          placeholder="Why this answer? Name the mechanism, not just the symptom."
        />

        <textarea
          value={draft.judgement}
          onChange={(event) => setDraft({ ...draft, judgement: event.target.value })}
          className="min-h-24 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-slate-900"
          placeholder="What risk, sequencing point, privacy concern, or escalation judgement matters here?"
        />
      </div>

      <AiCoachPanel
        input={{
          contextType: question.type === 'scenario-response' ? 'scenario' : 'short-answer',
          moduleId: question.recommendedModuleId,
          prompt: question.prompt,
          userAnswer: [
            draft.answerText?.trim() ? `Answer:\n${draft.answerText.trim()}\n` : '',
            draft.reasoning.trim() ? `Reasoning:\n${draft.reasoning.trim()}\n` : '',
            draft.judgement.trim() ? `Judgement:\n${draft.judgement.trim()}\n` : ''
          ]
            .filter(Boolean)
            .join('\n')
            .trim(),
          modelAnswer: question.modelAnswer,
          rubric: 'rubric' in question ? question.rubric : undefined,
          weakTopic: question.weakTopic,
          extraContext: `DCS context: ${question.dcsContext}`
        }}
        debounceMs={1000}
        minChars={80}
      />

      {!reviewMode ? (
        <div className="flex justify-end">
          <button
            onClick={() => setReviewMode(true)}
            disabled={!isAnswerReady}
            className={`rounded-full px-4 py-2 text-sm ${
              isAnswerReady ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-500'
            }`}
          >
            Check answer
          </button>
        </div>
      ) : (
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Model answer</div>
            <p className="mt-2 text-sm text-slate-700">{question.modelAnswer}</p>
            <p className="mt-3 text-sm text-slate-600">{question.explanation}</p>
            <p className="mt-3 text-sm text-slate-600">
              <span className="font-semibold text-slate-900">DCS context:</span> {question.dcsContext}
            </p>
            <div className="mt-3 rounded-2xl bg-white p-4 text-sm text-slate-700">
              <div className="font-semibold text-slate-900">Common misses</div>
              <ul className="mt-2 space-y-1">
                {question.commonMistakes.map((mistake) => (
                  <li key={mistake}>- {mistake}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* New Rubric Analysis for short-answer */}
          {question.type === 'short-answer' && draft.answerText && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              {(() => {
                const grade = gradeRubric({
                  text: draft.answerText,
                  rubric: question.rubric || [],
                  keywordHints: question.keywordHints,
                  context: question.prompt
                });
                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-rose-600">
                        <Award size={20} />
                        <span className="text-sm font-bold uppercase tracking-widest">Coaching Analysis</span>
                      </div>
                      <div className={`rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                        grade.level === 'excellent' ? 'bg-emerald-100 text-emerald-700' :
                        grade.level === 'strong' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {grade.level}
                      </div>
                    </div>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Strengths</div>
                        <ul className="mt-2 space-y-1">
                          {grade.strengths.map((s, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                              <CheckCircle2 size={12} className="text-emerald-500" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Missing</div>
                        <ul className="mt-2 space-y-1">
                          {grade.missing.map((m, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-slate-500">
                              <AlertCircle size={12} className="text-amber-500" />
                              {m}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {grade.privacyFlags.length > 0 && (
                      <div className="rounded-xl bg-rose-50 p-3 flex gap-2 border border-rose-100">
                        <ShieldCheck size={16} className="text-rose-600 shrink-0" />
                        <div className="text-[10px] leading-relaxed text-rose-900">
                          <span className="font-bold">Privacy Check:</span> Avoid including <span className="font-bold">{grade.privacyFlags.join(', ')}</span> in your answers.
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-3">
            {(
              [
                [
                  'correctness',
                  'Correctness',
                  question.type === 'mcq' || question.type === 'order-steps' || question.type === 'categorization'
                ],
                ['reasoning', 'Reasoning', false],
                ['judgement', 'Judgement', false]
              ] as const
            ).map(([key, label, autoMarked]) => (
              <div key={key} className="rounded-2xl bg-white p-4">
                <div className="text-sm font-semibold text-slate-900">{label}</div>
                <div className="mt-2 text-xs text-slate-500">
                  {autoMarked ? 'Auto-marked from the answer or sequence.' : 'Self-rate against the model answer.'}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[0, 1, 2].map((value) => (
                    <button
                      key={value}
                      onClick={() =>
                        setDraft({
                          ...draft,
                          selfRating: {
                            ...draft.selfRating,
                            [key]: value
                          }
                        })
                      }
                      disabled={autoMarked}
                      className={`rounded-full px-3 py-1 text-xs ${
                        draft.selfRating[key] === value
                          ? 'bg-slate-900 text-white'
                          : 'border border-slate-200 bg-slate-50 text-slate-700'
                      } ${autoMarked ? 'cursor-not-allowed opacity-60' : ''}`}
                    >
                      {selfRatingLabel(value)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-white p-4">
              <div className="text-sm text-slate-500">Correctness</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">
                {Math.round(attemptPreview.scoreBreakdown.correctness * 100)}%
              </div>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <div className="text-sm text-slate-500">Reasoning</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">
                {Math.round(attemptPreview.scoreBreakdown.reasoning * 100)}%
              </div>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <div className="text-sm text-slate-500">Judgement</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">
                {Math.round(attemptPreview.scoreBreakdown.judgement * 100)}%
              </div>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <div className="text-sm text-slate-500">Next review</div>
              <div className="mt-2 text-lg font-semibold text-slate-900">{attemptPreview.nextReviewDateIso}</div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 text-sm text-slate-700">
            <div className="font-semibold text-slate-900">Feedback</div>
            <p className="mt-2">{attemptPreview.feedback.correctness}</p>
            <p className="mt-2">{attemptPreview.feedback.reasoning}</p>
            <p className="mt-2">{attemptPreview.feedback.judgement}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setReviewMode(false)}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700"
            >
              Edit answer
            </button>
            <button
              onClick={advanceWithAttempt}
              disabled={isAiGrading}
              className={`flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all ${
                isAiGrading ? 'bg-slate-200 text-slate-500 cursor-not-allowed' : 'bg-slate-900 text-white hover:scale-105 active:scale-95'
              }`}
            >
              {isAiGrading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-500 border-t-transparent" />
                  Analyzing and saving...
                </>
              ) : (
                'Save and continue'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
