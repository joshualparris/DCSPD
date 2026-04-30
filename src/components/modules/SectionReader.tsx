"use client";

type SectionReaderProps = {
  id: string;
  title: string;
  bodyMarkdown: string;
  takeaway?: string;
  onMarkRead: (sectionId: string) => void;
  isRead: boolean;
};

export default function SectionReader({
  id,
  title,
  bodyMarkdown,
  takeaway,
  onMarkRead,
  isRead
}: SectionReaderProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h4 className="text-xl font-semibold text-slate-900">{title}</h4>
          <div className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">{bodyMarkdown}</div>
          {takeaway ? (
            <div className="mt-4 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
              <span className="font-semibold text-slate-900">Key takeaway:</span> {takeaway}
            </div>
          ) : null}
        </div>
        <button
          onClick={() => onMarkRead(id)}
          className={`rounded-full px-4 py-2 text-sm ${
            isRead ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-900 text-white'
          }`}
        >
          {isRead ? 'Marked read' : 'Mark read'}
        </button>
      </div>
    </section>
  );
}
