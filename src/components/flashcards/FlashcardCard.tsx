"use client";

type FlashcardCardProps = {
  front: string;
  back: string;
  flipped: boolean;
  onFlip: () => void;
};

export default function FlashcardCard({ front, back, flipped, onFlip }: FlashcardCardProps) {
  return (
    <button
      onClick={onFlip}
      className="w-full rounded-[2rem] border border-slate-200 bg-white p-6 text-left shadow-sm"
    >
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {flipped ? 'Reference answer' : 'Prompt'}
      </div>
      <div className="mt-4 text-xl font-semibold leading-8 text-slate-900">{flipped ? back : front}</div>
      <div className="mt-4 text-sm text-slate-500">
        Select to {flipped ? 'return to the prompt' : 'reveal the reference answer'}.
      </div>
    </button>
  );
}
