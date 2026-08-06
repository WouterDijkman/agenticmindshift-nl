import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { pageMetadata } from '@/lib/pageMetadata';
import { WAVE_SIZES } from '@/lib/site';
import PageHeader from '@/components/PageHeader';
import { Section, SectionHeader } from '@/components/Section';
import DefinitionList from '@/components/DefinitionList';
import Stepper from '@/components/Stepper';
import Reveal from '@/components/Reveal';
import CtaBand from '@/components/CtaBand';
import GuaranteePanel from '@/components/GuaranteePanel';
import Breadcrumb from '@/components/Breadcrumb';
import { ArrowRight, Check } from '@/components/Icons';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'aiLimits', '/limits-of-ai');
}

/**
 * The second reference page. Not in the header — see `REFERENCE_NAV`.
 *
 * A vendor page arguing the limits of its own category looks like a strange
 * thing to publish until you notice what the site already does everywhere else:
 * /platform prints seven things it does not claim, /governance prints six more,
 * and the one benchmark on the site is published with its caveats attached. The
 * missing piece was the general version — not "here is what our build has not
 * got yet" but "here is what this class of tool does not do at all". That is
 * the objection the buyer already holds, and the only two options are to answer
 * it here or to have it answered for us somewhere we are not present.
 *
 * The fourth section is what stops the page being AI-scepticism theatre. Having
 * spent five items on what the machine cannot do, it spends three on what it is
 * better at than a team under deadline. An argument that only runs one way is
 * marketing wearing an honest coat.
 */
export default async function LimitsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('aiLimits');
  const s = await getTranslations('shared');

  const limits = (t.raw('limits.items') as { title: string; body: string; human: string }[]).map(
    (item) => ({ title: item.title, body: item.body, note: item.human })
  );

  const machine = (t.raw('machine.items') as { title: string }[]).map((item, i) => ({
    title: item.title,
    // Wave one's size is an ICU argument, not a typed number: the parallelism
    // claim is only true for as long as MODULES says it is.
    body: t(`machine.items.${i}.body`, { first: WAVE_SIZES[0] })
  }));

  return (
    <>
      <Breadcrumb path="/limits-of-ai" />

      <PageHeader
        title={t('header.title')}
        lead={t('header.lead')}
        cta={t('header.cta')}
        secondary={s('links.governance')}
        secondaryHref="/governance"
        visual={7}
      />

      {/* The five limits, each with the person who does that work instead.
          Same object as the output contract on /method, which is deliberate —
          the two reference pages are a pair and read as one. */}
      <Section width="medium" tone="inset" weight="loud">
        <SectionHeader title={t('limits.title')} lead={t('limits.lead')} />
        <div style={{ marginTop: 'clamp(28px, 3.5vw, 44px)' }}>
          <DefinitionList items={limits} noteLabel={t('limits.humanLabel')} />
        </div>
        <Reveal>
          <p
            className="type-small"
            style={{ marginTop: 22, color: 'var(--text-quaternary)', maxWidth: '70ch' }}
          >
            {t('limits.note')}
          </p>
        </Reveal>
      </Section>

      {/* Why the gate is mandatory, as the conclusion of the section above
          rather than as a claim of its own. */}
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
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {(t.raw('gate.items') as string[]).map((item, i) => (
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
                    <span
                      aria-hidden="true"
                      style={{ color: 'var(--wine-text)', paddingTop: 4, flexShrink: 0 }}
                    >
                      <Check size={13} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* The other direction. Three panels, not cards: the page has already
          spent its one hairline list, and a photograph here would soften an
          argument that works better bare. */}
      <Section width="medium">
        <SectionHeader title={t('machine.title')} lead={t('machine.lead')} />
        <div className="split-grid-thirds" style={{ marginTop: 'clamp(28px, 3.5vw, 44px)' }}>
          {machine.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="panel" style={{ padding: 'clamp(22px, 2.6vw, 30px)', height: '100%' }}>
                <h3 className="type-h4" style={{ color: 'var(--text-display)' }}>
                  {item.title}
                </h3>
                <p className="type-body" style={{ marginTop: 12 }}>
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The takeaway a reader can use on someone else. This is the section
          that earns the page a link from outside. */}
      <Section width="medium" weight="tight">
        <SectionHeader title={t('ask.title')} lead={t('ask.lead')} />
        <div style={{ marginTop: 'clamp(28px, 3.5vw, 44px)' }}>
          <Stepper steps={t.raw('ask.items') as { title: string; body: string }[]} />
        </div>
        <Reveal delay={80} style={{ marginTop: 28 }}>
          <Link href="/method" className="link-quiet">
            {t('ask.link')}
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
