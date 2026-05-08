"use client";

import { useEffect, useMemo, useState } from 'react';
import AiRoleplayChat from '../../../src/components/ai/AiRoleplayChat';
import { roleplayScenarios as baseScenarios } from '../../../src/data/roleplayScenarios';
import { getCustomRoleplays } from '../../../src/lib/customModules';

const pressureStyles = {
  Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Medium: 'bg-blue-50 text-blue-700 border-blue-200',
  High: 'bg-amber-50 text-amber-700 border-amber-200',
  Critical: 'bg-rose-50 text-rose-700 border-rose-200'
};

export default function RoleplaySimulationPage() {
  const [customScenarios, setCustomScenarios] = useState<any[]>([]);
  const roleplayScenarios = useMemo(() => [...baseScenarios, ...customScenarios], [customScenarios]);
  const [selectedScenarioId, setSelectedScenarioId] = useState(roleplayScenarios[0].id);

  useEffect(() => {
    setCustomScenarios(getCustomRoleplays());
  }, []);

  const selectedScenario = roleplayScenarios.find((scenario) => scenario.id === selectedScenarioId) || roleplayScenarios[0];
  const level1Scenarios = roleplayScenarios.filter((scenario) => (scenario.tier || 'Level 1') === 'Level 1');
  const level2Scenarios = roleplayScenarios.filter((scenario) => scenario.tier === 'Level 2');
  const customRoleplays = roleplayScenarios.filter((scenario) => customScenarios.some(c => c.id === scenario.id));

  const scenarioSections = [
    {
      id: 'custom',
      title: 'Custom Roleplays',
      description: 'Uploaded by you via settings.',
      scenarios: customRoleplays
    },
    {
      id: 'level-1',
      title: 'Level 1 front-line support',
      description: 'Staff, parent, classroom, AV, account, printer, and Wi-Fi conversations.',
      scenarios: level1Scenarios.filter(s => !customScenarios.some(c => c.id === s.id))
    },
    {
      id: 'level-2',
      title: 'Level 2 delegated systems work',
      description: 'Manager-delegated workflows for identity, MDM, deployment, records, security, and fleet systems.',
      scenarios: level2Scenarios.filter(s => !customScenarios.some(c => c.id === s.id))
    }
  ].filter(s => s.scenarios.length > 0);

  const scenarioPrompt = useMemo(
    () =>
      [
        `Roleplay tier: ${selectedScenario.tier || 'Level 1'}.`,
        `Issue: ${selectedScenario.issueTitle}`,
        `Persona style: ${selectedScenario.persona}, ${selectedScenario.archetype}.`,
        selectedScenario.managerDelegation ? `Manager delegation: ${selectedScenario.managerDelegation}` : '',
        `Situation: ${selectedScenario.scenario}`,
        selectedScenario.workflow ? `Expected workflow: ${selectedScenario.workflow}` : '',
        selectedScenario.challenge ? `Challenge: ${selectedScenario.challenge}` : '',
        `IT challenge: ${selectedScenario.itChallenge}`,
        `Pressure level: ${selectedScenario.pressure}.`,
        `Coaching focus: ${selectedScenario.focus.join(', ')}.`,
        'Privacy rule: do not ask for or repeat real student names, parent names, staff personal details, passwords, credentials, internal URLs, IP addresses, device serials, or confidential incident content.',
        'Stay in character. Do not reveal the IT challenge notes directly unless the user earns that information through good questions.'
      ]
        .filter(Boolean)
        .join('\n'),
    [selectedScenario]
  );

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Soft Skills Simulation</div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">AI Roleplay Bot</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Practice de-escalation, empathy, technical clarity, and safe escalation with realistic K-12 school IT
              support personas.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-100 px-5 py-4 text-sm text-slate-700">
            <span className="font-semibold text-slate-900">{roleplayScenarios.length}</span> roleplay scenarios available
            <span className="mx-2 text-slate-400">|</span>
            <span className="font-semibold text-slate-900">{level2Scenarios.length}</span> Level 2
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Select a scenario</div>
            <div className="mt-4 max-h-[680px] space-y-3 overflow-y-auto pr-1">
              {scenarioSections.map((section) => (
                <div key={section.id} className="space-y-3">
                  <div className="px-1 pt-2">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500">{section.title}</div>
                    <p className="mt-1 text-[11px] leading-5 text-slate-500">{section.description}</p>
                  </div>

                  {section.scenarios.map((scenario) => (
                    <button
                      key={scenario.id}
                      onClick={() => setSelectedScenarioId(scenario.id)}
                      className={`w-full rounded-3xl border p-4 text-left transition ${
                        scenario.id === selectedScenarioId
                          ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                          : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-bold">{scenario.persona}</div>
                          <div className="mt-1 text-xs opacity-70">{scenario.archetype}</div>
                        </div>
                        <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold ${(pressureStyles as any)[scenario.pressure]}`}>
                          {scenario.pressure}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full border border-current/20 px-2 py-0.5 text-[10px] font-bold">
                          {scenario.tier || 'Level 1'}
                        </span>
                      </div>
                      <div className="mt-3 text-sm font-semibold">{scenario.issueTitle}</div>
                      <p className="mt-2 text-xs leading-5 opacity-75 line-clamp-3">
                        {scenario.managerDelegation || scenario.scenario}
                      </p>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-700">Coaching Focus</h4>
            <ul className="mt-3 space-y-2 text-[11px] font-medium text-indigo-800">
              <li>- Acknowledge the pressure first</li>
              <li>- Ask one useful scope question</li>
              <li>- Give a clear next step or workaround</li>
              <li>- Keep private details out of this app</li>
            </ul>
          </div>
        </aside>

        <div className="space-y-5">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {(selectedScenario.tier || 'Level 1')} - {selectedScenario.persona} - {selectedScenario.archetype}
                </div>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">{selectedScenario.issueTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{selectedScenario.scenario}</p>
              </div>
              <span className={`w-fit rounded-full border px-3 py-1 text-xs font-bold ${(pressureStyles as any)[selectedScenario.pressure]}`}>
                {selectedScenario.pressure} pressure
              </span>
            </div>

            {selectedScenario.managerDelegation ? (
              <div className="mt-5 rounded-3xl border border-blue-100 bg-blue-50 p-5">
                <div className="text-xs font-bold uppercase tracking-widest text-blue-700">Manager delegation</div>
                <p className="mt-2 text-sm leading-6 text-blue-900">&quot;{selectedScenario.managerDelegation}&quot;</p>
              </div>
            ) : null}

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">IT challenge</div>
                <p className="mt-2 text-sm leading-6 text-slate-700">{selectedScenario.itChallenge}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Opening line</div>
                <p className="mt-2 text-sm leading-6 text-slate-700">&quot;{selectedScenario.initialPrompt}&quot;</p>
              </div>
            </div>

            {selectedScenario.workflow || selectedScenario.challenge ? (
              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                {selectedScenario.workflow ? (
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Expected workflow</div>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{selectedScenario.workflow}</p>
                  </div>
                ) : null}
                {selectedScenario.challenge ? (
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Scenario challenge</div>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{selectedScenario.challenge}</p>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="mt-5 flex flex-wrap gap-2">
              {selectedScenario.focus.map((focus: string) => (
                <span key={focus} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                  {focus}
                </span>
              ))}
            </div>
          </section>

          <AiRoleplayChat
            key={selectedScenario.id}
            persona={`${selectedScenario.persona} (${selectedScenario.archetype})`}
            scenario={scenarioPrompt}
            initialPrompt={selectedScenario.initialPrompt}
          />
        </div>
      </div>
    </div>
  );
}
