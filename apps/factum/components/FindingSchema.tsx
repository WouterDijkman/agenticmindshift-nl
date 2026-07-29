import { Check } from './Icons';

type Row = {
  key: string;
  value: string;
  /** Redacted rows show the shape of the field without inventing content. */
  redacted?: boolean;
};

/**
 * The output contract, not a sample finding. Every field here is required
 * before the pipeline marks a finding finished; no real finding can be shown
 * until a pilot client releases a redacted one.
 */
export default function FindingSchema({
  label,
  rows,
  footnote
}: {
  label: string;
  rows: Row[];
  footnote: string;
}) {
  return (
    <div className="panel" style={{ overflow: 'hidden' }}>
      <div
        className="hairline-bottom"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '13px 20px',
          background: 'var(--surface-inset)'
        }}
      >
        <span className="mono" style={{ color: 'var(--text-tertiary)' }}>
          {label}
        </span>
        <span
          className="mono"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--wine-text)' }}
        >
          <Check size={12} />
          5/5
        </span>
      </div>

      <div style={{ padding: 'clamp(18px, 2.4vw, 28px)' }}>
        {rows.map((row) => (
          <div key={row.key} className="schema-row">
            <span className="schema-key">{row.key}</span>
            {row.redacted ? (
              <RedactedValue text={row.value} />
            ) : (
              <span className="type-small" style={{ color: 'var(--text-secondary)' }}>
                {row.value}
              </span>
            )}
          </div>
        ))}
      </div>

      <p
        className="type-small hairline-top"
        style={{ padding: '14px 20px', color: 'var(--text-quaternary)', margin: 0 }}
      >
        {footnote}
      </p>
    </div>
  );
}

/** Deterministic bar widths — a random layout would shift between renders. */
const WIDTHS = [88, 64, 96, 52, 76, 40, 84];

function RedactedValue({ text }: { text: string }) {
  const words = text.split(' ').length;
  const bars = Math.min(Math.max(words, 4), 7);

  return (
    <span aria-label={text} style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingTop: 5 }}>
      {Array.from({ length: bars }, (_, i) => (
        <span key={i} className="redacted" style={{ width: WIDTHS[i % WIDTHS.length] }} />
      ))}
    </span>
  );
}
