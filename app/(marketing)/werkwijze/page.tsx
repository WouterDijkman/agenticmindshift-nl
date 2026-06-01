import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import SketchDivider from '@/components/icons/SketchDivider';
import AnimatedHeroShell from '@/components/motion/AnimatedHeroShell';
import WerkwijzeOnboardingSteps from './WerkwijzeOnboardingSteps';

export const metadata: Metadata = {
  title: 'Werkwijze & Investering',
  description:
    'Drie manieren waarop u met Agentic Mindshift werkt: laagdrempelige Sparring Sessie, AI Due Diligence per deal, of doorlopende Portfolio Intelligence en Fractional AI Officer.',
};

type Tier = 'Instap' | 'Kern' | 'Maatwerk';

interface Offering {
  number: string;
  tier: Tier;
  title: string;
  price: string;
  outcome: string;
  roi: string;
  duration: string;
  target: string;
  paragraphs: string[];
  ctaLabel: string;
  featured?: boolean;
}

const offerings: Offering[] = [
  {
    number: '00',
    tier: 'Instap',
    title: 'AI Sparring Sessie',
    price: '€1.500 per sessie',
    outcome:
      'Na deze sessie: een schriftelijke read-out met drie concrete vervolgstappen — toepasbaar op uw eerstvolgende dossier.',
    roi: 'Eén heldere blinde vlek geadresseerd vóór uw volgende IC. Geen vervolgverplichting.',
    duration: '90 minuten · online of op locatie',
    target: 'PE-partners en M&A-directors die eerst willen toetsen',
    paragraphs: [
      'Een geconcentreerd gesprek van 90 minuten over één concrete vraag — een aanstaande deal, een onderpresterend portfoliobedrijf, of een twijfel die op de IC-agenda blijft staan. Geen pitch, geen tooling-demonstratie.',
      'U krijgt binnen drie werkdagen een schriftelijke read-out met de drie meest urgente vervolgstappen, gekoppeld aan uw eigen situatie. Als u na de read-out wilt opschalen naar een AI Due Diligence of een doorlopend traject, wordt de investering verrekend.',
    ],
    ctaLabel: 'Boek een Sparring Sessie →',
  },
  {
    number: '01',
    tier: 'Kern',
    title: 'AI Due Diligence',
    price: '€12.500 per deal',
    outcome:
      'Na dit traject: een uitgebreid analytisch fundament onder uw IC-stuk — inclusief AI-substitutierisico en entry-multiple-correctie.',
    roi: 'Een correct gecalibreerde entry-multiple op een €5M EBITDA-target levert bij 0,5× correctie €2,5M op. Het analytisch fundament maakt formele adviseurs sneller en gerichter.',
    duration: '2–3 weken doorlooptijd',
    target: 'NL MKB-deals €5M–€50M',
    paragraphs: [
      'Een uitgebreid buy-side analytisch rapport voor NL MKB-deals van €5M–€50M. Doorlooptijd 2–3 weken. Aangedreven door het Factum Capital-platform dat alle relevante dimensies systematisch doorlicht: financial, operational, commercial én AI-substitutierisico.',
      'De output is een uitgebreid analytisch fundament dat naast uw IC-stuk wordt gelegd. Dit is geen bank-proof due diligence met formele handtekening — dat is de rol van gecertificeerde adviseurs (RA/RB/advocaten) die Factum inschakelt waar sign-off vereist is. Het Factum-rapport fungeert als gedeeld dossier: adviseurs kunnen gerichter en sneller werken omdat het analytische grondwerk al gedaan is.',
      'Dit traject fungeert tevens als pilot voor het Factum Capital-platform: elke opdracht levert u niet alleen een rapport op, maar ook direct inzicht in hoe het systeem werkt — zonder onboarding of abonnement. Een correctie van 0,5× entry-multiple op een €5M EBITDA-target dekt de kosten van de analyse ruimschoots.',
    ],
    ctaLabel: 'Start mijn AI Due Diligence →',
    featured: true,
  },
  {
    number: '02',
    tier: 'Kern',
    title: 'Portfolio Intelligence',
    price: '€8.500 per maand',
    outcome:
      'Na zes maanden: een maandelijks ritme waarin onderprestatie binnen 30 dagen zichtbaar is in plaats van bij jaarrapportage.',
    roi: 'Eén tijdig gesignaleerde variantie-afwijking dekt bij de meeste portefeuilles de jaarkosten.',
    duration: 'Minimum 6 maanden',
    target: "PE-firma's met 50–500M AUM",
    paragraphs: [
      'Een doorlopende intelligence-laag bovenop uw bestaande MBR-cyclus. Maandelijks ontvangt u een gestructureerd portfolio-rapport dat de zes-dimensies-baseline van de scorecard bijhoudt over al uw deelnemingen, plus peer-benchmark en AI-substitutiemonitoring per portfoliobedrijf.',
      'Het rapport is niet bedoeld om de MBR te vervangen, maar om de blinde vlekken zichtbaar te maken die in een reguliere MBR-cyclus niet aan bod komen. Onderprestatie wordt binnen een maand zichtbaar in plaats van pas bij jaarrapportage; AI-substitutierisico komt expliciet op de bestuursagenda; peer-vergelijking gaat automatisch.',
      'Minimum zes maanden omdat het maandritme tijd nodig heeft om zich te zetten. Geen exclusiviteit per fonds; wel discretie binnen uw portefeuille.',
    ],
    ctaLabel: 'Plan een kennismaking →',
  },
  {
    number: '03',
    tier: 'Maatwerk',
    title: 'Fractional AI Officer',
    price: '€6.500 per maand',
    outcome:
      'Na zes maanden: een organisatie die zonder eigen AI-capaciteit toch structureel ritme krijgt — pilots, MBR-aanwezigheid, kwartaal-rapportages.',
    roi: 'Gelijkwaardig aan meerdere dagen AI-expertise per maand — zonder vaste aanstelling, inwerktraject of overhead.',
    duration: 'Minimum 6 maanden, 2–3 dagen per maand',
    target: 'PE-portfoliobedrijven of dealteams',
    paragraphs: [
      'Twee tot drie dagen per maand onderdeel van uw dealteam of van het managementteam van een portfoliobedrijf. Niet als externe adviseur in een advies-rol, maar als operationeel verantwoordelijke voor AI-adoptie en bias-toetsing binnen de organisatie waar wij aansluiten.',
      "Concreet: aanwezig bij MBR's en bestuursvergaderingen, begeleiden van pilots, toetsen van management-aannames buiten het reguliere ritme om, opstellen van kwartaal-rapportages die direct naar de bestuursagenda gaan. Het resultaat: een organisatie zonder eigen AI-capaciteit die toch structureel ritme krijgt.",
      'Minimum zes maanden, omdat ritme zich pas zet na drie tot vier maandcycli. Wij werken met een beperkt aantal opdrachtgevers tegelijk om de kwaliteit van begeleiding te kunnen waarborgen.',
    ],
    ctaLabel: 'Bespreek de fit voor uw organisatie →',
  },
  {
    number: '04',
    tier: 'Instap',
    title: 'Strategic Enablement Masterclass',
    price: '€4.500 per workshop',
    outcome:
      'Na deze dag: uw dealteam past de drie technieken direct toe op het eerstvolgende dossier — zonder transitiefase.',
    roi: 'Direct toepasbaar op uw meest recente deal of dossier. Geen voorbereiding nodig — geen abstracte theorie.',
    duration: 'Eendaags, max 8 personen',
    target: 'Dealteams en investmentcommittees',
    paragraphs: [
      'Eendaagse masterclasses voor een dealteam of investmentcommittee, met maximaal acht deelnemers. Drie modules: AI-substitutierisico in entry-multiples, bias-detectie in management-aannames, en MBR-discipline voor portfolio-intelligence.',
      'De masterclass is bewust kort en gericht. Geen brede AI-introductie, geen tooling-demonstraties. Wel concrete oefeningen op uw eigen recente deal of dossier, zodat de werkwijze meteen in uw bestaande proces past.',
      'Aanvullend op de workshop ontvangt elke deelnemer drie maanden lang een korte maandelijkse update over toepasselijke ontwikkelingen, gevolgd door een optionele follow-up sessie na zes maanden.',
    ],
    ctaLabel: 'Reserveer een masterclass-datum →',
  },
];

// Tier-card data for the top-of-page pricing ladder
const tierCards: {
  tier: Tier;
  badge: string;
  title: string;
  price: string;
  scope: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  anchor: string;
  featured?: boolean;
}[] = [
  {
    tier: 'Instap',
    badge: 'Instap · laagdrempelig',
    title: 'AI Sparring Sessie',
    price: 'Vanaf €1.500',
    scope: '90 minuten · 1 schriftelijke read-out',
    bullets: [
      'Eén concrete dossier-vraag bespreken',
      'Schriftelijke read-out binnen 3 werkdagen',
      'Vervolg-investering wordt verrekend',
    ],
    ctaLabel: 'Boek een Sparring Sessie →',
    ctaHref: 'https://cal.com/wwdijkman/intake-call',
    anchor: '#sparring',
  },
  {
    tier: 'Kern',
    badge: 'Meest gekozen',
    title: 'AI Due Diligence',
    price: 'Vanaf €12.500 per deal',
    scope: '2–3 weken · uitgebreid analytisch fundament',
    bullets: [
      'AI-substitutierisico in entry-multiple',
      'Inclusief peer-benchmark op uw target',
      'Gedeeld dossier — adviseurs starten sneller',
    ],
    ctaLabel: 'Start mijn AI Due Diligence →',
    ctaHref: 'https://cal.com/wwdijkman/intake-call',
    anchor: '#due-diligence',
    featured: true,
  },
  {
    tier: 'Maatwerk',
    badge: 'Maatwerk · doorlopend',
    title: 'Portfolio & Fractional',
    price: '€6.500 – €8.500 per maand',
    scope: 'Minimaal 6 maanden · maandritme of embedded',
    bullets: [
      'Portfolio Intelligence over uw deelnemingen',
      "Of Fractional AI Officer in uw dealteam",
      'Eerste maand altijd vrijblijvend evalueerbaar',
    ],
    ctaLabel: 'Plan een vrijblijvende kennismaking →',
    ctaHref: 'https://cal.com/wwdijkman/intake-call',
    anchor: '#portfolio',
  },
];

export default function WerkwijzePage() {
  return (
    <>
      <AnimatedHeroShell
        bgChar="03"
        bgCharSize="clamp(240px, 30vw, 460px)"
        eyebrow="Werkwijze & Investering"
        heading="Drie manieren om samen te werken — u kiest het tempo"
        subtext="Begin met een Sparring Sessie, scale up naar een AI Due Diligence, of bouw een doorlopend ritme. Elk traject begint met een heldere beginsituatie en eindigt met aantoonbaar resultaat — u weet vooraf wat u kunt verwachten."
        headingMaxWidth="800px"
      />

      <WerkwijzeOnboardingSteps />

      <SketchDivider />

      {/* ═══════════════════════════════════════════
          TIER LADDER — 3 pricing cards
      ═══════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
        <div className="container-medium">
          <div className="reveal" style={{ marginBottom: 'clamp(32px, 5vw, 56px)', maxWidth: '720px' }}>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>Investering</p>
            <h2 className="type-h2" style={{ marginBottom: '16px' }}>
              Welk traject past bij waar u nu staat?
            </h2>
            <p style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
            }}>
              Geen retainer-constructies zonder concreet doel. U start klein als dat past, of meteen op de hoofdroute — de investering rendeert per dossier of per maandcyclus, niet pas na jaren.
            </p>
          </div>

          <div
            className="tier-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1px',
              background: 'var(--border-medium)',
              border: '1px solid var(--border-medium)',
            }}
          >
            {tierCards.map((card, i) => (
              <article
                key={card.title}
                className="reveal tier-card"
                style={{
                  background: card.featured ? 'var(--accent-primary)' : 'var(--bg-primary)',
                  color: card.featured ? 'var(--text-inverse)' : 'var(--text-primary)',
                  padding: 'clamp(32px, 4vw, 44px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  position: 'relative',
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: card.featured ? 'var(--accent-cta)' : 'var(--accent-cta)',
                    lineHeight: 1,
                  }}
                >
                  {card.badge}
                </span>

                <h3
                  className="type-h3"
                  style={{
                    margin: 0,
                    color: card.featured ? 'var(--text-inverse)' : 'var(--text-primary)',
                  }}
                >
                  {card.title}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    color: card.featured ? 'rgba(247,242,235,0.78)' : 'var(--text-secondary)',
                    margin: 0,
                    minHeight: '3em',
                  }}
                >
                  {card.scope}
                </p>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    flexGrow: 1,
                  }}
                >
                  {card.bullets.map((b) => (
                    <li
                      key={b}
                      style={{
                        display: 'flex',
                        gap: '10px',
                        fontSize: '0.9375rem',
                        lineHeight: 1.55,
                        color: card.featured ? 'rgba(247,242,235,0.86)' : 'var(--text-secondary)',
                      }}
                    >
                      <span
                        style={{
                          color: 'var(--accent-cta)',
                          fontWeight: 800,
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div
                  style={{
                    paddingTop: '20px',
                    borderTop: `1px solid ${card.featured ? 'rgba(247,242,235,0.18)' : 'var(--border-subtle)'}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: card.featured ? 'rgba(247,242,235,0.6)' : 'var(--text-muted)',
                      margin: 0,
                    }}
                  >
                    Investering
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                      fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1,
                      color: card.featured ? 'var(--text-inverse)' : 'var(--text-primary)',
                      margin: 0,
                    }}
                  >
                    {card.price}
                  </p>
                </div>

                <div style={{ marginTop: '4px' }}>
                  <Button
                    href={card.ctaHref}
                    variant={card.featured ? 'primary' : 'secondary'}
                    size="md"
                    external
                  >
                    {card.ctaLabel}
                  </Button>
                </div>
              </article>
            ))}
          </div>

          <p
            style={{
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
              marginTop: '16px',
              textAlign: 'right',
              letterSpacing: '0.04em',
            }}
          >
            * Alle bedragen exclusief btw. Eerste sessie altijd vrijblijvend.
          </p>
        </div>
      </section>

      <SketchDivider />

      {/* ═══════════════════════════════════════════
          OBJECTION HANDLING
      ═══════════════════════════════════════════ */}
      <section
        style={{
          background: 'var(--bg-secondary)',
          paddingBlock: 'clamp(56px, 7vw, 88px)',
        }}
      >
        <div className="container-medium">
          <div className="reveal" style={{ marginBottom: 'clamp(28px, 4vw, 44px)', maxWidth: '640px' }}>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>Eerlijk over de investering</p>
            <h2 className="type-h2" style={{ margin: 0 }}>
              Wat partners doorgaans eerst willen weten
            </h2>
          </div>

          <div
            className="objection-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1px',
              background: 'var(--border-subtle)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {[
              {
                q: 'Wat als het niets voor ons blijkt?',
                a: 'Start met de Sparring Sessie. Eén concrete vraag, één read-out, geen vervolg-verplichting. Past het niet, dan is dat de uitkomst — niet het probleem.',
              },
              {
                q: 'Hoe weet ik vooraf of de investering rendeert?',
                a: 'Bij AI Due Diligence dekt één goed gecalibreerde entry-multiple-correctie van 0,5× op een €5M EBITDA-target de kosten ruim 200×. Bij Portfolio Intelligence: één tijdig gesignaleerde variantie-afwijking dekt doorgaans de jaarkosten.',
              },
              {
                q: 'Zitten we vast aan een lange looptijd?',
                a: 'Sparring Sessie en Due Diligence zijn per opdracht. Bij doorlopende trajecten geldt zes maanden minimum — niet om u vast te zetten, maar omdat het maandritme tijd nodig heeft om zich te zetten.',
              },
              {
                q: 'Wat als wij intern al expertise hebben?',
                a: 'Dan wordt het traject korter en gerichter. De scorecard maakt vooraf zichtbaar waar uw fundament al sterk is — daar betaalt u niet voor.',
              },
            ].map((item) => (
              <div
                key={item.q}
                style={{
                  background: 'var(--bg-primary)',
                  padding: 'clamp(28px, 3.5vw, 36px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(1.0625rem, 1.7vw, 1.1875rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    color: 'var(--text-primary)',
                    lineHeight: 1.3,
                    margin: 0,
                  }}
                >
                  {item.q}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    color: 'var(--text-secondary)',
                    margin: 0,
                  }}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SketchDivider />

      {/* ═══════════════════════════════════════════
          ALLE TRAJECTEN IN DETAIL
      ═══════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
        <div className="container-medium">
          <div className="reveal" style={{ marginBottom: 'clamp(32px, 4vw, 52px)', maxWidth: '640px' }}>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>Alle trajecten in detail</p>
            <h2 className="type-h2" style={{ margin: 0 }}>
              Wat u per traject ontvangt — en wat het oplevert
            </h2>
          </div>

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
                      <h3 className="type-h2" style={{ margin: 0 }}>{o.title}</h3>
                      <span style={{
                        fontSize: '9px',
                        fontWeight: 800,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: o.featured ? 'var(--text-inverse)' : 'var(--accent-cta)',
                        background: o.featured ? 'var(--accent-cta)' : 'transparent',
                        border: o.featured ? '1px solid var(--accent-cta)' : '1px solid var(--accent-cta)',
                        padding: '3px 8px',
                        lineHeight: 1,
                        flexShrink: 0,
                      }}>
                        {o.featured ? 'Meest gekozen · ' : ''}{o.tier}
                      </span>
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
                        { label: 'Investering', value: o.price },
                        { label: 'Duur', value: o.duration },
                        { label: 'Voor wie', value: o.target },
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

                    {/* Outcome — concrete uitkomst */}
                    <p
                      style={{
                        fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                        fontSize: 'clamp(1.0625rem, 1.7vw, 1.1875rem)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        lineHeight: 1.45,
                        letterSpacing: '-0.01em',
                        marginBottom: '20px',
                      }}
                    >
                      {o.outcome}
                    </p>

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
                        {o.ctaLabel}
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
              style={{ color: 'var(--text-inverse)', marginBottom: '16px', maxWidth: '600px', marginInline: 'auto' }}
            >
              Twijfelt u welk traject past? Begin bij de scorecard.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
                color: 'rgba(247,242,235,0.5)',
                marginBottom: '44px',
                maxWidth: '440px',
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
                Plan een vrijblijvende kennismaking
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
