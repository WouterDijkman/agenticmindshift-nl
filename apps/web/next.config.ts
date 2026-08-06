import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Shared design-system package ships raw .tsx — let Next compile it.
  transpilePackages: ['@repo/ui'],
  // Ensure the SUSE .ttf font files (loaded at runtime via process.cwd() in
  // lib/pdf/reportTemplate.tsx) are traced into the PDF API route's serverless
  // bundle on Vercel. Without this the fonts silently fall back to Helvetica.
  outputFileTracingIncludes: {
    '/api/download-report/[id]': ['./lib/pdf/fonts/**/*'],
  },
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
};

export default withNextIntl(nextConfig);
