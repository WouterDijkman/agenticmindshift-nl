import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { pageMetadata } from '@/lib/pageMetadata';
import { HOME_BAND, HOME_GUIDE, HOME_PROBLEM, HOME_SUCCESS } from '@/lib/scenes';
import Hero from '@/components/Hero';
import MediaCards from '@/components/MediaCards';
import SceneCard from '@/components/SceneCard';
import SceneBand from '@/components/SceneBand';
import Reveal from '@/components/Reveal';
import { Section, SectionHeader, SubHeader } from '@/components/Section';
import FindingSchema from '@/components/FindingSchema';
import Specimen from '@/components/Specimen';
import DisciplineIndex from '@/components/DisciplineIndex';
import InlineCta from '@/components/InlineCta';
import Stepper from '@/components/Stepper';
import StageList from '@/components/StageList';
import GuaranteeBand from '@/components/GuaranteeBand';
import GuaranteePanel from '@/components/GuaranteePanel';
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

/**
 * The homepage ran to 1,416 words across seven sections, and used the same
 * three components to do it: three `MediaCards` grids, two `Stepper` rails
 * (the deal cycle is a `StageList` now, for the reasons in that file),
 * and an eyebrow-h2-lead opening on every one. The two things it repeated
 * hardest were not even its own — the ten-discipline grid also fills half of
 * /diligence-sprint (the two pages shared 31% of their content), and the four
 * governance cards are rendered verbatim on /governance.
 *
 * What replaces it is one rule, taken from the only site in the reference set
 * that never breaks it: **one module, one section, spent once.** Hebbia's
 * homepage runs eight sections and eight distinct layout modules. So the
 * discipline grid goes back to the sprint page and leaves an index here; the
 * governance cards go back to /governance and leave a link; and the two beats
 * that had nothing of their own — the reframe and the worked example — get the
 * page's only full-bleed photograph and its only feature-weight section.
 *
 * `Specimen` has moved here from /platform. It is the most persuasive object
 * this site owns: a real clause on the left, the finding it produced on the
 * right, a line tying them together. It was four scrolls deep on a page a cold
 * visitor never reaches. /platform keeps the mechanism — dispatch, grounding,
 * the comparison — and this page keeps the output, which also settles the 101
 * shared phrases the two of them used to have in common.
 */
export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const s = await getTranslations('shared');

  return (
    <>
      <Hero
        title={t('hero.title')}
        lead={t('hero.lead')}
        cta={t('hero.cta')}
        /* Was "See what a finding looks like", pointing at /platform. The
           finding it promised has since moved onto this page, so the link
           would have sent a reader away from the thing it named. It now says
           what /platform actually still holds — the mechanism — using the
           same shared label the other five pages use for it. */
        secondary={s('links.platform')}
        secondaryHref="/platform"
        /* No footnote here. `shared.ctaProof` is the findings guarantee in one
           line, and the GuaranteeBand directly below states the same promise
           at full size with its condition spoken. Both, a hundred pixels
           apart, made the page say it three times before the first argument —
           twice here and once more beside the closing button. The inner pages
           carry no band and still pass it. */
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

      {/* The guarantee, before anything else has to be believed. */}
      <GuaranteeBand
        label={s('guarantee.label')}
        guarantee={s('guarantee.claim')}
        note={s('guarantee.note')}
      />

      {/* The problem. Two cards, not four: the third and fourth were the same
          argument as the first two with different nouns, and a four-up grid is
          the shape this page used three times. */}
      <Section id="problem">
        <SectionHeader title={t('problem.title')} lead={t('problem.lead')} />
        <div style={{ marginTop: 'clamp(32px, 4.5vw, 56px)' }}>
          <MediaCards
            items={t.raw('problem.points') as { title: string; body: string }[]}
            scenes={HOME_PROBLEM}
          />
        </div>
      </Section>

      {/*
        The reframe, as the page's only full-bleed image.

        This line has to arrive before the reader concludes we are arguing
        their adviser did a bad job — the person weighing us up is often the
        adviser. It used to be a blockquote at the bottom of the section above,
        which is where a sentence goes to be skipped.

        It is also the answer to the other half of the complaint. The site owns
        nineteen macro stills and rendered every one of them at a third of the
        viewport inside a card. This is the first time one of them is the
        section rather than a decoration inside it.
      */}
      <SceneBand id={HOME_BAND} line={s('reframe.quote')} attribution={t('reframe.attr')} />

      {/* Who is behind the read. Raised band — the first change of ground on
          the page, and it lands on the section that is about people. */}
      <Section tone="raised" weight="tight">
        <div className="split-grid">
          <div>
            <SectionHeader title={t('guide.title')} lead={t('guide.lead')} />
            <Reveal delay={80} style={{ marginTop: 28 }}>
              <Link href="/team" className="link-quiet">
                {t('guide.link')}
                <ArrowRight />
              </Link>
            </Reveal>
          </div>
          <Reveal delay={60} className="media-card">
            <SceneCard id={HOME_GUIDE} />
          </Reveal>
        </div>
      </Section>

      {/*
        The worked example. The one feature-weight section on the page.

        Van Dijk's objection to every pre-launch B2B site is the one this
        answers: "I'm not going to book a demo without getting a taste of what
        the product looks like." With no client cases to show, a constructed
        specimen on a fictional target — labelled as constructed — is the
        closest honest equivalent, and it is worth more screen than anything
        else here.
      */}
      <Section id="anatomy" tone="inset" weight="loud">
        <SectionHeader title={t('specimen.title')} lead={t('specimen.lead')} />
        <div style={{ marginTop: 'clamp(36px, 4.5vw, 60px)' }}>
          {/* Row keys are the output contract, shared with the hero schema; the
              values are the worked example. The contract stays abstract so this
              can stay concrete. */}
          <Specimen
            pageLabel={s('specimen.pageLabel')}
            pageRef={s('specimen.pageRef')}
            highlightLabel={s('specimen.highlight')}
            findingLabel={s('specimen.findingLabel')}
            quote={s('specimen.quote')}
            tag={s('specimen.tag')}
            footnote={s('specimen.footnote')}
            rows={[
              { key: s('schema.rows.module'), value: s('specimen.values.module') },
              { key: s('schema.rows.finding'), value: s('specimen.values.finding') },
              { key: s('schema.rows.evidence'), value: s('specimen.values.evidence') },
              { key: s('schema.rows.document'), value: s('specimen.values.document') },
              { key: s('schema.rows.review'), value: s('specimen.values.review') }
            ]}
          />
        </div>
      </Section>

      {/*
        How it runs, and the governance that runs with it.

        The `Pipeline` rail that filled the right column here is gone. Its five
        stages were a shortened retelling of the five on /platform — same
        titles, same order, the bodies clipped by a clause each — which is the
        one thing this rebuild was meant to stop. /platform keeps them.

        What is left is the half that is only here: the loop's refusal
        conditions. It is also the more useful half. Anyone can list the steps
        a pipeline takes; what a buyer wants to know is what it refuses to do
        on its own, and that answer belongs on the page a cold reader sees.

        The four governance cards used to be duplicated here from /governance
        too; a heading and a link do the same job at a twentieth of the length.
      */}
      <Section>
        <div className="split-grid">
          <div>
            <SectionHeader title={t('pipeline.title')} lead={t('pipeline.lead')} />
            <Reveal delay={80} style={{ marginTop: 28 }}>
              <Link href="/platform" className="link-quiet">
                {s('links.platform')}
                <ArrowRight />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={60}>
            <div className="panel panel-inset" style={{ padding: 'clamp(22px, 3vw, 32px)' }}>
              <span className="eyebrow" style={{ marginBottom: 16 }}>
                {t('pipeline.refusalTitle')}
              </span>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {(t.raw('pipeline.refusals') as string[]).map((item, i) => (
                  <li
                    key={item}
                    className="type-body"
                    style={{
                      display: 'flex',
                      gap: 14,
                      paddingBlock: 13,
                      borderTop: i === 0 ? 'none' : '1px solid var(--hairline-faint)'
                    }}
                  >
                    <span aria-hidden="true" style={{ color: 'var(--wine-text)', paddingTop: 2 }}>
                      &times;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="type-small" style={{ marginTop: 18, color: 'var(--text-quaternary)' }}>
                {t('pipeline.refusalNote')}
              </p>
            </div>
          </Reveal>
        </div>

        <SubHeader className="movement" title={t('trust.title')} lead={t('trust.lead')}>
          <div style={{ marginTop: 22 }}>
            <Link href="/governance" className="link-quiet">
              {t('trust.link')}
              <ArrowRight />
            </Link>
          </div>
        </SubHeader>
      </Section>

      {/* Coverage, as an index rather than as ten arguments. The arguments are
          on /diligence-sprint, where the reader has already asked for them. */}
      <Section weight="tight">
        <SectionHeader title={t('coverage.title')} lead={t('coverage.lead')} align="wide" />
        <div style={{ marginTop: 'clamp(28px, 3.5vw, 44px)' }}>
          <DisciplineIndex
            items={s.raw('disciplines') as { label: string; pain: string; result: string }[]}
          />
        </div>
        <Reveal>
          <p
            className="type-small"
            style={{ marginTop: 20, color: 'var(--text-quaternary)', maxWidth: '70ch' }}
          >
            {t('coverage.note')}
          </p>
        </Reveal>
        <InlineCta
          line={t('coverage.ctaLine')}
          cta={s('links.intake')}
          location="home-coverage"
        />
      </Section>

      {/* Where in the cycle the same engagement lands, and the link to the
          engagement itself. These were two sections; the second one was a
          heading, a link and nothing else. */}
      <Section width="medium" tone="raised">
        <SectionHeader title={t('cycle.title')} lead={t('cycle.lead')} />
        <div style={{ marginTop: 'clamp(24px, 3vw, 36px)' }}>
          <StageList items={t.raw('cycle.stages') as { title: string; body: string }[]} />
        </div>
        <Reveal delay={80} style={{ marginTop: 28 }}>
          <Link href="/diligence-sprint" className="link-quiet">
            {t('cycle.link')}
            <ArrowRight />
          </Link>
        </Reveal>
      </Section>

      {/* What's different afterwards. Two cards; the third made the same point
          as the specimen section, with a picture instead of the evidence. */}
      <Section width="medium">
        <SectionHeader title={t('success.title')} lead={t('success.lead')} />
        <div style={{ marginTop: 'clamp(32px, 4.5vw, 56px)' }}>
          <MediaCards
            items={t.raw('success.points') as { title: string; body: string }[]}
            scenes={HOME_SUCCESS}
          />
        </div>
      </Section>

      {/* The reader's own three steps, immediately before the ask. The page
          explains our pipeline at length and used to never explain theirs,
          which left the CTA asking for a decision with no map for it. */}
      <Section width="medium" weight="tight">
        <SectionHeader title={t('plan.title')} lead={t('plan.lead')} />
        <div style={{ marginTop: 'clamp(28px, 3.5vw, 44px)' }}>
          <Stepper steps={t.raw('plan.steps') as { title: string; body: string }[]} />
        </div>
      </Section>

      <CtaBand
        title={t('cta.title')}
        body={t('cta.body')}
        cta={t('cta.button')}
        note={s('guarantee.note')}
        aside={<GuaranteePanel label={s('guarantee.label')} claim={s('guarantee.claim')} />}
      />
    </>
  );
}
