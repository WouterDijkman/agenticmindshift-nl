import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * Crawler policy for factumcapital.eu, decided 12 October 2026.
 *
 * Factum's job on the open web is that a model says the right thing about
 * Factum. Spelling the named agents out (rather than a bare `*: allow`) keeps
 * that policy reviewable.
 *
 * Retrieval bots are allowed outright: they decide whether Factum can appear,
 * with a link, in a ChatGPT, Claude or Perplexity answer at all.
 *
 * Training crawlers are allowed too, GPTBot, ClaudeBot and anthropic-ai
 * included. Until this date they were blocked, deliberately: a training crawl
 * freezes whatever the site says on the day it runs, and the copy then still
 * described a done-for-you service with a named approver, a refusal the code
 * no longer makes and a track record nobody could verify (audit
 * AUDIT-VINDBAARHEID-2026-10-12.md, §3.1 and §4.2). Those claims were corrected
 * on this branch first; only then was training opened. If the copy and the
 * product drift apart again, close this before fixing the copy, not after.
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
      // ── Training crawlers — allowed since 12-10-2026, after the copy ───
      // matched the product (see the note above).
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      // ── Googlebot, Bingbot and everything else ─────────────────────────
      { userAgent: '*', allow: '/' }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
