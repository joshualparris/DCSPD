"use client";

import { useEffect, useMemo, useState } from 'react';
import { scenarios as baseScenarios } from '../../src/data/scenarios';
import AiCoachPanel from '../../src/components/ai/AiCoachPanel';
import AiNoteGenerator from '../../src/components/ai/AiNoteGenerator';
import { getCustomScenarios } from '../../src/lib/customModules';
import {
  addPdEntry,
  getInitialProgressSnapshot,
  getStoredProgressSnapshot,
  saveProgress,
  saveScenarioRun,
  type UserProgress
} from '../../src/lib/progress';
import type { ScenarioChoice, ScenarioRunChoice } from '../../src/types/scenarios';

import { gradeRubric } from '../../src/lib/rubricGrader';
import type { RubricGrade } from '../../src/types/grading';
import { 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  MessageSquare, 
  ShieldCheck, 
  Target, 
  XCircle,
  BarChart3,
  Award
} from 'lucide-react';

export default function ScenariosPage() {
  const [customScenarios, setCustomScenarios] = useState<any[]>([]);
  const scenarios = useMemo(() => [...baseScenarios, ...customScenarios], [customScenarios]);
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
  const [rubricGrade, setRubricGrade] = useState<RubricGrade | null>(null);

  useEffect(() => {
    setProgress(getStoredProgressSnapshot());
    setCustomScenarios(getCustomScenarios());
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

    // Automatic Deterministic Grading
    const grade = gradeRubric({
      text: escalationNote,
      rubric: scenario.noteRubric.map(r => ({ id: r.id, label: r.label, description: r.description })),
      context: scenario.title
    });
    setRubricGrade(grade);

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
          completed: true,
          rubricGrade: grade
        }),
        {
          id: `pd-scenario-${scenario.id}-${Date.now()}`,
          createdAtIso: new Date().toISOString(),
          type: 'scenario',
          title: `Scenario complete: ${scenario.title}`,
          minutes: scenario.estimatedMinutes,
          moduleIds: scenario.recommendedModuleIds,
          scenarioIds: [scenario.id],
          evidenceSummary: `Completed a scenario run and recorded a note score of ${Math.round((finalAverage / 2) * 100)}%. Grade level: ${grade.level}.`,
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

              <AiNoteGenerator
                scenarioTitle={scenario.title}
                initialReport={scenario.initialReport}
                userChoices={runChoices.map(c => {
                  const step = scenario.steps.find(s => s.id === c.stepId);
                  const choice = step?.choices.find(ch => ch.id === c.choiceId);
                  return `${step?.title}: ${choice?.label}`;
                })}
                draftNote={escalationNote}
                onNoteGenerated={(note) => setEscalationNote(note)}
              />

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
              </div>

              {rubricGrade && (
                <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-rose-600">
                      <Award size={24} />
                      <h2 className="text-xl font-bold text-slate-900">Note Analysis</h2>
                    </div>
                    <div className={`rounded-full px-4 py-1 text-sm font-bold uppercase tracking-widest ${
                      rubricGrade.level === 'excellent' ? 'bg-emerald-100 text-emerald-700' :
                      rubricGrade.level === 'strong' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {rubricGrade.level}
                    </div>
                  </div>

                  <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Strengths</h4>
                      <ul className="mt-3 space-y-2">
                        {rubricGrade.strengths.map((s, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                            <CheckCircle2 size={16} className="text-emerald-500" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Areas for Growth</h4>
                      <ul className="mt-3 space-y-2">
                        {rubricGrade.missing.map((m, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-slate-500">
                            <AlertCircle size={16} className="text-amber-500" />
                            {m}
                          </li>
                        ))}
                        {rubricGrade.missing.length === 0 && (
                          <li className="text-sm text-slate-400 italic">No missing criteria identified.</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {rubricGrade.privacyFlags.length > 0 && (
                    <div className="mt-8 rounded-2xl bg-rose-50 p-4 border border-rose-100 flex gap-3">
                      <ShieldCheck size={20} className="text-rose-600 shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-rose-900 uppercase tracking-tight">Privacy Caution</div>
                        <p className="mt-1 text-xs text-rose-800">
                          We detected potential sensitive data in your note: <span className="font-mono font-bold">{rubricGrade.privacyFlags.join(', ')}</span>.
                          Always ensure student names and credentials are redacted before saving to a real Jira ticket.
                        </p>
                      </div>
                    </div>
                  )}

                  {rubricGrade.escalationFeedback.length > 0 && (
                    <div className="mt-4 rounded-2xl bg-blue-50 p-4 border border-blue-100 flex gap-3">
                      <Target size={20} className="text-blue-600 shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-blue-900 uppercase tracking-tight">Escalation Advice</div>
                        <p className="mt-1 text-xs text-blue-800">
                          {rubricGrade.escalationFeedback[0]}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button onClick={() => restartScenario()} className="rounded-full bg-slate-900 px-8 py-3 text-sm font-bold text-white hover:bg-slate-800 transition-all">
                Restart scenario
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
