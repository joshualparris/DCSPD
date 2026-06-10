'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Download, FileText, Moon, Search, Sun, Upload } from 'lucide-react';
import PdfReader from '../../src/components/ebook/PdfReader';

interface EbookFile {
  name: string;
  url: string;
}

export default function EbooksPage() {
  const [files, setFiles] = useState<EbookFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<EbookFile | null>(null);
  const [query, setQuery] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [localFileUrl, setLocalFileUrl] = useState<string | null>(null);
  const [localFileName, setLocalFileName] = useState<string>('');

  useEffect(() => {
    async function loadEbookList() {
      try {
        const response = await fetch('/api/ebooks');
        const data = await response.json();
        if (response.ok) {
          setFiles(data.files || []);
          setError(null);
          if (data.files?.length) {
            setSelectedFile(data.files[0]);
          }
        } else {
          setError(data.error || 'Unable to load ebook library.');
        }
      } catch (err) {
        setError('The ebook library could not be loaded.');
      }
    }

    loadEbookList();
  }, []);

  const filteredFiles = useMemo(() => {
    if (!query) return files;
    const term = query.toLowerCase();
    return files.filter((file) => file.name.toLowerCase().includes(term));
  }, [files, query]);

  const activePdfUrl = localFileUrl || selectedFile?.url || '';
  const activePdfName = localFileName || selectedFile?.name || 'Select an ebook';

  const handleLocalFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setError('Only PDF files are supported in the ebook reader.');
      return;
    }
    setError(null);
    const url = URL.createObjectURL(file);
    setLocalFileUrl(url);
    setLocalFileName(file.name);
    setSelectedFile(null);
  };

  return (
    <div className="space-y-8 pb-12">
      <header className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-slate-600">
              <BookOpen size={20} />
              <span className="text-sm font-bold uppercase tracking-widest">Ebook Reader</span>
            </div>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">IT PD Ebook Library</h1>
            <p className="mt-3 text-lg text-slate-600 max-w-3xl">
              Browse the local IT PD ebook folder and read PDFs directly in the browser. Use dark mode for comfortable long reads and switch files instantly.
            </p>
          </div>
          <Link
            href="/settings"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800 transition"
          >
            Manage resources
            <ArrowRight size={18} />
          </Link>
        </div>
      </header>

      <section className="grid gap-8 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Local library folder</p>
                <p className="mt-2 text-sm text-slate-700">C:\dev\DCSPrepApp\IT PD Ebooks</p>
              </div>
              <button
                type="button"
                onClick={() => setDarkMode((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {darkMode ? <Moon size={16} /> : <Sun size={16} />}
                {darkMode ? 'Dark mode' : 'Light mode'}
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <label className="block text-sm font-semibold text-slate-800">Search ebooks</label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by filename..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-sm font-medium text-slate-500">
                <span>Available PDFs</span>
                <span>{filteredFiles.length} files</span>
              </div>

              <div className="mt-4 space-y-2">
                {filteredFiles.length === 0 ? (
                  <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-100 p-6 text-sm text-slate-500">
                    No ebooks found. Add PDFs to the folder or upload a local file.
                  </div>
                ) : (
                  filteredFiles.map((file) => (
                    <button
                      type="button"
                      key={file.name}
                      onClick={() => {
                        setSelectedFile(file);
                        setLocalFileUrl(null);
                        setLocalFileName('');
                      }}
                      className={`w-full text-left rounded-2xl border px-4 py-3 transition ${
                        selectedFile?.name === file.name && !localFileUrl
                          ? 'border-blue-600 bg-blue-50 text-blue-900'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-semibold">{file.name}</span>
                        <Download size={16} className="text-slate-400" />
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-white p-5">
              <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-slate-700">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                  <Upload size={18} />
                </span>
                Open local PDF
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleLocalFileChange}
                className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:hover:bg-slate-800"
              />
              <p className="mt-3 text-xs text-slate-500">
                Upload any PDF for instant reading in the browser. This is useful for one-off ebooks and notes.
              </p>
            </div>
          </div>
        </aside>

        <main className="space-y-6">
          {error && (
            <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
              {error}
            </div>
          )}

          {activePdfUrl ? (
            <PdfReader pdfUrl={activePdfUrl} fileName={activePdfName} darkMode={darkMode} />
          ) : (
            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-500">
                <FileText size={32} />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-slate-900">No ebook selected yet</h2>
              <p className="mt-3 text-slate-600">Choose a file from the list or upload a local PDF to start reading.</p>
            </div>
          )}
        </main>
      </section>
    </div>
  );
}
