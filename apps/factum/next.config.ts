import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import { routing } from './i18n/routing';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Shared design-system package ships raw .tsx — let Next compile it.
  transpilePackages: ['@repo/ui'],

  async redirects() {
    return [
      // The engagement was renamed once the old path had already been live and
      // listed in the sitemap. Config redirects run before the locale proxy, so
      // this resolves in one hop instead of being swallowed by the middleware.
      {
        source: `/:locale(${routing.locales.join('|')})/buyer-proof-sprint`,
        destination: '/:locale/diligence-sprint',
        permanent: true
      }
    ];
  }
};

export default withNextIntl(nextConfig);
