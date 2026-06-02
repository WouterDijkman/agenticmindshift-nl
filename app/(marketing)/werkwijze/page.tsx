import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import SketchDivider from '@/components/icons/SketchDivider';
import AnimatedHeroShell from '@/components/motion/AnimatedHeroShell';
import WerkwijzeOnboardingSteps from './WerkwijzeOnboardingSteps';

export const metadata: Metadata = {
  title: 'Werkwijze & Investering',
  description:
    'Vier helder gedifferentieerde manieren waarop u met Agentic Mindshift werkt — van een laagdrempelige Sparring Sessie tot een Fractional AI Officer en AI Due Diligence per deal of in volume.',
};

interface DealVariant {
  label: string;
  price: string;
  unit: string;
  discount?: string;
}

interface PoweredBy {
  label: string;
  href: string;
  tagline: string;
}

interface Offering {
  badge: string;
  title: string;
  situation: string;
  price: string;
  priceNote: string;
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
  variants?: DealVariant[];
  variantsCaption?: string;
  poweredBy?: PoweredBy;
}

const offerings: Offering[] = [
  {
    badge: 'Instap · eenmalig',
    title: 'AI Sparring Sessie',
    situation:
      'U wilt snel weten wat AI betekent voor uw bedrijf, uw deal of uw eerstvolgende beslissing.',
    price: 'Vanaf €395',
    priceNote: '60–90 minuten · korte schriftelijke samenvatting',
    ctaLabel: 'Boek een sessie →',
    ctaHref: 'https://cal.com/wwdijkman/intake-call',
  },
  {
    badge: 'Projectmatig of retainer',
    title: 'Consultancy, Workflow & Strategic Enablement',
    situation:
      'U wilt AI concreet inzetten in uw processen, workflows of organisatie — met implementatie, masterclasses en team-enablement.',
    price: 'Vanaf €4.500',
    priceNote: 'Per traject of doorlopend in retainer',
    ctaLabel: 'Bespreek uw vraagstuk →',
    ctaHref: 'https://cal.com/wwdijkman/intake-call',
  },
  {
    badge: 'Embedded · doorlopend',
    title: 'Fractional AI Officer',
    situation:
      'U wilt een AI-leider op MT-niveau zonder fulltime aanstelling — strategie, leveranciersselectie en team-enablement geborgd.',
    price: '€3.500 – €5.500 / maand',
    priceNote: 'Minimaal 3 maanden · MT-deelname en operationele eigenaarschap',
    ctaLabel: 'Bespreek de fit →',
    ctaHref: 'https://cal.com/wwdijkman/intake-call',
    featured: true,
  },
  {
    badge: 'Per deal of doorlopend',
    title: 'AI Due Diligence & Portfolio',
    situation:
      'U doet M&A-deals of beheert een portfolio en wilt AI-substitutierisico structureel borgen in entry-multiples en MBR-cyclus.',
    price: 'Vanaf €10.000 per deal',
    priceNote: 'Of €6.500 – €8.500 / maand voor doorlopende portfolio-intelligence',
    ctaLabel: 'Plan een kennismaking →',
    ctaHref: 'https://cal.com/wwdijkman/intake-call',
    variantsCaption: 'Meerdere deals? Volumetarieven:',
    variants: [
      { label: '1 deal', price: '€10.000', unit: 'losse deal' },
      { label: '5 deals', price: '€42.500', unit: '€8.500 / deal', discount: '–15%' },
      { label: '10 deals', price: '€80.000', unit: '€8.000 / deal', discount: '–20%' },
    ],
    poweredBy: {
      label: 'Factum Capital',
      href: '/factum-capital',
      tagline: 'Ons AI-platform voor M&A & portfolio-intelligence',
    },
  },
];

export default function WerkwijzePage() {
  return (
    <>
      <AnimatedHeroShell
        bgChar="03"
        bgCharSize="clamp(240px, 30vw, 460px)"
        eyebrow="Werkwijze & Investering"
        heading="Vier manieren om samen te werken — u kiest het tempo"
        subtext="Vier helder gedifferentieerde routes, gekozen op basis van uw situatie. Van een laagdrempelige Sparring Sessie tot een Fractional AI Officer of een AI Due Diligence — per deal of in volume."
        headingMaxWidth="800px"
      />

      <WerkwijzeOnboardingSteps />

      <SketchDivider />

      {/* ═══════════════════════════════════════════
          OFFERING CARDS — 4 situational routes
      ═══════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
        <div className="container-medium">
          <div className="reveal" style={{ marginBottom: 'clamp(32px, 5vw, 56px)', maxWidth: '720px' }}>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>Investering</p>
            <h2 className="type-h2" style={{ marginBottom: '16px' }}>
              Welke situatie past bij u?
            </h2>
            <p
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
              }}
            >
              Geen ellenlange productlijsten. Vier situaties, vier routes — u herkent uw vraag of u herkent hem niet. In beide gevallen volstaat één kennismakingsgesprek om de juiste route te bevestigen.
            </p>
          </div>

          <div
            className="tier-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: '1px',
              background: 'var(--border-medium)',
              border: '1px solid var(--border-medium)',
            }}
          >
            {offerings.map((o, i) => (
              <article
                key={o.title}
                className="reveal tier-card"
                style={{
                  background: o.featured ? 'var(--accent-primary)' : 'var(--bg-primary)',
                  color: o.featured ? 'var(--text-inverse)' : 'var(--text-primary)',
                  padding: 'clamp(32px, 4vw, 44px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  position: 'relative',
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-cta)',
                      lineHeight: 1,
                    }}
                  >
                    {o.badge}
                  </span>
                  {o.featured && (
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 800,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--accent-primary)',
                        background: 'var(--accent-cta)',
                        padding: '4px 8px',
                        lineHeight: 1,
                        flexShrink: 0,
                      }}
                    >
                      Meest gekozen
                    </span>
                  )}
                </div>

                <h3
                  className="type-h3"
                  style={{
                    margin: 0,
                    color: o.featured ? 'var(--text-inverse)' : 'var(--text-primary)',
                  }}
                >
                  {o.title}
                </h3>

                {o.poweredBy && (
                  <Link
                    href={o.poweredBy.href}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      padding: '12px 14px',
                      background: o.featured ? 'rgba(247,242,235,0.08)' : 'var(--bg-secondary)',
                      borderLeft: '3px solid var(--accent-cta)',
                      border: `1px solid ${o.featured ? 'rgba(247,242,235,0.14)' : 'var(--border-subtle)'}`,
                      borderLeftWidth: '3px',
                      borderLeftColor: 'var(--accent-cta)',
                      textDecoration: 'none',
                      width: '100%',
                    }}
                  >
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '10px',
                        fontWeight: 800,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'var(--accent-cta)',
                        lineHeight: 1,
                      }}
                    >
                      <span>Powered by</span>
                      <span
                        style={{
                          fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                          fontSize: '0.9375rem',
                          fontWeight: 700,
                          letterSpacing: '-0.01em',
                          color: o.featured ? 'var(--text-inverse)' : 'var(--text-primary)',
                          textTransform: 'none',
                        }}
                      >
                        {o.poweredBy.label}
                      </span>
                      <span style={{ color: 'var(--accent-cta)' }}>→</span>
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                        fontSize: '0.875rem',
                        color: o.featured ? 'rgba(247,242,235,0.7)' : 'var(--text-muted)',
                        lineHeight: 1.4,
                      }}
                    >
                      {o.poweredBy.tagline}
                    </span>
                  </Link>
                )}

                <p
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                    fontSize: '1.0625rem',
                    lineHeight: 1.65,
                    color: o.featured ? 'rgba(247,242,235,0.86)' : 'var(--text-secondary)',
                    margin: 0,
                    flexGrow: 1,
                  }}
                >
                  {o.situation}
                </p>

                {o.variants && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      paddingTop: '4px',
                    }}
                  >
                    {o.variantsCaption && (
                      <p
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: o.featured ? 'rgba(247,242,235,0.6)' : 'var(--text-muted)',
                          margin: 0,
                          marginBottom: '4px',
                        }}
                      >
                        {o.variantsCaption}
                      </p>
                    )}
                    {o.variants.map((v) => (
                      <div
                        key={v.label}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '70px 1fr auto',
                          alignItems: 'baseline',
                          gap: '12px',
                          padding: '8px 10px',
                          background: o.featured ? 'rgba(247,242,235,0.06)' : 'var(--bg-secondary)',
                          border: `1px solid ${o.featured ? 'rgba(247,242,235,0.12)' : 'var(--border-subtle)'}`,
                          fontSize: '0.8125rem',
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 700,
                            color: o.featured ? 'var(--text-inverse)' : 'var(--text-primary)',
                            letterSpacing: '-0.005em',
                          }}
                        >
                          {v.label}
                        </span>
                        <span
                          style={{
                            color: o.featured ? 'rgba(247,242,235,0.7)' : 'var(--text-muted)',
                            fontSize: '0.75rem',
                          }}
                        >
                          {v.unit}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                            fontWeight: 700,
                            color: o.featured ? 'var(--text-inverse)' : 'var(--text-primary)',
                            fontSize: '0.9375rem',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {v.price}
                          {v.discount && (
                            <span
                              style={{
                                marginLeft: '6px',
                                color: 'var(--accent-cta)',
                                fontSize: '0.6875rem',
                                fontWeight: 800,
                                letterSpacing: '0.04em',
                                fontFamily: 'inherit',
                              }}
                            >
                              {v.discount}
                            </span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  style={{
                    paddingTop: '20px',
                    borderTop: `1px solid ${o.featured ? 'rgba(247,242,235,0.18)' : 'var(--border-subtle)'}`,
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
                      color: o.featured ? 'rgba(247,242,235,0.6)' : 'var(--text-muted)',
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
                      color: o.featured ? 'var(--text-inverse)' : 'var(--text-primary)',
                      margin: 0,
                    }}
                  >
                    {o.price}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                      fontSize: '0.875rem',
                      color: o.featured ? 'rgba(247,242,235,0.7)' : 'var(--text-muted)',
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {o.priceNote}
                  </p>
                </div>

                <div style={{ marginTop: '4px' }}>
                  <Button
                    href={o.ctaHref}
                    variant={o.featured ? 'primary' : 'secondary'}
                    size="md"
                    external
                  >
                    {o.ctaLabel}
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
            * Alle bedragen exclusief btw. Eerste kennismaking altijd vrijblijvend.
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
                a: 'Start met de Sparring Sessie vanaf €395. Eén concrete vraag, één schriftelijke samenvatting, geen vervolg-verplichting. Past het niet, dan is dat de uitkomst — niet het probleem.',
              },
              {
                q: 'Hoe weet ik vooraf of de investering rendeert?',
                a: 'Bij AI Due Diligence dekt één goed gecalibreerde entry-multiple-correctie van 0,5× op een €5M EBITDA-target de kosten ruim 200×. Bij Portfolio Intelligence: één tijdig gesignaleerde variantie-afwijking dekt doorgaans de jaarkosten. Bij Fractional AI Officer: één vermeden foute leveranciers-keuze betaalt het traject ruimschoots terug.',
              },
              {
                q: 'Zitten we vast aan een lange looptijd?',
                a: 'Sparring Sessie, Consultancy-traject en Due Diligence zijn per opdracht. Fractional AI Officer kent een minimum van drie maanden — niet om u vast te zetten, maar omdat het ritme tijd nodig heeft om zich te zetten.',
              },
              {
                q: 'Doen jullie ook meerdere deals tegelijk?',
                a: 'Ja — voor M&A-spelers met dealflow zijn er volumetarieven: vijf deals voor €42.500 (15% korting) of tien deals voor €80.000 (20% korting). De kortingen reflecteren het schaalvoordeel in inwerktijd en platform-onboarding.',
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
              Twijfelt u welke route past? Begin bij de scorecard.
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
              De scorecard adviseert op basis van uw antwoorden welke route het beste
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
