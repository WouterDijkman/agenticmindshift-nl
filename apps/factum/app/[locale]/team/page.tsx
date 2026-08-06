import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/pageMetadata';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { Section, SectionHeader } from '@/components/Section';
import PersonCard from '@/components/PersonCard';
import StageList from '@/components/StageList';
import CtaBand from '@/components/CtaBand';
import GuaranteePanel from '@/components/GuaranteePanel';
import Breadcrumb from '@/components/Breadcrumb';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'team', '/team');
}

type Person = {
  name: string;
  title: string;
  bio: string;
  history: { org: string; role: string; period: string }[];
};

export default async function TeamPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('team');
  const s = await getTranslations('shared');
  const people = t.raw('people') as Person[];

  return (
    <>
      <Breadcrumb path="/team" />

      <PageHeader
        title={t('header.title')}
        lead={t('header.lead')}
        cta={t('header.cta')}
        secondary={s('links.governance')}
        secondaryHref="/governance"
        footnote={s('ctaProof')}
        visual={3}
      />

      <Section width="wide">
        <div
          style={{
            display: 'grid',
            gap: 'clamp(20px, 3vw, 32px)',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))'
          }}
        >
          {people.map((person, i) => (
            <Reveal key={person.name} delay={i * 70} style={{ height: '100%' }}>
              <PersonCard
                name={person.name}
                title={person.title}
                bio={person.bio}
                historyLabel={t('historyLabel')}
                history={person.history}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={140} style={{ marginTop: 'clamp(36px, 5vw, 56px)' }}>
          <blockquote className="source-quote" style={{ maxWidth: '58ch' }}>
            {t('closing')}
          </blockquote>
        </Reveal>
      </Section>

      {/*
        Accountability, which is the only thing a team page owes a buyer.

        The two cards above say where these people worked. They do not say who
        is answerable for what once an engagement is running, and that gap was
        most of why this page came to 281 words in two sections while every
        other page runs six to twelve. The third row is the one that matters:
        there is no bench behind us, and a mandate too big for two people plus
        the platform gets said so before anything is signed.
      */}
      <Section width="medium" tone="raised" weight="tight">
        <SectionHeader title={t('roles.title')} lead={t('roles.lead')} />
        <div style={{ marginTop: 'clamp(24px, 3vw, 36px)' }}>
          <StageList
            items={(t.raw('roles.items') as { label: string; body: string }[]).map((role) => ({
              title: role.label,
              body: role.body
            }))}
          />
        </div>
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
