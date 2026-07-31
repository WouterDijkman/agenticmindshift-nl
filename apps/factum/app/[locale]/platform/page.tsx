import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/pageMetadata';
import {
  DISCIPLINE_COUNT,
  HARD_BLOCK_COUNT,
  LARGEST_MODULE_AGENTS,
  MODULE_COUNT,
  SUBAGENT_COUNT,
  WAVE_COUNT,
  ZDR_MODULE_COUNT
} from '@/lib/site';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { Section, SectionHeader } from '@/components/Section';
import Pipeline from '@/components/Pipeline';
import BentoGrid from '@/components/BentoGrid';
import ModuleChart from '@/components/ModuleChart';
import GroundingStack from '@/components/GroundingStack';
import Specimen from '@/components/Specimen';
import ComparisonMatrix, { type Verdict } from '@/components/ComparisonMatrix';
import Disclosures from '@/components/Disclosures';
import CtaBand from '@/components/CtaBand';
import FindingSchema from '@/components/FindingSchema';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'platform', '/platform');
}

/**
 * Verdicts live here rather than in the message files: they are claims about
 * capability, identical in every language, and a translator must not be able to
 * turn a "no" into a "yes" by accident. Only the labels are translated.
 *
 * Row order matches `platform.alternatives.rows`.
 */
const MATRIX: Verdict[][] = [
  ['no', 'partial', 'no', 'yes'], // pre-scoped module per discipline
  ['no', 'partial', 'no', 'yes'], // runs without being prompted
  ['na', 'partial', 'no', 'yes'], // citation required by the schema
  ['no', 'no', 'no', 'yes'], // cross-discipline reconciliation
  ['no', 'partial', 'no', 'yes'], // produces the deliverable
  ['na', 'partial', 'no', 'yes'], // zero retention at the provider
  ['na', 'no', 'no', 'yes'], // named person signs off
  ['no', 'no', 'no', 'no'] // published accuracy audit
];

export default async function PlatformPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('platform');
  const s = await getTranslations('shared');
  const n = {
    modules: MODULE_COUNT,
    agents: SUBAGENT_COUNT,
    waves: WAVE_COUNT,
    disciplines: DISCIPLINE_COUNT,
    zdr: ZDR_MODULE_COUNT,
    largest: LARGEST_MODULE_AGENTS,
    blocks: HARD_BLOCK_COUNT
  };

  const tile = (key: string) => ({
    title: t(`scale.tiles.${key}.title`),
    body: t(`scale.tiles.${key}.body`, n)
  });

  return (
    <>
      <PageHeader
        eyebrow={t('header.eyebrow')}
        title={t('header.title', n)}
        lead={t('header.lead')}
        visual={0}
        aside={
          <FindingSchema
            label={s('schema.label')}
            footnote={s('schema.footnote')}
            rows={[
              { key: s('schema.rows.module'), value: s('schema.values.module') },
              { key: s('schema.rows.finding'), value: s('schema.values.finding'), redacted: true },
              { key: s('schema.rows.evidence'), value: s('schema.values.evidence'), redacted: true },
              { key: s('schema.rows.document'), value: s('schema.values.document'), redacted: true },
              { key: s('schema.rows.review'), value: s('schema.values.review') }
            ]}
          />
        }
      />

      {/*
        Mechanism first, inventory last.

        This page used to open on a bento of six counted figures under the
        heading "What is actually built" — which answered a question about us
        before the reader had been given a reason to care how big we are. The
        counts are true and they stay on the page, but they are evidence for a
        claim, so they now sit below the claim. What a reader wants first is
        what happens to their documents.
      */}

      {/* What happens inside one module. */}
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

      {/* The four grounding layers, drawn as a narrowing stack. */}
      <Section id="grounding" width="wide">
        <SectionHeader
          eyebrow={t('grounding.eyebrow')}
          title={t('grounding.title')}
          lead={t('grounding.lead')}
          align="wide"
        />
        <div style={{ marginTop: 'clamp(32px, 4vw, 52px)' }}>
          <GroundingStack
            layers={
              t.raw('grounding.layers') as { title: string; body: string; catches: string }[]
            }
            catchLabel={t('grounding.catchLabel')}
          />
        </div>
        <Reveal>
          <p
            className="type-small"
            style={{ marginTop: 28, color: 'var(--text-quaternary)', maxWidth: '70ch' }}
          >
            {t('grounding.repair')}
          </p>
        </Reveal>
      </Section>

      {/* The seven hard blocks. */}
      <Section width="wide">
        <SectionHeader
          eyebrow={t('blocks.eyebrow')}
          title={t('blocks.title', n)}
          lead={t('blocks.lead')}
          align="wide"
        />
        <div style={{ marginTop: 'clamp(28px, 4vw, 48px)' }}>
          <BentoGrid
            tiles={(t.raw('blocks.items') as { title: string; body: string }[]).map(
              (item, i) => ({
                ...item,
                tag: String(i + 1).padStart(2, '0'),
                span: (i < 2 ? 3 : i < 5 ? 2 : 3) as 2 | 3
              })
            )}
          />
        </div>
      </Section>

      {/* The trace, at full size — the one feature moment on this page. */}
      <Section id="anatomy" width="wide" tone="inset">
        <SectionHeader
          eyebrow={t('anatomy.eyebrow')}
          title={t('anatomy.title')}
          lead={t('anatomy.lead')}
          align="wide"
        />
        <div style={{ marginTop: 'clamp(32px, 4vw, 52px)' }}>
          <Specimen
            pageLabel={s('specimen.pageLabel')}
            pageRef={s('specimen.pageRef')}
            highlightLabel={s('specimen.highlight')}
            findingLabel={s('specimen.findingLabel')}
            footnote={s('specimen.footnote')}
            rows={[
              { key: s('schema.rows.module'), value: s('schema.values.module') },
              { key: s('schema.rows.finding'), value: s('schema.values.finding') },
              { key: s('schema.rows.evidence'), value: s('schema.values.evidence') },
              { key: s('schema.rows.document'), value: s('schema.values.document') },
              { key: s('schema.rows.review'), value: s('schema.values.review') }
            ]}
          />
        </div>
      </Section>

      {/* The library and the running order, in one chart. */}
      <Section id="modules" width="wide">
        <SectionHeader
          eyebrow={t('coverage.eyebrow')}
          title={t('coverage.title')}
          lead={t('coverage.lead', n)}
          align="wide"
        />
        <div style={{ marginTop: 'clamp(32px, 4vw, 52px)' }}>
          <ModuleChart
            labels={s.raw('modules') as string[]}
            waveLabels={(s.raw('waves') as { title: string }[]).map((w) => w.title)}
            agentLabel={s('chart.agentLabel')}
            zdrLabel={s('chart.zdr')}
          />
        </div>
        <Reveal>
          <p
            className="type-small"
            style={{ marginTop: 28, color: 'var(--text-quaternary)', maxWidth: '70ch' }}
          >
            {t('coverage.note')}
          </p>
        </Reveal>
      </Section>

      {/* The inventory, as one grid of measured numbers. */}
      <Section width="wide">
        <SectionHeader
          eyebrow={t('scale.eyebrow')}
          title={t('scale.title')}
          lead={t('scale.lead')}
          align="wide"
        />
        <div style={{ marginTop: 'clamp(32px, 4vw, 52px)' }}>
          <BentoGrid
            tiles={[
              { ...tile('agents'), stat: String(SUBAGENT_COUNT), span: 3, accent: true },
              { ...tile('modules'), stat: String(MODULE_COUNT), span: 3 },
              { ...tile('waves'), stat: String(WAVE_COUNT), span: 2 },
              { ...tile('zdr'), stat: String(ZDR_MODULE_COUNT), span: 2 },
              { ...tile('blocks'), stat: String(HARD_BLOCK_COUNT), span: 2 },
              { ...tile('disciplines'), stat: String(DISCIPLINE_COUNT), span: 6 }
            ]}
          />
        </div>
      </Section>

      {/* The three alternatives, scored. */}
      <Section id="alternatives" width="wide">
        <SectionHeader
          eyebrow={t('alternatives.eyebrow')}
          title={t('alternatives.title')}
          lead={t('alternatives.lead')}
          align="wide"
        />
        <div style={{ marginTop: 'clamp(32px, 4vw, 52px)' }}>
          <ComparisonMatrix
            columns={t.raw('alternatives.columns') as string[]}
            rows={(t.raw('alternatives.rows') as { label: string; note?: string }[]).map(
              (row, i) => ({ ...row, verdicts: MATRIX[i] })
            )}
            legend={
              t.raw('alternatives.legend') as {
                yes: string;
                partial: string;
                no: string;
                na: string;
              }
            }
          />
        </div>
        <Reveal>
          <p
            className="type-small"
            style={{ marginTop: 24, color: 'var(--text-quaternary)', maxWidth: '70ch' }}
          >
            {t('alternatives.note')}
          </p>
        </Reveal>
      </Section>

      {/* What we don't claim. */}
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

      <Section width="medium">
        <SectionHeader eyebrow={t('faq.eyebrow')} title={t('faq.title')} />
        <Reveal delay={60} style={{ marginTop: 28 }}>
          <Disclosures
            items={(t.raw('faq.items') as { q: string }[]).map((item, i) => ({
              q: item.q,
              a: t(`faq.items.${i}.a`, n)
            }))}
          />
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
