import { NextResponse } from 'next/server';

export async function GET() {
  const cwd = process.cwd().toLowerCase();
  const isOneDrive = cwd.includes('onedrive') || cwd.includes('dropbox') || cwd.includes('google drive');
  
  return NextResponse.json({
    isOneDrive,
    path: process.cwd()
  });
}
