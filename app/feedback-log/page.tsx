"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { weakTopicLabels } from '../../src/data/skillDomains';
import {
  calculateRoleplaySatisfactionScore,
  getStoredProgressSnapshot,
  getInitialProgressSnapshot,
  type UserProgress,
  getRoleplayFeedbackStats,
  RoleplayFeedbackAttempt
} from '../../src/lib/progress';

function formatDate(isoString: string) {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return isoString;
  }
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

function getDisplayedSatisfaction(attempt: RoleplayFeedbackAttempt) {
  return calculateRoleplaySatisfactionScore(attempt.sentimentTrajectory);
}

type FeedbackMode = 'chronological' | 'statistics' | 'roleplay';

export default function FeedbackLogPage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot());
  const [mode, setMode] = useState<FeedbackMode>('chronological');
  const [selectedPersona, setSelectedPersona] = useState<string>('all');

  useEffect(() => {
    setProgress(getStoredProgressSnapshot());
  }, []);

  // Get unique personas
  const personas = Array.from(new Set(progress.roleplayFeedbackAttempts.map(a => a.persona)));

  // Filter roleplay attempts by persona
  const filteredRoleplayAttempts = selectedPersona === 'all' 
    ? progress.roleplayFeedbackAttempts 
    : progress.roleplayFeedbackAttempts.filter(a => a.persona === selectedPersona);

  const allAttempts = [
    ...progress.assessmentAttempts.map(a => ({ ...a, kind: 'standard' as const })),
    ...progress.academicAssessmentAttempts.map(a => ({
        id: a.id,
        prompt: a.prompt,
        timestampIso: a.createdAtIso,
        score: a.score,
        betterAnswer: a.betterAnswer,
        strengths: a.strengths,
        missing: a.missing,
        kind: 'academic' as const,
        subjectCode: a.subjectCode,
        assessmentTitle: a.assessmentTitle
    })),
    ...progress.certificationAssessmentAttempts.map(a => ({
        id: a.id,
        prompt: a.prompt,
        timestampIso: a.createdAtIso,
        score: a.score,
        betterAnswer: a.betterAnswer,
        strengths: a.strengths,
        missing: a.missing,
        kind: 'certification' as const,
        certificationTitle: a.certificationTitle,
        lessonTitle: a.lessonTitle,
        objectiveId: a.objectiveId,
        longFormScore: a.longFormScore,
        multipleChoiceScore: a.multipleChoiceScore
    }))
  ].sort((a, b) => b.timestampIso.localeCompare(a.timestampIso));

  const stats = getRoleplayFeedbackStats(filteredRoleplayAttempts);
  const hasAnyFeedback = allAttempts.length > 0 || progress.roleplayFeedbackAttempts.length > 0;

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Feedback log</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Your AI Coaching History
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Review every piece of feedback, model answer, roleplay coaching, and improvement suggestion you&apos;ve received.
          </p>
        </div>
      </section>

      {/* Mode Selection & Filters */}
      {hasAnyFeedback && (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">View Mode</div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setMode('chronological')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  mode === 'chronological'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Chronological History
              </button>
              <button
                onClick={() => setMode('statistics')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  mode === 'statistics'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Statistics & Summary
              </button>
              <button
                onClick={() => setMode('roleplay')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  mode === 'roleplay'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Roleplay Sessions
              </button>
            </div>
          </div>

          {/* Persona Filter */}
          {progress.roleplayFeedbackAttempts.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Filter by Persona</div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedPersona('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    selectedPersona === 'all'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  All Personas
                </button>
                {personas.map((persona) => (
                  <button
                    key={persona}
                    onClick={() => setSelectedPersona(persona)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      selectedPersona === persona
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {persona}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="space-y-6">
        {!hasAnyFeedback ? (
          <section className="rounded-[2rem] border border-dashed border-slate-300 p-12 text-center">
            <h2 className="text-xl font-semibold text-slate-900">No feedback yet</h2>
            <p className="mt-2 text-slate-600">Complete a quiz, assessment, or roleplay to see your coaching history here.</p>
            <div className="mt-6 flex gap-3 justify-center">
              <Link href="/modules" className="inline-block rounded-full bg-slate-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                Go to Modules
              </Link>
              <Link href="/simulations/roleplay" className="inline-block rounded-full bg-indigo-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
                Try Roleplay
              </Link>
            </div>
          </section>
        ) : (
          <>
            {/* Chronological View */}
            {mode === 'chronological' && (
              <>
                {allAttempts.length > 0 && (
                  <>
                    <h2 className="text-lg font-semibold text-slate-900">Assessments & Quizzes</h2>
                    {allAttempts.map((attempt) => (
                      <section key={attempt.id} className="rounded-[2rem] border border-slate-200 bg-white overflow-hidden shadow-sm">
                        <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                              attempt.kind === 'academic'
                                ? 'bg-indigo-100 text-indigo-700'
                                : attempt.kind === 'certification'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-slate-200 text-slate-700'
                            }`}>
                              {attempt.kind === 'academic'
                                ? `Academic: ${attempt.subjectCode}`
                                : attempt.kind === 'certification'
                                  ? 'Certification'
                                  : 'Module Quiz'}
                            </div>
                            <span className="text-xs text-slate-400 font-medium">
                              {formatDate(attempt.timestampIso)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-slate-900">Score:</span>
                              <span className={`text-sm font-bold ${
                                  (attempt.kind === 'standard' ? attempt.scoreBreakdown.total * 100 : attempt.score) >= 80 ? 'text-emerald-600' : 
                                  (attempt.kind === 'standard' ? attempt.scoreBreakdown.total * 100 : attempt.score) >= 50 ? 'text-orange-600' : 'text-rose-600'
                              }`}>
                                  {Math.round(attempt.kind === 'standard' ? attempt.scoreBreakdown.total * 100 : attempt.score)}%
                              </span>
                          </div>
                        </div>
                        
                        <div className="p-6 space-y-6">
                          <div>
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Question / Prompt</h3>
                            <p className="text-slate-900 font-medium">{attempt.prompt}</p>
                          </div>

                          <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                              <div>
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 text-emerald-700">Strengths / What went well</h3>
                                <ul className="list-disc list-inside space-y-1">
                                  {attempt.kind === 'standard' ? (
                                     <li className="text-sm text-slate-700">{attempt.feedback.correctness}</li>
                                  ) : (
                                    attempt.strengths.map((s, i) => (
                                      <li key={i} className="text-sm text-slate-700">{s}</li>
                                    ))
                                  )}
                                </ul>
                              </div>

                              {((attempt.kind === 'standard' && attempt.feedback.correctedConcept) || (attempt.kind !== 'standard' && attempt.missing.length > 0)) && (
                                <div>
                                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 text-rose-700">Areas for improvement</h3>
                                  <ul className="list-disc list-inside space-y-1">
                                    {attempt.kind === 'standard' ? (
                                      <li className="text-sm text-slate-700">{attempt.feedback.correctedConcept}</li>
                                    ) : (
                                      attempt.missing.map((m, i) => (
                                        <li key={i} className="text-sm text-slate-700">{m}</li>
                                      ))
                                    )}
                                  </ul>
                                </div>
                              )}
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Model Answer / Better Approach</h3>
                              <p className="text-sm text-slate-700 leading-relaxed italic">
                                {attempt.kind === 'standard' ? attempt.feedback.reasoning : attempt.betterAnswer}
                              </p>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                            <div className="text-xs text-slate-400">
                              {attempt.kind === 'standard' ? (
                                <span>Domain: {attempt.domain} • Topic: {weakTopicLabels[attempt.weakTopic]}</span>
                              ) : attempt.kind === 'certification' ? (
                                <span>
                                  {attempt.certificationTitle} • Objective {attempt.objectiveId}: {attempt.lessonTitle}
                                  {typeof attempt.multipleChoiceScore === 'number' && typeof attempt.longFormScore === 'number'
                                    ? ` • MCQ ${Math.round(attempt.multipleChoiceScore)}% / AI ${Math.round(attempt.longFormScore)}%`
                                    : ''}
                                </span>
                              ) : (
                                <span>Assessment: {attempt.assessmentTitle}</span>
                              )}
                            </div>
                            <Link 
                              href={
                                attempt.kind === 'standard'
                                  ? `/modules/${attempt.recommendedModuleId}`
                                  : attempt.kind === 'certification'
                                    ? '/certifications/aplus-core-2'
                                    : `/academic-pd/subjects/${attempt.subjectCode}`
                              }
                              className="text-sm font-semibold text-slate-900 hover:underline"
                            >
                              Review source material →
                            </Link>
                          </div>
                        </div>
                      </section>
                    ))}
                  </>
                )}

                {filteredRoleplayAttempts.length > 0 && (
                  <>
                    <h2 className="text-lg font-semibold text-slate-900 mt-8">Roleplay Sessions</h2>
                    {filteredRoleplayAttempts.map((attempt) => (
                      <section key={attempt.id} className="rounded-[2rem] border border-slate-200 bg-white overflow-hidden shadow-sm">
                        {(() => {
                          const displayedSatisfaction = getDisplayedSatisfaction(attempt);

                          return (
                            <>
                        <div className="bg-indigo-50 border-b border-indigo-100 px-6 py-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700">
                              Roleplay: {attempt.persona}
                            </div>
                            <span className="text-xs text-indigo-600 font-medium">
                              {formatDate(attempt.createdAtIso)}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="text-xs text-indigo-600 font-medium">Satisfaction</div>
                              <div className={`text-sm font-bold ${displayedSatisfaction >= 75 ? 'text-emerald-600' : displayedSatisfaction >= 50 ? 'text-orange-600' : 'text-rose-600'}`}>
                                {displayedSatisfaction}%
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 space-y-6">
                          <div>
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Scenario</h3>
                            <p className="text-slate-900 font-medium">{attempt.scenario}</p>
                          </div>

                          <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                              <div>
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Session Stats</h3>
                                <ul className="space-y-2 text-sm">
                                  <li className="flex justify-between"><span className="text-slate-600">Exchanges:</span><span className="font-semibold text-slate-900">{attempt.exchangeCount}</span></li>
                                  <li className="flex justify-between"><span className="text-slate-600">Duration:</span><span className="font-semibold text-slate-900">{formatDuration(attempt.durationSeconds)}</span></li>
                                  <li className="flex justify-between"><span className="text-slate-600">Sentiment:</span><span className={`font-semibold ${
                                    attempt.averageSentiment === 'satisfied' ? 'text-emerald-600' : 
                                    attempt.averageSentiment === 'angry' ? 'text-rose-600' : 
                                    'text-slate-600'
                                  }`}>{attempt.averageSentiment}</span></li>
                                </ul>
                              </div>

                              {attempt.keyTopics.length > 0 && (
                                <div>
                                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Topics Covered</h3>
                                  <div className="flex flex-wrap gap-2">
                                    {attempt.keyTopics.map((topic) => (
                                      <span key={topic} className="inline-block rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                                        {topic}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="rounded-2xl bg-indigo-50 p-5 border border-indigo-100">
                              <h3 className="text-sm font-bold text-indigo-700 uppercase tracking-widest mb-3">Coach Notes Summary</h3>
                              <p className="text-sm text-indigo-900 leading-relaxed">
                                {attempt.coachNotesSummary || 'No specific coaching notes captured.'}
                              </p>
                            </div>
                          </div>
                        </div>
                            </>
                          );
                        })()}
                      </section>
                    ))}
                  </>
                )}
              </>
            )}

            {/* Statistics View */}
            {mode === 'statistics' && (
              <div className="space-y-6">
                {allAttempts.length > 0 && (
                  <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Assessment Statistics</h2>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="rounded-xl bg-slate-50 p-4">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Attempts</div>
                        <div className="mt-2 text-2xl font-bold text-slate-900">{allAttempts.length}</div>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-4">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Average Score</div>
                        <div className="mt-2 text-2xl font-bold text-slate-900">
                          {Math.round(allAttempts.reduce((sum, a) => sum + (a.kind === 'standard' ? a.scoreBreakdown.total * 100 : a.score), 0) / allAttempts.length)}%
                        </div>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-4">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Best Score</div>
                        <div className="mt-2 text-2xl font-bold text-emerald-600">
                          {Math.max(...allAttempts.map(a => a.kind === 'standard' ? a.scoreBreakdown.total * 100 : a.score))}%
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {progress.roleplayFeedbackAttempts.length > 0 && (
                  <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Roleplay Statistics</h2>
                    <p className="mb-4 text-sm leading-6 text-slate-600">
                      Satisfaction is now weighted from the whole sentiment path: angry, neutral, satisfied, and whether
                      the conversation recovered. Neutral progress counts as partial success.
                    </p>
                    <div className="grid gap-4 md:grid-cols-3 mb-6">
                      <div className="rounded-xl bg-indigo-50 p-4">
                        <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Total Sessions</div>
                        <div className="mt-2 text-2xl font-bold text-indigo-900">{stats.totalSessions}</div>
                      </div>
                      <div className="rounded-xl bg-indigo-50 p-4">
                        <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Avg Satisfaction</div>
                        <div className="mt-2 text-2xl font-bold text-indigo-900">{stats.averageSatisfaction}%</div>
                      </div>
                      <div className="rounded-xl bg-indigo-50 p-4">
                        <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Avg Duration</div>
                        <div className="mt-2 text-2xl font-bold text-indigo-900">{formatDuration(stats.averageDuration)}</div>
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      {Object.keys(stats.personaBreakdown).length > 0 && (
                        <div>
                          <h3 className="text-sm font-bold text-slate-600 uppercase tracking-widest mb-3">Sessions by Persona</h3>
                          <div className="space-y-2">
                            {Object.entries(stats.personaBreakdown).map(([persona, count]) => (
                              <div key={persona} className="flex justify-between items-center">
                                <span className="text-sm text-slate-700">{persona}</span>
                                <span className="inline-block rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-700">{count}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {stats.topTopics.length > 0 && (
                        <div>
                          <h3 className="text-sm font-bold text-slate-600 uppercase tracking-widest mb-3">Top Topics Covered</h3>
                          <div className="flex flex-wrap gap-2">
                            {stats.topTopics.map((topic) => (
                              <span key={topic} className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* Roleplay Sessions View */}
            {mode === 'roleplay' && (
              <div className="space-y-6">
                {filteredRoleplayAttempts.length === 0 ? (
                  <section className="rounded-[2rem] border border-dashed border-indigo-300 p-12 text-center bg-indigo-50">
                    <h2 className="text-xl font-semibold text-indigo-900">No roleplay sessions yet</h2>
                    <p className="mt-2 text-indigo-700">Complete a roleplay coaching session to see it here.</p>
                    <Link href="/simulations/roleplay" className="mt-6 inline-block rounded-full bg-indigo-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
                      Start a Roleplay
                    </Link>
                  </section>
                ) : (
                  filteredRoleplayAttempts.map((attempt) => (
                    <section key={attempt.id} className="rounded-[2rem] border border-indigo-200 bg-white overflow-hidden shadow-sm">
                      {(() => {
                        const displayedSatisfaction = getDisplayedSatisfaction(attempt);

                        return (
                          <>
                      <div className="bg-indigo-50 border-b border-indigo-100 px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-bold text-indigo-900">{attempt.persona}</div>
                            <div className="text-xs text-indigo-600 mt-1">{formatDate(attempt.createdAtIso)}</div>
                          </div>
                          <div className="text-right">
                            <div className={`text-sm font-bold ${displayedSatisfaction >= 75 ? 'text-emerald-600' : displayedSatisfaction >= 50 ? 'text-orange-600' : 'text-rose-600'}`}>
                              {displayedSatisfaction}% Satisfied
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 space-y-6">
                        <div>
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Conversation Transcript</h3>
                          <div className="space-y-3 max-h-96 overflow-y-auto">
                            {attempt.exchanges.map((exchange, idx) => (
                              <div key={idx} className="space-y-2">
                                <div className="bg-slate-900 text-white rounded-xl px-4 py-2 text-sm">
                                  {exchange.userMessage}
                                </div>
                                <div className={`rounded-xl px-4 py-2 text-sm ${
                                  exchange.sentiment === 'angry' ? 'bg-rose-100 text-rose-900' :
                                  exchange.sentiment === 'satisfied' ? 'bg-emerald-100 text-emerald-900' :
                                  'bg-slate-100 text-slate-900'
                                }`}>
                                  {exchange.botReply}
                                </div>
                                {exchange.coachNotes && (
                                  <div className="text-xs text-indigo-600 italic pl-4 border-l-2 border-indigo-200">
                                    <strong>Coach:</strong> {exchange.coachNotes}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                          </>
                        );
                      })()}
                    </section>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
