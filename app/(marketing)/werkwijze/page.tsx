import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import SketchDivider from '@/components/icons/SketchDivider';
import AnimatedHeroShell from '@/components/motion/AnimatedHeroShell';
import WerkwijzeOnboardingSteps from './WerkwijzeOnboardingSteps';

export const metadata: Metadata = {
  title: 'Werkwijze',
  description:
    'Vier manieren waarop Agentic Mindshift werkt: Portfolio Intelligence, AI Due Diligence, Fractional AI Officer en Strategic Enablement Masterclasses.',
};

interface Offering {
  number: string;
  title: string;
  price: string;
  roi: string;
  duration: string;
  target: string;
  paragraphs: string[];
}

const offerings: Offering[] = [
  {
    number: '01',
    title: 'Portfolio Intelligence',
    price: '€8.500 per maand',
    roi: 'Eén tijdig gesignaleerde variantie-afwijking dekt bij de meeste portefeuilles de jaarkosten.',
    duration: 'Minimum 6 maanden',
    target: "PE-firma's met 50–500M AUM",
    paragraphs: [
      'Een doorlopende intelligence-laag bovenop uw bestaande MBR-cyclus. Maandelijks ontvangt u een gestructureerd portfolio-rapport dat de zes-dimensies-baseline van de scorecard bijhoudt over al uw deelnemingen, plus peer-benchmark en AI-substitutiemonitoring per portfoliobedrijf.',
      'Het rapport is niet bedoeld om de MBR te vervangen, maar om de blinde vlekken zichtbaar te maken die in een reguliere MBR-cyclus niet aan bod komen. Onderprestatie wordt binnen een maand zichtbaar in plaats van pas bij jaarrapportage; AI-substitutierisico komt expliciet op de bestuursagenda; peer-vergelijking gaat automatisch.',
      'Minimum zes maanden omdat het maandritme tijd nodig heeft om zich te zetten. Geen exclusiviteit per fonds; wel discretie binnen uw portefeuille.',
    ],
  },
  {
    number: '02',
    title: 'AI Due Diligence',
    price: '€12.500 per deal',
    roi: 'Een correct gecalibreerde entry-multiple op een €5M EBITDA-target levert bij 0,5× correctie €2,5M op. Het analytisch fundament maakt formele adviseurs sneller en gerichter.',
    duration: '2–3 weken doorlooptijd',
    target: 'NL MKB-deals €5M–€50M',
    paragraphs: [
      "Een uitgebreid buy-side analytisch rapport voor NL MKB-deals van €5M–€50M. Doorlooptijd 2–3 weken. Aangedreven door het Factum Capital-platform dat alle relevante dimensies systematisch doorlicht: financial, operational, commercial én AI-substitutierisico.",
      "De output is een uitgebreid analytisch fundament dat naast uw IC-stuk wordt gelegd. Dit is geen bank-proof due diligence met formele handtekening — dat is de rol van gecertificeerde adviseurs (RA/RB/advocaten) die Factum inschakelt waar sign-off vereist is. Het Factum-rapport fungeert als gedeeld dossier: adviseurs kunnen gerichter en sneller werken omdat het analytische grondwerk al gedaan is.",
      "Dit traject fungeert tevens als pilot voor het Factum Capital-platform: elke opdracht levert u niet alleen een rapport op, maar ook direct inzicht in hoe het systeem werkt — zonder onboarding of abonnement. Een correctie van 0,5× entry-multiple op een €5M EBITDA-target dekt de kosten van de analyse ruimschoots.",
    ],
  },
  {
    number: '03',
    title: 'Fractional AI Officer',
    price: '€6.500 per maand',
    roi: 'Gelijkwaardig aan meerdere dagen AI-expertise per maand — zonder vaste aanstelling, inwerktraject of overhead.',
    duration: 'Minimum 6 maanden, 2–3 dagen per maand',
    target: 'PE-portfoliobedrijven of dealteams',
    paragraphs: [
      'Twee tot drie dagen per maand onderdeel van uw dealteam of van het managementteam van een portfoliobedrijf. Niet als externe adviseur in een advies-rol, maar als operationeel verantwoordelijke voor AI-adoptie en bias-toetsing binnen de organisatie waar wij aansluiten.',
      "Concreet: aanwezig bij MBR's en bestuursvergaderingen, begeleiden van pilots, toetsen van management-aannames buiten het reguliere ritme om, opstellen van kwartaal-rapportages die direct naar de bestuursagenda gaan. Het resultaat: een organisatie zonder eigen AI-capaciteit die toch structureel ritme krijgt.",
      'Minimum zes maanden, omdat ritme zich pas zet na drie tot vier maandcycli. Wij werken met een beperkt aantal opdrachtgevers tegelijk om de kwaliteit van begeleiding te kunnen waarborgen.',
    ],
  },
  {
    number: '04',
    title: 'Strategic Enablement Masterclasses',
    price: '€4.500 per workshop',
    roi: 'Direct toepasbaar op uw meest recente deal of dossier. Geen voorbereiding nodig — geen abstracte theorie.',
    duration: 'Eendaags, max 8 personen',
    target: 'Dealteams en investmentcommittees',
    paragraphs: [
      'Eendaagse masterclasses voor een dealteam of investmentcommittee, met maximaal acht deelnemers. Drie modules: AI-substitutierisico in entry-multiples, bias-detectie in management-aannames, en MBR-discipline voor portfolio-intelligence.',
      'De masterclass is bewust kort en gericht. Geen brede AI-introductie, geen tooling-demonstraties. Wel concrete oefeningen op uw eigen recente deal of dossier, zodat de werkwijze meteen in uw bestaande proces past.',
      'Aanvullend op de workshop ontvangt elke deelnemer drie maanden lang een korte maandelijkse update over toepasselijke ontwikkelingen, gevolgd door een optionele follow-up sessie na zes maanden.',
    ],
  },
];

export default function WerkwijzePage() {
  return (
    <>
      <AnimatedHeroShell
        bgChar="04"
        bgCharSize="clamp(240px, 30vw, 460px)"
        eyebrow="Werkwijze"
        heading="Vier manieren om samen te werken"
        subtext="Geen retainer-constructies zonder concreet doel. Elk traject begint met een heldere beginsituatie en eindigt met aantoonbaar resultaat — u weet vooraf wat u kunt verwachten."
        headingMaxWidth="800px"
      />

      <WerkwijzeOnboardingSteps />

      <SketchDivider />

      {/* OFFERINGS */}
      <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
        <div className="container-medium">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {offerings.map((o, i) => (
              <article
                key={o.number}
                className="reveal"
                style={{
                  background: 'var(--bg-primary)',
                  borderTop: i === 0 ? '1px solid var(--border-medium)' : 'none',
                  borderBottom: '1px solid var(--border-medium)',
                  padding: 'clamp(36px, 5vw, 60px) 0',
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <div
                  className="offering-layout"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '140px 1fr',
                    gap: 'clamp(24px, 5vw, 64px)',
                    alignItems: 'start',
                  }}
                >
                  <p
                    className="offering-number"
                    style={{
                      fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                      fontSize: 'clamp(52px, 7vw, 80px)',
                      fontWeight: 800,
                      letterSpacing: '-0.04em',
                      lineHeight: 0.9,
                      color: 'var(--accent-cta)',
                      opacity: 0.9,
                      margin: 0,
                    }}
                  >
                    {o.number}
                  </p>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                      <h2 className="type-h2" style={{ margin: 0 }}>{o.title}</h2>
                      {o.number === '04' && (
                        <span style={{
                          fontSize: '9px',
                          fontWeight: 800,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: 'var(--accent-cta)',
                          border: '1px solid var(--accent-cta)',
                          padding: '3px 8px',
                          lineHeight: 1,
                          flexShrink: 0,
                        }}>
                          Meest laagdrempelige instap
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '24px',
                        marginBottom: '28px',
                        paddingBottom: '28px',
                        borderBottom: '1px solid var(--border-subtle)',
                      }}
                    >
                      {[
                        { label: 'Tarief', value: o.price },
                        { label: 'Duur', value: o.duration },
                        { label: 'Doelgroep', value: o.target },
                      ].map((m) => (
                        <div key={m.label}>
                          <p
                            style={{
                              fontSize: '10px',
                              fontWeight: 700,
                              letterSpacing: '0.15em',
                              textTransform: 'uppercase',
                              color: 'var(--accent-cta)',
                              marginBottom: '4px',
                            }}
                          >
                            {m.label}
                          </p>
                          <p style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                            {m.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                      {o.paragraphs.map((p, idx) => (
                        <p
                          key={idx}
                          style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.75, fontWeight: 400 }}
                        >
                          {p}
                        </p>
                      ))}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '14px',
                        padding: '16px 20px',
                        background: 'var(--accent-cta-soft)',
                        borderLeft: '2px solid var(--accent-cta)',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          color: 'var(--accent-cta)',
                          flexShrink: 0,
                          paddingTop: '2px',
                          lineHeight: 1,
                        }}
                      >
                        Rendement
                      </span>
                      <p style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
                        {o.roi}
                      </p>
                    </div>

                    <div style={{ marginTop: '28px' }}>
                      <Button
                        href="https://cal.com/wwdijkman/intake-call"
                        variant="secondary"
                        size="md"
                        external
                      >
                        Plan een gesprek over dit traject →
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SketchDivider />

      {/* SLOT CTA */}
      <section
        className="grain-overlay"
        style={{
          background: 'var(--accent-primary)',
          paddingBlock: 'clamp(64px, 10vw, 120px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container-medium" style={{ textAlign: 'center', position: 'relative' }}>
          <div className="reveal">
            <p className="eyebrow" style={{ marginBottom: '28px', color: 'rgba(247,242,235,0.5)' }}>
              Begin hier
            </p>
            <h2
              className="type-h2"
              style={{ color: 'var(--text-inverse)', marginBottom: '16px', maxWidth: '560px', marginInline: 'auto' }}
            >
              Welk traject past het beste? Begin bij de scorecard.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
                color: 'rgba(247,242,235,0.5)',
                marginBottom: '44px',
                maxWidth: '420px',
                marginInline: 'auto',
                lineHeight: 1.75,
              }}
            >
              De scorecard adviseert op basis van uw antwoorden welk traject het beste
              past. Geen verplichting; alleen een gefundeerd voorstel.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
              <Button href="/scorecard" variant="primary" size="lg">
                Start de Scorecard
              </Button>
              <Button href="https://cal.com/wwdijkman/intake-call" variant="secondary" size="lg" external>
                Plan een sparring-sessie
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
