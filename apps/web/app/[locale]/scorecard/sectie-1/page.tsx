'use client';

import { useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import { useRouter } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useAssessmentStore } from '@/store/assessmentStore';
import { getLocalizedQuestionsBySection, questions } from '@/lib/questions';
import { trackOnce } from '@/lib/analytics';
import QuestionCard from '@/components/scorecard/QuestionCard';
import ProgressBar from '@/components/scorecard/ProgressBar';
import Button from '@/components/ui/Button';

export default function Sectie1Page() {
  const t = useTranslations('scorecard');
  const locale = useLocale();
  const router = useRouter();
  const answers = useAssessmentStore((s) => s.answers);
  const setAnswer = useAssessmentStore((s) => s.setAnswer);
  const setCurrentSection = useAssessmentStore((s) => s.setCurrentSection);

  useEffect(() => {
    setCurrentSection(1);
    // A start, not a revisit. The store rehydrates from localStorage before
    // effects run, so an empty answer set means this really is question one.
    if (Object.keys(useAssessmentStore.getState().answers).length === 0) {
      trackOnce('Scorecard Start', { locale });
    }
  }, [setCurrentSection, locale]);

  const section = getLocalizedQuestionsBySection(locale, 1);
  const sectionDone = section.every((q) => answers[q.id]);

  return (
    <section className="container-medium py-10">
      <div className="mb-8">
        <ProgressBar current={questions.filter((q) => answers[q.id]).length} total={15} />
      </div>
      <div
        style={{
          marginBottom: '40px',
          paddingBottom: '32px',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '16px' }}>
          <p className="eyebrow" style={{ marginBottom: 0 }}>{t('sections.s1_label')}</p>
          <span style={{ fontSize: '0.8125rem', color: 'var(--accent-cta-ink)', fontWeight: 500, letterSpacing: '0.01em' }}>
            {t('sections.s1_tagline')}
          </span>
        </div>
        <h1 className="type-h2" style={{ marginBottom: '16px' }}>{t('sections.s1_title')}</h1>
        <p
          style={{
            fontSize: '1.0625rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            maxWidth: '560px',
          }}
        >
          {t('sections.s1_desc')}
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
          {t('navigation.back_to_start')}
        </Link>
        <Button
          variant="primary"
          size="lg"
          onClick={() => router.push('/scorecard/sectie-2')}
          disabled={!sectionDone}
        >
          {t('navigation.next_section_2')}
        </Button>
      </div>
      {!sectionDone && (
        <p
          className="mt-3 text-right text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('navigation.answer_all_s1')}
        </p>
      )}
    </section>
  );
}
