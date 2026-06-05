import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import { getTranslations } from 'next-intl/server';
import { getAlternates } from '@/lib/hreflang';
import { Link } from '@/i18n/navigation';
import Button from '@/components/ui/Button';
import AnimatedHeroShell from '@/components/motion/AnimatedHeroShell';
import {
  SketchDueDiligence,
  SketchReport,
  SketchPortfolio,
  SketchWarning,
} from '@/components/icons/SketchIcons';
import EarlyAccessForm from './EarlyAccessForm';
import CountdownTimer from './CountdownTimer';
import FactumModulesGrid from './FactumModulesGrid';
import JsonLd from '@/components/JsonLd';
import { getBreadcrumbLd } from '@/lib/jsonld';

type SketchIconComponent = ComponentType<{ size?: number; color?: string; opacity?: number; strokeWidth?: number }>;

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'factum_capital' });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: getAlternates('/factum-capital', locale),
  };
}

export default async function FactumCapitalPage(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const t = await getTranslations('factum_capital');

  const MOMENTEN: {
    code: string;
    title: string;
    label: string;
    body: string;
    advisors: string;
    Icon: SketchIconComponent;
  }[] = [
    {
      code: 'M1',
      title: t('momenten.m1_title'),
      label: t('momenten.m1_label'),
      body: t('momenten.m1_body'),
      advisors: t('momenten.m1_advisors'),
      Icon: SketchDueDiligence,
    },
    {
      code: 'M2',
      title: t('momenten.m2_title'),
      label: t('momenten.m2_label'),
      body: t('momenten.m2_body'),
      advisors: t('momenten.m2_advisors'),
      Icon: SketchReport,
    },
    {
      code: 'M3',
      title: t('momenten.m3_title'),
      label: t('momenten.m3_label'),
      body: t('momenten.m3_body'),
      advisors: t('momenten.m3_advisors'),
      Icon: SketchPortfolio,
    },
    {
      code: 'M4',
      title: t('momenten.m4_title'),
      label: t('momenten.m4_label'),
      body: t('momenten.m4_body'),
      advisors: t('momenten.m4_advisors'),
      Icon: SketchWarning,
    },
  ];

  const problemItems = [
    { label: t('problem.item_1_label'), body: t('problem.item_1_body') },
    { label: t('problem.item_2_label'), body: t('problem.item_2_body') },
    { label: t('problem.item_3_label'), body: t('problem.item_3_body') },
  ];

  const twoRoutes = [
    {
      n: '01',
      title: t('two_routes.route_1_title'),
      label: t('two_routes.route_1_label'),
      body: t('two_routes.route_1_body'),
      detail: t('two_routes.route_1_detail'),
      link: null,
    },
    {
      n: '02',
      title: t('two_routes.route_2_title'),
      label: t('two_routes.route_2_label'),
      body: t('two_routes.route_2_body'),
      detail: t('two_routes.route_2_detail'),
      link: { href: '/werkwijze', label: t('two_routes.route_2_link') },
    },
  ] as const;

  const howItWorksSteps = [
    { step: '1', title: t('how_it_works.step_1_title'), body: t('how_it_works.step_1_body') },
    { step: '2', title: t('how_it_works.step_2_title'), body: t('how_it_works.step_2_body') },
    { step: '3', title: t('how_it_works.step_3_title'), body: t('how_it_works.step_3_body') },
  ];

  const voorWieItems = [
    { label: t('voor_wie.item_1_label'), body: t('voor_wie.item_1_body') },
    { label: t('voor_wie.item_2_label'), body: t('voor_wie.item_2_body') },
    { label: t('voor_wie.item_3_label'), body: t('voor_wie.item_3_body') },
    { label: t('voor_wie.item_4_label'), body: t('voor_wie.item_4_body') },
    { label: t('voor_wie.item_5_label'), body: t('voor_wie.item_5_body') },
    { label: t('voor_wie.item_6_label'), body: t('voor_wie.item_6_body') },
  ];

  const earlyAccessBenefits = [
    t('early_access.benefit_1'),
    t('early_access.benefit_2'),
    t('early_access.benefit_3'),
    t('early_access.benefit_4'),
  ];

  return (
    <>
      <JsonLd data={getBreadcrumbLd('/factum-capital', t('hero.heading'), locale)} />

      <AnimatedHeroShell
        bgChar="FC"
        bgCharSize="clamp(240px, 32vw, 480px)"
        eyebrow={t('hero.eyebrow')}
        heading={t('hero.heading')}
        subtext={t('hero.subtext')}
        headingMaxWidth="900px"
      >
        {/* Launch stats strip */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0',
            border: '1px solid var(--border-medium)',
            overflow: 'hidden',
            width: 'fit-content',
          }}
        >
          {[
            { label: '29', sub: t('hero.stat_1_sub') },
            { label: '4', sub: t('hero.stat_2_sub') },
            { label: t('hero.stat_3_label'), sub: t('hero.stat_3_sub') },
          ].map((c, i) => (
            <div
              key={c.label}
              style={{
                padding: '10px 24px',
                borderLeft: i > 0 ? '1px solid var(--border-medium)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                }}
              >
                {c.label}
              </span>
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  lineHeight: 1,
                }}
              >
                {c.sub}
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '8px' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
            {t('hero.countdown_label')}
          </p>
          <CountdownTimer />
        </div>
      </AnimatedHeroShell>

      {/* PROBLEEM */}
      <section style={{ background: 'var(--accent-primary)', paddingBlock: 'clamp(48px, 6vw, 80px)' }}>
        <div className="container-medium">
          <div
            className="reveal divider-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1px',
              background: 'rgba(247,242,235,0.06)',
            }}
          >
            {problemItems.map((item, i) => (
              <div
                key={item.label}
                style={{
                  padding: 'clamp(28px, 4vw, 44px)',
                  borderLeft: i > 0 ? '1px solid rgba(247,242,235,0.06)' : 'none',
                }}
              >
                <p
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--accent-cta)',
                    marginBottom: '8px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.label}
                </p>
                <p style={{ fontSize: '1.0625rem', color: 'rgba(247,242,235,0.65)', lineHeight: 1.65, margin: 0 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BESCHRIJVING */}
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
            <div className="reveal">
              <p className="eyebrow" style={{ marginBottom: '28px' }}>{t('description.eyebrow')}</p>
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
                  &ldquo;{t('description.quote')}&rdquo;
                </p>
              </blockquote>
            </div>

            <div className="reveal" style={{ transitionDelay: '80ms' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                <p>{t('description.para1')}</p>
                <p>{t('description.para2')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* VIER MOMENTEN */}
      <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
        <div className="container-medium">
          <div className="reveal" style={{ marginBottom: '56px' }}>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('momenten.eyebrow')}</p>
            <h2 className="type-h2" style={{ maxWidth: '640px' }}>
              {t('momenten.heading')}
            </h2>
          </div>

          <div
            className="momenten-grid divider-grid"
            style={{
              display: 'grid',
              gap: '1px',
              background: 'var(--border-subtle)',
              border: '1px solid var(--border-subtle)',
              marginBottom: 'clamp(48px, 7vw, 80px)',
            }}
          >
            {MOMENTEN.map((m) => (
              <div
                key={m.code}
                className="reveal"
                style={{ background: 'var(--bg-primary)', padding: 'clamp(28px, 3.5vw, 44px)' }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '16px',
                    marginBottom: '20px',
                  }}
                >
                  <div style={{ color: 'var(--accent-cta)', opacity: 0.82, flexShrink: 0 }}>
                    <m.Icon size={44} strokeWidth={1.4} />
                  </div>
                  <p style={{
                    fontSize: 'clamp(28px, 4vw, 40px)',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    lineHeight: 0.9,
                    color: 'var(--accent-cta)',
                    margin: 0,
                    opacity: 0.6,
                  }}>
                    {m.code}
                  </p>
                </div>
                <p style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '8px',
                }}>
                  {m.label}
                </p>
                <p style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '14px',
                  letterSpacing: '-0.01em',
                }}>
                  {m.title}
                </p>
                <p style={{
                  fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.75,
                  marginBottom: '20px',
                }}>
                  {m.body}
                </p>
                <p style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--accent-cta)',
                  letterSpacing: '0.05em',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '14px',
                  lineHeight: 1.4,
                }}>
                  {m.advisors}
                </p>
              </div>
            ))}
          </div>

          {/* Platform vs Dienst */}
          <div className="reveal" style={{ marginBottom: '56px' }}>
            <p className="eyebrow" style={{ marginBottom: '24px' }}>{t('two_routes.eyebrow')}</p>
            <div
              className="divider-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1px',
                background: 'var(--border-subtle)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {twoRoutes.map((item) => (
                <div
                  key={item.n}
                  style={{ background: 'var(--bg-primary)', padding: 'clamp(36px, 4vw, 52px)' }}
                >
                  <p style={{
                    fontSize: 'clamp(44px, 6vw, 64px)',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    lineHeight: 0.9,
                    color: 'var(--accent-cta)',
                    marginBottom: '24px',
                    opacity: 0.9,
                  }}>
                    {item.n}
                  </p>
                  <p style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '10px',
                  }}>
                    {item.label}
                  </p>
                  <p style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '16px',
                    letterSpacing: '-0.01em',
                  }}>
                    {item.title}
                  </p>
                  <p style={{
                    fontSize: 'clamp(1rem, 1.6vw, 1.125rem)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.75,
                    marginBottom: '24px',
                  }}>
                    {item.body}
                  </p>
                  <p style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: 'var(--accent-cta)',
                    letterSpacing: '0.03em',
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '16px',
                    marginBottom: item.link ? '14px' : 0,
                  }}>
                    {item.detail}
                  </p>
                  {item.link && (
                    <Link
                      href={item.link.href}
                      style={{
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        color: 'var(--accent-cta)',
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {item.link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hoe de dienst werkt */}
          <div className="reveal">
            <p className="eyebrow" style={{ marginBottom: '24px' }}>{t('how_it_works.eyebrow')}</p>
            <div className="divider-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1px',
              background: 'var(--border-subtle)',
              border: '1px solid var(--border-subtle)',
            }}>
              {howItWorksSteps.map((s) => (
                <div
                  key={s.step}
                  style={{
                    background: 'var(--bg-primary)',
                    padding: 'clamp(24px, 3vw, 36px)',
                  }}
                >
                  <p style={{
                    fontSize: 'clamp(36px, 5vw, 52px)',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    lineHeight: 0.9,
                    color: 'var(--border-medium)',
                    marginBottom: '16px',
                    opacity: 0.6,
                  }}>
                    {s.step}
                  </p>
                  <p style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '10px',
                    letterSpacing: '-0.01em',
                  }}>
                    {s.title}
                  </p>
                  <p style={{
                    fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
            <p style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              marginTop: '10px',
              lineHeight: 1.5,
            }}>
              {t('how_it_works.disclaimer')}
            </p>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      <FactumModulesGrid />

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* VOOR WIE */}
      <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(48px, 6vw, 80px)' }}>
        <div className="container-medium">
          <div className="reveal" style={{ marginBottom: '40px' }}>
            <p className="eyebrow" style={{ marginBottom: '12px' }}>{t('voor_wie.eyebrow')}</p>
            <h2 className="type-h2" style={{ margin: 0 }}>{t('voor_wie.heading')}</h2>
          </div>
          <div
            className="divider-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1px',
              background: 'var(--border-subtle)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {voorWieItems.map((item, i) => (
              <div
                key={item.label}
                className="reveal"
                style={{
                  background: 'var(--bg-secondary)',
                  padding: '28px 24px',
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <p
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '10px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.label}
                </p>
                <p style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EARLY ACCESS FORM */}
      <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
        <div className="container-medium">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(40px, 6vw, 80px)',
              alignItems: 'start',
            }}
          >
            <div className="reveal">
              <p className="eyebrow" style={{ marginBottom: '20px' }}>{t('early_access.eyebrow')}</p>
              <h2 className="type-h2" style={{ marginBottom: '20px' }}>
                {t('early_access.heading')}
              </h2>
              <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '320px', marginBottom: '32px' }}>
                {t('early_access.body')}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {earlyAccessBenefits.map((benefit) => (
                  <div key={benefit} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'var(--accent-cta)',
                        flexShrink: 0,
                        display: 'inline-block',
                        marginTop: '7px',
                      }}
                    />
                    <span style={{ fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal" style={{ transitionDelay: '80ms' }}>
              <EarlyAccessForm />
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* SECONDARY CTA */}
      <section
        className="grain-overlay"
        style={{
          background: 'var(--accent-primary)',
          paddingBlock: 'clamp(56px, 7vw, 88px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container-medium reveal" style={{ textAlign: 'center', position: 'relative' }}>
          <p className="eyebrow" style={{ marginBottom: '20px', color: 'rgba(247,242,235,0.5)' }}>
            {t('cta.eyebrow')}
          </p>
          <h2
            className="type-h2"
            style={{ color: 'var(--text-inverse)', marginBottom: '16px', maxWidth: '520px', marginInline: 'auto' }}
          >
            {t('cta.heading')}
          </h2>
          <p
            style={{
              fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
              color: 'rgba(247,242,235,0.5)',
              marginBottom: '40px',
              maxWidth: '460px',
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
            <Button href="/werkwijze" variant="secondary" size="lg">
              {t('cta.secondary_1')}
            </Button>
            <Button href="https://cal.com/wwdijkman/intake-call" variant="secondary" size="lg" external>
              {t('cta.secondary_2')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
