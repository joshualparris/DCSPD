"use client";

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { ClipboardList, ChevronRight, Search, Plus, Filter } from 'lucide-react';
import { getCustomPlaybooks } from '../../src/lib/customModules';
import type { TroubleshootingPlaybook } from '../../src/types/playbooks';

export default function PlaybooksPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [customPlaybooks, setCustomPlaybooks] = useState<TroubleshootingPlaybook[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setHasMounted(true);
    setCustomPlaybooks(getCustomPlaybooks());
  }, []);

  const allPlaybooks = useMemo(() => {
    // For now, we only have custom playbooks. We could add base ones later.
    return customPlaybooks;
  }, [customPlaybooks]);

  const filteredPlaybooks = useMemo(() => {
    if (!searchQuery) return allPlaybooks;
    const q = searchQuery.toLowerCase();
    return allPlaybooks.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [allPlaybooks, searchQuery]);

  if (!hasMounted) return null;

  return (
    <div className="space-y-6 pb-12">
      <header className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-600">
              <ClipboardList size={20} />
              <span className="text-sm font-bold uppercase tracking-widest">Support Brain</span>
            </div>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
              Troubleshooting Playbooks
            </h1>
            <p className="mt-3 text-lg text-slate-600">
              Practical support workflows for common DCS IT issues.
            </p>
          </div>
          <Link 
            href="/settings"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800 transition-all"
          >
            <Plus size={18} />
            Upload New Playbook
          </Link>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search playbooks by title, symptom, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
            />
          </div>
          <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={18} />
            Filter
          </button>
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filteredPlaybooks.length > 0 ? (
          filteredPlaybooks.map((playbook) => (
            <Link
              key={playbook.id}
              href={`/playbooks/${playbook.id}`}
              className="group flex flex-col rounded-[2rem] border border-slate-200 bg-white p-8 hover:border-blue-200 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between">
                <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
                  playbook.level === 'L1' ? 'bg-emerald-100 text-emerald-700' :
                  playbook.level === 'L2' ? 'bg-rose-100 text-rose-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {playbook.level}
                </span>
                <span className="text-xs font-medium text-slate-400">{playbook.domain}</span>
              </div>
              
              <h3 className="mt-4 text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {playbook.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                {playbook.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {playbook.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="rounded-lg bg-slate-50 px-2 py-1 text-[10px] font-bold text-slate-500">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-50">
                <span className="text-xs font-bold text-blue-600">View Workflow</span>
                <ChevronRight className="text-slate-300 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" size={18} />
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full rounded-[2.5rem] border border-dashed border-slate-200 p-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
              <ClipboardList size={32} />
            </div>
            <h3 className="mt-6 text-xl font-bold text-slate-900">No playbooks found</h3>
            <p className="mt-2 text-slate-500">
              Upload a troubleshooting playbook in Settings to start building your support brain.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
