import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/pageMetadata';
import { DISCIPLINE_COUNT, MODULE_COUNT, VERTICAL_COUNT } from '@/lib/site';
import {
  SketchClipboard,
  SketchDueDiligence,
  SketchEyeHidden,
  SketchGear,
  SketchHourglass,
  SketchScale,
  SketchWarning
} from '@repo/ui/SketchIcons';
import PageHeader from '@/components/PageHeader';
import MediaCards from '@/components/MediaCards';
import Reveal from '@/components/Reveal';
import { Section, SectionHeader } from '@/components/Section';
import Pipeline from '@/components/Pipeline';
import FindingSchema from '@/components/FindingSchema';
import VerticalIndex from '@/components/VerticalIndex';
import Disclosures from '@/components/Disclosures';
import CtaBand from '@/components/CtaBand';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'platform', '/platform');
}

export default async function PlatformPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('platform');
  const s = await getTranslations('shared');
  const numbers = {
    modules: MODULE_COUNT,
    verticals: VERTICAL_COUNT,
    disciplines: DISCIPLINE_COUNT
  };

  return (
    <>
      <PageHeader
        eyebrow={t('header.eyebrow')}
        title={t('header.title', numbers)}
        lead={t('header.lead', numbers)}
      />

      {/* The distinction the whole product rests on. */}
      <Section width="medium">
        <SectionHeader
          eyebrow={t('difference.eyebrow')}
          title={t('difference.title')}
          lead={t('difference.lead')}
        />
        <div style={{ marginTop: 'clamp(32px, 4vw, 48px)' }}>
          <MediaCards
            items={t.raw('difference.points') as { title: string; body: string }[]}
            icons={[SketchGear, SketchClipboard, SketchScale, SketchDueDiligence]}
            seed={2}
          />
        </div>
      </Section>

      {/* The pipeline, in full. */}
      <Section id="pipeline">
        <div className="split-grid">
          <div className="split-sticky">
            <SectionHeader
              eyebrow={t('pipeline.eyebrow')}
              title={t('pipeline.title')}
              lead={t('pipeline.lead')}
            />
          </div>
          <Pipeline
            stages={t.raw('pipeline.stages') as { title: string; body: string; note?: string }[]}
          />
        </div>
      </Section>

      {/* The output contract. */}
      <Section id="anatomy">
        <div className="split-grid">
          <div>
            <SectionHeader
              eyebrow={t('anatomy.eyebrow')}
              title={t('anatomy.title')}
              lead={t('anatomy.lead')}
            >
              <p className="type-body" style={{ marginTop: 20 }}>
                {t('anatomy.body')}
              </p>
            </SectionHeader>
          </div>
          <Reveal delay={60}>
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

      {/* The refusal classes. */}
      <Section width="medium">
        <SectionHeader
          eyebrow={t('refusals.eyebrow')}
          title={t('refusals.title')}
          lead={t('refusals.lead')}
        />
        <div style={{ marginTop: 'clamp(28px, 4vw, 44px)' }}>
          <MediaCards
            items={t.raw('refusals.classes') as { title: string; body: string }[]}
            icons={[SketchWarning, SketchEyeHidden, SketchHourglass]}
            chip={t('refusals.badge')}
            seed={7}
          />
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
        <Reveal delay={90}>
          <p
            className="type-small"
            style={{ marginTop: 24, color: 'var(--text-quaternary)', maxWidth: '70ch' }}
          >
            {t('coverage.note', numbers)}
          </p>
        </Reveal>
      </Section>

      {/* What we do not claim. */}
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
                <span className="mono" style={{ color: 'var(--wine-text)', paddingTop: 4 }}>
                  —
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
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
