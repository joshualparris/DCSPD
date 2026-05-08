import { describe, expect, it } from 'vitest';
import {
  calculateRoleplaySatisfactionScore,
  getRoleplayFeedbackStats,
  type RoleplayFeedbackAttempt,
  type RoleplaySentiment
} from '../lib/progress';

function makeAttempt(sentiments: RoleplaySentiment[], score = 27): RoleplayFeedbackAttempt {
  return {
    id: `attempt-${sentiments.join('-')}`,
    createdAtIso: '2026-05-07T00:00:00.000Z',
    persona: 'Ms. Lee (New Art Teacher)',
    scenario: 'Synthetic display support scenario.',
    exchangeCount: sentiments.length,
    exchanges: sentiments.map((sentiment, index) => ({
      userMessage: `User message ${index + 1}`,
      botReply: `Bot reply ${index + 1}`,
      coachNotes: 'Synthetic coach note.',
      sentiment,
      timestamp: '2026-05-07T00:00:00.000Z'
    })),
    sentimentTrajectory: sentiments,
    averageSentiment: 'neutral',
    keyTopics: ['empathy', 'technical', 'access'],
    coachNotesSummary: 'Synthetic notes.',
    durationSeconds: 359,
    satisfactionScore: score
  };
}

describe('roleplay satisfaction scoring', () => {
  it('treats neutral roleplay progress as partial success instead of zero', () => {
    const sentiments: RoleplaySentiment[] = [
      'neutral',
      'neutral',
      'satisfied',
      'neutral',
      'neutral',
      'satisfied',
      'neutral',
      'satisfied',
      'neutral',
      'neutral',
      'neutral'
    ];

    expect(Math.round((sentiments.filter((item) => item === 'satisfied').length / sentiments.length) * 100)).toBe(27);
    expect(calculateRoleplaySatisfactionScore(sentiments)).toBeGreaterThanOrEqual(75);
  });

  it('adds recovery credit when a conversation moves from angry to satisfied', () => {
    const score = calculateRoleplaySatisfactionScore(['angry', 'neutral', 'satisfied']);

    expect(score).toBeGreaterThan(67);
    expect(score).toBeLessThanOrEqual(80);
  });

  it('uses recalibrated scores in roleplay statistics', () => {
    const stats = getRoleplayFeedbackStats([
      makeAttempt(['neutral', 'neutral', 'satisfied', 'neutral', 'satisfied', 'neutral', 'neutral'], 29)
    ]);

    expect(stats.averageSatisfaction).toBeGreaterThan(29);
    expect(stats.averageSatisfaction).toBeGreaterThanOrEqual(75);
  });
});
