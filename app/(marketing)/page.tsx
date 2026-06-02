import Link from 'next/link';
import Button from '@/components/ui/Button';
import AnimatedHero from './AnimatedHero';
import HomepageStatsSection from './HomepageStatsSection';
import HomepageStepsSection from './HomepageStepsSection';
import HomepageDimensionsSection from './HomepageDimensionsSection';
import HomepageVoorWieSection from './HomepageVoorWieSection';
import HomepageBioSection from './HomepageBioSection';
import Accordion, { type AccordionItem } from '@/components/ui/Accordion';
import JsonLd from '@/components/JsonLd';
import { faqItems } from '@/lib/faq';
import { organizationLd, personLd, serviceLd, faqLd } from '@/lib/jsonld';

const accordionItems: AccordionItem[] = faqItems.map((f) => {
  // Override 'wie' answer to include a link to /over
  if (f.id === 'wie') {
    return {
      id: f.id,
      question: f.question,
      answer: (
        <>
          {f.answer.replace(' Meer op de Over-pagina.', ' ')}
          <a
            href="/over"
            style={{ color: 'var(--accent-cta)', fontWeight: 500, whiteSpace: 'nowrap' }}
          >
            Meer op de Over-pagina →
          </a>
        </>
      ),
    };
  }
  return { id: f.id, question: f.question, answer: f.answer };
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationLd} />
      <JsonLd data={personLd} />
      <JsonLd data={serviceLd} />
      <JsonLd data={faqLd} />

      <AnimatedHero />

            {/* ═══════════════════════════════════════════
          2. EXPERTISE STRIP
      ═══════════════════════════════════════════ */}
      <section style={{ background: 'var(--accent-primary)' }}>
        <div className="container-wide">
          <div
            className="reveal expertise-strip"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '0',
              paddingBlock: '16px',
              borderTop: '1px solid rgba(247,242,235,0.06)',
            }}
          >
            {([
              { label: '6 jaar', sub: 'deal-ervaring NL mid-market', href: null },
              { label: 'Acquisition finance', sub: 'LBO-structurering', href: null },
              { label: 'Financial restructuring', sub: 'Portefeuilles in stress', href: null },
              { label: 'AI Due Diligence', sub: '2–3 weken · NL MKB €5M–€50M', href: '/werkwijze' },
              { label: 'Factum Capital', sub: 'lancering 1 juli 2026', href: '/factum-capital' },
            ] as const).map((item, i) => {
              const inner = (
                <>
                  <span
                    style={{
                      fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                      fontSize: '0.9375rem',
                      fontWeight: 700,
                      color: 'rgba(247,242,235,0.88)',
                      letterSpacing: '-0.01em',
                      lineHeight: 1,
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      color: 'rgba(247,242,235,0.58)',
                      letterSpacing: '0.06em',
                      lineHeight: 1,
                    }}
                  >
                    {item.sub}
                  </span>
                </>
              );
              const wrapStyle = {
                padding: '8px 24px',
                borderLeft: i > 0 ? '1px solid rgba(247,242,235,0.1)' : 'none',
                display: 'flex' as const,
                flexDirection: 'column' as const,
                gap: '2px',
                textDecoration: 'none',
              };
              return item.href ? (
                <Link key={item.label} href={item.href} style={wrapStyle}>
                  {inner}
                </Link>
              ) : (
                <div key={item.label} style={wrapStyle}>{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. STATISTIEKEN — animated count-up
      ═══════════════════════════════════════════ */}
      <HomepageStatsSection />


      {/* ═══════════════════════════════════════════
          3b. SOCIAL PROOF
      ═══════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(64px, 8vw, 96px)' }}>
        <div className="container-medium">
          <div
            className="reveal social-proof-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1px',
              background: 'var(--border-subtle)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {[
              {
                quote: '“We hadden al jaren hetzelfde MBR-format. Na de scorecard zagen we in één oogopslag waar de echte blinde vlekken zaten. Twee van de zes dimensies lagen significant onder het peer-gemiddelde — dat was ons nooit eerder expliciet gemaakt.”',
                who: 'PE-partner, Nederlandse lower-mid market fund',
                aum: '~€120M AUM',
              },
              {
                quote: '“De AI Due Diligence op onze laatste acquisitie gaf ons een extra argument in de pricing-discussie. We hebben de entry-multiple 0,4× naar beneden bijgesteld op basis van de substitutie-analyse. Het rapport kostte €12.500. De aanpassing leverde meervoudig meer op.”',
                who: 'M&A-director, buy-and-build platform',
                aum: '4 acquisities per jaar',
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--bg-primary)',
                  padding: 'clamp(32px, 4vw, 52px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                    fontSize: 'clamp(1.125rem, 1.8vw, 1.375rem)',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    color: 'var(--text-primary)',
                    lineHeight: 1.6,
                    letterSpacing: '0em',
                    margin: 0,
                  }}
                >
                  {item.quote}
                </p>
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                  <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '2px' }}>
                    {item.who}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                    {item.aum}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '12px', textAlign: 'right', letterSpacing: '0.04em' }}>
            * Resultaten zijn geanonimiseerd weergegeven.
          </p>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />
      <HomepageBioSection />

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* ═══════════════════════════════════════════
          5. ZO WERKT HET
      ═══════════════════════════════════════════ */}
      <HomepageStepsSection />

      {/* ═══════════════════════════════════════════
          5b. MID-PAGE CTA
      ═══════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(40px, 5vw, 64px)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container-medium">
          <div
            className="reveal mid-cta-row"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.015em',
                  marginBottom: '6px',
                  lineHeight: 1.2,
                }}
              >
                Klaar om te beginnen?
              </p>
              <p style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)', color: 'var(--text-muted)', margin: 0 }}>
                Twaalf minuten. Geen account. Direct uw rapport.
              </p>
            </div>
            <Button href="/scorecard" variant="primary" size="lg">
              Start de Scorecard
            </Button>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* ═══════════════════════════════════════════
          6. VOOR WIE
      ═══════════════════════════════════════════ */}
      <HomepageVoorWieSection />
      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* ═══════════════════════════════════════════
          7. ZES DIMENSIES
      ═══════════════════════════════════════════ */}
      <HomepageDimensionsSection />

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* ═══════════════════════════════════════════
          8. FAQ
      ═══════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(80px, 11vw, 136px)' }}>
        <div className="container-medium">
          <div className="faq-grid">
            {/* Left: sticky heading */}
            <div className="reveal faq-sticky">
              <p className="eyebrow" style={{ marginBottom: '20px' }}>Vragen</p>
              <h2 className="type-h2" style={{ marginBottom: '20px' }}>
                Wat partners vooraf willen weten
              </h2>
              <p style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1rem, 1.6vw, 1.125rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.75,
                maxWidth: '280px',
                marginBottom: '36px',
              }}>
                Veelgestelde vragen, eerlijk beantwoord.
              </p>
              <Button href="/scorecard" variant="primary" size="md">
                Start de Scorecard
              </Button>
            </div>
            {/* Right: accordion */}
            <div className="reveal" style={{ transitionDelay: '100ms' }}>
              <Accordion items={accordionItems} />
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* ═══════════════════════════════════════════
          9. Final CTA
      ═══════════════════════════════════════════ */}
      <section
        className="grain-overlay"
        style={{
          background: 'var(--accent-primary)',
          paddingBlock: 'clamp(80px, 11vw, 136px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container-medium reveal" style={{ textAlign: 'center', position: 'relative' }}>
          <p className="eyebrow" style={{ marginBottom: '28px', color: 'rgba(247,242,235,0.5)' }}>
            Direct resultaat
          </p>
          <h2
            className="type-h2"
            style={{ color: 'var(--text-inverse)', marginBottom: '16px', maxWidth: '600px', marginInline: 'auto' }}
          >
            U ziet wat anderen missen. V&oacute;&oacute;rdat de jaarcijfers het bevestigen.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
              color: 'rgba(247,242,235,0.5)',
              marginBottom: '48px',
              maxWidth: '440px',
              marginInline: 'auto',
              lineHeight: 1.75,
            }}
          >
            Na twaalf minuten weet u exact welke dimensies van uw portefeuille kwetsbaar zijn.
            U gaat naar uw volgende IC-vergadering met data &mdash; niet met een gevoel.
          </p>
          <div className="cta-button-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            <Button href="/scorecard" variant="primary" size="lg">
              Start de Scorecard
            </Button>
            <Button href="https://cal.com/wwdijkman/intake-call" variant="secondary" size="lg" external>
              Plan een vrijblijvende kennismaking
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
