import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getAlternates } from '@/lib/hreflang';
import { Link } from '@/i18n/navigation';
import Button from '@/components/ui/Button';
import HeroAnimated from './HeroAnimated';
import OverCredentials from './OverCredentials';
import AnswerFirst from '@/components/AnswerFirst';
import JsonLd from '@/components/JsonLd';
import { organizationLd, personLd, getBreadcrumbLd } from '@/lib/jsonld';

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'over' });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: getAlternates('/over', locale),
  };
}

export default async function OverPage(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const t = await getTranslations('over');

  const timelineItems = [
    { year: t('timeline.item_1_year'), label: t('timeline.item_1_label'), sub: t('timeline.item_1_sub'), delay: 0, future: false },
    { year: t('timeline.item_2_year'), label: t('timeline.item_2_label'), sub: t('timeline.item_2_sub'), delay: 60, future: false },
    { year: t('timeline.item_3_year'), label: t('timeline.item_3_label'), sub: t('timeline.item_3_sub'), delay: 120, future: false },
    { year: t('timeline.item_4_year'), label: t('timeline.item_4_label'), sub: t('timeline.item_4_sub'), delay: 180, future: false },
    { year: t('timeline.item_5_year'), label: t('timeline.item_5_label'), sub: t('timeline.item_5_sub'), delay: 240, future: true },
  ];

  return (
    <>
      <JsonLd data={organizationLd} />
      <JsonLd data={personLd} />
      <JsonLd data={getBreadcrumbLd('/over', 'Wouter Dijkman', locale)} />

      <HeroAnimated />

      <AnswerFirst text={t('answer_first')} />

      {/* ═══ BIO ═══ */}
      <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
        <div className="container-medium">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'clamp(40px, 6vw, 80px)',
              alignItems: 'start',
            }}
          >
            {/* Pullquote */}
            <div className="reveal">
              <p className="eyebrow" style={{ marginBottom: '28px' }}>{t('bio.eyebrow')}</p>
              <blockquote
                style={{
                  margin: 0,
                  paddingLeft: '24px',
                  borderLeft: '3px solid var(--accent-cta)',
                }}
              >
                <p
                  style={{
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    lineHeight: 1.4,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                    margin: 0,
                  }}
                >
                  &ldquo;{t('bio.quote')}&rdquo;
                </p>
              </blockquote>
            </div>

            {/* Bio tekst */}
            <div className="reveal" style={{ transitionDelay: '80ms' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
                  lineHeight: 1.8,
                  color: 'var(--text-secondary)',
                }}
              >
                <p>{t('bio.para1')}</p>
                <p>
                  {t('bio.para2_prefix')}{' '}
                  <Link
                    href="/factum-capital"
                    style={{ color: 'var(--accent-cta)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                  >
                    Factum Capital
                  </Link>
                  {t('bio.para2_suffix')}
                </p>
                <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
                  {t('bio.para3')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* ═══ CREDENTIALS ═══ */}
      <OverCredentials />

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* ═══ TIMELINE ═══ */}
      <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
        <div className="container-medium">
          <div className="reveal" style={{ marginBottom: '48px' }}>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('timeline.eyebrow')}</p>
            <h2 className="type-h2" style={{ margin: 0 }}>{t('timeline.heading')}</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
            {/* Verticale verbindingslijn */}
            <div
              className="reveal"
              style={{
                position: 'absolute',
                left: '8px',
                top: '8px',
                bottom: '0',
                width: '1px',
                background: 'var(--border-medium)',
                transformOrigin: 'top',
              }}
            />

            {timelineItems.map((row) => (
              <div
                key={row.year}
                className="reveal"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'min-content minmax(80px, 140px) 1fr',
                  gap: 'clamp(10px, 2.5vw, 24px)',
                  alignItems: 'start',
                  paddingBlock: '24px',
                  borderBottom: '1px solid var(--border-subtle)',
                  transitionDelay: `${row.delay}ms`,
                }}
              >
                {/* Dot op de verticale lijn */}
                <div style={{ paddingTop: '4px', display: 'flex', justifyContent: 'center' }}>
                  <div
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: row.future ? 'var(--border-medium)' : 'var(--accent-cta)',
                      border: row.future ? '1.5px solid var(--border-medium)' : 'none',
                      flexShrink: 0,
                    }}
                  />
                </div>

                <span
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: row.future ? 'var(--text-muted)' : 'var(--accent-cta)',
                    letterSpacing: '-0.01em',
                    paddingTop: '2px',
                  }}
                >
                  {row.year}
                </span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <p style={{ fontSize: '1rem', fontWeight: 600, color: row.future ? 'var(--text-muted)' : 'var(--text-primary)', margin: 0 }}>
                      {row.label}
                    </p>
                    {row.future && (
                      <span style={{
                        fontSize: '8px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase' as const,
                        color: 'var(--accent-cta)',
                        border: '1px solid var(--accent-cta)',
                        padding: '2px 6px',
                        lineHeight: 1,
                        opacity: 0.7,
                      }}>
                        {t('timeline.future_badge')}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {row.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WERKWIJZE LINK ═══ */}
      <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(48px, 6vw, 72px)', textAlign: 'center' }}>
        <div className="container-medium reveal">
          <p className="eyebrow" style={{ marginBottom: '12px' }}>{t('werkwijze_link.eyebrow')}</p>
          <p
            style={{
              fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              marginBottom: '24px',
            }}
          >
            {t('werkwijze_link.body')}
          </p>
          <Button href="/werkwijze" variant="secondary" size="md">
            {t('werkwijze_link.cta')}
          </Button>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* ═══ CONTACT CTA ═══ */}
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
          <div className="reveal" style={{ position: 'relative' }}>
            <p className="eyebrow" style={{ marginBottom: '28px', color: 'rgba(247,242,235,0.5)' }}>
              {t('contact_cta.eyebrow')}
            </p>
            <h2
              className="type-h2"
              style={{ color: 'var(--text-inverse)', marginBottom: '16px', maxWidth: '560px', marginInline: 'auto' }}
            >
              {t('contact_cta.heading')}
            </h2>
            <p
              style={{
                fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
                color: 'rgba(247,242,235,0.5)',
                marginBottom: '44px',
                maxWidth: '400px',
                marginInline: 'auto',
                lineHeight: 1.75,
              }}
            >
              {t('contact_cta.subtext')}
            </p>
            <div
              style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}
            >
              <Button href="/scorecard" variant="primary" size="lg">
                {t('contact_cta.cta1')}
              </Button>
              <Button href="https://cal.com/wwdijkman/intake-call" variant="secondary" size="lg" external>
                {t('contact_cta.cta2')}
              </Button>
              <Button href="https://www.linkedin.com/in/wwdijkman" variant="secondary" size="lg" external>
                {t('contact_cta.cta3')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
