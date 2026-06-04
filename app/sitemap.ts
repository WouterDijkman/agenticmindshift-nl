import { MetadataRoute } from 'next';

const base = 'https://www.agenticmindshift.nl';
const locales = ['nl', 'en', 'de', 'es', 'pt'];

const pages = [
  { path: '', priority: 1.0 },
  { path: '/werkwijze', priority: 0.8 },
  { path: '/over', priority: 0.7 },
  { path: '/factum-capital', priority: 0.7 },
  { path: '/contact', priority: 0.6 },
  { path: '/privacy', priority: 0.3 },
  { path: '/voorwaarden', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const localeEntries = locales.flatMap((locale) =>
    pages.map(({ path, priority }) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
      priority,
    }))
  );

  return [
    { url: `${base}/scorecard`, lastModified: new Date(), priority: 0.9 },
    ...localeEntries,
  ];
}
