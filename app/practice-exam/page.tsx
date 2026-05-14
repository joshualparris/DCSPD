import PracticeExam from '../../src/components/assessment/PracticeExam';

export const metadata = {
  title: 'Practice Exam | DCSPrep',
  description: 'Full 20-question certification simulation for DCS ICT support.',
};

export default function PracticeExamPage() {
  return (
    <main className="mx-auto max-w-5xl p-4 md:p-8">
      <PracticeExam />
    </main>
  );
}
