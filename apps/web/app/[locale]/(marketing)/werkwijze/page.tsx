import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/pageMetadata';
import Button from '@/components/ui/Button';
import SketchDivider from '@/components/icons/SketchDivider';
import {
  SketchSparring,
  SketchConsultancy,
  SketchGear,
} from '@/components/icons/SketchIcons';
import AnimatedHeroShell from '@/components/motion/AnimatedHeroShell';
import Accordion, { type AccordionItem } from '@/components/ui/Accordion';
import JsonLd from '@/components/JsonLd';
import { getProfessionalServiceLd, getBreadcrumbLd } from '@/lib/jsonld';
import WerkwijzeOnboardingSteps from './WerkwijzeOnboardingSteps';
import FactumBanner from '@/components/FactumBanner';
import AnswerFirst from '@/components/AnswerFirst';

const INTAKE_URL = 'https://cal.com/wwdijkman/intake-call';

type SketchIconComponent = ComponentType<{ size?: number; color?: string; opacity?: number; strokeWidth?: number }>;

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'werkwijze', '/werkwijze');
}

/* A `PoweredBy` badge used to sit on rung three, linking out to Factum from
   inside the price card. No rung is delivered on Factum's platform any more,
   so the badge has no card to sit on. Factum still appears on this page —
   once, as <FactumBanner /> — which is the whole of the relationship the
   user asked for: "verwijzing naar factumcapital.eu met banner". */

/* No amounts anywhere on this page. What survives the price is `terms`: the
   shape of the engagement — twenty minutes and no invoice, per project or in
   retainer, scoped after the intake. That is the part a buyer actually needs
   before the first call, and unlike a number it does not go stale. */
interface Offering {
  badge: string;
  title: string;
  situation: string;
  terms: string;
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
  Icon: SketchIconComponent;
}

export default async function WerkwijzePage(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  // Static rendering: fills next-intl's locale cache so nothing below this
  // reaches for `headers()`. See the long note in app/[locale]/layout.tsx.
  setRequestLocale(locale);
  const t = await getTranslations('werkwijze');

  /**
   * Three routes, not four. The Fractional AI Officer — a seat in the
   * management team at a day rate — has been withdrawn: it is the same work
   * as route 2, sold as a headcount line instead of an engagement, and
   * holding it out as a separate product was the single biggest reason the
   * offer read as four overlapping things rather than one ladder.
   */
  const offerings: Offering[] = [
    {
      badge: t('offering_1.badge'),
      title: t('offering_1.title'),
      situation: t('offering_1.situation'),
      terms: t('offering_1.terms'),
      ctaLabel: t('offering_1.cta'),
      ctaHref: INTAKE_URL,
      Icon: SketchSparring,
    },
    {
      badge: t('offering_2.badge'),
      title: t('offering_2.title'),
      situation: t('offering_2.situation'),
      terms: t('offering_2.terms'),
      ctaLabel: t('offering_2.cta'),
      ctaHref: INTAKE_URL,
      Icon: SketchConsultancy,
    },
    /* Rung three used to be AI-driven Due Diligence & Portfolio, sold here
       and delivered on Factum's platform — hence the `poweredBy` badge. That
       work is Factum's to sell now; this site points at it and stops. The
       rung is implementation and adoption, which is ours end to end, so the
       borrowed-credibility badge came off with the DD copy.

       The icon changed with it. SketchDueDiligence is a magnifying glass with
       a tick in the lens — examination, a verdict on someone else's numbers.
       Implementation is a gear: the thing being fitted and turned. */
    {
      badge: t('offering_3.badge'),
      title: t('offering_3.title'),
      situation: t('offering_3.situation'),
      terms: t('offering_3.terms'),
      ctaLabel: t('offering_3.cta'),
      ctaHref: INTAKE_URL,
      featured: true,
      Icon: SketchGear,
    },
  ];

  const faqItems: AccordionItem[] = [
    { id: 'q1', question: t('faq.q1'), answer: t('faq.a1') },
    { id: 'q2', question: t('faq.q2'), answer: t('faq.a2') },
    { id: 'q3', question: t('faq.q3'), answer: t('faq.a3') },
    { id: 'q4', question: t('faq.q4'), answer: t('faq.a4') },
  ];

  return (
    <>
      <JsonLd data={getProfessionalServiceLd(locale)} />
      <JsonLd data={getBreadcrumbLd('/werkwijze', t('hero.heading'), locale)} />

      <AnimatedHeroShell
        bgChar="03"
        bgCharSize="clamp(240px, 30vw, 460px)"
        eyebrow={t('hero.eyebrow')}
        heading={t('hero.heading')}
        subtext={t('hero.subtext')}
        headingMaxWidth="800px"
      >
        {/* The first screen of a pricing page used to be a full viewport of
            type with nothing to press. The reader arriving here has already
            decided to look at what this costs, and the closing band that
            answers "which route?" was four screens down. Same action, same
            words — moved to where the intent is.

            One button now, not two: the pair was "Start de Scorecard" beside
            "Plan een gesprek", and the free questionnaire has been withdrawn. */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
          <Button href={INTAKE_URL} variant="primary" size="lg" external className="plausible-event-name=Intake+CTA plausible-event-location=pricing-top">
            {t('cta.primary')}
          </Button>
        </div>
      </AnimatedHeroShell>

      <AnswerFirst text={t('answer_first')} />

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
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--accent-cta-ink)', flexShrink: 0 }}>{t('offerings.guarantee_title')}</span>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                {t('offerings.guarantee_body')}
              </p>
            </div>
          </div>

          <div
            className="tier-grid divider-grid"
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
                data-surface={o.featured ? 'dark' : undefined}
                style={{
                  background: o.featured ? 'var(--surface-dark)' : 'var(--bg-primary)',
                  color: 'var(--text-primary)',
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
                    color: o.featured ? 'var(--text-secondary)' : 'var(--accent-cta)',
                    marginBottom: '-4px',
                  }}
                >
                  <o.Icon size={52} strokeWidth={1.4} />
                </div>

                {/* A "most chosen" badge used to sit opposite this one. The
                    firm was founded in October 2025 and publishes no client
                    list, so the badge was a popularity claim with nothing
                    behind it. The dark card already carries the emphasis. */}
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-cta-ink)',
                    lineHeight: 1,
                  }}
                >
                  {o.badge}
                </span>

                <h3
                  className="type-h3"
                  style={{ margin: 0, color: 'var(--text-primary)' }}
                >
                  {o.title}
                </h3>

                <p
                  style={{
                    fontSize: '1.0625rem',
                    lineHeight: 1.65,
                    color: 'var(--text-secondary)',
                    margin: 0,
                    flexGrow: 1,
                  }}
                >
                  {o.situation}
                </p>

                <div
                  style={{
                    paddingTop: '20px',
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-muted)',
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {o.terms}
                  </p>
                </div>

                <div style={{ marginTop: '4px' }}>
                  <Button
                    href={o.ctaHref}
                    variant={o.featured ? 'primary' : 'secondary'}
                    size="md"
                    external
                    className={`plausible-event-name=Intake+CTA plausible-event-location=pricing-tier-${i + 1}`}
                  >
                    {o.ctaLabel}
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {/* A right-aligned footnote used to sit here reading "all amounts
              exclude VAT". With no amounts on the page there is nothing left
              for it to qualify. */}

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
                  color: 'var(--accent-cta-ink)',
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

      {/* Route 3 runs on Factum. This is the only place the page explains
          that, and it sits directly under the card that says "Powered by". */}
      <FactumBanner />

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
        data-surface="dark"
        style={{
          background: 'var(--surface-dark)',
          paddingBlock: 'clamp(64px, 10vw, 120px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Was centred. Centred prose sets a new left edge on every line, so
            the eye has to re-find the start of each one — fine for three
            words, not for a paragraph. */}
        <div className="container-medium" style={{ position: 'relative', maxWidth: '760px' }}>
          <div className="reveal">
            <p className="eyebrow" style={{ marginBottom: '28px', color: 'var(--text-muted)' }}>
              {t('cta.eyebrow')}
            </p>
            <h2
              className="type-h2"
              style={{ color: 'var(--text-primary)', marginBottom: '16px', maxWidth: '18ch' }}
            >
              {t('cta.heading')}
            </h2>
            <p
              style={{
                fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
                color: 'var(--text-muted)',
                marginBottom: '44px',
                maxWidth: '52ch',
                lineHeight: 1.75,
              }}
            >
              {t('cta.subtext')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <Button href={INTAKE_URL} variant="primary" size="lg" external className="plausible-event-name=Intake+CTA plausible-event-location=pricing-final">
                {t('cta.primary')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
