import { LocalServerAdapter } from './adapters/localServer';
import { CloudApiAdapter } from './adapters/cloudApi';
import type { SyncAdapter } from './adapters/types';
import type { ProgressBackup } from '../progress';

export type SyncProvider = 'local-server' | 'cloud-api';

export class SyncManager {
  private adapters: Record<SyncProvider, SyncAdapter>;

  constructor(cloudBaseUrl: string = '') {
    this.adapters = {
      'local-server': new LocalServerAdapter(),
      'cloud-api': new CloudApiAdapter(cloudBaseUrl)
    };
  }

  getAdapter(provider: SyncProvider): SyncAdapter {
    return this.adapters[provider];
  }

  async sync(provider: SyncProvider, backup: ProgressBackup) {
    const adapter = this.getAdapter(provider);
    return adapter.push(backup);
  }

  async fetch(provider: SyncProvider) {
    const adapter = this.getAdapter(provider);
    return adapter.pull();
  }
}

export function getSyncSettings() {
  if (typeof window === 'undefined') return { provider: 'local-server' as SyncProvider, cloudUrl: '' };
  
  const provider = (localStorage.getItem('dcsprep_sync_provider') as SyncProvider) || 'local-server';
  const cloudUrl = localStorage.getItem('dcsprep_cloud_sync_url') || '';
  
  return { provider, cloudUrl };
}

export function saveSyncSettings(provider: SyncProvider, cloudUrl: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('dcsprep_sync_provider', provider);
  localStorage.setItem('dcsprep_cloud_sync_url', cloudUrl);
}
