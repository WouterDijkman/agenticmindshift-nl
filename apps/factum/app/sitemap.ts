import { contentLastModified } from '@/lib/seoRoutes';
import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/site';
import { GUIDE_LOCALES, GUIDE_PATHS } from '@/lib/guideRoutes';

const PATHS = [
  { path: '', priority: 1 },
  { path: '/platform', priority: 0.9 },
  { path: '/diligence-sprint', priority: 0.9 },
  { path: '/pre-sale', priority: 0.8 },
  { path: '/governance', priority: 0.7 },
  // The long-form reference page. Not in the header, so this and the footer
  // group are what a crawler has to go on. (/method merged into /platform.)
  { path: '/limits-of-ai', priority: 0.7 },
  { path: '/team', priority: 0.6 },
  // The conversion page: every primary button on the site lands here.
  { path: '/contact', priority: 0.8 },
  { path: '/privacy', priority: 0.3 }
];

export default function sitemap(): MetadataRoute.Sitemap {
  // The decision pages, in every locale that has their copy (all five).
  const guides = GUIDE_PATHS.flatMap((path) =>
    GUIDE_LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: contentLastModified(path, locale),
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries([
          ...GUIDE_LOCALES.map((alt) => [alt, `${SITE_URL}/${alt}${path}`]),
          ['x-default', `${SITE_URL}/${routing.defaultLocale}${path}`]
        ])
      }
    }))
  );

  const pages = PATHS.flatMap(({ path, priority }) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: contentLastModified(path, locale),
      priority,
      alternates: {
        languages: Object.fromEntries([
          ...routing.locales.map((alt) => [alt, `${SITE_URL}/${alt}${path}`]),
          ['x-default', `${SITE_URL}/${routing.defaultLocale}${path}`]
        ])
      }
    }))
  );

  return [...pages, ...guides];
}
