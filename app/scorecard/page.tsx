import type { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Portfolio Intelligence Scorecard',
  description:
    'Vijftien vragen, vier secties, twaalf minuten. Een rapport van vier pagina&apos;s in uw inbox.',
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.agenticmindshift.nl';

export default function ScorecardWelcomePage() {
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Portfolio Intelligence Scorecard',
    provider: { '@type': 'Organization', name: 'Agentic Mindshift' },
    serviceType: 'AI-readiness assessment',
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'PE, M&A, Restructuring',
    },
    description:
      'Vijftien-vragen assessment voor Nederlandse PE- en M&A-firma&apos;s om instrumentatie-gaten in de portefeuille meetbaar te maken.',
    url: `${siteUrl}/scorecard`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <section className="container-narrow pt-16 pb-12 text-center">
        <p
          className="text-xs uppercase mb-5"
          style={{ color: 'var(--accent-primary)', letterSpacing: '0.22em' }}
        >
          Portfolio Intelligence Scorecard
        </p>
        <h1 className="h-1 mb-6">
          Vijftien vragen. Vier secties. Een rapport van vier pagina&apos;s.
        </h1>
        <p
          className="text-lg mb-10 hint-italic"
          style={{ color: 'var(--text-tertiary)' }}
        >
          Het rapport ontvangt u direct in uw inbox, plus een persoonlijke link naar de
          online weergave. Geen vervolg verplicht.
        </p>
        <Button href="/scorecard/sectie-1" variant="primary" size="lg">
          Start met sectie 1
        </Button>

        <div
          className="mt-14 text-left"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '4px',
            padding: '28px',
          }}
        >
          <h2 className="h-3 mb-5">Wat u kunt verwachten</h2>
          <ul
            className="flex flex-col gap-3 text-base"
            style={{ color: 'var(--text-tertiary)' }}
          >
            <li>Vier secties van drie tot vier vragen, multiple choice.</li>
            <li>Toetsenbord: kies A/B/C/D/E met de letters op uw toetsenbord.</li>
            <li>Onderbreken kan: uw antwoorden worden lokaal bewaard.</li>
            <li>Op het eind vragen wij naam, zakelijk e-mail en functietitel.</li>
            <li>U ontvangt het rapport direct als persoonlijke link en als PDF.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
