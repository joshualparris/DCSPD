/**
 * Gamification utilities for DCSPrep
 * Tracks points, badges, and streaks to motivate learners
 */

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon?: string;
  earnedAt: number; // timestamp
}

export interface GamificationData {
  totalPoints: number;
  badges: Badge[];
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: number; // timestamp
  modulePointsEarned: Record<string, number>; // moduleId -> points
}

const STORAGE_KEY = 'dcsprep-gamification';
const STREAK_RESET_HOURS = 24;
const POINTS_PER_MODULE_COMPLETE = 100;
const POINTS_PER_ASSESSMENT = 50;

/**
 * Get current gamification data from localStorage
 */
export function getGamificationData(): GamificationData {
  if (typeof window === 'undefined') {
    return getDefaultGamificationData();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Failed to parse gamification data:', e);
  }

  return getDefaultGamificationData();
}

/**
 * Get default/empty gamification data
 */
export function getDefaultGamificationData(): GamificationData {
  return {
    totalPoints: 0,
    badges: [],
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: 0,
    modulePointsEarned: {}
  };
}

/**
 * Save gamification data to localStorage
 */
export function saveGamificationData(data: GamificationData): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save gamification data:', e);
  }
}

/**
 * Add points to user's total and update streak
 */
export function addPoints(amount: number): GamificationData {
  const data = getGamificationData();
  data.totalPoints += amount;
  updateStreak(data);
  saveGamificationData(data);
  return data;
}

/**
 * Add points for module completion
 */
export function addModulePoints(moduleId: string): GamificationData {
  const data = getGamificationData();
  const currentModulePoints = data.modulePointsEarned[moduleId] || 0;
  data.modulePointsEarned[moduleId] = currentModulePoints + POINTS_PER_MODULE_COMPLETE;
  data.totalPoints += POINTS_PER_MODULE_COMPLETE;
  updateStreak(data);
  saveGamificationData(data);
  return data;
}

/**
 * Add points for assessment completion
 */
export function addAssessmentPoints(assessmentId: string): GamificationData {
  const data = getGamificationData();
  data.totalPoints += POINTS_PER_ASSESSMENT;
  updateStreak(data);
  saveGamificationData(data);
  return data;
}

/**
 * Award a badge to the user
 */
export function awardBadge(badge: Omit<Badge, 'earnedAt'>): GamificationData {
  const data = getGamificationData();
  
  // Check if badge already exists
  if (data.badges.some(b => b.id === badge.id)) {
    return data;
  }

  data.badges.push({
    ...badge,
    earnedAt: Date.now()
  });

  updateStreak(data);
  saveGamificationData(data);
  return data;
}

/**
 * Update current streak based on last activity
 * If last activity was within 24 hours, increment streak
 * Otherwise, reset streak to 1
 */
function updateStreak(data: GamificationData): void {
  const now = Date.now();
  const lastActivity = data.lastActivityDate;
  const hoursSinceLastActivity = (now - lastActivity) / (1000 * 60 * 60);

  if (hoursSinceLastActivity <= STREAK_RESET_HOURS && lastActivity > 0) {
    // Continue the streak
    data.currentStreak += 1;
  } else if (hoursSinceLastActivity > STREAK_RESET_HOURS) {
    // Reset the streak
    data.currentStreak = 1;
  } else {
    // First activity
    data.currentStreak = 1;
  }

  // Update longest streak
  if (data.currentStreak > data.longestStreak) {
    data.longestStreak = data.currentStreak;
  }

  data.lastActivityDate = now;
}

/**
 * Get current streak count
 */
export function getCurrentStreak(): number {
  const data = getGamificationData();
  return data.currentStreak;
}

/**
 * Get total points
 */
export function getTotalPoints(): number {
  const data = getGamificationData();
  return data.totalPoints;
}

/**
 * Get all earned badges
 */
export function getEarnedBadges(): Badge[] {
  const data = getGamificationData();
  return data.badges;
}

/**
 * Reset all gamification data (for testing)
 */
export function resetGamificationData(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to reset gamification data:', e);
  }
}

/**
 * Predefined badges for the app
 */
export const PREDEFINED_BADGES = {
  FIRST_MODULE: {
    id: 'first-module',
    name: 'Getting Started',
    description: 'Completed your first module'
  },
  FIVE_MODULES: {
    id: 'five-modules',
    name: 'Rising Learner',
    description: 'Completed 5 modules'
  },
  TEN_MODULES: {
    id: 'ten-modules',
    name: 'Dedicated Scholar',
    description: 'Completed 10 modules'
  },
  TWENTY_MODULES: {
    id: 'twenty-modules',
    name: 'Module Master',
    description: 'Completed 20 modules'
  },
  STREAK_WEEK: {
    id: 'streak-week',
    name: 'On a Roll!',
    description: 'Maintained a 7-day study streak'
  },
  STREAK_MONTH: {
    id: 'streak-month',
    name: 'Relentless',
    description: 'Maintained a 30-day study streak'
  },
  QUIZ_MASTER: {
    id: 'quiz-master',
    name: 'Quiz Master',
    description: 'Completed 10 assessments'
  },
  SCENARIO_SOLVER: {
    id: 'scenario-solver',
    name: 'Scenario Solver',
    description: 'Completed 5 scenarios'
  },
  POINTS_MILESTONE_500: {
    id: 'points-500',
    name: '500 Point Club',
    description: 'Earned 500 points'
  },
  POINTS_MILESTONE_1000: {
    id: 'points-1000',
    name: 'Thousand Point Warrior',
    description: 'Earned 1000 points'
  },
  CYBER_GUARDIAN: {
    id: 'cyber-guardian',
    name: 'Cyber Guardian',
    description: 'Completed the Cybersecurity Awareness module'
  },
  IMAGING_PRO: {
    id: 'imaging-pro',
    name: 'Imaging Pro',
    description: 'Completed the Device Imaging and Deployment module'
  },
  INCLUSIVE_DESIGNER: {
    id: 'inclusive-designer',
    name: 'Inclusive Designer',
    description: 'Completed the Accessibility and Inclusive Design module'
  },
  SUPPORT_HEART: {
    id: 'support-heart',
    name: 'Support Heart',
    description: 'Completed the Communication and Soft Skills module'
  }
};
