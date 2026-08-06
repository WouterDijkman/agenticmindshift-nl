import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { LOCALE_COOKIE } from '@repo/ui/locale';
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
  // resolved here at all. Anything that already names a locale is served as
  // asked: redirecting there would break deep links, hreflang, and the crawl
  // of four fifths of the site.
  //
  // `/` used to 307 to a *guessed* locale — cookie, then edge geo, then
  // Accept-Language. Measured against the live site that produced
  // `307 → /nl` with `Vary: x-vercel-ip-country, cf-ipcountry,
  // accept-language, cookie`, which has two problems that no amount of
  // correct Vary handling fixes:
  //
  //   1. The most-linked, most-shared, most-crawled URL on the domain never
  //      returned any HTML. Every crawler paid a round trip before it saw a
  //      word, and anything that does not follow redirects saw nothing.
  //   2. Which language a crawler got depended on which country it crawled
  //      from. Google's own localisation guidance warns against exactly this:
  //      Googlebot crawls predominantly from the US, so the site's
  //      highest-authority page was being sampled in whichever language the
  //      geo table happened to give a US IP.
  //
  // So `/` now *renders* rather than redirects. It is a rewrite, not a
  // redirect: the URL in the address bar stays `/`, the response is a 200 with
  // the Dutch homepage in it, and `generateMetadata` receives `locale: 'nl'`
  // and therefore emits `canonical: https://…/nl`. That canonical is the
  // duplicate-content answer — `/` and `/nl` are the same page and only one of
  // them is the indexable one.
  //
  // The one signal still honoured is the cookie, and only the cookie. It is
  // written in exactly one place, the language switcher's click handler, so it
  // is a recorded *choice* rather than a guess about a stranger — which is
  // both the thing Google's guidance permits and the thing that keeps the
  // switcher's promise across a return visit to the bare domain. Crawlers send
  // no cookies, so they always take the rewrite branch and always see Dutch;
  // there is no path here where a bot and a human are served different content
  // for the same request.
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    const chosen = request.cookies.get(LOCALE_COOKIE)?.value;

    // A recorded choice, and not the language `/` already serves. Send them on.
    if (
      chosen &&
      chosen !== routing.defaultLocale &&
      routing.locales.includes(chosen as (typeof routing.locales)[number])
    ) {
      url.pathname = `/${chosen}`;
      // 307, not 308. A permanent redirect is cached by the browser against
      // the origin, so one visit would pin `/` for that machine forever —
      // including after a later switch back, and including after the cookie
      // expires.
      const response = NextResponse.redirect(url, 307);
      response.headers.set('Vary', 'Cookie');
      response.headers.set('Cache-Control', 'no-store');
      return response;
    }

    // Everyone else — every first-time visitor, every crawler — gets the
    // homepage itself.
    url.pathname = `/${routing.defaultLocale}`;
    // No `Vary: Cookie` on this branch, and not for want of trying. Next owns
    // `Vary` on a rendered response — it overwrites whatever the proxy or
    // `next.config.ts` `headers()` sets with its own RSC list (`rsc,
    // next-router-state-tree, …`), which was verified by curl both ways. What
    // makes that safe rather than merely unavoidable: the proxy runs on every
    // request to a matched path, ahead of any cache lookup, so the branch above
    // is re-evaluated for each visitor even when this body is served from the
    // edge. A shared cache never gets to answer `/` on its own.
    return NextResponse.rewrite(url);
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
