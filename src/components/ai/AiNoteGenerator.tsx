import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Wand2, Loader2, AlertCircle } from 'lucide-react';

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
  
  // Voice states
  const [isListening, setIsIsListening] = useState(false);
  const [voiceSupported, setIsVoiceSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check for Web Speech API support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsVoiceSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-AU'; // Default to Australian English for DCS context

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          onNoteGenerated((draftNote ? draftNote + ' ' : '') + transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsIsListening(false);
        setError(`Voice error: ${event.error}`);
      };

      recognition.onend = () => {
        setIsIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [onNoteGenerated, draftNote]);

  function toggleListening() {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setError(null);
      try {
        recognitionRef.current?.start();
        setIsIsListening(true);
      } catch (err) {
        console.error('Failed to start recognition', err);
      }
    }
  }

  async function generateNote(voiceInput = false) {
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
          draftNote,
          voiceInput
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
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => generateNote(false)}
          disabled={loading || isListening}
          className="flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Wand2 size={16} />
          )}
          {loading ? 'Generating Jira Note...' : 'Convert to Professional Note'}
        </button>

        {voiceSupported && (
          <button
            onClick={toggleListening}
            disabled={loading}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
              isListening 
                ? 'bg-rose-100 text-rose-700 hover:bg-rose-200 animate-pulse' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            {isListening ? 'Stop Dictating' : 'Dictate Note'}
          </button>
        )}
      </div>
      
      {error && (
        <div className="flex items-center gap-2 text-xs text-rose-600 font-medium bg-rose-50 p-2 rounded-lg">
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      {isListening && (
        <p className="text-xs text-slate-500 italic">
          Listening... speak clearly to draft your ticket note.
        </p>
      )}
    </div>
  );
}
