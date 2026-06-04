import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('privacy');
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations('privacy');

  return (
    <section className="container-narrow py-20">
      <p
        className="text-xs uppercase mb-4"
        style={{ color: 'var(--accent-primary)', letterSpacing: '0.18em' }}
      >
        {t('legal_label')}
      </p>
      <h1 className="h-1 mb-3">{t('heading')}</h1>
      <p className="mb-10 text-sm hint-italic" style={{ color: 'var(--text-muted)' }}>
        {t('last_modified')}
      </p>

      <div
        className="flex flex-col gap-6 text-base measure"
        style={{ color: 'var(--text-tertiary)', lineHeight: 1.7 }}
      >
        <p>{t('intro')}</p>

        <h2 className="text-xl mt-4">{t('s1_heading')}</h2>
        <p>{t('s1_body')}</p>

        <h2 className="text-xl mt-4">{t('s2_heading')}</h2>
        <p>{t('s2_body')}</p>

        <h2 className="text-xl mt-4">{t('s3_heading')}</h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>{t('s3_li1')}</li>
          <li>{t('s3_li2')}</li>
          <li>{t('s3_li3')}</li>
          <li>{t('s3_li4')}</li>
        </ul>

        <h2 className="text-xl mt-4">{t('s4_heading')}</h2>
        <p>{t('s4_body')}</p>

        <h2 className="text-xl mt-4">{t('s5_heading')}</h2>
        <p>{t('s5_body')}</p>

        <h2 className="text-xl mt-4">{t('s6_heading')}</h2>
        <p>{t('s6_body')}</p>

        <h2 className="text-xl mt-4">{t('s7_heading')}</h2>
        <p>{t('s7_body')}</p>

        <h2 className="text-xl mt-4">{t('s8_heading')}</h2>
        <p>{t('s8_body')}</p>

        <h2 className="text-xl mt-4">{t('s9_heading')}</h2>
        <p>{t('s9_body')}</p>
      </div>
    </section>
  );
}
