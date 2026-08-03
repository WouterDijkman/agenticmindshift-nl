import type { ComponentType } from 'react';
import {
  SketchChip,
  SketchClipboard,
  SketchDueDiligence,
  SketchEyeHidden,
  SketchGear,
  SketchHourglass,
  SketchKnowledge,
  SketchPortfolio,
  SketchReport,
  SketchScale,
  SketchSparring,
  SketchSpeed,
  SketchWarning
} from '@repo/ui/SketchIcons';
import { DISCIPLINE_COUNT } from '@/lib/site';
import Reveal from './Reveal';

type SketchIcon = ComponentType<{ size?: number; opacity?: number; strokeWidth?: number }>;

/**
 * One mark per discipline, in the order the sources list them. New
 * disciplines are appended, never inserted mid-list — inserting would shift
 * every later label onto a different icon by index, since the mapping here
 * is positional rather than keyed by name.
 */
const ICONS: SketchIcon[] = [
  SketchReport,
  SketchScale,
  SketchClipboard,
  SketchChip,
  SketchKnowledge,
  SketchPortfolio,
  SketchDueDiligence,
  SketchGear,
  SketchWarning,
  SketchSpeed,
  SketchHourglass,
  SketchSparring,
  SketchEyeHidden
];

/**
 * The scope drawn as a board of marks rather than a numbered list, so the
 * breadth registers before any of the labels are read.
 */
export default function DisciplineGrid({ labels }: { labels: string[] }) {
  // The prose elsewhere prints DISCIPLINE_COUNT next to this grid. When the two
  // drift the page contradicts itself in public, which is exactly what happened
  // once already. Fail loudly in development instead of shipping the mismatch.
  if (process.env.NODE_ENV !== 'production' && labels.length !== DISCIPLINE_COUNT) {
    throw new Error(
      `DisciplineGrid: ${labels.length} labels but DISCIPLINE_COUNT is ${DISCIPLINE_COUNT}. ` +
        'Update shared.disciplines in every messages/<locale>.json, or DISCIPLINES in lib/site.ts.'
    );
  }

  return (
    <ol className="discipline-grid stagger">
      {labels.map((label, i) => {
        const Icon = ICONS[i % ICONS.length];
        return (
          <Reveal as="li" key={label} className="discipline-tile">
            <span className="discipline-mark" aria-hidden="true">
              <span className="discipline-mark-glow" aria-hidden="true" />
              <Icon size={32} strokeWidth={1.1} />
            </span>
            <span className="mono discipline-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="type-h4 discipline-label">{label}</span>
          </Reveal>
        );
      })}
    </ol>
  );
}
