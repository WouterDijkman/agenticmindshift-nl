import { MetadataRoute } from 'next';

/**
 * Robots policy — retrieval bots and training bots are separate agents now, and
 * the distinction is documented by the vendors themselves rather than inferred.
 *
 *   OAI-SearchBot    OpenAI: "Sites that are opted out of OAI-SearchBot will not
 *                    be shown in ChatGPT search answers."
 *   PerplexityBot    Perplexity's index. Blocking it removes the citations.
 *   Claude-SearchBot Anthropic's search index, distinct from ClaudeBot.
 *   GPTBot           Training only, per OpenAI. Allowed here; see below.
 *   Google-Extended  Gemini Apps and Vertex generative APIs. Explicitly *not* a
 *                    Search ranking or AI Overviews signal either way.
 *   CCBot            Common Crawl — substrate for both training and retrieval.
 *
 * Every agent on this list is allowed, the training crawlers included.
 * Decided 12-10-2026 (AUDIT-VINDBAARHEID-2026-10-12.md §4.2). This site's whole
 * job is to be found and known by people who do not know Wouter yet. There is
 * nothing here worth withholding: no client data, no paywalled method, only
 * public copy about a consultancy. A model that has read this site can name the
 * firm when someone describes the problem; a model that has not, cannot.
 *
 * Whether blocking GPTBot costs citations is unresolved in the studies we have
 * seen, and that cuts both ways: the expected gain from allowing it is small and
 * uncertain, the cost is nil. GPTBot, ClaudeBot and anthropic-ai therefore moved
 * from the blocked tier into the allowed one. They used to be blocked "by
 * preference", which was the only argument for it.
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
      // ── Corpus and training bots — allow, for entity awareness ────────
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      // ── Googlebot, Bingbot and everything else ─────────────────────────
      { userAgent: '*', allow: '/' },
    ],
    sitemap: 'https://www.agenticmindshift.nl/sitemap.xml',
    host: 'https://www.agenticmindshift.nl',
  };
}
