'use client';

import { useEffect, useRef, useState } from 'react';

interface PdfReaderProps {
  pdfUrl: string;
  fileName: string;
  darkMode: boolean;
}

export default function PdfReader({ pdfUrl, fileName, darkMode }: PdfReaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pdf, setPdf] = useState<any>(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    setPdf(null);
    setNumPages(0);
    setPageNumber(1);

    async function loadPdf() {
      try {
        const pdfjsLib = await import('pdfjs-dist');
        // Use the locally bundled worker (kept in sync with the installed
        // pdfjs-dist version by the postinstall copy step). PDF.js v5 ships an
        // ES-module worker (.mjs); the previous CDN URL pointed at a v4-style
        // ".js" file that does not exist for v5, so every document failed to load.
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdfDocument = await loadingTask.promise;
        if (cancelled) return;
        setPdf(pdfDocument);
        setNumPages(pdfDocument.numPages);
        setIsLoading(false);
      } catch (err) {
        if (cancelled) return;
        setError('Unable to load this document. Please try another file or refresh the page.');
        setIsLoading(false);
      }
    }

    loadPdf();

    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  useEffect(() => {
    let cancelled = false;
    let renderTask: { cancel: () => void; promise: Promise<void> } | null = null;

    async function renderPage() {
      if (!pdf || !canvasRef.current) return;
      setIsLoading(true);
      setError(null);
      try {
        const page = await pdf.getPage(pageNumber);
        if (cancelled) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Canvas context unavailable');

        // Render the backing store at device-pixel-ratio for crisp text, but
        // size the canvas in CSS at the logical width with height:auto so the
        // page always keeps its true aspect ratio (no stretching) and scales
        // down to fit the container.
        const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
        const viewport = page.getViewport({ scale });
        const renderViewport = page.getViewport({ scale: scale * dpr });

        canvas.width = Math.floor(renderViewport.width);
        canvas.height = Math.floor(renderViewport.height);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = 'auto';

        const currentRenderTask = page.render({
          canvasContext: context,
          viewport: renderViewport,
        });
        renderTask = currentRenderTask;

        await currentRenderTask.promise;
        if (!cancelled) setIsLoading(false);
      } catch (err) {
        if (!cancelled && (err as { name?: string }).name !== 'RenderingCancelledException') {
          setError('Unable to render this page.');
          setIsLoading(false);
        }
      }
    }

    renderPage();

    return () => {
      cancelled = true;
      renderTask?.cancel();
    };
  }, [pdf, pageNumber, scale]);

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > numPages) return;
    setPageNumber(nextPage);
  };

  const handleZoom = (factor: number) => {
    setScale((current) => Math.min(3, Math.max(0.8, current + factor)));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{fileName}</h1>
          <p className="mt-1 text-sm text-slate-500">PDF reader with page navigation, zoom, and display mode.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition"
          >
            Download PDF
          </a>
          <button
            type="button"
            onClick={() => handlePageChange(1)}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            First page
          </button>
          <button
            type="button"
            onClick={() => handlePageChange(numPages)}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            Last page
          </button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="space-y-4">
            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
                <span>Page</span>
                <span>{pageNumber} / {numPages || '-'}</span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handlePageChange(pageNumber - 1)}
                  disabled={pageNumber <= 1}
                  className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => handlePageChange(pageNumber + 1)}
                  disabled={pageNumber >= numPages}
                  className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
                <span>Zoom</span>
                <span>{Math.round(scale * 100)}%</span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleZoom(-0.2)}
                  className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => handleZoom(0.2)}
                  className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition"
                >
                  +
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
                <span>Display mode</span>
                <span>{darkMode ? 'Dark' : 'Light'}</span>
              </div>
              <p className="mt-3 text-sm text-slate-500">
                Dark mode is applied to the rendered PDF canvas to keep your reading environment comfortable.
              </p>
            </div>
          </div>
        </aside>

        <div className="rounded-[2rem] border border-slate-200 bg-slate-900/5 p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Ebook Preview</p>
              <p className="mt-1 text-sm text-slate-400">Rendered with PDF.js in the browser.</p>
            </div>
            {isLoading && <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] font-semibold uppercase text-white">Loading</span>}
          </div>
          {error ? (
            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
              {error}
            </div>
          ) : (
            <div className="overflow-auto rounded-[1.75rem] bg-slate-100 p-4">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-white p-3 shadow-inner">
                <canvas
                  ref={canvasRef}
                  className={`mx-auto block h-auto max-w-full ${darkMode ? 'invert hue-rotate-180 brightness-90 contrast-90' : ''}`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
