import { describe, expect, it } from 'vitest';
import { aplusCore2CoreResources, aplusCore2Lessons, aplusCore2Sections, aplusCore2Stats } from '../data/aplusCore2';

describe('A+ Core 2 pathway', () => {
  it('maps every Professor Messer Core 2 video into a DCSPrep lesson', () => {
    expect(aplusCore2Stats.lessonCount).toBe(74);
    expect(aplusCore2Sections).toHaveLength(4);
    expect(aplusCore2Lessons).toHaveLength(74);
    expect(aplusCore2Lessons.map((lesson) => lesson.title)).toEqual(
      expect.arrayContaining(['Operating Systems Overview', 'Active Directory', 'Managing AI'])
    );
  });

  it('gives every lesson resources, DCS relevance, and assessment criteria', () => {
    aplusCore2Lessons.forEach((lesson) => {
      expect(lesson.videoUrl).toContain('professormesser.com/free-a-plus-training/220-1202');
      expect(lesson.studyBrief).toContain(lesson.sectionTitle);
      expect(lesson.dcsApplication).toBeTruthy();
      expect(lesson.readMore.length).toBeGreaterThanOrEqual(5);
      expect(lesson.assessment.prompt).toContain(lesson.title);
      expect(lesson.assessment.successCriteria.length).toBeGreaterThanOrEqual(5);
      expect(lesson.assessment.multipleChoice).toHaveLength(3);
      lesson.assessment.multipleChoice.forEach((question) => {
        expect(question.id).toContain('mcq');
        expect(question.prompt).toBeTruthy();
        expect(question.options).toHaveLength(4);
        expect(question.options.some((option) => option.id === question.correctOptionId)).toBe(true);
        expect(question.explanation).toBeTruthy();
      });
    });
  });

  it('includes core certification resources', () => {
    expect(aplusCore2CoreResources.map((resource) => resource.kind)).toEqual(
      expect.arrayContaining(['course-index', 'exam-objectives', 'notes'])
    );
  });
});
