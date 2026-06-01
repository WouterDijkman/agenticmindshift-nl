'use client';

import { useMemo, useEffect, useState } from 'react';
import Link from 'next/link';
import { useAssessmentStore } from '@/store/assessmentStore';
import { calculateScores, determineOffer } from '@/lib/scoring';
import {
  variantForOffer,
  rawScoreForVariant,
  weakestNormalizedForVariant,
  HIGH_SCORER_THRESHOLD,
  TOTAL_MAX,
  OFFER_GATE_PERCENT,
} from '@/lib/reportVariants';
import TotalScoreCircle from '@/components/scorecard/TotalScoreCircle';
import DimensionBars from '@/components/scorecard/DimensionBars';
import PeerBenchmarkChart from '@/components/scorecard/PeerBenchmarkChart';
import Button from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

/**
 * Rough percentile derived from total score (0..75) assuming a normal
 * distribution with mean 45 and stdev 12. Returns an integer 1..99.
 */
function approxPercentile(total: number): number {
  const mean = 45;
  const stdev = 12;
  const z = (total - mean) / stdev;
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804014327 * Math.exp((-z * z) / 2);
  let p =
    d *
    t *
    (0.319381530 +
      t *
        (-0.356563782 +
          t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  if (z > 0) p = 1 - p;
  const pct = Math.round((1 - p) * 100);
  return Math.max(1, Math.min(99, pct));
}

export default function RapportPage() {
  const answers = useAssessmentStore((s) => s.answers);
  const leadName = useAssessmentStore((s) => s.leadName);

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const scores = useMemo(() => calculateScores(answers), [answers]);
  const offer = useMemo(() => determineOffer(answers['Q4']), [answers]);
  const variant = useMemo(() => variantForOffer(offer), [offer]);
  const percentile = approxPercentile(scores.total);

  const isHighScorer = scores.total > HIGH_SCORER_THRESHOLD;

  // Skeleton shown before zustand-persist hydrates
  if (!hydrated) {
    return (
      <section className="container-wide py-12">
        <div className="skeleton" style={{ height: '20px', width: '180px', marginBottom: '24px' }} />
        <div className="skeleton" style={{ height: '48px', width: '60%', marginBottom: '16px' }} />
        <div className="skeleton" style={{ height: '20px', width: '70%', marginBottom: '40px' }} />
        <div
          className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 mb-12"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            padding: '32px',
          }}
        >
          <div className="flex justify-center">
            <div className="skeleton" style={{ width: '220px', height: '220px', borderRadius: '50%' }} />
          </div>
          <div>
            <div className="skeleton" style={{ height: '32px', width: '40%', marginBottom: '16px' }} />
            <div className="skeleton" style={{ height: '14px', width: '90%', marginBottom: '8px' }} />
            <div className="skeleton" style={{ height: '14px', width: '85%', marginBottom: '8px' }} />
            <div className="skeleton" style={{ height: '14px', width: '70%' }} />
          </div>
        </div>
      </section>
    );
  }

  const hasAnswers = Object.keys(answers).length > 0;

  if (!hasAnswers) {
    return (
      <section className="container-narrow py-16 text-center">
        <h1 className="type-h1 mb-4">Geen rapport gevonden</h1>
        <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
          We konden geen scorecard-antwoorden in deze browser vinden. Vul de scorecard
          opnieuw in om uw rapport te genereren.
        </p>
        <Button href="/scorecard" variant="primary" size="lg">
          Start de Scorecard
        </Button>
      </section>
    );
  }

  // ══════════════════════════════════════
  // HIGH-SCORER VARIANT (total > 60/75)
  // ══════════════════════════════════════
  if (isHighScorer) {
    const firstName = leadName ? leadName.split(' ')[0] : 'partner';
    return (
      <section className="container-wide py-12">
        <p className="eyebrow" style={{ marginBottom: '16px' }}>Persoonlijk rapport</p>
        <h1 className="type-h1 mb-3">Beste {firstName} — uw aanpak valt op. Laten we het hebben over wat u doet dat anderen niet doen.</h1>
        <p className="mb-10 measure" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", color: 'var(--text-secondary)', fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)', lineHeight: 1.75 }}>
          U behoort tot de kleine groep PE-partners die al structureel meet wat de meesten
          pas achteraf zien. Dat is geen kleinigheid.
        </p>

        <div
          className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 mb-10"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            padding: '32px',
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <TotalScoreCircle score={scores.total} max={TOTAL_MAX} size={220} />
          </div>
          <div>
            <p className="mb-4 measure" style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              Uw score op de Portfolio Intelligence Scorecard is{' '}
              <strong style={{ color: 'var(--text-primary)' }}>
                {scores.total} van 75
              </strong>
              . Dat is significant boven het gemiddelde van vergelijkbare Nederlandse
              partijen, en plaatst u in de top 10% van invullers.
            </p>
            <p className="mb-4 measure" style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              Een specifieke interventie-aanbeveling is op basis van uw score niet zinvol.
              U doet wat u zou moeten doen.
            </p>
            <p className="measure" style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              Wat ik zou willen aanbieden, indien u dat interessant vindt, is een
              vertrouwelijk gesprek over wat u doet dat anderen niet doen. Niet als
              verkoopgesprek &mdash; als peer-uitwisseling. Vrijwillig, geen agenda.
            </p>
          </div>
        </div>

        <div
          className="mb-12"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--accent-primary)',
            borderLeft: '3px solid var(--accent-cta)',
            padding: '32px',
          }}
        >
          <p className="eyebrow" style={{ marginBottom: '12px' }}>Volgende stap</p>
          <p className="mb-6 measure" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 1.6vw, 1.125rem)', lineHeight: 1.75 }}>
            Stuur een bericht via LinkedIn als u wilt sparren over uw aanpak — als peer-uitwisseling, op uw initiatief.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 no-print">
            <Button href="https://www.linkedin.com/in/wwdijkman/" variant="primary" size="lg" external>
              Verbind op LinkedIn
            </Button>
            <Button href="/werkwijze" variant="secondary" size="lg">
              Bekijk de trajecten
            </Button>
          </div>
        </div>

        <div
          className="text-center pt-8 no-print"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '16px' }}>
            U ontvangt dit rapport ook als PDF in uw inbox.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/werkwijze" className="nav-link" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Bekijk alle trajecten →
            </Link>
            <Link href="https://www.linkedin.com/in/wwdijkman/" className="nav-link" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }} target="_blank" rel="noopener noreferrer">
              Verbind op LinkedIn →
            </Link>
          </div>
          <div className="mt-6 flex justify-center no-print">
            <Button variant="secondary" size="md" onClick={() => window.print()}>
              Print / sla op als PDF
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // ══════════════════════════════════════
  // STANDARD REPORT (A/B/C/D/none)
  // ══════════════════════════════════════
  const variantRawScore = variant ? rawScoreForVariant(answers, variant.id) : 0;
  const weakestNormalized = variant
    ? weakestNormalizedForVariant(scores.byDimension, variant.id)
    : 100;
  const showOfferBlock = variant !== null && weakestNormalized <= OFFER_GATE_PERCENT;

  return (
    <section className="container-wide py-12">
      <p className="eyebrow" style={{ marginBottom: '16px' }}>Persoonlijk rapport</p>
      <h1 className="type-h1 mb-3">Uw Deal & Portfolio Intelligence Rapport</h1>
      <p className="mb-2 measure" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", color: 'var(--text-secondary)', fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)', lineHeight: 1.75 }}>
        U beschikt nu over inzicht dat de meeste partijen pas krijgen op het moment dat
        het al te laat is &mdash; bij de jaarrapportage, de afwijzing van de bank, of
        de deal die net niet doorging. Hieronder leest u waar uw analytisch fundament
        sterk is, waar het weglekt, en welk Factum Capital moment het meest relevant is.
      </p>
      <p className="mb-8 measure" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        Totaalscore &middot; dimensies &middot; peer-vergelijking &middot; aanbevolen vervolgstap
      </p>

      {/* Score + totaal */}
      <div
        className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 mb-12"
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          padding: '32px',
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <TotalScoreCircle score={scores.total} max={TOTAL_MAX} size={220} />
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '12px', textAlign: 'center', maxWidth: '180px', lineHeight: 1.5 }}>
            Beter dan {percentile}% van vergelijkbare partijen
          </p>
        </div>
        <div>
          <h2 className="type-h2 mb-3">Totaalscore</h2>
          <p className="mb-3 measure" style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
            Uw totaalscore is gebaseerd op de optelsom van uw 15 antwoorden, met een
            maximum van 75 punten. De score is een algemene indicator; de werkelijke
            informatie zit in de zes dimensies.
          </p>
          <p className="measure" style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
            Uw twee zwakste dimensies, hieronder gemarkeerd, zijn de meest waarschijnlijke
            plekken waar rendement weglekt &mdash; niet door slecht beheer, maar door
            ontbrekende instrumentatie.
          </p>
        </div>
      </div>

      {/* Dimensies + peer-benchmark */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            padding: '28px',
          }}
        >
          <h2 className="type-h2 mb-5">Per dimensie</h2>
          <DimensionBars scores={scores.byDimension} weakest={scores.weakest} />
        </div>
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            padding: '28px',
          }}
        >
          <h2 className="type-h2 mb-5">Peer-vergelijking</h2>
          <p className="type-stat mb-2" style={{ color: 'var(--text-primary)' }}>
            {percentile}%
          </p>
          <p className="hint-italic mb-6" style={{ color: 'var(--text-secondary)' }}>
            U scoort beter dan {percentile}% van vergelijkbare Nederlandse partijen.
          </p>
          <PeerBenchmarkChart scores={scores.byDimension} />
        </div>
      </div>

      {/* Interpretatie + interventies */}
      {variant && (
        <div
          className="mb-14"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            padding: '32px',
          }}
        >
          <h2 className="type-h2 mb-5">Interpretatie</h2>
          <p className="mb-8 measure" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
            {variant.interpretation(variantRawScore)}
          </p>

          <h3 className="type-h3 mb-5">Drie concrete interventies</h3>
          <ol className="flex flex-col gap-5" style={{ listStyle: 'none', padding: 0 }}>
            {variant.interventions.map((iv, idx) => (
              <li key={iv.title} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: 'var(--accent-cta)',
                  letterSpacing: '0.06em',
                  flexShrink: 0,
                  paddingTop: '2px',
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <p style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 1.6vw, 1.125rem)', lineHeight: 1.7, margin: 0 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>{iv.title}</strong>
                  {' '}&mdash;{' '}
                  <span>{iv.body}</span>
                </p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Offer block: only when weakest normalized <= 40% */}
      {showOfferBlock && variant && (
        <div
          className="mb-12"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--accent-primary)',
            borderLeft: '3px solid var(--accent-cta)',
            padding: '32px',
          }}
        >
          <p className="eyebrow" style={{ marginBottom: '12px' }}>Aanbevolen vervolgstap</p>
          <h2 className="type-h2 mb-3">{variant.offerName}</h2>
          <p className="mb-4 measure" style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
            Op basis van uw scoreprofiel past dit traject het beste bij uw situatie.
            U start vrijblijvend met een Sparring Sessie als u eerst wilt toetsen.
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
            <p style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Investering:
            </p>
            <p style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--accent-cta)' }}>
              {variant.price}
            </p>
          </div>
          <p className="mb-8" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Exclusief btw. Eerste sessie altijd vrijblijvend.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 no-print">
            <Button href="https://cal.com/wwdijkman/intake-call" variant="primary" size="lg" external>
              Plan een vrijblijvende kennismaking
            </Button>
            <Button href="/werkwijze" variant="secondary" size="lg">
              Bekijk alle trajecten & investering
            </Button>
          </div>
        </div>
      )}

      {/* Footer nav */}
      <div
        className="text-center pt-8 no-print"
        style={{ borderTop: '1px solid var(--border-subtle)' }}
      >
        <p className="text-sm" style={{ color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '16px' }}>
          U ontvangt dit rapport ook als PDF in uw inbox.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/werkwijze" className="nav-link" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Bekijk alle trajecten →
          </Link>
          <Link href="https://cal.com/wwdijkman/intake-call" className="nav-link" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Plan een vrijblijvende kennismaking →
          </Link>
          <Link href="/contact" className="nav-link" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Bespreek uw situatie →
          </Link>
        </div>
        <div className="mt-6 flex justify-center no-print">
          <Button variant="secondary" size="md" onClick={() => window.print()}>
            Print / sla op als PDF
          </Button>
        </div>
      </div>
    </section>
  );
}
