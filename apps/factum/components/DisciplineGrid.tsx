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
  SketchSpeed
} from '@repo/ui/SketchIcons';
import Reveal from './Reveal';

type SketchIcon = ComponentType<{ size?: number; opacity?: number; strokeWidth?: number }>;

/** One mark per discipline, in the order the sources list them. */
const ICONS: SketchIcon[] = [
  SketchReport,
  SketchScale,
  SketchClipboard,
  SketchChip,
  SketchKnowledge,
  SketchPortfolio,
  SketchDueDiligence,
  SketchGear,
  SketchEyeHidden,
  SketchSpeed,
  SketchHourglass
];

/**
 * The scope drawn as a board of marks rather than a numbered list, so the
 * breadth registers before any of the labels are read.
 */
export default function DisciplineGrid({ labels }: { labels: string[] }) {
  return (
    <ol className="discipline-grid stagger">
      {labels.map((label, i) => {
        const Icon = ICONS[i % ICONS.length];
        return (
          <Reveal as="li" key={label} className="discipline-tile">
            <span className="discipline-mark" aria-hidden="true">
              <Icon size={30} strokeWidth={1.1} />
            </span>
            <span className="mono discipline-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="type-h4 discipline-label">{label}</span>
          </Reveal>
        );
      })}
    </ol>
  );
}
