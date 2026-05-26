/**
 * SketchCrosshair — genuinely hand-drawn target icon.
 * All wobble is baked into the bezier path data — no SVG filters.
 * Inspired by pencil-drawn surveying targets.
 */
interface Props {
  size?: number;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
  className?: string;
}

export default function SketchCrosshair({
  size = 72,
  color = 'currentColor',
  opacity = 1,
  strokeWidth = 1.2,
  className,
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity, display: 'block', flexShrink: 0 }}
      className={className}
      aria-hidden="true"
    >
      {/* ── Circle ──────────────────────────────────────────────────
          Drawn as 4 cubic bezier arcs with deliberate imperfections.
          Control points are ±1–2px off from a mathematically perfect
          circle — exactly how a careful hand-drawing looks.            */}
      <path
        d="
          M 33.2,14.1
          C 38.5,13.6 44.8,16.4 48.4,21.2
          C 52.1,26.1 52.8,33.5 50.3,39.2
          C 47.8,45.1 42.1,49.8 35.8,51.0
          C 29.3,52.3 22.1,49.8 17.6,44.9
          C 13.0,39.9 11.8,32.4 13.9,26.1
          C 16.0,19.7 21.8,14.9 28.5,13.7
          C 30.0,13.5 31.8,13.9 33.2,14.1 Z
        "
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── Horizontal line ─────────────────────────────────────────
          Slight S-curve — breaks at the circle with a small gap       */}
      <path
        d="M 3.5,32.4 C 8,31.9 11.5,32.7 13.8,32.1"
        stroke={color}
        strokeWidth={strokeWidth * 0.85}
        strokeLinecap="round"
      />
      <path
        d="M 50.4,32.3 C 52.5,31.8 57,32.6 60.5,31.9"
        stroke={color}
        strokeWidth={strokeWidth * 0.85}
        strokeLinecap="round"
      />

      {/* ── Vertical line ───────────────────────────────────────────
          Slight lean — breaks at the circle with a small gap          */}
      <path
        d="M 31.8,3.5 C 32.3,8 31.6,11.5 32.2,13.9"
        stroke={color}
        strokeWidth={strokeWidth * 0.85}
        strokeLinecap="round"
      />
      <path
        d="M 32.1,50.2 C 31.6,52.5 32.4,57 31.7,60.5"
        stroke={color}
        strokeWidth={strokeWidth * 0.85}
        strokeLinecap="round"
      />

      {/* ── Center dot ──────────────────────────────────────────────
          Slightly off-round, filled                                    */}
      <path
        d="
          M 32.4,29.0
          C 34.2,29.1 35.5,30.4 35.4,32.2
          C 35.3,34.1 33.9,35.3 32.1,35.2
          C 30.2,35.1 29.0,33.8 29.1,32.0
          C 29.2,30.2 30.6,28.9 32.4,29.0 Z
        "
        fill={color}
        stroke="none"
      />
    </svg>
  );
}
