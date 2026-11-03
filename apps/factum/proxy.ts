import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { LOCALE_COOKIE } from '@repo/ui/locale';
import { routing } from './i18n/routing';
import { resolveMarketingUrl } from '@repo/ui/seoRouting';
import { PUBLIC_PATHS, LEGACY_PATHS } from './lib/seoRoutes';
import { isGuideLocale, isGuidePath } from './lib/guideRoutes';
import { OG_CARD_PATHS } from './lib/ogImage';

const intlMiddleware = createMiddleware(routing);
// Public OAuth application disclosures are reachable without adding them to
// the marketing route catalog or sitemap. Each page supplies noindex metadata.
const APPLICATION_INFORMATION_PATHS = [
  '/gtm-automation',
  '/gtm-automation/privacy',
  '/gtm-automation/terms'
] as const;

// No auto-redirect on any path that already names a locale. Serving a language
// the URL didn't ask for breaks deep links and crawling, so only the bare `/`
// is handled here; everything else is served as asked.
//
// `/` used to 307 to a guessed locale — cookie, then edge geo, then
// Accept-Language. On the live site that meant the bare domain answered
// `307 → /en` with `Vary: x-vercel-ip-country, cf-ipcountry, accept-language,
// cookie`, and it never returned a byte of HTML. For a domain nobody has heard
// of, whose entity problem is precisely that search engines have not worked
// out what it is, the most-linked URL returning no content is the worst
// possible place to spend a round trip. Worse, the language a crawler saw
// depended on the country it crawled from, which is the pattern Google's
// localisation guidance tells you not to build.
//
// From August to November 2026 `/` *rendered*: a rewrite to the English
// homepage, a 200 at `/` with `canonical: https://…/en`. agenticmindshift.nl ran
// the same rewrite and Search Console showed Google ignoring the canonical and
// indexing `/` itself ("Duplicate, Google chose different canonical than
// user"), so that site moved to a fixed 308 on 19-10-2026. This site follows
// (SEO audit 03-11-2026): `/` is now a permanent redirect to `/en`. It is the
// same answer for every crawler from every country and costs one hop to a page
// that renders. URL, canonical and hreflang agree.
//
// The cookie is the one signal still read, because it is the only one that is
// a choice rather than a guess: it is written in exactly one place, the
// language switcher's click handler. Crawlers send no cookies and so always
// take the 308 branch — a bot and a human making the same request get the
// same answer.
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone();
    const chosen = request.cookies.get(LOCALE_COOKIE)?.value;

    if (
      chosen &&
      chosen !== routing.defaultLocale &&
      routing.locales.includes(chosen as (typeof routing.locales)[number])
    ) {
      url.pathname = `/${chosen}`;
      // 307: a permanent redirect would be cached against the origin and pin
      // `/` for that browser long after the cookie behind it had gone.
      const response = NextResponse.redirect(url, 307);
      response.headers.set('Vary', 'Cookie');
      response.headers.set('Cache-Control', 'no-store');
      return response;
    }

    // Everyone else — every first-time visitor, every crawler — goes to `/en`
    // with a permanent redirect.
    url.pathname = `/${routing.defaultLocale}`;
    return NextResponse.redirect(url, 308);
  }

  const resolved = resolveMarketingUrl(
    request.nextUrl.pathname, routing.locales, routing.defaultLocale,
    [...PUBLIC_PATHS, ...APPLICATION_INFORMATION_PATHS, '/opengraph-image', ...OG_CARD_PATHS.map((p) => `${p}/opengraph-image`)], LEGACY_PATHS
  );
  // Safety net: a guide path in a locale without guide copy gets the real 404.
  if (
    resolved.known &&
    isGuidePath(request.nextUrl.pathname.replace(/^\/(en|nl|de|es|pt)(?=\/|$)/, '')) &&
    !isGuideLocale(resolved.locale)
  ) {
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

// `icon` and `apple-icon` are root metadata routes, so they have no locale
// segment. Without the exclusion the middleware redirects /icon to /en/icon,
// which does not exist, and the tab mark 404s. Extensioned files (favicon.ico,
// robots.txt, sitemap.xml) are already covered by the dot rule.
export const config = {
  matcher: ['/((?!api|_next|_vercel|icon$|apple-icon$|.*\\..*).*)']
};
