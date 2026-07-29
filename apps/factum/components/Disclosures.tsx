type Item = { q: string; a: string };

/**
 * Closed state must already communicate — anything only visible after a click
 * is content most visitors never see. The question carries the substance.
 */
export default function Disclosures({ items }: { items: Item[] }) {
  return (
    <div>
      {items.map((item) => (
        <details key={item.q} className="disclosure">
          <summary>{item.q}</summary>
          <div>
            <p className="type-body measure">{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
