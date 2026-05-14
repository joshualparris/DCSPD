"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationItems } from './navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getGamificationData } from '../../lib/gamification';
import { Trophy, Flame } from 'lucide-react';

function isActive(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname.startsWith(href);
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const data = getGamificationData();
    setPoints(data.totalPoints);
    setStreak(data.currentStreak);
  }, [pathname]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim().length >= 2) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  }

  return (
    <aside className="hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:block dark:bg-slate-900 dark:border-slate-800 transition-colors">
      <div className="border-b border-slate-100 pb-4 dark:border-slate-800">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">DCSPrep</div>
        <div className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">Professional Development Dashboard</div>
        
        <div className="mt-4 flex gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-2xl bg-amber-50 p-3 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
            <Trophy size={16} />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-70">Points</div>
              <div className="text-sm font-bold leading-none">{points}</div>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-2xl bg-orange-50 p-3 text-orange-700 dark:bg-orange-950/30 dark:text-orange-300">
            <Flame size={16} />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-70">Streak</div>
              <div className="text-sm font-bold leading-none">{streak}d</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search keywords..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
        </form>
      </div>

      <nav className="mt-4 space-y-1">
        {navigationItems.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-2xl px-4 py-3 text-sm transition ${
                active
                  ? 'bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
        <div className="font-semibold text-slate-900 dark:text-slate-200">Support comes first</div>
        <p className="mt-2">
          This app is for personal PD only. Do not enter real student, staff, parent, credential, or network
          details.
        </p>
      </div>
    </aside>
  );
}
