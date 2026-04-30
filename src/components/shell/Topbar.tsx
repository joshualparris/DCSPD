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

export default function Topbar() {
  const pathname = usePathname();

  return (
    <div className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Link href="/" className="text-xl font-semibold tracking-tight text-slate-900">
              DCSPrep
            </Link>
            <p className="mt-1 max-w-2xl text-sm text-slate-600">
              Professional development dashboard for DCS IT support knowledge, assessment, documentation, and
              situational practice.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 md:max-w-md">
            Use this application only during approved professional development periods. Tickets, walk-ups, calls,
            and Paul&apos;s instructions take priority over professional development.
          </div>
        </div>

        <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 md:hidden">
          {navigationItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm ${
                  active
                    ? 'bg-slate-900 text-white'
                    : 'border border-slate-200 bg-white text-slate-700'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
