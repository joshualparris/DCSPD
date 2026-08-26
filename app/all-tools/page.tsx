import Link from 'next/link';

const groups = [
  {
    title: 'Study & learning',
    items: [
      ['Dashboard', '/'],
      ['Resume Study', '/resume-study'],
      ['Due Today', '/due-today'],
      ['Focus', '/focus'],
      ['Daily Challenge', '/daily-challenge'],
      ['Scheduler', '/scheduler'],
      ['Skill Coach', '/skill-coach'],
      ['Modules', '/modules'],
      ['Learning Paths', '/paths'],
      ['Academic / Career PD', '/academic-pd'],
      ['Academic Bridge', '/academic-pd/bridge'],
      ['Academic Feedback', '/academic-pd/feedback'],
      ['Weekly PD Path', '/weekly-pd-path'],
      ['Recent Updates', '/recent-updates'],
      ['Search', '/search'],
    ],
  },
  {
    title: 'Practice & assessment',
    items: [
      ['Scenario Lab', '/scenarios'],
      ['Strict Quiz', '/strict-quiz'],
      ['Practice Exam', '/practice-exam'],
      ['Roleplay Bot', '/simulations/roleplay'],
      ['Voice-to-Ticket', '/voice-to-ticket'],
      ['Peer Review', '/peer-review'],
      ['Playbooks', '/playbooks'],
      ['Playground', '/playground'],
    ],
  },
  {
    title: 'Reference & tools',
    items: [
      ['Cheat Sheets', '/cheat-sheets'],
      ['Ebook Reader', '/ebooks'],
      ['Hardware', '/hardware'],
      ['Assets', '/assets'],
      ['Network Map', '/simulations/network'],
      ['Classroom Desk', '/simulations/classroom-desk'],
      ['Ticket Data Import', '/ticket-data-import'],
      ['Knowledge Base Lab', '/knowledge-base-lab'],
      ['KB Sync', '/kb-sync'],
      ['Migration Guide', '/migration-guide'],
    ],
  },
  {
    title: 'Certifications',
    items: [
      ['Certification Hub', '/certifications'],
      ['CompTIA A+ Core 1', '/certifications/aplus-core-1'],
      ['CompTIA A+ Core 2', '/certifications/aplus-core-2'],
      ['Network+', '/certifications/network-plus'],
      ['Security+', '/certifications/security-plus'],
      ['Certificates', '/certificates'],
    ],
  },
  {
    title: 'Progress & evidence',
    items: [
      ['Progress Overview', '/progress'],
      ['Readiness', '/readiness'],
      ['Feedback Log', '/feedback-log'],
      ['Error Log', '/error-log'],
      ['Evidence Pack', '/evidence-pack'],
      ['Usage Insights', '/usage-insights'],
      ['PD Log', '/pd-log'],
    ],
  },
  {
    title: 'Admin & advanced',
    items: [
      ['Settings', '/settings'],
      ['Sync', '/sync'],
      ['Admin Hub', '/admin'],
      ['Content Admin', '/admin/content'],
      ['Custom Content', '/admin/custom-content'],
      ['Integrations', '/admin/integrations'],
      ['SLG Import', '/admin/slg-import'],
      ['Supervisor', '/supervisor'],
      ['Trainer Guide', '/trainer-guide'],
      ['Mobile QA', '/mobile-qa'],
    ],
  },
] as const;

export default function AllToolsPage() {
  return (
    <main className="mx-auto max-w-6xl p-6 md:p-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">ITPrep directory</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">All tools & screens</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Every user-facing screen in the app has a discoverable home here, including advanced and rarely used tools that do not need permanent sidebar space.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {groups.map((group) => (
          <section key={group.title} className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-slate-900">{group.title}</h2>
            <div className="flex flex-col gap-2">
              {group.items.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-lg border px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                >
                  {label}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
