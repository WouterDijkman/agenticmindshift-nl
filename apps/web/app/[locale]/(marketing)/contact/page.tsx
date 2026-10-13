import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/pageMetadata';
import Button from '@/components/ui/Button';
import AnimatedHeroShell from '@/components/motion/AnimatedHeroShell';
import JsonLd from '@/components/JsonLd';
import { getPersonLd } from '@/lib/jsonld';

const INTAKE_URL = 'https://cal.com/wwdijkman/intake-call';

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'contact', '/contact');
}

export default async function ContactPage(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  // Static rendering: fills next-intl's locale cache so nothing below this
  // reaches for `headers()`. See the long note in app/[locale]/layout.tsx.
  setRequestLocale(locale);
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
          <Button href={INTAKE_URL} variant="primary" size="lg" external className="plausible-event-name=Intake+CTA plausible-event-location=contact-hero">
            {t('card_01_cta')}
          </Button>
          <Button href="/werkwijze" variant="secondary" size="lg">
            {t('card_02_cta')}
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
              /* Card 01 used to be the Scorecard, which meant two of the
                 three "ways to reach us" were forms rather than a person.
                 It is now the conversation, and 02 answers the question
                 that stops people booking one: what does this cost. */
              {
                n: '01',
                title: t('card_01_title'),
                body: t('card_01_body'),
                cta: (
                  <Button href={INTAKE_URL} variant="primary" size="md" external className="plausible-event-name=Intake+CTA plausible-event-location=contact-card">
                    {t('card_01_cta')}
                  </Button>
                ),
                delay: 0,
              },
              {
                n: '02',
                title: t('card_02_title'),
                body: t('card_02_body'),
                cta: (
                  <Button href="/werkwijze" variant="secondary" size="md">
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
                {/* No big 01/02/03 (13 October 2026): these are three
                    alternatives, not steps, so the title leads. `n` stays as
                    the React key. */}
                <p
                  style={{
                    fontSize: 'clamp(1.125rem, 1.6vw, 1.3125rem)',
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
                {/* Shrink-wrapped: the flex column stretched the secondary
                    button to full width while the primary one stayed tight. */}
                <div style={{ alignSelf: 'flex-start' }}>{card.cta}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
