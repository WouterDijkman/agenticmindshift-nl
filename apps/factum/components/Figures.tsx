type Figure = {
  value: string;
  label: string;
  /** Required. A number without its qualifier is the thing we promised not to ship. */
  note: string;
};

export default function Figures({ items }: { items: Figure[] }) {
  return (
    <div
      className="rule-grid"
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, 220px), 1fr))` }}
    >
      {items.map((item) => (
        <div key={item.label}>
          <div className="figure-value">{item.value}</div>
          <div className="figure-label" style={{ marginTop: 12 }}>
            {item.label}
          </div>
          <p className="type-small" style={{ marginTop: 10, color: 'var(--text-quaternary)' }}>
            {item.note}
          </p>
        </div>
      ))}
    </div>
  );
}
