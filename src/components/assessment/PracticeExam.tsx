"use client";

import { useState, useMemo } from 'react';
import { strictQuestionBank } from '../../data/questions';
import AssessmentSession from './AssessmentSession';
import { recordAssessmentAttempt, saveProgress, getStoredProgressSnapshot } from '../../lib/progress';
import { ShieldAlert, Trophy, Target, BookOpen } from 'lucide-react';

export default function PracticeExam() {
  const [examStarted, setExamStarted] = useState(false);
  const [examComplete, setExamComplete] = useState(false);
  const [progress, setProgress] = useState(() => getStoredProgressSnapshot());

  // Pick 20 questions across all domains for a "full" practice exam
  const questions = useMemo(() => {
    return [...strictQuestionBank]
      .sort(() => Math.random() - 0.5)
      .slice(0, 20);
  }, []); // Only shuffle once per component mount

  if (!examStarted) {
    return (
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-rose-600">
              <ShieldAlert size={24} />
              <span className="text-sm font-bold uppercase tracking-widest">Certification Simulation</span>
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
              DCS ICT Certification Practice Exam
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              This simulation builds a 20-question comprehensive exam covering hardware, networking, 
              DCS-specific workflows, and support quality standards.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="flex gap-4 rounded-2xl bg-slate-50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Target className="text-slate-900" size={20} />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">20 Questions</div>
                  <div className="text-xs text-slate-500">Mixed domains and formats</div>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl bg-slate-50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                  <BookOpen className="text-slate-900" size={20} />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Full Rubrics</div>
                  <div className="text-xs text-slate-500">Self-rating against model answers</div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={() => setExamStarted(true)}
                className="rounded-full bg-slate-900 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                Begin Exam
              </button>
              <div className="text-xs text-slate-400 italic">
                Approx. 30-40 minutes required
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8">
          <h2 className="text-xl font-bold text-slate-900">Exam Standards</h2>
          <div className="mt-4 space-y-4">
            <div className="flex gap-3">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-500" />
              <p className="text-sm text-slate-600">
                <span className="font-bold text-slate-900">Level 1 Safety:</span> Every answer must prioritize safety, triage, and escalation boundaries.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-500" />
              <p className="text-sm text-slate-600">
                <span className="font-bold text-slate-900">Reasoning Depth:</span> Correctness is not enough. You must explain the &quot;why&quot; to pass the reasoning threshold.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-500" />
              <p className="text-sm text-slate-600">
                <span className="font-bold text-slate-900">Privacy First:</span> Answers containing sensitive PII or confidential internal data are penalized.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="text-rose-600" size={20} />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Exam in Progress</span>
        </div>
        <button 
          onClick={() => { if(confirm('Abort exam? Progress will not be saved.')) setExamStarted(false); }}
          className="text-xs text-slate-400 hover:text-rose-600"
        >
          Exit Exam
        </button>
      </div>

      <AssessmentSession
        questions={questions}
        source="strict-quiz"
        title="DCS ICT Practice Exam"
        description="Comprehensive simulation. Focus on note quality and ownership boundaries."
        onRecordAttempt={(attempt) => {
          const updated = recordAssessmentAttempt(progress, attempt);
          setProgress(updated);
          saveProgress(updated);
        }}
        onSessionComplete={() => setExamComplete(true)}
      />
    </div>
  );
}
