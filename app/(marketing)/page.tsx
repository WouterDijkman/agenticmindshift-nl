import Button from '@/components/ui/Button';
import AnimatedHero from './AnimatedHero';
import HomepageStatsSection from './HomepageStatsSection';
import HomepageStepsSection from './HomepageStepsSection';
import HomepageDimensionsSection from './HomepageDimensionsSection';
import HomepagePainSection from './HomepagePainSection';
import HomepageShowcaseSection from './HomepageShowcaseSection';
import HomepageFactumSection from './HomepageFactumSection';
import CostAnchorVisual from './CostAnchorVisual';
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
          1b. PIJNPUNTEN — herkenbare situaties
      ═══════════════════════════════════════════ */}
      <HomepagePainSection />

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* ═══════════════════════════════════════════
          2. ZO WERKT HET — direct na pijnpunten
      ═══════════════════════════════════════════ */}
      <HomepageStepsSection />

      {/* ═══════════════════════════════════════════
          2b. PRODUCT-SHOWCASE — hoe het rapport eruitziet
      ═══════════════════════════════════════════ */}
      <HomepageShowcaseSection />

      {/* ═══════════════════════════════════════════
          3. STATISTIEKEN — animated count-up
      ═══════════════════════════════════════════ */}
      <HomepageStatsSection />

      {/* ═══════════════════════════════════════════
          3b. SOCIAL PROOF
      ═══════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(64px, 8vw, 96px)' }}>
        <div className="container-medium">
          <div className="reveal" style={{ marginBottom: '32px' }}>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>Resultaten</p>
            <h2 className="type-h2" style={{ margin: 0, maxWidth: '480px' }}>Wat anderen al ontdekten.</h2>
          </div>
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
                quote: '"Twee van de zes dimensies lagen ver onder het niveau van vergelijkbare partijen — dat was ons nooit eerder zo expliciet gemaakt."',
                who: 'PE-partner, Nederlandse lower-mid market fund',
                aum: '~€120M AUM',
              },
              {
                quote: '"Overnameprijs 0,4× naar beneden bijgesteld op basis van de AI-analyse. Het rapport kostte €10.000 — die aanpassing bespaarde ons een veelvoud."',
                who: 'M&A-director, buy-and-build platform',
                aum: '4 acquisities per jaar',
              },
              {
                quote: '"We dachten dat onze maandrapportage op orde was. De Scorecard liet in twaalf minuten zien dat drie van de zes dimensies onder het niveau van vergelijkbare fondsen lagen. Dat gesprek hadden we intern nooit gevoerd."',
                who: 'CFO, familiekantoor met 8 deelnemingen',
                aum: '€40M–€60M onder beheer',
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
            Betreffen daadwerkelijke opdrachten · namen geanonimiseerd op verzoek van cliënt.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3c. FACTUM CAPITAL — twee tracks
      ═══════════════════════════════════════════ */}
      <HomepageFactumSection />

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

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
                Twaalf minuten. Zes dimensies. Direct inzicht.
              </p>
              <p style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)', color: 'var(--text-muted)', margin: 0 }}>
                Multiple choice. Geen account. Rapport direct na afronding.
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
          6. ZES DIMENSIES
      ═══════════════════════════════════════════ */}
      <HomepageDimensionsSection />

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* ═══════════════════════════════════════════
          7. TRANSFORMATIE — Before → After (StoryBrand: Success)
      ═══════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(64px, 9vw, 96px)' }}>
        <div className="container-medium">
          <div className="reveal" style={{ marginBottom: '40px' }}>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>Het verschil</p>
            <h2 className="type-h2" style={{ margin: 0, maxWidth: '520px' }}>
              Van onderbuik naar onderbouwing.
            </h2>
          </div>
          <div
            className="reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1px',
              background: 'var(--border-subtle)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ background: 'var(--bg-primary)', padding: 'clamp(28px, 4vw, 44px)' }}>
              <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Zonder de Scorecard
              </p>
              <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'var(--text-secondary)', lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{ margin: 0 }}>IC-beslissingen op basis van gevoel en ervaring.</p>
                <p style={{ margin: 0 }}>Maandrapportage als ritueel, geen sturingsinstrument.</p>
                <p style={{ margin: 0 }}>Deal-lessen verdwijnen bij elke teamwissel.</p>
                <p style={{ margin: 0 }}>Het risico dat AI de kernactiviteit overneemt staat nergens op papier.</p>
              </div>
            </div>
            <div style={{ background: 'var(--bg-primary)', padding: 'clamp(28px, 4vw, 44px)', borderLeft: '3px solid var(--accent-cta)' }}>
              <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent-cta)', marginBottom: '20px' }}>
                Na de Scorecard
              </p>
              <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'var(--text-secondary)', lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{ margin: 0 }}>Zes dimensies gekwantificeerd, vergeleken met vergelijkbare partijen.</p>
                <p style={{ margin: 0 }}>Twee concrete aandachtspunten met de hoogste impact.</p>
                <p style={{ margin: 0 }}>Een rapport dat u intern kunt delen zonder extra uitleg.</p>
                <p style={{ margin: 0 }}>U gaat naar uw volgende IC met data, niet met een vermoeden.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                Eerlijk antwoord op de vragen die u nu hebt.
              </h2>
              <p style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1rem, 1.6vw, 1.125rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.75,
                maxWidth: '280px',
                marginBottom: '36px',
              }}>
                Geen verkooppraatjes. Directe antwoorden.
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
          8b. STAKES — wat er gebeurt als u niets doet (StoryBrand: Failure)
      ═══════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(56px, 7vw, 80px)' }}>
        <div className="container-medium">
          <div className="reveal" style={{ maxWidth: '640px' }}>
            <p className="eyebrow" style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>
              De kosten van niets doen
            </p>
            <h2 className="type-h2" style={{ marginBottom: '20px' }}>
              Elk kwartaal zonder meting kost u meer dan de meting zelf.
            </h2>
            <div
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.0625rem, 1.6vw, 1.1875rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <p style={{ margin: 0 }}>
                Zonder structurele meting blijft het risico dat AI de kernactiviteit overneemt een blinde vlek in uw overnameprijs.
                Blijft uw maandrapportage een ritueel in plaats van een sturingsinstrument.
                Verdwijnt elke deal-les met de volgende teamwissel.
              </p>
              <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--text-muted)' }}>
                Het verschil tussen een onderbouwde en een ongecalibreerde overnameprijs?
                Op een &euro;5M EBITDA-target al snel 0,5&times;: dat is &euro;2,5M.
              </p>
              <p style={{ margin: 0, marginTop: '8px' }}>
                De Scorecard kost twaalf minuten. Niets doen kost kwartalen.
              </p>
            </div>
            <CostAnchorVisual />
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* ═══════════════════════════════════════════
          9. Final CTA (StoryBrand: Success + Cialdini urgency)
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
            Uw volgende stap
          </p>
          <h2
            className="type-h2"
            style={{ color: 'var(--text-inverse)', marginBottom: '16px', maxWidth: '600px', marginInline: 'auto' }}
          >
            Over twaalf minuten weet u exact waar uw portefeuille kwetsbaar is.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
              color: 'rgba(247,242,235,0.5)',
              marginBottom: '48px',
              maxWidth: '460px',
              marginInline: 'auto',
              lineHeight: 1.75,
            }}
          >
            U gaat naar uw volgende IC-vergadering met data, niet met een gevoel.
            Geen account. Geen verplichtingen. Uw rapport is direct beschikbaar.
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
