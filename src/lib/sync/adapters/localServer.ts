import type { ProgressBackup } from '../../progress';
import type { SyncAdapter } from './types';

export class LocalServerAdapter implements SyncAdapter {
  id = 'local-server';
  label = 'Local Next.js Server';

  async push(backup: ProgressBackup) {
    const response = await fetch('/api/progress-sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(backup)
    });
    return (await response.json()) as { ok: boolean; message?: string; savedAtIso?: string };
  }

  async pull() {
    const response = await fetch('/api/progress-sync', { cache: 'no-store' });
    const payload = (await response.json()) as { ok: boolean; backup: ProgressBackup | null; message?: string };
    return payload;
  }
}
