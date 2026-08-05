import type { SceneId } from '@/lib/scenes';
import Reveal from './Reveal';
import SceneCard from './SceneCard';

/**
 * A category list rendered as image-topped cards, each topped by a generated
 * macro of an instrument of measurement.
 *
 * `scenes` is required and positional: `scenes[i]` belongs to `items[i]`. It
 * replaced a numeric seed that walked the library in order, which gave a row
 * pleasant variety and no relationship at all to what the cards said. The lists
 * themselves live in `lib/scenes.ts`, next to the reasoning for each pairing.
 */
export default function MediaCards({
  items,
  scenes,
  chip,
  wide = false
}: {
  items: { title: string; body: string }[];
  /** One scene per item, in order. Must be at least as long as `items`. */
  scenes: SceneId[];
  /** `'number'` counts the cards; any other string is used verbatim on each. */
  chip?: 'number' | (string & {});
  wide?: boolean;
}) {
  // Copy lists are translated, so a locale that gained or lost a bullet would
  // otherwise silently drop the last card's image. Fail loudly instead.
  if (scenes.length < items.length) {
    throw new Error(`MediaCards: ${items.length} items but only ${scenes.length} scenes`);
  }

  return (
    <div className={`card-grid ${wide ? 'card-grid-2' : ''} stagger`}>
      {items.map((item, i) => (
        <Reveal key={item.title} className="media-card">
          <SceneCard
            id={scenes[i]}
            chip={chip === 'number' ? String(i + 1).padStart(2, '0') : chip}
          />
          <div className="card-body">
            <h3 className="type-h4" style={{ marginBottom: 8 }}>
              {item.title}
            </h3>
            <p className="type-small">{item.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
