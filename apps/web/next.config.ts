import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import { securityHeaderRule } from '@repo/ui/securityHeaders';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Shared design-system package ships raw .tsx — let Next compile it.
  transpilePackages: ['@repo/ui'],
  /**
   * /factum-capital was a second product page for a product that has its own
   * site. It is gone; the address is not, because it has been linked from
   * this site's own nav, from the sitemap and from outbound mail. A 308 keeps
   * those links working and tells search engines the canonical page moved off
   * this domain, which is what the FactumBanner now says in prose too.
   *
   * The locale segment is required — next-intl prefixes every marketing route,
   * so the bare path never existed and matching it would 308 to a 404.
   */
  async redirects() {
    return [
      {
        source: '/:locale(nl|en|de|es|pt)/factum-capital',
        destination: 'https://factumcapital.eu',
        permanent: true,
      },
    ];
  },
  /* Both sites, one rule. See packages/ui/src/securityHeaders.ts for why each
     header is there and why there is no CSP yet. */
  async headers() {
    return [securityHeaderRule];
  },
};

export default withNextIntl(nextConfig);
