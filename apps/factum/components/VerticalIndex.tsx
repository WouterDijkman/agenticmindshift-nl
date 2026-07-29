import { VERTICAL_MODULE_COUNTS } from '@/lib/site';

/**
 * The 30 verticals the sources name, in source order. Never 241 cards — the
 * index is the point. Counts appear only where a source states one.
 */
export default function VerticalIndex({
  labels,
  moduleSuffix
}: {
  labels: string[];
  moduleSuffix: string;
}) {
  return (
    <ul className="vertical-list">
      {labels.map((label, i) => {
        const count = VERTICAL_MODULE_COUNTS[i] ?? null;
        return (
          <li key={label} className="vertical-item" data-counted={count !== null}>
            {label}
            {count !== null && (
              <span className="vertical-count">
                {count} {moduleSuffix}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
