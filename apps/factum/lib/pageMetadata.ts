import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getAlternates } from './hreflang';
import { SITE_URL } from './site';

/** Every page carries its own title, description and reciprocal hreflang set. */
export async function pageMetadata(
  locale: string,
  key: string,
  path: string
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t(`${key}.title`),
    description: t(`${key}.description`),
    alternates: getAlternates(path, locale),
    openGraph: {
      title: `${t(`${key}.title`)} — Factum Capital`,
      description: t(`${key}.description`),
      url: `${SITE_URL}/${locale}${path}`
    }
  };
}
