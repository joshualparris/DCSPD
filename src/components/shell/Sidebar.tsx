"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationItems } from './navigation';

function isActive(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname.startsWith(href);
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:block">
      <div className="border-b border-slate-100 pb-4">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">DCSPrep</div>
        <div className="mt-2 text-lg font-semibold text-slate-900">Professional Development Dashboard</div>
        <p className="mt-2 text-sm text-slate-600">
          Structured IT professional development aligned with DCS support responsibilities.
        </p>
      </div>

      <nav className="mt-4 space-y-2">
        {navigationItems.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-2xl px-4 py-3 text-sm transition ${
                active
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
        <div className="font-semibold text-slate-900">Support comes first</div>
        <p className="mt-2">
          This app is for personal PD only. Do not enter real student, staff, parent, credential, or network
          details.
        </p>
      </div>
    </aside>
  );
}
