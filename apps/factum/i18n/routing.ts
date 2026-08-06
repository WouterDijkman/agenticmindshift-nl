import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'nl', 'de', 'es', 'pt'],
  defaultLocale: 'en',
  localePrefix: 'always',
  // `/` is handled in proxy.ts, which rewrites it to `/en` so the bare domain
  // returns HTML rather than a redirect. Detection has to stay off or
  // next-intl redirects `/` on Accept-Language before that rewrite ever runs,
  // which makes the homepage's language depend on where it is requested from.
  localeDetection: false,
  // next-intl writes NEXT_LOCALE itself on every locale-prefixed request,
  // syncing it to whatever the URL says. Left on, a visitor who merely
  // followed a link to `/de` would be pinned to German for a year — and,
  // because proxy.ts honours the cookie at `/`, would be redirected off the
  // bare domain for that long too. A link click is not a language choice. The
  // cookie has exactly one author: the click handler in LanguageSwitcher.
  localeCookie: false,
  // hreflang is emitted once, through the Metadata API in lib/hreflang.ts.
  alternateLinks: false
});

export type Locale = (typeof routing.locales)[number];
