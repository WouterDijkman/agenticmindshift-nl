import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['nl', 'en', 'de', 'es', 'pt'],
  defaultLocale: 'nl',
  localePrefix: 'always',
  // `/` is handled in proxy.ts, which rewrites it to `/nl` so the bare domain
  // returns HTML rather than a redirect. Detection has to stay off or
  // next-intl redirects `/` on Accept-Language before that rewrite ever runs,
  // which is precisely the country-dependent behaviour being removed.
  localeDetection: false,
  // next-intl writes NEXT_LOCALE itself on every locale-prefixed request,
  // syncing it to whatever the URL says. Left on, a visitor who merely
  // followed a link to `/de` would be pinned to German for a year — and,
  // because proxy.ts honours the cookie at `/`, would be redirected off the
  // bare domain for that long too. A link click is not a language choice. The
  // cookie has exactly one author: the click handler in LanguageSwitcher.
  localeCookie: false,
  // hreflang is emitted once, by the Metadata API in lib/hreflang.ts. Left on,
  // the middleware emits a second set as a Link header — the response for /en
  // was carrying both. Two answers to the same question is worse than either.
  alternateLinks: false
});

export type Locale = (typeof routing.locales)[number];
