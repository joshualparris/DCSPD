import { learningPaths } from '../data/learningPaths';
import { modules } from '../data/modules';
import { weakTopicLabels } from '../data/skillDomains';
import { getModuleCompletion, getOverallProgress } from './moduleMath';
import { getReadinessProfile, getWeakTopicSummary } from './readinessMath';
import type { UserProgress } from './progress';
import { isDue } from './spacedRepetition';

export type SkillCoachTrackId = 'aPlus' | 'level2' | 'schoolItManager';

export type SkillCoachTrack = {
  id: SkillCoachTrackId;
  title: string;
  description: string;
  score: number;
  confidence: 'low' | 'medium' | 'high';
  evidenceCount: number;
  weakestArea: string;
  nextAction?: {
    label: string;
    href: string;
  };
};

export type SkillCoachRecommendation = {
  id: string;
  title: string;
  description: string;
  minutes: number;
  href: string;
  ctaLabel: string;
  kind: 'diagnostic' | 'micro-learning' | 'hands-on-lab' | 'ai-coaching' | 'badge' | 'review';
  priority: number;
  reason: string;
};

export type SkillCoachBadge = {
  id: string;
  title: string;
  description: string;
  certificateLabel: string;
  status: 'earned' | 'in-progress' | 'locked';
  progressPercent: number;
  evidenceLabel: string;
  href: string;
};

export type SkillCoachWorkoutStep = {
  id: string;
  title: string;
  minutes: number;
  href: string;
  reason: string;
};

export type SkillCoachLab = {
  id: string;
  title: string;
  description: string;
  href: string;
  minutes: number;
  focus: string;
  recommended: boolean;
};

export type SkillCoachDashboard = {
  overallProgress: number;
  skillIq: number;
  strongestTrack: SkillCoachTrack;
  weakestTrack: SkillCoachTrack;
  tracks: SkillCoachTrack[];
  recommendations: SkillCoachRecommendation[];
  badges: SkillCoachBadge[];
  workout: {
    title: string;
    totalMinutes: number;
    steps: SkillCoachWorkoutStep[];
  };
  labs: SkillCoachLab[];
  weakTopicLabels: string[];
};

const trackMetadata: Record<SkillCoachTrackId, Pick<SkillCoachTrack, 'title' | 'description'>> = {
  aPlus: {
    title: 'A+ Core Support IQ',
    description: 'Hardware, endpoint, network, security, and service-desk fundamentals.'
  },
  level2: {
    title: 'Level 2 Support IQ',
    description: 'Escalation judgement, deeper troubleshooting, identity, and platform support.'
  },
  schoolItManager: {
    title: 'School IT Manager IQ',
    description: 'Technical breadth, risk, service design, documentation, and school-system fit.'
  }
};

function average(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function percent(value: number) {
  return Number(Math.max(0, Math.min(100, value)).toFixed(1));
}

function confidenceFromEvidence(evidenceCount: number): SkillCoachTrack['confidence'] {
  if (evidenceCount < 20) return 'low';
  if (evidenceCount < 50) return 'medium';
  return 'high';
}

function getFirstIncompleteModuleHref(moduleIds: string[], progress: UserProgress) {
  const firstIncomplete = moduleIds
    .map((moduleId) => modules.find((module) => module.id === moduleId))
    .find((module) => module && getModuleCompletion(module.id, progress, module) < 100);

  return firstIncomplete ? `/modules/${firstIncomplete.id}` : '/paths';
}

function getTrack(trackId: SkillCoachTrackId, progress: UserProgress): SkillCoachTrack {
  const scores = getReadinessProfile(trackId, progress);
  const weakest = [...scores].sort((left, right) => left.score - right.score)[0];
  const evidenceCount = scores.reduce((sum, score) => sum + score.evidenceCount, 0);

  return {
    id: trackId,
    title: trackMetadata[trackId].title,
    description: trackMetadata[trackId].description,
    score: percent(average(scores.map((score) => score.score))),
    confidence: confidenceFromEvidence(evidenceCount),
    evidenceCount,
    weakestArea: weakest?.weakestArea || weakest?.label || 'Not enough evidence yet',
    nextAction: weakest?.nextAction
  };
}

function getPathBadgeProgress(moduleIds: string[], progress: UserProgress) {
  const pathModules = moduleIds
    .map((moduleId) => modules.find((module) => module.id === moduleId))
    .filter((module): module is (typeof modules)[number] => Boolean(module));

  if (!pathModules.length) return 0;
  return percent(average(pathModules.map((module) => getModuleCompletion(module.id, progress, module))));
}

function badgeStatus(progressPercent: number): SkillCoachBadge['status'] {
  if (progressPercent >= 100) return 'earned';
  if (progressPercent > 0) return 'in-progress';
  return 'locked';
}

export function getSkillCoachBadges(progress: UserProgress): SkillCoachBadge[] {
  const pathBadges = learningPaths.map<SkillCoachBadge>((path) => {
    const progressPercent = getPathBadgeProgress(path.moduleIds, progress);
    return {
      id: `path-${path.id}`,
      title: path.title,
      description: path.description,
      certificateLabel: path.certificationLabel,
      status: badgeStatus(progressPercent),
      progressPercent,
      evidenceLabel: `${Math.round(progressPercent)}% path completion`,
      href: progressPercent >= 100 ? '/paths' : getFirstIncompleteModuleHref(path.moduleIds, progress)
    };
  });

  const privacyAttempts = progress.academicAssessmentAttempts.filter((attempt) => attempt.privacyChecked).length;
  const completedScenarios = progress.scenarioRuns.filter((run) => run.completed).length;
  const privacySafePdEntries = progress.pdEntries.filter((entry) => entry.privacyChecked).length;
  const roleplaySessions = progress.roleplayFeedbackAttempts.length;

  return [
    ...pathBadges,
    {
      id: 'privacy-safe-ai-feedback',
      title: 'Privacy-Safe AI Feedback',
      description: 'Academic PD answers have been graded with sanitised, privacy-checked evidence.',
      certificateLabel: 'Privacy-Safe AI Learner',
      status: badgeStatus(percent((privacyAttempts / 5) * 100)),
      progressPercent: percent((privacyAttempts / 5) * 100),
      evidenceLabel: `${privacyAttempts}/5 graded Academic PD submissions`,
      href: '/academic-pd'
    },
    {
      id: 'scenario-practitioner',
      title: 'Scenario Practitioner',
      description: 'Repeated support scenarios completed with evidence of practical judgement.',
      certificateLabel: 'DCS Scenario Practitioner',
      status: badgeStatus(percent((completedScenarios / 3) * 100)),
      progressPercent: percent((completedScenarios / 3) * 100),
      evidenceLabel: `${completedScenarios}/3 completed scenario runs`,
      href: '/scenarios'
    },
    {
      id: 'support-communication',
      title: 'Support Communication',
      description: 'Roleplay practice has been used to strengthen calm, plain-English support conversations.',
      certificateLabel: 'DCS Support Communicator',
      status: badgeStatus(percent((roleplaySessions / 3) * 100)),
      progressPercent: percent((roleplaySessions / 3) * 100),
      evidenceLabel: `${roleplaySessions}/3 roleplay sessions`,
      href: '/simulations/roleplay'
    },
    {
      id: 'evidence-builder',
      title: 'Evidence Builder',
      description: 'PD reflections are recorded as safe evidence for growth and review.',
      certificateLabel: 'DCS Evidence Builder',
      status: badgeStatus(percent((privacySafePdEntries / 8) * 100)),
      progressPercent: percent((privacySafePdEntries / 8) * 100),
      evidenceLabel: `${privacySafePdEntries}/8 privacy-safe PD entries`,
      href: '/pd-log'
    }
  ].sort((left, right) => right.progressPercent - left.progressPercent);
}

function getRecommendations(progress: UserProgress, tracks: SkillCoachTrack[]): SkillCoachRecommendation[] {
  const dueFlashcards = modules.flatMap((module) =>
    Object.values(progress.modules[module.id]?.flashcards || {}).filter(
      (card) => card.reviewCount > 0 && isDue(card.dueDateIso)
    )
  ).length;
  const dueAssessments = progress.assessmentAttempts.filter((attempt) => isDue(attempt.nextReviewDateIso)).length;
  const weakestTrack = [...tracks].sort((left, right) => left.score - right.score)[0];
  const lowestBadge = getSkillCoachBadges(progress).find((badge) => badge.status !== 'earned');
  const weakTopics = getWeakTopicSummary(progress);

  const recommendations: SkillCoachRecommendation[] = [];

  if (progress.assessmentAttempts.length < 3) {
    recommendations.push({
      id: 'baseline-diagnostic',
      title: 'Run a 10-question baseline diagnostic',
      description: 'Collect enough evidence for the app to stop guessing and start recommending from real results.',
      minutes: 12,
      href: '/strict-quiz',
      ctaLabel: 'Start diagnostic',
      kind: 'diagnostic',
      priority: 98,
      reason: `${progress.assessmentAttempts.length}/3 diagnostic attempts logged`
    });
  }

  if (dueFlashcards + dueAssessments > 0) {
    recommendations.push({
      id: 'due-review',
      title: 'Clear due review items',
      description: 'Use spaced repetition before adding new content so weak areas do not quietly decay.',
      minutes: 10,
      href: '/due-today',
      ctaLabel: 'Review due work',
      kind: 'review',
      priority: 94,
      reason: `${dueFlashcards + dueAssessments} due item${dueFlashcards + dueAssessments === 1 ? '' : 's'}`
    });
  }

  if (weakestTrack?.nextAction) {
    recommendations.push({
      id: `weakest-track-${weakestTrack.id}`,
      title: `Lift ${weakestTrack.weakestArea}`,
      description: `This is currently the lowest signal inside ${weakestTrack.title}.`,
      minutes: 16,
      href: weakestTrack.nextAction.href,
      ctaLabel: 'Open target module',
      kind: 'micro-learning',
      priority: Math.round(90 - weakestTrack.score / 3),
      reason: `${weakestTrack.title} is ${Math.round(weakestTrack.score)}% with ${weakestTrack.confidence} confidence`
    });
  }

  if (progress.scenarioRuns.filter((run) => run.completed).length < 2) {
    recommendations.push({
      id: 'branching-scenario-practice',
      title: 'Complete a branching support scenario',
      description: 'Practise decision-making with consequences before using the same pattern in real support work.',
      minutes: 20,
      href: '/scenarios',
      ctaLabel: 'Open scenarios',
      kind: 'hands-on-lab',
      priority: 82,
      reason: 'Scenario evidence is still light'
    });
  }

  if (progress.roleplayFeedbackAttempts.length < 1) {
    recommendations.push({
      id: 'roleplay-coaching',
      title: 'Run one AI roleplay conversation',
      description: 'Practise staff-facing language, empathy, and next-step clarity with a synthetic support conversation.',
      minutes: 15,
      href: '/simulations/roleplay',
      ctaLabel: 'Open roleplay bot',
      kind: 'ai-coaching',
      priority: 78,
      reason: 'No support conversation roleplay evidence yet'
    });
  }

  if (weakTopics.some((topic) => topic.topic === 'dns-dhcp-gateway' || topic.topic === 'network-troubleshooting')) {
    recommendations.push({
      id: 'network-map-lab',
      title: 'Use the network map lab',
      description: 'Practise tracing device, gateway, DNS, and service path logic in a safe synthetic environment.',
      minutes: 15,
      href: '/simulations/network',
      ctaLabel: 'Open network map',
      kind: 'hands-on-lab',
      priority: 76,
      reason: 'Network diagnostics appear in your weak-topic history'
    });
  }

  if (progress.academicAssessmentAttempts.length < 3) {
    recommendations.push({
      id: 'academic-pd-graded-answer',
      title: 'Submit one Academic PD assessment',
      description: 'Use SLG-linked assessment feedback to connect university concepts with practical DCS IT work.',
      minutes: 20,
      href: '/academic-pd',
      ctaLabel: 'Open Academic PD',
      kind: 'ai-coaching',
      priority: 72,
      reason: `${progress.academicAssessmentAttempts.length}/3 Academic PD submissions logged`
    });
  }

  if (lowestBadge) {
    recommendations.push({
      id: `badge-${lowestBadge.id}`,
      title: `Progress badge: ${lowestBadge.title}`,
      description: lowestBadge.description,
      minutes: 18,
      href: lowestBadge.href,
      ctaLabel: 'Continue badge',
      kind: 'badge',
      priority: Math.round(68 - lowestBadge.progressPercent / 4),
      reason: lowestBadge.evidenceLabel
    });
  }

  return recommendations
    .sort((left, right) => right.priority - left.priority)
    .slice(0, 6);
}

function getLabs(progress: UserProgress, weakTopics: string[]): SkillCoachLab[] {
  const completedScenarios = progress.scenarioRuns.filter((run) => run.completed).length;
  const hasRoleplay = progress.roleplayFeedbackAttempts.length > 0;
  const hasNetworkWeakness = weakTopics.some((topic) => topic.toLowerCase().includes('network'));

  return [
    {
      id: 'network-map',
      title: 'Network Map Lab',
      description: 'Trace safe synthetic network paths and practise explaining why a classroom service is unreachable.',
      href: '/simulations/network',
      minutes: 15,
      focus: 'Network diagnostics',
      recommended: hasNetworkWeakness || completedScenarios < 2
    },
    {
      id: 'roleplay-bot',
      title: 'Roleplay Bot',
      description: 'Practise calm staff-facing support conversations and receive feedback on tone and next steps.',
      href: '/simulations/roleplay',
      minutes: 15,
      focus: 'Communication',
      recommended: !hasRoleplay
    },
    {
      id: 'scenario-lab',
      title: 'Scenario Lab',
      description: 'Work through branching support situations with privacy-safe escalation and documentation choices.',
      href: '/scenarios',
      minutes: 20,
      focus: 'Decision-making',
      recommended: completedScenarios < 3
    },
    {
      id: 'knowledge-base-lab',
      title: 'Knowledge Base Lab',
      description: 'Turn learning into reusable support guidance without exposing private operational details.',
      href: '/knowledge-base-lab',
      minutes: 18,
      focus: 'Documentation',
      recommended: weakTopics.some((topic) => topic.toLowerCase().includes('ticket'))
    },
    {
      id: 'technical-playground',
      title: 'Technical Playground',
      description: 'Use safe sandbox prompts to rehearse technical reasoning before applying it to real support work.',
      href: '/playground',
      minutes: 15,
      focus: 'Technical fluency',
      recommended: true
    }
  ];
}

function getWorkout(recommendations: SkillCoachRecommendation[]): SkillCoachDashboard['workout'] {
  const primary = recommendations[0];
  const secondary = recommendations.find((item) => item.href !== primary?.href);

  return {
    title: primary ? primary.title : 'Complete one focused learning block',
    totalMinutes: 20,
    steps: [
      {
        id: 'diagnose',
        title: 'Five-minute diagnostic pulse',
        minutes: 5,
        href: primary?.kind === 'diagnostic' ? primary.href : '/strict-quiz',
        reason: 'Start with retrieval before reading'
      },
      {
        id: 'learn',
        title: 'One focused lesson or lab',
        minutes: 10,
        href: primary?.href || '/modules',
        reason: primary?.reason || 'Keep the session small enough to finish'
      },
      {
        id: 'apply',
        title: 'Apply it to a synthetic DCS support pattern',
        minutes: 3,
        href: secondary?.href || '/scenarios',
        reason: 'Convert knowledge into support judgement'
      },
      {
        id: 'record',
        title: 'Log the evidence',
        minutes: 2,
        href: '/pd-log',
        reason: 'Keep growth visible and privacy-safe'
      }
    ]
  };
}

export function getSkillCoachDashboard(progress: UserProgress): SkillCoachDashboard {
  const tracks: SkillCoachTrack[] = [
    getTrack('aPlus', progress),
    getTrack('level2', progress),
    getTrack('schoolItManager', progress)
  ];
  const sortedTracks = [...tracks].sort((left, right) => left.score - right.score);
  const weakTopicLabelsForProgress = getWeakTopicSummary(progress)
    .slice(0, 5)
    .map((topic) => topic.label || weakTopicLabels[topic.topic] || topic.topic);
  const recommendations = getRecommendations(progress, tracks);

  return {
    overallProgress: percent(getOverallProgress(modules, progress)),
    skillIq: percent(average(tracks.map((track) => track.score))),
    strongestTrack: sortedTracks[sortedTracks.length - 1],
    weakestTrack: sortedTracks[0],
    tracks,
    recommendations,
    badges: getSkillCoachBadges(progress),
    workout: getWorkout(recommendations),
    labs: getLabs(progress, weakTopicLabelsForProgress),
    weakTopicLabels: weakTopicLabelsForProgress
  };
}
