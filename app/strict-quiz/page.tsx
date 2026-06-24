import StrictQuizPageClient from '../../src/components/assessment/StrictQuizPageClient';

export default async function StrictQuizPage({
  searchParams
}: {
  searchParams?: Promise<{ topic?: string | string[] }>;
}) {
  const params = (await searchParams) ?? {};
  const topic = Array.isArray(params.topic) ? params.topic[0] : params.topic;

  return <StrictQuizPageClient weakTopic={topic || null} />;
}
