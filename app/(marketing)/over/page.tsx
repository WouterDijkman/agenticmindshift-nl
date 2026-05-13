import type { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Over Wouter Dijkman',
  description:
    'Founder Agentic Mindshift en Factum Capital. Achtergrond in Rabobank Restructuring en ING Acquisition Finance.',
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.agenticmindshift.nl';

export default function OverPage() {
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Agentic Mindshift',
    url: siteUrl,
  };
  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Wouter Dijkman',
    jobTitle: 'Founder Agentic Mindshift',
    alumniOf: [
      { '@type': 'Organization', name: 'Rabobank' },
      { '@type': 'Organization', name: 'ING' },
      { '@type': 'Organization', name: 'Nyenrode Business Universiteit' },
    ],
    knowsAbout: [
      'Private Equity',
      'M&A',
      'AI advisory',
      'Restructuring',
      'Acquisition Finance',
    ],
    url: `${siteUrl}/over`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />

      <section className="container-medium pt-20 pb-12">
        <p
          className="text-xs uppercase mb-4"
          style={{ color: 'var(--accent-primary)', letterSpacing: '0.18em' }}
        >
          De gids achter Agentic Mindshift
        </p>
        <h1 className="h-1 mb-8">Over Wouter Dijkman</h1>
        <div
          className="flex flex-col gap-5 text-lg measure"
          style={{ color: 'var(--text-tertiary)' }}
        >
          <p>
            Mijn loopbaan begon in 2017 binnen Rabobank Restructuring. Drie jaar lang werkte
            ik aan intensive-care- en MKB-restructuring-dossiers. Dat is een vorm van
            financieel werk waar elke aanname expliciet moet worden gemaakt &mdash; als u in
            een herstructurering een aanname laat staan, dan is de schade meestal al
            geleden. Daar leerde ik welke instrumenten in een MBR-cyclus eigenlijk
            onmisbaar zijn, en hoe vaak ze ontbreken.
          </p>
          <p>
            In 2020 maakte ik de overstap naar ING Acquisition Finance. Tweeenhalf jaar lang
            zat ik aan de bancaire kant van LBO-financieringen voor PE-deals in het
            Nederlandse mid-market. Daar zag ik de andere kant van dezelfde munt: welke
            deal-structuren in IC-besluiten stand houden, welke aannames bij due diligence
            zelden expliciet worden, en hoe vaak een entry-multiple een verborgen aanname
            bevat die later het verschil maakt.
          </p>
          <p>
            In 2024 volgde ik het executive AI-programma aan Nyenrode Business Universiteit.
            De combinatie van acquisition finance, restructuring en de praktische AI-laag
            werd daar concreet. In oktober 2025 ben ik Agentic Mindshift gestart om die
            combinatie beschikbaar te maken voor Nederlandse PE- en M&amp;A-firma&apos;s.
          </p>
          <p>
            Op 1 juli 2026 lanceert Factum Capital: het Agentic M&amp;A- en
            Restructuring Operating System. Drieentwintig modules waarmee deal-teams
            structureel hun MBR-cyclus, DD-proces en bias-toetsing kunnen
            instrumenteren.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="container-medium py-12">
        <h2 className="h-2 mb-8">Loopbaan</h2>
        <ul className="flex flex-col gap-5">
          {[
            { year: '2017 — 2020', label: 'Rabobank Restructuring (3 jaar) — MKB-restructuring, intensive care' },
            { year: '2020 — 2023', label: 'ING Acquisition Finance (2,5 jaar) — LBO-financiering voor PE-deals' },
            { year: '2024', label: 'Nyenrode Business Universiteit — Executive AI-programma' },
            { year: 'Oktober 2025', label: 'Oprichting Agentic Mindshift' },
            { year: '1 juli 2026', label: 'Lancering Factum Capital — Agentic M&A & Restructuring OS' },
          ].map((row) => (
            <li
              key={row.year}
              className="flex flex-col sm:flex-row gap-2 sm:gap-8 pb-4"
              style={{ borderBottom: '1px solid var(--border-subtle)' }}
            >
              <span
                className="text-sm font-semibold sm:w-44 shrink-0"
                style={{ color: 'var(--accent-primary)' }}
              >
                {row.year}
              </span>
              <span style={{ color: 'var(--text-secondary)' }}>{row.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* How I work */}
      <section
        className="py-16"
        style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}
      >
        <div className="container-medium">
          <h2 className="h-2 mb-8">Hoe ik werk</h2>
          <p className="text-lg mb-8 measure" style={{ color: 'var(--text-tertiary)' }}>
            Ik werk in vier vormen, afhankelijk van wat uw situatie vraagt. Geen retainer-
            constructies zonder concreet doel; elk traject begint met meetbare nulmeting.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: '01 Portfolio Intelligence',
                body:
                  'Doorlopende intelligence-laag over uw deelnemingen, met maandelijkse MBR-rapportage en AI-substitutiemonitoring. Minimum zes maanden.',
              },
              {
                title: '02 AI Due Diligence',
                body:
                  'Een afgebakend AI-DD-traject per acquisitie, met expliciete modellering van AI-substitutierisico in uw entry-multiple. Twee tot drie weken.',
              },
              {
                title: '03 Fractional AI Officer',
                body:
                  'Twee tot drie dagen per maand begeleid ik uw portfoliobedrijven of dealteam bij AI-adoptie en bias-toetsing. Minimum zes maanden.',
              },
              {
                title: '04 Strategic Enablement Masterclasses',
                body:
                  'Eenmalige masterclasses voor dealteams van maximaal acht personen, over AI-substitutierisico en MBR-discipline.',
              },
            ].map((b) => (
              <div
                key={b.title}
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '4px',
                  padding: '24px',
                }}
              >
                <h3 className="text-lg mb-2">{b.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="container-medium py-20 text-center">
        <h2 className="h-2 mb-5">Direct contact</h2>
        <p className="mb-8 hint-italic" style={{ color: 'var(--text-tertiary)' }}>
          Een sparring-sessie van twintig minuten is gangbaar als eerste contact.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            href="https://cal.com/wwdijkman/intake-call"
            variant="primary"
            size="lg"
            external
          >
            Plan een sparring-sessie
          </Button>
          <Button
            href="https://www.linkedin.com/in/wwdijkman"
            variant="secondary"
            size="lg"
            external
          >
            Verbind via LinkedIn
          </Button>
        </div>
      </section>
    </>
  );
}
