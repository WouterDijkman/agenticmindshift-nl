import Reveal from './Reveal';

export type Verdict = 'yes' | 'partial' | 'no' | 'na';

/**
 * The three alternatives, scored on capabilities rather than on adjectives.
 *
 * Columns are categories of tool, never named products: a named competitor
 * dates within a quarter, invites a comparison fought on their terms, and most
 * of what is publicly claimed about them is vendor-published. What is defensible
 * is the architectural question — does this category of tool do this thing at
 * all — and that is what the marks answer.
 *
 * Below 700px the table restacks into one block per criterion — see the
 * `.matrix` rules in globals.css. It used to stay a table and scroll sideways
 * inside `overflow-x: auto`, which on a 390px phone showed the criterion column
 * and a single anonymous circle: the header row had scrolled off the top and
 * the other three columns off the right, so no mark could be attributed to
 * anything. `matrix-cell-col` carries the column name down into each cell for
 * that layout. It is a real element rather than a `::before`, because the
 * stacked rows are `display: block` and lose their table semantics — the name
 * has to be in the DOM for a screen reader to read it next to the mark.
 */
export default function ComparisonMatrix({
  columns,
  rows,
  legend
}: {
  /** Category names. The last column is Factum and is emphasised. */
  columns: string[];
  rows: { label: string; verdicts: Verdict[]; note?: string }[];
  legend: Record<Exclude<Verdict, 'na'>, string> & { na: string };
}) {
  const last = columns.length - 1;

  return (
    <Reveal className="matrix-wrap">
      <table className="matrix">
        <thead>
          <tr>
            <th scope="col" className="matrix-corner" />
            {columns.map((column, i) => (
              <th
                key={column}
                scope="col"
                className={`matrix-head ${i === last ? 'matrix-head-ours' : ''}`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row" className="matrix-row-label">
                {row.label}
                {row.note && <span className="matrix-note">{row.note}</span>}
              </th>
              {row.verdicts.map((verdict, i) => (
                <td
                  key={columns[i]}
                  className={`matrix-cell matrix-${verdict} ${i === last ? 'matrix-cell-ours' : ''}`}
                >
                  <span className="matrix-cell-col">{columns[i]}</span>
                  <span className="matrix-mark" aria-hidden="true" />
                  <span className="sr-only">{legend[verdict]}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="matrix-legend">
        {(['yes', 'partial', 'no', 'na'] as Verdict[]).map((verdict) => (
          <li key={verdict} className={`matrix-${verdict}`}>
            <span className="matrix-mark" aria-hidden="true" />
            {legend[verdict]}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
