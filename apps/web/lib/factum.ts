/**
 * The one outbound link that has to work.
 *
 * Three places on this site point at Factum: the footer, the homepage banner
 * and the /over timeline. All three used to write `https://factumcapital.eu`,
 * which costs two redirects before a byte of HTML arrives — a 308 to `www` and
 * then a 307 from `/` to a locale that the edge guesses from the visitor's
 * country. For a human that is a shrug. For a crawler it is the link that is
 * supposed to tell Google that Agentic Mindshift and Factum Capital are the
 * same organisation, and it is the weakest possible version of that signal:
 * a brand search currently surfaces Wouter's LinkedIn and neither website.
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

/** Absolute URL to Factum in the reader's own language, no redirect hops. */
export function factumUrl(locale: string): string {
  return FACTUM_LOCALES.has(locale)
    ? `${FACTUM_ORIGIN}/${locale}`
    : `${FACTUM_ORIGIN}/en`;
}

/** What we show for it. The address, without the scheme or the `www`. */
export const FACTUM_LABEL = 'factumcapital.eu';
