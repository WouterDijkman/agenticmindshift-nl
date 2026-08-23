import type { ComponentType } from 'react';
import {
  SketchChip,
  SketchClipboard,
  SketchDueDiligence,
  SketchGear,
  SketchKnowledge,
  SketchPortfolio,
  SketchReport,
  SketchScale,
  SketchSparring,
  SketchSpeed
} from '@repo/ui/SketchIcons';
import { DISCIPLINE_COUNT } from '@/lib/site';
import Reveal from './Reveal';

type SketchIcon = ComponentType<{ size?: number; opacity?: number; strokeWidth?: number }>;

/**
 * One mark per discipline, in the order `DISCIPLINES` lists them. The mapping
 * is positional rather than keyed by name, so a discipline inserted mid-list
 * shifts every later entry onto its neighbour's icon. Appending is safe;
 * inserting means rebuilding this array in the same change.
 *
 * That happened on 20 August 2026, when `technology` split back into `it` and
 * `ai` and the three rows after it moved down one. The chip had been standing
 * in for the merged row on the reasoning that a chip beats a gear when the row
 * also has to mean AI. Split, each takes the mark it wanted in the first place:
 * the gear for the estate question, the chip for the model question.
 */
const ICONS: SketchIcon[] = [
  SketchReport, // financial
  SketchPortfolio, // commercial
  SketchScale, // legal
  SketchClipboard, // tax
  SketchSparring, // hr
  SketchGear, // it
  SketchChip, // ai
  SketchKnowledge, // esg
  SketchSpeed, // operational
  SketchDueDiligence // valuation
];

export type Discipline = {
  label: string;
  /** What goes wrong here when nobody reads for it. */
  pain: string;
  /** What the reader holds afterwards. One finding, stated concretely. */
  result: string;
};

/**
 * The scope, as ten pairs of "what goes wrong" and "what you get back".
 *
 * This was a board of thirteen labelled marks — Financial, Commercial, Legal —
 * and it had the failure mode every capability list has: it is a list of our
 * departments, and it asks the reader to do the translation into their own
 * problem. Almost none of them will. A buyer weighing a mandate is not looking
 * for the word "Tax"; they are looking for whether the deferred-tax position
 * they half-remember from the IM is going to cost them after closing.
 *
 * So each tile now names the risk first and the finding second, in that order,
 * because that is the order the reader's attention arrives in. The label stays
 * as the anchor — it is still how a buyer's own checklist is organised — but it
 * has stopped being the whole content of the tile.
 *
 * Ten tiles, three columns, so each pair has room to be a sentence rather than
 * a chip. The five-column board it replaces could hold a word and nothing else,
 * which is what made it a capability list in the first place.
 *
 * The column count is not fixed at three. It tracks the roster size so the last
 * row always fills, and splitting `technology` into `it` and `ai` moved the
 * roster from nine to ten, which moved the grid from three columns to two. The
 * reasoning lives with the rule, in `.discipline-grid` in globals.css.
 */
export default function DisciplineGrid({ items }: { items: Discipline[] }) {
  // The prose elsewhere prints DISCIPLINE_COUNT next to this grid. When the two
  // drift the page contradicts itself in public, which is exactly what happened
  // once already. Fail loudly in development instead of shipping the mismatch.
  if (process.env.NODE_ENV !== 'production' && items.length !== DISCIPLINE_COUNT) {
    throw new Error(
      `DisciplineGrid: ${items.length} entries but DISCIPLINE_COUNT is ${DISCIPLINE_COUNT}. ` +
        'Update shared.disciplines in every messages/<locale>.json, or DISCIPLINES in lib/site.ts.'
    );
  }

  return (
    <ol className="discipline-grid">
      {items.map((item, i) => {
        const Icon = ICONS[i % ICONS.length];
        return (
          <Reveal as="li" key={item.label} className="discipline-tile" delay={i * 45}>
            <span className="discipline-mark" aria-hidden="true">
              <span className="discipline-mark-glow" aria-hidden="true" />
              <Icon size={28} strokeWidth={1.1} />
            </span>
            <span className="mono discipline-num">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="type-h4 discipline-label">{item.label}</h3>
            <p className="discipline-pain">{item.pain}</p>
            <p className="discipline-result">{item.result}</p>
          </Reveal>
        );
      })}
    </ol>
  );
}
