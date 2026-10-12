/**
 * Which problem pages ("guides") exist, and in which languages.
 *
 * Kept apart from lib/guides.ts on purpose: the language switcher is a client
 * component and needs to know these paths, but it must not pull several
 * thousand words of page copy into the browser bundle to find out.
 *
 * The guides exist in Dutch and English only. The other three locales return
 * 404 for these paths, list no hreflang for them, and are left out of the
 * sitemap. Slugs are Dutch in both languages, as everywhere on this site.
 */
export const GUIDE_LOCALES = ['nl', 'en'] as const;
export type GuideLocale = (typeof GUIDE_LOCALES)[number];

export const GUIDE_SLUGS = ['im-en-teasers', 'maandrapportage', 'dealstukken-en-ai'] as const;
export type GuideSlug = (typeof GUIDE_SLUGS)[number];

export function isGuideLocale(locale: string): locale is GuideLocale {
  return (GUIDE_LOCALES as readonly string[]).includes(locale);
}

/** `pathname` without the locale prefix, as next-intl's usePathname returns it. */
export function isGuidePath(pathname: string): boolean {
  return (GUIDE_SLUGS as readonly string[]).includes(pathname.replace(/^\/+|\/+$/g, ''));
}
