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
 * pictures are ordinary desk and office objects in flat daylight — a deliberately
 * different world from Factum's dark amber instruments, because this site sells
 * self-diagnosis in daylight rather than forensic examination of somebody else's
 * target.
 *
 * A first set was drawn as pure abstraction — planes, cast shadows, a wedge of
 * light — and rejected on review: handsome, but it did not tell a reader anything
 * about the paragraph beside it. Each picture now shows a recognisable thing that
 * carries the card's sentence on its own. The subject stays plain and unbranded so
 * it reads as a still life rather than a stock photograph of an office.
 *
 * All fifteen scenes are in use. That is the point: on Factum, seven images were
 * generated, paid for and never placed. Nothing is generated here that has no slot.
 *
 * Two ids are already nominal. Neither `chart` nor `decline` draws a graph: asked for
 * one, the model would only ever return a rising bar chart, twice with gibberish
 * captions and once extruded into 3D off the page. `chart` became a patchily filled
 * matrix and `decline` became a run of paper going over the desk edge. The ids stayed
 * because the seed is derived from the id and a rename throws the frame away. Trust
 * the comment on the line, not the id.
 *
 * This module deliberately does not import the slot manifest. Every section that
 * renders a card is a client component, so anything imported here is bundled and
 * shipped, and the manifest is several kilobytes of generation prompts that no
 * browser has any use for. The cross-check against it lives in `scenes.manifest.ts`,
 * which the marketing layout imports on the server.
 */
export type SceneId =
  | 'keys'
  | 'underneath'
  | 'archivebox'
  | 'decline'
  | 'report'
  | 'diary'
  | 'twocups'
  | 'proposal'
  | 'deskready';

/** Home — de drie pijnpunten. Order matches PAIN in HomepagePainSection. */
export const HOME_PAIN: SceneId[] = [
  'underneath', // Onzichtbaar risico — u beslist op wat u ziet: one page slipped under the stack, only its edge showing
  'archivebox', // Kennisretentie — the box closed, the label blank, dust already settled on the lid
  'decline' // Te late signalering — the run of output kept coming, over the edge and onto the floor, uncollected
];

/**
 * Home — de drie routes. Order matches SERVICES in HomepageServicesSection.
 *
 * These three carry the offer, so they get the three pictures that show a
 * thing being handed over rather than a thing going wrong: a conversation,
 * a tool, a bound document.
 */
export const HOME_SERVICES: SceneId[] = [
  'twocups', // AI Sparring & Strategie — two cups, and a conversation either way
  'report', // AI-advies — the plan, bound, closed, and yours to open
  'keys' // Implementatie & adoptie — the tool is on the desk; not one key is marked yet
];

/* HOME_AREAS placed six more pictures under "waar AI het verschil maakt".
   Those six paragraphs were the Scorecard's six dimensions wearing a new hat,
   and they restated the three routes above them at twice the length — the
   single biggest reason the homepage read as too much. The section is gone and
   the six frames (hourglass, chart, chairs, form, intray, binders) were struck
   from the slot manifest with their .jpgs, per the note in scenes.manifest.ts.
   They are in git if a paragraph ever earns them back. */

/** /werkwijze — van interesse naar samenwerking. Order matches WerkwijzeOnboardingSteps. */
export const WERKWIJZE_STEPS: SceneId[] = [
  'diary', // Sparringsessie — the diary open at a blank page, pen in the gutter
  'proposal', // Intake en voorstel — scope, doorlooptijd, tarief: the stack squared, the pen across it
  'deskready' // Start binnen een week — the desk cleared, notebook and pen set square, ready
];

/** Every id this site places, in one array, for the manifest cross-check. */
export const ALL_PLACED: SceneId[] = [...HOME_PAIN, ...HOME_SERVICES, ...WERKWIJZE_STEPS];

/**
 * No page may show the same photograph twice. The homepage carries six of the
 * nine in one scroll, which is where a repeat would be most obvious and least
 * excusable. Reuse across pages would be fine; there happens to be none.
 */
for (const [page, ids] of [
  ['home', [...HOME_PAIN, ...HOME_SERVICES]],
  ['werkwijze', WERKWIJZE_STEPS]
] as const) {
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) throw new Error(`lib/scenes.ts: /${page} shows "${id}" twice`);
    seen.add(id);
  }
}
