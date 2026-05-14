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
  // Abramowitz & Stegun approximation of the standard normal CDF.
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

  // High-scorer override: total > 60/75.
  const isHighScorer = scores.total > HIGH_SCORER_THRESHOLD;

  // Skeleton placeholder shown before zustand-persist hydrates.
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
            borderRadius: '4px',
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
        <h1 className="h-1 mb-4">Geen rapport gevonden</h1>
        <p className="mb-8" style={{ color: 'var(--text-tertiary)' }}>
          We konden geen scorecard-antwoorden in deze browser vinden. Vul de scorecard
          opnieuw in om uw rapport te genereren.
        </p>
        <Button href="/scorecard" variant="primary" size="lg">
          Start de Scorecard
        </Button>
      </section>
    );
  }

  // === HIGH-SCORER VARIANT (total > 60/75) — overrides everything else ===
  if (isHighScorer) {
    const firstName = leadName ? leadName.split(' ')[0] : 'partner';
    return (
      <section className="container-wide py-12">
        <p
          className="text-xs uppercase mb-4"
          style={{ color: 'var(--accent-primary)', letterSpacing: '0.22em' }}
        >
          Persoonlijk rapport
        </p>
        <h1 className="h-1 mb-6">Beste {firstName}, een korte erkenning.</h1>

        <div
          className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 mb-10"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '4px',
            padding: '32px',
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <TotalScoreCircle score={scores.total} max={TOTAL_MAX} size={220} />
          </div>
          <div>
            <p className="mb-4 measure" style={{ color: 'var(--text-tertiary)' }}>
              Uw score op de Portfolio Intelligence Scorecard is{' '}
              <strong style={{ color: 'var(--text-primary)' }}>
                {scores.total} van 75
              </strong>
              . Dat is significant boven het gemiddelde van vergelijkbare Nederlandse
              partijen, en plaatst u in de top 10% van invullers.
            </p>
            <p className="mb-4 measure" style={{ color: 'var(--text-tertiary)' }}>
              Een specifieke interventie-aanbeveling is op basis van uw score niet zinvol.
              U doet wat u zou moeten doen.
            </p>
            <p className="measure" style={{ color: 'var(--text-tertiary)' }}>
              Wat ik wel zou willen aanbieden, indien u dat interessant vindt, is een
              vertrouwelijk gesprek over wat u doet dat anderen niet doen. Niet als
              verkoopgesprek, wel als peer-uitwisseling. Vrijwillig, geen agenda. Stuur
              bij interesse een bericht via LinkedIn.
            </p>
          </div>
        </div>

        <div
          className="mb-12"
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--accent-primary)',
            borderRadius: '4px',
            padding: '32px',
          }}
        >
          <div className="flex flex-col sm:flex-row gap-3 no-print">
            <Button
              href="https://www.linkedin.com/in/wwdijkman/"
              variant="primary"
              size="lg"
              external
            >
              Connecteer op LinkedIn
            </Button>
          </div>
        </div>

        <div
          className="text-center pt-8 no-print"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <p className="text-sm hint-italic" style={{ color: 'var(--text-muted)' }}>
            U ontvangt dit rapport ook als PDF in uw inbox. Geen vervolg verplicht.
          </p>
          <div className="mt-4 flex gap-4 justify-center">
            <Link href="/" className="nav-link" style={{ color: 'var(--text-tertiary)' }}>
              Terug naar homepage
            </Link>
            <Link href="/over" className="nav-link" style={{ color: 'var(--text-tertiary)' }}>
              Over Wouter
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // === STANDARD REPORT (A/B/C/D/none) ===
  const variantRawScore = variant ? rawScoreForVariant(answers, variant.id) : 0;
  const weakestNormalized = variant
    ? weakestNormalizedForVariant(scores.byDimension, variant.id)
    : 100;
  const showOfferBlock = variant !== null && weakestNormalized <= OFFER_GATE_PERCENT;

  return (
    <section className="container-wide py-12">
      <p
        className="text-xs uppercase mb-4"
        style={{ color: 'var(--accent-primary)', letterSpacing: '0.22em' }}
      >
        Persoonlijk rapport
      </p>
      <h1 className="h-1 mb-3">Portfolio Intelligence Rapport</h1>
      <p className="mb-8 measure" style={{ color: 'var(--text-tertiary)' }}>
        Vier secties: uw totaalscore, prestaties per dimensie, peer-vergelijking en uw
        aanbevolen vervolgstap.
      </p>

      <div className="no-print mb-10">
        <Button
          variant="secondary"
          size="md"
          onClick={() => window.print()}
        >
          Print deze pagina
        </Button>
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 mb-12"
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '4px',
          padding: '32px',
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <TotalScoreCircle score={scores.total} max={TOTAL_MAX} size={220} />
        </div>
        <div>
          <h2 className="h-2 mb-3">Totaalscore</h2>
          <p className="mb-3 measure" style={{ color: 'var(--text-tertiary)' }}>
            Uw totaalscore is gebaseerd op de optelsom van uw 15 antwoorden, met een
            maximum van 75 punten. De score is een algemene indicator; de werkelijke
            informatie zit in de zes dimensies.
          </p>
          <p className="measure" style={{ color: 'var(--text-tertiary)' }}>
            Uw twee zwakste dimensies, hieronder gemarkeerd, zijn de meest waarschijnlijke
            plekken waar rendement weglekt &mdash; niet door slecht beheer, maar door
            ontbrekende instrumentatie.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '4px',
            padding: '28px',
          }}
        >
          <h2 className="h-2 mb-5">Per dimensie</h2>
          <DimensionBars scores={scores.byDimension} weakest={scores.weakest} />
        </div>
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '4px',
            padding: '28px',
          }}
        >
          <h2 className="h-2 mb-5">Peer-vergelijking</h2>
          <p className="h-stat mb-2" style={{ color: 'var(--text-primary)' }}>
            {percentile}%
          </p>
          <p className="hint-italic mb-6" style={{ color: 'var(--text-tertiary)' }}>
            U bent beter dan {percentile}% van vergelijkbare partijen.
          </p>
          <PeerBenchmarkChart scores={scores.byDimension} />
        </div>
      </div>

      {/* Interpretation + interventions (variant-specific) */}
      {variant && (
        <div
          className="mb-14"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '4px',
            padding: '32px',
          }}
        >
          <h2 className="h-2 mb-5">Interpretatie</h2>
          <p className="mb-8 measure" style={{ color: 'var(--text-tertiary)' }}>
            {variant.interpretation(variantRawScore)}
          </p>

          <h3 className="h-3 mb-5">Drie interventies</h3>
          <ol
            className="flex flex-col gap-5"
            style={{ listStyle: 'decimal', paddingLeft: '1.5rem' }}
          >
            {variant.interventions.map((iv) => (
              <li key={iv.title} style={{ color: 'var(--text-tertiary)' }}>
                <p>
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
            background: 'var(--bg-elevated)',
            border: '1px solid var(--accent-primary)',
            borderRadius: '4px',
            padding: '32px',
          }}
        >
          <p
            className="text-xs uppercase mb-3"
            style={{ color: 'var(--accent-primary)', letterSpacing: '0.18em' }}
          >
            Aanbevolen vervolgstap
          </p>
          <h2 className="h-2 mb-3">{variant.offerName}</h2>
          <p className="mb-3 measure" style={{ color: 'var(--text-tertiary)' }}>
            Op basis van uw scoreprofiel past dit traject het beste bij uw situatie.
          </p>
          <p
            className="mb-6 measure"
            style={{ color: 'var(--text-secondary)', fontWeight: 500 }}
          >
            Prijs: {variant.price}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 no-print">
            <Button
              href="https://cal.com/wwdijkman/intake-call"
              variant="primary"
              size="lg"
              external
            >
              Plan een sparring-sessie
            </Button>
            <Button href="/werkwijze" variant="secondary" size="lg">
              Bekijk alle trajecten
            </Button>
          </div>
        </div>
      )}

      <div
        className="text-center pt-8 no-print"
        style={{ borderTop: '1px solid var(--border-subtle)' }}
      >
        <p className="text-sm hint-italic" style={{ color: 'var(--text-muted)' }}>
          U ontvangt dit rapport ook als PDF in uw inbox. Geen vervolg verplicht.
        </p>
        <div className="mt-4 flex gap-4 justify-center">
          <Link href="/" className="nav-link" style={{ color: 'var(--text-tertiary)' }}>
            Terug naar homepage
          </Link>
          <Link href="/over" className="nav-link" style={{ color: 'var(--text-tertiary)' }}>
            Over Wouter
          </Link>
        </div>
      </div>
    </section>
  );
}
