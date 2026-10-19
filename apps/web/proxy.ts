import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { LOCALE_COOKIE } from '@repo/ui/locale';
import { routing } from './i18n/routing';
import { resolveMarketingUrl } from '@repo/ui/seoRouting';
import { PUBLIC_PATHS, LEGACY_PATHS } from './lib/seoRoutes';
import { isGuideLocale, isGuidePath } from './lib/guideRoutes';

const intlMiddleware = createMiddleware(routing);

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
  // From August to October 2026 `/` *rendered* rather than redirected. It is a rewrite, not a
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

    // Everyone else — every first-time visitor, every crawler — goes to
    // `/nl` with a permanent redirect. This replaces the rewrite described
    // above. Search Console (URL inspection of `/nl`, 19-10-2026) showed
    // Google ignoring the `/nl` canonical on the rewritten `/` and indexing
    // `/` instead: "Duplicate, Google chose different canonical than user".
    // A fixed 308 keeps both reasons the old 307 was dropped out of play: it
    // is the same answer for every crawler from every country, and it costs
    // one hop to a page that renders. URL, canonical and hreflang now agree.
    url.pathname = `/${routing.defaultLocale}`;
    return NextResponse.redirect(url, 308);
  }

  const resolved = resolveMarketingUrl(
    request.nextUrl.pathname, routing.locales, routing.defaultLocale,
    [...PUBLIC_PATHS, '/opengraph-image'], LEGACY_PATHS
  );
  if (isGuidePath(request.nextUrl.pathname.replace(/^\/(nl|en|de|es|pt)(?=\/|$)/, '')) && !isGuideLocale(resolved.locale)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${resolved.locale}/not-a-page`;
    return NextResponse.rewrite(url);
  }
  if (resolved.target) {
    const url = new URL(resolved.target, request.url);
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url, 308);
  }
  if (!resolved.known) {
    // Missing pages (including unsupported locales) return 404 immediately.
    const url = request.nextUrl.clone();
    url.pathname = `/${resolved.locale}/not-a-page`;
    return NextResponse.rewrite(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
