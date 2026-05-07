export type AcademicTrack = "RBC" | "SMITB";

export type AcademicProvider = "La Trobe" | "RMIT" | "Other";

export type AcademicLevel = "foundation" | "undergraduate" | "masters";

export type AcademicStream =
  | "foundations"
  | "programming"
  | "systems"
  | "networking"
  | "cybersecurity"
  | "data"
  | "ai"
  | "cloud"
  | "professional-practice";

export type AcademicSourceStatus = "canonical" | "duplicate" | "manual-check" | "placeholder";

export type AcademicResourceKind =
  | "official-docs"
  | "course"
  | "video"
  | "youtube-channel"
  | "pdf"
  | "book"
  | "tool";

export type AcademicSubject = {
  id: string;
  code: string;
  title: string;
  provider: AcademicProvider;
  track: AcademicTrack;
  level: AcademicLevel;
  stream: AcademicStream;
  yearLevel?: string;
  sourceType: "SLG" | "Study Plan" | "Manual";
  sourceFileName?: string;
  sourceStatus: AcademicSourceStatus;
  localSources?: AcademicSource[];
  summary: string;
  topics: AcademicTopic[];
  silos: AcademicSilo[];
  dcsBridges: DcsBridge[];
  weeklyModules?: AcademicWeeklyModule[];
  learningModes: AcademicLearningMode[];
  practicalTasks: AcademicPracticalTask[];
  resources: AcademicResource[];
  finalChallenge: AcademicFinalChallenge;
  certificationLinks?: CertificationBridge[];
  recommendedNextAction?: string;
  implementationPriority?: number;
};

export type AcademicSilo = {
  id: string;
  number: number;
  text: string;
  plainEnglish: string;
  masteryCriteria: string[];
  practicePrompts: string[];
  quizItems: string[];
};

export type AcademicSource = {
  id: string;
  fileName: string;
  path?: string;
  status: AcademicSourceStatus;
  note?: string;
};

export type AcademicTopic = {
  id: string;
  title: string;
  dcsConnection: string;
};

export type AcademicInternalLink = {
  id: string;
  label: string;
  href: string;
  why: string;
};

export type AcademicAssessmentKind =
  | "quick-check"
  | "coding-exercise"
  | "applied-task"
  | "reflection"
  | "rubric";

export type AcademicAssessmentItem = {
  id: string;
  title: string;
  kind: AcademicAssessmentKind;
  prompt: string;
  successCriteria: string[];
  siloIds: string[];
  minutes: number;
  evidenceType: AcademicPracticalTask["evidenceType"];
  dcsApplication: string;
};

export type AcademicWeeklyModule = {
  id: string;
  week: number;
  session?: number;
  title: string;
  dateIso?: string;
  contactHours?: number;
  deliveryModes: string[];
  overview: string;
  siloIds: string[];
  dcsConnections: string[];
  internalLinks: AcademicInternalLink[];
  resources: AcademicResource[];
  assessments: AcademicAssessmentItem[];
};

export type DcsBridge = {
  id: string;
  dcsArea:
    | "DCS Level 1 Support"
    | "School Platforms"
    | "Networking"
    | "Cybersecurity"
    | "Programming / Automation"
    | "Data / Reporting"
    | "AI / Data Science"
    | "Cloud / DevOps"
    | "M365 / Cloud"
    | "Professional Practice";
  relevance: "high" | "medium" | "low";
  explanation: string;
  relatedDcsModuleIds: string[];
  practicalOutput?: string;
};

export type AcademicLearningMode = {
  id: "diagnose" | "learn" | "retrieve" | "apply" | "prove";
  label: string;
  action: string;
};

export type AcademicPracticalTask = {
  id: string;
  title: string;
  description: string;
  evidenceType: "checklist" | "script" | "diagram" | "case-note" | "data-report" | "prototype" | "reflection";
  privacyReminder: string;
};

export type AcademicResource = {
  id: string;
  title: string;
  url: string;
  kind: AcademicResourceKind;
  why: string;
};

export type AcademicFinalChallenge = {
  title: string;
  brief: string;
  evidence: string;
};

export type CertificationBridge = {
  id: string;
  certification: string;
  relevance: "high" | "medium" | "low";
  explanation: string;
};
