"use client";

import { useState, useEffect, useMemo, Suspense, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { globalSearch, SearchResult } from '../../src/lib/search';
import { trackUsageInteraction } from '../../src/hooks/useUsageTracking';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const lastTrackedQueryRef = useRef('');

  useEffect(() => {
    if (query) {
      setResults(globalSearch(query));
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2 || lastTrackedQueryRef.current === trimmed) {
      return;
    }

    const timer = window.setTimeout(() => {
      lastTrackedQueryRef.current = trimmed;
      trackUsageInteraction({
        eventType: 'search_performed',
        route: '/search',
        label: `Search (${trimmed.length} characters)`,
        contentType: 'search',
        activityCategory: 'search',
        metadata: {
          resultCount: results.length
        }
      });
    }, 600);

    return () => window.clearTimeout(timer);
  }, [query, results.length]);

  const groupedResults = useMemo(() => {
    return results.reduce((acc, result) => {
      const type = result.type;
      if (!acc[type]) acc[type] = [];
      acc[type].push(result);
      return acc;
    }, {} as Record<string, SearchResult[]>);
  }, [results]);

  const typeLabels: Record<string, string> = {
    module: 'Training Modules',
    scenario: 'Support Scenarios',
    academic: 'Academic Subjects',
    flashcard: 'Flashcards',
    question: 'Assessment Questions'
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Global Search</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Find Knowledge & Resources
          </h1>
          <div className="mt-6 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by keyword (e.g. Wi-Fi, PaperCut, Privacy...)"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              autoFocus
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
          </div>
        </div>
      </section>

      {query.length > 0 && query.length < 2 && (
        <p className="text-sm text-slate-500 italic px-6">Keep typing to see results...</p>
      )}

      {query.length >= 2 && results.length === 0 && (
        <section className="rounded-[2rem] border border-dashed border-slate-300 p-12 text-center">
          <div className="text-slate-400 mb-4">
             <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-900">No results found for &quot;{query}&quot;</h2>
          <p className="mt-2 text-slate-600">Try a different keyword or check for typos.</p>
        </section>
      )}

      <div className="grid gap-8">
        {Object.entries(groupedResults).map(([type, items]) => (
          <section key={type} className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 px-2">
              {typeLabels[type]} ({items.length})
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {items.map((result) => (
                <Link
                  key={result.id}
                  href={result.href}
                  onClick={() =>
                    trackUsageInteraction({
                      eventType: 'section_view',
                      route: '/search',
                      label: `${result.type} result opened`,
                      contentType: 'search',
                      contentId: result.id,
                      activityCategory: 'search',
                      metadata: {
                        resultCount: results.length
                      }
                    })
                  }
                  className="group flex flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-900 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-slate-900">
                      {result.title}
                    </h3>
                    <div className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {result.type}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {result.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {result.context || 'Search Result'}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-slate-400 font-medium">Loading search...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
