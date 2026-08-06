import { MetadataRoute } from 'next';

/**
 * Robots policy — retrieval bots and training bots are separate agents now, and
 * the distinction is documented by the vendors themselves rather than inferred.
 *
 *   OAI-SearchBot    OpenAI: "Sites that are opted out of OAI-SearchBot will not
 *                    be shown in ChatGPT search answers."
 *   PerplexityBot    Perplexity's index. Blocking it removes the citations.
 *   Claude-SearchBot Anthropic's search index, distinct from ClaudeBot.
 *   GPTBot           Training only. Blocking costs no search visibility.
 *   Google-Extended  Gemini Apps and Vertex generative APIs. Explicitly *not* a
 *                    Search ranking or AI Overviews signal either way.
 *   CCBot            Common Crawl — substrate for both training and retrieval.
 *
 * This file used to block the whole training tier, on the reasoning that
 * training buys no citations. That reasoning is sound for a publisher with a
 * content moat and wrong for us: there is nothing here worth withholding, and
 * the actual problem is that the models have never heard of this company. A
 * brand search returns Wouter's LinkedIn and neither of our two websites. For a
 * firm with no press coverage, the training corpora are one of the few routes
 * into a model's idea of what exists.
 *
 * So Google-Extended, CCBot and Applebot-Extended are allowed. GPTBot and
 * ClaudeBot stay blocked, which is a preference rather than a finding — whether
 * blocking training reduces citations is genuinely unresolved.
 *
 * Note that robots.txt is honoured by the crawler, not enforced by the server:
 * every one of these agents gets a 200 if it asks. The enforcement risk lives
 * at the CDN instead — Cloudflare's managed "Block AI bots" rule is on by
 * default for zones created after 2025-07-01 and does not distinguish training
 * from retrieval. Verified clear on both domains 2026-08-06; recheck after
 * 2026-09-15, when those defaults tighten again.
 *
 * `Claude-Web` is gone from the list: it was retired in favour of Claude-User.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Retrieval and citation bots — allow ────────────────────────────
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'Claude-SearchBot', allow: '/' },
      { userAgent: 'Claude-User', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
      // ── Corpus bots we want to be in, for entity awareness ─────────────
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      // ── Pure training crawlers — blocked by preference ─────────────────
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'ClaudeBot', disallow: '/' },
      { userAgent: 'anthropic-ai', disallow: '/' },
      // ── Googlebot, Bingbot and everything else ─────────────────────────
      { userAgent: '*', allow: '/' },
    ],
    sitemap: 'https://www.agenticmindshift.nl/sitemap.xml',
    host: 'https://www.agenticmindshift.nl',
  };
}
