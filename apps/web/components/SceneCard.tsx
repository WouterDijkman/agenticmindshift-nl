import type { SceneId } from '@/lib/scenes';
import SceneMedia from './SceneMedia';

/**
 * The image area of a card: one of the fifteen generated stills.
 *
 * This replaces `CardVisual`, a 250-line procedural SVG that drew a navy gradient,
 * a dot matrix, a node constellation and a line icon, seeded from the card's index.
 * It was competent and it was wrong twice over: it put a dark panel at the top of
 * every card on a site whose whole surface is `#F7F2EB`, and being index-seeded it
 * could not say anything about the copy underneath it — card six got whatever the
 * PRNG drew for six.
 *
 * The icon went with it. A line icon centred over a photograph is a second subject
 * competing with the first, and the photograph is the better one.
 *
 * Which still appears is decided in `lib/scenes.ts`, against the copy the card
 * carries.
 */
export default function SceneCard({
  id,
  chip,
  priority = false
}: {
  /** Scene to show. Assigned per copy list in `lib/scenes.ts`. */
  id: SceneId;
  /** Small corner chip, e.g. "01". */
  chip?: string;
  /** Set on above-the-fold cards only. */
  priority?: boolean;
}) {
  return (
    <div className="wb-card-media">
      {/* Cards are at most half the viewport, and a third of it once the grid goes
          three-up, so never ask for a full-width source. */}
      <SceneMedia
        id={id}
        priority={priority}
        sizes="(max-width: 540px) 100vw, (max-width: 860px) 50vw, 33vw"
      />
      {chip && <span className="wb-card-chip">{chip}</span>}
    </div>
  );
}
