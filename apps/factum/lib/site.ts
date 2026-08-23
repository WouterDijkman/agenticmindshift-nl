export const SITE_URL = 'https://www.factumcapital.eu';
export const AM_URL = 'https://www.agenticmindshift.nl';

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
 */
export type FactumModule = {
  /** Product slug. Stable, and the key the wave diagram draws from. */
  readonly slug: string;
  /** Dispatch wave, 1–5. */
  readonly wave: number;
  /**
   * What the module hands back. Analysis produces findings, deliverables
   * produce documents, monitoring keeps running after closing. Every module is
   * in exactly one, and that is what decides when it runs — the distinction the
   * roster always had in the product and never showed on the site, which is why
   * a monitoring product sat in a row of thirteen analysis disciplines as
   * though it were the same kind of thing.
   */
  readonly kind: 'analysis' | 'deliverable' | 'monitoring';
  /** Provider routing hard-gated to zero-retention EU inference. */
  readonly zdr?: true;
};

export const MODULES: readonly FactumModule[] = [
  // Wave 1 — no upstream dependencies, run fully in parallel.
  { slug: 'financial', wave: 1, kind: 'analysis', zdr: true },
  { slug: 'commercial', wave: 1, kind: 'analysis' },
  { slug: 'hr', wave: 1, kind: 'analysis' },
  // `it` and `ai-dd` ran as one `technology` module for a while and were split
  // back apart on 20 August 2026, in the product first and here second. The
  // merge argument was that both read the same folder, which is true and turned
  // out not to be the point: they answer different questions off it. `it` reads
  // the systems inventory and the licence schedule, `ai-dd` reads the model
  // contracts and the data-processing agreements. Merged, the second set went
  // unasked.
  //
  // These two slugs and this order are load-bearing beyond this file. The wave
  // diagram draws `shared.modules` in every messages/<locale>.json positionally
  // against this array, so an entry inserted here without the matching label
  // inserted there silently relabels every module below it.
  { slug: 'it', wave: 1, kind: 'analysis' },
  { slug: 'ai-dd', wave: 1, kind: 'analysis' },
  { slug: 'esg', wave: 1, kind: 'analysis' },
  { slug: 'operational', wave: 1, kind: 'analysis' },
  { slug: 'im-screener', wave: 1, kind: 'analysis' },
  { slug: 'vigil', wave: 1, kind: 'monitoring' },
  // Wave 2 — read wave 1 output before they can reason.
  { slug: 'tax', wave: 2, kind: 'analysis', zdr: true },
  { slug: 'legal', wave: 2, kind: 'analysis', zdr: true },
  // Wave 3 — synthesis across waves 1 and 2.
  { slug: 'deal-economics', wave: 3, kind: 'analysis' },
  { slug: 'valuation', wave: 3, kind: 'analysis' },
  { slug: 'portfolio', wave: 3, kind: 'analysis' },
  { slug: 'pmi', wave: 3, kind: 'analysis' },
  // Wave 4 — assemble client-facing deliverables from everything upstream.
  { slug: 'vdd', wave: 4, kind: 'deliverable' },
  { slug: 'ic-memo', wave: 4, kind: 'deliverable' },
  { slug: 'teaser', wave: 4, kind: 'deliverable' },
  { slug: 'fin-memo', wave: 4, kind: 'deliverable' },
  { slug: 'document-factory', wave: 4, kind: 'deliverable' },
  // Wave 5 — post-close, independent of the pre-close waves.
  { slug: 'exit-readiness', wave: 5, kind: 'analysis' },
  { slug: 'portfolio-health', wave: 5, kind: 'monitoring' },
  // Wave 6 — the periodic IC report, on its own because it reads the two
  // modules above as input. Modules inside one wave dispatch concurrently, so
  // while this sat in wave 5 it read the previous run's chapters, or nothing at
  // all on a first run. Only a strictly later wave gives the ordering.
  //
  // The site carried it in wave 5 until 20 August 2026, which understated the
  // run by one wave. It is worth showing rather than smoothing over, because it
  // is the clearest instance of the claim /method already makes: nothing runs
  // early, and a module waits when it depends on another module's output. A
  // reader who checks that claim against the diagram should find it holds.
  { slug: 'ic-report', wave: 6, kind: 'deliverable' }
];

export const MODULE_COUNT = MODULES.length;
export const WAVE_COUNT = 6;

/**
 * The first wave that runs after closing.
 *
 * `DispatchGraph` draws these waves with a dashed rail, because they do not
 * read the pre-close waves and do not belong to the Sprint. It used to test
 * `n === 5`, which silently stopped being right the moment a sixth wave
 * appeared: wave 6 is post-close too and would have drawn as though it were
 * part of the diligence run.
 */
export const POST_CLOSE_FIRST_WAVE = 5;
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
 * What is left is ten things we read the data room *for*. Inserting mid-list
 * re-pairs every later entry with the wrong icon, since `DisciplineGrid` maps
 * them by position, so `ai` arriving at slot seven meant the ICONS array in
 * that file was rebuilt by hand in the same change rather than appended to.
 */
export const DISCIPLINES = [
  'financial',
  'commercial',
  'legal',
  'tax',
  'hr',
  'it',
  'ai',
  'esg',
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

/** Hard-block conditions that stop a sub-agent draft being auto-approved. */
export const HARD_BLOCK_COUNT = 7;
