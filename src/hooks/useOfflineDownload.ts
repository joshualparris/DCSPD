"use client";

import { useState, useEffect } from 'react';
import type { TrainingModule } from '../types/training';

// Database name and version
const DB_NAME = 'DCSPrepOffline';
const DB_VERSION = 1;
const STORE_NAME = 'modules';

export function useOfflineDownload() {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [downloadedModuleIds, setDownloadedModuleIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      setDb(database);
      refreshDownloadedList(database);
    };
  }, []);

  const refreshDownloadedList = (database: IDBDatabase) => {
    const transaction = database.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAllKeys();

    request.onsuccess = () => {
      setDownloadedModuleIds(new Set(request.result as string[]));
    };
  };

  const downloadModule = async (module: TrainingModule) => {
    if (!db) return;

    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(module);

      request.onsuccess = () => {
        refreshDownloadedList(db);
        resolve();
      };

      request.onerror = () => reject(request.error);
    });
  };

  const removeModule = async (moduleId: string) => {
    if (!db) return;

    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(moduleId);

      request.onsuccess = () => {
        refreshDownloadedList(db);
        resolve();
      };

      request.onerror = () => reject(request.error);
    });
  };

  const getDownloadedModule = async (moduleId: string) => {
    if (!db) return null;

    return new Promise<TrainingModule | null>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(moduleId);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  };

  return {
    downloadedModuleIds,
    downloadModule,
    removeModule,
    getDownloadedModule,
    isReady: !!db
  };
}
