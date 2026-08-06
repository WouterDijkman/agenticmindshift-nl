import { Check } from './Icons';

type Row = {
  key: string;
  value: string;
};

/**
 * The output contract, not a sample finding. Every field here is required
 * before the pipeline marks a finding finished. The values describe the shape
 * each field has to take; the worked example lives at /#anatomy, further down
 * the homepage, where there is room to show the quote next to the claim it
 * supports.
 *
 * On a phone the last two rows are held back. Measured at 386px the hero copy
 * alone runs to 1,199px against an 840px fold, so this artefact — the strongest
 * evidence on the page — lands straddling the fold and the reader meets it
 * half-cut. Three rows fit the first screen after the fold, whole. The badge
 * still reads 5/5 because the contract still has five fields; `moreLabel` says
 * out loud that two are not printed here, so the shortening is visible rather
 * than a quiet omission.
 */
const MOBILE_ROWS = 3;

export default function FindingSchema({
  label,
  rows,
  footnote,
  moreLabel
}: {
  label: string;
  rows: Row[];
  footnote: string;
  /** Mobile-only note naming the rows held back, e.g. "+2 fields". */
  moreLabel?: string;
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
          {rows.length}/{rows.length}
        </span>
      </div>

      <div style={{ padding: 'clamp(18px, 2.4vw, 28px)' }}>
        {rows.map((row, i) => (
          <div
            key={row.key}
            className="schema-row"
            data-fold={i >= MOBILE_ROWS ? 'true' : undefined}
          >
            <span className="schema-key">{row.key}</span>
            <span className="type-small" style={{ color: 'var(--text-secondary)' }}>
              {row.value}
            </span>
          </div>
        ))}
        {moreLabel && rows.length > MOBILE_ROWS && (
          <p className="mono schema-more">{moreLabel}</p>
        )}
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
