import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/pageMetadata';
import { DISCIPLINE_COUNT } from '@/lib/site';
import { SPRINT_BAND, SPRINT_FORMATS, SPRINT_INPUTS, SPRINT_LAYERS } from '@/lib/scenes';
import PageHeader from '@/components/PageHeader';
import SceneBand from '@/components/SceneBand';
import DisciplineGrid from '@/components/DisciplineGrid';
import MediaCards from '@/components/MediaCards';
import Reveal from '@/components/Reveal';
import { Section, SectionHeader } from '@/components/Section';
import Disclosures from '@/components/Disclosures';
import CtaBand from '@/components/CtaBand';
import GuaranteePanel from '@/components/GuaranteePanel';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'sprint', '/diligence-sprint');
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
        title={t('header.title')}
        lead={t('header.lead', numbers)}
        cta={t('header.cta')}
        secondary={s('links.platform')}
        secondaryHref="/platform"
        footnote={s('ctaProof')}
        visual={1}
      />

      {/*
        The reframe, as a band rather than as a blockquote with a paragraph
        under it. The line lives in `shared` because the homepage opens on it
        too and the two must never drift apart; the paragraph that used to
        explain it is gone, because a band with an explanation under it is not
        a band, and the explanation restated the line.

        The guarantee panel that sat immediately below this is also gone. It
        was the same claim the CtaBand at the foot of this page already makes,
        and the header footnote above already makes — three statements of one
        promise inside one scroll reads as insistence rather than confidence.
      */}
      <SceneBand id={SPRINT_BAND} line={s('reframe.quote')} attribution={t('reframe.attr')} />

      {/* The discipline roster; count comes from DISCIPLINES in lib/site.ts.
          This is what the page is for, and it is now the only section on it
          carrying feature weight. */}
      <Section width="medium" tone="inset" weight="loud">
        <SectionHeader title={t('disciplines.title', numbers)} lead={t('disciplines.lead')} />
        <div style={{ marginTop: 'clamp(28px, 4vw, 44px)' }}>
          <DisciplineGrid
            items={s.raw('disciplines') as { label: string; pain: string; result: string }[]}
          />
        </div>
        <Reveal delay={90}>
          <p className="type-small" style={{ marginTop: 22, color: 'var(--text-quaternary)', maxWidth: '70ch' }}>
            {t('disciplines.note')}
          </p>
        </Reveal>
      </Section>

      {/* Three synthesis layers. */}
      <Section width="medium" weight="tight">
        <SectionHeader title={t('layers.title')} lead={t('layers.lead', numbers)} />
        <div style={{ marginTop: 32 }}>
          <MediaCards
            items={t.raw('layers.items') as { title: string; body: string }[]}
            chip="number"
            scenes={SPRINT_LAYERS}
          />
        </div>
      </Section>

      {/* Delivery format — expectation-setting, not caveat. Same image-topped
          treatment as `layers` above and `inputs` below: this was the one
          three-item list on the page still rendered as a bare panel list. */}
      <Section width="medium" tone="raised">
        <SectionHeader title={t('delivery.title')} lead={t('delivery.lead')} />
        <div style={{ marginTop: 32 }}>
          <MediaCards
            items={(t.raw('delivery.formats') as { label: string; items: string; body: string }[]).map(
              (format) => ({
                title: format.label,
                body: `${format.items}. ${format.body}`
              })
            )}
            scenes={SPRINT_FORMATS}
          />
        </div>
      </Section>

      {/* What we need from you. */}
      <Section width="medium" weight="tight">
        <SectionHeader title={t('inputs.title')} lead={t('inputs.lead')} />
        <div style={{ marginTop: 32 }}>
          <MediaCards
            items={t.raw('inputs.items') as { title: string; body: string }[]}
            scenes={SPRINT_INPUTS}
            wide
          />
        </div>
      </Section>

      {/* FAQ. */}
      <Section width="medium">
        <SectionHeader title={t('faq.title')} />
        {/* Answers go through `t()` rather than `t.raw()` so the discipline
            count in the first one stays wired to DISCIPLINES in lib/site.ts.
            Raw arrays skip ICU, which is how a hardcoded "thirteen" survived
            the roster being cut to ten. */}
        <Reveal delay={60} style={{ marginTop: 28 }}>
          <Disclosures
            items={(t.raw('faq.items') as { q: string }[]).map((item, i) => ({
              q: item.q,
              a: t(`faq.items.${i}.a`, numbers)
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
