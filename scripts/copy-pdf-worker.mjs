// Copies the installed pdfjs-dist worker into public/ so the in-browser PDF
// reader loads a worker that exactly matches the installed pdfjs-dist version.
// PDF.js refuses to run if the worker and API versions differ, so this must be
// regenerated on every install rather than committing a fixed copy.
import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const root = dirname(dirname(fileURLToPath(import.meta.url)));

async function main() {
  let source;
  try {
    // Resolve relative to the installed package so the path is always correct.
    const pkg = require.resolve('pdfjs-dist/package.json');
    source = join(dirname(pkg), 'build', 'pdf.worker.min.mjs');
  } catch {
    console.warn('[copy-pdf-worker] pdfjs-dist not installed; skipping.');
    return;
  }

  const destDir = join(root, 'public');
  const dest = join(destDir, 'pdf.worker.min.mjs');
  try {
    await mkdir(destDir, { recursive: true });
    await copyFile(source, dest);
    console.log('[copy-pdf-worker] Copied PDF.js worker to public/pdf.worker.min.mjs');
  } catch (error) {
    console.warn('[copy-pdf-worker] Could not copy worker:', error.message);
  }
}

main();
