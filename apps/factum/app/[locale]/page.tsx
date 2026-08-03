import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { pageMetadata } from '@/lib/pageMetadata';
import Hero from '@/components/Hero';
import MediaCards from '@/components/MediaCards';
import SegmentCard from '@/components/SegmentCard';
import Reveal from '@/components/Reveal';
import { Section, SectionHeader, SubHeader } from '@/components/Section';
import FindingSchema from '@/components/FindingSchema';
import Pipeline from '@/components/Pipeline';
import DisciplineGrid from '@/components/DisciplineGrid';
import Stepper from '@/components/Stepper';
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
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        lead={t('hero.lead')}
        cta={t('hero.cta')}
        secondary={t('hero.secondary')}
        secondaryHref="/platform"
        footnote={t('hero.footnote')}
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

      {/* The problem, then the artifact that answers it — one movement, one section. */}
      <Section id="anatomy">
        <Reveal>
          <span className="eyebrow eyebrow-accent" style={{ marginBottom: 22 }}>
            {t('problem.eyebrow')}
          </span>
          <h2 className="type-h2" style={{ maxWidth: '20ch' }}>
            {t('problem.title')}
          </h2>
          <p className="type-lead measure" style={{ marginTop: 28 }}>
            {t('problem.lead')}
          </p>
        </Reveal>

        <div style={{ marginTop: 'clamp(32px, 4.5vw, 56px)' }}>
          <MediaCards
            items={t.raw('problem.points') as { title: string; body: string }[]}
          />
        </div>

      </Section>

      {/* The guide: who is behind the read, and why that's the reason to trust it.
          Split-grid so the section carries a visual, like every other section on
          this page — flat text here was the one section that read as unfinished
          in the visual audit. */}
      <Section tone="inset">
        <div className="split-grid">
          <div>
            <SectionHeader
              eyebrow={t('guide.eyebrow')}
              title={t('guide.title')}
              lead={t('guide.lead')}
            />
            <Reveal delay={80} style={{ marginTop: 28 }}>
              <Link href="/team" className="link-quiet">
                {t('guide.link')}
                <ArrowRight />
              </Link>
            </Reveal>
          </div>
          <Reveal delay={60} className="media-card">
            <SegmentCard index={2} />
          </Reveal>
        </div>
      </Section>

      {/* How it works. */}
      <Section>
        <div className="split-grid">
          <div className="split-sticky">
            <SectionHeader
              eyebrow={t('pipeline.eyebrow')}
              title={t('pipeline.title')}
              lead={t('pipeline.lead')}
            />
            <Reveal delay={60}>
              <div className="panel panel-inset" style={{ marginTop: 32, padding: 22 }}>
                <span className="eyebrow" style={{ marginBottom: 14 }}>
                  {t('pipeline.refusalTitle')}
                </span>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 9 }}>
                  {(t.raw('pipeline.refusals') as string[]).map((item) => (
                    <li
                      key={item}
                      className="type-small"
                      style={{ display: 'flex', gap: 10, color: 'var(--text-secondary)' }}
                    >
                      <span aria-hidden="true" style={{ color: 'var(--wine-text)' }}>
                        &times;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="type-small" style={{ marginTop: 16, color: 'var(--text-quaternary)' }}>
                  {t('pipeline.refusalNote')}
                </p>
              </div>
            </Reveal>
          </div>

          <Pipeline stages={t.raw('pipeline.stages') as { title: string; body: string }[]} />
        </div>

        {/* Governance lives here because the heading says where it lives: in the pipeline. */}
        <div className="split-grid movement">
          <SubHeader
            eyebrow={t('trust.eyebrow')}
            title={t('trust.title')}
            lead={t('trust.lead')}
          >
            <div style={{ marginTop: 22 }}>
              <Link href="/governance" className="link-quiet">
                {t('trust.link')}
                <ArrowRight />
              </Link>
            </div>
          </SubHeader>

          {/* Same content as governance's data section (`shared.governancePoints`),
              given the same image-topped treatment for consistency — this used to
              render as a bare dl here while governance showed it with MediaCards,
              which read as two different levels of finish for identical copy. A
              different seed keeps the crops from matching card-for-card. */}
          <MediaCards
            items={s.raw('governancePoints') as { title: string; body: string }[]}
            seed={7}
          />
        </div>
      </Section>

      {/* Coverage. */}
      <Section>
        <SectionHeader
          eyebrow={t('coverage.eyebrow')}
          title={t('coverage.title')}
          lead={t('coverage.lead')}
          align="wide"
        />

        {/*
          The disciplines, not the sub-agent waffle that used to sit here. The
          claim in the heading is breadth, and a board of named disciplines
          proves breadth to a reader. A grid of anonymous squares proves a
          headcount, which is our fact rather than their problem.
        */}
        <div style={{ marginTop: 'clamp(32px, 4vw, 56px)' }}>
          <DisciplineGrid labels={s.raw('disciplines') as string[]} />
        </div>

        <Reveal>
          <p
            className="type-small"
            style={{ marginTop: 24, color: 'var(--text-quaternary)', maxWidth: '70ch' }}
          >
            {t('coverage.note')}
          </p>
        </Reveal>
      </Section>

      {/* The Diligence Sprint. */}
      <Section width="medium">
        <SectionHeader
          eyebrow={t('sprint.eyebrow')}
          title={t('sprint.title')}
          lead={t('sprint.lead')}
        />

        {/* The discipline chips used to repeat here. The coverage grid above
            already names every discipline, two sections earlier. */}
        <Reveal delay={90} style={{ marginTop: 36 }}>
          <div className="panel" style={{ padding: 'clamp(22px, 3vw, 34px)' }}>
            <span className="eyebrow eyebrow-accent" style={{ marginBottom: 14 }}>
              {t('sprint.guaranteeLabel')}
            </span>
            <p className="type-lead" style={{ color: 'var(--text-body)' }}>
              {t('sprint.guarantee')}
            </p>
            <p className="type-small" style={{ marginTop: 14, color: 'var(--text-quaternary)' }}>
              {t('sprint.guaranteeNote')}
            </p>
          </div>
        </Reveal>

        <Reveal delay={110} style={{ marginTop: 32 }}>
          <Link href="/diligence-sprint" className="link-quiet">
            {t('sprint.link')}
            <ArrowRight />
          </Link>
        </Reveal>

        {/* Where in the cycle the same engagement lands. */}
        <SubHeader
          className="movement"
          eyebrow={t('cycle.eyebrow')}
          title={t('cycle.title')}
          lead={t('cycle.lead')}
        />

        {/* Same rail component as `plan.steps` below and /partnerships' `start.steps` —
            this used to be a hand-rolled numbered list, the one place on the page that
            broke from the site's established "sequence" visual for no reason. */}
        <div style={{ marginTop: 'clamp(24px, 3vw, 36px)' }}>
          <Stepper steps={t.raw('cycle.stages') as { title: string; body: string }[]} />
        </div>

        <Reveal delay={80}>
          <p className="type-small" style={{ marginTop: 24, color: 'var(--text-quaternary)' }}>
            {t('cycle.note')}
          </p>
        </Reveal>
      </Section>

      {/*
        The reader's own three steps, immediately before the ask.
        The page explained our pipeline at length and never once explained
        theirs, which left the CTA asking for a decision the reader had no map
        for. This is the cheapest section on the page and probably the most
        load-bearing.
      */}
      <Section width="medium">
        <SectionHeader
          eyebrow={t('plan.eyebrow')}
          title={t('plan.title')}
          lead={t('plan.lead')}
        />
        <div style={{ marginTop: 'clamp(32px, 4vw, 48px)' }}>
          <Stepper steps={t.raw('plan.steps') as { title: string; body: string }[]} />
        </div>
      </Section>

      {/* The success beat: what's different after signing, not another capability list. */}
      <Section width="medium">
        <SectionHeader
          eyebrow={t('success.eyebrow')}
          title={t('success.title')}
          lead={t('success.lead')}
        />
        <div style={{ marginTop: 'clamp(32px, 4.5vw, 56px)' }}>
          <MediaCards
            items={t.raw('success.points') as { title: string; body: string }[]}
            seed={13}
          />
        </div>
        <Reveal delay={110} style={{ marginTop: 32 }}>
          <Link href="/platform#anatomy" className="link-quiet">
            {t('success.link')}
            <ArrowRight />
          </Link>
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
