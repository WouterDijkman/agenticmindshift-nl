import { routing } from '@/i18n/routing';
import { SITE_URL } from './site';

/**
 * hreflang lives here and nowhere else — `routing.alternateLinks` is off, so the
 * Metadata API is the single emitter. `path` is the locale-less route
 * ('' for the home page, '/platform' otherwise).
 *
 * x-default resolves to `/en`, which is also what the bare `/` renders since
 * `proxy.ts` started rewriting instead of redirecting. It stays written as
 * `/{defaultLocale}` rather than as `/` because hreflang should name canonical
 * URLs, and `/` is not one: it serves the English homepage and canonicals to
 * `/en`. Same page, one name for it.
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
