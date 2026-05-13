import type { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Werkwijze',
  description:
    'Vier manieren waarop Agentic Mindshift werkt: Portfolio Intelligence, AI Due Diligence, Fractional AI Officer en Strategic Enablement Masterclasses.',
};

interface Offering {
  number: string;
  title: string;
  price: string;
  duration: string;
  target: string;
  paragraphs: string[];
}

const offerings: Offering[] = [
  {
    number: '01',
    title: 'Portfolio Intelligence',
    price: '€8.500 per maand',
    duration: 'Minimum 6 maanden',
    target: "PE-firma's met 50&ndash;500M AUM",
    paragraphs: [
      'Een doorlopende intelligence-laag bovenop uw bestaande MBR-cyclus. Maandelijks ontvangt u een gestructureerd portfolio-rapport dat de zes-dimensies-baseline van de scorecard bijhoudt over al uw deelnemingen, plus peer-benchmark en AI-substitutiemonitoring per portfoliobedrijf.',
      'Het rapport is niet bedoeld om de MBR te vervangen, maar om de blinde vlekken zichtbaar te maken die in een reguliere MBR-cyclus niet aan bod komen. Onderprestatie wordt binnen een maand zichtbaar in plaats van pas bij jaarrapportage; AI-substitutierisico komt expliciet op de bestuursagenda; peer-vergelijking gaat automatisch.',
      "Minimum zes maanden omdat het maandritme tijd nodig heeft om zich te zetten. Geen exclusiviteit per fonds; wel discretie binnen uw portefeuille.",
    ],
  },
  {
    number: '02',
    title: 'AI Due Diligence',
    price: '€12.500 per deal',
    duration: '2 tot 3 weken doorlooptijd',
    target: 'Per acquisitie',
    paragraphs: [
      "Een afgebakend due-diligence-traject dat AI-substitutierisico expliciet in uw entry-multiple modelleert. Concreet: ik werk parallel aan uw commerciele DD een sensitivity-analyse uit op de kernactiviteiten van de target, getoetst op AI-substitueerbaarheid per functiegroep en omzetstroom.",
      'De output is een vier- tot zespagina&apos;s rapport dat naast uw IC-stuk wordt gelegd. Het bevat een aangepaste entry-multiple range, een lijst expliciete AI-substitutie-aannames, en een aanbeveling voor post-closing instrumentatie.',
      'De ervaring laat zien dat dit traject gemiddeld een half tot een hele multiple-stap in de pricing-discussie kost &mdash; wat in de meeste deals een veelvoud van de investering oplevert, ook wanneer de deal niet doorgaat omdat de aanname niet stand houdt.',
    ],
  },
  {
    number: '03',
    title: 'Fractional AI Officer',
    price: '€6.500 per maand',
    duration: 'Minimum 6 maanden, 2-3 dagen per maand',
    target: 'PE-portfoliobedrijven of dealteams',
    paragraphs: [
      'Twee tot drie dagen per maand ben ik onderdeel van uw dealteam of van het managementteam van een portfoliobedrijf. Niet als externe adviseur in een advies-rol, maar als operationeel verantwoordelijke voor AI-adoptie en bias-toetsing binnen de organisatie waar ik aansluit.',
      'Concreet: ik zit bij MBR&apos;s en bestuursvergaderingen, begeleid pilots in het bedrijf, toets management-aannames buiten het reguliere ritme om, en stel kwartaal-rapportages op die direct naar de bestuursagenda gaan. Het resultaat is dat een organisatie zonder eigen AI-capaciteit toch ritme krijgt.',
      'Minimum zes maanden omdat ritme zich pas zet na drie tot vier maandcycli. Maximaal drie fractional-engagements parallel, om diepgang te kunnen blijven leveren.',
    ],
  },
  {
    number: '04',
    title: 'Strategic Enablement Masterclasses',
    price: '€4.500 per workshop',
    duration: 'Eendaags, max 8 personen',
    target: 'Dealteams en investmentcommittees',
    paragraphs: [
      'Eendaagse masterclasses voor een dealteam of investmentcommittee, met maximaal acht deelnemers. Drie modules: AI-substitutierisico in entry-multiples, bias-detectie in management-aannames, en MBR-discipline voor portfolio-intelligence.',
      "De masterclass is bewust kort en gericht. Geen brede AI-introductie, geen tooling-demonstraties. Wel concrete oefeningen op uw eigen recente deal of dossier, zodat de werkwijze meteen in uw bestaande proces past.",
      'Aanvullend op de workshop ontvangt elke deelnemer drie maanden lang een korte maandelijkse update over toepasselijke ontwikkelingen, gevolgd door een optionele follow-up sessie na zes maanden.',
    ],
  },
];

export default function WerkwijzePage() {
  return (
    <>
      <section className="container-medium pt-20 pb-12">
        <p
          className="text-xs uppercase mb-4"
          style={{ color: 'var(--accent-primary)', letterSpacing: '0.18em' }}
        >
          Werkwijze
        </p>
        <h1 className="text-4xl sm:text-5xl mb-6">Vier manieren waarop ik werk</h1>
        <p
          className="text-lg max-w-2xl"
          style={{ color: 'var(--text-tertiary)' }}
        >
          Geen retainer-constructies zonder concreet doel. Elk traject begint met een
          meetbare nulmeting, vaak via de Portfolio Intelligence Scorecard.
        </p>
      </section>

      <section className="container-medium pb-20 flex flex-col gap-6">
        {offerings.map((o) => (
          <article
            key={o.number}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px',
              padding: '36px',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8">
              <div>
                <p
                  style={{
                    color: 'var(--accent-primary)',
                    fontSize: '72px',
                    fontWeight: 600,
                    lineHeight: 1,
                  }}
                >
                  {o.number}
                </p>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl mb-3">{o.title}</h2>
                <div
                  className="flex flex-wrap gap-x-6 gap-y-2 mb-5 text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span>
                    <strong style={{ color: 'var(--text-primary)' }}>Tarief: </strong>
                    {o.price}
                  </span>
                  <span>
                    <strong style={{ color: 'var(--text-primary)' }}>Duur: </strong>
                    {o.duration}
                  </span>
                  <span>
                    <strong style={{ color: 'var(--text-primary)' }}>Doelgroep: </strong>
                    <span dangerouslySetInnerHTML={{ __html: o.target }} />
                  </span>
                </div>
                <div
                  className="flex flex-col gap-4"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {o.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="container-medium pb-20 text-center">
        <h2 className="text-2xl sm:text-3xl mb-5">
          Welk traject past het beste? Begin bij de scorecard.
        </h2>
        <p
          className="mb-8 max-w-2xl mx-auto"
          style={{ color: 'var(--text-tertiary)' }}
        >
          De Portfolio Intelligence Scorecard adviseert op basis van uw antwoorden welke van
          de vier trajecten het beste past. Geen verplichting; alleen een gefundeerd voorstel.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/scorecard" variant="primary" size="lg">
            Start de Scorecard
          </Button>
          <Button
            href="https://cal.com/wwdijkman/intake-call"
            variant="secondary"
            size="lg"
            external
          >
            Plan een sparring-sessie
          </Button>
        </div>
      </section>
    </>
  );
}
