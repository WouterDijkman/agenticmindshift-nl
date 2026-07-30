import Reveal from './Reveal';

/**
 * The citation checks drawn as a narrowing stack.
 *
 * Each layer is a different *kind* of check, not a repeat of the last one at
 * higher effort — an index lookup, a string match, a language model's judgment,
 * and a second, unrelated model. Drawing them as four bands that step inward
 * makes the sequence read as filtering, and the rust edge on each band is the
 * part of it that catches something. Four identical rows would read as
 * bureaucracy instead.
 */
export default function GroundingStack({
  layers,
  catchLabel
}: {
  layers: { title: string; body: string; catches: string }[];
  catchLabel: string;
}) {
  return (
    <ol className="gstack stagger">
      {layers.map((layer, i) => (
        <Reveal
          as="li"
          key={layer.title}
          className="gstack-layer"
          style={{ '--inset': `${i * 4}%` } as React.CSSProperties}
        >
          <span className="mono gstack-num">{String(i + 1).padStart(2, '0')}</span>
          <div className="gstack-text">
            <h3 className="type-h4">{layer.title}</h3>
            <p className="type-small" style={{ marginTop: 6 }}>
              {layer.body}
            </p>
          </div>
          <div className="gstack-catch">
            <span className="eyebrow gstack-catch-label">{catchLabel}</span>
            <span className="type-small gstack-catch-value">{layer.catches}</span>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
