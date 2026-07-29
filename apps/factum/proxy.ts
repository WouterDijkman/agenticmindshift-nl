import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// No IP- or header-based auto-redirect. Serving a language the URL didn't ask for
// breaks deep links and crawling, so `/` resolves to the default locale and
// LocaleBanner offers the switch instead.
export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
