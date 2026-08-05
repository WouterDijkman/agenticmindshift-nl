import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/pageMetadata';
import { DISCIPLINE_COUNT } from '@/lib/site';
import PageHeader from '@/components/PageHeader';
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
        eyebrow={t('header.eyebrow')}
        title={t('header.title')}
        lead={t('header.lead', numbers)}
        cta={t('header.cta')}
        secondary={s('links.platform')}
        secondaryHref="/platform"
        footnote={s('ctaProof')}
        visual={1}
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

      {/* The guarantee — the strongest claim on the page belongs up front. */}
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

      {/* The discipline roster; count comes from DISCIPLINES in lib/site.ts. */}
      <Section width="medium">
        <SectionHeader
          eyebrow={t('disciplines.eyebrow')}
          title={t('disciplines.title', numbers)}
          lead={t('disciplines.lead')}
        />
        <div style={{ marginTop: 'clamp(28px, 4vw, 44px)' }}>
          <DisciplineGrid labels={s.raw('disciplines') as string[]} />
        </div>
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
        <div style={{ marginTop: 32 }}>
          <MediaCards
            items={t.raw('layers.items') as { title: string; body: string }[]}
            chip="number"
            seed={5}
          />
        </div>
      </Section>

      {/* Delivery format — expectation-setting, not caveat. Same image-topped
          treatment as `layers` above and `inputs` below: this was the one
          three-item list on the page still rendered as a bare panel list. */}
      <Section width="medium">
        <SectionHeader
          eyebrow={t('delivery.eyebrow')}
          title={t('delivery.title')}
          lead={t('delivery.lead')}
        />
        <div style={{ marginTop: 32 }}>
          <MediaCards
            items={(t.raw('delivery.formats') as { label: string; items: string; body: string }[]).map(
              (format) => ({
                title: format.label,
                body: `${format.items}. ${format.body}`
              })
            )}
            seed={2}
          />
        </div>
      </Section>

      {/* What we need from you. */}
      <Section width="medium">
        <SectionHeader
          eyebrow={t('inputs.eyebrow')}
          title={t('inputs.title')}
          lead={t('inputs.lead')}
        />
        <div style={{ marginTop: 32 }}>
          <MediaCards
            items={t.raw('inputs.items') as { title: string; body: string }[]}
            seed={9}
            wide
          />
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
        /* Doubt peaks at the button, so the guarantee is restated beside it
           rather than left behind on the homepage. */
        aside={<GuaranteePanel label={s('guarantee.label')} claim={s('guarantee.claim')} note={s('guarantee.note')} />}
      />
    </>
  );
}
