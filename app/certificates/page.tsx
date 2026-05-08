"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Award, Download, Printer } from 'lucide-react';
import { modules } from '../../src/data/modules';
import { buildCertificateHtml, buildCertificateRecords } from '../../src/lib/certificates';
import { getInitialProgressSnapshot, getStoredProgressSnapshot, type UserProgress } from '../../src/lib/progress';
import { getSkillCoachBadges } from '../../src/lib/skillCoach';

function downloadHtml(filename: string, html: string) {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function printCertificate(html: string) {
  const printWindow = window.open('', '_blank', 'width=1100,height=800');
  if (!printWindow) return;
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

export default function CertificatesPage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot(modules));

  useEffect(() => {
    setProgress(getStoredProgressSnapshot(modules));
  }, []);

  const certificates = useMemo(
    () => buildCertificateRecords(getSkillCoachBadges(progress), progress),
    [progress]
  );
  const earnedCount = certificates.filter((certificate) => certificate.status === 'earned').length;

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              <Award size={17} />
              Certificates
            </div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
              Exportable PD certificates and badge evidence
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Create printable, privacy-safe certificates from your DCSPrep evidence. Use the print button to save as PDF.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-100 px-5 py-4 text-sm text-slate-700">
            <span className="font-semibold text-slate-900">{earnedCount}</span> earned /{' '}
            <span className="font-semibold text-slate-900">{certificates.length}</span> available
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Evidence boundary</div>
        <p className="mt-3 text-sm leading-7 text-amber-900">
          Certificates include only learning evidence, counts, and progress summaries. They do not include live ticket,
          student, staff, parent, credential, or network details.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {certificates.map((certificate) => {
          const html = buildCertificateHtml(certificate);
          const complete = certificate.status === 'earned';

          return (
            <article
              key={certificate.id}
              className={`rounded-[2rem] border p-6 shadow-sm ${
                complete ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {certificate.status}
                  </div>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900">{certificate.title}</h2>
                </div>
                <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-900">
                  {Math.round(certificate.progressPercent)}%
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{certificate.certificateLabel}</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full bg-slate-900" style={{ width: `${certificate.progressPercent}%` }} />
              </div>
              <div className="mt-4 rounded-2xl bg-white/80 p-4 text-sm text-slate-700">
                <div className="font-semibold text-slate-900">Evidence</div>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {certificate.evidenceSummary.slice(0, 3).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => printCertificate(html)}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                >
                  <Printer size={16} />
                  Print / save PDF
                </button>
                <button
                  type="button"
                  onClick={() => downloadHtml(`${certificate.id}-certificate.html`, html)}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                >
                  <Download size={16} />
                  Download HTML
                </button>
              </div>
            </article>
          );
        })}
      </section>

      <div className="text-sm text-slate-600">
        Manage badge progress in <Link href="/skill-coach" className="font-semibold text-blue-700">Skill Coach</Link>.
      </div>
    </div>
  );
}
