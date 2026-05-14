"use client";

import { ChangeEvent, useMemo, useState } from 'react';
import { AlertTriangle, BarChart3, FileInput, ShieldCheck, Upload } from 'lucide-react';
import { parseSyntheticTicketCsv } from '../../src/lib/ticketCsvImport';

const sampleCsv = `id,title,category,priority,channel,createdDate,description
SYN-001,Teacher cannot release print job,Printing,Normal,Walk-up,2026-05-01,"Follow-Me print job visible but not released at copier"
SYN-002,Classroom display has picture but no sound,Classroom Tech,High,Phone,2026-05-01,"Windows output still set to laptop speakers"
SYN-003,New staff member missing shared drive,Onboarding,High,Ticket,2026-05-02,"Account works but role-based access is incomplete"
SYN-004,Student laptop gets 169.254 address,Wi-Fi,Normal,Ticket,2026-05-03,"Device joins Wi-Fi but does not receive DHCP lease"
SYN-005,Website blocked for Year 8 lesson,Filtering,Normal,Email,2026-05-03,"Teacher needs review of blocked resource for approved lesson use"
SYN-006,Unexpected MFA prompt reported,Identity,High,Walk-up,2026-05-04,"Staff member received prompt they did not initiate"
SYN-007,PaperCut copier reports toner fault,Printing,Normal,Ticket,2026-05-04,"Print and copy output both show poor quality"
SYN-008,Teams file link says access denied,Files and Collaboration,Normal,Email,2026-05-05,"User has link but not library permission"`;

function downloadSummary(filename: string, text: string) {
  const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function TicketDataImportPage() {
  const [csv, setCsv] = useState(sampleCsv);
  const summary = useMemo(() => parseSyntheticTicketCsv(csv), [csv]);

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setCsv(await file.text());
  }

  const markdown = [
    '# Synthetic Ticket Import Summary',
    '',
    `Total tickets: ${summary.totalTickets}`,
    '',
    '## Top categories',
    ...summary.categoryCounts.map((item) => `- ${item.label}: ${item.count} (${item.percentage}%)`),
    '',
    '## Top terms',
    ...summary.topTerms.map((item) => `- ${item.term}: ${item.count}`),
    '',
    '## Privacy warnings',
    ...summary.privacyWarnings.map((warning) => `- ${warning}`),
    ''
  ].join('\n');

  return (
    <div className="space-y-6 pb-12">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              <FileInput size={17} />
              Synthetic ticket data lab
            </div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
              Import synthetic tickets for trend practice
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Paste or upload fake CSV rows to practise Data Critical Thinking without importing live Jira data. The
              parser builds category, priority, channel, and keyword summaries for reflection or PD evidence.
            </p>
          </div>
          <button
            type="button"
            onClick={() => downloadSummary('synthetic-ticket-summary.md', markdown)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white"
          >
            <BarChart3 size={16} />
            Export summary
          </button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-4">
          <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-sm font-medium text-slate-700 shadow-sm">
            <Upload size={18} />
            Upload synthetic CSV
            <input type="file" accept=".csv,text/csv" onChange={handleFile} className="sr-only" />
          </label>

          <label className="block rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-sm font-semibold text-slate-900">CSV input</span>
            <textarea
              value={csv}
              onChange={(event) => setCsv(event.target.value)}
              className="mt-3 min-h-[480px] w-full rounded-2xl border border-slate-200 px-4 py-3 font-mono text-xs leading-6"
            />
          </label>
        </div>

        <aside className="space-y-4">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              <ShieldCheck size={16} />
              Import guardrail
            </div>
            <div className="mt-4 space-y-3">
              {summary.privacyWarnings.map((warning) => (
                <div key={warning} className="flex gap-3 rounded-2xl bg-amber-50 p-3 text-sm leading-6 text-amber-900">
                  <AlertTriangle className="mt-0.5 shrink-0" size={16} />
                  <span>{warning}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">Tickets imported</div>
            <div className="mt-2 text-4xl font-semibold text-slate-900">{summary.totalTickets}</div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Category mix</h2>
            <div className="mt-4 space-y-3">
              {summary.categoryCounts.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">{item.label}</span>
                    <span className="text-slate-500">{item.count} | {item.percentage}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-slate-900" style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Top terms</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {summary.topTerms.map((item) => (
                <span key={item.term} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
                  {item.term} x{item.count}
                </span>
              ))}
            </div>
          </section>
        </aside>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Imported preview</h2>
        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.16em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Ticket</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Channel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {summary.tickets.slice(0, 25).map((ticket) => (
                <tr key={ticket.id}>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">{ticket.title}</div>
                    <div className="mt-1 text-xs text-slate-500">{ticket.id} {ticket.createdDate ? `| ${ticket.createdDate}` : ''}</div>
                  </td>
                  <td className="px-4 py-3">{ticket.category}</td>
                  <td className="px-4 py-3">{ticket.priority}</td>
                  <td className="px-4 py-3">{ticket.channel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
