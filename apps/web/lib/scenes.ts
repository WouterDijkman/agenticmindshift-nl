import slots from '@/scripts/visuals.slots.json';

/**
 * Which picture goes with which card.
 *
 * The procedural `CardVisual` this replaces was seeded by position — `index={d.i}`,
 * `index={s.i + 22}` — so the artwork beside "Kennisborging" was whatever the PRNG
 * happened to draw for slot six. A generated abstract survives that. A photograph
 * does not: a reader looks at a picture and tries to make it mean something, and if
 * it means nothing they conclude the page was assembled carelessly.
 *
 * So every assignment here is deliberate and the reason is written next to it. The
 * pictures are pale planes, paper and cast shadow — a deliberately different world
 * from Factum's dark amber instruments, because this site sells self-diagnosis in
 * daylight rather than forensic examination of somebody else's target.
 *
 * All fifteen scenes are in use. That is the point: on Factum, seven images were
 * generated, paid for and never placed. Nothing is generated here that has no slot.
 */
export type SceneId =
  | 'wedge'
  | 'blocks'
  | 'overlap'
  | 'grid'
  | 'stack'
  | 'tab'
  | 'aperture'
  | 'flap'
  | 'lag'
  | 'punch'
  | 'curl'
  | 'step'
  | 'pair'
  | 'corner'
  | 'ramp';

/**
 * Home — de zes dimensies. Order matches DIMENSION_META (01–06) in
 * HomepageDimensionsSection.
 */
export const HOME_DIMENSIONS: SceneId[] = [
  'wedge', // 01 Doorlooptijd — werkdagen tussen IM en oordeel: a hard edge cutting a plane into unequal parts
  'blocks', // 02 Portefeuille-inzicht — unequal heights, each measured by the length of its own shadow
  'overlap', // 03 Oordeelsvorming — data en de relatie met management: two sheets, one third tone where they meet
  'grid', // 04 AI-volwassenheid — the regular system, one band of it still in shade
  'stack', // 05 Teamcapaciteit — wat blijft liggen: the pile, fanned at the top
  'tab' // 06 Kennisborging — één divider naar voren, en verderop een gat waar er een mist
];

/** Home — de drie pijnpunten. Order matches PAIN in HomepagePainSection. */
export const HOME_PAIN: SceneId[] = [
  'aperture', // Onzichtbaar risico — u beslist op wat u ziet: brightness in the opening, a void beyond it
  'flap', // Kennisretentie — de map die niemand opent, closed flat, nothing showing
  'lag' // Te late signalering — the shadow has already crossed the floor; the cause is out of frame
];

/** Home — de Quickscan, drie stappen. Order matches STEPS in HomepageStepsSection. */
export const HOME_STEPS: SceneId[] = [
  'punch', // Beantwoord 15 vragen — multiple choice, geen open velden: discrete holes, nothing written
  'curl', // Ontvang uw rapport — one sheet lifting off the surface, on its own
  'step' // Bepaal uw volgende stap — two planes, one riser, seen from above
];

/** /werkwijze — van interesse naar samenwerking. Order matches WerkwijzeOnboardingSteps. */
export const WERKWIJZE_STEPS: SceneId[] = [
  'pair', // Scorecard of sparring — two identical forms, one lit, one not: a choice between routes
  'corner', // Intake en voorstel — scope, doorlooptijd, tarief, geen open einden: a join with no ambiguity
  'ramp' // Start binnen een week — light already travelling up the slope
];

/**
 * Fail the build rather than the page. A scene renamed or dropped in the manifest
 * would otherwise ship as a 404 behind a card, which is invisible in review and
 * obvious in production.
 */
const MANIFEST = new Set(slots.scenes.map((s) => s.id));
for (const id of [...HOME_DIMENSIONS, ...HOME_PAIN, ...HOME_STEPS, ...WERKWIJZE_STEPS]) {
  if (!MANIFEST.has(id)) {
    throw new Error(`lib/scenes.ts references "${id}", which is not in visuals.slots.json`);
  }
}

/**
 * No page may show the same photograph twice. The homepage carries twelve of the
 * fifteen in one scroll, which is where a repeat would be most obvious and least
 * excusable. Reuse across pages would be fine; there happens to be none.
 */
for (const [page, ids] of [
  ['home', [...HOME_DIMENSIONS, ...HOME_PAIN, ...HOME_STEPS]],
  ['werkwijze', WERKWIJZE_STEPS]
] as const) {
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) throw new Error(`lib/scenes.ts: /${page} shows "${id}" twice`);
    seen.add(id);
  }
}
