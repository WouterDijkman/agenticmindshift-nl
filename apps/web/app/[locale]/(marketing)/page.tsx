import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { getAlternates } from '@/lib/hreflang';
import Button from '@/components/ui/Button';
import AnimatedHero from './AnimatedHero';
import HomepagePainSection from './HomepagePainSection';
import HomepageServicesSection from './HomepageServicesSection';
import FactumBanner from '@/components/FactumBanner';
import Accordion, { type AccordionItem } from '@/components/ui/Accordion';
import JsonLd from '@/components/JsonLd';
import { getLocalizedFaqItems } from '@/lib/faq';
import { getOrganizationLd, getPersonLd, getProfessionalServiceLd, websiteLd, getFaqLd } from '@/lib/jsonld';

/**
 * The homepage runs the StoryBrand beats in order: a problem, a guide, a
 * plan, a call to action, and what success looks like. Same order Factum
 * Capital's homepage runs, for the same reason — it is the order a reader
 * asks the questions in.
 *
 * It used to run to twelve sections and every one of them argued for the
 * Scorecard, a free questionnaire that had quietly become the proposition
 * while the billable routes lived on a page called "Werkwijze". The
 * questionnaire is now deleted outright.
 *
 * Two more sections went in this pass. "Waar wij aan werken" was the
 * Scorecard's six dimensions restated as prose — six cards and six
 * photographs re-arguing the three routes directly above them. And the FAQ
 * lost three of seven questions that the page already answers before the
 * reader reaches it. Every remaining section earns its scroll or it goes.
 */

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'homepage' });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: getAlternates('', locale),
  };
}

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations('homepage');
  const tFaq = await getTranslations('homepage.faqItems');

  const faqItems = getLocalizedFaqItems(tFaq);
  const faqLd = getFaqLd(faqItems);

  /* The 'wie' item used to splice a link to /over into its answer. That
     question is now the guide section higher up the page, which carries the
     same link on a button, so the special case went with it. */
  const accordionItems: AccordionItem[] = faqItems.map((f) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
  }));

  const planSteps = [1, 2, 3].map((n) => ({
    n,
    title: t(`plan.step_${n}_title`),
    body: t(`plan.step_${n}_body`),
  }));

  const successPoints = [1, 2, 3].map((n) => ({
    n,
    title: t(`success.title_${n}`),
    body: t(`success.body_${n}`),
  }));

  return (
    <>
      <JsonLd data={getOrganizationLd(locale)} />
      <JsonLd data={getPersonLd(locale)} />
      {/* The homepage used to declare the Scorecard as its Service. It now
          declares the thing that is actually for sale. */}
      <JsonLd data={getProfessionalServiceLd(locale)} />
      <JsonLd data={websiteLd} />
      <JsonLd data={faqLd} />

      <AnimatedHero />

      {/* ═══════════════════════════════════════════
          1. HET PROBLEEM — herkenbare situaties
      ═══════════════════════════════════════════ */}
      <HomepagePainSection />

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* ═══════════════════════════════════════════
          2. DE GIDS — wie hierachter staat.
             Moved above the offer. A reader who has just been shown three
             problems wants to know who is claiming to solve them before he
             is shown a price list; the old order asked him to read the
             price list first and take the credentials on faith.
      ═══════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(56px, 7vw, 80px)' }}>
        <div className="container-medium">
          <div className="reveal" style={{ maxWidth: '640px' }}>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('founder.eyebrow')}</p>
            <h2 className="type-h2" style={{ margin: '0 0 20px', maxWidth: '560px' }}>
              {t('founder.heading')}
            </h2>
            <p
              style={{
                fontSize: 'clamp(1.0625rem, 1.6vw, 1.1875rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                margin: '0 0 28px',
              }}
            >
              {t('founder.body')}
            </p>
            <Button href="/over" variant="secondary" size="md">
              {t('founder.cta')}
            </Button>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* ═══════════════════════════════════════════
          3. DE DRIE ROUTES — het aanbod, met prijs
      ═══════════════════════════════════════════ */}
      <HomepageServicesSection />

      {/* ═══════════════════════════════════════════
          4. FACTUM CAPITAL — signpost, geen tweede pitch
      ═══════════════════════════════════════════ */}
      <FactumBanner />

      {/* ═══════════════════════════════════════════
          5. HET PLAN — drie stappen, de eerste is een gesprek.
             The site asked for a booking on every screen without ever
             saying what happens after you click. Three steps is the most
             a reader will hold; a fourth reads as process, not reassurance.
      ═══════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
        <div className="container-medium">
          <div className="reveal" style={{ marginBottom: '48px', maxWidth: '640px' }}>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('plan.eyebrow')}</p>
            <h2 className="type-h2" style={{ margin: 0 }}>{t('plan.heading')}</h2>
          </div>

          <ol
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'clamp(24px, 4vw, 48px)',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              counterReset: 'none',
            }}
          >
            {planSteps.map((step, i) => (
              <li
                key={step.n}
                className="reveal"
                style={{ transitionDelay: `${i * 80}ms`, borderTop: '1px solid var(--border-medium)', paddingTop: '20px' }}
              >
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: 'var(--accent-cta-ink)',
                    marginBottom: '14px',
                  }}
                >
                  {String(step.n).padStart(2, '0')}
                </span>
                <p style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px' }}>
                  {step.title}
                </p>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* ═══════════════════════════════════════════
          6. WAT ER VERANDERT — het resultaat, niet nog een capability-lijst.
             Deliberately text only. The six-card block that used to sit
             here carried six photographs and said less than these three
             sentences do.
      ═══════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
        <div className="container-medium">
          <div className="reveal" style={{ marginBottom: '44px', maxWidth: '640px' }}>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('success.eyebrow')}</p>
            <h2 className="type-h2" style={{ margin: 0 }}>{t('success.heading')}</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'clamp(24px, 4vw, 48px)',
            }}
          >
            {successPoints.map((point, i) => (
              <div
                key={point.n}
                className="reveal"
                style={{ transitionDelay: `${i * 80}ms`, borderLeft: '2px solid var(--accent-cta)', paddingLeft: '20px' }}
              >
                <p style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px' }}>
                  {point.title}
                </p>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* ═══════════════════════════════════════════
          7. FAQ
      ═══════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(80px, 11vw, 136px)' }}>
        <div className="container-medium">
          <div className="faq-grid">
            {/* Left: sticky heading */}
            <div className="reveal faq-sticky">
              <p className="eyebrow" style={{ marginBottom: '20px' }}>{t('faq.eyebrow')}</p>
              <h2 className="type-h2" style={{ marginBottom: '20px' }}>
                {t('faq.heading')}
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.6vw, 1.125rem)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.75,
                  maxWidth: '280px',
                  marginBottom: '36px',
                }}
              >
                {t('faq.subtext')}
              </p>
              <Button
                href="https://cal.com/wwdijkman/intake-call"
                variant="primary"
                size="md"
                external
                className="plausible-event-name=Intake+CTA plausible-event-location=home-faq"
              >
                {t('faq.cta')}
              </Button>
            </div>
            {/* Right: accordion */}
            <div className="reveal" style={{ transitionDelay: '100ms' }}>
              <Accordion items={accordionItems} />
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* ═══════════════════════════════════════════
          8. Final CTA
      ═══════════════════════════════════════════ */}
      <section
        className="grain-overlay"
        data-surface="dark"
        style={{
          background: 'var(--surface-dark)',
          paddingBlock: 'clamp(80px, 11vw, 136px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container-medium reveal" style={{ position: 'relative', maxWidth: '760px' }}>
          <p className="eyebrow" style={{ marginBottom: '28px', color: 'var(--text-muted)' }}>
            {t('final_cta.eyebrow')}
          </p>
          <h2 className="type-h2" style={{ color: 'var(--text-primary)', marginBottom: '16px', maxWidth: '18ch' }}>
            {t('final_cta.heading')}
          </h2>
          <p
            style={{
              fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
              color: 'var(--text-muted)',
              marginBottom: '48px',
              maxWidth: '52ch',
              lineHeight: 1.75,
            }}
          >
            {t('final_cta.subtext')}
          </p>
          <div className="cta-button-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <Button
              href="https://cal.com/wwdijkman/intake-call"
              variant="primary"
              size="lg"
              external
              className="plausible-event-name=Intake+CTA plausible-event-location=home-final"
            >
              {t('final_cta.cta_primary')}
            </Button>
            <Button href="/werkwijze" variant="secondary" size="lg">
              {t('final_cta.cta_secondary')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
