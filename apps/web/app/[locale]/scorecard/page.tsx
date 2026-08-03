import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AnimatedHeroShell from '@/components/motion/AnimatedHeroShell';
import JsonLd from '@/components/JsonLd';
import { serviceLd } from '@/lib/jsonld';
import ScorecardSectionCards from './ScorecardSectionCards';
import ScorecardReportMockup from '@/components/ScorecardReportMockup';
import Button from '@/components/ui/Button';
import { getAlternates } from '@/lib/hreflang';

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'scorecard' });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: getAlternates('/scorecard', locale),
  };
}

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
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              fontStyle: 'italic',
              lineHeight: 1.6,
              maxWidth: '56ch',
              margin: 0,
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
              margin: 0,
            }}
          >
            {t('landing.no_account')}
          </p>
          <p
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.06em',
              fontStyle: 'italic',
              margin: 0,
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
                  color: 'var(--accent-cta-ink)',
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

      {/* Final CTA */}
      <section
        className="grain-overlay"
        data-surface="dark"
        style={{
          background: 'var(--surface-dark)',
          paddingBlock: 'clamp(64px, 9vw, 112px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container-medium reveal" style={{ textAlign: 'center', position: 'relative' }}>
          <p className="eyebrow" style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>
            {t('landing.final_eyebrow')}
          </p>
          <h2
            className="type-h2"
            style={{ color: 'var(--text-primary)', marginBottom: '16px', maxWidth: '560px', marginInline: 'auto' }}
          >
            {t('landing.final_heading')}
          </h2>
          <p
            style={{
              fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
              color: 'var(--text-muted)',
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
