"use client";

import { useEffect, useState } from 'react';
import { scenarios } from '../../src/data/scenarios';
import AiCoachPanel from '../../src/components/ai/AiCoachPanel';
import {
  addPdEntry,
  getInitialProgressSnapshot,
  getStoredProgressSnapshot,
  saveProgress,
  saveScenarioRun,
  type UserProgress
} from '../../src/lib/progress';
import type { ScenarioChoice, ScenarioRunChoice } from '../../src/types/scenarios';

export default function ScenariosPage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot());
  const [hasHydratedProgress, setHasHydratedProgress] = useState(false);
  const [selectedScenarioId, setSelectedScenarioId] = useState(scenarios[0]?.id || '');
  const [stepIndex, setStepIndex] = useState(0);
  const [runChoices, setRunChoices] = useState<ScenarioRunChoice[]>([]);
  const [revealedChoice, setRevealedChoice] = useState<ScenarioChoice | null>(null);
  const [escalationNote, setEscalationNote] = useState('');
  const [noteScores, setNoteScores] = useState<Record<string, number>>({});
  const [noteSubmitted, setNoteSubmitted] = useState(false);
  const [savedNoteAverage, setSavedNoteAverage] = useState<number | null>(null);

  useEffect(() => {
    setProgress(getStoredProgressSnapshot());
    setHasHydratedProgress(true);
  }, []);

  useEffect(() => {
    if (!hasHydratedProgress) {
      return;
    }

    saveProgress(progress);
  }, [hasHydratedProgress, progress]);

  const scenario = scenarios.find((entry) => entry.id === selectedScenarioId) || scenarios[0];

  const currentStep = scenario?.steps[stepIndex];
  const completedScenarios = progress.scenarioRuns.filter((run) => run.completed).length;
  const noteReady =
    Boolean(escalationNote.trim()) &&
    scenario.noteRubric.every((criterion) => typeof noteScores[criterion.id] === 'number');
  const noteAverage = scenario.noteRubric.length
    ? Number(
        (
          scenario.noteRubric.reduce((sum, criterion) => sum + (noteScores[criterion.id] ?? 0), 0) /
          scenario.noteRubric.length
        ).toFixed(2)
      )
    : 0;

  function restartScenario(nextScenarioId = scenario.id) {
    setSelectedScenarioId(nextScenarioId);
    setStepIndex(0);
    setRunChoices([]);
    setRevealedChoice(null);
    setEscalationNote('');
    setNoteScores({});
    setNoteSubmitted(false);
    setSavedNoteAverage(null);
  }

  function handleChoice(choice: ScenarioChoice) {
    setRevealedChoice(choice);
  }

  function saveChoiceAndContinue() {
    if (!currentStep || !revealedChoice) {
      return;
    }

    const nextChoices = [
      ...runChoices,
      {
        stepId: currentStep.id,
        choiceId: revealedChoice.id,
        correct: Boolean(revealedChoice.correct)
      }
    ];

    if (stepIndex === scenario.steps.length - 1) {
      setRunChoices(nextChoices);
      setStepIndex(stepIndex + 1);
      setRevealedChoice(null);
      return;
    }

    setRunChoices(nextChoices);
    setStepIndex(stepIndex + 1);
    setRevealedChoice(null);
  }

  if (!scenario) {
    return null;
  }

  const finished = stepIndex >= scenario.steps.length;

  function submitScenarioNote() {
    if (!noteReady) {
      return;
    }

    const finalAverage = noteAverage;

    setProgress((current) =>
      addPdEntry(
        saveScenarioRun(current, {
          id: `${scenario.id}-${Date.now()}`,
          scenarioId: scenario.id,
          startedAtIso: new Date().toISOString(),
          completedAtIso: new Date().toISOString(),
          stepChoices: runChoices,
          escalationNote: escalationNote.trim(),
          noteScores,
          noteAverage: finalAverage,
          completed: true
        }),
        {
          id: `pd-scenario-${scenario.id}-${Date.now()}`,
          createdAtIso: new Date().toISOString(),
          type: 'scenario',
          title: `Scenario complete: ${scenario.title}`,
          minutes: scenario.estimatedMinutes,
          moduleIds: scenario.recommendedModuleIds,
          scenarioIds: [scenario.id],
          evidenceSummary: `Completed a scenario run and recorded a note score of ${Math.round((finalAverage / 2) * 100)}%.`,
          reflection: undefined,
          privacyChecked: true
        }
      )
    );
    setSavedNoteAverage(finalAverage);
    setNoteSubmitted(true);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Scenario lab</div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              Scenario-based practice for DCS IT support
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Use structured scenarios to review incident handling, decision sequencing, escalation boundaries, and
              documentation standards for common DCS support situations.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-100 px-5 py-4 text-sm text-slate-700">
            {completedScenarios} scenario exercises recorded.
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="space-y-4">
          {scenarios.map((entry) => (
            <button
              key={entry.id}
              onClick={() => restartScenario(entry.id)}
              className={`w-full rounded-[2rem] border p-5 text-left shadow-sm ${
                entry.id === scenario.id
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-800'
              }`}
            >
              <div className="text-xs uppercase tracking-[0.2em] opacity-70">{entry.estimatedMinutes} min</div>
              <div className="mt-3 text-xl font-semibold">{entry.title}</div>
              <p className="mt-2 text-sm leading-6 opacity-80">{entry.summary}</p>
            </button>
          ))}
        </aside>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          {!finished ? (
            <div className="space-y-6">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{scenario.title}</div>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">{scenario.initialReport}</h2>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {scenario.contextBullets.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl bg-slate-50 p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Step {stepIndex + 1} of {scenario.steps.length}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">{currentStep?.title}</h3>
                {currentStep?.newInformation ? (
                  <p className="mt-3 text-sm leading-7 text-slate-700">{currentStep.newInformation}</p>
                ) : null}
                <p className="mt-3 text-sm leading-7 text-slate-700">{currentStep?.prompt}</p>
              </div>

              <div className="space-y-3">
                {currentStep?.choices.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => handleChoice(choice)}
                    className={`w-full rounded-3xl border p-5 text-left ${
                      revealedChoice?.id === choice.id
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-white text-slate-800'
                    }`}
                  >
                    {choice.label}
                  </button>
                ))}
              </div>

              {revealedChoice ? (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-sm font-semibold text-slate-900">Outcome</div>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{revealedChoice.outcome}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    <span className="font-semibold text-slate-900">Risk note:</span> {revealedChoice.riskNote}
                  </p>
                  <button
                    onClick={saveChoiceAndContinue}
                    className="mt-4 rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
                  >
                    {stepIndex === scenario.steps.length - 1 ? 'Complete scenario' : 'Continue'}
                  </button>
                </div>
              ) : null}
            </div>
          ) : !noteSubmitted ? (
            <div className="space-y-6">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Jira-style note</div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{scenario.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Finish the scenario by writing the escalation note you would want the next person to read.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-50 p-5">
                <div className="font-semibold text-slate-900">Prompt</div>
                <p className="mt-3 text-sm leading-7 text-slate-700">{scenario.jiraNotePrompt}</p>
              </div>

              <textarea
                value={escalationNote}
                onChange={(event) => setEscalationNote(event.target.value)}
                className="min-h-40 rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-slate-900"
                placeholder="Write the Jira-style escalation note here."
              />

              <AiCoachPanel
                input={{
                  contextType: 'ticket-note',
                  scenarioId: scenario.id,
                  moduleId: scenario.recommendedModuleIds?.[0],
                  prompt: scenario.jiraNotePrompt,
                  userAnswer: escalationNote,
                  modelAnswer: scenario.ticketNoteExample,
                  rubric: scenario.noteRubric.map((item) => `${item.label}: ${item.description}`),
                  extraContext: `Scenario: ${scenario.title}\nRisk note: ${scenario.riskNote}`
                }}
                debounceMs={900}
                minChars={120}
              />

              <div className="grid gap-4 md:grid-cols-2">
                {scenario.noteRubric.map((criterion) => (
                  <div key={criterion.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="font-semibold text-slate-900">{criterion.label}</div>
                    <p className="mt-2 text-sm text-slate-600">{criterion.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {[
                        [0, 'Not there'],
                        [1, 'Partly there'],
                        [2, 'Strong']
                      ].map(([value, label]) => (
                        <button
                          key={`${criterion.id}-${value}`}
                          onClick={() =>
                            setNoteScores((current) => ({
                              ...current,
                              [criterion.id]: Number(value)
                            }))
                          }
                          className={`rounded-full px-3 py-1 text-xs ${
                            noteScores[criterion.id] === value
                              ? 'bg-slate-900 text-white'
                              : 'border border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-700">
                Current note score: {Math.round((noteAverage / 2) * 100)}%
              </div>

              <button
                onClick={submitScenarioNote}
                disabled={!noteReady}
                className={`rounded-full px-4 py-2 text-sm ${
                  noteReady ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-500'
                }`}
              >
                Save note and complete scenario
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Scenario complete</div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{scenario.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Compare your response with the recommended workflow and confirm that the escalation note remains
                  clear, concise, and appropriate for operational review.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-50 p-5">
                <div className="font-semibold text-slate-900">Ideal troubleshooting path</div>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {scenario.idealTroubleshootingPath.map((step) => (
                    <li key={step}>- {step}</li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <div className="font-semibold text-slate-900">Escalation point</div>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{scenario.escalationPoint}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <div className="font-semibold text-slate-900">Risk or privacy note</div>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{scenario.riskNote}</p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <div className="font-semibold text-slate-900">Ticket note example</div>
                <p className="mt-3 text-sm leading-7 text-slate-700">{scenario.ticketNoteExample}</p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <div className="font-semibold text-slate-900">Your Jira-style note</div>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">{escalationNote}</p>
                <p className="mt-3 text-sm text-slate-600">
                  Rubric score:{' '}
                  {savedNoteAverage === null ? 'Not scored' : `${Math.round((savedNoteAverage / 2) * 100)}%`}
                </p>
              </div>

              <button onClick={() => restartScenario()} className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white">
                Restart scenario
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
