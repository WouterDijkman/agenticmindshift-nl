import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/site';

const PATHS = [
  { path: '', priority: 1 },
  { path: '/platform', priority: 0.9 },
  { path: '/diligence-sprint', priority: 0.9 },
  { path: '/governance', priority: 0.7 },
  { path: '/team', priority: 0.6 },
  { path: '/partnerships', priority: 0.6 },
  { path: '/contact', priority: 0.5 },
  { path: '/privacy', priority: 0.3 }
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
