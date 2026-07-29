import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// No IP- or header-based auto-redirect. Serving a language the URL didn't ask for
// breaks deep links and crawling, so `/` resolves to the default locale and
// LocaleBanner offers the switch instead.
export default createMiddleware(routing);

// `icon` and `apple-icon` are root metadata routes, so they have no locale
// segment. Without the exclusion the middleware redirects /icon to /en/icon,
// which does not exist, and the tab mark 404s. Extensioned files (favicon.ico,
// robots.txt, sitemap.xml) are already covered by the dot rule.
export const config = {
  matcher: ['/((?!api|_next|_vercel|icon$|apple-icon$|.*\\..*).*)']
};
