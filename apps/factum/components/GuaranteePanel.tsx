/**
 * The findings guarantee, sized to sit beside a button.
 *
 * `GuaranteeBand` is the full-width statement of the same promise, used once,
 * directly under the homepage hero. This is the compact form, and it exists for
 * one reason: doubt peaks at the button, not at the top of the page. Every
 * closing CTA on the site used to run one narrow column with the entire right
 * half empty — on the last screen before the footer, which is the screen where
 * the decision actually gets made.
 *
 * It is deliberately the same three lines on every page. A risk reversal that
 * gets reworded per page reads as marketing; one that is repeated verbatim
 * reads as a term of business, which is what it is.
 */
export default function GuaranteePanel({
  label,
  claim,
  note
}: {
  label: string;
  claim: string;
  /** Optional: the closing band already prints the condition under the button. */
  note?: string;
}) {
  return (
    <div className="panel" style={{ padding: 'clamp(22px, 3vw, 32px)' }}>
      <span className="eyebrow eyebrow-accent" style={{ marginBottom: 14 }}>
        {label}
      </span>
      <p className="type-h4" style={{ margin: 0, color: 'var(--text-display)' }}>
        {claim}
      </p>
      {note && (
        <p
          className="type-small"
          style={{ marginTop: 14, marginBottom: 0, color: 'var(--text-quaternary)' }}
        >
          {note}
        </p>
      )}
    </div>
  );
}
