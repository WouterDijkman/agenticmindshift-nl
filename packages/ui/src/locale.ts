/**
 * Which language a visitor gets when they did not ask for one.
 *
 * Both sites run the same five locales and the same rule, so the rule lives
 * once. Only the bare `/` is ever resolved this way — a URL that already names
 * a locale is served in that locale, always, or deep links and crawlers break.
 *
 * The order of evidence, best first:
 *
 *   1. `NEXT_LOCALE` cookie — the visitor has already chosen. Nothing outranks
 *      an explicit choice, including a geo header that disagrees with it.
 *      The cookie is written in exactly one place: the language switcher's
 *      click handler. Nothing else may write it. It used to be set on the geo
 *      redirect too, which quietly turned a guess into a year-long verdict —
 *      one visit through an airport wifi in Frankfurt and the site spoke
 *      German until the cookie expired. A guess must stay a guess, so geo is
 *      re-read on every visit and only a click is remembered.
 *   2. Edge geo header (`x-vercel-ip-country`, or `cf-ipcountry` behind
 *      Cloudflare). This is what the brief asks for: a Colombian gets Spanish.
 *   3. `Accept-Language`. Weaker than geo for this audience — a Dutch partner
 *      on an English-configured laptop wants Dutch — but far better than a
 *      coin flip, and it is the only signal that survives a missing geo header
 *      (local dev, self-hosting, a proxy that strips it).
 *   4. `en`. Not the site's `defaultLocale`, which is Dutch on one of the two
 *      apps: a visitor from outside the five language areas is likelier to
 *      read English than Dutch.
 *
 * Note that Next 16's `NextRequest` no longer exposes `.geo` or `.ip`. Geo has
 * to come off the headers the host sets, which is why this takes a plain
 * header getter rather than a request object.
 */

/**
 * Country → language. Deliberately not exhaustive: an unlisted country falls
 * through to Accept-Language, which is a better guess than a wrong map entry.
 *
 * Two judgement calls worth naming. BE is roughly 60/40 Dutch/French and we do
 * not publish French, so it maps to Dutch — a Walloon reader gets a language
 * they probably read rather than one they certainly do not. CH maps to German
 * on the same logic. Both are overridable in one click, and the choice sticks
 * in the cookie.
 */
export const COUNTRY_TO_LANGUAGE: Readonly<Record<string, string>> = {
  // Dutch
  NL: 'nl', BE: 'nl', SR: 'nl', AW: 'nl', CW: 'nl', SX: 'nl', BQ: 'nl',
  // German
  DE: 'de', AT: 'de', CH: 'de', LI: 'de',
  // Spanish — Spain and Spanish-speaking Latin America
  ES: 'es', MX: 'es', AR: 'es', CL: 'es', CO: 'es', PE: 'es', VE: 'es',
  UY: 'es', BO: 'es', EC: 'es', PY: 'es', CR: 'es', PA: 'es', HN: 'es',
  GT: 'es', SV: 'es', NI: 'es', CU: 'es', DO: 'es', PR: 'es', GQ: 'es',
  // Portuguese — Portugal, Brazil and the PALOP countries
  PT: 'pt', BR: 'pt', AO: 'pt', MZ: 'pt', GW: 'pt', CV: 'pt', ST: 'pt',
  TL: 'pt',
};

/** The last resort, and the answer for everywhere not in the table. */
export const FALLBACK_LOCALE = 'en';

/**
 * The one cookie that records a language choice, and how long it lasts.
 *
 * Shared so the two switchers and the two proxies cannot drift: a switcher
 * writing a name the proxy does not read is a bug that looks like "the site
 * forgets my language" and is invisible in review.
 *
 * `next-intl`'s own cookie sync must stay off (`localeCookie: false` in both
 * routing configs). It writes this same cookie on every locale-prefixed
 * request, which would restore the sticky-guess behaviour one hop after the
 * geo redirect — the redirect lands on `/nl`, and next-intl would helpfully
 * pin `nl` for a year.
 */
export const LOCALE_COOKIE = 'NEXT_LOCALE';
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * Record an explicit language choice. Browser-only — call it from a click
 * handler, never during render or on the server.
 */
export function rememberLocale(locale: string): void {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
}

/**
 * Every header this resolver reads. Any response whose *body* depends on it
 * must send these in `Vary`, or a CDN will happily serve one visitor's
 * language redirect to the next visitor from another continent. This is the
 * single most common way geo-routing goes wrong in production.
 */
export const LOCALE_VARY_HEADER = 'x-vercel-ip-country, cf-ipcountry, accept-language, cookie';

/** A function that returns a request header by name, case-insensitively. */
export type HeaderGetter = (name: string) => string | null | undefined;

function firstSupported(
  candidates: readonly string[],
  supported: readonly string[]
): string | null {
  for (const candidate of candidates) {
    if (supported.includes(candidate)) return candidate;
  }
  return null;
}

/** ISO-3166 alpha-2 → one of `supported`, or null if we have no opinion. */
export function localeFromCountry(
  country: string | null | undefined,
  supported: readonly string[]
): string | null {
  if (!country) return null;
  const language = COUNTRY_TO_LANGUAGE[country.trim().toUpperCase()];
  return language && supported.includes(language) ? language : null;
}

/**
 * Parse `Accept-Language` and return the highest-weighted language we publish.
 *
 * Region subtags are dropped: `pt-BR` and `pt-PT` are both served the same
 * Portuguese, and `de-AT` should not miss the German site. `*` is ignored —
 * it means "anything", which is a request for the fallback, not for the first
 * language that happens to sort first.
 */
export function localeFromAcceptLanguage(
  header: string | null | undefined,
  supported: readonly string[]
): string | null {
  if (!header) return null;

  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const qParam = params.find((p) => p.trim().startsWith('q='));
      const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
      return {
        language: (tag ?? '').trim().toLowerCase().split('-')[0] ?? '',
        // A malformed q is treated as q=0 rather than q=1: a client that sends
        // junk should not outrank one that sends a valid weight.
        q: Number.isFinite(q) ? q : 0,
      };
    })
    .filter((entry) => entry.language && entry.language !== '*' && entry.q > 0)
    // Stable sort by descending weight; equal weights keep header order, which
    // is what the spec says they mean.
    .sort((a, b) => b.q - a.q);

  return firstSupported(ranked.map((entry) => entry.language), supported);
}

export interface ResolveLocaleOptions {
  /** Reads a request header by name. `req.headers.get` satisfies this. */
  getHeader: HeaderGetter;
  /** Value of the NEXT_LOCALE cookie, if the visitor has one. */
  cookieLocale?: string | null;
  /** The locales this app actually publishes. */
  supported: readonly string[];
  /** Override the `en` default. Only do this with a reason. */
  fallback?: string;
}

export interface ResolvedLocale {
  locale: string;
  /** Which rung of the ladder answered. Useful in logs; not user-facing. */
  source: 'cookie' | 'geo' | 'accept-language' | 'fallback';
}

export function resolveLocale({
  getHeader,
  cookieLocale,
  supported,
  fallback = FALLBACK_LOCALE,
}: ResolveLocaleOptions): ResolvedLocale {
  if (cookieLocale && supported.includes(cookieLocale)) {
    return { locale: cookieLocale, source: 'cookie' };
  }

  const geo =
    localeFromCountry(getHeader('x-vercel-ip-country'), supported) ??
    localeFromCountry(getHeader('cf-ipcountry'), supported);
  if (geo) return { locale: geo, source: 'geo' };

  const accept = localeFromAcceptLanguage(getHeader('accept-language'), supported);
  if (accept) return { locale: accept, source: 'accept-language' };

  return {
    locale: supported.includes(fallback) ? fallback : (supported[0] as string),
    source: 'fallback',
  };
}
