"use client";

import { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Wind, User, Brain } from 'lucide-react';

type MindfulnessExercise = {
  id: string;
  title: string;
  description: string;
  durationSeconds: number;
  instructions: string[];
  type: 'breathing' | 'body-scan' | 'reflection';
};

const exercises: MindfulnessExercise[] = [
  {
    id: 'box-breathing',
    title: 'Box Breathing',
    description: 'A simple technique to calm the nervous system and regain focus.',
    durationSeconds: 60,
    instructions: [
      'Inhale slowly for 4 seconds.',
      'Hold your breath for 4 seconds.',
      'Exhale slowly for 4 seconds.',
      'Hold your breath for 4 seconds.'
    ],
    type: 'breathing'
  },
  {
    id: 'quick-body-scan',
    title: 'Quick Body Scan',
    description: 'Notice where you are holding tension before your next task.',
    durationSeconds: 60,
    instructions: [
      'Close your eyes or soften your gaze.',
      'Notice the weight of your body on the chair.',
      'Soften your jaw and drop your shoulders.',
      'Take one deep, conscious breath.'
    ],
    type: 'body-scan'
  }
];

export default function MindfulnessPause() {
  const [selectedExercise, setSelectedExercise] = useState<MindfulnessExercise>(exercises[0]);
  const [secondsRemaining, setSecondsRemaining] = useState(selectedExercise.durationSeconds);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsActive(false);
      setIsComplete(true);
    }

    return () => clearInterval(interval);
  }, [isActive, secondsRemaining]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setIsComplete(false);
    setSecondsRemaining(selectedExercise.durationSeconds);
  };

  const selectExercise = (exercise: MindfulnessExercise) => {
    setSelectedExercise(exercise);
    setSecondsRemaining(exercise.durationSeconds);
    setIsActive(false);
    setIsComplete(false);
  };

  const progress = ((selectedExercise.durationSeconds - secondsRemaining) / selectedExercise.durationSeconds) * 100;

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-blue-50 p-2 text-blue-600">
          <Wind size={20} />
        </div>
        <h2 className="text-xl font-semibold text-slate-900">Mindfulness Pause</h2>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {exercises.map((ex) => (
          <button
            key={ex.id}
            onClick={() => selectExercise(ex)}
            className={`rounded-2xl border p-4 text-left transition ${
              selectedExercise.id === ex.id
                ? 'border-blue-500 bg-blue-50 text-blue-900'
                : 'border-slate-100 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold">
              {ex.type === 'breathing' ? <Wind size={16} /> : <User size={16} />}
              {ex.title}
            </div>
            <p className="mt-1 text-xs opacity-70">{ex.description}</p>
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center justify-center">
        <div className="relative flex h-48 w-48 items-center justify-center">
          <svg className="h-full w-full -rotate-90 transform">
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="8"
              className="text-slate-100"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={552}
              strokeDashoffset={552 - (552 * progress) / 100}
              className="text-blue-500 transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-bold text-slate-900">{secondsRemaining}s</span>
            <span className="text-xs uppercase tracking-widest text-slate-500">remaining</span>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={toggleTimer}
            disabled={isComplete}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition hover:scale-105 disabled:bg-slate-300"
          >
            {isActive ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button
            onClick={resetTimer}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:scale-105"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-slate-50 p-5">
        <h3 className="text-sm font-semibold text-slate-900">Instructions</h3>
        <ul className="mt-3 space-y-2">
          {selectedExercise.instructions.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-600">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ul>
      </div>

      {isComplete && (
        <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-center text-sm font-medium text-emerald-800 animate-in fade-in zoom-in duration-300">
          Pause complete. You are ready to focus.
        </div>
      )}
    </div>
  );
}
