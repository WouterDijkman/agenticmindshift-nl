import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AnimatedHeroShell from '@/components/motion/AnimatedHeroShell';
import JsonLd from '@/components/JsonLd';
import { serviceLd } from '@/lib/jsonld';
import ScorecardSectionCards from './ScorecardSectionCards';
import ScorecardReportMockup from '@/components/ScorecardReportMockup';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Scorecard — Zes dimensies, twaalf minuten',
  description:
    'Vier secties, 15 vragen, twaalf minuten. Inzicht in uw dealproces, maandrapportage, AI-bestendigheid en kennisborging — vergeleken met vergelijkbare partijen.',
};

export default async function ScorecardWelcomePage() {
  const t = await getTranslations('scorecard');

  return (
    <>
      <JsonLd data={serviceLd} />

      <AnimatedHeroShell
        bgChar="15"
        bgCharSize="clamp(240px, 30vw, 440px)"
        eyebrow={t('landing.eyebrow')}
        heading={t('landing.heading')}
        subtext={t('landing.subtext')}
        containerClass="container-narrow"
        centered={true}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              fontStyle: 'italic',
              lineHeight: 1.6,
              textAlign: 'center',
            }}
          >
            {t('landing.blind_spots_note')}
          </p>
          <Button href="/scorecard/sectie-1" variant="primary" size="lg">
            {t('landing.start_cta')}
          </Button>
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              textAlign: 'center',
            }}
          >
            {t('landing.no_account')}
          </p>
          <p
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.06em',
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            {t('landing.trust')}
          </p>
        </div>
      </AnimatedHeroShell>

      {/* Secties overzicht */}
      <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(56px, 8vw, 96px)' }}>
        <div className="container-medium">
          <ScorecardSectionCards />

          {/* Vertrouwelijkheid */}
          <div
            style={{
              marginTop: '32px',
              padding: '20px 24px',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: '4px',
                alignSelf: 'stretch',
                background: 'var(--accent-cta)',
                flexShrink: 0,
              }}
            />
            <div>
              <p
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-cta)',
                  marginBottom: '6px',
                }}
              >
                {t('landing.confidentiality_title')}
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {t('landing.confidentiality_body')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rapport-preview */}
      <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
        <div className="container-medium">
          <div className="showcase-grid">
            <div>
              <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('landing.preview_eyebrow')}</p>
              <h2 className="type-h2" style={{ marginBottom: '20px', maxWidth: '440px' }}>
                {t('landing.preview_heading')}
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1.0625rem, 1.6vw, 1.1875rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.75,
                  maxWidth: '430px',
                  marginBottom: '28px',
                }}
              >
                {t('landing.preview_body')}
              </p>
              <Button href="/scorecard/sectie-1" variant="primary" size="lg">
                {t('landing.start_cta')}
              </Button>
            </div>

            <div className="showcase-mockup-wrap">
              <ScorecardReportMockup />
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* Kosten van niets doen — stakes */}
      <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(56px, 7vw, 80px)' }}>
        <div className="container-medium">
          <div className="reveal" style={{ maxWidth: '640px' }}>
            <p className="eyebrow" style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>
              {t('landing.stakes_eyebrow')}
            </p>
            <h2 className="type-h2" style={{ marginBottom: '20px' }}>
              {t('landing.stakes_heading')}
            </h2>
            <p
              style={{
                fontSize: 'clamp(1.0625rem, 1.6vw, 1.1875rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                marginBottom: '8px',
              }}
            >
              {t('landing.stakes_body_1a')}
              <strong style={{ color: 'var(--text-primary)' }}>{t('landing.stakes_highlight')}</strong>
              {t('landing.stakes_body_1b')}
            </p>
            <p
              style={{
                fontSize: 'clamp(1.0625rem, 1.6vw, 1.1875rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.75,
                fontStyle: 'italic',
              }}
            >
              {t('landing.stakes_body_2')}
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="grain-overlay"
        style={{
          background: 'var(--accent-primary)',
          paddingBlock: 'clamp(64px, 9vw, 112px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container-medium reveal" style={{ textAlign: 'center', position: 'relative' }}>
          <p className="eyebrow" style={{ marginBottom: '24px', color: 'rgba(247,242,235,0.5)' }}>
            {t('landing.final_eyebrow')}
          </p>
          <h2
            className="type-h2"
            style={{ color: 'var(--text-inverse)', marginBottom: '16px', maxWidth: '560px', marginInline: 'auto' }}
          >
            {t('landing.final_heading')}
          </h2>
          <p
            style={{
              fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
              color: 'rgba(247,242,235,0.55)',
              marginBottom: '44px',
              maxWidth: '420px',
              marginInline: 'auto',
              lineHeight: 1.75,
            }}
          >
            {t('landing.final_body')}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            <Button href="/scorecard/sectie-1" variant="primary" size="lg">
              {t('landing.start_cta')}
            </Button>
            <Button href="https://cal.com/wwdijkman/intake-call" variant="secondary" size="lg" external>
              {t('landing.final_cta_2')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
