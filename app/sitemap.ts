import { MetadataRoute } from 'next';

const base = 'https://www.agenticmindshift.nl';
const locales = ['nl', 'en', 'de', 'es', 'pt'] as const;

// Map from locale to BCP-47 language tag for hreflang
const hreflangMap: Record<string, string> = {
  nl: 'nl-NL',
  en: 'en-GB',
  de: 'de-DE',
  es: 'es-ES',
  pt: 'pt-PT',
};

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
  return locales.flatMap((locale) =>
    pages.map(({ path, priority, changeFrequency }) => {
      // Build hreflang alternates for every locale
      const languages: Record<string, string> = {};
      for (const loc of locales) {
        languages[hreflangMap[loc]] = `${base}/${loc}${path}`;
      }
      // x-default points to the Dutch (primary) version
      languages['x-default'] = `${base}/nl${path}`;

      return {
        url: `${base}/${locale}${path}`,
        lastModified: new Date(),
        priority,
        changeFrequency,
        alternates: { languages },
      };
    })
  );
}
