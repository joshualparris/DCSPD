import React from 'react';
import { ArrowLeft, Info, Download, Terminal, Settings } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'OneDrive Migration Guide | DCSPrep',
  description: 'How to move your project out of OneDrive for better performance and stability.',
};

export default function MigrationGuidePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-8">
      <Link href="/settings" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
        <ArrowLeft size={16} />
        Back to Settings
      </Link>

      <header className="rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-sm">
        <div className="flex items-center gap-2 text-amber-600">
          <Info size={24} />
          <span className="text-sm font-bold uppercase tracking-widest">Maintenance</span>
        </div>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900">Project Migration Guide</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600 font-medium italic">
          Moving your project out of OneDrive for better performance and stability.
        </p>
      </header>

      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why migrate?</h2>
          <p className="text-slate-600 mb-4">
            Running Node.js projects inside OneDrive (or similar sync services) frequently causes issues:
          </p>
          <ul className="space-y-3">
            <li className="flex gap-3 text-slate-600">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
              <span><strong>File Locking:</strong> OneDrive may lock files for syncing while the build process is trying to read/write them, causing build failures.</span>
            </li>
            <li className="flex gap-3 text-slate-600">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
              <span><strong>Performance:</strong> Constant syncing of <code>node_modules</code> (thousands of small files) slows down both the PC and the sync service.</span>
            </li>
            <li className="flex gap-3 text-slate-600">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
              <span><strong>Build Conflicts:</strong> Stale <code>.next</code> or <code>dist</code> files may sync between devices, causing unpredictable runtime errors.</span>
            </li>
          </ul>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Settings size={24} className="text-blue-600" />
            Recommended Target Path
          </h2>
          <p className="text-slate-600 mb-4">
            Move the project to a local, non-synced directory such as:
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <code className="block text-blue-700">C:\Projects\DCSPrepApp</code>
            <code className="block text-blue-700">C:\Dev\DCSPrepApp</code>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Migration Steps</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white font-bold">1</span>
              <div>
                <p className="font-bold text-slate-900">Close all IDEs and Terminals</p>
                <p className="text-sm text-slate-600">Ensure Trae, VS Code, and any terminal windows are closed.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white font-bold">2</span>
              <div>
                <p className="font-bold text-slate-900">Stop Syncing</p>
                <p className="text-sm text-slate-600">If possible, pause OneDrive syncing temporarily.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white font-bold">3</span>
              <div>
                <p className="font-bold text-slate-900">Copy (don&apos;t move) the folder</p>
                <p className="text-sm text-slate-600">Copy the project folder from OneDrive and paste it into your new local directory (e.g., <code>C:\Projects\</code>).</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white font-bold">4</span>
              <div>
                <p className="font-bold text-slate-900">Clean up the new copy</p>
                <p className="text-sm text-slate-600 mb-2">Open a terminal in the NEW path and delete the <code>node_modules</code> and <code>.next</code> folders:</p>
                <div className="bg-slate-900 p-4 rounded-xl text-emerald-400 flex items-center justify-between">
                  <code className="text-sm">rm -Recurse -Force node_modules, .next</code>
                  <Terminal size={16} />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white font-bold">5</span>
              <div>
                <p className="font-bold text-slate-900">Reinstall Dependencies</p>
                <div className="bg-slate-900 p-4 rounded-xl text-emerald-400 mt-2 flex items-center justify-between">
                  <code className="text-sm">npm install</code>
                  <Terminal size={16} />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white font-bold">6</span>
              <div>
                <p className="font-bold text-slate-900">Verify Build</p>
                <div className="bg-slate-900 p-4 rounded-xl text-emerald-400 mt-2 flex items-center justify-between">
                  <code className="text-sm">npm run build</code>
                  <Terminal size={16} />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white font-bold">7</span>
              <div>
                <p className="font-bold text-slate-900">Delete the old OneDrive copy</p>
                <p className="text-sm text-slate-600">Once you&apos;ve verified the new path works, you can safely delete the folder from OneDrive.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Updating GitHub</h2>
          <p className="text-slate-600">
            Your Git configuration remains inside the <code>.git</code> folder. After moving, simply open the new folder in Trae. Your remote origin will still be there.
          </p>
        </section>
      </div>

      <footer className="text-center pb-12">
        <a 
          href="/MIGRATION_GUIDE.md" 
          download 
          className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700"
        >
          <Download size={16} />
          Download as Markdown file
        </a>
      </footer>
    </div>
  );
}
