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

export default function RapportPage() {
  const answers = useAssessmentStore((s) => s.answers);

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const scores = useMemo(() => calculateScores(answers), [answers]);
  const offer = useMemo(() => determineOffer(answers['Q4']), [answers]);
  const offerInfo = offerMap[offer];

  if (!hydrated) {
    return (
      <section className="container-narrow py-16 text-center">
        <p style={{ color: 'var(--text-tertiary)' }}>Rapport laden...</p>
      </section>
    );
  }

  const hasAnswers = Object.keys(answers).length > 0;

  if (!hasAnswers) {
    return (
      <section className="container-narrow py-16 text-center">
        <h1 className="text-3xl mb-4">Geen rapport gevonden</h1>
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
      <h1 className="text-4xl sm:text-5xl mb-3 leading-tight">
        Portfolio Intelligence Rapport
      </h1>
      <p className="mb-10 max-w-2xl" style={{ color: 'var(--text-tertiary)' }}>
        Vier secties: uw totaalscore, prestaties per dimensie, peer-vergelijking en uw
        aanbevolen vervolgstap.
      </p>

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
          <h2 className="text-2xl mb-3">Totaalscore</h2>
          <p className="mb-3" style={{ color: 'var(--text-tertiary)' }}>
            Uw totaalscore is gebaseerd op de optelsom van uw 15 antwoorden, met een
            maximum van 75 punten. De score is een algemene indicator; de werkelijke
            informatie zit in de zes dimensies.
          </p>
          <p style={{ color: 'var(--text-tertiary)' }}>
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
          <h2 className="text-2xl mb-5">Per dimensie</h2>
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
          <h2 className="text-2xl mb-5">Peer-vergelijking</h2>
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
        <h2 className="text-2xl mb-5">Aandachtspunten</h2>
        <p className="mb-5" style={{ color: 'var(--text-tertiary)' }}>
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
        <p style={{ color: 'var(--text-tertiary)' }}>
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
        <h2 className="text-2xl mb-3">{offerInfo.name}</h2>
        <p className="mb-6" style={{ color: 'var(--text-tertiary)' }}>
          {offerInfo.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
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
        className="text-center pt-8"
        style={{ borderTop: '1px solid var(--border-subtle)' }}
      >
        <p style={{ color: 'var(--text-muted)' }} className="text-sm">
          U ontvangt dit rapport ook als PDF in uw inbox. Geen vervolg verplicht.
        </p>
        <div className="mt-4 flex gap-4 justify-center">
          <Link href="/" style={{ color: 'var(--text-tertiary)' }}>
            Terug naar homepage
          </Link>
          <Link href="/over" style={{ color: 'var(--text-tertiary)' }}>
            Over Wouter
          </Link>
        </div>
      </div>
    </section>
  );
}
