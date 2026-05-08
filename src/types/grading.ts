export type RubricGradeLevel = 'needs-work' | 'developing' | 'competent' | 'strong' | 'excellent';

export type CriterionResult = {
  criterionId: string;
  label: string;
  met: boolean;
  pointsAwarded: number;
  pointsPossible: number;
  feedback: string;
};

export type RubricGrade = {
  score: number;
  maxScore: number;
  percentage: number;
  level: RubricGradeLevel;
  strengths: string[];
  missing: string[];
  privacyFlags: string[];
  escalationFeedback: string[];
  improvedExample?: string;
  criteriaResults: CriterionResult[];
};

export type GradingInput = {
  text: string;
  rubric: string[] | { id: string; label: string; description: string }[];
  keywordHints?: string[];
  context?: string;
};
