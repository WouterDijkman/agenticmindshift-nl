import slots from '@/scripts/visuals.slots.json';

/**
 * Which picture goes with which card.
 *
 * These used to be handed out by index — card 0 got scene 0 — which meant the
 * photograph beside a paragraph about pseudonymisation was whatever happened to
 * be fourth in the manifest. Abstract artwork survives that; a photograph of a
 * specific object does not. A reader looks at a picture of a safe dial next to a
 * sentence about retention and tries to make it mean something.
 *
 * So the assignment is explicit and lives here rather than at the call sites,
 * for two reasons: `governancePoints` is shared copy rendered on two pages and
 * has to get the same picture in both, and keeping every list in one file is the
 * only practical way to check that no page repeats a scene.
 *
 * All fifteen scenes are in use. That is deliberate: an unused slot is an image
 * that was paid for and never seen, which is how seven of them ended up orphaned
 * the first time round.
 *
 * The ids are historical. Seven prompts were rewritten in an audit that read every
 * picture against the sentence it sits beside, and several no longer depict the
 * object they are named after — `loupe` is a disc of light on paper, `bolt` is a
 * wedge under a block, `seal` is dust with a bare patch swept in it. The wax that
 * gave `seal` its name was attempted four times and came back glossy, centred and
 * once with a crest embossed on it; the model would not render it to brief, so the
 * subject changed rather than the standard. The names were kept because renaming
 * means regenerating:
 * the seed is derived from the id, so a rename throws away the frame. Trust the
 * comment on each line, not the id.
 */
export type SceneId =
  | 'readout'
  | 'caliper'
  | 'balance'
  | 'tumbler'
  | 'ledger'
  | 'loupe'
  | 'plotter'
  | 'tape'
  | 'index'
  | 'seal'
  | 'trace'
  | 'micrometer'
  | 'sheaf'
  | 'bolt'
  | 'splice';

/** Home — the problem. */
export const HOME_PROBLEM: SceneId[] = [
  'index', // working from a sample — a wall of card edges, one blank card drawn out
  'loupe', // whoever finds it first — one disc of light, one fibre lit inside it
  'caliper', // one discipline is not diligence — two lit edges, the gap between them black
  'seal' // you find out after closing — settled dust, and the shape of what was lifted away
];

/**
 * Home — the section that points at who runs this.
 *
 * Two cables laid into one. The copy is a banker's read and an engineer's
 * discipline joined, and the picture is the same sentence.
 */
export const HOME_GUIDE: SceneId = 'splice';

/** Shared governance copy. Rendered on the homepage and on /governance, same four both times. */
export const GOVERNANCE_POINTS: SceneId[] = [
  'tumbler', // EU-hosted — the dial of a safe
  'tape', // zero retention — the storage medium, and nothing kept on it
  'ledger', // pseudonymised — a ledger whose writing is deliberately illegible
  'readout' // one accountable contact — one lamp lit in a row that stays dark
];

/** Home — what good looks like. */
export const HOME_SUCCESS: SceneId[] = [
  'balance', // the price reflects the whole room — the beam hanging dead level
  'sheaf', // you already know what they'll find — the whole stack, read end to end
  'plotter' // every finding traces to its source — a pen drawing the line back
];

/** /partnerships — who this is for. */
export const PARTNER_PROFILES: SceneId[] = [
  'balance', // corporate finance boutiques — the load carried on both sides at once
  'micrometer', // exit and value-creation — the graduated reference, the baseline first
  'bolt', // restructuring — a wedge under the block, taking the weight
  'loupe' // PE and buy-side — the one lit disc, everything in it sharp
];

/** /diligence-sprint — what the sprint adds. */
export const SPRINT_LAYERS: SceneId[] = [
  'plotter', // value-creation read — the upside, drawn
  'balance', // cross-discipline reconciliation — both ends resolved to level
  'caliper' // live data-gap tracker — the gap itself, lit on both sides
];

/** /diligence-sprint — how it arrives. */
export const SPRINT_FORMATS: SceneId[] = [
  'trace', // review dashboard — a live line on a lit screen
  'ledger', // written report — ruled paper
  'index' // the data-gap tracker alongside — a running list of cards
];

/** /diligence-sprint — what we need from you. */
export const SPRINT_INPUTS: SceneId[] = [
  'tumbler', // data-room access — the lock on the room
  'splice' // answers to the tracker — the gap closed, the two ends joined
];

/**
 * Fail the build rather than the page. A scene renamed or dropped in the
 * manifest would otherwise ship as a 404 behind a card, which is invisible in
 * review and obvious in production.
 */
const MANIFEST = new Set(slots.scenes.map((s) => s.id));
for (const id of [
  ...HOME_PROBLEM,
  HOME_GUIDE,
  ...GOVERNANCE_POINTS,
  ...HOME_SUCCESS,
  ...PARTNER_PROFILES,
  ...SPRINT_LAYERS,
  ...SPRINT_FORMATS,
  ...SPRINT_INPUTS
]) {
  if (!MANIFEST.has(id)) {
    throw new Error(`lib/scenes.ts references "${id}", which is not in visuals.slots.json`);
  }
}

/**
 * No page may show the same photograph twice. Reuse *across* pages is fine and
 * intended — a scene earns its meaning by being the same picture every time — but two
 * identical cards in one scroll read as a mistake, and that is exactly what the
 * old index-based assignment produced.
 */
for (const [page, ids] of [
  ['home', [...HOME_PROBLEM, HOME_GUIDE, ...GOVERNANCE_POINTS, ...HOME_SUCCESS]],
  ['governance', GOVERNANCE_POINTS],
  ['partnerships', PARTNER_PROFILES],
  ['diligence-sprint', [...SPRINT_LAYERS, ...SPRINT_FORMATS, ...SPRINT_INPUTS]]
] as const) {
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) throw new Error(`lib/scenes.ts: /${page} shows "${id}" twice`);
    seen.add(id);
  }
}
