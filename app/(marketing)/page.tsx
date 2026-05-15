import Link from 'next/link';
import Button from '@/components/ui/Button';
import Accordion, { type AccordionItem } from '@/components/ui/Accordion';
import ScrollIndicator from '@/components/ScrollIndicator';
import JsonLd from '@/components/JsonLd';
import { faqItems } from '@/lib/faq';
import { organizationLd, personLd, serviceLd, faqLd } from '@/lib/jsonld';

const accordionItems: AccordionItem[] = faqItems.map((f) => ({
  id: f.id,
  question: f.question,
  answer: f.answer,
}));

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationLd} />
      <JsonLd data={personLd} />
      <JsonLd data={serviceLd} />
      <JsonLd data={faqLd} />

      {/* 1. HERO */}
      <section className="grain-overlay hero-min relative flex items-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-wide pt-16 pb-24 sm:pt-24 sm:pb-32 w-full">
          <div className="max-w-3xl">
            <p
              className="text-xs uppercase mb-5"
              style={{ color: 'var(--accent-cta)', letterSpacing: '0.2em' }}
            >
              Portfolio Intelligence Scorecard
            </p>
            <h1 className="h-1 mb-6">
              Hoeveel rendement laat uw portefeuille deze maand liggen?
            </h1>
            <p
              className="text-lg sm:text-xl mb-10 leading-relaxed measure"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Niet door slecht beheer. Wel door blinde vlekken in uw deal-cyclus, uw
              MBR-ritme en uw bias-toetsing die zelden expliciet worden gemaakt. De
              Portfolio Intelligence Scorecard maakt ze meetbaar, op zes dimensies, in
              twaalf minuten.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Button href="/scorecard" variant="primary" size="lg" className="w-full sm:w-auto">
                Start de Scorecard
              </Button>
              <span
                className="text-sm hint-italic"
                style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}
              >
                12 minuten &middot; vertrouwelijk &middot; zonder vervolg verplicht
              </span>
            </div>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* 2. HET PROBLEEM */}
      <section className="py-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-medium relative">
          <span aria-hidden="true" className="quote-anchor">
            &ldquo;
          </span>
          <div className="relative">
            <h2 className="h-2 mb-8">
              U doet niets fout. U meet alleen niet wat u zou moeten meten.
            </h2>
            <div
              className="flex flex-col gap-5 text-lg measure"
              style={{ color: 'var(--text-tertiary)' }}
            >
              <p>
                De gemiddelde MBR-cyclus van een Nederlandse PE-firma toetst op
                EBITDA-ontwikkeling, schuldratio en convenanten. Dat dekt het zichtbare risico.
                Wat niet wordt gemeten zijn de stille verliezen: trage doorlooptijden tussen
                Information Memorandum en IC-oordeel, structureel ongetoetste managementaannames,
                en AI-substitutierisico dat zelden een plek krijgt in de entry-multiple.
              </p>
              <p>
                In de praktijk lekt hier per portfoliobedrijf gemiddeld een half exit-multiple
                weg. Niet door een falende manager, niet door een verkeerde sector. Door een
                instrumentatie-gat: u kunt niet sturen op wat u niet meet, en wat u niet meet
                verschijnt pas in de jaarcijfers &mdash; meestal te laat om nog iets te kunnen
                doen.
              </p>
              <p>
                De Portfolio Intelligence Scorecard maakt dit instrumentatie-gat zichtbaar.
                Vijftien gerichte vragen, zes dimensies, een rapport van vier pagina&apos;s. Geen
                advies tot u dat zelf wenst.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* 3. DE GIDS */}
      <section
        className="py-20"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="container-medium relative">
          <span aria-hidden="true" className="quote-anchor">
            &ldquo;
          </span>
          <div className="relative">
            <p
              className="text-xs uppercase mb-3"
              style={{ color: 'var(--accent-primary)', letterSpacing: '0.18em' }}
            >
              De gids
            </p>
            <h2 className="h-2 mb-10">
              Ik ken die blinde vlekken omdat ik er aan beide kanten van heb gezeten.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '4px',
                  padding: '28px',
                }}
              >
                <p style={{ color: 'var(--text-tertiary)' }}>
                  Bijna drie jaar bij ING Acquisition Finance &amp; Leveraged Lending heb ik
                  mid-market deals tussen 1 en 25 miljoen euro mee gestructureerd. Ik zag waar
                  IC-memo&apos;s standaard sterk zijn &mdash; multiples, cash conversion, debt
                  service coverage &mdash; en waar ze structureel een blinde vlek hebben: hoe
                  AI-substitutierisico de hold-period waardering raakt, en hoe bias in
                  management-validatie het oordeel kleurt voordat de cijfers spreken.
                </p>
              </div>
              <div
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '4px',
                  padding: '28px',
                }}
              >
                <p style={{ color: 'var(--text-tertiary)' }}>
                  Daarvoor zat ik drie jaar bij Rabobank in een specialistische rol binnen
                  Financial Restructuring, met een SME- en mid-market portefeuille. Daar leerde
                  ik wat er gebeurt wanneer de variantie-analyse in de MBR-cyclus te ondiep is:
                  de signalen waren er, maar ze werden pas zichtbaar toen het kwartaal al
                  verloren was. Beide ervaringen vormen de basis voor hoe ik nu naar dealflow,
                  portfoliobeheer en bias-toetsing kijk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* 4. 3 STAPPEN */}
      <section className="py-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-medium">
        <h2 className="h-2 mb-12">Drie stappen, twaalf minuten</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              n: '01',
              title: 'Beantwoord 15 vragen',
              body:
                'Vier korte secties: AI-readiness, deal-cyclus, MBR-discipline en kennisretentie. Multiple choice, geen open velden tot het einde.',
            },
            {
              n: '02',
              title: "Ontvang een rapport van 4 pagina's",
              body:
                'Direct na afronding: totaalscore, zes-dimensies-overzicht, twee aandachtspunten met toelichting en een concreet voorstel.',
            },
            {
              n: '03',
              title: 'Beslis zelf wat de volgende stap is',
              body:
                'Geen vervolg verplicht. U kunt het rapport intern delen, een sparring-sessie inplannen, of niets doen. Uw keuze.',
            },
          ].map((s) => (
            <div key={s.n}>
              <span className="monu-num-wrap" aria-hidden="true">
                <span className="monu-num">{s.n}</span>
              </span>
              <span className="sr-only">{s.n}</span>
              <h3 className="h-3 mt-3 mb-3">{s.title}</h3>
              <p style={{ color: 'var(--text-tertiary)' }}>{s.body}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* 5. STAKES */}
      <section
        className="py-20"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="container-medium">
          <h2 className="h-2 mb-10">Wat het kost om dit niet te meten</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
                padding: '28px',
              }}
            >
              <p
                className="h-3 mb-4"
                style={{ color: 'var(--accent-cta)', fontWeight: 600 }}
              >
                Half exit-multiple weg
              </p>
              <p style={{ color: 'var(--text-tertiary)' }}>
                In de praktijk lekt gemiddeld 0,5x EBITDA-multiple weg per portfoliobedrijf
                door instrumentatie-gaten die pas bij exit zichtbaar worden. Op een
                middelgrote LBO is dat snel een veelvoud van de adviesinvestering.
              </p>
            </div>
            <div
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
                padding: '28px',
              }}
            >
              <p
                className="h-3 mb-4"
                style={{ color: 'var(--accent-cta)', fontWeight: 600 }}
              >
                3 extra werkdagen per MBR
              </p>
              <p style={{ color: 'var(--text-tertiary)' }}>
                Wanneer dataconsolidatie en peer-vergelijking handmatig gebeuren, kost een
                MBR-cyclus drie werkdagen meer dan nodig. Per partner, per kwartaal. Over
                een fonds van twaalf deelnemingen is dat zes werkweken per jaar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* 6. SUCCESS */}
      <section className="py-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-medium">
        <h2 className="h-2 mb-10">Wat verandert wanneer u dit wel meet</h2>
        <div className="flex flex-col gap-6">
          {[
            {
              title: 'Beslissingen die sneller hard worden',
              body:
                'Met een meetbare zes-dimensies-baseline wordt onderprestatie binnen een maand zichtbaar, niet pas bij jaarrapportage. Dat is voldoende voorsprong om nog te kunnen sturen.',
            },
            {
              title: 'Een MBR-cyclus die zichzelf vult',
              body:
                'Wanneer dataconsolidatie geautomatiseerd is en peer-benchmarks meelopen, gaat de MBR-cyclus van forensisch werk naar gericht gesprek. Drie werkdagen winst per cyclus.',
            },
            {
              title: 'AI-substitutierisico expliciet in uw entry-multiple',
              body:
                'In plaats van AI-risico kwalitatief in een DD-rapport te noemen, modelleert u het expliciet in de multiple. Dat schoont het deal-funnel op en houdt mis-priced acquisities buiten de portefeuille.',
            },
          ].map((b) => (
            <div
              key={b.title}
              style={{
                borderLeft: '3px solid var(--accent-primary)',
                paddingLeft: '24px',
              }}
            >
              <h3 className="h-3 mb-2">{b.title}</h3>
              <p className="measure" style={{ color: 'var(--text-tertiary)' }}>
                {b.body}
              </p>
            </div>
          ))}
        </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* 7. VOOR WIE */}
      <section
        className="py-20"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="container-medium">
          <h2 className="h-2 mb-10">Voor wie is dit?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
                padding: '28px',
              }}
            >
              <p
                className="text-xs uppercase mb-3"
                style={{ color: 'var(--status-success)', letterSpacing: '0.16em' }}
              >
                Voor
              </p>
              <ul
                className="flex flex-col gap-3 text-base"
                style={{ color: 'var(--text-secondary)' }}
              >
                <li>PE-partners met een portefeuille van 50&ndash;500M AUM</li>
                <li>M&amp;A-directors die meerdere deals per jaar leiden</li>
                <li>DGA&apos;s die een buy-and-build-strategie volgen</li>
                <li>Restructuring-specialists die portfoliodossiers begeleiden</li>
              </ul>
            </div>
            <div
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
                padding: '28px',
              }}
            >
              <p
                className="text-xs uppercase mb-3"
                style={{ color: 'var(--status-warning)', letterSpacing: '0.16em' }}
              >
                Niet voor
              </p>
              <ul
                className="flex flex-col gap-3 text-base"
                style={{ color: 'var(--text-tertiary)' }}
              >
                <li>Generieke consultants die kant-en-klare frameworks willen toepassen</li>
                <li>Startups zonder portfoliostructuur</li>
                <li>Retailbeleggers op zoek naar beleggingsadvies</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* 8. 6 DIMENSIES */}
      <section className="py-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-medium">
        <h2 className="h-2 mb-3">De zes dimensies</h2>
        <p
          className="mb-10 text-lg hint-italic measure"
          style={{ color: 'var(--text-tertiary)' }}
        >
          Elke dimensie is gekozen op basis van waar in de praktijk rendement weglekt.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              n: '01',
              title: 'Deal Velocity',
              body:
                'Hoe snel u van Information Memorandum naar IC-ready oordeel komt, en waar in de cyclus werkdagen verloren gaan.',
            },
            {
              n: '02',
              title: 'Portfolio Intelligence',
              body:
                'De accuraatheid en doorlooptijd van uw maandelijkse Management Business Reviews, plus de herleidbaarheid van uw variantie-analyse.',
            },
            {
              n: '03',
              title: 'Bias Detection',
              body:
                'Het aandeel van uw oordeelsvorming dat rust op feitelijke afwijking tegenover budget en peer-benchmark, versus persoonlijke relatie met het CEO-team.',
            },
            {
              n: '04',
              title: 'AI Readiness',
              body:
                'De weerbaarheid van uw portefeuille en uw acquisitie-targets tegen substitutie door AI-native concurrenten in de hold period.',
            },
            {
              n: '05',
              title: 'Capacity Engineering',
              body:
                'Hoeveel mandaten uw team laat liggen door operationele frictie in zoekwerk, screening en memo-onderbouwing.',
            },
            {
              n: '06',
              title: 'Knowledge Retention',
              body:
                'De mate waarin kennis uit DD-trajecten en portfoliobeheer in-house blijft, versus weggaat met externe rapporten en advieskantoren.',
            },
          ].map((d) => (
            <div
              key={d.n}
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
                padding: '24px',
              }}
            >
              <p style={{ color: 'var(--accent-primary)', fontSize: '36px', fontWeight: 600, lineHeight: 1 }}>
                {d.n}
              </p>
              <h3 className="text-lg mt-3 mb-2">{d.title}</h3>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                {d.body}
              </p>
            </div>
          ))}
        </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* 9. FAQ */}
      <section
        className="py-20"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="container-narrow">
          <h2 className="h-2 mb-10">Wat partners doorgaans vooraf willen weten</h2>
          <Accordion items={accordionItems} />
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* 10. SLOT CTA */}
      <section className="py-24" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-medium text-center">
          <h2 className="h-2 mb-5">
            Twaalf minuten. Vier pagina&apos;s rapport. Geen vervolg verplicht.
          </h2>
          <p
            className="text-lg mb-10 max-w-2xl mx-auto hint-italic"
            style={{ color: 'var(--text-tertiary)' }}
          >
            De scorecard is bewust kort. U bepaalt zelf wat u met het rapport doet.
          </p>
          <Button href="/scorecard" variant="primary" size="lg" className="w-full sm:w-auto">
            Start de Scorecard
          </Button>
          <div className="mt-6">
            <Link href="/over" className="text-sm nav-link" style={{ color: 'var(--text-muted)' }}>
              Eerst meer lezen over Wouter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
