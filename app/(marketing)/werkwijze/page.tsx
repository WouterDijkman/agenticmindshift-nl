import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import SketchDivider from '@/components/icons/SketchDivider';
import {
  SketchSparring,
  SketchConsultancy,
  SketchFractional,
  SketchDueDiligence,
} from '@/components/icons/SketchIcons';
import AnimatedHeroShell from '@/components/motion/AnimatedHeroShell';
import Accordion, { type AccordionItem } from '@/components/ui/Accordion';
import WerkwijzeOnboardingSteps from './WerkwijzeOnboardingSteps';

type SketchIconComponent = ComponentType<{ size?: number; color?: string; opacity?: number; strokeWidth?: number }>;

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
  Icon: SketchIconComponent;
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
    Icon: SketchSparring,
  },
  {
    badge: 'Projectmatig of retainer',
    title: 'AI-advies & Implementatie',
    situation:
      'U wilt AI concreet inzetten in uw processen, workflows of organisatie — met implementatie, masterclasses en teamtraining.',
    price: 'Vanaf €4.500',
    priceNote: 'Per traject of doorlopend in retainer',
    ctaLabel: 'Bespreek uw vraagstuk →',
    ctaHref: 'https://cal.com/wwdijkman/intake-call',
    Icon: SketchConsultancy,
  },
  {
    badge: 'Embedded · doorlopend',
    title: 'Fractional AI Officer',
    situation:
      'U wilt een AI-leider op MT-niveau zonder fulltime aanstelling — strategie, leveranciersselectie en teamtraining geborgd.',
    price: '€3.500 – €5.500 / maand',
    priceNote: 'Minimaal 3 maanden · MT-deelname en operationele eigenaarschap',
    ctaLabel: 'Bespreek de fit →',
    ctaHref: 'https://cal.com/wwdijkman/intake-call',
    featured: true,
    Icon: SketchFractional,
  },
  {
    badge: 'Per deal of doorlopend',
    title: 'AI Due Diligence & Portfolio',
    situation:
      'U doet M&A-deals of beheert een portefeuille en wilt het risico dat AI de kernactiviteit overneemt structureel borgen in uw overnameprijs en maandrapportage.',
    price: 'Vanaf €10.000 per deal',
    priceNote: 'Of €6.500 – €8.500 / maand voor doorlopend portefeuille-inzicht',
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
      tagline: 'Ons AI-platform voor M&A & portefeuille-inzicht',
    },
    Icon: SketchDueDiligence,
  },
];

export default function WerkwijzePage() {
  return (
    <>
      <AnimatedHeroShell
        bgChar="03"
        bgCharSize="clamp(240px, 30vw, 460px)"
        eyebrow="Werkwijze & Investering"
        heading="Vier routes — u kiest op basis van uw situatie"
        subtext="Van een eenmalige Sparring Sessie (€395) tot embedded AI-leiderschap. Elke route begint met een duidelijk moment en een concreet resultaat."
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
              Vier situaties, vier routes. U herkent uw vraag — of één gesprek volstaat om de juiste route te bevestigen.
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
                {/* Sketch-icon header — anchors the card visually */}
                <div
                  style={{
                    color: o.featured ? 'rgba(247,242,235,0.92)' : 'var(--accent-cta)',
                    marginBottom: '-4px',
                  }}
                >
                  <o.Icon size={52} strokeWidth={1.4} />
                </div>

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

          {/* Risk reversal */}
          <div
            className="reveal"
            style={{
              marginTop: '32px',
              padding: '20px 24px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: '4px',
                alignSelf: 'stretch',
                background: 'var(--accent-cta)',
                flexShrink: 0,
              }}
            />
            <div>
              <p
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-cta)',
                  marginBottom: '6px',
                }}
              >
                Geen risico
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                De Scorecard is gratis. Elk kennismakingsgesprek is vrijblijvend. En bij de Sparring Sessie geldt:
                levert het gesprek geen enkel bruikbaar inzicht, dan factureert Wouter niet. Zo simpel is het.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SketchDivider />

      {/* ═══════════════════════════════════════════
          OBJECTION HANDLING — collapsible accordion
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

          <div className="reveal">
            <Accordion
              items={[
                {
                  id: 'niets',
                  question: 'Wat als het niets voor ons blijkt?',
                  answer: 'Start met de Sparring Sessie (€395). Eén vraag, één samenvatting, geen vervolgverplichting.',
                },
                {
                  id: 'anders',
                  question: 'Wat maakt Agentic Mindshift anders?',
                  answer: 'Deal-ervaring in acquisition finance én financial restructuring — niet een AI-generalist die toevallig PE-klanten heeft. De AI versterkt die praktijk; ze vervangt haar niet.',
                },
                {
                  id: 'rendement',
                  question: 'Hoe weet ik of de investering rendeert?',
                  answer: 'Eén correctie van 0,5× op de overnameprijs bij een €5M EBITDA-target dekt de DD-kosten 200×. Eén tijdig gesignaleerde afwijking in de maandrapportage dekt de jaarkosten van doorlopend portefeuille-inzicht.',
                },
                {
                  id: 'looptijd',
                  question: 'Zitten we vast aan een lange looptijd?',
                  answer: 'Sparring, Consultancy en DD zijn per opdracht. Fractional AI Officer: minimaal 3 maanden — omdat het ritme tijd nodig heeft.',
                },
                {
                  id: 'volume',
                  question: 'Meerdere deals tegelijk?',
                  answer: 'Volumetarieven: 5 deals €42.500 (–15%), 10 deals €80.000 (–20%). Schaalvoordeel in inwerktijd en platform-onboarding.',
                },
              ] satisfies AccordionItem[]}
            />
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
              Niet zeker welke route past? De Scorecard wijst de weg.
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
              Twaalf minuten. Uw profiel bepaalt welke route het meest oplevert.
              Geen verplichting, geen vervolg tenzij u dat zelf initieert.
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
