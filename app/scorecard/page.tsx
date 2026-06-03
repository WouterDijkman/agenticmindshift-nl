import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import AnimatedHeroShell from '@/components/motion/AnimatedHeroShell';
import JsonLd from '@/components/JsonLd';
import { serviceLd } from '@/lib/jsonld';
import ScorecardSectionCards from './ScorecardSectionCards';

export const metadata: Metadata = {
  title: 'Deal & Portfolio Intelligence Quickscan',
  description:
    'Vier secties, 15 vragen, twaalf minuten. Inzicht in uw analytisch fundament — voor acquisitie, financiering, portefeuillereview of herstructurering.',
};

export default function ScorecardWelcomePage() {
  return (
    <>
      <JsonLd data={serviceLd} />

      <AnimatedHeroShell
        bgChar="15"
        bgCharSize="clamp(240px, 30vw, 440px)"
        eyebrow="Deal & Portfolio Intelligence Quickscan"
        heading="Waar lekt rendement weg — en wat ziet u over het hoofd?"
        subtext="Vijftien vragen. Twaalf minuten. Een rapport dat uw blinde vlekken meetbaar maakt en vergelijkt met peers."
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
    </>
  );
}
