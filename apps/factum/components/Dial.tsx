/**
 * A single measured number, drawn as an arc that deliberately does not close.
 *
 * The gap at the top of the ring is the 3.3% — it is the only honest way to
 * draw a figure whose whole point is that it is not 100% and not audited. The
 * caveat is a required prop, not an optional one: an unqualified figure is the
 * exact thing this site is arguing against, so it must never render alone.
 */
export default function Dial({
  value,
  unit = '%',
  label,
  caveat
}: {
  /** 0–100. */
  value: number;
  unit?: string;
  label: string;
  caveat: string;
}) {
  const r = 78;
  const circumference = 2 * Math.PI * r;
  // Three quarters of the ring is the full scale, so the open quarter reads as
  // the scale itself rather than as a cropped circle.
  const scale = 0.75;
  const filled = circumference * scale * (value / 100);

  return (
    <figure className="dial">
      <div className="dial-ring">
        <svg viewBox="0 0 200 200" role="img" aria-label={`${value}${unit} — ${label}`}>
          <g transform="rotate(135 100 100)">
            <circle
              cx="100"
              cy="100"
              r={r}
              className="dial-track"
              strokeDasharray={`${circumference * scale} ${circumference}`}
            />
            <circle
              cx="100"
              cy="100"
              r={r}
              className="dial-fill"
              strokeDasharray={`${filled} ${circumference}`}
            />
          </g>
        </svg>
        <div className="dial-center">
          <span className="dial-value">
            {value}
            <span className="dial-unit">{unit}</span>
          </span>
        </div>
      </div>
      <figcaption className="dial-caption">
        <span className="figure-label">{label}</span>
        <p className="type-small" style={{ marginTop: 10, color: 'var(--text-quaternary)' }}>
          {caveat}
        </p>
      </figcaption>
    </figure>
  );
}
