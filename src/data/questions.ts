import type { AssessmentQuestion } from '../types/assessment';
import { modules } from './modules';

function mcq(question: Omit<Extract<AssessmentQuestion, { type: 'mcq' }>, 'type'>): AssessmentQuestion {
  return {
    type: 'mcq',
    ...question
  };
}

function shortAnswer(
  question: Omit<Extract<AssessmentQuestion, { type: 'short-answer' }>, 'type'>
): AssessmentQuestion {
  return {
    type: 'short-answer',
    ...question
  };
}

function orderSteps(
  question: Omit<Extract<AssessmentQuestion, { type: 'order-steps' }>, 'type'>
): AssessmentQuestion {
  return {
    type: 'order-steps',
    ...question
  };
}

function scenarioResponse(
  question: Omit<Extract<AssessmentQuestion, { type: 'scenario-response' }>, 'type'>
): AssessmentQuestion {
  return {
    type: 'scenario-response',
    ...question
  };
}

function categorization(
  question: Omit<Extract<AssessmentQuestion, { type: 'categorization' }>, 'type'>
): AssessmentQuestion {
  return {
    type: 'categorization',
    ...question
  };
}

const reviewSchedule = 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.';

const extraStrictQuestions: AssessmentQuestion[] = [
  mcq({
    id: 'strict-parent-portal-vs-records',
    prompt: 'A parent can sign in to the portal but says a family-detail amendment is not visible. Which first judgement is strongest?',
    domain: 'Mixed DCS workflow judgement',
    difficulty: 'stretch',
    explanation: 'Access success does not mean the records workflow is complete.',
    modelAnswer:
      'Treat it as a family-record or workflow-update issue first, capture the category and urgency, and route it to the right owner rather than treating it only as login failure.',
    commonMistakes: ['Collapsing all parent issues into password support', 'Ignoring workflow ownership'],
    dcsContext: 'Real DCS support often depends on routing the workflow correctly, not only spotting a technical symptom.',
    reviewSchedule,
    recommendedModuleId: 'parent-portal-details-updates',
    weakTopic: 'parent-portal-workflows',
    options: [
      { id: 'a', label: 'This is probably a records workflow issue rather than a pure login failure' },
      { id: 'b', label: 'The password must have expired' },
      { id: 'c', label: 'Delete the portal account immediately' },
      { id: 'd', label: 'Ignore the request because the parent can still sign in' }
    ],
    correctOptionId: 'a'
  }),
  orderSteps({
    id: 'strict-password-risk-shift',
    prompt: 'Order the safer response when a routine password reset starts to look suspicious.',
    domain: 'Mixed DCS workflow judgement',
    difficulty: 'challenge',
    explanation: 'The posture should shift once the risk picture changes.',
    modelAnswer:
      'Confirm the exact sign-in state, note the unusual prompt behaviour, stop treating it as routine only, then escalate through a security-aware path with no passwords collected.',
    commonMistakes: ['Continuing random resets despite risk signals', 'Skipping exact symptom capture'],
    dcsContext: 'Identity support at DCS often begins as routine and then turns risk-sensitive.',
    reviewSchedule,
    recommendedModuleId: 'login-and-password-support',
    weakTopic: 'login-password-support',
    steps: [
      { id: 'state', label: 'Confirm the exact sign-in state and account context' },
      { id: 'clue', label: 'Record the unusual prompt or risk clue clearly' },
      { id: 'shift', label: 'Treat the case as no longer routine only' },
      { id: 'route', label: 'Escalate through the approved risk-aware path' }
    ],
    correctOrder: ['state', 'clue', 'shift', 'route'],
    rubric: ['Confirms state first', 'Recognises risk shift', 'Escalates safely']
  }),
  scenarioResponse({
    id: 'strict-sentral-reporting-judgement',
    prompt:
      'A teacher says a Sentral class view is missing on the day marks are due. Explain why timing changes the note even if Josh still cannot fix the configuration himself.',
    domain: 'Mixed DCS workflow judgement',
    difficulty: 'challenge',
    explanation: 'Urgency shapes escalation quality even when authority does not change.',
    modelAnswer:
      'Timing changes the note because a narrow function issue can now block reporting work. Josh should capture the exact class or view, scope, deadline, and safe checks tried, then escalate quickly without pretending admin authority.',
    commonMistakes: ['Treating timing as irrelevant', 'Acting like urgency gives direct admin authority'],
    dcsContext: 'This is common during reporting spikes.',
    reviewSchedule,
    recommendedModuleId: 'sentral-support',
    weakTopic: 'sentral-support',
    rubric: ['Names timing impact', 'Captures exact function', 'Keeps authority boundaries clear']
  }),
  categorization({
    id: 'strict-ownership-sorting',
    prompt: 'Sort each support item into the best primary owner bucket.',
    domain: 'Mixed DCS workflow judgement',
    difficulty: 'challenge',
    explanation: 'Ownership classification is a core Level 1 skill.',
    modelAnswer:
      'Some work stays in Level 1 triage, some belongs to admin or workflow owners, and some needs senior ICT due to risk or production impact.',
    commonMistakes: ['Treating every workflow as ICT-owned', 'Ignoring admin or approver boundaries'],
    dcsContext: 'This skill prevents fake confidence and messy handoffs.',
    reviewSchedule,
    recommendedModuleId: 'dcs-it-support-foundations',
    weakTopic: 'ticket-quality',
    categories: [
      { id: 'l1', label: 'Level 1 triage' },
      { id: 'workflow', label: 'Admin or workflow owner' },
      { id: 'senior', label: 'Senior ICT or production owner' }
    ],
    items: [
      { id: 'display', label: 'Clarify picture versus audio symptom in a classroom', correctCategoryId: 'l1' },
      { id: 'medical', label: 'Urgent family medical-detail amendment request', correctCategoryId: 'workflow' },
      { id: 'filter', label: 'Approved review needed for a blocked educational site', correctCategoryId: 'workflow' },
      { id: 'firewall', label: 'Guest devices need a new path to internal services', correctCategoryId: 'senior' }
    ],
    rubric: ['Groups ownership accurately', 'Respects workflow boundaries', 'Protects production changes']
  }),
  shortAnswer({
    id: 'strict-kb-authoring',
    prompt:
      'What makes a repeated support theme ready to become a self-service article instead of staying only as repeated one-off notes?',
    domain: 'Support article authoring',
    difficulty: 'challenge',
    explanation: 'The app should teach support-quality outputs, not only quiz answers.',
    modelAnswer:
      'A good candidate is common, low-risk, teachable, and safe to explain without confidential detail. The article should reduce repeated requests by giving clear steps, boundaries, screenshots or wording only where appropriate, and a clean escalation path.',
    commonMistakes: ['Treating every internal workflow as safe to publish', 'Writing articles with no escalation boundary'],
    dcsContext: 'Repeated parent, password, or onboarding questions often make strong self-service content when written safely.',
    reviewSchedule,
    recommendedModuleId: 'ticket-notes-escalation-quality',
    weakTopic: 'ticket-quality',
    rubric: ['Names repetition or frequency', 'Mentions safety or privacy', 'Includes escalation boundary'],
    keywordHints: ['common', 'safe', 'steps', 'escalation']
  }),
  scenarioResponse({
    id: 'strict-access-request-create',
    prompt:
      'A new staff member can log in but lacks the Team, shared drive, and app needed today. Explain the strongest escalation note structure.',
    domain: 'Mixed DCS workflow judgement',
    difficulty: 'challenge',
    explanation: 'The best note separates what works from what is missing.',
    modelAnswer:
      'Name the role and day-one urgency, list the systems that work and the ones still missing, include any approval context, and keep the request specific so the owner can grant only the needed access.',
    commonMistakes: ['Writing only "new starter issue"', 'Skipping the exact missing resources'],
    dcsContext: 'Day-one access issues need specificity more than broad urgency language.',
    reviewSchedule,
    recommendedModuleId: 'new-user-onboarding',
    weakTopic: 'onboarding-workflows',
    rubric: ['Names role and urgency', 'Separates working from missing systems', 'Supports least privilege']
  }),
  mcq({
    id: 'strict-cloud-daas',
    prompt: 'Which option best fits a school that wants BYOD users to access a Windows-only application without supporting many local installs?',
    domain: 'Mixed DCS workflow judgement',
    difficulty: 'stretch',
    explanation: 'This is a DaaS-supportability question.',
    modelAnswer:
      'A hosted desktop or DaaS-style path may fit best because it centralises the application environment rather than depending on many local installs.',
    commonMistakes: ['Calling every cloud decision SaaS', 'Ignoring desktop-session design'],
    dcsContext: 'School supportability depends on device diversity and user experience together.',
    reviewSchedule,
    recommendedModuleId: 'cloud-models-saas-paas-iaas-daas',
    weakTopic: 'cloud-models',
    options: [
      { id: 'a', label: 'Hosted desktop or DaaS-style delivery' },
      { id: 'b', label: 'Assume every BYOD device should install locally' },
      { id: 'c', label: 'Guest Wi-Fi only' },
      { id: 'd', label: 'Password reset workflow' }
    ],
    correctOptionId: 'a'
  }),
  scenarioResponse({
    id: 'strict-filtering-article',
    prompt:
      'Explain how Josh would turn a recurring blocked-site request pattern into a safe self-service article topic without copying live request details.',
    domain: 'Support article authoring',
    difficulty: 'challenge',
    explanation: 'This combines workflow design and privacy discipline.',
    modelAnswer:
      'Abstract the common pattern into a guide that explains what evidence to capture, how to describe the educational need, expected lead time, and where the approved unblock review path sits. Remove live URLs, names, or confidential detail unless they are safe exemplars.',
    commonMistakes: ['Copying a real request verbatim', 'Leaving out approval or lead-time guidance'],
    dcsContext: 'Deflection content works best when it teaches the process and boundaries clearly.',
    reviewSchedule,
    recommendedModuleId: 'website-filtering-and-unblock-requests',
    weakTopic: 'website-filtering',
    rubric: ['Uses abstraction not copying', 'Includes evidence and workflow', 'Stays privacy-safe']
  }),
  orderSteps({
    id: 'strict-teams-sync-mix',
    prompt: 'Order the strongest first-line response when a faculty folder appears in the browser but not on the teacher laptop.',
    domain: 'Mixed DCS workflow judgement',
    difficulty: 'stretch',
    explanation: 'This mixes path clarity with sync reasoning.',
    modelAnswer:
      'Clarify the exact library or path, note that browser access works, confirm the local sync symptom, then escalate or route it as a likely sync-path issue if the problem persists.',
    commonMistakes: ['Treating it as broad access loss', 'Skipping the path and browser clues'],
    dcsContext: 'This is a common Teams/SharePoint/OneDrive support pattern.',
    reviewSchedule,
    recommendedModuleId: 'teams-sharepoint-onedrive-support',
    weakTopic: 'teams-sharepoint-onedrive',
    steps: [
      { id: 'path', label: 'Clarify the exact Team, site, or folder path' },
      { id: 'web', label: 'Record that the file appears in the browser view' },
      { id: 'local', label: 'Capture the local sync symptom on the laptop' },
      { id: 'route', label: 'Route it as a likely sync-path issue if it persists' }
    ],
    correctOrder: ['path', 'web', 'local', 'route'],
    rubric: ['Starts with path clarity', 'Uses browser-versus-laptop comparison', 'Routes the issue well']
  })
];

export const strictQuestionBank: AssessmentQuestion[] = [
  ...modules.flatMap((module) => module.quiz),
  ...extraStrictQuestions
];

export function getQuestionsByWeakTopic(weakTopic: string) {
  return strictQuestionBank.filter((question) => question.weakTopic === weakTopic);
}
