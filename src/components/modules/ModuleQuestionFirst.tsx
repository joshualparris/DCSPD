"use client";

import { useState } from 'react';
import type { TrainingModule } from '../../types/training';

type ModuleQuestionFirstProps = {
  moduleData: TrainingModule;
};

function PromptCard({
  title,
  prompt,
  supportText
}: {
  title: string;
  prompt: string;
  supportText?: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <p className="mt-3 text-sm leading-7 text-slate-700">{prompt}</p>
      {supportText ? <p className="mt-3 text-sm text-slate-600">{supportText}</p> : null}
    </div>
  );
}

export default function ModuleQuestionFirst({ moduleData }: ModuleQuestionFirstProps) {
  const exercise = moduleData.modulePattern.conceptSortExercise;
  const [selections, setSelections] = useState<Record<string, string>>(
    exercise ? Object.fromEntries(exercise.cards.map((card) => [card, ''])) : {}
  );

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Questions first</div>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">Start with recall before reading</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Use the prompts below before opening the reference notes. The goal is to surface what you already know,
            where your gaps are, and what kind of support judgement this topic actually needs at DCS.
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-semibold text-slate-900">Diagnostic questions</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {moduleData.modulePattern.diagnosticQuestions.map((question) => (
            <div key={question.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm font-semibold text-slate-900">{question.prompt}</div>
              <p className="mt-3 text-sm text-slate-600">What good answers should include: {question.expectedFocus}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <PromptCard
          title={moduleData.modulePattern.explainBackPrompt.title}
          prompt={moduleData.modulePattern.explainBackPrompt.prompt}
          supportText={moduleData.modulePattern.explainBackPrompt.supportText}
        />
        <PromptCard
          title={moduleData.modulePattern.cornellPrompt.title}
          prompt={moduleData.modulePattern.cornellPrompt.prompt}
          supportText={moduleData.modulePattern.cornellPrompt.supportText}
        />
        <PromptCard
          title={moduleData.modulePattern.sq3rPrompt.title}
          prompt={moduleData.modulePattern.sq3rPrompt.prompt}
          supportText={moduleData.modulePattern.sq3rPrompt.supportText}
        />
        {moduleData.modulePattern.memoryPrompt ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-sm font-semibold text-slate-900">{moduleData.modulePattern.memoryPrompt.title}</div>
            <p className="mt-3 text-sm leading-7 text-slate-700">{moduleData.modulePattern.memoryPrompt.prompt}</p>
            {moduleData.modulePattern.memoryPrompt.mnemonicHint ? (
              <p className="mt-3 text-sm text-slate-600">
                Memory hint: {moduleData.modulePattern.memoryPrompt.mnemonicHint}
              </p>
            ) : null}
          </div>
        ) : null}
      </section>

      {exercise ? (
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-semibold text-slate-900">{exercise.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{exercise.prompt}</p>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_280px]">
            <div className="space-y-3">
              {exercise.cards.map((card) => (
                <label key={card} className="grid gap-2 rounded-3xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_220px]">
                  <span className="text-sm text-slate-800">{card}</span>
                  <select
                    value={selections[card] || ''}
                    onChange={(event) =>
                      setSelections((current) => ({
                        ...current,
                        [card]: event.target.value
                      }))
                    }
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
                  >
                    <option value="">Sort into a bucket</option>
                    {exercise.buckets.map((bucket) => (
                      <option key={bucket.id} value={bucket.id}>
                        {bucket.label}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>

            <div className="rounded-3xl bg-slate-50 p-5">
              <div className="text-sm font-semibold text-slate-900">Model grouping cues</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {exercise.modelGroups.map((group) => (
                  <li key={group}>- {group}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      {moduleData.modulePattern.safePromptWorkflow ? (
        <section className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Safe prompt workflow</div>
          <h3 className="mt-3 text-2xl font-semibold text-emerald-950">
            {moduleData.modulePattern.safePromptWorkflow.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-emerald-900">
            Goal: {moduleData.modulePattern.safePromptWorkflow.goal}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-emerald-900">
            {moduleData.modulePattern.safePromptWorkflow.steps.map((step) => (
              <li key={step}>- {step}</li>
            ))}
          </ul>
          <div className="mt-4 rounded-3xl bg-white p-4 text-sm text-slate-700">
            <div className="font-semibold text-slate-900">Example safe prompt</div>
            <p className="mt-2">{moduleData.modulePattern.safePromptWorkflow.examplePrompt}</p>
          </div>
          <p className="mt-4 text-sm text-emerald-900">
            Privacy reminder: {moduleData.modulePattern.safePromptWorkflow.privacyReminder}
          </p>
        </section>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-semibold text-slate-900">Scenario preview</h3>
          <div className="mt-4 space-y-3">
            {moduleData.scenarioPrompts.map((prompt) => (
              <div key={prompt.id} className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                <div className="font-semibold text-slate-900">{prompt.title}</div>
                <p className="mt-2">{prompt.prompt}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-semibold text-slate-900">Practical output target</h3>
          <div className="mt-4 space-y-3">
            {moduleData.practicalOutputs.map((output) => (
              <div key={output.id} className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                <div className="font-semibold text-slate-900">{output.title}</div>
                <p className="mt-2">{output.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
