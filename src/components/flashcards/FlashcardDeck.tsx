"use client";

import { useEffect, useState } from 'react';
import type { Flashcard } from '../../types/training';
import type { FlashcardProgress } from '../../lib/progress';
import type { ReviewRating } from '../../lib/spacedRepetition';
import FlashcardCard from './FlashcardCard';

type FlashcardDeckProps = {
  cards: Flashcard[];
  progress: Record<string, FlashcardProgress>;
  onReview: (cardId: string, rating: ReviewRating) => void;
};

const ratings: ReviewRating[] = ['again', 'hard', 'good', 'easy'];

export default function FlashcardDeck({ cards, progress, onReview }: FlashcardDeckProps) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [index]);

  const card = cards[index];
  const cardProgress = card ? progress[card.id] : undefined;

  if (!card) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        No flashcards loaded for this module yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
        <div>
          Card {index + 1} of {cards.length}
        </div>
        <div>
          Review date: {cardProgress?.dueDateIso || 'today'} | Reviews completed: {cardProgress?.reviewCount || 0}
        </div>
      </div>

      <FlashcardCard front={card.front} back={card.back} flipped={flipped} onFlip={() => setFlipped(!flipped)} />

      <div className="grid gap-3 md:grid-cols-4">
        {ratings.map((rating) => (
          <button
            key={rating}
            onClick={() => {
              onReview(card.id, rating);
              setIndex(index === cards.length - 1 ? 0 : index + 1);
            }}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium capitalize text-slate-800"
          >
            {rating}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setIndex(index === 0 ? cards.length - 1 : index - 1)}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700"
        >
          Previous
        </button>
        <button
          onClick={() => setIndex(index === cards.length - 1 ? 0 : index + 1)}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
