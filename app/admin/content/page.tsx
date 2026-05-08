"use client";

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import { academicSubjects } from '../../../src/data/academicSubjects';
import { getContentGovernanceRecords, getContentGovernanceSummary } from '../../../src/lib/contentGovernance';

function downloadJson(filename: string, value: unknown) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function ContentGovernancePage() {
  const [selectedSubjectId, setSelectedSubjectId] = useState(academicSubjects[0]?.id || '');
  const [draftSummary, setDraftSummary] = useState(academicSubjects[0]?.summary || '');
  const [draftReviewNote, setDraftReviewNote] = useState('Reviewed for privacy-safe DCS relevance.');
  const records = useMemo(() => getContentGovernanceRecords(), []);
  const summary = useMemo(() => getContentGovernanceSummary(records), [records]);
  const selectedSubject = academicSubjects.find((subject) => subject.id === selectedSubjectId) || academicSubjects[0];
  const selectedRecord = records.find((record) => record.id === `subject-${selectedSubject?.id}`);

  function selectSubject(subjectId: string) {
    const subject = academicSubjects.find((item) => item.id === subjectId);
    setSelectedSubjectId(subjectId);
    setDraftSummary(subject?.summary || '');
  }

  function exportDraft() {
    downloadJson(`${selectedSubject.code.toLowerCase()}-admin-draft.json`, {
      subjectId: selectedSubject.id,
      subjectCode: selectedSubject.code,
      title: selectedSubject.title,
      summary: draftSummary,
      reviewNote: draftReviewNote,
      reviewedAtIso: new Date().toISOString(),
      sourceStatus: selectedSubject.sourceStatus,
      localOnly: true
    });
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Content governance</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
            Review status, source health, and admin draft edits
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            This page tracks what needs review and lets you prepare JSON edit drafts without touching TypeScript. Drafts
            are review packages, not direct live database writes.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-5">
        {[
          ['Total', summary.total],
          ['Current', summary.current],
          ['Review soon', summary.reviewSoon],
          ['Stale', summary.stale],
          ['Source check', summary.needsSourceCheck]
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">{label}</div>
            <div className="mt-2 text-3xl font-semibold text-slate-900">{value}</div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_430px]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Review queue</h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.16em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Next review</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {records.slice(0, 30).map((record) => (
                  <tr key={record.id}>
                    <td className="px-4 py-3">
                      <Link href={record.href} className="font-semibold text-blue-700">
                        {record.title}
                      </Link>
                      <div className="mt-1 text-xs text-slate-500">{record.type} | {record.sourceStatus}</div>
                    </td>
                    <td className="px-4 py-3">{record.status}</td>
                    <td className="px-4 py-3">{record.nextReviewIso}</td>
                    <td className="px-4 py-3 text-slate-600">{record.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Subject draft editor</h2>
          <label className="mt-4 block">
            <span className="text-sm font-semibold text-slate-700">Subject</span>
            <select
              value={selectedSubjectId}
              onChange={(event) => selectSubject(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            >
              {academicSubjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.code} - {subject.title}
                </option>
              ))}
            </select>
          </label>

          {selectedRecord ? (
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
              <div>Status: <span className="font-semibold text-slate-900">{selectedRecord.status}</span></div>
              <div className="mt-1">Last reviewed: {selectedRecord.lastReviewedIso}</div>
              <div className="mt-1">Next review: {selectedRecord.nextReviewIso}</div>
            </div>
          ) : null}

          <label className="mt-4 block">
            <span className="text-sm font-semibold text-slate-700">Draft summary</span>
            <textarea
              value={draftSummary}
              onChange={(event) => setDraftSummary(event.target.value)}
              className="mt-2 min-h-44 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            />
          </label>

          <label className="mt-4 block">
            <span className="text-sm font-semibold text-slate-700">Review note</span>
            <textarea
              value={draftReviewNote}
              onChange={(event) => setDraftReviewNote(event.target.value)}
              className="mt-2 min-h-28 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            />
          </label>

          <button
            type="button"
            onClick={exportDraft}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            <Download size={16} />
            Export admin draft JSON
          </button>
        </aside>
      </section>
    </div>
  );
}
