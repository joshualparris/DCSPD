import './globals.css';
import type { Metadata } from 'next';
import Topbar from '../src/components/shell/Topbar';
import Sidebar from '../src/components/shell/Sidebar';

export const metadata: Metadata = {
  title: 'DCSPrep',
  description: 'A local-first DCS IT professional development dashboard.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(226,232,240,0.6),_transparent_35%),linear-gradient(180deg,_#f8fafc_0%,_#eef2f7_100%)]">
          <Topbar />
          <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-[280px_minmax(0,1fr)]">
            <Sidebar />
            <div className="min-w-0">{children}</div>
          </main>
          <footer className="border-t border-slate-200 bg-white/80 px-4 py-5 text-sm text-slate-500">
            <div className="mx-auto max-w-7xl">
              DCSPrep is a personal PD tool. Keep all entries privacy-safe and free of real student, staff,
              credential, or network details.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
