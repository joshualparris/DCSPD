export function isoNow() {
  return new Date().toISOString();
}

export function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

export function isRunningInOneDrive(): boolean {
  if (typeof window !== 'undefined') return false; // Server-side only check
  const cwd = process.cwd().toLowerCase();
  return cwd.includes('onedrive') || cwd.includes('dropbox') || cwd.includes('google drive');
}
