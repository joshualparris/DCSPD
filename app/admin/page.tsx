import Link from 'next/link';
import { BarChart3, ClipboardList, Database, FileInput, Settings2 } from 'lucide-react';

const adminLinks = [
  {
    href: '/admin/slg-import',
    title: 'SLG Import Draft Tool',
    description: 'Paste extracted SLG text and create a structured draft with SILOs and weekly topics.',
    icon: FileInput
  },
  {
    href: '/admin/content',
    title: 'Content Governance',
    description: 'Review source status, last-reviewed dates, stale content, and admin subject draft edits.',
    icon: ClipboardList
  },
  {
    href: '/admin/integrations',
    title: 'LMS / HRIS Exports',
    description: 'Generate SCORM-style manifests, HRIS templates, and manager-safe analytics exports.',
    icon: Settings2
  },
  {
    href: '/ticket-data-import',
    title: 'Synthetic Ticket CSV Import',
    description: 'Paste fake ticket rows and generate privacy-safe category, priority, channel, and keyword summaries.',
    icon: BarChart3
  },
  {
    href: '/sync',
    title: 'Progress Sync',
    description: 'Push or pull the current local progress snapshot to a server-side sync adapter.',
    icon: Database
  }
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Admin hub</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
            Content, imports, governance, and integration tools
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            These tools are deliberately privacy-safe and local-first. They help prepare content and exports without
            connecting to live DCS systems or exposing private operational data.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {adminLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              <div className="flex items-center gap-3 text-slate-900">
                <span className="rounded-2xl bg-slate-100 p-3">
                  <Icon size={22} />
                </span>
                <h2 className="text-xl font-semibold">{item.title}</h2>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">{item.description}</p>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
