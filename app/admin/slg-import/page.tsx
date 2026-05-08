"use client";

import { useMemo, useState } from 'react';
import { Clipboard, Download, FileText } from 'lucide-react';
import { buildAcademicSubjectDraftJson, parseSlgTextDraft } from '../../../src/lib/slgImport';

const sampleText = `CSE1PE Programming Environment
Subject Intended Learning Outcomes
SILO 1 Explain the role of algorithms, flowcharts, inputs, outputs, and decisions in solving computing problems.
SILO 2 Apply selection, iteration, functions, and data structures to small programming tasks.
SILO 3 Test, debug, document, and communicate simple programs responsibly.
1 03/03/2025 Algorithms and Flowcharts (Lecture; Lab; Coding exercise) 2
2 10/03/2025 Statements and Expressions (Lecture; Lab; Coding exercise) 2
3 17/03/2025 Booleans and Conditional Execution (Lecture; Lab; Coding exercise) 2
4 24/03/2025 Iteration (Lecture; Lab; Coding exercise) 2
5 31/03/2025 Functions and Objects (Lecture; Lab; Coding exercise) 2
6 07/04/2025 Strings and Files (Lecture; Lab; Coding exercise) 2
7 28/04/2025 Data Structures (Lecture; Lab; Coding exercise) 2
8 05/05/2025 Software Errors (Lecture; Lab; Coding exercise) 2`;

function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function SlgImportPage() {
  const [sourceFileName, setSourceFileName] = useState('SLG-draft.pdf');
  const [text, setText] = useState(sampleText);
  const draft = useMemo(() => parseSlgTextDraft(text, sourceFileName), [text, sourceFileName]);
  const draftJson = useMemo(() => buildAcademicSubjectDraftJson(draft), [draft]);

  async function copyDraft() {
    await navigator.clipboard.writeText(draftJson);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              <FileText size={17} />
              SLG import draft tool
            </div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
              Parse pasted SLG text into a subject draft
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Paste text copied from an SLG PDF. The parser detects subject code, SILOs, and week rows, then creates a
              draft JSON package for admin review. Full binary PDF extraction is still a later hardening step.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-100 px-5 py-4 text-sm text-slate-700">
            Confidence: <span className="font-semibold text-slate-900">{draft.confidence}</span>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_430px]">
        <div className="space-y-4">
          <label className="block rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-sm font-semibold text-slate-900">Source filename</span>
            <input
              value={sourceFileName}
              onChange={(event) => setSourceFileName(event.target.value)}
              className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            />
          </label>

          <label className="block rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-sm font-semibold text-slate-900">Pasted SLG text</span>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              className="mt-3 min-h-[520px] w-full rounded-2xl border border-slate-200 px-4 py-3 font-mono text-xs leading-6"
            />
          </label>
        </div>

        <aside className="space-y-4">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{draft.subjectCode}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{draft.title}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-slate-500">SILOs</div>
                <div className="mt-1 text-2xl font-semibold text-slate-900">{draft.silos.length}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-slate-500">Weeks</div>
                <div className="mt-1 text-2xl font-semibold text-slate-900">{draft.weeklyTopics.length}</div>
              </div>
            </div>
            {draft.warnings.length ? (
              <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
                <div className="font-semibold">Review warnings</div>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {draft.warnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Detected SILOs</h2>
            <div className="mt-4 space-y-3">
              {draft.silos.map((silo) => (
                <div key={silo.id} className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">SILO {silo.number}: </span>
                  {silo.text}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Draft JSON</h2>
            <pre className="mt-4 max-h-80 overflow-auto rounded-2xl bg-slate-950 p-4 text-xs leading-5 text-slate-100">
              {draftJson}
            </pre>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyDraft}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
              >
                <Clipboard size={16} />
                Copy draft
              </button>
              <button
                type="button"
                onClick={() => downloadText(`${draft.subjectCode.toLowerCase()}-slg-draft.json`, draftJson)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
              >
                <Download size={16} />
                Download
              </button>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}
