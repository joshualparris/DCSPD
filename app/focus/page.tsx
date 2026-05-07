"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { modules } from '../../src/data/modules';
import {
  addPdEntry,
  getInitialProgressSnapshot,
  getStoredProgressSnapshot,
  saveFocusSession,
  saveProgress,
  type FocusMode,
  type UserProgress
} from '../../src/lib/progress';

const modeCards: Array<{
  id: FocusMode;
  title: string;
  minutes: number;
  description: string;
}> = [
  {
    id: 'start-tiny',
    title: 'Start tiny',
    minutes: 5,
    description: 'One tiny win: a few flashcards, one short answer, or one safe note prompt.'
  },
  {
    id: 'focus-20',
    title: '20-minute focus block',
    minutes: 20,
    description: 'One clear task, one timer, and a short reflection at the end.'
  },
  {
    id: 'overwhelmed',
    title: "I'm overwhelmed",
    minutes: 8,
    description: 'Slow the noise down with one stabilising task and no multitasking.'
  }
];

const microTasks = [
  {
    id: 'portal-questions',
    title: 'Parent Portal recall set',
    detail: 'Answer the first two diagnostic prompts, then write one parent-safe handoff sentence.',
    href: '/modules/parent-portal-registration'
  },
  {
    id: 'sentral-note',
    title: 'Sentral urgent note',
    detail: 'Write one note for a markbook issue during reporting pressure.',
    href: '/modules/sentral-support'
  },
  {
    id: 'password-judgement',
    title: 'Password risk check',
    detail: 'Classify one login issue as routine, urgent, or suspicious.',
    href: '/modules/login-and-password-support'
  },
  {
    id: 'queue-or-device',
    title: 'Printer path split',
    detail: 'Separate queue, release, and device clues for one print incident.',
    href: '/modules/printer-troubleshooting'
  },
  {
    id: 'guest-rule',
    title: 'Guest Wi-Fi rule sentence',
    detail: 'Write one plain-English allow or block rule for a guest device request.',
    href: '/modules/vlans-network-segmentation'
  },
  {
    id: 'onboarding-gap',
    title: 'Day-one access gap',
    detail: 'List what works, what is missing, and the role impact for a new user.',
    href: '/modules/new-user-onboarding'
  }
];

function formatSeconds(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default function FocusPage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot(modules));
  const [hasHydratedProgress, setHasHydratedProgress] = useState(false);
  const [selectedMode, setSelectedMode] = useState<FocusMode>('focus-20');
  const [selectedTaskId, setSelectedTaskId] = useState(microTasks[0]?.id || '');
  const [secondsRemaining, setSecondsRemaining] = useState(modeCards[1].minutes * 60);
  const [running, setRunning] = useState(false);
  const [sessionStartedAtIso, setSessionStartedAtIso] = useState<string | null>(null);
  const [reflection, setReflection] = useState('');
  const selectedTask = microTasks.find((task) => task.id === selectedTaskId) || microTasks[0];
  const selectedModeCard = modeCards.find((mode) => mode.id === selectedMode) || modeCards[1];

  useEffect(() => {
    setProgress(getStoredProgressSnapshot(modules));
    setHasHydratedProgress(true);
  }, []);

  useEffect(() => {
    if (!hasHydratedProgress) {
      return;
    }

    saveProgress(progress);
  }, [hasHydratedProgress, progress]);

  useEffect(() => {
    setSecondsRemaining(selectedModeCard.minutes * 60);
    setRunning(false);
    setSessionStartedAtIso(null);
  }, [selectedModeCard.minutes, selectedMode]);

  useEffect(() => {
    if (!running) {
      return;
    }

    const timer = window.setInterval(() => {
      setSecondsRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setRunning(false);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [running]);

  const recentSessions = useMemo(() => progress.focusSessions.slice(0, 5), [progress.focusSessions]);

  function startTimer() {
    setSecondsRemaining(selectedModeCard.minutes * 60);
    setSessionStartedAtIso(new Date().toISOString());
    setRunning(true);
  }

  function completeSession() {
    if (!sessionStartedAtIso) {
      return;
    }

    setProgress((current) =>
      addPdEntry(
        saveFocusSession(current, {
          id: `focus-${Date.now()}`,
          mode: selectedMode,
          task: selectedTask.title,
          minutesPlanned: selectedModeCard.minutes,
          startedAtIso: sessionStartedAtIso,
          completedAtIso: new Date().toISOString(),
          reflection: reflection.trim(),
          microTaskId: selectedTask.id
        }),
        {
          id: `pd-focus-${Date.now()}`,
          createdAtIso: new Date().toISOString(),
          type: 'focus-block',
          title: `Focus session: ${selectedTask.title}`,
          minutes: selectedModeCard.minutes,
          evidenceSummary: 'Completed a timed focus session and captured a reflection.',
          reflection: reflection.trim() ? reflection.trim() : undefined,
          privacyChecked: true
        }
      )
    );
    setReflection('');
    setSessionStartedAtIso(null);
    setRunning(false);
    setSecondsRemaining(selectedModeCard.minutes * 60);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Focus support</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Start tiny, focus clearly, and finish with evidence
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Use this page when you only have a small quiet window or when your brain is crowded. One task, one timer,
            one reflection, then stop.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {modeCards.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setSelectedMode(mode.id)}
            className={`rounded-[2rem] border p-5 text-left shadow-sm ${
              selectedMode === mode.id ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-800'
            }`}
          >
            <div className="text-sm uppercase tracking-[0.2em] opacity-70">{mode.minutes} min</div>
            <div className="mt-3 text-2xl font-semibold">{mode.title}</div>
            <p className="mt-3 text-sm leading-6 opacity-80">{mode.description}</p>
          </button>
        ))}
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Micro-learning task cards</h2>
            <p className="mt-2 text-sm text-slate-600">
              Pick one concrete task only. These are sized for short quiet windows and first-line DCS relevance.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
            Recommended: {selectedModeCard.title} on {selectedTask.title}
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {microTasks.map((task) => (
            <div
              key={task.id}
              className={`rounded-3xl border p-5 ${
                selectedTaskId === task.id ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 text-slate-800'
              }`}
            >
              <button onClick={() => setSelectedTaskId(task.id)} className="w-full text-left">
                <div className="text-lg font-semibold">{task.title}</div>
                <p className="mt-2 text-sm leading-6 opacity-80">{task.detail}</p>
              </button>
              <Link href={task.href} className="mt-4 inline-flex text-sm underline">
                Open source module
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Pomodoro-style timer</h2>
          <p className="mt-2 text-sm text-slate-600">
            Tie the timer to one task only. When the time ends, write a short reflection instead of immediately
            opening a new thread.
          </p>

          <div className="mt-6 rounded-[2rem] bg-slate-900 p-8 text-center text-white">
            <div className="text-sm uppercase tracking-[0.2em] opacity-70">{selectedModeCard.title}</div>
            <div className="mt-4 text-6xl font-semibold">{formatSeconds(secondsRemaining)}</div>
            <div className="mt-4 text-sm opacity-80">{selectedTask.title}</div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button onClick={startTimer} className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white">
              Start timer
            </button>
            <button
              onClick={() => setRunning((current) => !current)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
            >
              {running ? 'Pause' : 'Resume'}
            </button>
            <button
              onClick={() => {
                setRunning(false);
                setSecondsRemaining(selectedModeCard.minutes * 60);
              }}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
            >
              Reset
            </button>
          </div>

          <div className="mt-6 rounded-3xl bg-slate-50 p-5">
            <div className="font-semibold text-slate-900">End-of-session reflection prompts</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>- What clue did I notice or miss?</li>
              <li>- What exact workflow, system, or boundary still feels fuzzy?</li>
              <li>- What is the smallest next revisit task I should do later?</li>
            </ul>
            <textarea
              value={reflection}
              onChange={(event) => setReflection(event.target.value)}
              className="mt-4 min-h-28 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800"
              placeholder="Write a short reflection here."
            />
            <button onClick={completeSession} className="mt-4 rounded-full bg-slate-900 px-4 py-2 text-sm text-white">
              Save focus session
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">I&apos;m overwhelmed mode</div>
            <p className="mt-3 text-sm leading-7 text-emerald-900">
              If the task pile feels too loud, choose one symptom only, write one note only, or review one module
              card only. Do not open three support themes at once.
            </p>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Recent focus sessions</h2>
            <div className="mt-5 space-y-4">
              {recentSessions.length ? (
                recentSessions.map((session) => (
                  <div key={session.id} className="rounded-3xl bg-slate-50 p-4">
                    <div className="text-sm font-semibold text-slate-900">
                      {session.task} | {session.minutesPlanned} min
                    </div>
                    <p className="mt-2 text-sm text-slate-700">{session.reflection || 'No reflection recorded.'}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                  No focus sessions recorded yet.
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
