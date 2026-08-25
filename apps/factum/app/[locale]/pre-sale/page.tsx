import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/pageMetadata';
import { PRESALE_PROFILES } from '@/lib/scenes';
import PageHeader from '@/components/PageHeader';
import MediaCards from '@/components/MediaCards';
import Stepper from '@/components/Stepper';
import Reveal from '@/components/Reveal';
import { Section, SectionHeader } from '@/components/Section';
import Disclosures from '@/components/Disclosures';
import CtaBand from '@/components/CtaBand';
import GuaranteePanel from '@/components/GuaranteePanel';
import Breadcrumb from '@/components/Breadcrumb';

/**
 * The seller's door.
 *
 * This position already existed on the site, as one clause in the lead of
 * /diligence-sprint: run it on a target you are buying, or on your own company
 * before a buyer runs it on you. That second half is a different buyer with a
 * different fear, and a clause is not a door.
 *
 * The page is the same engine described from the other side, so it deliberately
 * reuses the components /partnerships uses rather than inventing a layout. What
 * is new is only the middle: the gaps section, which is the one part of the
 * proposition that belongs to a seller more than to a buyer. A buyer wants to
 * know what a data room contains. A seller needs to know what his own is
 * missing, because that is the first thing he will be asked for.
 *
 * The boundary in `gaps.note` is not decoration. We can see that a document is
 * absent; we cannot see whether it was withheld. Saying the second thing would
 * be a claim about somebody's intent, and there is no evidence in a data room
 * that supports it.
 */

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'preSale', '/pre-sale');
}

export default async function PreSalePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('preSale');
  const s = await getTranslations('shared');

  return (
    <>
      <Breadcrumb path="/pre-sale" />

      <PageHeader
        title={t('header.title')}
        lead={t('header.lead')}
        cta={t('header.cta')}
        secondary={s('links.sprint')}
        secondaryHref="/diligence-sprint"
        footnote={s('ctaProof')}
        visual={2}
      />

      {/* Who runs this. Three shapes of seller, never a name. */}
      <Section width="medium" tone="inset" weight="loud">
        <SectionHeader title={t('who.title')} lead={t('who.lead')} />
        <div style={{ marginTop: 'clamp(28px, 4vw, 44px)' }}>
          <MediaCards
            items={t.raw('who.profiles') as { title: string; body: string }[]}
            scenes={PRESALE_PROFILES}
            wide
          />
        </div>
      </Section>

      {/* The argument: same read, other direction. */}
      <Section width="medium" tone="raised" weight="tight">
        <SectionHeader title={t('mirror.title')} lead={t('mirror.lead')} />
        <div style={{ marginTop: 'clamp(30px, 4vw, 48px)' }}>
          <Stepper steps={t.raw('mirror.steps') as { title: string; body: string }[]} />
        </div>
      </Section>

      {/* The part that belongs to a seller: the negative space in his own room.
          Set as a list rather than as cards, because these are four instances
          of one thing and a card grid would read them as four separate
          features. */}
      <Section width="medium">
        <SectionHeader title={t('gaps.title')} lead={t('gaps.lead')} />
        <Reveal delay={60} style={{ marginTop: 28 }}>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {(t.raw('gaps.items') as string[]).map((item) => (
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
        <Reveal>
          <p
            className="type-small"
            style={{ marginTop: 24, color: 'var(--text-quaternary)', maxWidth: '70ch' }}
          >
            {t('gaps.note')}
          </p>
        </Reveal>
      </Section>

      {/* What it is not. A seller weighing this is worried about exactly these
          five things, and hearing them from us first is worth more than being
          right about them later. */}
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
