import type { ReactNode } from 'react';
import Reveal from './Reveal';

export type BentoTile = {
  title: string;
  body?: string;
  /** Column span out of 6. Defaults to 2, so three tiles fill a row. */
  span?: 2 | 3 | 4 | 6;
  /** Taller tile for anything carrying a figure. */
  tall?: boolean;
  /** A chart, dial or specimen. Sits above the text. */
  figure?: ReactNode;
  /** Short monospace marker in the corner — a count, a status, a unit. */
  tag?: string;
  /** A number the tile exists to show. Rendered at display size, above the title. */
  stat?: string;
  accent?: boolean;
};

/**
 * Mixed-weight tiles on one grid.
 *
 * Cards of identical size force everything on a page to claim equal
 * importance. A bento lets the one tile that carries a measured number take
 * four columns and the supporting facts take two, so the eye gets an order to
 * read in before it reads anything.
 */
export default function BentoGrid({ tiles }: { tiles: BentoTile[] }) {
  return (
    <div className="bento stagger">
      {tiles.map((tile) => (
        <Reveal
          key={tile.title}
          className={`bento-tile ${tile.tall ? 'bento-tall' : ''} ${
            tile.accent ? 'bento-accent' : ''
          }`}
          style={{ '--span': tile.span ?? 2 } as React.CSSProperties}
        >
          {tile.tag && <span className="mono bento-tag">{tile.tag}</span>}
          {tile.stat && (
            <>
              <div className="bento-stat">{tile.stat}</div>
              <div className="bento-stat-rule" />
            </>
          )}
          {tile.figure && <div className="bento-figure">{tile.figure}</div>}
          <h3 className="type-h4 bento-title">{tile.title}</h3>
          {tile.body && (
            <p className="type-small" style={{ marginTop: 8 }}>
              {tile.body}
            </p>
          )}
        </Reveal>
      ))}
    </div>
  );
}
