"use client";

import Link from 'next/link';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { getReadinessProfile, type ReadinessScore } from '../../src/lib/readinessMath';
import { getInitialProgressSnapshot, getStoredProgressSnapshot, type UserProgress } from '../../src/lib/progress';
import { getRepairPackForTopic } from '../../src/lib/repairPacks';
import { modules as baseModules } from '../../src/data/modules';
import { scenarios as baseScenarios } from '../../src/data/scenarios';
import { getCustomModules, getCustomScenarios } from '../../src/lib/customModules';
import { useSearchParams } from 'next/navigation';
import {
  Award,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  Wrench,
  ArrowRight,
  Zap,
  ShieldCheck,
  Target
} from 'lucide-react';
import type { WeakTopicKey } from '../../src/types/assessment';

function confidenceStyles(confidence: ReadinessScore['confidence']) {
  if (confidence === 'high') return 'bg-emerald-100 text-emerald-800 border-emerald-200';
  if (confidence === 'medium') return 'bg-amber-100 text-amber-800 border-amber-200';
  return 'bg-slate-100 text-slate-700 border-slate-200';
}

function ProfileCard({
  title,
  description,
  scores,
  progress,
  onShowRepair
}: {
  title: string;
  description: string;
  scores: ReadinessScore[];
  progress: UserProgress;
  onShowRepair: (topic: WeakTopicKey) => void;
}) {
  const average = scores.length
    ? Math.round(scores.reduce((sum, score) => sum + score.score, 0) / scores.length)
    : 0;

  return (
    <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">{title}</h2>
          <p className="mt-2 text-base text-slate-600">{description}</p>
        </div>
        <div className="rounded-3xl bg-slate-50 border border-slate-100 px-6 py-4 shadow-inner">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Estimated Profile Average</div>
          <div className="mt-1 text-3xl font-black text-slate-900">{average}%</div>
        </div>
      </div>

      <div className="mt-10 space-y-8">
        {scores.map((score) => (
          <div key={score.id} className="group relative rounded-[2rem] bg-slate-50/50 border border-slate-100 p-8 hover:bg-white hover:border-blue-200 transition-all">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-slate-900">{score.label}</h3>
                  <span className={`rounded-full border px-3 py-0.5 text-[10px] font-black uppercase tracking-widest ${confidenceStyles(score.confidence)}`}>
                    {score.confidence} confidence
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-slate-500">{score.note}</p>
              </div>
              <div className="text-4xl font-black text-slate-900">{Math.round(score.score)}%</div>
            </div>

            <div className="mt-6 h-4 overflow-hidden rounded-full bg-white border border-slate-100 shadow-inner">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-1000 ease-out"
                style={{ width: `${Math.min(100, score.score)}%` }}
              />
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {/* Evidence Drivers */}
              <div className="rounded-2xl bg-white p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <BarChart3 size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Evidence Drivers</span>
                </div>
                <div className="mt-6 space-y-4">
                  {[
                    { label: 'Assessment', val: score.drivers.assessment, color: 'bg-blue-500' },
                    { label: 'Scenarios', val: score.drivers.scenarios, color: 'bg-emerald-500' },
                    { label: 'Note Quality', val: score.drivers.noteQuality, color: 'bg-amber-500' },
                    { label: 'Flashcards', val: score.drivers.flashcards, color: 'bg-indigo-500' }
                  ].map(d => (
                    <div key={d.label}>
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-slate-500">{d.label}</span>
                        <span className="text-slate-900">{Math.round(d.val)}%</span>
                      </div>
                      <div className="mt-1.5 h-1 w-full rounded-full bg-slate-50">
                        <div className={`h-full rounded-full ${d.color}`} style={{ width: `${d.val}%` }} />
                      </div>
                    </div>
                  ))}
                  {score.drivers.weakAreaPenalty > 0 && (
                    <div className="pt-2 border-t border-slate-50">
                      <div className="flex justify-between text-[10px] font-bold text-rose-600">
                        <span>Weak Topic Penalty</span>
                        <span>-{Math.round(score.drivers.weakAreaPenalty)}%</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Practical Skills Mapping */}
              <div className="rounded-2xl bg-white p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <Target size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">DCS Practical Skills</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {score.practicalSkills.map((skill, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-bold text-slate-600">
                      <CheckCircle2 size={14} className="mt-0.5 text-emerald-500 shrink-0" />
                      {skill}
                    </li>
                  ))}
                  {score.practicalSkills.length === 0 && (
                    <li className="text-xs text-slate-400 italic">Mapping pending more evidence...</li>
                  )}
                </ul>
              </div>

              {/* Next Action / Repair */}
              <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-lg">
                <div className="flex items-center gap-2 text-blue-400">
                  <Zap size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Coaching Move</span>
                </div>
                <div className="mt-6">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Weakest Sub-Topic</div>
                  <div className="mt-1 text-base font-bold text-blue-400">{score.weakestArea === 'None' ? 'Area is solid!' : score.weakestArea}</div>
                </div>

                {score.weakestArea !== 'None' ? (
                  <button
                    onClick={() => onShowRepair(score.weakestArea as WeakTopicKey)}
                    className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 py-3 text-xs font-bold hover:bg-blue-500 transition-all"
                  >
                    Launch Repair Pack
                    <ArrowRight size={14} />
                  </button>
                ) : score.nextAction ? (
                  <Link
                    href={score.nextAction.href}
                    className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-white/10 py-3 text-xs font-bold hover:bg-white/20 transition-all"
                  >
                    {score.nextAction.label}
                    <ArrowRight size={14} />
                  </Link>
                ) : (
                  <div className="mt-8 text-xs text-slate-400 italic text-center">
                    All clear in this domain. Keep it up!
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReadinessContent() {
  const [hasMounted, setHasMounted] = useState(false);
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot());
  const [activeRepair, setActiveRepair] = useState<WeakTopicKey | null>(null);
  const searchParams = useSearchParams();

  const allModules = useMemo(() => [...baseModules, ...getCustomModules()], []);
  const allScenarios = useMemo(() => [...baseScenarios, ...getCustomScenarios()], []);

  useEffect(() => {
    setHasMounted(true);
    setProgress(getStoredProgressSnapshot());

    const repairTopic = searchParams.get('repair');
    if (repairTopic) {
      setActiveRepair(repairTopic as WeakTopicKey);
    }
  }, [searchParams]);

  if (!hasMounted) return null;

  const aPlusScores = getReadinessProfile('aPlus', progress);
  const level2Scores = getReadinessProfile('level2', progress);
  const managerScores = getReadinessProfile('schoolItManager', progress);

  const repairPack = activeRepair ? getRepairPackForTopic(activeRepair, allModules, allScenarios, progress) : null;

  return (
    <div className="space-y-8 pb-12">
      <header className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-bold uppercase tracking-widest text-slate-400">Proficiency Analysis</div>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900">Technical Readiness</h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Your readiness score is a multi-factor calculation based on quiz performance, scenario branching choices,
            ticket-note quality, and spaced repetition stability.
          </p>
        </div>
      </header>

      {/* Repair Pack Overlay/Modal-like Section */}
      {repairPack && (
        <section className="animate-in fade-in zoom-in duration-300 rounded-[2.5rem] border-4 border-blue-600 bg-white p-10 shadow-2xl">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4 text-blue-600">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                <Zap size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900">{repairPack.title}</h2>
                <p className="text-blue-600 font-bold">Targeted Repair Mission</p>
              </div>
            </div>
            <button
              onClick={() => setActiveRepair(null)}
              className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200"
            >
              <ArrowRight className="rotate-180" size={24} />
            </button>
          </div>

          <p className="mt-6 text-lg text-slate-600 max-w-2xl">{repairPack.description}</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {repairPack.items.map((item) => (
              <Link
                key={item.id}
                href={item.route}
                className="group rounded-3xl border border-slate-100 bg-slate-50 p-6 hover:border-blue-200 hover:bg-blue-50/30 transition-all"
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-blue-600">{item.type.replace('-', ' ')}</div>
                <h4 className="mt-2 text-sm font-bold text-slate-900">{item.title}</h4>
                <div className="mt-4 flex items-center justify-between text-[10px] font-bold text-slate-500">
                  <span>~{item.estimatedMinutes}m</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-3 rounded-2xl bg-blue-50 p-4 text-sm text-blue-700">
            <ShieldCheck size={18} />
            <p className="font-medium">Completing this pack will significantly boost your confidence score in {activeRepair}.</p>
          </div>
        </section>
      )}

      <div className="space-y-12">
        <ProfileCard
          title="CompTIA A+ Readiness"
          description="Capability across core IT support domains (Hardware, OS, Networking, Security)."
          scores={aPlusScores}
          progress={progress}
          onShowRepair={setActiveRepair}
        />

        <ProfileCard
          title="Level 2 Support Readiness"
          description="Technical depth in identity management, MDM automation, and infrastructure."
          scores={level2Scores}
          progress={progress}
          onShowRepair={setActiveRepair}
        />

        <ProfileCard
          title="School IT Manager Readiness"
          description="Strategic operational breadth, risk compliance, and stakeholder communication."
          scores={managerScores}
          progress={progress}
          onShowRepair={setActiveRepair}
        />
      </div>
    </div>
  );
}

export default function ReadinessPage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
          Loading readiness profile...
        </div>
      }
    >
      <ReadinessContent />
    </Suspense>
  );
}
