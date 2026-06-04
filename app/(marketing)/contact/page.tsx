import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import AnimatedHeroShell from '@/components/motion/AnimatedHeroShell';
import JsonLd from '@/components/JsonLd';
import { personLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Drie manieren om in contact te komen met Wouter Dijkman van Agentic Mindshift.',
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={personLd} />

      <AnimatedHeroShell
        bgChar="C"
        eyebrow="Contact"
        heading="Begin met een vraag. Niet met een commitment."
        subtext="Start met de Scorecard voor direct inzicht, of plan een vrijblijvend gesprek van twintig minuten. U stelt de agenda."
        headingMaxWidth="720px"
      />

            {/* Contact cards */}
      <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
        <div className="container-medium">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1px',
              background: 'var(--border-subtle)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {[
              {
                n: '01',
                title: 'Scorecard',
                body: "Twaalf minuten. Vier pagina's rapport. Het meest gestructureerde startpunt om uw portefeuille meetbaar te maken.",
                cta: <Button href="/scorecard" variant="primary" size="md">Start de Scorecard</Button>,
                delay: 0,
              },
              {
                n: '02',
                title: 'Sparring-sessie',
                body: 'Twintig minuten om te kijken of er een match is. U stelt de agenda.',
                cta: (
                  <Button href="https://cal.com/wwdijkman/intake-call" variant="secondary" size="md" external>
                    Plan een vrijblijvende kennismaking
                  </Button>
                ),
                delay: 80,
              },
              {
                n: '03',
                title: 'Direct bericht',
                body: 'Voor specifieke vragen of wanneer u liever schriftelijk begint. Reactie binnen twee werkdagen.',
                cta: (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <a
                        href="mailto:wouter@agenticmindshift.nl"
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--accent-cta)',
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
            ].map((card) => (
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
                    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(48px, 6vw, 68px)',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    lineHeight: 0.9,
                    color: 'var(--accent-cta)',
                    marginBottom: '28px',
                    opacity: 0.9,
                  }}
                >
                  {card.n}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
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
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
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
