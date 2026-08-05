import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['nl', 'en', 'de', 'es', 'pt'],
  defaultLocale: 'nl',
  localePrefix: 'always',
  // `/` is resolved in proxy.ts — cookie, then edge geo, then Accept-Language,
  // then English. next-intl must not also try, because the two disagree: its
  // answer is `defaultLocale`, which is Dutch, and a visitor from Bogotá
  // should not get Dutch.
  localeDetection: false,
  // hreflang is emitted once, by the Metadata API in lib/hreflang.ts. Left on,
  // the middleware emits a second set as a Link header — the response for /en
  // was carrying both. Two answers to the same question is worse than either.
  alternateLinks: false
});

export type Locale = (typeof routing.locales)[number];
