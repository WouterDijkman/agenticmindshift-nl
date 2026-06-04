'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAssessmentStore } from '@/store/assessmentStore';
import { questionsBySection, questions } from '@/lib/questions';
import QuestionCard from '@/components/scorecard/QuestionCard';
import ProgressBar from '@/components/scorecard/ProgressBar';
import Button from '@/components/ui/Button';

export default function Sectie2Page() {
  const router = useRouter();
  const answers = useAssessmentStore((s) => s.answers);
  const setAnswer = useAssessmentStore((s) => s.setAnswer);
  const setCurrentSection = useAssessmentStore((s) => s.setCurrentSection);

  useEffect(() => {
    setCurrentSection(2);
  }, [setCurrentSection]);

  const section = questionsBySection(2);
  const sectionDone = section.every((q) => answers[q.id]);
  const answered = questions.filter((q) => answers[q.id]).length;

  return (
    <section className="container-medium py-10">
      <div className="mb-8">
        <ProgressBar current={answered} total={15} />
      </div>
      <div
        style={{
          marginBottom: '40px',
          paddingBottom: '32px',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '16px' }}>
          <p className="eyebrow" style={{ marginBottom: 0 }}>Sectie 2 van 4</p>
          <span style={{ fontSize: '0.8125rem', color: 'var(--accent-cta)', fontWeight: 500, letterSpacing: '0.01em' }}>Goed bezig, een kwart klaar.</span>
        </div>
        <h1 className="type-h2" style={{ marginBottom: '16px' }}>Uw deal-cyclus</h1>
        <p
          style={{
                        fontSize: '1.0625rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            maxWidth: '560px',
          }}
        >
          Doorlooptijd tot aan het IC, het risico dat AI de kernactiviteit overneemt, en uw oordeelsvorming: drie punten waar rendement weglekt. Deze sectie meet ze.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {section.map((q, idx) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={4 + idx + 1}
            selected={answers[q.id]}
            onSelect={(letter) => setAnswer(q.id, letter)}
          />
        ))}
      </div>

      <div className="flex justify-between items-center mt-10">
        <Button
          variant="secondary"
          size="md"
          onClick={() => router.push('/scorecard/sectie-1')}
        >
          Vorige sectie
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={() => router.push('/scorecard/sectie-3')}
          disabled={!sectionDone}
        >
          Verder naar sectie 3
        </Button>
      </div>
      {!sectionDone && (
        <p
          className="mt-3 text-right text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          Beantwoord alle drie de vragen om verder te kunnen.
        </p>
      )}
    </section>
  );
}
