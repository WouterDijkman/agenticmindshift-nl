export const SITE_URL = 'https://www.factumcapital.eu';

/**
 * Where a reader who is convinced actually goes: the page that describes the
 * engagement.
 *
 * This briefly pointed at an audit page on agenticmindshift.nl, on the theory
 * that Factum is the engine and you buy at the practice. That theory does not
 * survive the corporate structure: the engagements belong to Factum, which is
 * co-owned, and routing them through the consultancy routes the revenue past
 * the other owner. The two brands are separating rather than nesting.
 *
 * So the buying action stays on this site. The locale argument is kept because
 * the destination is a localised route either way.
 */
export const auditUrl = (locale: string) => `/${locale}/diligence-sprint`;

/**
 * The conversation, still here but secondary. Contact keeps it, because a page
 * whose whole job is "how do I reach you" should offer the low-commitment
 * route as well as the high-commitment one.
 */
export const INTAKE_URL = 'https://cal.com/wwdijkman/intake-call';

/**
 * The registration engagements are currently contracted under. Factum
 * Capital is not yet a separate legal entity, so /governance and /privacy
 * state this as a bare number rather than naming a company that does not
 * exist yet.
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
  { href: '/pre-sale', key: 'preSale' },
  { href: '/governance', key: 'governance' },
  { href: '/partnerships', key: 'partnerships' },
  { href: '/team', key: 'team' }
] as const;

/** Footer sitemap — the same set again, at lower emphasis. */
export const FOOTER_NAV = NAV;

/**
 * The two reference pages, deliberately not in the header.
 *
 * /method and /limits-of-ai are long, and they are written for someone who has
 * already decided the proposition is interesting and now wants to check it.
 * That reader arrives from a link inside an argument, not from a nav bar — and
 * a seven-item header would cost every other visitor a slower scan to serve
 * them. They get their own footer group instead, which is a site-wide link on
 * every page, plus contextual links from the sections whose claims they back:
 * /platform and /diligence-sprint point at /method, /governance points at
 * /limits-of-ai, and the two point at each other.
 *
 * `Breadcrumb` reads this list as well, so both pages emit a proper crumb name
 * rather than falling through to the "return null" branch.
 */
export const REFERENCE_NAV = [
  { href: '/method', key: 'method' },
  { href: '/limits-of-ai', key: 'aiLimits' }
] as const;

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
 * for the roster and the wave.
 *
 * Sub-agent counts used to live here too, and they are gone on purpose. They
 * were the largest numbers on the site and the least useful ones: a fan-out
 * width is our implementation detail, it answers "how big are you" rather than
 * "what do I get", and it is the figure that drifts fastest — the roster
 * changed eight modules before anyone noticed the totals were a quarter too
 * high. What a module *is for* survives a refactor; how many agents it fans out
 * to does not. Nothing on the site may print an agent count again; see
 * `lib/roster.manifest.ts`, which fails the build if one comes back.
 *
 * Listed in dispatch order, which is also the order the wave diagram draws.
 * `zdr` marks the modules whose provider routing is hard-gated to a
 * zero-retention EU endpoint in code (`ZDR_REQUIRED_MODULES`), not by setting.
 *
 * Re-derived 8 September 2026 against the live registry, which had drifted
 * from what this array said, in two separate ways found on two separate
 * passes.
 *
 * First pass: the six deliverable modules (vdd, ic-memo, teaser, fin-memo,
 * document-factory, ic-report) moved to the separate `factum-deliverables`
 * repo, and six more (vigil, portfolio, pmi, exit-readiness, portfolio-health,
 * im-screener) were retired from the product proposition — both on 21 August
 * 2026. What the client actually receives from a Sprint is one live dashboard
 * and one synthesized written report, not a roster of separate deliverable
 * modules.
 *
 * Second pass, caught only because it was asked about directly: `it` and
 * `esg` were ALSO lifted out on 3 September 2026, to `factum-it-dd` and
 * `factum-esg-dd` respectively — the same pattern as the first pass, one
 * module category at a time. And on 4 September 2026 (L7-4 in the product's
 * own history) the wave plan itself changed: legal, tax, deal-economics and
 * valuation each got their own wave instead of sharing wave 2/3, because
 * two modules in the same wave can never actually read each other's output
 * (signals only publish once a module has fully finished) — the old shared
 * waves were a dependency the run could never keep. What's left is 9 modules
 * across 5 waves that carry anything (wave 6 stays reserved, empty, for the
 * same numbering-continuity reason the deliverable/retired waves above were
 * kept rather than renumbered).
 */
export type FactumModule = {
  /** Product slug. Stable, and the key the wave diagram draws from. */
  readonly slug: string;
  /** Dispatch wave, 1–5. */
  readonly wave: number;
  /**
   * What the module hands back. Every module here is a finding-producing
   * analysis module — the `deliverable` and `monitoring` kinds are kept in the
   * type for the day a module of that kind exists again, but nothing in
   * `MODULES` currently uses them. See the header comment above for why.
   */
  readonly kind: 'analysis' | 'deliverable' | 'monitoring';
  /** Provider routing hard-gated to zero-retention EU inference. */
  readonly zdr?: true;
};

export const MODULES: readonly FactumModule[] = [
  // Wave 1 — no upstream dependencies, run fully in parallel.
  //
  // These slugs and this order are load-bearing beyond this file. The wave
  // diagram draws `shared.modules` in every messages/<locale>.json positionally
  // against this array, so an entry inserted here without the matching label
  // inserted there silently relabels every module below it.
  { slug: 'financial', wave: 1, kind: 'analysis', zdr: true },
  { slug: 'commercial', wave: 1, kind: 'analysis' },
  { slug: 'hr', wave: 1, kind: 'analysis' },
  { slug: 'operational', wave: 1, kind: 'analysis' },
  { slug: 'ai-dd', wave: 1, kind: 'analysis' },
  // Wave 2 — reads wave 1 (hr, commercial) only. Its own wave since 4
  // September 2026, so tax (wave 3) can actually read its finished output.
  { slug: 'legal', wave: 2, kind: 'analysis', zdr: true },
  // Wave 3 — reads wave 1 (financial) and wave 2 (legal).
  { slug: 'tax', wave: 3, kind: 'analysis', zdr: true },
  // Wave 4 — synthesis across waves 1–3.
  { slug: 'deal-economics', wave: 4, kind: 'analysis' },
  // Wave 5 — the last wave that carries anything: reads deal-economics (wave
  // 4) on top of everything before it. What comes out of waves 1–5 is what
  // the dashboard and the report are built from.
  { slug: 'valuation', wave: 5, kind: 'analysis' }
];

export const MODULE_COUNT = MODULES.length;
export const WAVE_COUNT = 5;

export const ZDR_MODULE_COUNT = MODULES.filter((m) => m.zdr).length;

/** Module counts per kind, for the copy that names the three-way split. */
export const ANALYSIS_MODULE_COUNT = MODULES.filter((m) => m.kind === 'analysis').length;
export const DELIVERABLE_MODULE_COUNT = MODULES.filter((m) => m.kind === 'deliverable').length;
export const MONITORING_MODULE_COUNT = MODULES.filter((m) => m.kind === 'monitoring').length;

/**
 * How many modules open in each wave, indexed from wave 1.
 *
 * /method states these counts in prose ("eight modules open at once"), and a
 * number typed into a message file is a number that goes stale the next time
 * the roster moves — which is exactly how the site once printed a module total
 * a quarter too high. Derived here, passed into ICU, so a wave gaining a module
 * updates the sentence.
 */
export const WAVE_SIZES: readonly number[] = Array.from(
  { length: WAVE_COUNT },
  (_, i) => MODULES.filter((m) => m.wave === i + 1).length
);
/**
 * The disciplines a Sprint analyses, in the order `DisciplineGrid` draws them.
 *
 * These slugs are the canonical roster; the visible copy lives in
 * `messages/<locale>.json` under `shared.disciplines` and must line up
 * one-for-one. Deriving the count from this list rather than hardcoding it
 * closed a real drift: the grid was expanded while the constant stayed put, so
 * the platform page printed one number directly above a list of another length.
 *
 * Three entries came off this list rather than being renamed, and the reason is
 * the same each time — the row was answering a different question from its
 * neighbours:
 *   — `insurance` was retired from the product and had no business being
 *     orderable on a page for two days longer than it existed;
 *   — `vendor` is a deliverable (`vdd`), not something we analyse *about* a
 *     target, so it belongs in the documents wave;
 *   — `vigil` is monitoring that starts after closing, and listing it beside
 *     Legal implied a buyer could ask for it during diligence.
 *
 * A fourth pair was merged and then, on 20 August 2026, unmerged. `it` and `ai`
 * ran as one `technology` row for a while, on the reasoning that an "AI-driven"
 * claim in an IM is a claim about the technology estate, that it cannot be
 * assessed without opening the systems folder anyway, and that a lone row
 * labelled `AI` in 2026 reads as a bandwagon rather than a discipline.
 *
 * That last worry was the real one, and what answers it is what the row says
 * rather than whether the row exists. The two questions are settled in
 * different folders. `it` is an estate question answered by the systems
 * inventory and the licence schedule: what runs, what repair costs, which
 * licences consolidate after closing. `ai` is an ownership and exposure
 * question answered by the model contracts and the data-processing agreements:
 * whether the model belongs to the company or is rented from someone who can
 * reprice it, who holds rights to the training data, what the AI Act attaches,
 * and which processes genuinely automate. Folded together, the second set went
 * unasked, because the tile read as "we read engineering" and stopped there.
 *
 * The merged tile could not carry both either. Its copy had to name technical
 * debt, licensing, model ownership and the AI Act in one sentence, which is how
 * it ended up naming none of them properly.
 *
 * That "ten things" lasted two weeks. `it` and `esg` were themselves lifted
 * out on 3 September 2026, to `factum-it-dd` and `factum-esg-dd` — see the
 * header comment on `MODULES` above, same pattern, same reasoning about a
 * lone row reading as a bandwagon rather than answering a real question on
 * its own. What's left is eight. Inserting or removing mid-list re-pairs
 * every later entry with the wrong icon, since `DisciplineGrid` maps them by
 * position — `ICONS` in that file was rebuilt by hand in the same change
 * rather than left to drift, which is exactly the mistake this array's own
 * history is a record of not fixing quickly enough the first two times.
 */
export const DISCIPLINES = [
  'financial',
  'commercial',
  'legal',
  'tax',
  'hr',
  'ai',
  'operational',
  'valuation'
] as const;

export const DISCIPLINE_COUNT = DISCIPLINES.length;

/**
 * Factum's own coverage map, against the fourteen diligence dimensions the
 * reference checklists share. Published with the gaps named rather than
 * rounded off — "nothing is left behind" was the previous claim and it does not
 * survive one informed question, whereas nine-of-fourteen with the missing five
 * spelled out does. The two dimensions with no pre-deal owner at all are named
 * in `platform.limits`, in the buyer's words rather than ours.
 */
export const COVERAGE_DIMENSIONS = 14;
export const COVERAGE_FULL = 9;
export const COVERAGE_PARTIAL = 5;

/**
 * Factum's own grounding audit. Published only with its caveat attached, and
 * never as a standalone statistic — it is one internal, unaudited dataset.
 */
export const GROUNDING_RATE = 96.7;
export const GROUNDING_AUDIT_DATE = '15 July 2026';

/** The open part of the dial. Named so the copy can refuse to round it away. */
export const GROUNDING_REMAINDER = (100 - GROUNDING_RATE).toFixed(1);

/**
 * Hard-block conditions that stop a sub-agent draft being auto-approved.
 *
 * Eight, not seven: `agent-review-graph.ts` throws a distinct `HardBlockError`
 * for `FABRICATED_SOURCE` (a citation that resolves to nothing) and for
 * `FABRICATION_CHECK_FAILED` (the deterministic checker still finds a
 * reject-severity issue after both repair attempts) — two code paths, not one.
 * `platform.blocks.items` carries eight entries to match; re-count both if
 * either changes.
 */
export const HARD_BLOCK_COUNT = 8;
