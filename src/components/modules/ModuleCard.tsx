import Link from 'next/link';

type ModuleCardProps = {
  id: string;
  title: string;
  description: string;
  domain: string;
  level: string;
  estimatedMinutes: number;
  tags: string[];
  progress: number;
};

export default function ModuleCard({
  id,
  title,
  description,
  domain,
  level,
  estimatedMinutes,
  tags,
  progress
}: ModuleCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
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
