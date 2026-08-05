import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/pageMetadata';
import { GOVERNANCE_POINTS } from '@/lib/scenes';
import PageHeader from '@/components/PageHeader';
import HandoffTrack from '@/components/HandoffTrack';
import MediaCards from '@/components/MediaCards';
import Reveal from '@/components/Reveal';
import { Section, SectionHeader } from '@/components/Section';
import Dial from '@/components/Dial';
import TenancySplit from '@/components/TenancySplit';
import CtaBand from '@/components/CtaBand';
import GuaranteePanel from '@/components/GuaranteePanel';
import {
  GROUNDING_AUDIT_DATE,
  GROUNDING_RATE,
  GROUNDING_REMAINDER,
  HARD_BLOCK_COUNT,
  KVK,
  MODULE_COUNT,
  ZDR_MODULE_COUNT
} from '@/lib/site';

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
  const n = {
    blocks: HARD_BLOCK_COUNT,
    zdr: ZDR_MODULE_COUNT,
    other: MODULE_COUNT - ZDR_MODULE_COUNT,
    date: GROUNDING_AUDIT_DATE,
    remainder: GROUNDING_REMAINDER
  };

  return (
    <>
      <PageHeader
        eyebrow={t('header.eyebrow')}
        title={t('header.title')}
        lead={t('header.lead')}
        cta={t('header.cta')}
        secondary={s('links.platform')}
        secondaryHref="/platform"
        footnote={s('ctaProof')}
        visual={2}
      />

      {/* Data handling. */}
      <Section width="medium">
        <SectionHeader
          eyebrow={t('data.eyebrow')}
          title={t('data.title')}
          lead={t('data.lead')}
        />
        <div style={{ marginTop: 32 }}>
          <MediaCards
            items={s.raw('governancePoints') as { title: string; body: string }[]}
            scenes={GOVERNANCE_POINTS}
            wide
          />
        </div>
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
                {(t.raw('gate.items') as string[]).map((_, i) => (
                  <li
                    key={i}
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
                    {t(`gate.items.${i}`, n)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Zero retention as a routing gate, not a promise. */}
      <Section id="zdr" width="medium">
        <div className="split-grid">
          <div>
            <SectionHeader eyebrow={t('zdr.eyebrow')} title={t('zdr.title')} lead={t('zdr.lead')} />
          </div>
          <Reveal delay={60}>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {(t.raw('zdr.items') as string[]).map((_, i) => (
                <li
                  key={i}
                  className="type-body hairline-top"
                  style={{ paddingBlock: 16, display: 'flex', gap: 14 }}
                >
                  <span className="mono" style={{ color: 'var(--accent-cta)', paddingTop: 4 }}>
                    {s('chart.zdr')}
                  </span>
                  {t(`zdr.items.${i}`, n)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* What the system learns, and which side of the tenancy line it sits on. */}
      <Section id="learning" width="medium">
        <SectionHeader
          eyebrow={t('learning.eyebrow')}
          title={t('learning.title')}
          lead={t('learning.lead')}
        />
        <div style={{ marginTop: 'clamp(28px, 4vw, 44px)' }}>
          <TenancySplit
            columns={
              t.raw('learning.columns') as { label: string; body: string; items: string[] }[]
            }
          />
        </div>
        <Reveal>
          <p className="type-small" style={{ marginTop: 24, color: 'var(--text-quaternary)' }}>
            {t('learning.note')}
          </p>
        </Reveal>
      </Section>

      {/* The one measured number, welded to its caveat — the feature moment on this page. */}
      <Section id="grounding" width="medium" tone="inset">
        <SectionHeader
          eyebrow={t('grounding.eyebrow')}
          title={t('grounding.title')}
          lead={t('grounding.lead')}
        />
        <div className="split-grid" style={{ marginTop: 'clamp(28px, 4vw, 44px)' }}>
          <Reveal>
            <Dial
              value={GROUNDING_RATE}
              label={t('grounding.dialLabel')}
              caveat={t('grounding.dialCaveat', n)}
            />
          </Reveal>
          <Reveal delay={80}>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {(t.raw('grounding.items') as string[]).map((_, i) => (
                <li
                  key={i}
                  className="type-body hairline-top"
                  style={{ paddingBlock: 16, display: 'flex', gap: 14 }}
                >
                  <span className="mono" style={{ color: 'var(--wine-text)', paddingTop: 4 }}>
                    —
                  </span>
                  {t(`grounding.items.${i}`, n)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Why the pipeline has this shape: one court, one NDA, one statute. */}
      <Section id="why-the-gate" width="medium">
        <SectionHeader
          eyebrow={t('legal.eyebrow')}
          title={t('legal.title')}
          lead={t('legal.lead')}
        />
        <Reveal delay={60} style={{ marginTop: 28 }}>
          <div className="split-grid-thirds">
            {(t.raw('legal.items') as { title: string; body: string }[]).map((item) => (
              <div key={item.title} className="panel" style={{ padding: 'clamp(22px, 3vw, 30px)' }}>
                <h3 className="type-h4" style={{ marginBottom: 10 }}>
                  {item.title}
                </h3>
                <p className="type-small">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="type-small" style={{ marginTop: 20, color: 'var(--text-quaternary)' }}>
            {t('legal.note')}
          </p>
        </Reveal>
      </Section>

      {/*
        What is arranged, immediately before what isn't.

        The limits list below was the only answer this page gave to "who am I
        contracting with, who carries the risk, and what happens to my
        documents afterwards" — and its answer to all three was "nothing here".
        Those questions now have real answers, so they get stated first and the
        limits list shrinks to what genuinely is still missing.
      */}
      <Section id="terms" width="medium">
        <SectionHeader
          eyebrow={t('terms.eyebrow')}
          title={t('terms.title')}
          lead={t('terms.lead')}
        />
        <Reveal delay={60} style={{ marginTop: 28 }}>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {(t.raw('terms.items') as { title: string; body: string }[]).map((item, i) => (
              <li key={item.title} className="type-body hairline-top" style={{ paddingBlock: 18 }}>
                <div style={{ display: 'flex', gap: 14 }}>
                  <span className="mono" style={{ color: 'var(--wine-text)', paddingTop: 4 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="type-h4" style={{ marginBottom: 8 }}>
                      {item.title}
                    </h3>
                    <p className="type-small">{t(`terms.items.${i}.body`, { kvk: KVK })}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="type-small" style={{ marginTop: 22, color: 'var(--text-quaternary)' }}>
            {t('terms.note')}
          </p>
        </Reveal>
      </Section>

      {/* AI transparency. */}
      <Section width="medium">
        <SectionHeader
          eyebrow={t('transparency.eyebrow')}
          title={t('transparency.title')}
          lead={t('transparency.lead')}
        />
        <Reveal delay={60} className="measure" style={{ marginTop: 24 }}>
          <HandoffTrack
            steps={t.raw('transparency.steps') as string[]}
            humanFrom={3}
            machineLabel={t('transparency.machineLabel')}
            humanLabel={t('transparency.humanLabel')}
          />
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
        /* Doubt peaks at the button, so the guarantee is restated beside it
           rather than left behind on the homepage. */
        aside={<GuaranteePanel label={s('guarantee.label')} claim={s('guarantee.claim')} note={s('guarantee.note')} />}
      />
    </>
  );
}
