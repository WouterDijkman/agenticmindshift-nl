/**
 * Response headers both sites set on every path.
 *
 * Shared for the same reason `resolveLocale` is: two apps, one rule, and a
 * copy that drifts is invisible until someone thinks to run a curl against
 * the other domain. The rationale below is the whole of it — there is no
 * per-app variation, because neither app has forms, sessions, cookies beyond
 * the language choice, or a single iframe.
 *
 * Vercel already sends HSTS. These four were absent; three are routine
 * hardening and the fourth was a real leak:
 *
 *  - Referrer-Policy is the one that mattered. With no policy set, browsers
 *    default to sending the full URL to cross-origin destinations. Every
 *    intake button on both sites points at cal.com, so cal.com was being told
 *    the exact page and locale each visitor came from. `strict-origin-when-
 *    cross-origin` sends the bare origin outbound and keeps the full path for
 *    same-origin navigation, which is all Plausible needs.
 *
 *  - X-Frame-Options: neither site embeds an iframe or has any reason to be
 *    embedded in one. DENY rather than SAMEORIGIN — there is no same-origin
 *    framing to preserve either.
 *
 *  - X-Content-Type-Options stops a browser second-guessing the Content-Type
 *    on the .svg, .woff2 and .mp4 files served straight from /public.
 *
 *  - Permissions-Policy denies the hardware APIs outright. Nothing on either
 *    site asks for a camera, a microphone, a location or a payment handler,
 *    so the honest value is an empty allowlist, not the browser default.
 *
 * Deliberately NOT here: Content-Security-Policy. A useful CSP for these apps
 * needs a per-request nonce threaded through the framework's inline bootstrap
 * scripts and framer-motion's inline styles; a CSP with `unsafe-inline` that
 * skips that work is a header that looks like protection and is not. It is
 * worth doing properly, as its own change, with a route sweep behind it to
 * prove nothing silently stopped rendering.
 */
export const SECURITY_HEADERS: ReadonlyArray<{ key: string; value: string }> = [
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
];

/** Every path, both apps. Spread into `next.config.ts`'s `headers()`. */
export const securityHeaderRule = {
  source: '/:path*',
  headers: [...SECURITY_HEADERS],
};
