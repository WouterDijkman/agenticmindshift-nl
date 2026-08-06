import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { pageMetadata } from '@/lib/pageMetadata';
import { HARD_BLOCK_COUNT, MODULE_COUNT, WAVE_COUNT, WAVE_SIZES } from '@/lib/site';
import PageHeader from '@/components/PageHeader';
import { Section, SectionHeader } from '@/components/Section';
import StageList from '@/components/StageList';
import DefinitionList from '@/components/DefinitionList';
import Reveal from '@/components/Reveal';
import CtaBand from '@/components/CtaBand';
import GuaranteePanel from '@/components/GuaranteePanel';
import Breadcrumb from '@/components/Breadcrumb';
import { ArrowRight } from '@/components/Icons';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'method', '/method');
}

/**
 * The long-form reference page. Not in the header — see `REFERENCE_NAV`.
 *
 * /platform and /diligence-sprint are arguments and were both cut hard for
 * length; neither can carry the dependency order of the run, the output
 * contract field by field, and the sequence a reviewer follows without becoming
 * the thing this rebuild removed. So the detail lives here and those pages link
 * to it, which is also the only shape that keeps them short.
 *
 * The rule the rest of the site follows applies here too: no module renders
 * twice. This page's own objects are `StageList` for the waves and
 * `DefinitionList` for the contract and, deliberately, no `Specimen` — the
 * worked example is the homepage's one feature moment and is linked rather than
 * reprinted. Every number is an ICU argument fed from lib/site.ts; typing "22"
 * into a message file is how the site once printed a module total a quarter too
 * high.
 */
export default async function MethodPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('method');
  const s = await getTranslations('shared');

  const numbers = {
    modules: MODULE_COUNT,
    waves: WAVE_COUNT,
    blocks: HARD_BLOCK_COUNT,
    w1: WAVE_SIZES[0],
    w2: WAVE_SIZES[1],
    w3: WAVE_SIZES[2],
    w4: WAVE_SIZES[3],
    w5: WAVE_SIZES[4]
  };

  const waves = (t.raw('waves.steps') as { title: string }[]).map((step, i) => ({
    title: step.title,
    // Through `t()` rather than `t.raw()`, so the per-wave module counts stay
    // wired to MODULES in lib/site.ts. A raw array skips ICU entirely.
    body: t(`waves.steps.${i}.body`, numbers)
  }));

  const contract = (t.raw('contract.items') as { title: string; fail: string }[]).map(
    (item, i) => ({
      title: item.title,
      body: t(`contract.items.${i}.body`, numbers),
      note: item.fail
    })
  );

  return (
    <>
      <Breadcrumb path="/method" />

      <PageHeader
        title={t('header.title')}
        lead={t('header.lead')}
        cta={t('header.cta')}
        secondary={s('links.platform')}
        secondaryHref="/platform"
        visual={6}
      />

      {/* The order of the run. Five rows, hairline-separated: a `Stepper` rail
          lays out three or four across and leaves the last row short, which is
          the reason StageList exists. */}
      <Section width="medium" weight="tight">
        <SectionHeader title={t('waves.title', numbers)} lead={t('waves.lead')} />
        <div style={{ marginTop: 'clamp(24px, 3vw, 36px)' }}>
          <StageList items={waves} />
        </div>
        <Reveal>
          <p
            className="type-small"
            style={{ marginTop: 20, color: 'var(--text-quaternary)', maxWidth: '70ch' }}
          >
            {t('waves.note')}
          </p>
        </Reveal>
      </Section>

      {/* The output contract, with each field's failure mode attached. The
          compact five-row artefact on the homepage says what the fields are;
          this says what happens when one cannot be filled, which is the half
          that decides whether the contract means anything. */}
      <Section width="medium" tone="inset" weight="loud">
        <SectionHeader title={t('contract.title')} lead={t('contract.lead')} />
        <div style={{ marginTop: 'clamp(28px, 3.5vw, 44px)' }}>
          <DefinitionList items={contract} noteLabel={t('contract.failLabel')} />
        </div>
        <Reveal>
          <p
            className="type-small"
            style={{ marginTop: 22, color: 'var(--text-quaternary)', maxWidth: '70ch' }}
          >
            {t('contract.note')}
          </p>
        </Reveal>
      </Section>

      {/* The audit trail, in order. */}
      <Section width="medium">
        <SectionHeader title={t('trail.title')} lead={t('trail.lead')} />
        <Reveal delay={60} style={{ marginTop: 'clamp(24px, 3vw, 36px)' }}>
          <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {(t.raw('trail.steps') as string[]).map((step, i) => (
              <li
                key={step}
                className="type-body"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto minmax(0, 1fr)',
                  gap: 18,
                  paddingBlock: 15,
                  borderTop: i === 0 ? 'none' : '1px solid var(--hairline-faint)'
                }}
              >
                <span className="mono" style={{ color: 'var(--wine-text)' }} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={80} style={{ marginTop: 26 }}>
          <p className="type-small" style={{ color: 'var(--text-quaternary)', maxWidth: '70ch' }}>
            {t('trail.note')}
          </p>
          {/* Points at the homepage specimen rather than reprinting it. */}
          <div style={{ marginTop: 16 }}>
            <Link href="/#anatomy" className="link-quiet">
              {t('trail.link')}
              <ArrowRight />
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* What the person does, as a sequence. /governance states the conditions
          that force the gate; this states what happens once it is forced. */}
      <Section width="medium" tone="raised" weight="tight">
        <div className="split-grid">
          <div>
            <SectionHeader title={t('gate.title')} lead={t('gate.lead')} />
            <Reveal delay={80} style={{ marginTop: 28 }}>
              <Link href="/governance" className="link-quiet">
                {t('gate.link')}
                <ArrowRight />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={60}>
            <div className="panel panel-inset" style={{ padding: 'clamp(22px, 3vw, 32px)' }}>
              <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {(t.raw('gate.items') as string[]).map((item, i) => (
                  <li
                    key={item}
                    className="type-body"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'auto minmax(0, 1fr)',
                      gap: 14,
                      paddingBlock: 13,
                      borderTop: i === 0 ? 'none' : '1px solid var(--hairline-faint)'
                    }}
                  >
                    <span
                      className="mono"
                      style={{ color: 'var(--wine-text)' }}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
              <p className="type-small" style={{ marginTop: 18, color: 'var(--text-quaternary)' }}>
                {t('gate.note', numbers)}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* The handover to the other reference page. Deliberately the last thing
          before the ask: a methodology page that ends by naming its own limits
          is more persuasive than one that ends by restating its strengths. */}
      <Section width="medium">
        <SectionHeader title={t('stops.title')} lead={t('stops.lead')} />
        <Reveal delay={80} style={{ marginTop: 24 }}>
          <Link href="/limits-of-ai" className="link-quiet">
            {t('stops.link')}
            <ArrowRight />
          </Link>
        </Reveal>
      </Section>

      <CtaBand
        title={t('cta.title')}
        body={t('cta.body')}
        cta={t('cta.button')}
        note={t('cta.note')}
        aside={
          <GuaranteePanel
            label={s('guarantee.label')}
            claim={s('guarantee.claim')}
            note={s('guarantee.note')}
          />
        }
      />
    </>
  );
}
