'use client';

import { useLocale, useTranslations } from 'next-intl';
import { sectionTranslations } from '@/lib/questions.locales';

type DimKey =
  | 'DealVelocity'
  | 'PortfolioIntelligence'
  | 'BiasDetection'
  | 'AIReadiness'
  | 'CapacityEngineering'
  | 'KnowledgeRetention';

const DIMENSION_SCORES: { key: DimKey; score: number; reference: number }[] = [
  { key: 'DealVelocity', score: 58, reference: 70 },
  { key: 'PortfolioIntelligence', score: 74, reference: 68 },
  { key: 'BiasDetection', score: 63, reference: 66 },
  { key: 'AIReadiness', score: 39, reference: 64 },
  { key: 'CapacityEngineering', score: 71, reference: 67 },
  { key: 'KnowledgeRetention', score: 46, reference: 65 },
];

const NAVY = 'var(--text-primary)';
const RUST = 'var(--accent-cta)';

function ScoreRow({
  label,
  score,
  reference,
  highlight,
}: {
  label: string;
  score: number;
  reference: number;
  highlight: boolean;
}) {
  const below = score < reference;
  const fill = below ? RUST : NAVY;
  return (
    <div
      style={{
        padding: highlight ? '12px 14px' : '12px 4px',
        marginInline: highlight ? '-14px' : 0,
        background: highlight ? 'var(--accent-cta-soft)' : 'transparent',
        borderLeft: highlight ? `2px solid ${RUST}` : '2px solid transparent',
        borderRadius: highlight ? '6px' : 0,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '7px' }}>
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            letterSpacing: '-0.005em',
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: below ? RUST : 'var(--text-muted)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {score}
          <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}> / 100</span>
        </span>
      </div>
      {/* bar track */}
      <div
        style={{
          position: 'relative',
          height: '7px',
          borderRadius: '999px',
          background: 'rgba(11,31,58,0.08)',
          overflow: 'visible',
        }}
      >
        {/* fill */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: `${score}%`,
            background: fill,
            borderRadius: '999px',
          }}
        />
        {/* reference-level tick */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-3px',
            bottom: '-3px',
            left: `${reference}%`,
            width: '2px',
            background: 'var(--text-muted)',
            opacity: 0.55,
            borderRadius: '2px',
          }}
        />
      </div>
    </div>
  );
}

/**
 * In-code rendering of the Scorecard report — used on the homepage showcase
 * and the scorecard welcome page. Pure presentational markup; the optional
 * floating callout is positioned by the parent's `.showcase-mockup-wrap`.
 */
export default function ScorecardReportMockup({ callout = true }: { callout?: boolean }) {
  const locale = useLocale();
  const t = useTranslations('scorecard.mockup');
  const dims = (sectionTranslations[locale] ?? sectionTranslations['nl']).dimensions;

  return (
    <>
      {callout && (
        <div className="showcase-callout" aria-hidden="true">
          <span className="showcase-callout-num">2 / 6</span>
          <span className="showcase-callout-label">
            {t('callout_label')}
          </span>
        </div>
      )}

      <div className="showcase-card">
        {/* window bar */}
        <div className="showcase-card-bar">
          <span className="showcase-dot" style={{ background: '#E0654B' }} />
          <span className="showcase-dot" style={{ background: '#E8B23E' }} />
          <span className="showcase-dot" style={{ background: '#5BA06B' }} />
          <span className="showcase-card-bar-label">{t('window_label')}</span>
        </div>

        {/* card body */}
        <div className="showcase-card-body">
          <div>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '1.0625rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              {t('title')}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.6875rem',
                color: 'var(--text-muted)',
                margin: '4px 0 0',
                letterSpacing: '0.02em',
              }}
            >
              {t('subtitle')}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '18px' }}>
            {DIMENSION_SCORES.map((d) => (
              <ScoreRow
                key={d.key}
                label={dims[d.key] ?? d.key}
                score={d.score}
                reference={d.reference}
                highlight={d.key === 'AIReadiness'}
              />
            ))}
          </div>

          {/* legend */}
          <div className="showcase-legend">
            <span className="showcase-legend-item">
              <span className="showcase-legend-swatch" style={{ background: RUST }} />
              {t('below_reference')}
            </span>
            <span className="showcase-legend-item">
              <span className="showcase-legend-swatch" style={{ background: NAVY }} />
              {t('above_reference')}
            </span>
            <span className="showcase-legend-item">
              <span className="showcase-legend-tick" />
              {t('reference_level')}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
