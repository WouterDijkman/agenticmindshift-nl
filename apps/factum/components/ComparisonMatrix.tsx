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
