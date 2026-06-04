import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

// Map country code → locale
function getLocaleFromCountry(country: string): string {
  const nl = ['NL', 'BE', 'SR', 'AW', 'CW', 'SX'];
  const de = ['DE', 'AT', 'CH', 'LI'];
  const es = ['ES', 'MX', 'AR', 'CL', 'CO', 'PE', 'VE', 'UY', 'BO', 'EC', 'PY', 'CR', 'PA', 'HN', 'GT', 'SV', 'NI', 'CU', 'DO', 'PR'];
  const pt = ['PT', 'BR', 'AO', 'MZ', 'GW', 'CV', 'ST', 'TL'];
  if (nl.includes(country)) return 'nl';
  if (de.includes(country)) return 'de';
  if (es.includes(country)) return 'es';
  if (pt.includes(country)) return 'pt';
  return 'en';
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply geo-redirect on root path and if no locale cookie set
  if (pathname === '/') {
    const savedLocale = request.cookies.get('NEXT_LOCALE')?.value;
    if (!savedLocale) {
      const country = request.headers.get('x-vercel-ip-country') ?? 'NL';
      const detectedLocale = getLocaleFromCountry(country);
      const url = request.nextUrl.clone();
      url.pathname = `/${detectedLocale}`;
      const response = NextResponse.redirect(url);
      response.cookies.set('NEXT_LOCALE', detectedLocale, { maxAge: 60 * 60 * 24 * 365 });
      return response;
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
