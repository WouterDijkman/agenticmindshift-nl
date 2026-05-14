import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import JsonLd from '@/components/JsonLd';
import { personLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Drie manieren om in contact te komen met Wouter Dijkman van Agentic Mindshift.',
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={personLd} />
      <section className="container-medium pt-20 pb-12">
        <p
          className="text-xs uppercase mb-4"
          style={{ color: 'var(--accent-primary)', letterSpacing: '0.18em' }}
        >
          Contact
        </p>
        <h1 className="h-1 mb-6">Drie manieren om te beginnen</h1>
        <p
          className="text-lg measure"
          style={{ color: 'var(--text-tertiary)' }}
        >
          Welke route u kiest hangt af van wat u zoekt. Geen van deze drie verplicht u tot
          een vervolg.
        </p>
      </section>

      <section className="container-medium pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <article
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px',
              padding: '28px',
            }}
          >
            <p
              style={{
                color: 'var(--accent-primary)',
                fontSize: '60px',
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              01
            </p>
            <h2 className="text-xl mt-4 mb-3">Scorecard</h2>
            <p className="mb-5 text-sm" style={{ color: 'var(--text-tertiary)' }}>
              Twaalf minuten. Vier pagina&apos;s rapport. Het meest gestructureerde
              startpunt om uw portefeuille meetbaar te maken.
            </p>
            <Button href="/scorecard" variant="primary" size="md">
              Start de Scorecard
            </Button>
          </article>

          <article
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px',
              padding: '28px',
            }}
          >
            <p
              style={{
                color: 'var(--accent-primary)',
                fontSize: '60px',
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              02
            </p>
            <h2 className="text-xl mt-4 mb-3">Sparring-sessie</h2>
            <p className="mb-5 text-sm" style={{ color: 'var(--text-tertiary)' }}>
              Twintig minuten op de telefoon, geen verkoopgesprek. Geschikt als u eerst
              wil sparren of de scorecard relevant is voor uw situatie.
            </p>
            <Button
              href="https://cal.com/wwdijkman/intake-call"
              variant="secondary"
              size="md"
              external
            >
              Plan via cal.com
            </Button>
          </article>

          <article
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px',
              padding: '28px',
            }}
          >
            <p
              style={{
                color: 'var(--accent-primary)',
                fontSize: '60px',
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              03
            </p>
            <h2 className="text-xl mt-4 mb-3">Direct e-mail of LinkedIn</h2>
            <p className="mb-5 text-sm" style={{ color: 'var(--text-tertiary)' }}>
              Voor specifieke vragen of wanneer u liever schriftelijk begint. Reactie
              binnen twee werkdagen.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="mailto:wouter@agenticmindshift.nl"
                style={{ color: 'var(--text-secondary)' }}
              >
                wouter@agenticmindshift.nl
              </a>
              <a
                href="https://www.linkedin.com/in/wwdijkman"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-secondary)' }}
              >
                linkedin.com/in/wwdijkman
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
