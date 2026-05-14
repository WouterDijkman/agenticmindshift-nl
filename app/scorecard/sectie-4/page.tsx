'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAssessmentStore } from '@/store/assessmentStore';
import { questionsBySection, questions } from '@/lib/questions';
import QuestionCard from '@/components/scorecard/QuestionCard';
import ProgressBar from '@/components/scorecard/ProgressBar';
import Button from '@/components/ui/Button';

export default function Sectie4Page() {
  const router = useRouter();
  const answers = useAssessmentStore((s) => s.answers);
  const setAnswer = useAssessmentStore((s) => s.setAnswer);
  const setCurrentSection = useAssessmentStore((s) => s.setCurrentSection);

  useEffect(() => {
    setCurrentSection(4);
  }, [setCurrentSection]);

  const section = questionsBySection(4);
  const sectionDone = section.every((q) => answers[q.id]);
  const answered = questions.filter((q) => answers[q.id]).length;

  return (
    <section className="container-medium py-10">
      <div className="mb-8">
        <ProgressBar current={answered} total={15} />
      </div>
      <div
        className="mb-8 p-5"
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '4px',
        }}
      >
        <p
          className="text-xs uppercase mb-2"
          style={{ color: 'var(--accent-primary)', letterSpacing: '0.18em' }}
        >
          Sectie 3 voltooid
        </p>
        <p style={{ color: 'var(--text-tertiary)' }}>
          Goed. We gaan nu naar uw team en kennis.
        </p>
      </div>
      <h1 className="h-2 mb-3">Sectie 4 &mdash; Uw team en kennis</h1>
      <p
        className="mb-10 text-base measure"
        style={{ color: 'var(--text-tertiary)' }}
      >
        Vier vragen over capaciteit van uw associates en hoe DD-kennis binnen uw
        organisatie wordt vastgehouden.
      </p>

      <div className="flex flex-col gap-6">
        {section.map((q, idx) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={11 + idx + 1}
            selected={answers[q.id]}
            onSelect={(letter) => setAnswer(q.id, letter)}
          />
        ))}
      </div>

      <div className="flex justify-between items-center mt-10">
        <Button
          variant="secondary"
          size="md"
          onClick={() => router.push('/scorecard/sectie-3')}
        >
          Vorige sectie
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={() => router.push('/scorecard/resultaat')}
          disabled={!sectionDone}
        >
          Naar uw resultaat
        </Button>
      </div>
      {!sectionDone && (
        <p
          className="mt-3 text-right text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          Beantwoord alle vier de vragen om uw resultaat te zien.
        </p>
      )}
    </section>
  );
}
