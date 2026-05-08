export type StudyRecommendationAction =
  | 'review-flashcards'
  | 'complete-module'
  | 'attempt-quiz'
  | 'scenario-lab'
  | 'roleplay'
  | 'write-ticket-note'
  | 'repair-pack'
  | 'academic-bridge'
  | 'practical-output';

export type StudyRecommendation = {
  id: string;
  title: string;
  reason: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedMinutes: number;
  actionType: StudyRecommendationAction;
  targetId?: string;
  weakTopic?: string;
  route: string;
};

export type StudyQueue = {
  recommendations: StudyRecommendation[];
  totalMinutes: number;
  whyItMatters: string;
};
