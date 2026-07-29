import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/pageMetadata';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { Section, SectionHeader } from '@/components/Section';
import CtaBand from '@/components/CtaBand';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'governance', '/governance');
}

export default async function GovernancePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('governance');
  const s = await getTranslations('shared');

  return (
    <>
      <PageHeader
        eyebrow={t('header.eyebrow')}
        title={t('header.title')}
        lead={t('header.lead')}
      />

      {/* Data handling. */}
      <Section width="medium">
        <SectionHeader
          eyebrow={t('data.eyebrow')}
          title={t('data.title')}
          lead={t('data.lead')}
        />
        <Reveal delay={60} style={{ marginTop: 32 }}>
          <dl style={{ margin: 0 }}>
            {(s.raw('governancePoints') as { title: string; body: string }[]).map((point) => (
              <div key={point.title} className="hairline-top" style={{ paddingBlock: 22 }}>
                <dt className="type-h3" style={{ fontSize: '1.25rem', marginBottom: 10 }}>
                  {point.title}
                </dt>
                <dd className="type-body measure" style={{ margin: 0 }}>
                  {point.body}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      {/* The human gate. */}
      <Section width="medium">
        <div className="split-grid">
          <div>
            <SectionHeader
              eyebrow={t('gate.eyebrow')}
              title={t('gate.title')}
              lead={t('gate.lead')}
            />
          </div>
          <Reveal delay={60}>
            <div className="panel" style={{ padding: 'clamp(22px, 3vw, 32px)' }}>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {(t.raw('gate.items') as string[]).map((item, i) => (
                  <li
                    key={item}
                    className="type-body"
                    style={{
                      display: 'flex',
                      gap: 14,
                      paddingBlock: 14,
                      borderTop: i === 0 ? 'none' : '1px solid var(--hairline-faint)'
                    }}
                  >
                    <span className="mono" style={{ color: 'var(--wine-text)', paddingTop: 4 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* AI transparency. */}
      <Section width="medium">
        <SectionHeader
          eyebrow={t('transparency.eyebrow')}
          title={t('transparency.title')}
          lead={t('transparency.lead')}
        />
        <Reveal delay={60} style={{ marginTop: 24 }}>
          <ol className="measure" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {(t.raw('transparency.steps') as string[]).map((step, i) => (
              <li
                key={step}
                className="type-body"
                style={{
                  display: 'flex',
                  gap: 14,
                  paddingBlock: 14,
                  borderTop: i === 0 ? 'none' : '1px solid var(--hairline-faint)'
                }}
              >
                <span className="mono" style={{ color: 'var(--wine-text)', paddingTop: 4 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      {/* What we do not claim — this replaces the certifications we don't have. */}
      <Section width="medium">
        <SectionHeader
          eyebrow={t('limits.eyebrow')}
          title={t('limits.title')}
          lead={t('limits.lead')}
        />
        <Reveal delay={60} style={{ marginTop: 28 }}>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {(t.raw('limits.items') as string[]).map((item) => (
              <li
                key={item}
                className="type-body hairline-top"
                style={{ paddingBlock: 16, display: 'flex', gap: 14 }}
              >
                <span aria-hidden="true" style={{ color: 'var(--wine-text)', paddingTop: 2 }}>
                  &times;
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="type-small" style={{ marginTop: 22, color: 'var(--text-quaternary)' }}>
            {t('limits.note')}
          </p>
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
