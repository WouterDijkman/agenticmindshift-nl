/**
 * One page's worth of metadata: title, description, canonical, hreflang and
 * Open Graph, from a locale and a path.
 *
 * This exists because of a bug worth remembering. Every page already set its
 * own `alternates` via `getAlternates`, so canonicals were right. Open Graph
 * was set in exactly one place — the locale layout — including
 * `url: ${BASE}/${locale}`. Next merges `openGraph` from the layout into each
 * page, so all five interior routes advertised the *homepage* as their
 * canonical Open Graph URL. A shared link to /nl/werkwijze resolved, on
 * LinkedIn and X, to the homepage preview.
 *
 * Two things about Next's merge behaviour shape what this returns.
 *
 * First, `openGraph` is merged *shallowly* and duplicate keys are replaced
 * wholesale: a page that returns `openGraph: { url }` alone does not add a URL
 * to the layout's object, it replaces the object, silently dropping `type`,
 * `locale`, `alternateLocale` and `siteName`. So a page has to restate all of
 * them, which is what `sharedOpenGraph` is for — the layout and this helper
 * call the same function, so the two cannot drift.
 *
 * Second, `openGraph.title` and `openGraph.description` are deliberately *not*
 * set here. Next falls them back to the resolved `title` and `description` of
 * the same page, and the resolved title is the one that has already been
 * through the layout's `%s | Agentic Mindshift` template. Setting them here
 * from the raw `meta_title` would emit an untemplated og:title and quietly
 * change what every share card says. Verified against the live site: og:title
 * reads "Werkwijze | Agentic Mindshift" today with nothing setting it.
 *
 * The og:image, by contrast, *does* have to be set here, which is the one part
 * of this that is genuinely counter-intuitive. File-based metadata is
 * documented as outranking `generateMetadata`, and it does — but only within
 * the segment that owns the file. The image route lives at the `[locale]`
 * segment, so Next merges it into the *layout's* openGraph; a page that
 * defines its own openGraph replaces that object wholesale and the image goes
 * with it, taking `twitter:image` along because Next auto-fills the Twitter
 * images from the Open Graph ones. Restated from lib/ogImage.ts. Caught by
 * curl, not by the type-checker, which is why the verification sweep asserts
 * every og:* tag rather than just the one being fixed.
 *
 * Usage, from a page's generateMetadata:
 *
 *   export async function generateMetadata(
 *     { params }: { params: Promise<{ locale: string }> }
 *   ): Promise<Metadata> {
 *     const { locale } = await params;
 *     return pageMetadata(locale, 'werkwijze', '/werkwijze');
 *   }
 */

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { LOCALES, OG_LOCALES, getAlternates } from '@/lib/hreflang';
import { getOgImage } from '@/lib/ogImage';

/**
 * The Open Graph fields that are the same on every page of one locale.
 *
 * Called by both the locale layout and `pageMetadata` below. It has to be
 * repeated on each page rather than inherited because Next replaces the whole
 * `openGraph` object when a child segment defines one — see the note above.
 *
 * Because `images` is named here, the layout declares it too, so Next's
 * automatic injection of the file-based image is bypassed on every route
 * rather than on some of them. That uniformity is the point: the alternative
 * is a homepage whose og:image carries a build hash and five interior pages
 * whose og:image does not, which is the kind of difference nobody notices
 * until a scraper does.
 */
export function sharedOpenGraph(locale: string, siteName: string) {
  return {
    type: 'website' as const,
    locale: OG_LOCALES[locale],
    alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
    siteName,
    images: [getOgImage(locale)],
  };
}

/**
 * @param locale    the route's locale segment
 * @param namespace the messages namespace holding `meta_title` and
 *                  `meta_description` — by convention the page's own namespace
 * @param path      the path *below* the locale, no trailing slash; `''` for the
 *                  homepage
 */
export async function pageMetadata(
  locale: string,
  namespace: string,
  path: string
): Promise<Metadata> {
  const [t, tMeta] = await Promise.all([
    getTranslations({ locale, namespace }),
    getTranslations({ locale, namespace: 'meta' }),
  ]);

  const alternates = getAlternates(path, locale);

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates,
    openGraph: {
      ...sharedOpenGraph(locale, tMeta('site_name')),
      // Read off the canonical rather than rebuilt from `path`, so the two are
      // the same string by construction. This is the bug the file exists for;
      // a second template literal here would let it come back.
      url: alternates.canonical,
    },
  };
}
