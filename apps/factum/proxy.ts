import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { resolveLocale, LOCALE_VARY_HEADER } from '@repo/ui/locale';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// No auto-redirect on any path that already names a locale. Serving a language
// the URL didn't ask for breaks deep links and crawling, so only the bare `/`
// is ever resolved from the request; everything else is served as asked.
//
// `routing.localeDetection` is off for exactly that reason, which also means
// next-intl will not resolve `/` for us — it sends everyone to `en`. That is
// the right default for a URL nobody typed a language into, but it is not the
// best available guess, and this site's readers are spread across five
// language areas. Same resolver as apps/web: cookie, then edge geo, then
// Accept-Language, then English.
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    const { locale } = resolveLocale({
      getHeader: (name) => request.headers.get(name),
      cookieLocale: request.cookies.get('NEXT_LOCALE')?.value,
      supported: routing.locales,
      fallback: routing.defaultLocale,
    });

    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;

    // 307: a permanent redirect would be cached against the origin and pin
    // every later visit from that browser to one country's answer.
    const response = NextResponse.redirect(url, 307);
    // Without Vary a CDN serves one visitor's language to the next.
    response.headers.set('Vary', LOCALE_VARY_HEADER);
    response.cookies.set('NEXT_LOCALE', locale, {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      sameSite: 'lax',
    });
    return response;
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
