import type { ProgressBackup } from '../../progress';
import type { SyncAdapter } from './types';

export class CloudApiAdapter implements SyncAdapter {
  id = 'cloud-api';
  label = 'Cloud API (Scaffold)';

  constructor(private baseUrl: string = '') {}

  async push(backup: ProgressBackup) {
    if (!this.baseUrl) {
      return { ok: false, message: 'Cloud API URL not configured in Settings.' };
    }

    try {
      const response = await fetch(`${this.baseUrl}/push`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(backup)
      });
      return (await response.json()) as { ok: boolean; message?: string; savedAtIso?: string };
    } catch (error) {
      return { ok: false, message: `Cloud push failed: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }
  }

  async pull() {
    if (!this.baseUrl) {
      return { ok: false, backup: null, message: 'Cloud API URL not configured in Settings.' };
    }

    try {
      const response = await fetch(`${this.baseUrl}/pull`, { cache: 'no-store' });
      return (await response.json()) as { ok: boolean; backup: ProgressBackup | null; message?: string };
    } catch (error) {
      return { ok: false, backup: null, message: `Cloud pull failed: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }
  }
}
