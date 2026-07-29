import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import { getTranslations } from 'next-intl/server';
import Button from '@repo/ui/Button';
import CardVisual from '@repo/ui/CardVisual';
import {
  SketchDueDiligence,
  SketchReport,
  SketchPortfolio,
  SketchWarning,
  SketchScale,
  SketchSpeed,
  SketchChip,
  SketchKnowledge,
} from '@repo/ui/SketchIcons';

type SketchIconComponent = ComponentType<{
  size?: number;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
}>;

const INTAKE_URL = 'https://cal.com/wwdijkman/intake-call';
const AM_URL = 'https://www.agenticmindshift.nl';

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function FactumHome(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const t = await getTranslations('hero');
  const f = await getTranslations('fc');
  const werkwijzeUrl = `${AM_URL}/${locale}/werkwijze`;

  const momenten: {
    code: string;
    title: string;
    label: string;
    body: string;
    advisors: string;
    Icon: SketchIconComponent;
  }[] = [
    { code: 'M1', title: f('momenten.m1_title'), label: f('momenten.m1_label'), body: f('momenten.m1_body'), advisors: f('momenten.m1_advisors'), Icon: SketchDueDiligence },
    { code: 'M2', title: f('momenten.m2_title'), label: f('momenten.m2_label'), body: f('momenten.m2_body'), advisors: f('momenten.m2_advisors'), Icon: SketchReport },
    { code: 'M3', title: f('momenten.m3_title'), label: f('momenten.m3_label'), body: f('momenten.m3_body'), advisors: f('momenten.m3_advisors'), Icon: SketchPortfolio },
    { code: 'M4', title: f('momenten.m4_title'), label: f('momenten.m4_label'), body: f('momenten.m4_body'), advisors: f('momenten.m4_advisors'), Icon: SketchWarning },
  ];

  const problemItems = [
    { label: f('problem.item_1_label'), body: f('problem.item_1_body') },
    { label: f('problem.item_2_label'), body: f('problem.item_2_body') },
    { label: f('problem.item_3_label'), body: f('problem.item_3_body') },
  ];

  const twoRoutes = [
    { n: '01', title: f('two_routes.route_1_title'), label: f('two_routes.route_1_label'), body: f('two_routes.route_1_body'), detail: f('two_routes.route_1_detail'), link: null as null | { href: string; label: string } },
    { n: '02', title: f('two_routes.route_2_title'), label: f('two_routes.route_2_label'), body: f('two_routes.route_2_body'), detail: f('two_routes.route_2_detail'), link: { href: werkwijzeUrl, label: f('two_routes.route_2_link') } },
  ];

  const howItWorksSteps = [
    { step: '1', title: f('how_it_works.step_1_title'), body: f('how_it_works.step_1_body') },
    { step: '2', title: f('how_it_works.step_2_title'), body: f('how_it_works.step_2_body') },
    { step: '3', title: f('how_it_works.step_3_title'), body: f('how_it_works.step_3_body') },
  ];

  const modules = Array.from({ length: 12 }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return { n, title: f(`modules.m${n}_title`), body: f(`modules.m${n}_body`) };
  });

  const voorWieItems = [
    { n: '01', label: f('voor_wie.item_1_label'), body: f('voor_wie.item_1_body'), Icon: SketchPortfolio },
    { n: '02', label: f('voor_wie.item_2_label'), body: f('voor_wie.item_2_body'), Icon: SketchScale },
    { n: '03', label: f('voor_wie.item_3_label'), body: f('voor_wie.item_3_body'), Icon: SketchSpeed },
    { n: '04', label: f('voor_wie.item_4_label'), body: f('voor_wie.item_4_body'), Icon: SketchChip },
    { n: '05', label: f('voor_wie.item_5_label'), body: f('voor_wie.item_5_body'), Icon: SketchKnowledge },
    { n: '06', label: f('voor_wie.item_6_label'), body: f('voor_wie.item_6_body'), Icon: SketchWarning },
  ];

  const earlyAccessBenefits = [
    f('early_access.benefit_1'),
    f('early_access.benefit_2'),
    f('early_access.benefit_3'),
    f('early_access.benefit_4'),
  ];

  const hairline = { border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 } as const;

  return (
    <main>
      {/* HERO */}
      <section
        style={{
          minHeight: '72vh',
          display: 'flex',
          alignItems: 'center',
          paddingBlock: 'clamp(56px, 9vw, 120px)',
          background: 'var(--bg-primary)',
        }}
      >
        <div className="container-medium">
          <p className="eyebrow reveal" style={{ marginBottom: '20px' }}>{t('eyebrow')}</p>
          <h1 className="type-h1 reveal" style={{ maxWidth: '860px', marginBottom: '24px' }}>
            {t('heading')}
          </h1>
          <p
            className="reveal"
            style={{
              fontSize: 'clamp(1.0625rem, 1.8vw, 1.375rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: '640px',
              marginBottom: '36px',
            }}
          >
            {t('subtext')}
          </p>

          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
            <Button href={INTAKE_URL} variant="primary" size="lg" external>
              {t('cta_primary')}
            </Button>
            <Button href={werkwijzeUrl} variant="secondary" size="lg" external>
              {f('cta.secondary_1')}
            </Button>
          </div>

          {/* stats strip */}
          <div
            className="reveal"
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
              { label: '29', sub: f('hero.stat_1_sub') },
              { label: '4', sub: f('hero.stat_2_sub') },
            ].map((c, i) => (
              <div
                key={c.label + i}
                style={{
                  padding: '12px 26px',
                  borderLeft: i > 0 ? '1px solid var(--border-medium)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <span style={{ fontWeight: 800, fontSize: '1.375rem', color: 'var(--text-primary)', lineHeight: 1 }}>{c.label}</span>
                <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1.2 }}>{c.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANSWER-FIRST */}
      <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(40px, 5vw, 64px)' }}>
        <div className="container-medium reveal">
          <p style={{ fontSize: 'clamp(1.125rem, 2.2vw, 1.5rem)', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '820px', margin: 0, fontWeight: 400 }}>
            {f('answer_first')}
          </p>
        </div>
      </section>

      {/* PROBLEEM */}
      <section style={{ background: 'var(--accent-primary)', paddingBlock: 'clamp(48px, 6vw, 80px)' }}>
        <div className="container-medium">
          <div
            className="reveal divider-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1px',
              background: 'rgba(251,248,242,0.08)',
            }}
          >
            {problemItems.map((item, i) => (
              <div key={item.label} style={{ padding: 'clamp(28px, 4vw, 44px)', borderLeft: i > 0 ? '1px solid rgba(251,248,242,0.08)' : 'none' }}>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-cta)', marginBottom: '8px', letterSpacing: '-0.01em' }}>{item.label}</p>
                <p style={{ fontSize: '1.0625rem', color: 'rgba(251,248,242,0.68)', lineHeight: 1.65, margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BESCHRIJVING */}
      <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
        <div className="container-medium">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'start' }}>
            <div className="reveal">
              <p className="eyebrow" style={{ marginBottom: '28px' }}>{f('description.eyebrow')}</p>
              <blockquote style={{ margin: 0, paddingLeft: '24px', borderLeft: '3px solid var(--accent-cta)' }}>
                <p style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.4, color: 'var(--text-primary)', letterSpacing: '-0.01em', margin: 0 }}>
                  &ldquo;{f('description.quote')}&rdquo;
                </p>
              </blockquote>
            </div>
            <div className="reveal" style={{ transitionDelay: '80ms' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                <p style={{ margin: 0 }}>{f('description.para1')}</p>
                <p style={{ margin: 0 }}>{f('description.para2')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr style={hairline} />

      {/* VIER MOMENTEN */}
      <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
        <div className="container-medium">
          <div className="reveal" style={{ marginBottom: '56px' }}>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>{f('momenten.eyebrow')}</p>
            <h2 className="type-h2" style={{ maxWidth: '640px' }}>{f('momenten.heading')}</h2>
          </div>

          <div
            className="momenten-grid divider-grid"
            style={{ display: 'grid', gap: '1px', background: 'var(--border-subtle)', border: '1px solid var(--border-subtle)', marginBottom: 'clamp(48px, 7vw, 80px)' }}
          >
            {momenten.map((m) => (
              <div key={m.code} className="reveal" style={{ background: 'var(--bg-primary)', padding: 'clamp(28px, 3.5vw, 44px)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ color: 'var(--accent-cta)', opacity: 0.82, flexShrink: 0 }}>
                    <m.Icon size={44} strokeWidth={1.4} />
                  </div>
                  <p style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.9, color: 'var(--accent-cta)', margin: 0, opacity: 0.6 }}>{m.code}</p>
                </div>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>{m.label}</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px', letterSpacing: '-0.01em' }}>{m.title}</p>
                <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '20px' }}>{m.body}</p>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-cta)', letterSpacing: '0.05em', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', lineHeight: 1.4, margin: 0 }}>{m.advisors}</p>
              </div>
            ))}
          </div>

          {/* Platform vs Dienst */}
          <div className="reveal" style={{ marginBottom: '56px' }}>
            <p className="eyebrow" style={{ marginBottom: '24px' }}>{f('two_routes.eyebrow')}</p>
            <div
              className="divider-grid"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'var(--border-subtle)', border: '1px solid var(--border-subtle)' }}
            >
              {twoRoutes.map((item) => (
                <div key={item.n} style={{ background: 'var(--bg-primary)', padding: 'clamp(36px, 4vw, 52px)' }}>
                  <p style={{ fontSize: 'clamp(44px, 6vw, 64px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.9, color: 'var(--accent-cta)', marginBottom: '24px', opacity: 0.9 }}>{item.n}</p>
                  <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>{item.label}</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '-0.01em' }}>{item.title}</p>
                  <p style={{ fontSize: 'clamp(1rem, 1.6vw, 1.125rem)', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '24px' }}>{item.body}</p>
                  <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent-cta)', letterSpacing: '0.03em', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', marginBottom: item.link ? '14px' : 0 }}>{item.detail}</p>
                  {item.link && (
                    <a href={item.link.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--accent-cta)', textDecoration: 'underline', textUnderlineOffset: '3px', letterSpacing: '0.02em' }}>{item.link.label}</a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hoe de dienst werkt */}
          <div className="reveal">
            <p className="eyebrow" style={{ marginBottom: '24px' }}>{f('how_it_works.eyebrow')}</p>
            <div className="divider-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'var(--border-subtle)', border: '1px solid var(--border-subtle)' }}>
              {howItWorksSteps.map((s) => (
                <div key={s.step} style={{ background: 'var(--bg-primary)', padding: 'clamp(24px, 3vw, 36px)' }}>
                  <p style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.9, color: 'var(--border-medium)', marginBottom: '16px', opacity: 0.6 }}>{s.step}</p>
                  <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', letterSpacing: '-0.01em' }}>{s.title}</p>
                  <p style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{s.body}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '10px', lineHeight: 1.5 }}>{f('how_it_works.disclaimer')}</p>
          </div>
        </div>
      </section>

      <hr style={hairline} />

      {/* MODULES */}
      <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
        <div className="container-medium">
          <div className="reveal" style={{ marginBottom: '48px' }}>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>{f('modules.eyebrow')}</p>
            <h2 className="type-h2" style={{ marginBottom: '16px' }}>{f('modules.heading')}</h2>
            <p style={{ fontSize: 'clamp(1rem, 1.6vw, 1.125rem)', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '620px', margin: 0 }}>{f('modules.subtext')}</p>
          </div>
          <div
            className="divider-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: 'var(--border-subtle)', border: '1px solid var(--border-subtle)' }}
          >
            {modules.map((m) => (
              <div key={m.n} className="reveal" style={{ background: 'var(--bg-primary)', padding: 'clamp(24px, 3vw, 34px)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.06em', color: 'var(--accent-cta)' }}>{m.n}</span>
                  <span style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{m.title}</span>
                </div>
                <p style={{ fontSize: 'clamp(0.9375rem, 1.4vw, 1rem)', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr style={hairline} />

      {/* VOOR WIE */}
      <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(48px, 6vw, 80px)' }}>
        <div className="container-medium">
          <div className="reveal" style={{ marginBottom: '40px' }}>
            <p className="eyebrow" style={{ marginBottom: '12px' }}>{f('voor_wie.eyebrow')}</p>
            <h2 className="type-h2" style={{ margin: 0 }}>{f('voor_wie.heading')}</h2>
          </div>
          <div className="voor-wie-grid">
            {voorWieItems.map((item, i) => (
              <div key={item.label} className="reveal wb-card" style={{ transitionDelay: `${i * 60}ms` }}>
                <CardVisual index={40 + i} Icon={item.Icon} chip={item.n} />
                <div className="wb-card-body">
                  <h3 className="wb-card-title">{item.label}</h3>
                  <p className="wb-card-text">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EARLY ACCESS */}
      <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
        <div className="container-medium">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
            <div className="reveal">
              <p className="eyebrow" style={{ marginBottom: '20px' }}>{f('early_access.eyebrow')}</p>
              <h2 className="type-h2" style={{ marginBottom: '20px' }}>{f('early_access.heading')}</h2>
              <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '360px', marginBottom: '32px' }}>{f('early_access.body')}</p>
              <Button href={INTAKE_URL} variant="primary" size="lg" external>
                {t('cta_primary')}
              </Button>
            </div>
            <div className="reveal" style={{ transitionDelay: '80ms' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {earlyAccessBenefits.map((benefit) => (
                  <div key={benefit} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-cta)', flexShrink: 0, display: 'inline-block', marginTop: '8px' }} />
                    <span style={{ fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr style={hairline} />

      {/* FINAL CTA */}
      <section className="grain-overlay" style={{ background: 'var(--accent-primary)', paddingBlock: 'clamp(56px, 7vw, 88px)', position: 'relative', overflow: 'hidden' }}>
        <div className="container-medium reveal" style={{ textAlign: 'center', position: 'relative' }}>
          <p className="eyebrow" style={{ marginBottom: '20px', color: 'rgba(251,248,242,0.5)' }}>{f('cta.eyebrow')}</p>
          <h2 className="type-h2" style={{ color: 'var(--text-inverse)', marginBottom: '16px', maxWidth: '560px', marginInline: 'auto' }}>{f('cta.heading')}</h2>
          <p style={{ fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)', color: 'rgba(251,248,242,0.55)', marginBottom: '40px', maxWidth: '480px', marginInline: 'auto', lineHeight: 1.75 }}>{f('cta.subtext')}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center', alignItems: 'center' }}>
            <Button href={INTAKE_URL} variant="primary" size="lg" external>{f('cta.secondary_2')}</Button>
            <a
              href={werkwijzeUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-inverse)', textDecoration: 'underline', textUnderlineOffset: '4px', opacity: 0.85 }}
            >
              {f('cta.secondary_1')}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
