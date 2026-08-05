import Reveal from './Reveal';

/**
 * The trace, drawn: a page from the data room on the left, the finding it
 * produced on the right, and a line tying one to the other.
 *
 * The page around the excerpt stays as grey bars, because the surrounding
 * document is not the point and drawing it would only invite reading. The
 * excerpt itself is legible: a reader has to be able to check the quote
 * against the finding, which is the whole claim this picture makes. Both the
 * clause and the finding are constructed on a fictional target and labelled as
 * such — no client has released a document, and inventing one that looked real
 * would be worse than saying so.
 */

/** Deterministic line widths — a random layout would shift between renders. */
const LINES = [96, 88, 92, 74, 90, 84, 96, 61, 88, 93, 79];
const HIGHLIGHT = 6;

export default function Specimen({
  pageLabel,
  pageRef,
  highlightLabel,
  findingLabel,
  quote,
  tag,
  rows,
  footnote
}: {
  pageLabel: string;
  pageRef: string;
  highlightLabel: string;
  findingLabel: string;
  quote: string;
  tag: string;
  rows: { key: string; value: string }[];
  footnote: string;
}) {
  return (
    <div className="specimen">
      <Reveal className="specimen-page">
        <div className="specimen-page-head">
          <span className="mono">{pageLabel}</span>
          <span className="mono specimen-page-ref">{pageRef}</span>
        </div>

        <div className="specimen-lines">
          {LINES.slice(0, HIGHLIGHT).map((w, i) => (
            <span key={i} className="specimen-line" style={{ width: `${w}%` }} aria-hidden="true" />
          ))}

          <blockquote className="specimen-quote type-small">{quote}</blockquote>

          {LINES.slice(HIGHLIGHT).map((w, i) => (
            <span
              key={HIGHLIGHT + i}
              className="specimen-line"
              style={{ width: `${w}%` }}
              aria-hidden="true"
            />
          ))}
        </div>

        <span className="specimen-tag mono">{highlightLabel}</span>
      </Reveal>

      <span className="specimen-tie" aria-hidden="true" />

      <Reveal delay={140} className="specimen-finding">
        <div className="specimen-finding-head">
          <span className="mono">{findingLabel}</span>
          <span className="mono specimen-badge">{tag}</span>
        </div>
        <dl className="specimen-rows">
          {rows.map((row, i) => (
            <div key={row.key} className={`specimen-row ${i === 1 ? 'specimen-row-hit' : ''}`}>
              <dt className="schema-key">{row.key}</dt>
              <dd className="type-small">{row.value}</dd>
            </div>
          ))}
        </dl>
        <p className="type-small specimen-foot">{footnote}</p>
      </Reveal>
    </div>
  );
}
