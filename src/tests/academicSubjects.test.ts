import { existsSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';
import {
  academicBridgeAreas,
  academicSubjects,
  getAcademicCatalogueStats,
  getAcademicWeeklyModules,
  getAcademicSourceSummary
} from '../data/academicSubjects';

describe('academic subject catalogue', () => {
  it('covers the RBC and SMITB subject tracks', () => {
    expect(academicSubjects.length).toBeGreaterThanOrEqual(15);
    expect(academicSubjects.map((subject) => subject.code)).toEqual(
      expect.arrayContaining([
        'CSE1IIT',
        'CSE1PE',
        'CSE1OOF',
        'CSE1IS',
        'CSE1ICB',
        'STA1DCT',
        'CSE3PE',
        'CSE4002',
        'CSE5006',
        'CSE5ML',
        'CSE5NLP',
        'CSE5DL',
        'CSE5CV',
        'CSE5BDC'
      ])
    );

    expect(new Set(academicSubjects.map((subject) => subject.track))).toEqual(new Set(['RBC', 'SMITB']));
  });

  it('keeps each subject usable as a learning module', () => {
    academicSubjects.forEach((subject) => {
      expect(subject.summary).toBeTruthy();
      expect(subject.topics.length).toBeGreaterThanOrEqual(2);
      expect(subject.silos.length).toBeGreaterThanOrEqual(3);
      expect(subject.dcsBridges.length).toBeGreaterThanOrEqual(1);
      expect(subject.learningModes.map((mode) => mode.id)).toEqual(['diagnose', 'learn', 'retrieve', 'apply', 'prove']);
      expect(subject.practicalTasks.length).toBeGreaterThanOrEqual(1);
      expect(subject.resources.length).toBeGreaterThanOrEqual(3);
      expect(subject.finalChallenge.title).toBeTruthy();
      expect(subject.finalChallenge.brief).toBeTruthy();
      expect(subject.finalChallenge.evidence).toBeTruthy();

      const weeklyModules = getAcademicWeeklyModules(subject);
      expect(weeklyModules.length).toBeGreaterThanOrEqual(1);
      weeklyModules.forEach((module) => {
        expect(module.title).toMatch(/^Week \d+( - Topic \d+)?:/);
        expect(module.overview).toBeTruthy();
        expect(module.dcsConnections.length).toBeGreaterThanOrEqual(1);
        expect(module.internalLinks.length).toBeGreaterThanOrEqual(1);
        expect(module.resources.length).toBeGreaterThanOrEqual(1);
        expect(module.assessments.length).toBeGreaterThanOrEqual(1);

        module.assessments.forEach((assessment) => {
          expect(assessment.prompt).toBeTruthy();
          expect(assessment.successCriteria.length).toBeGreaterThanOrEqual(2);
          expect(assessment.siloIds.length).toBeGreaterThanOrEqual(1);
          expect(assessment.dcsApplication).toBeTruthy();
        });
      });

      subject.silos.forEach((silo) => {
        expect(silo.text).toBeTruthy();
        expect(silo.plainEnglish).toBeTruthy();
        expect(silo.masteryCriteria.length).toBeGreaterThanOrEqual(2);
        expect(silo.practicePrompts.length).toBeGreaterThanOrEqual(1);
        expect(silo.quizItems.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  it('maps the CSE1PE SLG schedule into weekly assessed modules', () => {
    const cse1pe = academicSubjects.find((subject) => subject.code === 'CSE1PE');
    expect(cse1pe).toBeDefined();

    const weeklyModules = getAcademicWeeklyModules(cse1pe!);
    expect(weeklyModules).toHaveLength(12);
    expect(weeklyModules[0].title).toBe('Week 1 - Topic 1: Algorithms and Flowcharts');
    expect(weeklyModules.map((module) => module.title)).toEqual(
      expect.arrayContaining([
        'Week 8 - Topic 8: Software Errors',
        'Week 9 - Topic 9: Using Modules',
        'Week 12 - Topic 12: Revision'
      ])
    );
    expect(weeklyModules.flatMap((module) => module.assessments).length).toBeGreaterThanOrEqual(13);
  });

  it('keeps local source links resolvable', () => {
    const sourcePaths = academicSubjects
      .flatMap((subject) => subject.localSources?.map((source) => source.path) ?? [])
      .filter((sourcePath): sourcePath is string => Boolean(sourcePath));

    sourcePaths.forEach((sourcePath) => {
      expect(existsSync(join(process.cwd(), sourcePath))).toBe(true);
    });
  });

  it('summarises source health and DCS bridge coverage', () => {
    const sourceSummary = getAcademicSourceSummary();
    const stats = getAcademicCatalogueStats();

    expect(sourceSummary.canonical).toBeGreaterThan(0);
    expect(sourceSummary['manual-check']).toBeGreaterThanOrEqual(1);
    expect(stats.weeklyModules).toBeGreaterThanOrEqual(academicSubjects.length);
    expect(stats.weeklyAssessments).toBeGreaterThanOrEqual(stats.weeklyModules);
    expect(stats.highRelevanceBridges).toBeGreaterThanOrEqual(8);
    expect(academicBridgeAreas).toEqual(
      expect.arrayContaining(['School Platforms', 'AI / Data Science', 'Cloud / DevOps', 'Professional Practice'])
    );
  });
});
