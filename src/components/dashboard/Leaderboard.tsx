"use client";

import { Users, Trophy, Flame } from 'lucide-react';

type LeaderboardEntry = {
  id: string;
  name: string;
  points: number;
  streak: number;
  isCurrentUser?: boolean;
};

// Simulated data for cross-user leaderboard
// In a real app, this would come from a backend API
const mockLeaderboard: LeaderboardEntry[] = [
  { id: '1', name: 'Paul (Level 2)', points: 4500, streak: 12 },
  { id: '2', name: 'Sarah (ICT Admin)', points: 3800, streak: 8 },
  { id: '3', name: 'Josh (You)', points: 2950, streak: 5, isCurrentUser: true },
  { id: '4', name: 'Tim (Preschool)', points: 2100, streak: 3 },
  { id: '5', name: 'Emma (Wellington)', points: 1850, streak: 7 }
];

export default function Leaderboard() {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-amber-50 p-2 text-amber-600">
            <Trophy size={20} />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Leaderboard</h2>
        </div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Weekly Standings</div>
      </div>

      <div className="space-y-3">
        {mockLeaderboard.map((entry, index) => (
          <div
            key={entry.id}
            className={`flex items-center justify-between rounded-2xl p-4 transition ${
              entry.isCurrentUser ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                index === 0 ? 'bg-amber-400 text-amber-900' : 
                index === 1 ? 'bg-slate-300 text-slate-800' :
                index === 2 && !entry.isCurrentUser ? 'bg-orange-300 text-orange-900' :
                entry.isCurrentUser ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                {index + 1}
              </span>
              <div>
                <div className="text-sm font-semibold">{entry.name}</div>
                <div className={`flex items-center gap-1 text-[10px] ${entry.isCurrentUser ? 'text-white/70' : 'text-slate-500'}`}>
                  <Flame size={10} className={entry.streak > 0 ? 'text-orange-500' : ''} />
                  {entry.streak} day streak
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold">{entry.points.toLocaleString()}</div>
              <div className={`text-[10px] uppercase tracking-widest font-bold ${entry.isCurrentUser ? 'text-white/50' : 'text-slate-400'}`}>
                pts
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-100">
        <div className="flex items-start gap-3 bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <Users className="text-blue-600 shrink-0 mt-0.5" size={16} />
          <p className="text-xs text-blue-900 leading-relaxed">
            <strong>Community Insight:</strong> Collaborative PD helps everyone move faster. Share your progress and help peers to earn &quot;Micro-rewards&quot; and special badges.
          </p>
        </div>
      </div>
    </div>
  );
}
