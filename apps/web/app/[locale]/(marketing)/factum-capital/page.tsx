import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getAlternates } from '@/lib/hreflang';
import Button from '@/components/ui/Button';
import AnimatedHeroShell from '@/components/motion/AnimatedHeroShell';
import AnswerFirst from '@/components/AnswerFirst';
import JsonLd from '@/components/JsonLd';
import { getBreadcrumbLd } from '@/lib/jsonld';

const FACTUM_SITE = 'https://www.factumcapital.eu';

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'factum_capital' });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: getAlternates('/factum-capital', locale),
  };
}

export default async function FactumCapitalPage(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const t = await getTranslations('factum_capital');
  const factumUrl = `${FACTUM_SITE}/${locale}`;

  return (
    <>
      <JsonLd data={getBreadcrumbLd('/factum-capital', t('hero.heading'), locale)} />

      <AnimatedHeroShell
        bgChar="FC"
        bgCharSize="clamp(240px, 32vw, 480px)"
        eyebrow={t('hero.eyebrow')}
        heading={t('hero.heading')}
        subtext={t('hero.subtext')}
        headingMaxWidth="900px"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <Button href={factumUrl} variant="primary" size="lg" external>
            {t('site_cta')}
          </Button>
          <Button href="/scorecard" variant="secondary" size="lg">
            {t('cta.primary')}
          </Button>
        </div>
      </AnimatedHeroShell>

      <AnswerFirst text={t('answer_first')} />

      {/* TEASER — quote + verwijzing naar het eigen platform */}
      <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
        <div className="container-medium">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'clamp(40px, 6vw, 80px)',
              alignItems: 'start',
            }}
          >
            <div className="reveal">
              <p className="eyebrow" style={{ marginBottom: '28px' }}>{t('description.eyebrow')}</p>
              <blockquote style={{ margin: 0, paddingLeft: '24px', borderLeft: '3px solid var(--accent-cta)' }}>
                <p
                  style={{
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    lineHeight: 1.4,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                    margin: 0,
                  }}
                >
                  &ldquo;{t('description.quote')}&rdquo;
                </p>
              </blockquote>
            </div>

            <div className="reveal" style={{ transitionDelay: '80ms' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                <p style={{ margin: 0 }}>{t('description.para1')}</p>
                <p style={{ margin: 0 }}>{t('site_note')}</p>
              </div>
              <div style={{ marginTop: '32px' }}>
                <Button href={factumUrl} variant="primary" size="lg" external>
                  {t('site_cta')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* CTA — scorecard / kennismaking */}
      <section
        className="grain-overlay"
        style={{
          background: 'var(--accent-primary)',
          paddingBlock: 'clamp(56px, 7vw, 88px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container-medium reveal" style={{ textAlign: 'center', position: 'relative' }}>
          <p className="eyebrow" style={{ marginBottom: '20px', color: 'rgba(247,242,235,0.5)' }}>
            {t('cta.eyebrow')}
          </p>
          <h2
            className="type-h2"
            style={{ color: 'var(--text-inverse)', marginBottom: '16px', maxWidth: '520px', marginInline: 'auto' }}
          >
            {t('cta.heading')}
          </h2>
          <p
            style={{
              fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
              color: 'rgba(247,242,235,0.5)',
              marginBottom: '40px',
              maxWidth: '460px',
              marginInline: 'auto',
              lineHeight: 1.75,
            }}
          >
            {t('cta.subtext')}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            <Button href="/scorecard" variant="primary" size="lg">
              {t('cta.primary')}
            </Button>
            <Button href="/werkwijze" variant="secondary" size="lg">
              {t('cta.secondary_1')}
            </Button>
            <Button href="https://cal.com/wwdijkman/intake-call" variant="secondary" size="lg" external>
              {t('cta.secondary_2')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
