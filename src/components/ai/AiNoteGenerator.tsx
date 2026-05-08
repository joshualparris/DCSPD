"use client";

import { useState } from 'react';

type AiNoteGeneratorProps = {
  scenarioTitle: string;
  initialReport: string;
  userChoices: string[];
  draftNote?: string;
  onNoteGenerated: (note: string) => void;
};

export default function AiNoteGenerator({
  scenarioTitle,
  initialReport,
  userChoices,
  draftNote,
  onNoteGenerated
}: AiNoteGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateNote() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/note-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioTitle,
          initialReport,
          userChoices,
          draftNote
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate note');
      }

      onNoteGenerated(data.formattedNote);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        onClick={generateNote}
        disabled={loading}
        className="flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100 disabled:opacity-50"
      >
        {loading ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-700 border-t-transparent" />
            Generating Jira Note...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"/></svg>
            Convert Draft to Professional Jira Note
          </>
        )}
      </button>
      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
    </div>
  );
}
