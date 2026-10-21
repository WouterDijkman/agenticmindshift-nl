/**
 * Which decision pages ("guides") exist, and in which languages.
 *
 * Kept apart from lib/guides.ts on purpose: the language switcher is a client
 * component and needs to know these paths, but it must not pull the page copy
 * into the browser bundle to find out. Same split as apps/web.
 *
 * All five locales: every page on this site exists in every language
 * (Wouter, 21-10-2026). The list and the isGuideLocale guard stay so the
 * routing, sitemap and switcher code reads the same as apps/web. Slugs are
 * English in every language, as everywhere on this site.
 */
export const GUIDE_LOCALES = ['en', 'nl', 'de', 'es', 'pt'] as const;
export type GuideLocale = (typeof GUIDE_LOCALES)[number];

export const GUIDE_SLUGS = ['data-room-checklist', 'due-diligence-timeline', 'when-not-to-use-factum'] as const;
export type GuideSlug = (typeof GUIDE_SLUGS)[number];

export const GUIDE_PATHS = GUIDE_SLUGS.map((s) => `/${s}`);

export function isGuideLocale(locale: string): locale is GuideLocale {
  return (GUIDE_LOCALES as readonly string[]).includes(locale);
}

/** `pathname` without the locale prefix, as next-intl's usePathname returns it. */
export function isGuidePath(pathname: string): boolean {
  return (GUIDE_SLUGS as readonly string[]).includes(pathname.replace(/^\/+|\/+$/g, ''));
}
