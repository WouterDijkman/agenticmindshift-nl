'use client';

import { useMemo, useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useAssessmentStore } from '@/store/assessmentStore';
import { calculateScores, determineOffer } from '@/lib/scoring';
import {
  variantForOffer,
  rawScoreForVariant,
  weakestNormalizedForVariant,
  HIGH_SCORER_THRESHOLD,
  TOTAL_MAX,
  OFFER_GATE_PERCENT,
} from '@/lib/reportVariants';
import TotalScoreCircle from '@/components/scorecard/TotalScoreCircle';
import DimensionBars from '@/components/scorecard/DimensionBars';
import PeerBenchmarkChart from '@/components/scorecard/PeerBenchmarkChart';
import Button from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

/**
 * Rough percentile derived from total score (0..75) assuming a normal
 * distribution with mean 45 and stdev 12. Returns an integer 1..99.
 */
function approxPercentile(total: number): number {
  const mean = 45;
  const stdev = 12;
  const z = (total - mean) / stdev;
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804014327 * Math.exp((-z * z) / 2);
  let p =
    d *
    t *
    (0.319381530 +
      t *
        (-0.356563782 +
          t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  if (z > 0) p = 1 - p;
  const pct = Math.round((1 - p) * 100);
  return Math.max(1, Math.min(99, pct));
}

export default function RapportPage() {
  const t = useTranslations('scorecard.rapport');
  const answers = useAssessmentStore((s) => s.answers);
  const leadName = useAssessmentStore((s) => s.leadName);

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const scores = useMemo(() => calculateScores(answers), [answers]);
  const offer = useMemo(() => determineOffer(answers['Q4']), [answers]);
  const variant = useMemo(() => variantForOffer(offer), [offer]);
  const percentile = approxPercentile(scores.total);

  const isHighScorer = scores.total > HIGH_SCORER_THRESHOLD;

  // Skeleton shown before zustand-persist hydrates
  if (!hydrated) {
    return (
      <section className="container-wide py-12">
        <div className="skeleton" style={{ height: '20px', width: '180px', marginBottom: '24px' }} />
        <div className="skeleton" style={{ height: '48px', width: '60%', marginBottom: '16px' }} />
        <div className="skeleton" style={{ height: '20px', width: '70%', marginBottom: '40px' }} />
        <div
          className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 mb-12"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            padding: '32px',
          }}
        >
          <div className="flex justify-center">
            <div className="skeleton" style={{ width: '220px', height: '220px', borderRadius: '50%' }} />
          </div>
          <div>
            <div className="skeleton" style={{ height: '32px', width: '40%', marginBottom: '16px' }} />
            <div className="skeleton" style={{ height: '14px', width: '90%', marginBottom: '8px' }} />
            <div className="skeleton" style={{ height: '14px', width: '85%', marginBottom: '8px' }} />
            <div className="skeleton" style={{ height: '14px', width: '70%' }} />
          </div>
        </div>
      </section>
    );
  }

  const hasAnswers = Object.keys(answers).length > 0;

  if (!hasAnswers) {
    return (
      <section className="container-narrow py-16 text-center">
        <h1 className="type-h1 mb-4">{t('no_answers_heading')}</h1>
        <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
          {t('no_answers_body')}
        </p>
        <Button href="/scorecard" variant="primary" size="lg">
          {t('offer_cta_2')}
        </Button>
      </section>
    );
  }

  // ══════════════════════════════════════
  // HIGH-SCORER VARIANT (total > 60/75)
  // ══════════════════════════════════════
  if (isHighScorer) {
    const firstName = leadName ? leadName.split(' ')[0] : 'partner';
    return (
      <section className="container-wide py-12">
        <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('eyebrow')}</p>
        <h1 className="type-h1 mb-3">{t('high_heading', { name: firstName })}</h1>
        <p className="mb-10 measure" style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)', lineHeight: 1.75 }}>
          {t('high_body_1')}
        </p>

        <div
          className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 mb-10"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            padding: '32px',
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <TotalScoreCircle score={scores.total} max={TOTAL_MAX} size={220} />
          </div>
          <div>
            <p className="mb-4 measure" style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              {t('high_score_body', { score: scores.total })}
            </p>
            <p className="mb-4 measure" style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              {t('high_body_3')}
            </p>
            <p className="measure" style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              {t('high_body_4')}
            </p>
          </div>
        </div>

        <div
          className="mb-12"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--accent-primary)',
            borderLeft: '3px solid var(--accent-cta)',
            padding: '32px',
          }}
        >
          <p className="eyebrow" style={{ marginBottom: '12px' }}>{t('high_next_eyebrow')}</p>
          <p className="mb-6 measure" style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 1.6vw, 1.125rem)', lineHeight: 1.75 }}>
            {t('high_next_body')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 no-print">
            <Button href="https://www.linkedin.com/in/wwdijkman/" variant="primary" size="lg" external>
              {t('high_cta_1')}
            </Button>
            <Button href="/werkwijze" variant="secondary" size="lg">
              {t('high_cta_2')}
            </Button>
          </div>
        </div>

        <div
          className="text-center pt-8 no-print"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '16px' }}>
            {t('pdf_note')}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/werkwijze" className="nav-link" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              {t('link_trajecten')}
            </Link>
            <a href="https://www.linkedin.com/in/wwdijkman/" className="nav-link" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }} target="_blank" rel="noopener noreferrer">
              {t('high_cta_1')} →
            </a>
          </div>
          <div className="mt-6 flex justify-center no-print">
            <Button variant="secondary" size="md" onClick={() => window.print()}>
              {t('print_btn')}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // ══════════════════════════════════════
  // STANDARD REPORT (A/B/C/D/none)
  // ══════════════════════════════════════
  const variantRawScore = variant ? rawScoreForVariant(answers, variant.id) : 0;
  const weakestNormalized = variant
    ? weakestNormalizedForVariant(scores.byDimension, variant.id)
    : 100;
  const showOfferBlock = variant !== null && weakestNormalized <= OFFER_GATE_PERCENT;

  return (
    <section className="container-wide py-12">
      <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('eyebrow')}</p>
      <h1 className="type-h1 mb-3">{t('heading')}</h1>
      <p className="mb-2 measure" style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)', lineHeight: 1.75 }}>
        {t('subtext')}
      </p>
      <p className="mb-8 measure" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        {t('hint')}
      </p>

      {/* Score + totaal */}
      <div
        className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 mb-12"
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          padding: '32px',
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <TotalScoreCircle score={scores.total} max={TOTAL_MAX} size={220} />
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '12px', textAlign: 'center', maxWidth: '180px', lineHeight: 1.5 }}>
            {t('better_than', { pct: percentile })}
          </p>
        </div>
        <div>
          <h2 className="type-h2 mb-3">{t('total_heading')}</h2>
          <p className="mb-3 measure" style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
            {t('total_body_1')}
          </p>
          <p className="measure" style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
            {t('total_body_2')}
          </p>
        </div>
      </div>

      {/* Dimensies + peer-benchmark */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            padding: '28px',
          }}
        >
          <h2 className="type-h2 mb-5">{t('dimensions_heading')}</h2>
          <DimensionBars scores={scores.byDimension} weakest={scores.weakest} />
        </div>
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            padding: '28px',
          }}
        >
          <h2 className="type-h2 mb-5">{t('peer_heading')}</h2>
          <p className="type-stat mb-2" style={{ color: 'var(--text-primary)' }}>
            {percentile}%
          </p>
          <p className="hint-italic mb-6" style={{ color: 'var(--text-secondary)' }}>
            {t('peer_stat', { pct: percentile })}
          </p>
          <PeerBenchmarkChart scores={scores.byDimension} />
        </div>
      </div>

      {/* Interpretatie + interventies */}
      {variant && (
        <div
          className="mb-14"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            padding: '32px',
          }}
        >
          <h2 className="type-h2 mb-5">{t('interpretation_heading')}</h2>
          <p className="mb-8 measure" style={{ fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
            {variant.interpretation(variantRawScore)}
          </p>

          <h3 className="type-h3 mb-5">{t('interventions_heading')}</h3>
          <ol className="flex flex-col gap-5" style={{ listStyle: 'none', padding: 0 }}>
            {variant.interventions.map((iv, idx) => (
              <li key={iv.title} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: 'var(--accent-cta)',
                  letterSpacing: '0.06em',
                  flexShrink: 0,
                  paddingTop: '2px',
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 1.6vw, 1.125rem)', lineHeight: 1.7, margin: 0 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>{iv.title}</strong>
                  {': '}
                  <span>{iv.body}</span>
                </p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Offer block: only when weakest normalized <= 40% */}
      {showOfferBlock && variant && (
        <div
          className="mb-12"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--accent-primary)',
            borderLeft: '3px solid var(--accent-cta)',
            padding: '32px',
          }}
        >
          <p className="eyebrow" style={{ marginBottom: '12px' }}>{t('offer_eyebrow')}</p>
          <h2 className="type-h2 mb-3">{variant.offerName}</h2>
          <p className="mb-4 measure" style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
            {t('offer_match_body')}
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
            <p style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {t('offer_investment')}
            </p>
            <p style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--accent-cta)' }}>
              {variant.price}
            </p>
          </div>
          <p className="mb-8" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            {t('offer_excl_vat')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 no-print">
            <Button href="https://cal.com/wwdijkman/intake-call" variant="primary" size="lg" external>
              {t('offer_cta_1')}
            </Button>
            <Button href="/werkwijze" variant="secondary" size="lg">
              {t('offer_cta_2')}
            </Button>
          </div>
        </div>
      )}

      {/* Footer nav */}
      <div
        className="text-center pt-8 no-print"
        style={{ borderTop: '1px solid var(--border-subtle)' }}
      >
        <p className="text-sm" style={{ color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '16px' }}>
          {t('pdf_note')}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/werkwijze" className="nav-link" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            {t('link_trajecten')}
          </Link>
          <a href="https://cal.com/wwdijkman/intake-call" className="nav-link" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            {t('link_kennismaking')}
          </a>
          <Link href="/contact" className="nav-link" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            {t('link_contact')}
          </Link>
        </div>
        <div className="mt-6 flex justify-center no-print">
          <Button variant="secondary" size="md" onClick={() => window.print()}>
            {t('print_btn')}
          </Button>
        </div>
      </div>
    </section>
  );
}
