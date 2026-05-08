"use client";

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  CheckCircle2, 
  ChevronRight, 
  GraduationCap, 
  LayoutDashboard, 
  MessageSquare, 
  Microscope, 
  Rocket, 
  Search, 
  Target, 
  TrendingUp,
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { modules as baseModules } from '../src/data/modules';
import { scenarios as baseScenarios } from '../src/data/scenarios';
import { getDashboardRecommendation, getCurrentWeakFocus } from '../src/lib/readinessMath';
import { getStoredProgressSnapshot, type UserProgress, saveProgress, completeDailyChallenge } from '../src/lib/progress';
import { isDue, getTodayDateKey } from '../src/lib/spacedRepetition';
import { getOverallProgress } from '../src/lib/moduleMath';
import { getCustomModules, getCustomScenarios } from '../src/lib/customModules';
import { generateStudyPath } from '../src/lib/studyPath';
import KnowledgeHeatmap from '../src/components/dashboard/KnowledgeHeatmap';

function getMonthKey(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
}

export default function DashboardPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [progress, setProgress] = useState<UserProgress | undefined>(undefined);
  const [customModules, setCustomModules] = useState<any[]>([]);
  const [customScenarios, setCustomScenarios] = useState<any[]>([]);
  
  const allModules = useMemo(() => [...baseModules, ...customModules], [customModules]);
  const allScenarios = useMemo(() => [...baseScenarios, ...customScenarios], [customScenarios]);

  useEffect(() => {
    setHasMounted(true);
    setProgress(getStoredProgressSnapshot());
    setCustomModules(getCustomModules());
    setCustomScenarios(getCustomScenarios());
  }, []);

  const studyPath = useMemo(() => 
    generateStudyPath(allModules, allScenarios, progress),
    [allModules, allScenarios, progress]
  );

  if (!hasMounted || !progress) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-slate-500">Loading your training cockpit...</div>
      </div>
    );
  }

  const dueFlashcards = allModules.flatMap((module) =>
    Object.values(progress.modules[module.id]?.flashcards || {}).filter(
      (card) => isDue(card.dueDateIso)
    )
  ).length;

  const dueQuestions = Object.values(progress.weakTopicReviews).filter((review) =>
    isDue(review.dueDateIso)
  ).length;

  const completedScenarios = progress.scenarioRuns.filter((run) => run.completed).length;
  const monthlyMinutes = progress.pdEntries
    .filter((entry) => entry.createdAtIso.startsWith(getMonthKey(new Date())))
    .reduce((sum, entry) => sum + entry.minutes, 0);
  const overallProgress = getOverallProgress(allModules, progress);
  const weakestFocus = getCurrentWeakFocus(progress);

  const todayKey = getTodayDateKey();
  const challengeDone = progress.dailyChallenge?.lastCompletedDateIso === todayKey;

  const allQuestions = allModules.flatMap((m) => m.quiz);
  const dailyQuestionIndex = new Date().getDate() % (allQuestions.length || 1);
  const dailyQuestion = allQuestions[dailyQuestionIndex];

  function handleDailyChallengeComplete() {
    if (!progress) return;
    const nextProgress = completeDailyChallenge(progress, dailyQuestion.id);
    setProgress(nextProgress);
    saveProgress(nextProgress);
  }

  return (
    <div className="space-y-8 pb-12">
      <header className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm font-bold uppercase tracking-widest text-slate-400">DCS Support Training</div>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
              Welcome back
            </h1>
            <p className="mt-3 text-lg text-slate-600">
              Your personalized coaching engine for school IT excellence.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/search" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
              <Search size={20} />
            </Link>
            <Link href="/settings" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
              <Target size={20} />
            </Link>
          </div>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Next Best Move Card */}
        <section className="lg:col-span-2 rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-rose-600">
                <Target size={20} />
                <span className="text-sm font-bold uppercase tracking-widest">Coaching Recommendation</span>
              </div>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Your next best training move</h2>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
                <Clock size={16} />
                ~{studyPath.totalMinutes} mins total
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            {studyPath.recommendations.length > 0 ? (
              studyPath.recommendations.map((rec) => (
                <Link
                  key={rec.id}
                  href={rec.route}
                  className="group block rounded-[2rem] border border-slate-100 bg-slate-50 p-6 hover:border-blue-200 hover:bg-blue-50/30 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-6">
                      <div className={`mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-sm ${
                        rec.priority === 'critical' ? 'bg-rose-500 text-white' :
                        rec.priority === 'high' ? 'bg-amber-500 text-white' :
                        'bg-blue-600 text-white'
                      }`}>
                        {rec.actionType === 'review-flashcards' && <BookOpen size={24} />}
                        {rec.actionType === 'complete-module' && <Rocket size={24} />}
                        {rec.actionType === 'scenario-lab' && <Microscope size={24} />}
                        {rec.actionType === 'roleplay' && <MessageSquare size={24} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {rec.title}
                          </h3>
                          {rec.priority === 'critical' && (
                            <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold uppercase text-rose-600">Urgent</span>
                          )}
                        </div>
                        <p className="mt-2 text-base leading-relaxed text-slate-600">
                          {rec.reason}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="mt-2 text-slate-300 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" size={24} />
                  </div>
                </Link>
              ))
            ) : (
              <div className="rounded-[2rem] border border-dashed border-slate-200 p-16 text-center">
                <CheckCircle2 className="mx-auto text-emerald-500" size={64} />
                <h3 className="mt-6 text-xl font-bold text-slate-900">You&apos;re all caught up!</h3>
                <p className="mt-3 text-slate-500">
                  Excellent work. Check back tomorrow for new recommendations or browse the full catalogue.
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-blue-50 p-4 text-sm text-blue-700">
            <AlertCircle size={18} className="shrink-0" />
            <p className="italic">{studyPath.whyItMatters}</p>
          </div>
        </section>

        {/* Stats Sidebar */}
        <div className="space-y-8">
          <section className="rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Readiness Pulse</h2>
            
            <div className="mt-8 space-y-8">
              <div>
                <div className="flex items-center justify-between text-sm font-bold uppercase tracking-wider">
                  <span className="text-slate-400">Overall Proficiency</span>
                  <span className="text-slate-900">{Math.round(overallProgress)}%</span>
                </div>
                <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner">
                  <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${overallProgress}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-slate-50 p-6">
                  <div className="text-3xl font-black text-slate-900">{dueFlashcards + dueQuestions}</div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">Due Now</div>
                </div>
                <div className="rounded-3xl bg-slate-50 p-6">
                  <div className="text-3xl font-black text-slate-900">{completedScenarios}</div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">Labs Done</div>
                </div>
              </div>

              <div className="rounded-3xl bg-amber-50 p-6 border border-amber-100">
                <div className="text-xs font-bold uppercase tracking-widest text-amber-600">Current Focus</div>
                <div className="mt-2 text-lg font-bold text-amber-900">{weakestFocus}</div>
              </div>
            </div>

            <Link 
              href="/readiness"
              className="mt-8 flex items-center justify-center gap-2 rounded-full bg-slate-900 py-4 text-sm font-bold text-white hover:bg-slate-800 transition-all"
            >
              View Full Readiness Report
              <ChevronRight size={18} />
            </Link>
          </section>

          <section className="rounded-[2.5rem] border border-slate-200 bg-slate-900 p-10 text-white shadow-sm">
            <div className="flex items-center gap-3 text-blue-400">
              <Target size={28} />
              <h2 className="text-2xl font-bold text-white">Focus Area</h2>
            </div>
            <p className="mt-6 text-base leading-relaxed text-slate-400">
              Deep work builds deep skills. Enter a timed focus block to tackle a specific micro-task.
            </p>
            <Link 
              href="/focus"
              className="mt-8 block rounded-full bg-blue-600 py-4 text-center text-sm font-bold text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20"
            >
              Start Focus Session
            </Link>
          </section>
        </div>
      </div>

      <KnowledgeHeatmap progress={progress} />

      {/* Daily Challenge */}
      <section className="rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Daily Mastery Challenge</h2>
            <p className="mt-2 text-slate-600">
              One small technical or soft-skill question every day to stay sharp.
            </p>
          </div>
          {challengeDone && (
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-6 py-2 text-sm font-bold text-emerald-700">
              <CheckCircle2 size={18} />
              Challenge complete
            </div>
          )}
        </div>

        {!challengeDone && dailyQuestion && (
          <div className="mt-10 rounded-[2rem] border border-slate-100 bg-slate-50 p-8">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-xs font-bold uppercase tracking-widest">Question of the day</span>
            </div>
            <h3 className="mt-4 text-2xl font-bold text-slate-900">{dailyQuestion.prompt}</h3>
            
            {dailyQuestion.type === 'mcq' && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {dailyQuestion.options.map((opt: any) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      if (opt.id === dailyQuestion.correctOptionId) {
                        handleDailyChallengeComplete();
                      } else {
                        alert('Not quite! Try again.');
                      }
                    }}
                    className="flex w-full items-center rounded-2xl border border-slate-200 bg-white p-6 text-left text-base font-medium text-slate-700 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {dailyQuestion.type !== 'mcq' && (
              <div className="mt-8">
                <p className="text-base text-slate-600 italic">This is an open-ended reflection. Think about your support strategy, then mark as complete.</p>
                <button
                  onClick={handleDailyChallengeComplete}
                  className="mt-6 rounded-full bg-slate-900 px-10 py-4 text-sm font-bold text-white transition hover:bg-slate-800 shadow-lg"
                >
                  Mark as Complete
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Operational Reminder */}
      <footer className="rounded-[2rem] border border-amber-200 bg-amber-50 p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
            <AlertCircle size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-amber-900">Operational Priority</h3>
            <p className="mt-2 text-base leading-relaxed text-amber-800">
              Real-world school support always takes precedence. Tickets, walk-ups, and urgent tasks come first. Use this coaching engine during quiet periods only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
