import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/**
 * Response headers, applied to every path.
 *
 * Vercel already sends HSTS. Everything below it was absent, which for a
 * brochure site with no forms, no sessions and no cookies is low risk in
 * three of the four cases and a real leak in the fourth:
 *
 *  - Referrer-Policy is the one that mattered. With no policy set, browsers
 *    default to sending the full URL to cross-origin destinations. Every
 *    intake button on this site points at cal.com, so cal.com was being told
 *    the exact page and locale each visitor came from. `strict-origin-when-
 *    cross-origin` sends the bare origin outbound and keeps the full path
 *    for same-origin navigation, which is all Plausible needs.
 *
 *  - X-Frame-Options: the site embeds no iframes and has no reason to be
 *    embedded in one. DENY, not SAMEORIGIN — there is no same-origin framing
 *    to preserve either.
 *
 *  - X-Content-Type-Options stops a browser from second-guessing the
 *    Content-Type on the .svg and .woff2 files served from /public.
 *
 *  - Permissions-Policy denies the hardware APIs outright. Nothing here asks
 *    for a camera, a microphone, a location or a payment handler, so the
 *    honest value is an empty allowlist rather than the browser default.
 *
 * Deliberately NOT here: Content-Security-Policy. A useful CSP for this app
 * needs a per-request nonce threaded through the framework's inline bootstrap
 * scripts and framer-motion's inline styles; a `unsafe-inline` CSP that skips
 * that work is a header that looks like protection and is not. It is worth
 * doing properly, as its own change, with the route sweep to prove nothing
 * silently stopped rendering.
 */
const SECURITY_HEADERS = [
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
];

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
  async headers() {
    return [{ source: '/:path*', headers: SECURITY_HEADERS }];
  },
};

export default withNextIntl(nextConfig);
