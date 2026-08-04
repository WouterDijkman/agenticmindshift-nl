import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { getAlternates } from '@/lib/hreflang';
import Button from '@/components/ui/Button';
import AnimatedHeroShell from '@/components/motion/AnimatedHeroShell';
import JsonLd from '@/components/JsonLd';
import { getPersonLd } from '@/lib/jsonld';

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: getAlternates('/contact', locale),
  };
}

export default async function ContactPage() {
  const locale = await getLocale();
  const t = await getTranslations('contact');

  return (
    <>
      <JsonLd data={getPersonLd(locale)} />

      <AnimatedHeroShell
        bgChar="C"
        eyebrow={t('eyebrow')}
        heading={t('heading')}
        subtext={t('subtext')}
        headingMaxWidth="720px"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          <Button href="https://cal.com/wwdijkman/intake-call" variant="primary" size="lg" external>
            {t('card_02_cta')}
          </Button>
          <Button href="/scorecard" variant="secondary" size="lg">
            {t('card_01_cta')}
          </Button>
        </div>
      </AnimatedHeroShell>

      {/* Contact cards */}
      <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
        <div className="container-medium">
          <div
            className="divider-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1px',
              background: 'var(--border-subtle)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {([
              {
                n: '01',
                title: t('card_01_title'),
                body: t('card_01_body'),
                cta: <Button href="/scorecard" variant="primary" size="md">{t('card_01_cta')}</Button>,
                delay: 0,
              },
              {
                n: '02',
                title: t('card_02_title'),
                body: t('card_02_body'),
                cta: (
                  <Button href="https://cal.com/wwdijkman/intake-call" variant="secondary" size="md" external>
                    {t('card_02_cta')}
                  </Button>
                ),
                delay: 80,
              },
              {
                n: '03',
                title: t('card_03_title'),
                body: t('card_03_body'),
                cta: (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <a
                        href="mailto:wouter@agenticmindshift.nl"
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--accent-cta-ink)',
                          fontWeight: 500,
                          transition: 'opacity 180ms ease',
                        }}
                        className="contact-email-link"
                      >
                        wouter@agenticmindshift.nl
                      </a>
                    </div>
                    <a
                      href="https://www.linkedin.com/in/wwdijkman"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)',
                        transition: 'color 180ms ease',
                      }}
                      className="footer-link"
                    >
                      linkedin.com/in/wwdijkman →
                    </a>
                  </div>
                ),
                delay: 160,
              },
            ] as const).map((card) => (
              <div
                key={card.n}
                className="reveal contact-card"
                style={{
                  background: 'var(--bg-secondary)',
                  padding: '32px 28px 40px',
                  display: 'flex',
                  flexDirection: 'column',
                  transitionDelay: `${card.delay}ms`,
                  borderTop: '3px solid transparent',
                  transition: 'border-top-color 200ms ease',
                }}
              >
                <p
                  style={{
                    fontSize: 'clamp(48px, 6vw, 68px)',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    lineHeight: 0.9,
                    color: 'var(--accent-cta-ink)',
                    marginBottom: '28px',
                    opacity: 0.9,
                  }}
                >
                  {card.n}
                </p>
                <p
                  style={{
                    fontSize: '1.0625rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '12px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {card.title}
                </p>
                <p
                  style={{
                    fontSize: 'clamp(1rem, 1.6vw, 1.125rem)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.75,
                    flex: 1,
                    marginBottom: '24px',
                  }}
                >
                  {card.body}
                </p>
                {card.cta}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
