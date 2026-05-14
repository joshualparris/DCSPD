import type { ProgressBackup } from '../../progress';

export interface SyncAdapter {
  id: string;
  label: string;
  push(backup: ProgressBackup): Promise<{ ok: boolean; message?: string; savedAtIso?: string }>;
  pull(): Promise<{ ok: boolean; backup: ProgressBackup | null; message?: string }>;
}
