import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EBOOKS_FOLDER = path.resolve(
  process.env.EBOOKS_DIR || path.join(__dirname, '../../../../IT PD Ebooks')
);

export async function GET() {
  try {
    const entries = await fs.readdir(EBOOKS_FOLDER, { withFileTypes: true });
    const pdfFiles = entries
      .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.pdf'))
      .map((entry) => ({
        name: entry.name,
        url: `/api/ebooks/${encodeURIComponent(entry.name)}`,
      }))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

    return NextResponse.json({
      directory: EBOOKS_FOLDER,
      files: pdfFiles,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Unable to read the ebook library folder. Ensure the folder exists and contains PDFs.',
        details: error instanceof Error ? error.message : String(error),
        directory: EBOOKS_FOLDER,
      },
      { status: 500 }
    );
  }
}
