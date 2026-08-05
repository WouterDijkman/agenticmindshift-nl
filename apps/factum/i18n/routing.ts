import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'nl', 'de', 'es', 'pt'],
  defaultLocale: 'en',
  localePrefix: 'always',
  // `/` is resolved in proxy.ts instead — cookie, then edge geo, then
  // Accept-Language, then English. next-intl must not also try: its answer is
  // always `defaultLocale`, so a visitor from Bogotá would get English.
  // (The comment that used to sit here promised a dismissible language banner.
  // There is no banner and there never was; the switcher is in the header.)
  localeDetection: false,
  // next-intl writes NEXT_LOCALE itself on every locale-prefixed request,
  // syncing it to whatever the URL says. That silently undoes the rule above:
  // the geo redirect lands on `/nl`, next-intl pins `nl` for a year, and geo
  // is never consulted again. The cookie has exactly one author — the click
  // handler in LanguageSwitcher.
  localeCookie: false,
  // hreflang is emitted once, through the Metadata API in lib/hreflang.ts.
  alternateLinks: false
});

export type Locale = (typeof routing.locales)[number];
