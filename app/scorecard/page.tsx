import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import AnimatedHeroShell from '@/components/motion/AnimatedHeroShell';
import JsonLd from '@/components/JsonLd';
import { serviceLd } from '@/lib/jsonld';
import ScorecardSectionCards from './ScorecardSectionCards';
import ScorecardReportMockup from '@/components/ScorecardReportMockup';

export const metadata: Metadata = {
  title: 'Scorecard — Zes dimensies, twaalf minuten',
  description:
    'Vier secties, 15 vragen, twaalf minuten. Inzicht in uw dealproces, maandrapportage, AI-bestendigheid en kennisborging — vergeleken met vergelijkbare partijen.',
};

export default function ScorecardWelcomePage() {
  return (
    <>
      <JsonLd data={serviceLd} />

      <AnimatedHeroShell
        bgChar="15"
        bgCharSize="clamp(240px, 30vw, 440px)"
        eyebrow="Scorecard · Zes dimensies · Twaalf minuten"
        heading="Waar lekt rendement weg, en wat ziet u over het hoofd?"
        subtext="Vijftien vragen. Twaalf minuten. Een rapport dat uw blinde vlekken meetbaar maakt en vergelijkt met vergelijkbare partijen."
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
            De meeste PE-partners ontdekken hun blinde vlekken pas als het te laat is.
            Uw investering: twaalf minuten.
          </p>
          <Button href="/scorecard/sectie-1" variant="primary" size="lg">
            Start de Scorecard
          </Button>
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              textAlign: 'center',
            }}
          >
            Geen account vereist. Uw antwoorden worden tussentijds opgeslagen.
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
            Al ingevuld door PE-partners, M&A-directors en family offices in de Nederlandse mid-market.
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
                Vertrouwelijkheid
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Uw antwoorden worden alleen gebruikt om uw rapport te genereren.
                U kunt anoniem invullen indien u dat wenst.
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
              <p className="eyebrow" style={{ marginBottom: '16px' }}>Wat u ontvangt</p>
              <h2 className="type-h2" style={{ marginBottom: '20px', maxWidth: '440px' }}>
                Dit is uw rapport, direct na de laatste vraag.
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
                Zes dimensies, elk gescoord en afgezet tegen vergelijkbare partijen.
                De twee punten met de hoogste impact worden uitgelicht, zodat u
                weet waar u als eerste op moet sturen.
              </p>
              <Button href="/scorecard/sectie-1" variant="primary" size="lg">
                Start de Scorecard
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
              De kosten van uitstellen
            </p>
            <h2 className="type-h2" style={{ marginBottom: '20px' }}>
              Twaalf minuten nu of kwartalen onzekerheid later.
            </h2>
            <p
              style={{
                                fontSize: 'clamp(1.0625rem, 1.6vw, 1.1875rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                marginBottom: '8px',
              }}
            >
              Het verschil tussen een onderbouwde en een ongecalibreerde overnameprijs?
              Op een €5M EBITDA-target al snel 0,5×: dat is <strong style={{ color: 'var(--text-primary)' }}>€2,5M</strong>.
            </p>
            <p
              style={{
                                fontSize: 'clamp(1.0625rem, 1.6vw, 1.1875rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.75,
                fontStyle: 'italic',
              }}
            >
              De Scorecard is gratis. Geen account. Uw rapport is direct beschikbaar.
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
            Uw volgende stap
          </p>
          <h2
            className="type-h2"
            style={{ color: 'var(--text-inverse)', marginBottom: '16px', maxWidth: '560px', marginInline: 'auto' }}
          >
            Over twaalf minuten weet u exact waar uw portefeuille kwetsbaar is.
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
            Geen account. Geen verplichtingen. Rapport direct na afronding.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            <Button href="/scorecard/sectie-1" variant="primary" size="lg">
              Start de Scorecard
            </Button>
            <Button href="https://cal.com/wwdijkman/intake-call" variant="secondary" size="lg" external>
              Liever een gesprek?
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
