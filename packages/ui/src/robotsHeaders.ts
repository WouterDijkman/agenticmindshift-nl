/**
 * Keep generated social-card images out of the search index, both sites.
 *
 * Search Console (SEO audit 03-11-2026) listed `/{locale}/opengraph-image`
 * and a `?hash` variant under "Crawled – currently not indexed" on
 * agenticmindshift.nl: Google was treating the card PNGs as pages. The
 * `X-Robots-Tag` header is the only way to say noindex on a non-HTML
 * response. It does not affect link previews: LinkedIn, Slack, X and the
 * rest fetch `og:image` as a plain asset and do not read robots directives
 * on it. robots.txt is deliberately left alone — blocking the path there
 * would stop the preview scrapers that honour it.
 *
 * `:path*` matches zero or more segments, so these cover the locale card
 * (`/en/opengraph-image`), per-page cards (`/en/platform/opengraph-image`)
 * and any root-level card. A query string does not affect matching.
 */
const NOINDEX = [{ key: 'X-Robots-Tag', value: 'noindex' }];

export const metadataImageNoindexRules = [
  { source: '/:path*/opengraph-image', headers: NOINDEX },
  { source: '/:path*/twitter-image', headers: NOINDEX },
];
