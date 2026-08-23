import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getAlternates } from './hreflang';
import { getOgImage } from './ogImage';
import { DISCIPLINE_COUNT, MODULE_COUNT, WAVE_COUNT } from './site';

/**
 * Every page carries its own title, description and reciprocal hreflang set.
 *
 * The brand suffix is appended here, once, for all eight pages. It used to come
 * from a `title.template` in the layout, which applies only to *child* route
 * segments — and `app/[locale]/page.tsx` is in the same segment as
 * `app/[locale]/layout.tsx`. The result was that every interior page carried
 * "— Factum Capital" and the homepage did not, which is exactly backwards on a
 * domain nobody has heard of.
 *
 * `absolute` rather than a plain string, so that if a template is ever
 * reintroduced upstream this cannot silently start doubling.
 *
 * `meta.*.title` is kept short enough in every locale that the suffix still
 * fits inside the ~60 characters Google renders. That budget is asserted by
 * `scripts/searchable-titles.py` rather than left to inspection.
 */
const BRAND = 'Factum Capital';

/**
 * BCP-47-ish territory tags for `og:locale`. Open Graph wants
 * `language_TERRITORY`, not the bare language code the routing layer uses.
 */
export const OG_LOCALES: Record<string, string> = {
  en: 'en_GB',
  nl: 'nl_NL',
  de: 'de_DE',
  es: 'es_ES',
  pt: 'pt_PT'
};

/**
 * The Open Graph fields that are identical on every page of one locale.
 *
 * Called by both the locale layout and `pageMetadata` below, because Next
 * merges `openGraph` *shallowly* and replaces duplicate keys wholesale: a page
 * that returns `openGraph: { url }` does not add a URL to the layout's object,
 * it replaces the object. Every page here calls `pageMetadata`, so before this
 * existed every page silently dropped `type`, `siteName` and `locale`, and the
 * seven interior routes also dropped the image.
 *
 * The image is the counter-intuitive part. File-based metadata is documented as
 * outranking `generateMetadata`, and it does — but only inside the segment that
 * owns the file. `opengraph-image.tsx` sits at `[locale]`, so Next injects it
 * into that segment's metadata only. `app/[locale]/page.tsx` shares the
 * segment and kept its image; `app/[locale]/platform/page.tsx` is a child and
 * lost it, along with `twitter:image`, which Next auto-fills from the Open
 * Graph images. Measured with curl across all 40 routes, not inferred.
 */
export function sharedOpenGraph(locale: string) {
  return {
    type: 'website' as const,
    siteName: BRAND,
    locale: OG_LOCALES[locale] ?? locale,
    alternateLocale: routing.locales
      .filter((l) => l !== locale)
      .map((l) => OG_LOCALES[l] ?? l),
    images: [getOgImage(locale)]
  };
}

/**
 * The roster counts, available to every description.
 *
 * Descriptions are the one place on the site where a number could sit outside
 * ICU and go unnoticed: nothing on the page renders them, so a stale total
 * survives every visual check and only shows up in a search result. The
 * /platform description read "22 modules" for as long as the roster held 22,
 * and stayed at 22 when the technology module split into IT and AI.
 *
 * Passed to every key rather than only the ones that use an argument. next-intl
 * ignores values a message does not reference, and a description that later
 * wants a count should not have to touch this function to get one.
 */
const ROSTER_ARGS = {
  modules: MODULE_COUNT,
  disciplines: DISCIPLINE_COUNT,
  waves: WAVE_COUNT
};

export async function pageMetadata(
  locale: string,
  key: string,
  path: string
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  const title = `${t(`${key}.title`)} — ${BRAND}`;
  const description = t(`${key}.description`, ROSTER_ARGS);
  const alternates = getAlternates(path, locale);

  return {
    title: { absolute: title },
    description,
    alternates,
    openGraph: {
      ...sharedOpenGraph(locale),
      title,
      description,
      // Read off the canonical rather than rebuilt from `path`, so og:url and
      // rel=canonical are the same string by construction.
      url: alternates.canonical
    }
  };
}
