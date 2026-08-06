import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { pageMetadata } from '@/lib/pageMetadata';
import {
  ANALYSIS_MODULE_COUNT,
  DELIVERABLE_MODULE_COUNT,
  DISCIPLINE_COUNT,
  HARD_BLOCK_COUNT,
  MODULE_COUNT,
  MONITORING_MODULE_COUNT,
  WAVE_COUNT,
  ZDR_MODULE_COUNT
} from '@/lib/site';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { Section, SectionHeader } from '@/components/Section';
import Pipeline from '@/components/Pipeline';
import BentoGrid from '@/components/BentoGrid';
import DispatchGraph from '@/components/DispatchGraph';
import GroundingStack from '@/components/GroundingStack';
import ComparisonMatrix, { type Verdict } from '@/components/ComparisonMatrix';
import Disclosures from '@/components/Disclosures';
import CtaBand from '@/components/CtaBand';
import GuaranteePanel from '@/components/GuaranteePanel';
import FindingSchema from '@/components/FindingSchema';
import Breadcrumb from '@/components/Breadcrumb';
import { ArrowRight } from '@/components/Icons';

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
    waves: WAVE_COUNT,
    disciplines: DISCIPLINE_COUNT,
    zdr: ZDR_MODULE_COUNT,
    blocks: HARD_BLOCK_COUNT
  };

  const tile = (key: string) => ({
    title: t(`scale.tiles.${key}.title`),
    body: t(`scale.tiles.${key}.body`, n)
  });

  return (
    <>
      <Breadcrumb path="/platform" />

      <PageHeader
        title={t('header.title', n)}
        lead={t('header.lead')}
        cta={t('header.cta')}
        secondary={s('links.sprint')}
        secondaryHref="/diligence-sprint"
        footnote={s('ctaProof')}
        visual={0}
        aside={
          <FindingSchema
            label={s('schema.label')}
            footnote={s('schema.footnote')}
            moreLabel={s('schema.more')}
            rows={[
              { key: s('schema.rows.module'), value: s('schema.values.module') },
              { key: s('schema.rows.finding'), value: s('schema.values.finding') },
              { key: s('schema.rows.evidence'), value: s('schema.values.evidence') },
              { key: s('schema.rows.document'), value: s('schema.values.document') },
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
            <SectionHeader title={t('pipeline.title')} lead={t('pipeline.lead')} />
            {/* This page stops at the mechanism on purpose; the dependency
                order, the contract field by field and the reviewer's own
                sequence are on /method, which exists so this one can stay
                short. */}
            <Reveal delay={80} style={{ marginTop: 26 }}>
              <Link href="/method" className="link-quiet">
                {s('links.method')}
                <ArrowRight />
              </Link>
            </Reveal>
          </div>
          <Pipeline
            stages={t.raw('pipeline.stages') as { title: string; body: string; note?: string }[]}
          />
        </div>
      </Section>

      {/* The four grounding layers, drawn as a narrowing stack. The one
          feature-weight section on this page: it is the mechanism the whole
          site's central claim rests on, and it was previously given exactly the
          same padding as the FAQ. */}
      <Section id="grounding" width="wide" tone="inset" weight="loud">
        <SectionHeader title={t('grounding.title')} lead={t('grounding.lead')} align="wide" />
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
      <Section width="wide" weight="tight">
        <SectionHeader title={t('blocks.title', n)} lead={t('blocks.lead')} align="wide" />
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

      {/*
        `Specimen` used to sit here, under an "anatomy of a finding" heading.
        It has moved to the homepage.

        It is the most persuasive object the site owns and it was four scrolls
        deep on a page a cold visitor rarely reaches — /platform is where
        someone goes once they already believe there is something to look at.
        Its departure also settles the 101 phrases this page shared with the
        homepage: the home page now shows the output, this page keeps the
        mechanism that produces it.
      */}

      {/* The library and the running order, as one graph.

          This was a bar chart ranked by sub-agent count. It answered "how big
          is each module" — our fact, not the reader's — and the dependency
          structure had to be inferred from the wave bands. The graph states it
          instead: nine modules opening at once, two waiting on them, a
          synthesis layer reading across everything, deliverables, and
          post-close on its own clock. Each node now carries what it returns —
          finding, document, or ongoing signal — which is the question a buyer
          is actually asking. */}
      <Section id="modules" width="wide" tone="raised">
        <SectionHeader title={t('coverage.title')} lead={t('coverage.lead', n)} align="wide" />
        <div style={{ marginTop: 'clamp(32px, 4vw, 52px)' }}>
          <DispatchGraph
            labels={s.raw('modules') as string[]}
            waves={s.raw('waves') as { title: string; body: string }[]}
            modulesLabel={s('chart.modulesLabel')}
            kindLabels={{
              analysis: s('chart.kinds.analysis'),
              deliverable: s('chart.kinds.deliverable'),
              monitoring: s('chart.kinds.monitoring')
            }}
            zdrLabel={s('chart.zdr')}
            zdrTitle={s('chart.zdrTitle')}
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
      <Section width="wide" weight="tight">
        <SectionHeader title={t('scale.title')} lead={t('scale.lead')} align="wide" />
        <div style={{ marginTop: 'clamp(32px, 4vw, 52px)' }}>
          <BentoGrid
            /* The three-way split leads, because it is the answer to "what do
               I actually get" — findings, documents, and something that keeps
               running after the deal. The totals underneath are the evidence
               for it. The old lead tile counted sub-agents, which measured our
               plumbing rather than the reader's output. */
            tiles={[
              { ...tile('modules'), stat: String(MODULE_COUNT), span: 3, accent: true },
              { ...tile('analysis'), stat: String(ANALYSIS_MODULE_COUNT), span: 3 },
              { ...tile('deliverables'), stat: String(DELIVERABLE_MODULE_COUNT), span: 2 },
              { ...tile('monitoring'), stat: String(MONITORING_MODULE_COUNT), span: 2 },
              { ...tile('waves'), stat: String(WAVE_COUNT), span: 2 },
              { ...tile('zdr'), stat: String(ZDR_MODULE_COUNT), span: 3 },
              { ...tile('blocks'), stat: String(HARD_BLOCK_COUNT), span: 3 }
            ]}
          />
        </div>
      </Section>

      {/* The three alternatives, scored. */}
      <Section id="alternatives" width="wide">
        <SectionHeader title={t('alternatives.title')} lead={t('alternatives.lead')} align="wide" />
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
      <Section width="medium" weight="tight">
        <SectionHeader title={t('limits.title')} lead={t('limits.lead')} />
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
        <SectionHeader title={t('faq.title')} />
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
        /* Doubt peaks at the button, so the guarantee is restated beside it
           rather than left behind on the homepage. */
        aside={<GuaranteePanel label={s('guarantee.label')} claim={s('guarantee.claim')} note={s('guarantee.note')} />}
      />
    </>
  );
}
