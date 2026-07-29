import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/pageMetadata';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { Section } from '@/components/Section';
import PersonCard from '@/components/PersonCard';
import CtaBand from '@/components/CtaBand';

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
  const people = t.raw('people') as Person[];

  return (
    <>
      <PageHeader
        eyebrow={t('header.eyebrow')}
        title={t('header.title')}
        lead={t('header.lead')}
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

      <CtaBand
        title={t('cta.title')}
        body={t('cta.body')}
        cta={t('cta.button')}
        note={t('cta.note')}
      />
    </>
  );
}
