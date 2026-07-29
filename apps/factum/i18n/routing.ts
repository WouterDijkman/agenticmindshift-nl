import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'nl', 'de', 'es', 'pt'],
  defaultLocale: 'en',
  localePrefix: 'always',
  // URLs stay deterministic: `/` always resolves to `/en` rather than guessing
  // from cookie or Accept-Language. A dismissible banner offers the switch instead.
  localeDetection: false,
  // hreflang is emitted once, through the Metadata API in lib/hreflang.ts.
  alternateLinks: false
});

export type Locale = (typeof routing.locales)[number];
