"use client";

import { useEffect, useMemo, useState } from 'react';
import {
  aplusCore2CoreResources,
  aplusCore2Lessons,
  aplusCore2Sections,
  aplusCore2Stats,
  type AplusCore2Lesson,
  type AplusMultipleChoiceQuestion
} from '../../../src/data/aplusCore2';
import { modules } from '../../../src/data/modules';
import { requestAiCoachFeedback } from '../../../src/lib/ai/coachClient';
import type { AiCoachFeedback } from '../../../src/lib/ai/coachTypes';
import {
  addPdEntry,
  getInitialProgressSnapshot,
  getStoredProgressSnapshot,
  saveCertificationAssessmentAttempt,
  saveProgress,
  type CertificationAssessmentAttempt,
  type PdEntry,
  type UserProgress
} from '../../../src/lib/progress';

type GradeState =
  | { status: 'idle'; message: string; feedback?: undefined; redactionSummary?: undefined; finalScore?: undefined; multipleChoiceScore?: undefined }
  | { status: 'loading'; message: string; feedback?: undefined; redactionSummary?: undefined; finalScore?: undefined; multipleChoiceScore?: undefined }
  | { status: 'error'; message: string; feedback?: undefined; redactionSummary?: string; finalScore?: undefined; multipleChoiceScore?: undefined }
  | { status: 'ready'; message: string; feedback: AiCoachFeedback; redactionSummary: string; finalScore: number; multipleChoiceScore: number };

const CERTIFICATION_ID = 'comptia-aplus-220-1202-core-2';
const CERTIFICATION_TITLE = 'CompTIA A+ 220-1202 Core 2';

function average(values: number[]) {
  if (!values.length) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function getSelectedOption(question: AplusMultipleChoiceQuestion, selectedOptionId?: string) {
  return question.options.find((option) => option.id === selectedOptionId);
}

export default function AplusCore2Page() {
  const [selectedSectionId, setSelectedSectionId] = useState('all');
  const [selectedLessonId, setSelectedLessonId] = useState(aplusCore2Lessons[0].id);
  const [answer, setAnswer] = useState('');
  const [multipleChoiceAnswers, setMultipleChoiceAnswers] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot(modules));
  const [gradeState, setGradeState] = useState<GradeState>({
    status: 'idle',
    message: 'Choose a lesson, read/watch the resources, then submit a privacy-safe answer.'
  });

  useEffect(() => {
    setProgress(getStoredProgressSnapshot(modules));
  }, []);

  const latestAttemptByLesson = useMemo(() => {
    const latest = new Map<string, CertificationAssessmentAttempt>();
    progress.certificationAssessmentAttempts
      .filter((attempt) => attempt.certificationId === CERTIFICATION_ID)
      .forEach((attempt) => {
        const existing = latest.get(attempt.lessonId);
        if (!existing || existing.createdAtIso < attempt.createdAtIso) {
          latest.set(attempt.lessonId, attempt);
        }
      });
    return latest;
  }, [progress.certificationAssessmentAttempts]);

  const selectedLesson = aplusCore2Lessons.find((lesson) => lesson.id === selectedLessonId) || aplusCore2Lessons[0];
  const filteredLessons =
    selectedSectionId === 'all'
      ? aplusCore2Lessons
      : aplusCore2Lessons.filter((lesson) => lesson.sectionId === selectedSectionId);
  const completedLessons = latestAttemptByLesson.size;
  const averageScore = average(Array.from(latestAttemptByLesson.values()).map((attempt) => attempt.score));
  const completionPercent = Math.round((completedLessons / aplusCore2Lessons.length) * 100);
  const answeredMultipleChoiceCount = selectedLesson.assessment.multipleChoice.filter(
    (question) => multipleChoiceAnswers[question.id]
  ).length;
  const multipleChoiceCorrectCount = selectedLesson.assessment.multipleChoice.filter(
    (question) => multipleChoiceAnswers[question.id] === question.correctOptionId
  ).length;
  const multipleChoiceQuestionCount = selectedLesson.assessment.multipleChoice.length;
  const multipleChoiceScore = Math.round(
    (multipleChoiceCorrectCount / Math.max(1, multipleChoiceQuestionCount)) * 100
  );
  const allMultipleChoiceAnswered = answeredMultipleChoiceCount === multipleChoiceQuestionCount;

  function selectLesson(lesson: AplusCore2Lesson) {
    setSelectedLessonId(lesson.id);
    setAnswer('');
    setMultipleChoiceAnswers({});
    const previous = latestAttemptByLesson.get(lesson.id);
    setGradeState(
      previous
        ? {
            status: 'idle',
            message: `Previous logged score: ${Math.round(previous.score)}/100. You can retry with a stronger answer.`
          }
        : {
            status: 'idle',
            message: 'Read/watch the resources, then write a privacy-safe answer.'
          }
    );
  }

  async function gradeAnswer() {
    if (!allMultipleChoiceAnswered) {
      setGradeState({
        status: 'error',
        message: 'Answer all multiple-choice questions before logging the assessment.'
      });
      return;
    }

    if (answer.trim().length < 120) {
      setGradeState({
        status: 'error',
        message: 'Write at least 120 characters so the assessment can judge your reasoning.'
      });
      return;
    }

    setGradeState({
      status: 'loading',
      message: 'Grading your answer with the privacy-safe AI coach...'
    });

    const result = await requestAiCoachFeedback({
      contextType: 'short-answer',
      moduleId: CERTIFICATION_ID,
      prompt: selectedLesson.assessment.prompt,
      userAnswer: answer,
      modelAnswer: selectedLesson.assessment.modelAnswerGuide,
      rubric: selectedLesson.assessment.successCriteria,
      extraContext: `${CERTIFICATION_TITLE}. Objective ${selectedLesson.objectiveId}: ${selectedLesson.objectiveTitle}. Lesson: ${selectedLesson.title}. DCS application: ${selectedLesson.dcsApplication}. Multiple-choice score: ${multipleChoiceScore}/100 (${multipleChoiceCorrectCount}/${selectedLesson.assessment.multipleChoice.length}).`
    });

    if (!result.ok) {
      setGradeState({
        status: 'error',
        message: result.error,
        redactionSummary: result.redactionSummary
      });
      return;
    }

    const nowIso = new Date().toISOString();
    const pdEntryId = `aplus-core-2-${selectedLesson.id}-pd-${Date.now()}`;
    const attemptId = `aplus-core-2-${selectedLesson.id}-attempt-${Date.now()}`;
    const storedProgress = getStoredProgressSnapshot(modules);
    const finalScore = Math.round((multipleChoiceScore + result.feedback.score) / 2);
    const multipleChoiceResponses = selectedLesson.assessment.multipleChoice.map((question) => {
      const selectedOptionId = multipleChoiceAnswers[question.id] || '';

      return {
        questionId: question.id,
        selectedOptionId,
        correctOptionId: question.correctOptionId,
        correct: selectedOptionId === question.correctOptionId,
        explanation: question.explanation
      };
    });

    const pdEntry: PdEntry = {
      id: pdEntryId,
      createdAtIso: nowIso,
      type: 'ai-coaching',
      title: `A+ Core 2 assessment: ${selectedLesson.title}`,
      minutes: 15,
      evidenceSummary: `Combined score ${finalScore}/100 for ${selectedLesson.objectiveId} ${selectedLesson.objectiveTitle}. MCQ ${multipleChoiceCorrectCount}/${selectedLesson.assessment.multipleChoice.length}; AI long-form ${Math.round(result.feedback.score)}/100.`,
      reflection: result.feedback.nextPractice,
      privacyChecked: true
    };

    const attempt: CertificationAssessmentAttempt = {
      id: attemptId,
      createdAtIso: nowIso,
      certificationId: CERTIFICATION_ID,
      certificationTitle: CERTIFICATION_TITLE,
      lessonId: selectedLesson.id,
      lessonTitle: selectedLesson.title,
      objectiveId: selectedLesson.objectiveId,
      objectiveTitle: selectedLesson.objectiveTitle,
      prompt: selectedLesson.assessment.prompt,
      userAnswer: answer,
      score: finalScore,
      longFormScore: result.feedback.score,
      multipleChoiceScore,
      multipleChoiceResponses,
      strengths: result.feedback.strengths,
      missing: result.feedback.missing,
      riskNotes: result.feedback.riskNotes,
      betterAnswer: result.feedback.betterAnswer,
      nextPractice: result.feedback.nextPractice,
      redactionSummary: result.redactionSummary,
      privacyChecked: true,
      pdEntryId
    };

    const updatedProgress = saveCertificationAssessmentAttempt(addPdEntry(storedProgress, pdEntry), attempt);
    saveProgress(updatedProgress);
    setProgress(updatedProgress);
    setGradeState({
      status: 'ready',
      message: `Assessment logged with combined score ${finalScore}/100.`,
      feedback: result.feedback,
      redactionSummary: result.redactionSummary,
      finalScore,
      multipleChoiceScore
    });
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-4xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Certification pathway</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
              Professor Messer A+ 220-1202 Core 2 study and assessment
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              A DCSPrep pathway for every Core 2 topic: read the brief, open the linked resources, connect it to DCS IT
              work, and submit a privacy-safe answer for AI scoring and PD evidence.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-100 px-5 py-4 text-sm text-slate-700">
            {aplusCore2Stats.lessonCount} lessons | {aplusCore2Stats.totalRunTime} | {aplusCore2Stats.examCode}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          ['Complete', `${completionPercent}%`],
          ['Assessed', `${completedLessons}/${aplusCore2Lessons.length}`],
          ['Average', averageScore === null ? 'No score' : `${Math.round(averageScore)}/100`],
          ['Objectives', aplusCore2Stats.objectiveCount]
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">{label}</div>
            <div className="mt-2 text-3xl font-semibold text-slate-900">{value}</div>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Core resources</div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {aplusCore2CoreResources.map((resource) => (
            <a
              key={resource.url}
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{resource.kind}</div>
              <div className="mt-2 font-semibold text-slate-900">{resource.title}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{resource.why}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[390px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">Sections</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedSectionId('all')}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  selectedSectionId === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                All
              </button>
              {aplusCore2Sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setSelectedSectionId(section.id)}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    selectedSectionId === section.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {section.id}. {section.title}
                </button>
              ))}
            </div>
          </section>

          <section className="max-h-[760px] overflow-auto rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="space-y-2">
              {filteredLessons.map((lesson) => {
                const attempt = latestAttemptByLesson.get(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    type="button"
                    onClick={() => selectLesson(lesson)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      selectedLesson.id === lesson.id
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs uppercase tracking-[0.16em] opacity-70">
                          {lesson.objectiveId} | {lesson.sectionTitle}
                        </div>
                        <div className="mt-2 font-semibold">{lesson.title}</div>
                      </div>
                      <div className="rounded-full bg-white/15 px-2 py-1 text-xs">
                        {attempt ? `${Math.round(attempt.score)}` : lesson.duration || 'Read'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </aside>

        <div className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                Objective {selectedLesson.objectiveId}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {selectedLesson.duration || 'Video'}
              </span>
              {latestAttemptByLesson.get(selectedLesson.id) ? (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
                  Assessed {Math.round(latestAttemptByLesson.get(selectedLesson.id)!.score)}/100
                </span>
              ) : null}
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">{selectedLesson.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{selectedLesson.studyBrief}</p>
            <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-950">
              <span className="font-semibold">DCS application: </span>
              {selectedLesson.dcsApplication}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Read more and watch</div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {selectedLesson.readMore.map((resource) => (
                <a
                  key={`${selectedLesson.id}-${resource.url}`}
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{resource.kind}</div>
                  <div className="mt-2 font-semibold text-slate-900">{resource.title}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{resource.why}</p>
                </a>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Assessment</div>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900">Multiple choice plus long-form AI feedback</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{selectedLesson.assessment.prompt}</p>
            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900">Multiple-choice quick check</div>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Choose an answer for each question. Feedback appears immediately, then the AI grades your written
                    explanation.
                  </p>
                </div>
                <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900">
                  {multipleChoiceCorrectCount}/{selectedLesson.assessment.multipleChoice.length} correct
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {selectedLesson.assessment.multipleChoice.map((question, index) => {
                  const selectedOptionId = multipleChoiceAnswers[question.id];
                  const selectedOption = getSelectedOption(question, selectedOptionId);
                  const answered = Boolean(selectedOptionId);
                  const correct = selectedOptionId === question.correctOptionId;

                  return (
                    <div key={question.id} className="rounded-2xl bg-white p-4">
                      <div className="text-sm font-semibold text-slate-900">
                        {index + 1}. {question.prompt}
                      </div>
                      <div className="mt-3 grid gap-2">
                        {question.options.map((option) => {
                          const selected = selectedOptionId === option.id;
                          const isCorrectOption = option.id === question.correctOptionId;

                          return (
                            <label
                              key={option.id}
                              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm leading-6 ${
                                selected && correct
                                  ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                                  : selected && !correct
                                    ? 'border-red-300 bg-red-50 text-red-900'
                                    : answered && isCorrectOption
                                      ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                                      : 'border-slate-200 bg-white text-slate-700'
                              }`}
                            >
                              <input
                                type="radio"
                                name={question.id}
                                value={option.id}
                                checked={selected}
                                onChange={() =>
                                  setMultipleChoiceAnswers((current) => ({
                                    ...current,
                                    [question.id]: option.id
                                  }))
                                }
                                className="mt-1 h-4 w-4 accent-slate-900"
                              />
                              <span>{option.text}</span>
                            </label>
                          );
                        })}
                      </div>
                      {answered ? (
                        <div
                          className={`mt-3 rounded-xl p-3 text-sm leading-6 ${
                            correct ? 'bg-emerald-50 text-emerald-900' : 'bg-amber-50 text-amber-900'
                          }`}
                        >
                          <span className="font-semibold">{correct ? 'Correct.' : 'Not quite.'}</span>{' '}
                          {selectedOption ? `You chose: ${selectedOption.text} ` : null}
                          {question.explanation}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-4 rounded-2xl bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-900">Success criteria</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">
                {selectedLesson.assessment.successCriteria.map((criterion) => (
                  <li key={criterion}>{criterion}</li>
                ))}
              </ul>
            </div>
            <textarea
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              className="mt-5 min-h-52 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6"
              placeholder="Use fake or anonymised examples only. Explain the topic, then apply it to a DCS support scenario."
            />
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={gradeAnswer}
                disabled={gradeState.status === 'loading'}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:bg-slate-400"
              >
                {gradeState.status === 'loading' ? 'Grading...' : 'Grade and log assessment'}
              </button>
              <div
                className={`rounded-full px-4 py-2 text-sm ${
                  gradeState.status === 'error'
                    ? 'bg-red-50 text-red-800'
                    : gradeState.status === 'ready'
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'bg-slate-100 text-slate-700'
                }`}
              >
                {gradeState.message}
              </div>
            </div>

            {gradeState.status === 'ready' ? (
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Combined score</div>
                  <div className="mt-2 text-3xl font-semibold text-slate-900">
                    {gradeState.finalScore}/100
                  </div>
                  <div className="mt-3 text-sm leading-6 text-slate-600">
                    Multiple choice: {gradeState.multipleChoiceScore}/100 | Long form AI:{' '}
                    {Math.round(gradeState.feedback.score)}/100
                  </div>
                  <div className="mt-4 text-sm font-semibold text-slate-900">What is correct</div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">
                    {gradeState.feedback.strengths.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">What to fix</div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">
                    {gradeState.feedback.missing.length ? (
                      gradeState.feedback.missing.map((item) => <li key={item}>{item}</li>)
                    ) : (
                      <li>No missing criteria noted.</li>
                    )}
                  </ul>
                  <div className="mt-4 text-sm font-semibold text-slate-900">Better answer guide</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{gradeState.feedback.betterAnswer}</p>
                  <div className="mt-4 text-sm font-semibold text-slate-900">Next practice</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{gradeState.feedback.nextPractice}</p>
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </section>
    </div>
  );
}
