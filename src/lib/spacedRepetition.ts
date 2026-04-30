export type ReviewRating = 'again' | 'hard' | 'good' | 'easy';

const REVIEW_DAY_OFFSETS: Record<ReviewRating, number> = {
  again: 0,
  hard: 1,
  good: 3,
  easy: 7
};

function pad(value: number) {
  return String(value).padStart(2, '0');
}

export function formatDateKey(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function parseDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, (month || 1) - 1, day || 1);
}

export function getTodayDateKey() {
  return formatDateKey(new Date());
}

export function addDays(dateKey: string, days: number) {
  const date = parseDateKey(dateKey);
  date.setDate(date.getDate() + days);
  return formatDateKey(date);
}

export function getNextReviewDate(rating: ReviewRating, fromDateKey = getTodayDateKey()) {
  return addDays(fromDateKey, REVIEW_DAY_OFFSETS[rating]);
}

export function isDue(dateKey: string, compareDateKey = getTodayDateKey()) {
  return parseDateKey(dateKey).getTime() <= parseDateKey(compareDateKey).getTime();
}

export function scoreToReviewRating(score: number): ReviewRating {
  if (score < 0.45) {
    return 'again';
  }

  if (score < 0.7) {
    return 'hard';
  }

  if (score < 0.85) {
    return 'good';
  }

  return 'easy';
}
