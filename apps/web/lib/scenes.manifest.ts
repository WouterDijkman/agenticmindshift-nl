import slots from '@/scripts/visuals.slots.json';
import { ALL_PLACED } from './scenes';

/**
 * Fail the build rather than the page.
 *
 * A scene renamed or dropped in `scripts/visuals.slots.json` would otherwise ship as
 * a 404 behind a card: invisible in review, obvious in production. TypeScript cannot
 * catch it, because the manifest is JSON and the ids in `scenes.ts` are a hand-written
 * union — the two can drift apart and still typecheck.
 *
 * This lives apart from `scenes.ts` so that importing a scene list never drags the
 * manifest into a client bundle. Only the marketing layout imports this file, and
 * only on the server, which is enough: it runs once at build and once per cold start.
 *
 * Unplaced slots are not an error here — but there are none, and there should stay
 * none. Every generated frame costs money and an unplaced one is a frame nobody ever
 * sees; on Factum seven ended up orphaned exactly that way.
 */
const MANIFEST = new Set(slots.scenes.map((s) => s.id));

for (const id of ALL_PLACED) {
  if (!MANIFEST.has(id)) {
    throw new Error(
      `lib/scenes.ts places "${id}", which is not in scripts/visuals.slots.json. ` +
        `Known ids: ${[...MANIFEST].join(', ')}`
    );
  }
}

const PLACED = new Set<string>(ALL_PLACED);
const orphans = [...MANIFEST].filter((id) => !PLACED.has(id));
if (orphans.length) {
  throw new Error(
    `scripts/visuals.slots.json defines scenes no page places: ${orphans.join(', ')}. ` +
      `Place them in lib/scenes.ts or delete the slot and its .jpg.`
  );
}

export {};
