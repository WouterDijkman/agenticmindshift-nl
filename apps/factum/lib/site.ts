export const SITE_URL = 'https://www.factumcapital.eu';
export const INTAKE_URL = 'https://cal.com/wwdijkman/intake-call';
export const AM_URL = 'https://www.agenticmindshift.nl';

/**
 * Agentic Mindshift Consultancy's registration. Factum Capital is not yet a
 * separate legal entity, so this is the number engagements are contracted
 * under — which is why /governance says so in as many words rather than
 * letting a footer imply a company that does not exist yet.
 */
export const KVK = '99495945';

/**
 * Primary header nav.
 *
 * Partnerships sits here, not in the footer. It was moved out on the argument
 * that referral partners are a narrower audience than the buyer — true of the
 * page, wrong about the funnel. The likeliest first mandate is the
 * corporate-finance adviser at a Dutch boutique, who keeps the client
 * relationship as a shield and carries far less career risk than a PE partner
 * signing off on an unproven vendor. That reader does not scroll to the footer
 * to find out a referral route exists.
 */
export const NAV = [
  { href: '/platform', key: 'platform' },
  { href: '/diligence-sprint', key: 'sprint' },
  { href: '/governance', key: 'governance' },
  { href: '/partnerships', key: 'partnerships' },
  { href: '/team', key: 'team' }
] as const;

/** Footer sitemap — the same set again, at lower emphasis. */
export const FOOTER_NAV = NAV;

export const LOCALE_NAMES: Record<string, string> = {
  en: 'English',
  nl: 'Nederlands',
  de: 'Deutsch',
  es: 'Español',
  pt: 'Português'
};

/**
 * The module library, derived from the product source rather than from a
 * strategy document: `MODULE_WAVES` in `src/lib/dispatch/module-registry.ts`
 * for the roster and the wave, and each module's `agents: [...]` array for the
 * sub-agent count. `scripts/count_modules.py` reproduces every number here, so
 * the figures on the site can be re-checked against the running product.
 *
 * Listed in dispatch order, which is also the order the wave diagram draws.
 * `zdr` marks the modules whose provider routing is hard-gated to a
 * zero-retention EU endpoint in code (`ZDR_REQUIRED_MODULES`), not by setting.
 */
export type FactumModule = {
  /** Product slug. Stable, and the key the wave diagram draws from. */
  readonly slug: string;
  /** Sub-agents that fan out inside this module. */
  readonly agents: number;
  /** Dispatch wave, 1–5. */
  readonly wave: number;
  /** Provider routing hard-gated to zero-retention EU inference. */
  readonly zdr?: true;
};

export const MODULES: readonly FactumModule[] = [
  // Wave 1 — no upstream dependencies, run fully in parallel.
  { slug: 'financial', agents: 11, wave: 1, zdr: true },
  { slug: 'commercial', agents: 10, wave: 1 },
  { slug: 'hr', agents: 10, wave: 1 },
  { slug: 'it', agents: 7, wave: 1 },
  { slug: 'esg', agents: 11, wave: 1 },
  { slug: 'vigil', agents: 21, wave: 1 },
  { slug: 'boedelonderzoek', agents: 11, wave: 1, zdr: true },
  { slug: 'operational', agents: 11, wave: 1 },
  { slug: 'vendor', agents: 8, wave: 1 },
  { slug: 'ai-dd', agents: 9, wave: 1 },
  { slug: 'im-screener', agents: 4, wave: 1 },
  // Wave 2 — read wave 1 output before they can reason.
  { slug: 'tax', agents: 10, wave: 2, zdr: true },
  { slug: 'legal', agents: 10, wave: 2, zdr: true },
  { slug: 'insurance', agents: 6, wave: 2 },
  // Wave 3 — synthesis across waves 1 and 2.
  { slug: 'ibr', agents: 11, wave: 3 },
  { slug: 'whoa', agents: 14, wave: 3 },
  { slug: 'deal-economics', agents: 9, wave: 3 },
  { slug: 'valuation', agents: 6, wave: 3 },
  { slug: 'structuring', agents: 4, wave: 3 },
  { slug: 'portfolio', agents: 6, wave: 3 },
  { slug: 'lbo-model', agents: 7, wave: 3 },
  { slug: 'pmi', agents: 6, wave: 3 },
  // Wave 4 — assemble client-facing deliverables from everything upstream.
  { slug: 'vdd', agents: 13, wave: 4 },
  { slug: 'ic-memo', agents: 5, wave: 4 },
  { slug: 'teaser', agents: 5, wave: 4 },
  { slug: 'fin-memo', agents: 6, wave: 4 },
  { slug: 'document-factory', agents: 5, wave: 4 },
  // Wave 5 — post-close, independent of the pre-close waves.
  { slug: 'exit-readiness', agents: 8, wave: 5 },
  { slug: 'portfolio-health', agents: 2, wave: 5 },
  { slug: 'mbr', agents: 3, wave: 5 },
  { slug: 'ic-report', agents: 5, wave: 5 }
];

export const MODULE_COUNT = MODULES.length;
export const SUBAGENT_COUNT = MODULES.reduce((n, m) => n + m.agents, 0);
export const WAVE_COUNT = 5;
export const ZDR_MODULE_COUNT = MODULES.filter((m) => m.zdr).length;
/**
 * The disciplines a Sprint covers, in the order `DisciplineGrid` draws them.
 *
 * These slugs are the canonical roster; the visible labels live in
 * `messages/<locale>.json` under `shared.disciplines` and must line up
 * one-for-one. Deriving the count from this list rather than hardcoding it
 * closed a real drift: the grid was expanded to thirteen disciplines while the
 * constant stayed at eleven, so the platform page printed "11" directly above a
 * list of thirteen names.
 *
 * Append only. Inserting mid-list would re-pair every label with the wrong slug.
 */
export const DISCIPLINES = [
  'financial',
  'commercial',
  'legal',
  'tax',
  'hr',
  'it',
  'esg',
  'vendor',
  'operational',
  'valuation',
  'insurance',
  'ai',
  'vigil'
] as const;

export const DISCIPLINE_COUNT = DISCIPLINES.length;

/** The largest module, called out because the spread is the point. */
export const LARGEST_MODULE_AGENTS = Math.max(...MODULES.map((m) => m.agents));

/**
 * Factum's own grounding audit. Published only with its caveat attached, and
 * never as a standalone statistic — it is one internal, unaudited dataset.
 */
export const GROUNDING_RATE = 96.7;
export const GROUNDING_AUDIT_DATE = '15 July 2026';

/** The open part of the dial. Named so the copy can refuse to round it away. */
export const GROUNDING_REMAINDER = (100 - GROUNDING_RATE).toFixed(1);

/** Hard-block conditions that stop a sub-agent draft being auto-approved. */
export const HARD_BLOCK_COUNT = 7;
