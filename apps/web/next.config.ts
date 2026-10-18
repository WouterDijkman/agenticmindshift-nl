import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import { securityHeaderRule } from '@repo/ui/securityHeaders';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Shared design-system package ships raw .tsx — let Next compile it.
  transpilePackages: ['@repo/ui'],
  // Proxy folds slash, locale and legacy aliases into one final redirect.
  skipTrailingSlashRedirect: true,
  /* Both sites, one rule. See packages/ui/src/securityHeaders.ts for why each
     header is there and why there is no CSP yet. */
  async headers() {
    return [securityHeaderRule];
  },
};

export default withNextIntl(nextConfig);
