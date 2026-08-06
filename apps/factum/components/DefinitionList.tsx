import Reveal from './Reveal';

type Item = { title: string; body: string; note: string };

/**
 * A numbered list where every row carries a second, labelled line.
 *
 * The two reference pages both need the same object and nothing else on the
 * site did: /method states the five fields of the output contract and, for
 * each, what happens when it cannot be filled; /limits-of-ai states five things
 * the machine does not do and, for each, who does it instead. In both cases the
 * second line is the point — a list of fields is a schema dump, a list of
 * fields with their failure mode is a contract.
 *
 * Built on `.stage-list` rather than beside it, so the hairline rhythm matches
 * the deal cycle on the homepage and the accountability list on /team. What it
 * adds is the numeral and the note; a `StageList` with a longer body would have
 * buried the second line inside the first paragraph, which is exactly where a
 * reader skips it.
 */
export default function DefinitionList({
  items,
  noteLabel
}: {
  items: Item[];
  /** The same label on every row, e.g. "When it can’t be filled". */
  noteLabel: string;
}) {
  return (
    <ol className="stage-list">
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} className="stage-row" delay={i * 50}>
          <h3 className="type-h4 stage-label">
            <span className="mono def-index" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            {item.title}
          </h3>
          <div>
            <p className="type-body">{item.body}</p>
            <p className="def-note">
              <span className="mono def-note-label">{noteLabel}</span>
              <span className="type-small">{item.note}</span>
            </p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
