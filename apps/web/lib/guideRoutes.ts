/**
 * Which problem pages ("guides") exist, and in which languages.
 *
 * Kept apart from lib/guides.ts on purpose: the language switcher is a client
 * component and needs to know these paths, but it must not pull several
 * thousand words of page copy into the browser bundle to find out.
 *
 * The guides exist in all five locales (Wouter, 21-10-2026: every page in
 * every language). Slugs are Dutch in every language, as everywhere on this
 * site.
 */
export const GUIDE_LOCALES = ['nl', 'en', 'de', 'es', 'pt'] as const;
export type GuideLocale = (typeof GUIDE_LOCALES)[number];

// 'ai-in-due-diligence' (12-11-2026): the buy-side question a PE partner asks
// before he knows tools exist (GTM/ops/geo-seo-audit-2026-11-12.md, M5, §5.3).
export const GUIDE_SLUGS = ['im-en-teasers', 'maandrapportage', 'dealstukken-en-ai', 'ai-in-due-diligence'] as const;
export type GuideSlug = (typeof GUIDE_SLUGS)[number];

export function isGuideLocale(locale: string): locale is GuideLocale {
  return (GUIDE_LOCALES as readonly string[]).includes(locale);
}

/** `pathname` without the locale prefix, as next-intl's usePathname returns it. */
export function isGuidePath(pathname: string): boolean {
  return (GUIDE_SLUGS as readonly string[]).includes(pathname.replace(/^\/+|\/+$/g, ''));
}
