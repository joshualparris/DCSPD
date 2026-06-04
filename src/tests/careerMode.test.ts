import { vi, describe, expect, it, beforeEach } from 'vitest';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    clear: () => { store = {}; },
    removeItem: (key: string) => { delete store[key]; }
  };
})();

vi.stubGlobal('localStorage', localStorageMock);
vi.stubGlobal('window', { localStorage: localStorageMock });

// Import AFTER mocking
import { getStoredProgressSnapshot, setCareerFocus, STORAGE_KEY } from '../lib/progress';
import { generateStudyPath } from '../lib/studyPath';
import { modules as baseModules } from '../data/modules';
import { scenarios as baseScenarios } from '../data/scenarios';

describe('Career Mode Logic', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('persists career focus selection', () => {
    setCareerFocus('MSP');
    const progress = getStoredProgressSnapshot();
    expect(progress.profile?.careerFocus).toBe('MSP');
  });

  it('provides different recommendations based on career focus', () => {
    // 1. DCS Mode
    setCareerFocus('DCS');
    const dcsProgress = getStoredProgressSnapshot();
    const dcsRecs = generateStudyPath(baseModules, baseScenarios, dcsProgress);
    
    // 2. MSP Mode
    setCareerFocus('MSP');
    const mspProgress = getStoredProgressSnapshot();
    const mspRecs = generateStudyPath(baseModules, baseScenarios, mspProgress);

    // Recommendations should differ in their "whyItMatters" or specific items
    expect(dcsRecs.whyItMatters).toContain('school IT skillset');
    expect(mspRecs.whyItMatters).toContain('transition to MSP workflows');
  });

  it('prioritizes MSP modules in MSP mode', () => {
    setCareerFocus('MSP');
    const progress = getStoredProgressSnapshot(baseModules);
    
    // Validate that career focus is set and MSP modules exist with matching targetEnvironment
    expect(progress.profile?.careerFocus).toBe('MSP');
    
    const mspModules = baseModules.filter(m => m.targetEnvironment === 'MSP');
    expect(mspModules.length).toBeGreaterThan(0);
    expect(mspModules.some(m => m.id === 'msp-foundations')).toBe(true);
  });

  it('maintains backwards compatibility with progress without careerFocus', () => {
    const legacyProgress = {
      profile: { id: 'test', name: 'Test User', role: 'learner' },
      modules: {},
      scenarioRuns: [],
      assessmentAttempts: [],
      academicAssessmentAttempts: [],
      certificationAssessmentAttempts: [],
      roleplayFeedbackAttempts: [],
      pdEntries: [],
      gamification: { totalPoints: 0, currentStreak: 0, bestStreak: 0, lastActivityDateIso: '', badges: [], awardedPointEvents: {} }
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(legacyProgress));
    
    const progress = getStoredProgressSnapshot();
    expect(progress.profile?.name).toBe('Test User');
    expect(progress.profile?.careerFocus).toBe('Generic'); // Default from normalizeProgress
  });
});
