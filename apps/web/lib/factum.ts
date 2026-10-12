/**
 * The one outbound link that has to work.
 *
 * Three places on this site point at Factum: the footer, the homepage banner
 * and the /over timeline. All three used to write `https://factumcapital.eu`,
 * which costs two redirects before a byte of HTML arrives — a 308 to `www` and
 * then a 307 from `/` to a locale that the edge guesses from the visitor's
 * country. For a human that is a shrug. For a crawler it is the link that is
 * supposed to tell Google that the two sites belong together, and it is the
 * weakest possible version of that signal. "Together" means related, not the
 * same organisation: Factum is co-owned and a separate business, which is why
 * lib/jsonld.ts no longer lists it under this site's `sameAs`.
 *
 * Both sites ship the same five locales (`nl en de es pt`, see the two
 * `i18n/routing.ts` files), so the locale can be carried straight across and
 * the reader lands on the language they were already reading, first hop.
 *
 * If the two locale sets ever diverge, this is the thing that breaks: an
 * unknown locale on factumcapital.eu is a 404, not a fallback. Hence the
 * explicit list rather than interpolating whatever string arrives.
 */
const FACTUM_LOCALES = new Set(['en', 'nl', 'de', 'es', 'pt']);

const FACTUM_ORIGIN = 'https://www.factumcapital.eu';

/**
 * Absolute URL to Factum in the reader's own language, no redirect hops, and
 * tagged so Factum's analytics can tell an arrival from here apart from
 * direct traffic.
 *
 * `placement` becomes `utm_campaign` and names the spot on this site the click
 * came from (`footer`, `banner`, `about-bio`). It matches the
 * `plausible-event-location` on the same link, so the click counted here and
 * the visit counted there carry the same label. Without UTM, and with
 * `noreferrer` on the footer link, every visitor this site sent across showed
 * up on factumcapital.eu as "direct" (audit 12-10-2026, §5).
 */
export function factumUrl(locale: string, placement = 'site'): string {
  const base = FACTUM_LOCALES.has(locale)
    ? `${FACTUM_ORIGIN}/${locale}`
    : `${FACTUM_ORIGIN}/en`;
  const query = new URLSearchParams({
    utm_source: 'agenticmindshift',
    utm_medium: 'referral',
    utm_campaign: placement,
  });
  return `${base}?${query.toString()}`;
}

/** What we show for it. The address, without the scheme or the `www`. */
export const FACTUM_LABEL = 'factumcapital.eu';
