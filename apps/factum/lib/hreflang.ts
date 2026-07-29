import { routing } from '@/i18n/routing';
import { SITE_URL } from './site';

/**
 * hreflang lives here and nowhere else — `routing.alternateLinks` is off, so the
 * Metadata API is the single emitter. `path` is the locale-less route
 * ('' for the home page, '/platform' otherwise).
 */
export function getAlternates(path: string, currentLocale: string) {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] = `${SITE_URL}/${locale}${path}`;
  }
  languages['x-default'] = `${SITE_URL}/${routing.defaultLocale}${path}`;

  return {
    canonical: `${SITE_URL}/${currentLocale}${path}`,
    languages
  };
}
