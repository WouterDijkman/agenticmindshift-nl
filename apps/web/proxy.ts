import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { resolveLocale, LOCALE_COOKIE, LOCALE_VARY_HEADER } from '@repo/ui/locale';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

/**
 * Everything *below* /scorecard is a funnel step (questions, result, generated
 * report). Those pages are `'use client'` so they cannot export metadata, and
 * the shared scorecard layout also wraps the indexable landing page — hence the
 * header here. A robots.txt disallow would block crawling but still permit
 * URL-only indexing; noindex will not.
 */
const NOINDEX_PATH = /^\/[a-z]{2}\/scorecard\/.+/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The bare `/` is the only URL with no answer in it, so it is the only one
  // resolved from the request. Anything that already names a locale is served
  // as asked: redirecting there would break deep links, hreflang, and the
  // crawl of four fifths of the site.
  //
  // The old version of this block had three defects. It fell back to Dutch for
  // an unrecognised country, so a Finn got a language they cannot read rather
  // than the English the brief asks for. It had no Accept-Language step, so
  // with no geo header — local, self-hosted, or behind a proxy that strips it
  // — every visitor got the same answer. And it sent no Vary, which is the
  // one that bites in production rather than in review.
  if (pathname === '/') {
    const { locale } = resolveLocale({
      getHeader: (name) => request.headers.get(name),
      cookieLocale: request.cookies.get(LOCALE_COOKIE)?.value,
      supported: routing.locales,
    });

    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;

    // 307, not a permanent redirect. A 308 is cached by the browser against
    // the origin, so the first visit would pin every later visit from that
    // machine — including after a deliberate language switch — to whichever
    // country the visitor happened to be in that day.
    const response = NextResponse.redirect(url, 307);

    // Without this a CDN caches one visitor's redirect and hands it to the
    // next one from another continent. It fails silently: correct in dev,
    // correct on the first hit, wrong at scale.
    response.headers.set('Vary', LOCALE_VARY_HEADER);

    // Geo is re-read on every visit, so this answer must never be reused. Vary
    // is not enough on its own: a shared cache that does not understand an
    // unknown Vary key may hand one country's redirect to everyone behind it.
    response.headers.set('Cache-Control', 'no-store');

    // Deliberately no cookie. This is a guess, and writing it down made the
    // guess outrank every later guess for a year — one visit from an airport
    // abroad and the site kept speaking that country's language. Only the
    // language switcher writes the cookie, because a click is the only signal
    // here that actually means "I want this language".
    return response;
  }

  const response = intlMiddleware(request);
  if (NOINDEX_PATH.test(pathname)) {
    response.headers.set('X-Robots-Tag', 'noindex, follow');
  }
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
