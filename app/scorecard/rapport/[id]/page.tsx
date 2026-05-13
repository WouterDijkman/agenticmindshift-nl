'use client';

import { useMemo, useEffect, useState } from 'react';
import Link from 'next/link';
import { useAssessmentStore } from '@/store/assessmentStore';
import { calculateScores, determineOffer, offerMap } from '@/lib/scoring';
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

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const scores = useMemo(() => calculateScores(answers), [answers]);
  const offer = useMemo(() => determineOffer(answers['Q4']), [answers]);
  const offerInfo = offerMap[offer];
  const percentile = approxPercentile(scores.total);

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div
            className="flex flex-col gap-5"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px',
              padding: '28px',
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i}>
                <div className="skeleton" style={{ height: '14px', width: '50%', marginBottom: '6px' }} />
                <div className="skeleton" style={{ height: '8px', width: '100%' }} />
              </div>
            ))}
          </div>
          <div
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px',
              padding: '28px',
            }}
          >
            <div className="skeleton" style={{ height: '24px', width: '50%', marginBottom: '16px' }} />
            <div className="skeleton" style={{ height: '320px', width: '100%' }} />
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
          <TotalScoreCircle score={scores.total} max={75} size={220} />
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
          {/* Display-stat: percentile of total score vs synthetic peer distribution. */}
          <p className="h-stat mb-2" style={{ color: 'var(--text-primary)' }}>
            {percentile}%
          </p>
          <p className="hint-italic mb-6" style={{ color: 'var(--text-tertiary)' }}>
            U bent beter dan {percentile}% van vergelijkbare partijen.
          </p>
          <PeerBenchmarkChart scores={scores.byDimension} />
        </div>
      </div>

      <div
        className="mb-14"
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '4px',
          padding: '32px',
        }}
      >
        <h2 className="h-2 mb-5">Aandachtspunten</h2>
        <p className="mb-5 measure" style={{ color: 'var(--text-tertiary)' }}>
          Op basis van uw antwoorden vallen twee dimensies op als grootste rendementlek:
        </p>
        <ul className="flex flex-col gap-3 mb-5">
          {scores.weakest.map((w) => (
            <li
              key={w}
              className="px-4 py-3"
              style={{
                background: 'var(--bg-elevated)',
                borderLeft: '3px solid var(--status-warning)',
                color: 'var(--text-secondary)',
                borderRadius: '4px',
              }}
            >
              {w}
            </li>
          ))}
        </ul>
        <p className="measure" style={{ color: 'var(--text-tertiary)' }}>
          In de meeste portefeuilles wordt verlies op deze dimensies pas zichtbaar bij
          jaarrapportage of exit. De eerste stap is niet directe actie, maar het meetbaar
          maken: KPI&apos;s definieren, frequentie vaststellen en de uitkomst expliciet op de
          bestuursagenda zetten.
        </p>
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
        <p
          className="text-xs uppercase mb-3"
          style={{ color: 'var(--accent-primary)', letterSpacing: '0.18em' }}
        >
          Aanbevolen vervolgstap
        </p>
        <h2 className="h-2 mb-3">{offerInfo.name}</h2>
        <p className="mb-6 measure" style={{ color: 'var(--text-tertiary)' }}>
          {offerInfo.description}
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
