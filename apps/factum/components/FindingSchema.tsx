import { Check } from './Icons';

type Row = {
  key: string;
  value: string;
};

/**
 * The output contract, not a sample finding. Every field here is required
 * before the pipeline marks a finding finished. The values describe the shape
 * each field has to take; the worked example lives on /platform#anatomy, where
 * there is room to show the quote next to the claim it supports.
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
            <span className="type-small" style={{ color: 'var(--text-secondary)' }}>
              {row.value}
            </span>
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
