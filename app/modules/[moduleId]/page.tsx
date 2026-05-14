"use client";

import { useEffect, useState } from 'react';
import ModuleDetail from '../../../src/components/modules/ModuleDetail';
import { getModuleById as getBaseModuleById } from '../../../src/data/modules';
import { getCustomModules } from '../../../src/lib/customModules';
import { useOfflineDownload } from '../../../src/hooks/useOfflineDownload';
import type { TrainingModule } from '../../../src/types/training';

export default function ModulePage({ params }: { params: { moduleId: string } }) {
  const [hasMounted, setHasMounted] = useState(false);
  const [moduleData, setModuleData] = useState<TrainingModule | undefined>(() => {
    // Try base modules first (safe for SSR)
    return getBaseModuleById(params.moduleId);
  });

  const { getDownloadedModule, isReady } = useOfflineDownload();

  useEffect(() => {
    setHasMounted(true);
    
    async function loadModule() {
      if (moduleData) return;

      // 1. Try custom modules (client-only)
      const custom = getCustomModules().find(m => m.id === params.moduleId);
      if (custom) {
        setModuleData(custom);
        return;
      }

      // 2. Try IndexedDB if ready (offline support)
      if (isReady) {
        try {
          const downloaded = await getDownloadedModule(params.moduleId);
          if (downloaded) {
            setModuleData(downloaded);
          }
        } catch (err) {
          console.error('Failed to load offline module', err);
        }
      }
    }

    loadModule();
  }, [params.moduleId, moduleData, isReady, getDownloadedModule]);

  if (!hasMounted) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-8 w-48 animate-pulse bg-slate-100 rounded-lg" />
        <div className="mt-4 h-32 w-full animate-pulse bg-slate-100 rounded-lg" />
      </div>
    );
  }

  if (!moduleData) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Module not found</h1>
        <p className="mt-3 text-sm text-slate-600">
          This module id does not match the current module catalogue.
        </p>
      </div>
    );
  }

  return <ModuleDetail moduleData={moduleData} />;
}
