import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/pageMetadata';
import { DISCIPLINE_COUNT } from '@/lib/site';
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
  return pageMetadata(locale, 'sprint', '/buyer-proof-sprint');
}

export default async function SprintPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('sprint');
  const s = await getTranslations('shared');
  const numbers = { disciplines: DISCIPLINE_COUNT };

  return (
    <>
      <PageHeader
        eyebrow={t('header.eyebrow')}
        title={t('header.title')}
        lead={t('header.lead', numbers)}
      />

      {/* The reframe: this is what a well-run sell-side process looks like. */}
      <Section width="medium">
        <Reveal>
          <blockquote className="source-quote" style={{ fontSize: 'clamp(1.125rem, 1rem + 0.8vw, 1.5rem)' }}>
            {t('reframe.quote')}
          </blockquote>
          <p className="type-body measure" style={{ marginTop: 28 }}>
            {t('reframe.body')}
          </p>
        </Reveal>
      </Section>

      {/* The eleven disciplines. */}
      <Section width="medium">
        <SectionHeader
          eyebrow={t('disciplines.eyebrow')}
          title={t('disciplines.title', numbers)}
          lead={t('disciplines.lead')}
        />
        <Reveal delay={60} style={{ marginTop: 'clamp(28px, 4vw, 44px)' }}>
          <ol
            className="rule-grid"
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))'
            }}
          >
            {(s.raw('disciplines') as string[]).map((d, i) => (
              <li key={d}>
                <span className="mono" style={{ color: 'var(--text-quaternary)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="type-h4" style={{ marginTop: 8 }}>
                  {d}
                </h3>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={90}>
          <p className="type-small" style={{ marginTop: 22, color: 'var(--text-quaternary)', maxWidth: '70ch' }}>
            {t('disciplines.note')}
          </p>
        </Reveal>
      </Section>

      {/* Three synthesis layers. */}
      <Section width="medium">
        <SectionHeader
          eyebrow={t('layers.eyebrow')}
          title={t('layers.title')}
          lead={t('layers.lead', numbers)}
        />
        <Reveal delay={60} style={{ marginTop: 32 }}>
          <dl style={{ margin: 0 }}>
            {(t.raw('layers.items') as { title: string; body: string }[]).map((item) => (
              <div key={item.title} className="hairline-top" style={{ paddingBlock: 22 }}>
                <dt className="type-h3" style={{ fontSize: '1.25rem', marginBottom: 10 }}>
                  {item.title}
                </dt>
                <dd className="type-body measure" style={{ margin: 0 }}>
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      {/* Delivery format — expectation-setting, not caveat. */}
      <Section width="medium">
        <div className="split-grid">
          <div>
            <SectionHeader
              eyebrow={t('delivery.eyebrow')}
              title={t('delivery.title')}
              lead={t('delivery.lead')}
            />
          </div>
          <Reveal delay={60}>
            <div className="panel" style={{ padding: 'clamp(22px, 3vw, 32px)' }}>
              {(t.raw('delivery.formats') as { label: string; items: string; body: string }[]).map(
                (format) => (
                  <div key={format.label} className="hairline-top" style={{ paddingBlock: 18 }}>
                    <span className="eyebrow" style={{ marginBottom: 8 }}>
                      {format.label}
                    </span>
                    <p className="type-h4" style={{ marginBottom: 6 }}>
                      {format.items}
                    </p>
                    <p className="type-small">{format.body}</p>
                  </div>
                )
              )}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* The guarantee. */}
      <Section width="medium">
        <Reveal>
          <div className="panel panel-raised" style={{ padding: 'clamp(26px, 4vw, 48px)' }}>
            <span className="eyebrow eyebrow-accent" style={{ marginBottom: 18 }}>
              {t('guarantee.eyebrow')}
            </span>
            <p
              className="type-h3"
              style={{ fontFamily: 'var(--font-display)', maxWidth: '30ch' }}
            >
              {t('guarantee.title')}
            </p>
            <p className="type-body measure" style={{ marginTop: 20 }}>
              {t('guarantee.body')}
            </p>
            <p className="type-small" style={{ marginTop: 18, color: 'var(--text-quaternary)' }}>
              {t('guarantee.note')}
            </p>
          </div>
        </Reveal>
      </Section>

      {/* What we need from you. */}
      <Section width="medium">
        <SectionHeader
          eyebrow={t('inputs.eyebrow')}
          title={t('inputs.title')}
          lead={t('inputs.lead')}
        />
        <div
          className="rule-grid"
          style={{
            marginTop: 32,
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))'
          }}
        >
          {(t.raw('inputs.items') as { title: string; body: string }[]).map((item) => (
            <div key={item.title}>
              <h3 className="type-h4" style={{ marginBottom: 10 }}>
                {item.title}
              </h3>
              <p className="type-small">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ. */}
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
