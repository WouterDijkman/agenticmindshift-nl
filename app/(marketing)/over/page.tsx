import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import SketchCrosshair from '@/components/icons/SketchCrosshair';
import HeroAnimated from './HeroAnimated';
import { TweeKantenGrid, HoeIkWerkGrid } from './OverGridSections';
import JsonLd from '@/components/JsonLd';
import { organizationLd, personLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Over Wouter Dijkman',
  description:
    'Founder Agentic Mindshift en Factum Capital. Zes jaar deal-ervaring in acquisition finance en financial restructuring, Nederlandse mid-market.',
};

export default function OverPage() {
  return (
    <>
      <JsonLd data={organizationLd} />
      <JsonLd data={personLd} />

      <HeroAnimated />

            {/* ═══ BIO ═══ */}
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
            {/* Pullquote */}
            <div className="reveal">
              <p className="eyebrow" style={{ marginBottom: '28px' }}>Achtergrond</p>
              <blockquote
                style={{
                  margin: 0,
                  paddingLeft: '24px',
                  borderLeft: '3px solid var(--accent-cta)',
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    lineHeight: 1.4,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                    margin: 0,
                  }}
                >
                  &ldquo;Ik heb deals gezien die technisch perfect waren &mdash; en toch mislukten omdat niemand bereid was de ongemakkelijke aanname uit te dagen. Dat is het probleem dat ik oplos. Niet met meer data. Met betere vragen.&rdquo;
                </p>
              </blockquote>
            </div>

            {/* Bio tekst */}
            <div className="reveal" style={{ transitionDelay: '80ms' }}>
              <div
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
                  lineHeight: 1.8,
                  color: 'var(--text-secondary)',
                }}
              >
                <p>
                  Zes jaar lang aan beide kanten van de Nederlandse transactietafel. Drie jaar
                  financial restructuring op MKB- en mid-market portefeuilles in stress &mdash;
                  een context waar elke aanname expliciet moet worden gemaakt, want als u een
                  aanname laat staan is de schade doorgaans al geleden. Vervolgens twee&euml;neenhalf
                  jaar acquisition finance op LBO-financieringen voor Nederlandse PE-deals in
                  het mid-market segment van 1 tot 25 miljoen.
                </p>
                <p>
                  Die combinatie is zeldzaam. Wie de deal-structurering aan de bancaire kant
                  kent, weet ook precies waar in de post-closing praktijk de aannames niet
                  uitkomen. Welke IC-besluiten in retrospect op drijfzand stonden. Hoe een
                  MBR-cyclus eruitziet als de instrumentatie ontbreekt om onderprestatie vroeg
                  te signaleren.
                </p>
                <p>
                  In 2024 volgde ik het executive AI-programma aan Nyenrode Business
                  Universiteit. De verbinding tussen deal-praktijk en AI-toepassingen werd
                  daar concreet. In oktober 2025 is Agentic Mindshift gestart om die
                  combinatie beschikbaar te maken voor Nederlandse PE- en
                  M&amp;A-firma&apos;s die hun portfolio-intelligence structureel willen versterken.
                </p>
                <p>
                  Op 1 juli 2026 lanceert{' '}
                  <Link
                    href="/factum-capital"
                    style={{ color: 'var(--accent-cta)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                  >
                    Factum Capital
                  </Link>
                  : het Agentic M&amp;A- en Restructuring Operating System. Drie&euml;ntwintig
                  modules waarmee deal-teams hun MBR-cyclus, DD-proces en bias-toetsing
                  structureel kunnen instrumenteren.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      <TweeKantenGrid />

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* ═══ TIMELINE ═══ */}
      <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
        <div className="container-medium">
          <div className="reveal" style={{ marginBottom: '48px' }}>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>Loopbaan</p>
            <h2 className="type-h2" style={{ margin: 0 }}>Tijdlijn</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
            {/* Verticale verbindingslijn */}
            <div
              className="reveal"
              style={{
                position: 'absolute',
                left: '8px',
                top: '8px',
                bottom: '0',
                width: '1px',
                background: 'var(--border-medium)',
                transformOrigin: 'top',
              }}
            />

            {[
              { year: '2017 — 2020', label: 'Financial Restructuring', sub: 'MKB- en mid-market portefeuilles in stress — intensive care & herstructurering', delay: 0, future: false },
              { year: '2020 — 2023', label: 'Acquisition Finance', sub: 'LBO-financiering op Nederlandse PE-deals, mid-market 1–25M', delay: 60, future: false },
              { year: '2024', label: 'Executive AI-programma', sub: 'Nyenrode Business Universiteit — AI-toepassingen in financiële praktijk', delay: 120, future: false },
              { year: 'Oktober 2025', label: 'Oprichting Agentic Mindshift', sub: "Portfolio intelligence voor Nederlandse PE- en M&A-firma's", delay: 180, future: false },
              { year: '1 juli 2026', label: 'Lancering Factum Capital', sub: 'Agentic M&A & Restructuring Operating System — 23 modules', delay: 240, future: true },
            ].map((row) => (
              <div
                key={row.year}
                className="reveal"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'min-content minmax(80px, 140px) 1fr',
                  gap: 'clamp(10px, 2.5vw, 24px)',
                  alignItems: 'start',
                  paddingBlock: '24px',
                  borderBottom: '1px solid var(--border-subtle)',
                  transitionDelay: `${row.delay}ms`,
                  opacity: row.future ? undefined : undefined,
                }}
              >
                {/* Dot op de verticale lijn */}
                <div style={{ paddingTop: '4px', display: 'flex', justifyContent: 'center' }}>
                  <div
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: row.future ? 'var(--border-medium)' : 'var(--accent-cta)',
                      border: row.future ? '1.5px solid var(--border-medium)' : 'none',
                      flexShrink: 0,
                    }}
                  />
                </div>

                <span
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: row.future ? 'var(--text-muted)' : 'var(--accent-cta)',
                    letterSpacing: '-0.01em',
                    paddingTop: '2px',
                  }}
                >
                  {row.year}
                </span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <p style={{ fontSize: '1rem', fontWeight: 600, color: row.future ? 'var(--text-muted)' : 'var(--text-primary)', margin: 0 }}>
                      {row.label}
                    </p>
                    {row.future && (
                      <span style={{
                        fontSize: '8px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase' as const,
                        color: 'var(--accent-cta)',
                        border: '1px solid var(--accent-cta)',
                        padding: '2px 6px',
                        lineHeight: 1,
                        opacity: 0.7,
                      }}>
                        verwacht
                      </span>
                    )}
                  </div>
                  <p style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {row.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      <HoeIkWerkGrid />

      {/* ═══ CONTACT CTA ═══ */}
      <section
        className="grain-overlay"
        style={{
          background: 'var(--accent-primary)',
          paddingBlock: 'clamp(64px, 10vw, 120px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container-medium" style={{ textAlign: 'center', position: 'relative' }}>
          <div className="reveal" style={{ position: 'relative' }}>       <p className="eyebrow" style={{ marginBottom: '28px', color: 'rgba(247,242,235,0.5)' }}>
              Direct contact
            </p>
            <h2
              className="type-h2"
              style={{ color: 'var(--text-inverse)', marginBottom: '16px', maxWidth: '560px', marginInline: 'auto' }}
            >
              Twintig minuten. Geen agenda, geen verplichtingen. U bepaalt het onderwerp.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
                color: 'rgba(247,242,235,0.5)',
                marginBottom: '44px',
                maxWidth: '400px',
                marginInline: 'auto',
                lineHeight: 1.75,
              }}
            >
              U stelt de agenda. Ik stel de vragen.
            </p>
            <div
              style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}
            >
              <Button href="/scorecard" variant="primary" size="lg">
                Start de Scorecard
              </Button>
              <Button href="https://cal.com/wwdijkman/intake-call" variant="secondary" size="lg" external>
                Plan een vrijblijvende kennismaking
              </Button>
              <Button href="https://www.linkedin.com/in/wwdijkman" variant="secondary" size="lg" external>
                Verbind via LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
