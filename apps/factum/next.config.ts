import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import { securityHeaderRule } from '@repo/ui/securityHeaders';
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
      },
      // /partnerships sold white-label diligence capacity to buy-side advisers
      // "under your name". Factum no longer offers that: it is self-service,
      // it does not sign off, and the audience is buyers and sell-side
      // brokers (owner decision 12 October 2026). A broker's question is "is
      // my client's room ready for market", which /pre-sale now answers.
      {
        source: `/:locale(${routing.locales.join('|')})/partnerships`,
        destination: '/:locale/pre-sale',
        permanent: true
      }
    ];
  },

  /* Both sites, one rule. See packages/ui/src/securityHeaders.ts for why each
     header is there and why there is no CSP yet. */
  async headers() {
    return [securityHeaderRule];
  }
};

export default withNextIntl(nextConfig);
