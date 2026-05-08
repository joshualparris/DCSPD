"use client";

import { useMemo, useState } from 'react';
import { Clipboard, Download } from 'lucide-react';
import { buildOurDcsHtmlExport, buildOurDcsMarkdownExport } from '../../src/lib/integrationExports';

function downloadText(filename: string, text: string, type: string) {
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

export default function KbSyncPage() {
  const [title, setTitle] = useState('ViewBoard no signal safe first checks');
  const [audience, setAudience] = useState('DCS staff');
  const [body, setBody] = useState(
    'Use this article when a classroom display is not showing a laptop. Confirm the exact symptom, display mode, cable path, and selected input before changing settings.'
  );
  const [format, setFormat] = useState<'markdown' | 'html'>('markdown');
  const markdown = useMemo(() => buildOurDcsMarkdownExport(title, audience, body), [title, audience, body]);
  const html = useMemo(() => buildOurDcsHtmlExport(title, audience, body), [title, audience, body]);
  const output = format === 'markdown' ? markdown : html;

  async function copyOutput() {
    await navigator.clipboard.writeText(output);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">KB sync</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
            Export help articles to OurDCS-ready Markdown or HTML
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Prepare safe article drafts that can be reviewed before copying into a knowledge base. This is an export
            workflow, not a live write into OurDCS.
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <label className="block">
            <span className="text-sm font-semibold text-slate-900">Title</span>
            <input value={title} onChange={(event) => setTitle(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
          </label>
          <label className="mt-4 block">
            <span className="text-sm font-semibold text-slate-900">Audience</span>
            <input value={audience} onChange={(event) => setAudience(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
          </label>
          <label className="mt-4 block">
            <span className="text-sm font-semibold text-slate-900">Article body</span>
            <textarea value={body} onChange={(event) => setBody(event.target.value)} className="mt-2 min-h-72 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6" />
          </label>
          <div className="mt-4 flex gap-2">
            {(['markdown', 'html'] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFormat(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  format === item ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-700'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold text-slate-900">Export preview</h2>
            <div className="flex gap-2">
              <button type="button" onClick={copyOutput} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                <Clipboard size={16} />
                Copy
              </button>
              <button
                type="button"
                onClick={() =>
                  downloadText(
                    format === 'markdown' ? 'ourdcs-article.md' : 'ourdcs-article.html',
                    output,
                    format === 'markdown' ? 'text/markdown;charset=utf-8' : 'text/html;charset=utf-8'
                  )
                }
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
              >
                <Download size={16} />
                Download
              </button>
            </div>
          </div>
          <pre className="mt-5 max-h-[620px] overflow-auto whitespace-pre-wrap rounded-2xl bg-slate-950 p-4 text-xs leading-5 text-slate-100">
            {output}
          </pre>
        </div>
      </section>
    </div>
  );
}
