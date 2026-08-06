import Reveal from './Reveal';
import type { Discipline } from './DisciplineGrid';

/**
 * The ten disciplines as an index: numbers and names, nothing else.
 *
 * `DisciplineGrid` renders the same ten with a failure and an outcome under
 * each — about 250 words — and it used to run on the homepage *and* on
 * /diligence-sprint. Measured, those two pages shared 31% of their content,
 * and this grid was almost all of it.
 *
 * The argument for the long form is real: a bare list of names proves breadth
 * but leaves the reader to work out why any of them matters. The answer is not
 * to delete that work, it is to put it where the reader has already decided
 * they want it. On the sprint page they have. On the homepage they are still
 * deciding whether to keep scrolling, and ten paragraphs of "here is what goes
 * wrong" is the wrong shape for that moment.
 *
 * So the homepage states the breadth in a form you can take in without
 * reading — a set, laid out as a set — and the page that sells the engagement
 * keeps the reasoning.
 */
export default function DisciplineIndex({ items }: { items: Discipline[] }) {
  return (
    <Reveal>
      <ol className="discipline-index">
        {items.map((d, i) => (
          <li key={d.label} className="discipline-index-item">
            <span className="discipline-index-num mono" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="discipline-index-label">{d.label}</span>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
