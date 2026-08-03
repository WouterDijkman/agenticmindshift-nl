'use client';

import { useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useAssessmentStore } from '@/store/assessmentStore';
import { getLocalizedQuestionsBySection, questions } from '@/lib/questions';
import QuestionCard from '@/components/scorecard/QuestionCard';
import ProgressBar from '@/components/scorecard/ProgressBar';
import Button from '@/components/ui/Button';

export default function Sectie4Page() {
  const t = useTranslations('scorecard');
  const locale = useLocale();
  const router = useRouter();
  const answers = useAssessmentStore((s) => s.answers);
  const setAnswer = useAssessmentStore((s) => s.setAnswer);
  const setCurrentSection = useAssessmentStore((s) => s.setCurrentSection);

  useEffect(() => {
    setCurrentSection(4);
  }, [setCurrentSection]);

  const section = getLocalizedQuestionsBySection(locale, 4);
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
          <p className="eyebrow" style={{ marginBottom: 0 }}>{t('sections.s4_label')}</p>
          <span style={{ fontSize: '0.8125rem', color: 'var(--accent-cta-ink)', fontWeight: 500, letterSpacing: '0.01em' }}>
            {t('sections.s4_tagline')}
          </span>
        </div>
        <h1 className="type-h2" style={{ marginBottom: '16px' }}>{t('sections.s4_title')}</h1>
        <p
          style={{
            fontSize: '1.0625rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            maxWidth: '560px',
          }}
        >
          {t('sections.s4_desc')}
        </p>
      </div>

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
          {t('navigation.prev_section')}
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={() => router.push('/scorecard/resultaat')}
          disabled={!sectionDone}
        >
          {t('navigation.to_results')}
        </Button>
      </div>
      {!sectionDone && (
        <p
          className="mt-3 text-right text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('navigation.answer_all_s4')}
        </p>
      )}
    </section>
  );
}
