import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/pageMetadata';
import { MODULE_COUNT, VERTICAL_COUNT } from '@/lib/site';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { Section, SectionHeader } from '@/components/Section';
import Disclosures from '@/components/Disclosures';
import CtaBand from '@/components/CtaBand';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'partnerships', '/partnerships');
}

export default async function PartnershipsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('partnerships');
  const numbers = { modules: MODULE_COUNT, verticals: VERTICAL_COUNT };

  return (
    <>
      <PageHeader
        eyebrow={t('header.eyebrow')}
        title={t('header.title')}
        lead={t('header.lead')}
      />

      {/* Who this is for — described by shape of firm, never by name. */}
      <Section width="medium">
        <SectionHeader
          eyebrow={t('who.eyebrow')}
          title={t('who.title')}
          lead={t('who.lead')}
        />
        <div
          className="rule-grid"
          style={{
            marginTop: 'clamp(28px, 4vw, 44px)',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))'
          }}
        >
          {(t.raw('who.profiles') as { title: string; body: string }[]).map((profile) => (
            <div key={profile.title}>
              <h3 className="type-h4" style={{ marginBottom: 10 }}>
                {profile.title}
              </h3>
              <p className="type-small">{profile.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* What the partner keeps, what we supply. */}
      <Section width="medium">
        <div className="split-grid">
          <div>
            <SectionHeader
              eyebrow={t('split.eyebrow')}
              title={t('split.title')}
              lead={t('split.lead', numbers)}
            />
          </div>
          <Reveal delay={60}>
            <div className="panel" style={{ padding: 'clamp(22px, 3vw, 32px)' }}>
              {(t.raw('split.columns') as { label: string; items: string[] }[]).map((column) => (
                <div key={column.label} className="hairline-top" style={{ paddingBlock: 20 }}>
                  <span className="eyebrow" style={{ marginBottom: 12 }}>
                    {column.label}
                  </span>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {column.items.map((item) => (
                      <li
                        key={item}
                        className="type-small"
                        style={{ display: 'flex', gap: 12, paddingBlock: 6 }}
                      >
                        <span className="mono" style={{ color: 'var(--wine-text)' }}>
                          &mdash;
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* How an engagement starts. */}
      <Section width="medium">
        <SectionHeader
          eyebrow={t('start.eyebrow')}
          title={t('start.title')}
          lead={t('start.lead')}
        />
        <Reveal delay={60} style={{ marginTop: 32 }}>
          <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {(t.raw('start.steps') as { title: string; body: string }[]).map((step, i) => (
              <li key={step.title} className="hairline-top" style={{ paddingBlock: 22 }}>
                <span className="mono" style={{ color: 'var(--wine-text)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="type-h4" style={{ marginTop: 10, marginBottom: 8 }}>
                  {step.title}
                </h3>
                <p className="type-body measure">{step.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      {/* Boundaries — the honest version of an exclusivity conversation. */}
      <Section width="medium">
        <SectionHeader
          eyebrow={t('boundaries.eyebrow')}
          title={t('boundaries.title')}
          lead={t('boundaries.lead')}
        />
        <Reveal delay={60} style={{ marginTop: 28 }}>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {(t.raw('boundaries.items') as string[]).map((item) => (
              <li
                key={item}
                className="type-body hairline-top"
                style={{ paddingBlock: 16, display: 'flex', gap: 14 }}
              >
                <span className="mono" style={{ color: 'var(--wine-text)', paddingTop: 4 }}>
                  &mdash;
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section width="medium">
        <SectionHeader eyebrow={t('faq.eyebrow')} title={t('faq.title')} />
        <Reveal delay={60} style={{ marginTop: 28 }}>
          <Disclosures items={t.raw('faq.items') as { q: string; a: string }[]} />
        </Reveal>
      </Section>

      <CtaBand
        title={t('cta.title')}
        body={t('cta.body')}
        cta={t('cta.button')}
        note={t('cta.note')}
      />
    </>
  );
}
