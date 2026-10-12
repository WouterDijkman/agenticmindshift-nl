import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/pageMetadata';
import Button from '@/components/ui/Button';
import HeroAnimated from './HeroAnimated';
import OverCredentials from './OverCredentials';
import AnswerFirst from '@/components/AnswerFirst';
import JsonLd from '@/components/JsonLd';
import { getOrganizationLd, getPersonLd, getBreadcrumbLd } from '@/lib/jsonld';
import { factumUrl } from '@/lib/factum';

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'over', '/over');
}

export default async function OverPage(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  // Static rendering: fills next-intl's locale cache so nothing below this
  // reaches for `headers()`. See the long note in app/[locale]/layout.tsx.
  setRequestLocale(locale);
  const t = await getTranslations('over');

  /* Six rows, matching the career on factumcapital.eu/team: Alter Domus,
     Rabobank, ING, then the two businesses. The old version had
     restructuring at 2017–2020 and acquisition finance at 2020–2023, so the
     two sites disagreed about the same person (audit 12-10-2026, W1).
     Factum is pre-launch and says so in its own label; nothing here is
     "future", so the badge stays unused. */
  const timelineItems = [1, 2, 3, 4, 5, 6].map((n, i) => ({
    year: t(`timeline.item_${n}_year`),
    label: t(`timeline.item_${n}_label`),
    sub: t(`timeline.item_${n}_sub`),
    delay: i * 60,
    future: false,
  }));

  return (
    <>
      <JsonLd data={getOrganizationLd(locale)} />
      <JsonLd data={getPersonLd(locale)} />
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
                  {/* Factum has its own site; `Link` would prefix a locale of
                      this one. `factumUrl` carries it across instead. */}
                  <a
                    href={factumUrl(locale, 'about-bio')}
                    target="_blank"
                    rel="noopener"
                    className="plausible-event-name=Factum+Outbound plausible-event-location=about-bio"
                    style={{ color: 'var(--accent-cta-ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                  >
                    Factum Capital
                  </a>
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
                    color: row.future ? 'var(--text-muted)' : 'var(--accent-cta-ink)',
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
                        color: 'var(--accent-cta-ink)',
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
        data-surface="dark"
        style={{
          background: 'var(--surface-dark)',
          paddingBlock: 'clamp(64px, 10vw, 120px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Was centred; see the note on the same band in /werkwijze. */}
        <div className="container-medium" style={{ position: 'relative' }}>
          <div className="reveal" style={{ position: 'relative', maxWidth: '760px' }}>
            <p className="eyebrow" style={{ marginBottom: '28px', color: 'var(--text-muted)' }}>
              {t('contact_cta.eyebrow')}
            </p>
            <h2
              className="type-h2"
              style={{ color: 'var(--text-primary)', marginBottom: '16px', maxWidth: '18ch' }}
            >
              {t('contact_cta.heading')}
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
              {t('contact_cta.subtext')}
            </p>
            <div
              style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '20px' }}
            >
              <Button href="https://cal.com/wwdijkman/intake-call" variant="primary" size="lg" external className="plausible-event-name=Intake+CTA plausible-event-location=about-final">
                {t('contact_cta.cta1')}
              </Button>
              <Button href="/werkwijze" variant="secondary" size="lg">
                {t('contact_cta.cta2')}
              </Button>
            </div>
            <a
              href="https://www.linkedin.com/in/wwdijkman"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.9375rem',
                color: 'var(--text-muted)',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              {t('contact_cta.cta3')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
