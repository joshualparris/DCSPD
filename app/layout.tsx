import './globals.css';
import type { Metadata, Viewport } from 'next';
import Topbar from '../src/components/shell/Topbar';
import Sidebar from '../src/components/shell/Sidebar';
import PwaRegistration from '../src/components/shell/PwaRegistration';
import AppUsageTracker from '../src/components/usage/AppUsageTracker';
import { APP_NAME, APP_DESCRIPTION, APP_SHORT_NAME } from '../src/config/appConfig';

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_SHORT_NAME,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0f172a'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content={APP_SHORT_NAME} />
      </head>
      <body className="dark:bg-slate-950 transition-colors">
        <PwaRegistration />
        <AppUsageTracker />
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(226,232,240,0.6),_transparent_35%),linear-gradient(180deg,_#f8fafc_0%,_#eef2f7_100%)] dark:bg-none dark:bg-slate-950">
          <Topbar />
          <main
            id="main-content"
            role="main"
            className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-[280px_minmax(0,1fr)]"
          >
            <Sidebar />
            <div className="min-w-0">{children}</div>
          </main>
          <footer className="border-t border-slate-200 bg-white/80 px-4 py-5 text-sm text-slate-500 dark:bg-slate-900/80 dark:border-slate-800 dark:text-slate-400">
            <div className="mx-auto max-w-7xl">
              {APP_NAME} is a personal PD tool. Keep all entries privacy-safe and free of real student, staff,
              credential, or network details.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
