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
 * x-default is the page Search shows a reader whose language is none of the
 * five, so it points at English. That reason stands on its own: a Finn is far
 * likelier to read English than Dutch.
 *
 * It is deliberately *not* the bare `/`, and that is worth spelling out
 * because the obvious argument runs the other way. `/` now renders rather than
 * redirects (see `proxy.ts`), so it is a real page and could in principle be
 * named here. Two reasons not to. First, hreflang annotations are supposed to
 * name canonical URLs, and `/` is not one — it serves the Dutch homepage and
 * canonicals to `/nl`. Naming a non-canonical URL invites Google to re-map or
 * ignore the annotation. Second, `/` is *Dutch* on this app, so pointing
 * x-default at it would hand the world's non-Dutch, non-German, non-Spanish,
 * non-Portuguese readers a Dutch page — which is the thing this line exists to
 * prevent.
 *
 * The residual asymmetry is real and small: a Finn who types the bare domain
 * gets Dutch, while a Finn who arrives from Search gets `/en`. Nobody types a
 * domain they have not heard of; Search is the entrance that matters, and the
 * header switcher is one click for the other case.
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
