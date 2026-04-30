export type ConfidenceLevel = 1 | 2 | 3;

export type WeakTopicKey =
  | 'ports-protocols'
  | 'dns-dhcp-gateway'
  | 'vlan-firewall-rules'
  | 'network-services'
  | 'wireless-networks'
  | 'network-tools-devices'
  | 'laptop-mobile-hardware'
  | 'display-cables-connectors'
  | 'memory-storage-raid'
  | 'motherboards-cpu-power-cooling'
  | 'printers-maintenance'
  | 'cloud-models'
  | 'virtualization'
  | 'hardware-troubleshooting'
  | 'network-troubleshooting'
  | 'offboarding-sequence'
  | 'mdm-group-policy'
  | 'printer-symptoms'
  | 'classroom-av'
  | 'ticket-quality'
  | 'security-risk-judgement'
  | 'parent-portal-workflows'
  | 'sentral-support'
  | 'schoolbox-workflows'
  | 'login-password-support'
  | 'permissions-access'
  | 'website-filtering'
  | 'onboarding-workflows'
  | 'teams-sharepoint-onedrive'
  | 'jamf-ipad-support';

export type AssessmentSource = 'strict-quiz' | 'module-quiz';

export type AssessmentDifficulty = 'foundation' | 'stretch' | 'challenge';

export type AssessmentOption = {
  id: string;
  label: string;
};

export type AssessmentQuestionType =
  | 'mcq'
  | 'short-answer'
  | 'order-steps'
  | 'scenario-response'
  | 'categorization';

export type BaseAssessmentQuestion = {
  id: string;
  type: AssessmentQuestionType;
  prompt: string;
  domain: string;
  difficulty: AssessmentDifficulty;
  explanation: string;
  modelAnswer: string;
  commonMistakes: string[];
  dcsContext: string;
  reviewSchedule: string;
  recommendedModuleId: string;
  weakTopic: WeakTopicKey;
};

export type MCQAssessmentQuestion = BaseAssessmentQuestion & {
  type: 'mcq';
  options: AssessmentOption[];
  correctOptionId: string;
};

export type ShortAnswerAssessmentQuestion = BaseAssessmentQuestion & {
  type: 'short-answer';
  rubric: string[];
  keywordHints: string[];
};

export type OrderStepsAssessmentQuestion = BaseAssessmentQuestion & {
  type: 'order-steps';
  steps: AssessmentOption[];
  correctOrder: string[];
  rubric: string[];
};

export type ScenarioResponseAssessmentQuestion = BaseAssessmentQuestion & {
  type: 'scenario-response';
  rubric: string[];
};

export type CategorizationAssessmentItem = {
  id: string;
  label: string;
  correctCategoryId: string;
};

export type CategorizationAssessmentQuestion = BaseAssessmentQuestion & {
  type: 'categorization';
  categories: AssessmentOption[];
  items: CategorizationAssessmentItem[];
  rubric: string[];
};

export type AssessmentQuestion =
  | MCQAssessmentQuestion
  | ShortAnswerAssessmentQuestion
  | OrderStepsAssessmentQuestion
  | ScenarioResponseAssessmentQuestion
  | CategorizationAssessmentQuestion;

export type SelfRatingBand = 0 | 1 | 2;

export type AssessmentResponse = {
  questionId: string;
  confidence: ConfidenceLevel;
  selectedOptionId?: string;
  answerText?: string;
  orderedStepIds?: string[];
  categorizedItems?: Record<string, string>;
  reasoning: string;
  judgement: string;
};

export type AssessmentSelfRating = {
  correctness: SelfRatingBand;
  reasoning: SelfRatingBand;
  judgement: SelfRatingBand;
};

export type AssessmentScoreBreakdown = {
  correctness: number;
  reasoning: number;
  judgement: number;
  total: number;
  autoMarked: boolean;
};

export type AssessmentFeedback = {
  correctness: string;
  reasoning: string;
  judgement: string;
  correctedConcept: string;
  nextReviewDateIso: string;
};

export type AssessmentAttempt = {
  id: string;
  questionId: string;
  questionType: AssessmentQuestion['type'];
  prompt: string;
  domain: string;
  weakTopic: WeakTopicKey;
  recommendedModuleId: string;
  source: AssessmentSource;
  confidence: ConfidenceLevel;
  answerSummary: string;
  reasoningSummary: string;
  judgementSummary: string;
  selfRating: AssessmentSelfRating;
  scoreBreakdown: AssessmentScoreBreakdown;
  feedback: AssessmentFeedback;
  timestampIso: string;
  shouldRevisit: boolean;
  nextReviewDateIso: string;
};
