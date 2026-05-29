"use client";

import * as React from 'react';
import { useEffect, useState } from 'react';
import ModuleDetail from '../../../src/components/modules/ModuleDetail';
import { getModuleById as getBaseModuleById } from '../../../src/data/modules';
import { getCustomModules } from '../../../src/lib/customModules';
import { useOfflineDownload } from '../../../src/hooks/useOfflineDownload';
import type { TrainingModule } from '../../../src/types/training';

export default function ModulePage({ params }: { params: any }) {
  const [moduleId, setModuleId] = useState<string | undefined>(undefined);
  const [hasMounted, setHasMounted] = useState(false);
  const [moduleData, setModuleData] = useState<TrainingModule | undefined>(undefined);

  const { getDownloadedModule, isReady } = useOfflineDownload();

  useEffect(() => {
    setHasMounted(true);
    
    async function loadModule() {
      // Robustly unwrap params (works for both Next 14 and 15)
      const resolvedParams = await params;
      const mId = resolvedParams?.moduleId;
      setModuleId(mId);

      if (!mId) return;

      // 1. Check base modules
      const base = getBaseModuleById(mId);
      if (base) {
        setModuleData(base);
        return;
      }

      // 2. Try custom modules (client-only)
      const custom = getCustomModules().find(m => m.id === mId);
      if (custom) {
        setModuleData(custom);
        return;
      }

      // 3. Try IndexedDB if ready (offline support)
      if (isReady) {
        try {
          const downloaded = await getDownloadedModule(mId);
          if (downloaded) {
            setModuleData(downloaded);
          }
        } catch (err) {
          console.error('Failed to load offline module', err);
        }
      }
    }

    loadModule();
  }, [params, isReady, getDownloadedModule]);

  if (!hasMounted) {
    return (
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="h-8 w-48 animate-pulse bg-slate-100 rounded-lg" />
          <div className="mt-4 h-32 w-full animate-pulse bg-slate-100 rounded-lg" />
        </section>
      </div>
    );
  }

  if (!moduleData) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Module not found</h1>
        <p className="mt-3 text-sm text-slate-600">
          The module ID "{moduleId}" does not match the current module catalogue.
        </p>
      </div>
    );
  }

  return <ModuleDetail moduleData={moduleData} />;
}
