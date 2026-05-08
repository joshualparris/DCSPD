"use client";

import { useMemo, useRef, useState } from 'react';
import { Mic, Square } from 'lucide-react';

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
};

type SpeechWindow = Window & {
  SpeechRecognition?: new () => SpeechRecognitionLike;
  webkitSpeechRecognition?: new () => SpeechRecognitionLike;
};

function buildTicketNote(transcript: string) {
  const cleaned = transcript.trim();

  return [
    'Summary: Walk-up support request captured from practice transcript.',
    '',
    `User report: ${cleaned || 'No transcript captured yet.'}`,
    '',
    'Scope: Confirm one user versus many users, location, device, and time pattern.',
    '',
    'Safe checks completed:',
    '- Confirmed exact symptom.',
    '- Checked for privacy-sensitive details before saving.',
    '- Identified what evidence is still missing.',
    '',
    'Missing evidence to ask for:',
    '- Device type/name without private asset data.',
    '- Location in general terms.',
    '- Error message or symptom wording.',
    '- Whether a workaround exists.',
    '',
    'Escalation trigger: Escalate if account access, private data, infrastructure, safety, or repeated failure is involved.'
  ].join('\n');
}

export default function VoiceToTicketPage() {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState('Use browser speech recognition where available, or type the walk-up request.');
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const ticketNote = useMemo(() => buildTicketNote(transcript), [transcript]);

  function startListening() {
    const speechWindow = window as SpeechWindow;
    const Recognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;

    if (!Recognition) {
      setMessage('Speech recognition is not available in this browser. Type the transcript instead.');
      return;
    }

    const recognition = new Recognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-AU';
    recognition.onresult = (event) => {
      const text = Array.from(event.results)
        .map((result) => result[0]?.transcript || '')
        .join(' ');
      setTranscript(text);
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    setMessage('Listening. Use fake or anonymised practice scenarios only.');
  }

  function stopListening() {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsListening(false);
    setMessage('Stopped listening. Review and sanitise the note before using it as evidence.');
  }

  async function copyNote() {
    await navigator.clipboard.writeText(ticketNote);
    setMessage('Ticket note copied.');
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Voice-to-ticket practice</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
            Practise turning walk-up speech into a clean support note
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Use synthetic roleplay only. The goal is to practise listening, extracting scope, and producing a Jira-style
            note without copying private DCS details.
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={startListening}
              disabled={isListening}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:bg-slate-400"
            >
              <Mic size={16} />
              Start voice practice
            </button>
            <button
              type="button"
              onClick={stopListening}
              disabled={!isListening}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 disabled:text-slate-400"
            >
              <Square size={16} />
              Stop
            </button>
          </div>
          <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{message}</div>
          <textarea
            value={transcript}
            onChange={(event) => setTranscript(event.target.value)}
            className="mt-5 min-h-80 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6"
            placeholder="Example: A teacher says the classroom display is not showing and the class is waiting..."
          />
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold text-slate-900">Generated ticket note</h2>
            <button
              type="button"
              onClick={copyNote}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
            >
              Copy note
            </button>
          </div>
          <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-slate-950 p-4 text-sm leading-6 text-slate-100">
            {ticketNote}
          </pre>
        </div>
      </section>
    </div>
  );
}
