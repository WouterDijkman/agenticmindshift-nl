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
      <div
        style={{
          marginBottom: '40px',
          paddingBottom: '32px',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '16px' }}>
          <p className="eyebrow" style={{ marginBottom: 0 }}>Sectie 1 van 4</p>
          <span style={{ fontSize: '0.8125rem', color: 'var(--accent-cta)', fontWeight: 500, letterSpacing: '0.01em' }}>Start. Twaalf minuten.</span>
        </div>
        <h1 className="type-h2" style={{ marginBottom: '16px' }}>Uw analytische aanpak vandaag</h1>
        <p
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
            fontSize: '1.0625rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            maxWidth: '560px',
          }}
        >
          Structuur ontbreekt op vrijwel elk moment in de deal- en financieringspraktijk — bij
          een acquisitie, een financieringsaanvraag, een portefeuillereview of de eerste
          signalen van financiële stress. Het onderscheid tussen ad-hoc en systematisch
          bepaalt hoe snel u kunt handelen en hoe sterk uw positie is. Deze sectie brengt
          uw huidige analytische positie in kaart, inclusief welk moment voor u het meest
          urgent is.
        </p>
      </div>

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
        <Link
          href="/scorecard"
          style={{
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            textDecoration: 'none',
          }}
        >
          ← Terug naar start
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
