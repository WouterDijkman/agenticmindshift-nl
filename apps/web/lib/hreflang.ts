/**
 * Hreflang helper for multilingual metadata.
 *
 * Usage in every page's generateMetadata({ params }):
 *
 *   import { getAlternates } from '@/lib/hreflang';
 *   ...
 *   alternates: getAlternates('/werkwijze', locale),
 */

const BASE = 'https://www.agenticmindshift.nl';
const LOCALES = ['nl', 'en', 'de', 'es', 'pt'] as const;

// BCP-47 language tag mapped to locale code
const LANG_TAGS: Record<string, string> = {
  nl: 'nl',
  en: 'en',
  de: 'de',
  es: 'es',
  pt: 'pt',
};

/**
 * Returns `alternates` for Next.js Metadata, including:
 * - a self-referencing canonical for `currentLocale`
 * - a `hreflang` entry for every locale
 * - an `x-default` pointing to the Dutch (default) variant
 */
export function getAlternates(path: string, currentLocale: string) {
  const languages: Record<string, string> = {};

  for (const loc of LOCALES) {
    languages[LANG_TAGS[loc]] = `${BASE}/${loc}${path}`;
  }

  // x-default = primary/Dutch version
  languages['x-default'] = `${BASE}/nl${path}`;

  return {
    canonical: `${BASE}/${currentLocale}${path}`,
    languages,
  };
}
