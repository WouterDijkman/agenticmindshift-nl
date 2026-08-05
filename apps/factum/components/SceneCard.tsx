import type { SceneId } from '@/lib/scenes';
import SceneMedia from './SceneMedia';

/**
 * The card image: one of the twelve generated scenes, under the brand grade.
 *
 * This replaces the procedural seven-segment artwork that used to sit here. That
 * version was an SVG imitation of a photograph, and it read as one — the crop and
 * the falloff were right, but a drawn shape never has the grain, the falloff or
 * the bokeh of a real macro, and at card size the difference is the whole effect.
 *
 * Which scene appears is decided in `lib/scenes.ts`, against the copy the card
 * carries. It used to be positional — card 0 got scene 0 — which is fine for
 * abstract artwork and wrong for a photograph of a specific object.
 *
 * The card is still. Motion loops were built and rejected on the strength of the
 * loops themselves, not the mechanism.
 */
export default function SceneCard({
  id,
  chip
}: {
  /** Scene to show. Assigned per copy list in `lib/scenes.ts`. */
  id: SceneId;
  /** Small corner chip, e.g. "01". */
  chip?: string;
}) {
  return (
    <div className="wb-card-media">
      {/* Cards are at most half the viewport, and a third of it once the grid
          goes three-up, so never ask for a full-width source. */}
      <SceneMedia id={id} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
      {chip && <span className="wb-card-chip">{chip}</span>}
    </div>
  );
}
