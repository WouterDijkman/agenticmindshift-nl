import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/pageMetadata';
import { PARTNER_PROFILES } from '@/lib/scenes';
import PageHeader from '@/components/PageHeader';
import MediaCards from '@/components/MediaCards';
import SplitDiagram from '@/components/SplitDiagram';
import Stepper from '@/components/Stepper';
import Reveal from '@/components/Reveal';
import { Section, SectionHeader } from '@/components/Section';
import Disclosures from '@/components/Disclosures';
import CtaBand from '@/components/CtaBand';
import GuaranteePanel from '@/components/GuaranteePanel';
import Breadcrumb from '@/components/Breadcrumb';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'partnerships', '/partnerships');
}

export default async function PartnershipsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('partnerships');
  const s = await getTranslations('shared');

  return (
    <>
      <Breadcrumb path="/partnerships" />

      <PageHeader
        title={t('header.title')}
        lead={t('header.lead')}
        cta={t('header.cta')}
        secondary={s('links.sprint')}
        secondaryHref="/diligence-sprint"
        footnote={s('ctaProof')}
        visual={4}
      />

      {/* Who this is for — described by shape of firm, never by name. */}
      <Section width="medium" tone="inset" weight="loud">
        <SectionHeader title={t('who.title')} lead={t('who.lead')} />
        <div style={{ marginTop: 'clamp(28px, 4vw, 44px)' }}>
          <MediaCards
            items={t.raw('who.profiles') as { title: string; body: string }[]}
            scenes={PARTNER_PROFILES}
            wide
          />
        </div>
      </Section>

      {/* What the partner keeps, what we supply. */}
      <Section width="medium">
        <SectionHeader title={t('split.title')} lead={t('split.lead')} />
        <Reveal delay={60} style={{ marginTop: 'clamp(28px, 4vw, 44px)' }}>
          <SplitDiagram
            columns={t.raw('split.columns') as { label: string; items: string[] }[]}
            seamLabel={t('split.seam')}
          />
        </Reveal>
      </Section>

      {/* How an engagement starts. */}
      <Section width="medium" tone="raised" weight="tight">
        <SectionHeader title={t('start.title')} lead={t('start.lead')} />
        <div style={{ marginTop: 'clamp(30px, 4vw, 48px)' }}>
          <Stepper steps={t.raw('start.steps') as { title: string; body: string }[]} />
        </div>
      </Section>

      {/* Boundaries — the honest version of an exclusivity conversation. */}
      <Section width="medium" weight="tight">
        <SectionHeader title={t('boundaries.title')} lead={t('boundaries.lead')} />
        <Reveal delay={60} style={{ marginTop: 28 }}>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {(t.raw('boundaries.items') as string[]).map((item) => (
              <li
                key={item}
                className="type-body hairline-top"
                style={{ paddingBlock: 16, display: 'flex', gap: 14 }}
              >
                <span className="mono" style={{ color: 'var(--wine-text)', paddingTop: 4 }}>
                  &mdash;
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
