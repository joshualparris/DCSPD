import { RubricGrade } from '../../types/grading';

export type AiCoachInput = {
  contextType: 'scenario' | 'ticket-note' | 'short-answer' | 'practical-output' | 'freeform';
  moduleId?: string;
  scenarioId?: string;
  prompt?: string;
  userAnswer: string;
  modelAnswer?: string;
  rubric?: string[];
  weakTopic?: string;
  extraContext?: string;
  redactionSummary?: string;
};

export type AiCoachFeedback = {
  score: number;
  strengths: string[];
  missing: string[];
  riskNotes: string[];
  betterAnswer: string;
  nextPractice: string;
  rubricGrade?: RubricGrade;
};

