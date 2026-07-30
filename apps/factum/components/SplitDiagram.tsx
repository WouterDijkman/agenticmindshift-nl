import Reveal from './Reveal';

/**
 * Two responsibilities drawn as two territories with a seam between them.
 * The seam is the content: the partner's side and ours never overlap, so the
 * boundary is a drawn line rather than a sentence claiming there is one.
 */
export default function SplitDiagram({
  columns,
  seamLabel
}: {
  columns: { label: string; items: string[] }[];
  seamLabel: string;
}) {
  return (
    <div className="split-diagram">
      <span className="split-seam" aria-hidden="true">
        <span className="split-seam-label mono">{seamLabel}</span>
      </span>
      {columns.map((column, c) => (
        <div key={column.label} className={`split-side ${c === 1 ? 'split-side-ours' : ''}`}>
          <span className="eyebrow split-side-label">{column.label}</span>
          <ul className="split-list stagger">
            {column.items.map((item) => (
              <Reveal as="li" key={item} className="split-item type-small">
                <span className="split-marker" aria-hidden="true" />
                {item}
              </Reveal>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
