/**
 * SketchDivider — a hand-drawn horizontal rule.
 * The waviness is baked into bezier control points, not via SVG filters.
 */
interface Props {
  width?: string;
  color?: string;
  opacity?: number;
  className?: string;
}

export default function SketchDivider({
  width = '100%',
  color = 'var(--border-medium)',
  opacity = 1,
  className,
}: Props) {
  return (
    <svg
      viewBox="0 0 400 10"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height: '10px', display: 'block', opacity }}
      className={className}
      aria-hidden="true"
    >
      {/*
        A single cubic bezier line with control points that drift
        slightly above and below the centerline — like a steady hand
        drawing a long horizontal rule.
        The slight asymmetry (not a perfect sine) is intentional.
      */}
      <path
        d="
          M 1,5.4
          C 25,4.7  55,6.1  85,5.2
          C 115,4.3  145,6.5  175,5.0
          C 205,3.6  235,6.3  265,5.1
          C 295,3.9  325,5.9  355,4.8
          C 375,4.1  390,5.6  399,5.1
        "
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
