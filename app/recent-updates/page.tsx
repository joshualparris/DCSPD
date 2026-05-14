import Link from 'next/link';
import { ArrowRight, CalendarClock, CheckCircle2, ExternalLink, Sparkles } from 'lucide-react';
import { getRecentUpdates } from '../../src/data/recentUpdates';

const categoryStyles = {
  Added: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Changed: 'bg-blue-50 text-blue-700 border-blue-100',
  Verified: 'bg-slate-900 text-white border-slate-900',
  Docs: 'bg-amber-50 text-amber-800 border-amber-100'
};

const linkKindStyles = {
  feature: 'bg-slate-900 text-white',
  workflow: 'bg-blue-50 text-blue-700',
  admin: 'bg-violet-50 text-violet-700',
  evidence: 'bg-emerald-50 text-emerald-700',
  source: 'bg-slate-100 text-slate-700'
};

export default function RecentUpdatesPage() {
  const updates = getRecentUpdates();
  const latest = updates[0];

  return (
    <div className="space-y-6 pb-12">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              <Sparkles size={17} />
              Recent updates
            </div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
              What changed and where to find it
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              A navigable changelog for new and recently changed DCSPrep features. Each entry links directly to the
              route or workflow so updates do not get lost in the sidebar.
            </p>
          </div>
          {latest ? (
            <Link
              href={latest.links[0]?.href || '/'}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white"
            >
              Open latest
              <ArrowRight size={16} />
            </Link>
          ) : null}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Updates tracked</div>
          <div className="mt-2 text-3xl font-semibold text-slate-900">{updates.length}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Latest date</div>
          <div className="mt-2 text-3xl font-semibold text-slate-900">{latest?.dateIso || 'None'}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <CheckCircle2 size={16} />
            Status
          </div>
          <div className="mt-2 text-xl font-semibold text-slate-900">Links are app routes</div>
        </div>
      </section>

      <section className="space-y-4">
        {updates.map((update) => (
          <article key={update.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${categoryStyles[update.category]}`}>
                    {update.category}
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
                    <CalendarClock size={14} />
                    {update.dateIso}
                  </span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-slate-900">{update.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{update.summary}</p>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  <span className="font-semibold text-slate-900">Why it helps: </span>
                  {update.impact}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {update.links.map((link) => (
                <Link
                  key={`${update.id}-${link.href}-${link.label}`}
                  href={link.href}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium ${linkKindStyles[link.kind]}`}
                >
                  {link.label}
                  <ExternalLink size={12} />
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
