import Reveal from './Reveal';

/**
 * The tenancy boundary, drawn.
 *
 * The system keeps two memories and only one of them crosses between clients.
 * Prose can state that; a picture with a line down the middle makes the reader
 * check which side each item is on, which is the question they actually have.
 */
export default function TenancySplit({
  columns
}: {
  columns: { label: string; body: string; items: string[] }[];
}) {
  return (
    <div className="tenancy">
      {columns.map((column, i) => (
        <Reveal
          key={column.label}
          delay={i * 90}
          className={`tenancy-col ${i === 0 ? 'tenancy-shared' : 'tenancy-scoped'}`}
        >
          <span className="mono tenancy-label">{column.label}</span>
          <p className="type-small tenancy-body">{column.body}</p>
          <ul className="tenancy-items">
            {column.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
