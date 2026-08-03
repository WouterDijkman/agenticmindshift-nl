import { MetadataRoute } from 'next';
import { BASE, LOCALES, getLanguageAlternates } from '@/lib/hreflang';

const pages = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/scorecard', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/werkwijze', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/over', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/factum-capital', priority: 0.7, changeFrequency: 'weekly' as const },
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
