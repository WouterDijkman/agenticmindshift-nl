'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAssessmentStore } from '@/store/assessmentStore';
import { questionsBySection, questions } from '@/lib/questions';
import QuestionCard from '@/components/scorecard/QuestionCard';
import ProgressBar from '@/components/scorecard/ProgressBar';
import Button from '@/components/ui/Button';

export default function Sectie3Page() {
  const router = useRouter();
  const answers = useAssessmentStore((s) => s.answers);
  const setAnswer = useAssessmentStore((s) => s.setAnswer);
  const setCurrentSection = useAssessmentStore((s) => s.setCurrentSection);

  useEffect(() => {
    setCurrentSection(3);
  }, [setCurrentSection]);

  const section = questionsBySection(3);
  const sectionDone = section.every((q) => answers[q.id]);
  const answered = questions.filter((q) => answers[q.id]).length;

  return (
    <section className="container-medium py-10">
      <div className="mb-8">
        <ProgressBar current={answered} total={15} />
      </div>
      <h1 className="text-2xl sm:text-3xl mb-3">Sectie 3 &mdash; MBR-ritme en portfolio-intelligence</h1>
      <p
        className="mb-10 text-base"
        style={{ color: 'var(--text-tertiary)' }}
      >
        Vier vragen over uw maandelijkse rapportagecyclus en hoe snel u onderprestatie
        in uw portefeuille zichtbaar krijgt.
      </p>

      <div className="flex flex-col gap-6">
        {section.map((q, idx) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={7 + idx + 1}
            selected={answers[q.id]}
            onSelect={(letter) => setAnswer(q.id, letter)}
          />
        ))}
      </div>

      <div className="flex justify-between items-center mt-10">
        <Button
          variant="secondary"
          size="md"
          onClick={() => router.push('/scorecard/sectie-2')}
        >
          Vorige sectie
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={() => router.push('/scorecard/sectie-4')}
          disabled={!sectionDone}
        >
          Verder naar sectie 4
        </Button>
      </div>
      {!sectionDone && (
        <p
          className="mt-3 text-right text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          Beantwoord alle vier de vragen om verder te kunnen.
        </p>
      )}
    </section>
  );
}
