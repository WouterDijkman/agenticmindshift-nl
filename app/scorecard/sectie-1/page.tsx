'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAssessmentStore } from '@/store/assessmentStore';
import { questionsBySection } from '@/lib/questions';
import QuestionCard from '@/components/scorecard/QuestionCard';
import ProgressBar from '@/components/scorecard/ProgressBar';
import Button from '@/components/ui/Button';

export default function Sectie1Page() {
  const router = useRouter();
  const answers = useAssessmentStore((s) => s.answers);
  const setAnswer = useAssessmentStore((s) => s.setAnswer);
  const setCurrentSection = useAssessmentStore((s) => s.setCurrentSection);

  useEffect(() => {
    setCurrentSection(1);
  }, [setCurrentSection]);

  const section = questionsBySection(1);
  const sectionDone = section.every((q) => answers[q.id]);

  return (
    <section className="container-medium py-10">
      <div className="mb-8">
        <ProgressBar current={section.filter((q) => answers[q.id]).length} total={15} />
      </div>
      <h1 className="text-2xl sm:text-3xl mb-3">Sectie 1 &mdash; AI-readiness</h1>
      <p
        className="mb-10 text-base"
        style={{ color: 'var(--text-tertiary)' }}
      >
        Vier korte vragen over uw huidige AI-initiatieven en welke begeleiding aansluit
        op uw situatie.
      </p>

      <div className="flex flex-col gap-6">
        {section.map((q, idx) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={idx + 1}
            selected={answers[q.id]}
            onSelect={(letter) => setAnswer(q.id, letter)}
          />
        ))}
      </div>

      <div className="flex justify-between items-center mt-10">
        <Link href="/scorecard" style={{ color: 'var(--text-muted)' }} className="text-sm">
          Terug naar overzicht
        </Link>
        <Button
          variant="primary"
          size="lg"
          onClick={() => router.push('/scorecard/sectie-2')}
          disabled={!sectionDone}
        >
          Verder naar sectie 2
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
