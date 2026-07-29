import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/pageMetadata';
import { KVK } from '@/lib/site';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { Section } from '@/components/Section';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = await pageMetadata(locale, 'privacy', '/privacy');
  return { ...meta, robots: { index: false, follow: true } };
}

export default async function PrivacyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('privacy');
  const sections = t.raw('sections') as { title: string; body: string[] }[];

  return (
    <>
      <PageHeader
        eyebrow={t('header.eyebrow')}
        title={t('header.title')}
        lead={t('header.lead')}
      />

      <Section width="medium">
        <Reveal>
          <p className="type-small" style={{ color: 'var(--text-quaternary)' }}>
            {t('updated')}
          </p>
        </Reveal>

        {sections.map((section, i) => (
          <Reveal key={section.title} delay={40} style={{ marginTop: i === 0 ? 36 : 0 }}>
            <div className="hairline-top" style={{ paddingBlock: 'clamp(22px, 3vw, 32px)' }}>
              <h2 className="type-h3" style={{ fontSize: '1.375rem', marginBottom: 14 }}>
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="type-body measure" style={{ marginTop: 12 }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        ))}

        <Reveal delay={60} style={{ marginTop: 'clamp(28px, 4vw, 40px)' }}>
          <p className="type-small measure" style={{ color: 'var(--text-quaternary)' }}>
            {t('controller', { kvk: KVK })}
          </p>
        </Reveal>
      </Section>
    </>
  );
}
