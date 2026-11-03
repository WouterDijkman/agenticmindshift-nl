import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import { securityHeaderRule } from '@repo/ui/securityHeaders';
import { metadataImageNoindexRules } from '@repo/ui/robotsHeaders';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Shared design-system package ships raw .tsx — let Next compile it.
  transpilePackages: ['@repo/ui'],
  // Proxy folds slash, locale and legacy aliases into one final redirect.
  skipTrailingSlashRedirect: true,
  /* Both sites, one rule. See packages/ui/src/securityHeaders.ts for why each
     header is there and why there is no CSP yet. The second rule keeps the
     generated OG/Twitter card images out of the index; see
     packages/ui/src/robotsHeaders.ts. */
  async headers() {
    return [securityHeaderRule, ...metadataImageNoindexRules];
  },
};

export default withNextIntl(nextConfig);
