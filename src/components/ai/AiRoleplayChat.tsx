"use client";

import { useState, useRef, useEffect } from 'react';
import {
  calculateRoleplaySatisfactionScore,
  getStoredProgressSnapshot,
  saveRoleplayFeedbackAttempt,
  saveProgress,
  RoleplayFeedbackAttempt,
  RoleplayExchange,
  RoleplaySentiment
} from '../../lib/progress';
import { trackUsageInteraction } from '../../hooks/useUsageTracking';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  coachNotes?: string;
  sentiment?: 'angry' | 'neutral' | 'satisfied';
};

type AiRoleplayChatProps = {
  roleplayId?: string;
  persona: string;
  scenario: string;
  initialPrompt?: string;
};

export default function AiRoleplayChat({ roleplayId, persona, scenario, initialPrompt }: AiRoleplayChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionStartTime] = useState(Date.now());
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const startedTrackedRef = useRef(false);

  useEffect(() => {
    const progress = getStoredProgressSnapshot();
    const existingAttempt = progress.roleplayFeedbackAttempts
      .filter(a => a.persona === persona && a.scenario === scenario)
      .sort((a, b) => new Date(b.createdAtIso).getTime() - new Date(a.createdAtIso).getTime())[0];

    if (existingAttempt && existingAttempt.exchanges.length > 0) {
      // Restore from history
      const historyMessages: Message[] = [];
      existingAttempt.exchanges.forEach(ex => {
        historyMessages.push({ role: 'user', content: ex.userMessage });
        historyMessages.push({ 
          role: 'assistant', 
          content: ex.botReply, 
          coachNotes: ex.coachNotes, 
          sentiment: ex.sentiment 
        });
      });
      setMessages(historyMessages);
    } else if (initialPrompt) {
      setMessages([{ role: 'assistant', content: initialPrompt }]);
    }
  }, [persona, scenario, initialPrompt]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    if (!startedTrackedRef.current && !messages.some((message) => message.role === 'user')) {
      startedTrackedRef.current = true;
      trackUsageInteraction({
        eventType: 'roleplay_started',
        route: '/simulations/roleplay',
        label: persona,
        contentType: 'roleplay',
        contentId: roleplayId,
        activityCategory: 'roleplay'
      });
    }

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/roleplay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          persona,
          scenario,
      chatHistory: messages,
          userMessage: input
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const assistantMsg: Message = {
        role: 'assistant',
        content: data.reply,
        coachNotes: data.coachNotes,
        sentiment: data.sentiment
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function extractTopicsFromMessages(): string[] {
    const topics = new Set<string>();
    
    // Extract topics from coach notes and scenario
    const coachNotesText = messages
      .filter(m => m.coachNotes)
      .map(m => m.coachNotes)
      .join(' ');
    
    const allText = (scenario + ' ' + coachNotesText).toLowerCase();
    
    // Simple keyword extraction - look for common coaching topics
    const keywords = [
      'communication',
      'empathy',
      'listening',
      'problem-solving',
      'conflict',
      'support',
      'technical',
      'access',
      'file',
      'portal',
      'cable',
      'hdmi',
      'display',
      'whiteboard',
      'phishing',
      'password',
      'printer',
      'copier',
      'filter',
      'ipad',
      'audio',
      'visual',
      'onedrive',
      'admin',
      'software',
      'wi-fi',
      'wifi',
      'network'
    ];
    keywords.forEach(keyword => {
      if (allText.includes(keyword)) {
        topics.add(keyword);
      }
    });
    
    return Array.from(topics);
  }

  function calculateSentimentStats() {
    const sentiments = messages
      .filter(m => m.sentiment)
      .map(m => m.sentiment as RoleplaySentiment);
    
    if (sentiments.length === 0) {
      return { trajectory: [] as RoleplaySentiment[], average: 'neutral' as RoleplaySentiment };
    }
    
    // Calculate average sentiment
    const sentimentScores = {
      angry: 0,
      neutral: 1,
      satisfied: 2
    };
    
    const avgScore = sentiments.reduce((sum, s) => sum + sentimentScores[s], 0) / sentiments.length;
    let average: RoleplaySentiment = 'neutral';
    if (avgScore < 0.5) average = 'angry';
    else if (avgScore > 1.5) average = 'satisfied';
    
    return { trajectory: sentiments, average };
  }

  function calculateSatisfactionScore(): number {
    const sentiments = messages
      .filter(m => m.sentiment)
      .map(m => m.sentiment as RoleplaySentiment);
    return calculateRoleplaySatisfactionScore(sentiments);
  }

  async function handleEndSessionAndSave() {
    if (!messages.some((message) => message.role === 'user')) {
      setSaveMessage('Start an interaction first to save feedback.');
      setTimeout(() => setSaveMessage(null), 3000);
      return;
    }

    try {
      setSaveMessage('Saving feedback...');
      
      const durationSeconds = Math.round((Date.now() - sessionStartTime) / 1000);
      const { trajectory, average } = calculateSentimentStats();
      const exchangeCount = messages.filter(
        (message, index) => message.role === 'assistant' && messages[index - 1]?.role === 'user'
      ).length;
      const topics = extractTopicsFromMessages();
      const satisfactionScore = calculateSatisfactionScore();
      trackUsageInteraction({
        eventType: 'roleplay_completed',
        route: '/simulations/roleplay',
        label: persona,
        contentType: 'roleplay',
        contentId: roleplayId,
        activityCategory: 'roleplay',
        durationSeconds,
        completed: true,
        score: satisfactionScore,
        metadata: {
          resultCount: exchangeCount
        }
      });
      
      // Build exchanges array
      const exchanges: RoleplayExchange[] = [];
      for (let i = 1; i < messages.length; i += 1) {
        if (messages[i - 1]?.role === 'user' && messages[i]?.role === 'assistant') {
          exchanges.push({
            userMessage: messages[i - 1].content,
            botReply: messages[i].content,
            coachNotes: messages[i].coachNotes || '',
            sentiment: messages[i].sentiment || 'neutral',
            timestamp: new Date().toISOString()
          });
        }
      }
      
      // Create feedback attempt
      const attempt: RoleplayFeedbackAttempt = {
        id: `roleplay-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAtIso: new Date().toISOString(),
        persona,
        scenario,
        exchangeCount,
        exchanges,
        sentimentTrajectory: trajectory,
        averageSentiment: average,
        keyTopics: topics,
        coachNotesSummary: messages
          .filter(m => m.coachNotes)
          .map(m => m.coachNotes)
          .join('; '),
        durationSeconds,
        satisfactionScore
      };
      
      // Save to progress
      const progress = getStoredProgressSnapshot();
      const updatedProgress = saveRoleplayFeedbackAttempt(progress, attempt);
      saveProgress(updatedProgress);
      
      setSaveMessage('Feedback saved successfully.');
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err) {
      setSaveMessage('Error saving feedback: ' + (err as any).message);
      setTimeout(() => setSaveMessage(null), 3000);
    }
  }

  return (
    <div className="flex flex-col h-[600px] rounded-[2rem] border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-100 p-4">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Roleplay</div>
        <div className="text-sm font-semibold text-slate-900 mt-1">{persona}</div>
        <div className="text-xs text-slate-500 mt-1 italic">{scenario}</div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px]">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block rounded-2xl bg-indigo-50 p-4 text-indigo-700 text-sm">
              <p className="font-semibold">Start the interaction.</p>
              <p className="mt-1 opacity-80 italic">Example: &quot;Hi, I am from IT. I heard you are having some trouble with the display?&quot;</p>
            </div>
          </div>
        )}
        
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
              m.role === 'user' 
                ? 'bg-slate-900 text-white' 
                : m.sentiment === 'angry' ? 'bg-rose-100 text-rose-900 border border-rose-200'
                : m.sentiment === 'satisfied' ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                : 'bg-slate-100 text-slate-900 border border-slate-200'
            }`}>
              {m.content}
            </div>
            {m.coachNotes && (
              <div className="mt-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest px-2">
                Coach: {m.coachNotes}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-slate-400 animate-pulse">
            <div className="h-2 w-2 rounded-full bg-slate-400" />
            <div className="h-2 w-2 rounded-full bg-slate-400" />
            <div className="h-2 w-2 rounded-full bg-slate-400" />
          </div>
        )}
        {error && (
          <div className="text-center text-xs text-rose-600 font-medium py-2">
            {error}
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your response..."
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
          >
            Send
          </button>
        </div>
        
        {messages.length > 0 && (
          <button
            onClick={handleEndSessionAndSave}
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            End Session & Save Feedback
          </button>
        )}
        
        {saveMessage && (
          <div className={`text-center text-xs font-medium py-1 rounded-lg ${
            saveMessage.includes('Error') 
              ? 'text-rose-600 bg-rose-50'
              : 'text-emerald-600 bg-emerald-50'
          }`}>
            {saveMessage}
          </div>
        )}
      </div>
    </div>
  );
}
