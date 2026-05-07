"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { weakTopicLabels } from '../../src/data/skillDomains';
import { getStoredProgressSnapshot, getInitialProgressSnapshot, type UserProgress } from '../../src/lib/progress';

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

export default function FeedbackLogPage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot());

  useEffect(() => {
    setProgress(getStoredProgressSnapshot());
  }, []);

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
    }))
  ].sort((a, b) => b.timestampIso.localeCompare(a.timestampIso));

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Feedback log</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Your AI Coaching History
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Review every piece of feedback, model answer, and improvement suggestion you've received across all quizzes and academic assessments.
          </p>
        </div>
      </section>

      <div className="space-y-6">
        {allAttempts.length === 0 ? (
          <section className="rounded-[2rem] border border-dashed border-slate-300 p-12 text-center">
            <h2 className="text-xl font-semibold text-slate-900">No feedback yet</h2>
            <p className="mt-2 text-slate-600">Complete a quiz or assessment to see your coaching history here.</p>
            <Link href="/modules" className="mt-6 inline-block rounded-full bg-slate-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
              Go to Modules
            </Link>
          </section>
        ) : (
          allAttempts.map((attempt) => (
            <section key={attempt.id} className="rounded-[2rem] border border-slate-200 bg-white overflow-hidden shadow-sm">
              <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    attempt.kind === 'academic' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {attempt.kind === 'academic' ? `Academic: ${attempt.subjectCode}` : 'Module Quiz'}
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

                    {((attempt.kind === 'standard' && attempt.feedback.correctedConcept) || (attempt.kind === 'academic' && attempt.missing.length > 0)) && (
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
                    ) : (
                      <span>Assessment: {attempt.assessmentTitle}</span>
                    )}
                  </div>
                  <Link 
                    href={attempt.kind === 'standard' ? `/modules/${attempt.recommendedModuleId}` : `/academic-pd/subjects/${attempt.subjectId}`}
                    className="text-sm font-semibold text-slate-900 hover:underline"
                  >
                    Review source material →
                  </Link>
                </div>
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
