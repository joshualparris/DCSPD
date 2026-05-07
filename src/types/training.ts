import type { AssessmentQuestion } from './assessment';

export type ModuleLevel = 'A+' | 'L1' | 'L2' | 'IT Manager' | 'DCS Context';

export type ModuleDomain =
  | 'Foundations'
  | 'Networking'
  | 'Endpoint Support'
  | 'Identity and Access'
  | 'Cloud and Platforms'
  | 'Operations';

export type Section = {
  id: string;
  title: string;
  bodyMarkdown: string;
  takeaway?: string;
};

export type Flashcard = {
  id: string;
  front: string;
  back: string;
};

export type DiagnosticQuestion = {
  id: string;
  prompt: string;
  expectedFocus: string;
};

export type ScenarioPrompt = {
  id: string;
  title: string;
  prompt: string;
};

export type PracticalOutput = {
  id: string;
  title: string;
  description: string;
};

export type StudyPrompt = {
  id: string;
  title: string;
  prompt: string;
  supportText?: string;
};

export type ConceptSortBucket = {
  id: string;
  label: string;
  description?: string;
};

export type ConceptSortExercise = {
  id: string;
  title: string;
  prompt: string;
  cards: string[];
  buckets: ConceptSortBucket[];
  modelGroups: string[];
};

export type MemoryPrompt = {
  id: string;
  title: string;
  prompt: string;
  mnemonicHint?: string;
};

export type SafePromptWorkflow = {
  id: string;
  title: string;
  goal: string;
  steps: string[];
  examplePrompt: string;
  privacyReminder: string;
};

export type ModulePattern = {
  diagnosticQuestions: DiagnosticQuestion[];
  explainBackPrompt: StudyPrompt;
  conceptSortExercise?: ConceptSortExercise;
  memoryPrompt?: MemoryPrompt;
  cornellPrompt: StudyPrompt;
  sq3rPrompt: StudyPrompt;
  safePromptWorkflow?: SafePromptWorkflow;
};

export type TrainingModule = {
  id: string;
  title: string;
  description: string;
  domain: ModuleDomain;
  level: ModuleLevel;
  estimatedMinutes: number;
  tags: string[];
  learningObjectives: string[];
  dcsRelevance: string[];
  sections: Section[];
  flashcards: Flashcard[];
  quiz: AssessmentQuestion[];
  modulePattern: ModulePattern;
  scenarioPrompts: ScenarioPrompt[];
  practicalOutputs: PracticalOutput[];
};
