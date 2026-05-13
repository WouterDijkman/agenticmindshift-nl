import Link from 'next/link';
import Button from '@/components/ui/Button';
import Accordion, { type AccordionItem } from '@/components/ui/Accordion';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.agenticmindshift.nl';

const faqItems: AccordionItem[] = [
  {
    id: 'duur',
    question: 'Hoe lang duurt de scorecard?',
    answer:
      'Gemiddeld twaalf minuten. Vijftien meerkeuzevragen verdeeld over vier korte secties, geen open velden tot het einde. U kunt onderbreken en later verder gaan; uw antwoorden worden lokaal bewaard.',
  },
  {
    id: 'wat-krijg',
    question: 'Wat krijg ik na afloop?',
    answer:
      'Een rapport van vier pagina’s: totaalscore, zes-dimensies-overzicht, twee aandachtspunten met toelichting en een concrete vervolgstap. U ontvangt een directe link en een PDF per e-mail.',
  },
  {
    id: 'vertrouwelijk',
    question: 'Is dit vertrouwelijk?',
    answer:
      'Ja. Uw antwoorden en rapport zijn alleen toegankelijk via uw persoonlijke link. Er wordt niets openbaar gemaakt of met derden gedeeld. Tijdens een vervolggesprek wordt niets uit uw rapport breder besproken dan met u afgesproken.',
  },
  {
    id: 'data',
    question: 'Wordt mijn data gedeeld?',
    answer:
      'Nee. Uw gegevens worden opgeslagen bij een Europese hostingpartij, niet doorverkocht en niet aan andere klanten getoond. Geaggregeerde, niet-herleidbare benchmarks kunnen worden gebruikt om peer-vergelijking te verbeteren.',
  },
  {
    id: 'geen-tijd',
    question: 'Wat als ik geen tijd heb voor 15 vragen?',
    answer:
      'De scorecard is bewust kort. De vijftien vragen zijn de minimum-set om zinvol een score te genereren op zes dimensies. Onder de twaalf minuten wordt het rapport diagnostisch minder waardevol. U kunt onderbreken en later afronden.',
  },
  {
    id: 'vervolgmails',
    question: 'Krijg ik vervolgmails?',
    answer:
      'Twee vervolgmails: na drie dagen een korte reflectie op uw twee zwakste dimensies, na zeven dagen een uitnodiging voor een sparring-sessie. Daarna hoort u niets meer. U kunt zich op elk moment afmelden.',
  },
  {
    id: 'onderscheid',
    question: 'Wat is het onderscheid met andere assessments?',
    answer:
      'De meeste AI-assessments meten technologische adoptie. Deze scorecard meet hoe uw deal-cyclus, MBR-ritme en bias-toetsing rendementslekken veroorzaken. De zes dimensies zijn ontworpen vanuit acquisition-finance en restructuring-praktijk, niet vanuit IT-volwassenheid.',
  },
];

export default function HomePage() {
  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Agentic Mindshift',
    url: siteUrl,
    founder: {
      '@type': 'Person',
      name: 'Wouter Dijkman',
    },
    foundingDate: '2025-10',
    description:
      "AI-advies voor Nederlandse PE- en M&A-firma's. Portfolio Intelligence Scorecard.",
  };

  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Wouter Dijkman',
    jobTitle: 'Founder',
    worksFor: {
      '@type': 'Organization',
      name: 'Agentic Mindshift',
    },
    url: `${siteUrl}/over`,
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof q.answer === 'string' ? q.answer : '',
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* 1. HERO */}
      <section className="container-wide pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="max-w-3xl">
          <p
            className="text-xs uppercase mb-5"
            style={{ color: 'var(--accent-primary)', letterSpacing: '0.2em' }}
          >
            Portfolio Intelligence Scorecard
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight mb-6">
            Hoeveel rendement laat uw portefeuille deze maand liggen?
          </h1>
          <p
            className="text-lg sm:text-xl mb-10 leading-relaxed"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Niet door slecht beheer. Wel door blinde vlekken in uw deal-cyclus, uw
            MBR-ritme en uw bias-toetsing die zelden expliciet worden gemaakt. De
            Portfolio Intelligence Scorecard maakt ze meetbaar, op zes dimensies, in
            twaalf minuten.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Button href="/scorecard" variant="primary" size="lg">
              Start de Scorecard
            </Button>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
              12 minuten &middot; vertrouwelijk &middot; zonder vervolg verplicht
            </span>
          </div>
        </div>
      </section>

      {/* 2. HET PROBLEEM */}
      <section className="container-medium py-20" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <h2 className="text-3xl sm:text-4xl mb-8 leading-tight">
          U doet niets fout. U meet alleen niet wat u zou moeten meten.
        </h2>
        <div className="flex flex-col gap-5 text-lg" style={{ color: 'var(--text-tertiary)' }}>
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
      </section>

      {/* 3. DE GIDS */}
      <section
        className="py-20"
        style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}
      >
        <div className="container-medium">
          <p
            className="text-xs uppercase mb-3"
            style={{ color: 'var(--accent-primary)', letterSpacing: '0.18em' }}
          >
            De gids
          </p>
          <h2 className="text-3xl sm:text-4xl mb-6">Wouter Dijkman</h2>
          <p className="text-lg mb-10" style={{ color: 'var(--text-tertiary)' }}>
            Vijfeneenhalf jaar binnen de Nederlandse bancaire wereld, eerst aan de
            restructuring-kant, daarna in acquisition finance. Daar zag ik welke
            instrumentatie-keuzes het verschil maken tussen een geslaagde en een
            tegenvallende deal. Agentic Mindshift maakt die kennis beschikbaar voor het deal-
            en bestuursteam.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
                padding: '28px',
              }}
            >
              <p
                className="text-xs uppercase mb-2"
                style={{ color: 'var(--accent-primary)', letterSpacing: '0.16em' }}
              >
                2017 &mdash; 2020
              </p>
              <h3 className="text-xl mb-3">Rabobank Restructuring (3 jaar)</h3>
              <p style={{ color: 'var(--text-tertiary)' }}>
                MKB-restructuring en intensive-care dossiers. Hier leerde ik welke vroege
                signalen onderprestatie aankondigen &mdash; en hoe vaak die signalen door
                management worden gemist, niet uit onwil, maar door gebrek aan ritme.
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
                className="text-xs uppercase mb-2"
                style={{ color: 'var(--accent-primary)', letterSpacing: '0.16em' }}
              >
                2020 &mdash; 2023
              </p>
              <h3 className="text-xl mb-3">ING Acquisition Finance (2,5 jaar)</h3>
              <p style={{ color: 'var(--text-tertiary)' }}>
                LBO-financiering voor PE-deals in het Nederlandse mid-market. Vanaf de
                bancaire kant leerde ik welke deal-structuren in IC-besluiten stand houden,
                en welke aannames bij DD doorgaans niet expliciet worden gemaakt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 3 STAPPEN */}
      <section className="container-medium py-20">
        <h2 className="text-3xl sm:text-4xl mb-12">Drie stappen, twaalf minuten</h2>
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
                "Direct na afronding: totaalscore, zes-dimensies-overzicht, twee aandachtspunten met toelichting en een concreet voorstel.",
            },
            {
              n: '03',
              title: 'Beslis zelf wat de volgende stap is',
              body:
                'Geen vervolg verplicht. U kunt het rapport intern delen, een sparring-sessie inplannen, of niets doen. Uw keuze.',
            },
          ].map((s) => (
            <div key={s.n}>
              <p style={{ color: 'var(--accent-primary)', fontSize: '96px', lineHeight: 1, fontWeight: 600 }}>
                {s.n}
              </p>
              <h3 className="text-xl mt-3 mb-3">{s.title}</h3>
              <p style={{ color: 'var(--text-tertiary)' }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. STAKES */}
      <section
        className="py-20"
        style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}
      >
        <div className="container-medium">
          <h2 className="text-3xl sm:text-4xl mb-10">Wat het kost om dit niet te meten</h2>
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
                className="text-3xl mb-4"
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
                className="text-3xl mb-4"
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

      {/* 6. SUCCESS */}
      <section className="container-medium py-20">
        <h2 className="text-3xl sm:text-4xl mb-10">Wat verandert wanneer u dit wel meet</h2>
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
              <h3 className="text-xl mb-2">{b.title}</h3>
              <p style={{ color: 'var(--text-tertiary)' }}>{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. VOOR WIE */}
      <section
        className="py-20"
        style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}
      >
        <div className="container-medium">
          <h2 className="text-3xl sm:text-4xl mb-10">Voor wie is dit?</h2>
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

      {/* 8. 6 DIMENSIES */}
      <section className="container-medium py-20">
        <h2 className="text-3xl sm:text-4xl mb-3">Zes dimensies, &eacute;&eacute;n score</h2>
        <p className="mb-10 text-lg" style={{ color: 'var(--text-tertiary)' }}>
          Elke dimensie is gekozen op basis van waar in de praktijk rendement weglekt.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { n: '01', title: 'Deal Velocity', body: 'Doorlooptijd tussen Information Memorandum en een IC-ready oordeel.' },
            { n: '02', title: 'Portfolio Intelligence', body: 'Hoe snel en hoe gestructureerd onderprestatie in uw portfolio zichtbaar wordt.' },
            { n: '03', title: 'Bias Detection', body: 'In hoeverre managementaannames buiten het deal-team om worden gevalideerd.' },
            { n: '04', title: 'AI Readiness', body: 'Modellering van AI-substitutierisico in entry-multiple en bestuursagenda.' },
            { n: '05', title: 'Capacity Engineering', body: 'Welk deel van het werk van uw associates al door AI overgenomen kan worden.' },
            { n: '06', title: 'Knowledge Retention', body: 'In welke mate DD-kennis intern wordt vastgelegd in plaats van bij personen blijft.' },
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
      </section>

      {/* 9. FAQ */}
      <section
        className="py-20"
        style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}
      >
        <div className="container-narrow">
          <h2 className="text-3xl sm:text-4xl mb-10">Veelgestelde vragen</h2>
          <Accordion items={faqItems} />
        </div>
      </section>

      {/* 10. SLOT CTA */}
      <section className="container-medium py-24 text-center">
        <h2 className="text-3xl sm:text-4xl mb-5 leading-tight">
          Twaalf minuten. Vier pagina&apos;s rapport. Geen vervolg verplicht.
        </h2>
        <p
          className="text-lg mb-10 max-w-2xl mx-auto"
          style={{ color: 'var(--text-tertiary)' }}
        >
          De scorecard is bewust kort. U bepaalt zelf wat u met het rapport doet.
        </p>
        <Button href="/scorecard" variant="primary" size="lg">
          Start de Scorecard
        </Button>
        <div className="mt-6">
          <Link href="/over" className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Eerst meer lezen over Wouter
          </Link>
        </div>
      </section>
    </>
  );
}
