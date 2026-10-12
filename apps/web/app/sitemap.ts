import { MetadataRoute } from 'next';
import { BASE, LOCALES, getLanguageAlternates } from '@/lib/hreflang';
import { GUIDE_LOCALES, GUIDE_SLUGS } from '@/lib/guideRoutes';

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
  const site = LOCALES.flatMap((locale) =>
    pages.map(({ path, priority, changeFrequency }) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: new Date(),
      priority,
      changeFrequency,
      alternates: { languages: getLanguageAlternates(path) },
    }))
  );

  // The problem pages exist in nl and en only, so they are listed in those
  // two and their alternates name only those two (plus x-default → en).
  const guides = GUIDE_LOCALES.flatMap((locale) =>
    GUIDE_SLUGS.map((slug) => ({
      url: `${BASE}/${locale}/${slug}`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'monthly' as const,
      alternates: { languages: getLanguageAlternates(`/${slug}`, GUIDE_LOCALES) },
    }))
  );

  return [...site, ...guides];
}
