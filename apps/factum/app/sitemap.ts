import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/site';

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
  { path: '/contact', priority: 0.8 }
  // No /privacy: the page is `noindex, follow` (privacy/page.tsx), and a
  // sitemap should list only URLs we ask to have indexed.
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap(({ path, priority }) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      priority,
      alternates: {
        languages: Object.fromEntries([
          ...routing.locales.map((alt) => [alt, `${SITE_URL}/${alt}${path}`]),
          ['x-default', `${SITE_URL}/${routing.defaultLocale}${path}`]
        ])
      }
    }))
  );
}
