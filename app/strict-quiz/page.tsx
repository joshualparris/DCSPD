import StrictQuizPageClient from '../../src/components/assessment/StrictQuizPageClient';

export default function StrictQuizPage({
  searchParams
}: {
  searchParams?: { topic?: string | string[] };
}) {
  const topic = Array.isArray(searchParams?.topic) ? searchParams?.topic[0] : searchParams?.topic;

  return <StrictQuizPageClient weakTopic={topic || null} />;
}
