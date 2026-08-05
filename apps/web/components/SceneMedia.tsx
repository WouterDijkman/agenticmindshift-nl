import Image from 'next/image';
import type { SceneId } from '@/lib/scenes';

/**
 * A generated scene: the still, under this site's grade.
 *
 * Factum has a component of the same name and shape. They are deliberately not
 * shared, because the only interesting thing either one does is the grade, and the
 * two grades are opposites: Factum lays 42% navy over near-black instrument macros,
 * this lays a warm paper wash over high-key daylight. Hoisting twenty lines into
 * `@repo/ui` would leave the halves that actually differ behind in each app anyway.
 *
 * The wash is CSS rather than baked into the JPEGs, which is what keeps fifteen
 * separately generated frames reading as one shoot instead of fifteen slightly
 * different whites. Regenerating one frame then does not strand it outside the set.
 *
 * Fills its positioned parent; the parent owns the aspect ratio.
 */
export default function SceneMedia({
  id,
  priority = false,
  sizes = '100vw',
  className
}: {
  /** Slot id from scripts/visuals.slots.json — names the .jpg. */
  id: SceneId;
  priority?: boolean;
  sizes?: string;
  /** Extra class on the wrapper, for a caller that needs a different wash. */
  className?: string;
}) {
  return (
    <div className={className ? `scene ${className}` : 'scene'} aria-hidden="true">
      <Image
        className="scene-still"
        src={`/visuals/${id}.jpg`}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
      />
      <span className="scene-wash" />
    </div>
  );
}
