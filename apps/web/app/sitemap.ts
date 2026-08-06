import { MetadataRoute } from 'next';
import { BASE, LOCALES, getLanguageAlternates } from '@/lib/hreflang';

/**
 * /scorecard is absent because it no longer exists. The questionnaire was
 * first unlinked from the nav and left running; it has since been deleted
 * outright, along with its API routes, its store and its PDF pipeline.
 *
 * /factum-capital is absent because it is gone — next.config.ts 308s it to
 * factumcapital.eu, which carries its own sitemap.
 */
const pages = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/werkwijze', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/over', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.6, changeFrequency: 'yearly' as const },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/voorwaarden', priority: 0.3, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    pages.map(({ path, priority, changeFrequency }) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: new Date(),
      priority,
      changeFrequency,
      alternates: { languages: getLanguageAlternates(path) },
    }))
  );
}
