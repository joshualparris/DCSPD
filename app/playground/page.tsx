"use client";

import { useState, useEffect } from 'react';

const templates = {
  html: {
    id: 'html',
    title: 'HTML Support Article',
    description: 'Practice writing clean, semantic HTML for internal knowledge base pages.',
    initialCode: `<h1>Printer Troubleshooting</h1>
<p>If the printer is showing a "Ready" status but not printing, check these steps:</p>
<ul>
  <li>Verify the <strong>PaperCut</strong> client is logged in.</li>
  <li>Check for stuck jobs in the Windows Print Queue.</li>
  <li>Ensure the correct printer (e.g., <em>Follow-Me</em>) is selected.</li>
</ul>`,
    language: 'html'
  },
  python: {
    id: 'python',
    title: 'Python Support Script',
    description: 'Simulate basic Python logic for data cleaning or ticket analysis.',
    initialCode: `# Synthetic data cleaning script
asset_tags = ["dcs-123", "DCS-456", "123", "dcs789"]

def clean_tags(tags):
    cleaned = []
    for tag in tags:
        # Ensure consistent DCS- prefix and uppercase
        tag = tag.upper()
        if not tag.startsWith("DCS-"):
            if tag.startsWith("DCS"):
                tag = "DCS-" + tag[3:]
            else:
                tag = "DCS-" + tag
        cleaned.append(tag)
    return cleaned

print("Original:", asset_tags)
print("Cleaned:", clean_tags(asset_tags))`,
    language: 'python'
  }
};

export default function PlaygroundPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates.html);
  const [code, setCode] = useState(templates.html.initialCode);
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (selectedTemplate.language === 'html') {
      setOutput(code);
    } else {
      setOutput('Click "Run Script" to simulate output.');
    }
  }, [code, selectedTemplate]);

  function handleRunPython() {
    // Basic simulated execution for the common DCS scripts
    if (code.includes('clean_tags')) {
      setOutput('Original: ["dcs-123", "DCS-456", "123", "dcs789"]\nCleaned: ["DCS-123", "DCS-456", "DCS-123", "DCS-789"]');
    } else {
      setOutput('Python execution is simulated for common DCS support logic.\nOutput: [Execution successful]');
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Technical Playground</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Interactive Support Lab
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Practice the technical skills from your Academic PD track in a safe environment. Build internal KB snippets or simulate support automation scripts.
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="space-y-4">
          {Object.values(templates).map((template) => (
            <button
              key={template.id}
              onClick={() => {
                setSelectedTemplate(template);
                setCode(template.initialCode);
              }}
              className={`w-full rounded-[2rem] border p-5 text-left shadow-sm transition ${
                selectedTemplate.id === template.id ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-800'
              }`}
            >
              <div className="text-xs uppercase tracking-[0.2em] opacity-70">{template.language}</div>
              <div className="mt-3 text-xl font-semibold">{template.title}</div>
            </button>
          ))}
        </aside>

        <div className="grid gap-6 xl:grid-cols-2">
          <section className="flex flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Editor</h2>
              {selectedTemplate.language === 'python' && (
                <button
                  onClick={handleRunPython}
                  className="rounded-full bg-slate-900 px-4 py-1 text-xs font-medium text-white transition hover:bg-slate-800"
                >
                  Run Script
                </button>
              )}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-4 flex-1 font-mono text-sm min-h-[400px] w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              spellCheck={false}
            />
          </section>

          <section className="flex flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Preview / Output</h2>
            <div className="mt-4 flex-1 overflow-hidden rounded-2xl border border-slate-100 bg-white">
              {selectedTemplate.language === 'html' ? (
                <iframe
                  title="HTML Preview"
                  srcDoc={output}
                  className="h-full w-full p-4"
                />
              ) : (
                <div className="h-full w-full bg-slate-900 p-6 font-mono text-sm text-emerald-400 overflow-auto">
                  <pre>{output}</pre>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
