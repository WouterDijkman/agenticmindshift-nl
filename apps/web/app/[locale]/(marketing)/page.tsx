import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { getAlternates } from '@/lib/hreflang';
import Button from '@/components/ui/Button';
import AnimatedHero from './AnimatedHero';
import HomepageStatsSection from './HomepageStatsSection';
import HomepageStepsSection from './HomepageStepsSection';
import HomepageDimensionsSection from './HomepageDimensionsSection';
import HomepagePainSection from './HomepagePainSection';
import HomepageShowcaseSection from './HomepageShowcaseSection';
import HomepageFactumSection from './HomepageFactumSection';
import CostAnchorVisual from './CostAnchorVisual';
import Accordion, { type AccordionItem } from '@/components/ui/Accordion';
import JsonLd from '@/components/JsonLd';
import { getLocalizedFaqItems } from '@/lib/faq';
import { organizationLd, personLd, serviceLd, websiteLd, getFaqLd } from '@/lib/jsonld';

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

  const accordionItems: AccordionItem[] = faqItems.map((f) => {
    // Override 'wie' answer to include a link to /over
    if (f.id === 'wie') {
      return {
        id: f.id,
        question: f.question,
        answer: (
          <>
            {f.answer}{' '}
            <a
              href={`/${locale}/over`}
              style={{ color: 'var(--accent-cta-ink)', fontWeight: 500, whiteSpace: 'nowrap' }}
            >
              {tFaq('wie_link')}
            </a>
          </>
        ),
      };
    }
    return { id: f.id, question: f.question, answer: f.answer };
  });

  return (
    <>
      <JsonLd data={organizationLd} />
      <JsonLd data={personLd} />
      <JsonLd data={serviceLd} />
      <JsonLd data={websiteLd} />
      <JsonLd data={faqLd} />

      <AnimatedHero />

      {/* ═══════════════════════════════════════════
          1b. PIJNPUNTEN — herkenbare situaties
      ═══════════════════════════════════════════ */}
      <HomepagePainSection />

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* ═══════════════════════════════════════════
          2. ZO WERKT HET — direct na pijnpunten
      ═══════════════════════════════════════════ */}
      <HomepageStepsSection />

      {/* ═══════════════════════════════════════════
          2b. PRODUCT-SHOWCASE — hoe het rapport eruitziet
      ═══════════════════════════════════════════ */}
      <HomepageShowcaseSection />

      {/* ═══════════════════════════════════════════
          3. STATISTIEKEN — animated count-up
      ═══════════════════════════════════════════ */}
      <HomepageStatsSection />

      {/* ═══════════════════════════════════════════
          3b. FOUNDER — eerlijke geloofwaardigheid i.p.v. social proof
      ═══════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(56px, 7vw, 80px)' }}>
        <div className="container-medium">
          <div className="reveal" style={{ maxWidth: '640px' }}>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('founder.eyebrow')}</p>
            <h2 className="type-h2" style={{ margin: '0 0 20px', maxWidth: '560px' }}>{t('founder.heading')}</h2>
            <p style={{ fontSize: 'clamp(1.0625rem, 1.6vw, 1.1875rem)', color: 'var(--text-secondary)', lineHeight: 1.75, margin: '0 0 28px' }}>
              {t('founder.body')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px' }}>
              <Button href="/over" variant="secondary" size="md">
                {t('founder.cta')}
              </Button>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, maxWidth: '420px' }}>
                {t('founder.sample_note')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3c. FACTUM CAPITAL — short teaser, full pitch lives on
              /factum-capital and factumcapital.eu
      ═══════════════════════════════════════════ */}
      <HomepageFactumSection />

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* ═══════════════════════════════════════════
          5b. MID-PAGE CTA
      ═══════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(40px, 5vw, 64px)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container-medium">
          <div
            className="reveal mid-cta-row"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <div>
              <p
                style={{
                                    fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.015em',
                  marginBottom: '6px',
                  lineHeight: 1.25,
                }}
              >
                {t('mid_cta.heading')}
              </p>
              <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)', color: 'var(--text-muted)', margin: 0 }}>
                {t('mid_cta.subtext')}
              </p>
            </div>
            <Button href="/scorecard" variant="primary" size="lg">
              {t('mid_cta.cta')}
            </Button>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* ═══════════════════════════════════════════
          6. ZES DIMENSIES
      ═══════════════════════════════════════════ */}
      <HomepageDimensionsSection />

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* ═══════════════════════════════════════════
          7. TRANSFORMATIE — Before → After (StoryBrand: Success)
      ═══════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(64px, 9vw, 96px)' }}>
        <div className="container-medium">
          <div className="reveal" style={{ marginBottom: '40px' }}>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('transformation.eyebrow')}</p>
            <h2 className="type-h2" style={{ margin: 0, maxWidth: '520px' }}>
              {t('transformation.heading')}
            </h2>
          </div>
          <div
            className="reveal feature-grid"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
          >
            <div className="feature-card">
              <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '20px' }}>
                {t('transformation.without_label')}
              </p>
              <div style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'var(--text-secondary)', lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{ margin: 0 }}>{t('transformation.without_1')}</p>
                <p style={{ margin: 0 }}>{t('transformation.without_2')}</p>
                <p style={{ margin: 0 }}>{t('transformation.without_3')}</p>
                <p style={{ margin: 0 }}>{t('transformation.without_4')}</p>
              </div>
            </div>
            <div className="feature-card feature-card--accent">
              <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent-cta-ink)', marginBottom: '20px' }}>
                {t('transformation.with_label')}
              </p>
              <div style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'var(--text-secondary)', lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{ margin: 0 }}>{t('transformation.with_1')}</p>
                <p style={{ margin: 0 }}>{t('transformation.with_2')}</p>
                <p style={{ margin: 0 }}>{t('transformation.with_3')}</p>
                <p style={{ margin: 0 }}>{t('transformation.with_4')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* ═══════════════════════════════════════════
          8. FAQ
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
              <p style={{
                                fontSize: 'clamp(1rem, 1.6vw, 1.125rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.75,
                maxWidth: '280px',
                marginBottom: '36px',
              }}>
                {t('faq.subtext')}
              </p>
              <Button href="/scorecard" variant="primary" size="md">
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
          8b. STAKES — wat er gebeurt als u niets doet (StoryBrand: Failure)
      ═══════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(56px, 7vw, 80px)' }}>
        <div className="container-medium">
          <div className="reveal" style={{ maxWidth: '640px' }}>
            <p className="eyebrow" style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>
              {t('stakes.eyebrow')}
            </p>
            <h2 className="type-h2" style={{ marginBottom: '20px' }}>
              {t('stakes.heading')}
            </h2>
            <p
              style={{
                fontSize: 'clamp(1.0625rem, 1.6vw, 1.1875rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {t('stakes.body')}
            </p>
            <CostAnchorVisual />
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* ═══════════════════════════════════════════
          9. Final CTA (StoryBrand: Success + Cialdini urgency)
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
        <div className="container-medium reveal" style={{ textAlign: 'center', position: 'relative' }}>
          <p className="eyebrow" style={{ marginBottom: '28px', color: 'var(--text-muted)' }}>
            {t('final_cta.eyebrow')}
          </p>
          <h2
            className="type-h2"
            style={{ color: 'var(--text-primary)', marginBottom: '16px', maxWidth: '600px', marginInline: 'auto' }}
          >
            {t('final_cta.heading')}
          </h2>
          <p
            style={{
                            fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
              color: 'var(--text-muted)',
              marginBottom: '48px',
              maxWidth: '460px',
              marginInline: 'auto',
              lineHeight: 1.75,
            }}
          >
            {t('final_cta.subtext')}
          </p>
          <div className="cta-button-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            <Button href="/scorecard" variant="primary" size="lg">
              {t('final_cta.cta_primary')}
            </Button>
            <Button href="https://cal.com/wwdijkman/intake-call" variant="secondary" size="lg" external>
              {t('final_cta.cta_secondary')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
