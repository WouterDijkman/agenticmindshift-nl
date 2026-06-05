import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('werkwijze');
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

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
  price?: string;
  priceNote: string;
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
  variants?: DealVariant[];
  variantsCaption?: string;
  poweredBy?: PoweredBy;
  Icon: SketchIconComponent;
}

export default async function WerkwijzePage() {
  const t = await getTranslations('werkwijze');

  const offerings: Offering[] = [
    {
      badge: t('offering_1.badge'),
      title: t('offering_1.title'),
      situation: t('offering_1.situation'),
      priceNote: t('offering_1.price_note'),
      ctaLabel: t('offering_1.cta'),
      ctaHref: 'https://cal.com/wwdijkman/intake-call',
      Icon: SketchSparring,
    },
    {
      badge: t('offering_2.badge'),
      title: t('offering_2.title'),
      situation: t('offering_2.situation'),
      price: 'Vanaf €4.500',
      priceNote: t('offering_2.price_note'),
      ctaLabel: t('offering_2.cta'),
      ctaHref: 'https://cal.com/wwdijkman/intake-call',
      Icon: SketchConsultancy,
    },
    {
      badge: t('offering_3.badge'),
      title: t('offering_3.title'),
      situation: t('offering_3.situation'),
      price: '€3.500 – €5.500 / maand',
      priceNote: t('offering_3.price_note'),
      ctaLabel: t('offering_3.cta'),
      ctaHref: 'https://cal.com/wwdijkman/intake-call',
      featured: true,
      Icon: SketchFractional,
    },
    {
      badge: t('offering_4.badge'),
      title: t('offering_4.title'),
      situation: t('offering_4.situation'),
      price: 'Vanaf €10.000 per deal',
      priceNote: t('offering_4.price_note'),
      ctaLabel: t('offering_4.cta'),
      ctaHref: 'https://cal.com/wwdijkman/intake-call',
      variantsCaption: t('offering_4.variants_caption'),
      variants: [
        { label: t('offering_4.variant_1_label'), price: '€10.000', unit: t('offering_4.variant_1_unit') },
        { label: t('offering_4.variant_2_label'), price: '€42.500', unit: t('offering_4.variant_2_unit'), discount: '–15%' },
        { label: t('offering_4.variant_3_label'), price: '€80.000', unit: t('offering_4.variant_3_unit'), discount: '–20%' },
      ],
      poweredBy: {
        label: 'Factum Capital',
        href: '/factum-capital',
        tagline: t('offering_4.powered_by_tagline'),
      },
      Icon: SketchDueDiligence,
    },
  ];

  const faqItems: AccordionItem[] = [
    { id: 'q1', question: t('faq.q1'), answer: t('faq.a1') },
    { id: 'q2', question: t('faq.q2'), answer: t('faq.a2') },
    { id: 'q3', question: t('faq.q3'), answer: t('faq.a3') },
    { id: 'q4', question: t('faq.q4'), answer: t('faq.a4') },
    { id: 'q5', question: t('faq.q5'), answer: t('faq.a5') },
  ];

  return (
    <>
      <AnimatedHeroShell
        bgChar="03"
        bgCharSize="clamp(240px, 30vw, 460px)"
        eyebrow={t('hero.eyebrow')}
        heading={t('hero.heading')}
        subtext={t('hero.subtext')}
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
            <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('offerings.eyebrow')}</p>
            <h2 className="type-h2" style={{ marginBottom: '16px' }}>
              {t('offerings.heading')}
            </h2>
            <p
              style={{
                fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                marginBottom: '24px',
              }}
            >
              {t('offerings.subtext')}
            </p>
            {/* Guarantee strip */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderLeft: '3px solid var(--accent-cta)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--accent-cta)', flexShrink: 0 }}>{t('offerings.guarantee_title')}</span>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                {t('offerings.guarantee_body')}
              </p>
            </div>
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
                {/* Sketch-icon header */}
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
                      {t('offerings.most_chosen')}
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
                    href={o.poweredBy.href as '/factum-capital'}
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
                    {t('offerings.investment_label')}
                  </p>
                  {o.price && (
                    <p
                      style={{
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
                  )}
                  <p
                    style={{
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
            {t('pricing_note')}
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
                {t('risk.title')}
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {t('risk.body')}
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
            <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('faq.eyebrow')}</p>
            <h2 className="type-h2" style={{ margin: 0 }}>
              {t('faq.heading')}
            </h2>
          </div>

          <div className="reveal">
            <Accordion items={faqItems} />
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
              {t('cta.eyebrow')}
            </p>
            <h2
              className="type-h2"
              style={{ color: 'var(--text-inverse)', marginBottom: '16px', maxWidth: '600px', marginInline: 'auto' }}
            >
              {t('cta.heading')}
            </h2>
            <p
              style={{
                fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
                color: 'rgba(247,242,235,0.5)',
                marginBottom: '44px',
                maxWidth: '440px',
                marginInline: 'auto',
                lineHeight: 1.75,
              }}
            >
              {t('cta.subtext')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
              <Button href="/scorecard" variant="primary" size="lg">
                {t('cta.primary')}
              </Button>
              <Button href="https://cal.com/wwdijkman/intake-call" variant="secondary" size="lg" external>
                {t('cta.secondary')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
