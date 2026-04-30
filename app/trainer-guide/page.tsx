export default function TrainerGuidePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Trainer guide</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Instructional guidance for Josh&apos;s professional development
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Whether the trainer is a human instructor or an AI assistant, the method should remain structured,
            concrete, and sufficiently rigorous to produce measurable improvement.
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <ul className="space-y-4 text-sm leading-7 text-slate-700">
          <li>- Ask one question at a time.</li>
          <li>- Require a confidence rating before the answer.</li>
          <li>- Require explanation and risk or trade-off reasoning, not just a guess.</li>
          <li>- Use plausible distractors only.</li>
          <li>- Mix multiple choice, free response, scenario, and order-the-steps work.</li>
          <li>- Keep feedback constructive and rigorous.</li>
          <li>- Maintain an error log and revisit weak areas on schedule.</li>
          <li>- Use spaced repetition for flashcards and missed concepts.</li>
          <li>- Prefer DCS-specific scenarios over generic lab questions.</li>
          <li>- Avoid long passive reading blocks when a shorter applied exercise will do more.</li>
          <li>- Avoid making readiness graphs look more accurate than the data supports.</li>
          <li>- Support ADHD and autistic learning needs with short sessions, clear next actions, and low clutter.</li>
        </ul>
      </section>
    </div>
  );
}
