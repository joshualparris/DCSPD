import { mkdir, readFile, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { NextResponse } from 'next/server';

const SYNC_FILE = join(process.cwd(), '.dcsprep-data', 'progress-backup.json');

export async function GET() {
  try {
    const raw = await readFile(SYNC_FILE, 'utf8');
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

    await mkdir(dirname(SYNC_FILE), { recursive: true });
    await writeFile(SYNC_FILE, JSON.stringify(payload, null, 2), 'utf8');

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
