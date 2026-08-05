import Image from 'next/image';

/**
 * A generated scene: the still, under the brand grade.
 *
 * The navy tint and the scrim are CSS rather than baked into the asset, which is
 * what keeps a dozen separately generated frames reading as one set instead of a
 * dozen different colour temperatures.
 *
 * There were motion loops here for a while — an .mp4 whose first frame was this
 * still, layered on top of it. Hover first, then autoplay on scroll. Both worked;
 * the loops themselves were the problem, so they are gone rather than disabled.
 * With them went the client-side half of this component: no observers, no refs,
 * no state, and nothing to hydrate. The .mp4s have since been deleted too — they
 * were 12 MB of rejected work sitting in a public directory. Model, prompt, seed
 * and size for all sixteen are still in scripts/visuals.lock.json, so the
 * decision is reversible with `generate-visuals.mjs --videos`; it costs credits
 * and a re-review, not a rewrite.
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
  id: string;
  priority?: boolean;
  sizes?: string;
  /** Extra class on the wrapper, for a caller that needs a different scrim. */
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
      <span className="scene-tint" />
      <span className="scene-scrim" />
    </div>
  );
}
