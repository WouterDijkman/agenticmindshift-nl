import type { ComponentType } from 'react';
import CardVisual from '@repo/ui/CardVisual';
import Reveal from './Reveal';

type SketchIcon = ComponentType<{
  size?: number;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
}>;

/**
 * A category list rendered as image-topped cards. Every scene is generated
 * from the card's index, so a row reads as a varied series rather than as
 * repeated tiles; `seed` shifts that sequence when two grids share a page.
 */
export default function MediaCards({
  items,
  icons,
  seed = 0,
  chip,
  scene,
  wide = false
}: {
  items: { title: string; body: string }[];
  icons: SketchIcon[];
  seed?: number;
  /** `'number'` counts the cards; any other string is used verbatim on each. */
  chip?: 'number' | (string & {});
  scene?: 'constellation' | 'chart';
  wide?: boolean;
}) {
  return (
    <div className={`card-grid ${wide ? 'card-grid-2' : ''} stagger`}>
      {items.map((item, i) => (
        <Reveal key={item.title} className="media-card">
          <CardVisual
            index={seed + i}
            Icon={icons[i % icons.length]}
            chip={chip === 'number' ? String(i + 1).padStart(2, '0') : chip}
            iconSize={62}
            scene={scene}
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
