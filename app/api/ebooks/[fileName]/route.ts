import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EBOOKS_FOLDER = path.resolve(
  process.env.EBOOKS_DIR || path.join(__dirname, '../../../../../IT PD Ebooks')
);

function isPdfFile(fileName: string) {
  return fileName.toLowerCase().endsWith('.pdf');
}

export async function GET(
  request: Request,
  context: { params: Promise<{ fileName: string }> }
) {
  const params = await context.params;
  const fileName = decodeURIComponent(params.fileName || '');
  if (!fileName || !isPdfFile(fileName)) {
    return NextResponse.json({ error: 'Invalid ebook file requested.' }, { status: 400 });
  }

  const resolvedFolder = path.resolve(EBOOKS_FOLDER);
  const safePath = path.resolve(path.join(resolvedFolder, fileName));
  if (!safePath.startsWith(resolvedFolder + path.sep) && safePath !== resolvedFolder) {
    return NextResponse.json({ error: 'Ebook file path is not allowed.' }, { status: 400 });
  }

  try {
    const fileBuffer = await fs.readFile(safePath);
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${path.basename(fileName)}"`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Unable to open the requested ebook file. Make sure it exists in the configured folder.',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 404 }
    );
  }
}
