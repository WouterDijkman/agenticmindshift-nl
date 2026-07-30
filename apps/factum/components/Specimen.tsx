import Reveal from './Reveal';

/**
 * The trace, drawn: a page from the data room on the left, the finding it
 * produced on the right, and a line tying one to the other.
 *
 * Every line of the page is a redaction bar. That is not a placeholder standing
 * in for a real sample — it is the actual constraint. Client documents are
 * confidential and no client has released one, so the honest thing to show is
 * the *shape* of the trace at full size: which passage, on which page, behind
 * which claim. The one line that is not redacted is the highlight itself,
 * because where the excerpt sits on the page is the whole point of the picture.
 */

/** Deterministic line widths — a random layout would shift between renders. */
const LINES = [96, 88, 92, 74, 90, 84, 96, 61, 88, 93, 79, 90, 86, 68];
const HIGHLIGHT = 7;

export default function Specimen({
  pageLabel,
  pageRef,
  highlightLabel,
  findingLabel,
  rows,
  footnote
}: {
  pageLabel: string;
  pageRef: string;
  highlightLabel: string;
  findingLabel: string;
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
        <div className="specimen-lines" aria-hidden="true">
          {LINES.map((w, i) => (
            <span
              key={i}
              className={`specimen-line ${i === HIGHLIGHT ? 'specimen-line-hit' : ''}`}
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
        <span className="specimen-tag mono">{highlightLabel}</span>
      </Reveal>

      <span className="specimen-tie" aria-hidden="true" />

      <Reveal delay={140} className="specimen-finding">
        <div className="specimen-finding-head">
          <span className="mono">{findingLabel}</span>
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
