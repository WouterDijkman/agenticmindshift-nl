import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { pageMetadata } from '@/lib/pageMetadata';
import { DISCIPLINE_COUNT, MODULE_COUNT, VERTICAL_COUNT } from '@/lib/site';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import { Section, SectionHeader } from '@/components/Section';
import FindingSchema from '@/components/FindingSchema';
import Pipeline from '@/components/Pipeline';
import VerticalIndex from '@/components/VerticalIndex';
import Figures from '@/components/Figures';
import CtaBand from '@/components/CtaBand';
import { ArrowRight } from '@/components/Icons';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'home', '');
}

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const s = await getTranslations('shared');

  const numbers = {
    modules: MODULE_COUNT,
    verticals: VERTICAL_COUNT,
    disciplines: DISCIPLINE_COUNT
  };

  return (
    <>
      <Hero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        lead={t('hero.lead', numbers)}
        cta={t('hero.cta')}
        secondary={t('hero.secondary')}
        secondaryHref="/platform"
        footnote={t('hero.footnote')}
      />

      {/* The taste of the product comes before the second ask. */}
      <Section id="anatomy">
        <div
          style={{
            display: 'grid',
            gap: 'clamp(32px, 5vw, 72px)',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            alignItems: 'start'
          }}
        >
          <SectionHeader
            eyebrow={t('schema.eyebrow')}
            title={t('schema.title')}
            lead={t('schema.lead')}
          >
            <p className="type-body" style={{ marginTop: 20 }}>
              {t('schema.body')}
            </p>
            <div style={{ marginTop: 28 }}>
              <Link href="/platform" className="link-quiet">
                {t('schema.link')}
                <ArrowRight />
              </Link>
            </div>
          </SectionHeader>

          <Reveal delay={80}>
            <FindingSchema
              label={s('schema.label')}
              footnote={s('schema.footnote')}
              rows={[
                { key: s('schema.rows.module'), value: s('schema.values.module') },
                { key: s('schema.rows.finding'), value: s('schema.values.finding'), redacted: true },
                {
                  key: s('schema.rows.evidence'),
                  value: s('schema.values.evidence'),
                  redacted: true
                },
                {
                  key: s('schema.rows.document'),
                  value: s('schema.values.document'),
                  redacted: true
                },
                { key: s('schema.rows.review'), value: s('schema.values.review') }
              ]}
            />
          </Reveal>
        </div>
      </Section>

      {/* The problem, in the owner's own terms. */}
      <Section width="medium">
        <Reveal>
          <span className="eyebrow eyebrow-accent" style={{ marginBottom: 22 }}>
            {t('problem.eyebrow')}
          </span>
          <h2 className="type-h2" style={{ maxWidth: '20ch' }}>
            {t('problem.title')}
          </h2>
          <p className="type-lead measure" style={{ marginTop: 28 }}>
            {t('problem.lead')}
          </p>
        </Reveal>

        <div
          className="rule-grid"
          style={{
            marginTop: 'clamp(36px, 5vw, 64px)',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))'
          }}
        >
          {(t.raw('problem.points') as { title: string; body: string }[]).map((point) => (
            <div key={point.title}>
              <h3 className="type-h4" style={{ marginBottom: 10 }}>
                {point.title}
              </h3>
              <p className="type-small">{point.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How it works. */}
      <Section>
        <div className="split-grid">
          <div className="split-sticky">
            <SectionHeader
              eyebrow={t('pipeline.eyebrow')}
              title={t('pipeline.title')}
              lead={t('pipeline.lead')}
            />
            <Reveal delay={60}>
              <div className="panel panel-inset" style={{ marginTop: 32, padding: 22 }}>
                <span className="eyebrow" style={{ marginBottom: 14 }}>
                  {t('pipeline.refusalTitle')}
                </span>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 9 }}>
                  {(t.raw('pipeline.refusals') as string[]).map((item) => (
                    <li
                      key={item}
                      className="type-small"
                      style={{ display: 'flex', gap: 10, color: 'var(--text-secondary)' }}
                    >
                      <span aria-hidden="true" style={{ color: 'var(--wine-text)' }}>
                        &times;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="type-small" style={{ marginTop: 16, color: 'var(--text-quaternary)' }}>
                  {t('pipeline.refusalNote')}
                </p>
              </div>
            </Reveal>
          </div>

          <Pipeline stages={t.raw('pipeline.stages') as { title: string; body: string }[]} />
        </div>
      </Section>

      {/* Coverage. */}
      <Section>
        <SectionHeader
          eyebrow={t('coverage.eyebrow')}
          title={t('coverage.title', numbers)}
          lead={t('coverage.lead', numbers)}
          align="wide"
        />

        <Reveal delay={60} style={{ marginTop: 'clamp(32px, 4vw, 56px)' }}>
          <VerticalIndex labels={s.raw('verticals') as string[]} moduleSuffix={s('moduleSuffix')} />
        </Reveal>

        <Reveal delay={100}>
          <p
            className="type-small"
            style={{ marginTop: 24, color: 'var(--text-quaternary)', maxWidth: '70ch' }}
          >
            {t('coverage.note', numbers)}
          </p>
        </Reveal>

        <Reveal delay={120} style={{ marginTop: 'clamp(40px, 5vw, 64px)' }}>
          <Figures
            items={[
              {
                value: String(MODULE_COUNT),
                label: t('coverage.figures.modules.label'),
                note: t('coverage.figures.modules.note')
              },
              {
                value: String(DISCIPLINE_COUNT),
                label: t('coverage.figures.disciplines.label'),
                note: t('coverage.figures.disciplines.note')
              },
              {
                value: t('coverage.figures.speed.value'),
                label: t('coverage.figures.speed.label'),
                note: t('coverage.figures.speed.note')
              }
            ]}
          />
        </Reveal>
      </Section>

      {/* The Diligence Sprint. */}
      <Section width="medium">
        <SectionHeader
          eyebrow={t('sprint.eyebrow')}
          title={t('sprint.title')}
          lead={t('sprint.lead', numbers)}
        />

        <Reveal delay={60} style={{ marginTop: 36 }}>
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8
            }}
          >
            {(s.raw('disciplines') as string[]).map((d) => (
              <li
                key={d}
                className="mono"
                style={{
                  border: '1px solid var(--hairline)',
                  borderRadius: 2,
                  padding: '7px 12px',
                  color: 'var(--text-secondary)'
                }}
              >
                {d}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={90} style={{ marginTop: 36 }}>
          <div className="panel" style={{ padding: 'clamp(22px, 3vw, 34px)' }}>
            <span className="eyebrow eyebrow-accent" style={{ marginBottom: 14 }}>
              {t('sprint.guaranteeLabel')}
            </span>
            <p className="type-lead" style={{ color: 'var(--text-body)' }}>
              {t('sprint.guarantee')}
            </p>
            <p className="type-small" style={{ marginTop: 14, color: 'var(--text-quaternary)' }}>
              {t('sprint.guaranteeNote')}
            </p>
          </div>
        </Reveal>

        <Reveal delay={110} style={{ marginTop: 32 }}>
          <Link href="/diligence-sprint" className="link-quiet">
            {t('sprint.link')}
            <ArrowRight />
          </Link>
        </Reveal>
      </Section>

      {/* Where in the cycle this lands. */}
      <Section width="medium">
        <SectionHeader
          eyebrow={t('cycle.eyebrow')}
          title={t('cycle.title')}
          lead={t('cycle.lead')}
        />

        <ol style={{ listStyle: 'none', margin: 'clamp(32px, 4vw, 48px) 0 0', padding: 0 }}>
          {(t.raw('cycle.stages') as { title: string; body: string }[]).map((stage, i) => (
            <Reveal key={stage.title} as="li" delay={i * 60} className="hairline-top">
              <div className="stage-row">
                <h3 className="type-h3" style={{ fontSize: '1.375rem' }}>
                  <span className="mono" style={{ color: 'var(--wine-text)', marginRight: 12 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {stage.title}
                </h3>
                <p className="type-body">{stage.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={80}>
          <p className="type-small" style={{ marginTop: 24, color: 'var(--text-quaternary)' }}>
            {t('cycle.note')}
          </p>
        </Reveal>
      </Section>

      {/* Trust. */}
      <Section width="medium">
        <div
          style={{
            display: 'grid',
            gap: 'clamp(28px, 4vw, 64px)',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            alignItems: 'start'
          }}
        >
          <SectionHeader
            eyebrow={t('trust.eyebrow')}
            title={t('trust.title')}
            lead={t('trust.lead')}
          >
            <div style={{ marginTop: 28 }}>
              <Link href="/governance" className="link-quiet">
                {t('trust.link')}
                <ArrowRight />
              </Link>
            </div>
          </SectionHeader>

          <Reveal delay={60}>
            <dl style={{ margin: 0 }}>
              {(s.raw('governancePoints') as { title: string; body: string }[]).map((point) => (
                <div key={point.title} className="hairline-top" style={{ paddingBlock: 18 }}>
                  <dt className="type-h4">{point.title}</dt>
                  <dd className="type-small" style={{ margin: '8px 0 0' }}>
                    {point.body}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
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
