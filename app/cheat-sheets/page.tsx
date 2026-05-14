"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Clipboard, ExternalLink, Printer, Search, ShieldCheck } from 'lucide-react';
import { quickFixCheatSheets, type QuickFixCheatSheet } from '../../src/data/cheatSheets';

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function listHtml(title: string, items: string[]) {
  return `
    <h2>${escapeHtml(title)}</h2>
    <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
  `;
}

function printSheet(sheet: QuickFixCheatSheet) {
  const printWindow = window.open('', '_blank', 'width=980,height=760');
  if (!printWindow) return;

  printWindow.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>${escapeHtml(sheet.title)}</title>
        <style>
          body { font-family: Arial, sans-serif; color: #0f172a; margin: 32px; line-height: 1.45; }
          header { border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 24px; }
          h1 { font-size: 28px; margin: 0 0 8px; }
          h2 { font-size: 16px; margin: 22px 0 8px; text-transform: uppercase; letter-spacing: .08em; }
          p { margin: 0; color: #475569; }
          ul { margin-top: 8px; padding-left: 22px; }
          li { margin-bottom: 7px; }
          pre { white-space: pre-wrap; border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px; background: #f8fafc; }
          .meta { font-size: 12px; text-transform: uppercase; letter-spacing: .12em; color: #64748b; }
          .warning { border: 1px solid #fecdd3; background: #fff1f2; padding: 12px; border-radius: 8px; margin-top: 18px; color: #9f1239; }
        </style>
      </head>
      <body>
        <header>
          <div class="meta">DCSPrep quick-fix cheat sheet | ${escapeHtml(sheet.domain)} | ${sheet.estimatedMinutes} minutes</div>
          <h1>${escapeHtml(sheet.title)}</h1>
          <p>${escapeHtml(sheet.summary)}</p>
          <div class="warning">Privacy boundary: use synthetic or anonymised examples only. Do not record passwords, live ticket details, student names, parent names, private URLs, serial numbers, or confidential DCS procedures.</div>
        </header>
        ${listHtml('Safe First Checks', sheet.safeFirstChecks)}
        ${listHtml('Ask First', sheet.askFirst)}
        ${listHtml('Escalate If', sheet.escalationTriggers)}
        ${listHtml('Do Not Do', sheet.doNotDo)}
        <h2>Ticket Template</h2>
        <pre>${escapeHtml(sheet.ticketTemplate)}</pre>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

export default function CheatSheetsPage() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(quickFixCheatSheets[0]?.id || '');
  const [copied, setCopied] = useState(false);

  const filteredSheets = useMemo(() => {
    const normalised = query.trim().toLowerCase();
    if (!normalised) return quickFixCheatSheets;

    return quickFixCheatSheets.filter((sheet) =>
      [sheet.title, sheet.domain, sheet.summary, ...sheet.safeFirstChecks, ...sheet.askFirst]
        .join(' ')
        .toLowerCase()
        .includes(normalised)
    );
  }, [query]);

  const selectedSheet =
    quickFixCheatSheets.find((sheet) => sheet.id === selectedId) || filteredSheets[0] || quickFixCheatSheets[0];

  async function copyTemplate() {
    await navigator.clipboard.writeText(selectedSheet.ticketTemplate);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="space-y-6 pb-12">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              <ShieldCheck size={17} />
              Quick-fix library
            </div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
              Printable support cheat sheets
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              One-page, Level 1-safe references for common DCS support patterns. They are designed for fast triage,
              cleaner escalation notes, and privacy-safe support conversations.
            </p>
          </div>
          <button
            type="button"
            onClick={() => printSheet(selectedSheet)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white"
          >
            <Printer size={16} />
            Print selected
          </button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <label className="relative block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search symptom or workflow..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm"
            />
          </label>

          <div className="space-y-3">
            {filteredSheets.map((sheet) => (
              <button
                key={sheet.id}
                type="button"
                onClick={() => setSelectedId(sheet.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  selectedSheet.id === sheet.id
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-semibold uppercase tracking-[0.16em] opacity-70">{sheet.domain}</div>
                <div className="mt-2 font-semibold">{sheet.title}</div>
                <div className="mt-2 text-xs opacity-75">{sheet.estimatedMinutes} minute triage reference</div>
              </button>
            ))}
          </div>
        </aside>

        <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                {selectedSheet.domain}
              </div>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">{selectedSheet.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{selectedSheet.summary}</p>
            </div>
            <button
              type="button"
              onClick={copyTemplate}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
            >
              <Clipboard size={16} />
              {copied ? 'Copied' : 'Copy template'}
            </button>
          </div>

          <div className="mt-6 rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm leading-6 text-rose-800">
            Use these sheets for synthetic practice and live mental checklists only. Do not paste private DCS operational
            details into DCSPrep.
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {[
              ['Safe first checks', selectedSheet.safeFirstChecks],
              ['Ask first', selectedSheet.askFirst],
              ['Escalate if', selectedSheet.escalationTriggers],
              ['Do not do', selectedSheet.doNotDo]
            ].map(([title, items]) => (
              <section key={title as string} className="rounded-2xl border border-slate-200 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">{title as string}</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                  {(items as string[]).map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <section className="mt-6 rounded-2xl bg-slate-950 p-5 text-slate-100">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">Ticket template</h3>
            <pre className="mt-4 whitespace-pre-wrap text-sm leading-6">{selectedSheet.ticketTemplate}</pre>
          </section>

          <section className="mt-6 rounded-2xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Related training</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedSheet.relatedModuleIds.map((id) => (
                <Link
                  key={id}
                  href={`/modules/${id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700"
                >
                  Module: {id}
                  <ExternalLink size={12} />
                </Link>
              ))}
              {selectedSheet.relatedScenarioIds.map((id) => (
                <Link
                  key={id}
                  href="/scenarios"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700"
                >
                  Scenario: {id}
                  <ExternalLink size={12} />
                </Link>
              ))}
            </div>
          </section>
        </article>
      </section>
    </div>
  );
}
