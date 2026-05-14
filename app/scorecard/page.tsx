import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import JsonLd from '@/components/JsonLd';
import { serviceLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Portfolio Intelligence Scorecard',
  description:
    'Vier secties, 15 vragen, ongeveer twaalf minuten. U kunt tussentijds pauzeren en later voltooien.',
};

export default function ScorecardWelcomePage() {
  return (
    <>
      <JsonLd data={serviceLd} />
      <section className="container-narrow pt-16 pb-12">
        <p
          className="text-xs uppercase mb-5 text-center"
          style={{ color: 'var(--accent-primary)', letterSpacing: '0.22em' }}
        >
          Portfolio Intelligence Scorecard
        </p>
        <h1 className="h-1 mb-6 text-center">De Portfolio Intelligence Scorecard</h1>
        <p
          className="text-lg mb-10 hint-italic text-center measure mx-auto"
          style={{ color: 'var(--text-tertiary)' }}
        >
          Vier secties, 15 vragen, ongeveer twaalf minuten. U kunt tussentijds pauzeren
          en later voltooien.
        </p>

        <div
          className="text-left mb-10"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '4px',
            padding: '28px',
          }}
        >
          <h2 className="h-3 mb-5">Overzicht van de secties</h2>
          <ol
            className="flex flex-col gap-3 text-base"
            style={{ color: 'var(--text-tertiary)', listStyle: 'decimal', paddingLeft: '1.5rem' }}
          >
            <li>Uw AI-realiteit vandaag (4 vragen)</li>
            <li>Uw deal-cyclus (3 vragen)</li>
            <li>Uw portefeuille en MBR-cyclus (4 vragen)</li>
            <li>Uw team en kennis (4 vragen)</li>
          </ol>
        </div>

        <div
          className="text-left mb-10"
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '4px',
            padding: '24px',
          }}
        >
          <p
            className="text-xs uppercase mb-2"
            style={{ color: 'var(--accent-primary)', letterSpacing: '0.18em' }}
          >
            Vertrouwelijkheid
          </p>
          <p style={{ color: 'var(--text-tertiary)' }}>
            Uw antwoorden worden alleen gebruikt om uw rapport te genereren. Geen vervolg
            verplicht. U kunt anoniem invullen indien u dat wenst.
          </p>
        </div>

        <div className="text-center">
          <Button href="/scorecard/sectie-1" variant="primary" size="lg">
            Start de Scorecard
          </Button>
        </div>
      </section>
    </>
  );
}
