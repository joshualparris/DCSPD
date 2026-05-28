import { describe, expect, it } from 'vitest';
import { expandCustomContentPayload, prepareCustomContentImport } from '../lib/customContentImport';

describe('custom content import preparation', () => {
  it('normalizes generated training module payloads before saving', () => {
    const result = prepareCustomContentImport({
      id: 'custom-safe-escalation',
      title: 'Safe escalation notes',
      sections: [],
      learningObjectives: [],
      quiz: [
        {
          id: 'q1',
          type: 'short-answer',
          rubric: [{ criterion: 'Names the support scope' }, { label: 'Avoids private details' }]
        }
      ]
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.kind).toBe('training-module');
    expect(result.displayName).toBe('Safe escalation notes');

    if (result.ok && result.kind === 'training-module') {
      const item = result.item;
      expect(item.modulePattern.diagnosticQuestions).toEqual([]);
      expect((item.quiz[0] as { rubric: string[] }).rubric).toEqual([
        'Names the support scope',
        'Avoids private details'
      ]);
    } else {
      throw new Error('Unexpected result kind');
    }
  });

  it('expands multi-item generated JSON payloads', () => {
    const payload = {
      items: [
        {
          id: 'custom-roleplay-front-office',
          persona: 'Front office staff',
          itChallenge: 'Clarify urgency and safe escalation.'
        },
        {
          id: 'custom-asset-printer',
          name: 'Library printer',
          category: 'printer',
          level1Boundaries: []
        }
      ]
    };

    const results = expandCustomContentPayload(payload).map((item) => prepareCustomContentImport(item));

    expect(results).toHaveLength(2);
    expect(results[0]).toMatchObject({ ok: true, kind: 'roleplay-scenario' });
    expect(results[1]).toMatchObject({ ok: true, kind: 'asset-profile' });
  });

  it('rejects unknown JSON shapes with a clear error', () => {
    const result = prepareCustomContentImport({ title: 'Not enough shape to import' });

    expect(result).toEqual({
      ok: false,
      error: 'Unknown JSON format. Could not detect data type.'
    });
  });
});
