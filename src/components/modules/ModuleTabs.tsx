"use client";
import React, { useState } from 'react';

export default function ModuleTabs({ tabs, onChange }: { tabs: string[]; onChange?: (tab: string) => void; children?: React.ReactNode }) {
  const [active, setActive] = useState(tabs[0] || '');
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => {
              setActive(t); onChange?.(t);
            }}
            className={`rounded-full px-4 py-2 text-sm ${
              active === t ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div>{/* The consumer will implement showing specific content for selected tab */}</div>
    </div>
  );
}
