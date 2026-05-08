"use client";

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { HardDrive, ChevronRight, Search, Plus, Filter, Tag } from 'lucide-react';
import { getCustomAssets } from '../../src/lib/customModules';
import type { DcsAssetProfile } from '../../src/types/assets';

export default function AssetsPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [customAssets, setCustomAssets] = useState<DcsAssetProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setHasMounted(true);
    setCustomAssets(getCustomAssets());
  }, []);

  const filteredAssets = useMemo(() => {
    if (!searchQuery) return customAssets;
    const q = searchQuery.toLowerCase();
    return customAssets.filter(a => 
      a.name.toLowerCase().includes(q) || 
      a.description.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q)
    );
  }, [customAssets, searchQuery]);

  if (!hasMounted) return null;

  return (
    <div className="space-y-6 pb-12">
      <header className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-slate-600">
              <HardDrive size={20} />
              <span className="text-sm font-bold uppercase tracking-widest">Asset Catalog</span>
            </div>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
              System & Asset Profiles
            </h1>
            <p className="mt-3 text-lg text-slate-600">
              Technical overviews and Level 1 boundaries for DCS IT systems.
            </p>
          </div>
          <Link 
            href="/settings"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800 transition-all"
          >
            <Plus size={18} />
            Add New Asset
          </Link>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search assets by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
            />
          </div>
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {filteredAssets.length > 0 ? (
          filteredAssets.map((asset) => (
            <Link
              key={asset.id}
              href={`/assets/${asset.id}`}
              className="group flex flex-col rounded-[2rem] border border-slate-200 bg-white p-6 hover:border-blue-200 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {asset.category}
                </span>
                <Tag size={14} className="text-slate-300" />
              </div>
              
              <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {asset.name}
              </h3>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">
                {asset.description}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-4">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Details</span>
                <ChevronRight className="text-slate-300 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" size={16} />
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full rounded-[2.5rem] border border-dashed border-slate-200 p-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
              <HardDrive size={32} />
            </div>
            <h3 className="mt-6 text-xl font-bold text-slate-900">No assets found</h3>
            <p className="mt-2 text-slate-500">
              Add asset profiles in Settings to build your technical reference library.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
