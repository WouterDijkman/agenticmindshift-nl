/**
 * How a language choice is remembered, and nothing else.
 *
 * This module used to hold a locale *resolver* as well: a ladder of cookie,
 * then edge geo header, then `Accept-Language`, then English, called from both
 * apps' proxies to decide where to send a visitor who arrived at the bare `/`.
 * That ladder is gone, and it is worth writing down why, because it was
 * carefully built and it was still the wrong thing.
 *
 * It made `/` a redirect. Both live domains answered the bare URL with a 307
 * and `Vary: x-vercel-ip-country, cf-ipcountry, accept-language, cookie`, so
 * the single most-linked, most-shared and most-crawled URL on each site never
 * returned any HTML — and the language it pointed at depended on which country
 * the request came from. Googlebot crawls predominantly from one country, so
 * the highest-authority page on each domain was being sampled in whatever
 * language the geo table gave a US IP. Google's localisation guidance warns
 * against exactly this shape.
 *
 * `/` now renders the default locale directly, via a rewrite in each app's
 * `proxy.ts`, and carries a canonical to that locale's own URL. A visitor who
 * wants another language uses the header switcher, which is discoverable, is
 * one click, and — unlike a guess about a stranger — is a statement.
 *
 * What survives is the cookie, because a click is the only signal here that
 * unambiguously means "I want this language". It is written in exactly one
 * place, the switcher's `onClick`; nothing else may write it. next-intl's own
 * cookie sync must stay off (`localeCookie: false` in both routing configs) —
 * it writes this same cookie on every locale-prefixed request, which would
 * turn "you happened to land on /nl once" into a year-long verdict.
 */

/** The one cookie that records a language choice, and how long it lasts. */
export const LOCALE_COOKIE = 'NEXT_LOCALE';
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * Record an explicit language choice. Browser-only — call it from a click
 * handler, never during render or on the server.
 */
export function rememberLocale(locale: string): void {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
}
