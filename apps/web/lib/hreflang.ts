/**
 * Single source of truth for multilingual URL metadata: hreflang alternates,
 * canonicals and Open Graph locale tags. Both generateMetadata and sitemap.ts
 * read from here so the two can never disagree about a language tag.
 *
 * Usage in every page's generateMetadata({ params }):
 *
 *   import { getAlternates } from '@/lib/hreflang';
 *   ...
 *   alternates: getAlternates('/werkwijze', locale),
 */

export const BASE = 'https://www.agenticmindshift.nl';
export const LOCALES = ['nl', 'en', 'de', 'es', 'pt'] as const;

/**
 * Bare language subtags, deliberately without a region. The audience spans the
 * whole European mid-market, so `en-GB` would wrongly exclude other English
 * regions and `de-DE` would exclude AT/CH.
 */
export const LANG_TAGS: Record<string, string> = {
  nl: 'nl',
  en: 'en',
  de: 'de',
  es: 'es',
  pt: 'pt',
};

/** Open Graph wants a full territory tag, unlike hreflang. */
export const OG_LOCALES: Record<string, string> = {
  nl: 'nl_NL',
  en: 'en_GB',
  de: 'de_DE',
  es: 'es_ES',
  pt: 'pt_PT',
};

/**
 * Every locale variant of `path`, plus x-default.
 *
 * x-default is the page for a reader whose language is none of the five, so it
 * points at English. It used to point at Dutch, which was defensible only
 * while the proxy also fell back to Dutch. It does not any more — `/` now
 * resolves to English for anyone outside the five language areas — and the two
 * have to agree, or the crawler is told one thing and the visitor shown
 * another.
 */
export function getLanguageAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    languages[LANG_TAGS[loc]] = `${BASE}/${loc}${path}`;
  }
  languages['x-default'] = `${BASE}/en${path}`;
  return languages;
}

/**
 * Returns `alternates` for Next.js Metadata, including:
 * - a self-referencing canonical for `currentLocale`
 * - a `hreflang` entry for every locale
 * - an `x-default` pointing to the English variant
 */
export function getAlternates(path: string, currentLocale: string) {
  return {
    canonical: `${BASE}/${currentLocale}${path}`,
    languages: getLanguageAlternates(path),
  };
}
