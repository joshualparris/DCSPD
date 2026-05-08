import { describe, expect, it } from 'vitest';
import { buildAcademicSubjectDraftJson, parseSlgTextDraft } from '../lib/slgImport';

const slgText = `
CSE1PE Programming Environment
Subject Intended Learning Outcomes
SILO 1 Explain algorithms, flowcharts, inputs, outputs, and decision logic in computing problems.
SILO 2 Apply sequence, selection, iteration, functions, and data structures to simple programs.
SILO 3 Test, debug, document, and communicate programs responsibly.
1 03/03/2025 Algorithms and Flowcharts (Lecture; Lab; Coding exercise) 2
2 10/03/2025 Statements and Expressions (Lecture; Lab; Coding exercise) 2
3 17/03/2025 Booleans and Conditional Execution (Lecture; Lab; Coding exercise) 2
4 24/03/2025 Iteration (Lecture; Lab; Coding exercise) 2
5 31/03/2025 Functions and Objects (Lecture; Lab; Coding exercise) 2
6 07/04/2025 Strings and Files (Lecture; Lab; Coding exercise) 2
7 28/04/2025 Data Structures (Lecture; Lab; Coding exercise) 2
8 05/05/2025 Software Errors (Lecture; Lab; Coding exercise) 2
`;

describe('SLG import draft parser', () => {
  it('detects subject code, SILOs, and week rows', () => {
    const draft = parseSlgTextDraft(slgText, 'SLG-2025-CSE1PE-OL-1.pdf');

    expect(draft.subjectCode).toBe('CSE1PE');
    expect(draft.silos).toHaveLength(3);
    expect(draft.weeklyTopics).toHaveLength(8);
    expect(draft.weeklyTopics[0].dateIso).toBe('2025-03-03');
    expect(draft.confidence).toBe('high');
  });

  it('builds an academic subject draft json package', () => {
    const draft = parseSlgTextDraft(slgText, 'SLG-2025-CSE1PE-OL-1.pdf');
    const json = buildAcademicSubjectDraftJson(draft);
    const parsed = JSON.parse(json) as { subjectCode: string; silos: unknown[]; weeklyModules: unknown[] };

    expect(parsed.subjectCode).toBe('CSE1PE');
    expect(parsed.silos.length).toBe(3);
    expect(parsed.weeklyModules.length).toBe(8);
  });
});
