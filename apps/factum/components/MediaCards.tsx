import Reveal from './Reveal';
import SegmentCard from './SegmentCard';

/**
 * A category list rendered as image-topped cards. The image is a defocused
 * seven-segment macro, cropped differently per card, so a row reads as a varied
 * series rather than as repeated tiles; `seed` shifts that sequence when two
 * grids share a page.
 */
export default function MediaCards({
  items,
  seed = 0,
  chip,
  wide = false
}: {
  items: { title: string; body: string }[];
  seed?: number;
  /** `'number'` counts the cards; any other string is used verbatim on each. */
  chip?: 'number' | (string & {});
  wide?: boolean;
}) {
  return (
    <div className={`card-grid ${wide ? 'card-grid-2' : ''} stagger`}>
      {items.map((item, i) => (
        <Reveal key={item.title} className="media-card">
          <SegmentCard
            index={seed + i}
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
