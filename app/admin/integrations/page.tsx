"use client";

import { useEffect, useMemo, useState } from 'react';
import { Clipboard, Download } from 'lucide-react';
import { modules } from '../../../src/data/modules';
import { buildIntegrationExportBundle } from '../../../src/lib/integrationExports';
import { getInitialProgressSnapshot, getStoredProgressSnapshot, type UserProgress } from '../../../src/lib/progress';

function downloadText(filename: string, text: string, type = 'text/plain;charset=utf-8') {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function IntegrationsPage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot(modules));
  const [selectedExport, setSelectedExport] = useState<'scormManifest' | 'hrisTemplateCsv' | 'supervisorCsv'>(
    'scormManifest'
  );

  useEffect(() => {
    setProgress(getStoredProgressSnapshot(modules));
  }, []);

  const bundle = useMemo(() => buildIntegrationExportBundle(progress), [progress]);
  const selectedText = bundle[selectedExport];

  async function copySelected() {
    await navigator.clipboard.writeText(selectedText);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">LMS / HRIS integration</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
            Export scaffolds for systems integration
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            These exports are safe starting points for SCORM-style LMS packaging, HR identity intake discussions, and
            supervisor reporting. They do not connect to live HRIS, LMS, M365, or school systems.
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-3">
          {[
            ['scormManifest', 'SCORM-style manifest', 'XML outline for LMS packaging.'],
            ['hrisTemplateCsv', 'HRIS identity template', 'CSV fields for onboarding/offboarding data quality.'],
            ['supervisorCsv', 'Supervisor analytics CSV', 'Manager-safe progress summary from local evidence.']
          ].map(([id, title, description]) => (
            <button
              key={id}
              type="button"
              onClick={() => setSelectedExport(id as typeof selectedExport)}
              className={`w-full rounded-2xl border p-4 text-left ${
                selectedExport === id ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-800'
              }`}
            >
              <div className="font-semibold">{title}</div>
              <div className="mt-2 text-sm opacity-75">{description}</div>
            </button>
          ))}
        </aside>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold text-slate-900">Export preview</h2>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copySelected}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
              >
                <Clipboard size={16} />
                Copy
              </button>
              <button
                type="button"
                onClick={() =>
                  downloadText(
                    selectedExport === 'scormManifest'
                      ? 'dcsprep-scorm-manifest.xml'
                      : `${selectedExport}.csv`,
                    selectedText,
                    selectedExport === 'scormManifest' ? 'application/xml;charset=utf-8' : 'text/csv;charset=utf-8'
                  )
                }
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
              >
                <Download size={16} />
                Download
              </button>
            </div>
          </div>
          <pre className="mt-5 max-h-[620px] overflow-auto rounded-2xl bg-slate-950 p-4 text-xs leading-5 text-slate-100">
            {selectedText}
          </pre>
        </section>
      </section>
    </div>
  );
}
