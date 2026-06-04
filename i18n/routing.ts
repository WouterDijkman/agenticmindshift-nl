import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['nl', 'en', 'de', 'es', 'pt'],
  defaultLocale: 'nl',
  localePrefix: 'always'
});
