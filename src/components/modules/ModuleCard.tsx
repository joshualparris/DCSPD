import Link from 'next/link';
import { History } from 'lucide-react';

type ModuleCardProps = {
  id: string;
  title: string;
  description: string;
  domain: string;
  level: string;
  estimatedMinutes: number;
  tags: string[];
  progress: number;
  targetEnvironment?: 'DCS' | 'MSP' | 'Generic';
  currentCareerFocus?: 'DCS' | 'MSP' | 'Generic';
};

export default function ModuleCard({
  id,
  title,
  description,
  domain,
  level,
  estimatedMinutes,
  tags,
  progress,
  targetEnvironment,
  currentCareerFocus
}: ModuleCardProps) {
  const isHistoricalDcs = currentCareerFocus !== 'DCS' && targetEnvironment === 'DCS' && progress > 0;

  return (
    <article className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      {isHistoricalDcs && (
        <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
          <History size={12} />
          Historical DCS Context
        </div>
      )}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1">{domain}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">{level}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">{estimatedMinutes} min</span>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-2">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-slate-900" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="mt-2">
          <Link
            href={`/modules/${id}`}
            className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
          >
            Open module
          </Link>
        </div>
      </div>
    </article>
  );
}
