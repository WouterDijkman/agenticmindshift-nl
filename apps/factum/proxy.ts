import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { LOCALE_COOKIE } from '@repo/ui/locale';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

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
// So `/` renders instead. A rewrite, not a redirect: the address bar keeps
// `/`, the response is a 200 carrying the English homepage, and because
// `generateMetadata` is handed `locale: 'en'` the page emits
// `canonical: https://…/en` on its own. That settles the duplicate between `/`
// and `/en` in one direction, with no second self-canonical to contradict it.
//
// The cookie is the one signal still read, because it is the only one that is
// a choice rather than a guess: it is written in exactly one place, the
// language switcher's click handler. Crawlers send no cookies and so always
// take the rewrite branch — a bot and a human making the same request get the
// same bytes.
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

  return intlMiddleware(request);
}

// `icon` and `apple-icon` are root metadata routes, so they have no locale
// segment. Without the exclusion the middleware redirects /icon to /en/icon,
// which does not exist, and the tab mark 404s. Extensioned files (favicon.ico,
// robots.txt, sitemap.xml) are already covered by the dot rule.
export const config = {
  matcher: ['/((?!api|_next|_vercel|icon$|apple-icon$|.*\\..*).*)']
};
