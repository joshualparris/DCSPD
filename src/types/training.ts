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
  scenarioPrompts: ScenarioPrompt[];
  practicalOutputs: PracticalOutput[];
};
