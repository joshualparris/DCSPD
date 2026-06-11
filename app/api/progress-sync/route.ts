import { NextResponse } from 'next/server';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { mkdir, readFile, writeFile } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SYNC_FILE_PATH = resolve(__dirname, '../../../../.dcsprep-data/progress-backup.json');

export async function GET() {
  try {
    const raw = await readFile(SYNC_FILE_PATH, 'utf8');
    return NextResponse.json({
      ok: true,
      backup: JSON.parse(raw)
    });
  } catch {
    return NextResponse.json({
      ok: true,
      backup: null,
      message: 'No server-side progress snapshot has been saved yet.'
    });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (payload?.app !== 'DCSPrep' || payload?.schemaVersion !== 1 || !payload?.progress) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Expected a DCSPrep progress backup payload.'
        },
        { status: 400 }
      );
    }

    const dir = dirname(SYNC_FILE_PATH);
    await mkdir(dir, { recursive: true });
    await writeFile(SYNC_FILE_PATH, JSON.stringify(payload, null, 2), 'utf8');

    return NextResponse.json({
      ok: true,
      savedAtIso: new Date().toISOString()
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: 'Could not save the server-side progress snapshot.'
      },
      { status: 500 }
    );
  }
}
