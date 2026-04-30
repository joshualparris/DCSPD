export type ScenarioChoice = {
  id: string;
  label: string;
  outcome: string;
  riskNote: string;
  correct?: boolean;
};

export type ScenarioStep = {
  id: string;
  title: string;
  prompt: string;
  newInformation?: string;
  choices: ScenarioChoice[];
  recommendedChoiceId: string;
};

export type Scenario = {
  id: string;
  title: string;
  summary: string;
  focus: string[];
  estimatedMinutes: number;
  initialReport: string;
  contextBullets: string[];
  steps: ScenarioStep[];
  idealTroubleshootingPath: string[];
  escalationPoint: string;
  ticketNoteExample: string;
  riskNote: string;
  recommendedModuleIds: string[];
};

export type ScenarioRunChoice = {
  stepId: string;
  choiceId: string;
  correct: boolean;
};

export type ScenarioRun = {
  id: string;
  scenarioId: string;
  startedAtIso: string;
  completedAtIso?: string;
  stepChoices: ScenarioRunChoice[];
  completed: boolean;
};
