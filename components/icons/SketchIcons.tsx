/**
 * SketchIcons — hand-drawn line-icons in the same wobble-baked-into-the-path
 * style as SketchCrosshair / SketchDivider. Stroke-only, currentColor-friendly.
 *
 * Used to break up text-heavy marketing sections (werkwijze offerings,
 * homepage steps). Each icon has the same Props shape and 64×64 viewBox so
 * they line up at consistent sizes.
 */

interface Props {
  size?: number;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
  className?: string;
}

interface IconShellProps extends Props {
  children: React.ReactNode;
}

function IconShell({ size = 56, color, opacity = 1, className, children }: IconShellProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity, display: 'block', flexShrink: 0, color: color ?? 'currentColor' }}
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const baseStroke = {
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  fill: 'none' as const,
};

// ─── 1. Sparring — two overlapping speech bubbles ────────────────────────
export function SketchSparring({ strokeWidth = 1.4, ...rest }: Props) {
  return (
    <IconShell {...rest}>
      {/* Bubble A (back, larger) */}
      <path
        d="M 9.2,16.5 C 9.6,12.8 12.5,10.1 16.1,9.9 L 36.4,10.0 C 40.3,10.0 43.2,13.0 43.4,16.7 L 43.6,28.2 C 43.4,31.9 40.5,34.7 36.7,34.9 L 22.0,35.0 L 14.2,41.8 C 13.5,42.3 12.6,41.7 12.7,40.8 L 12.9,34.8 C 10.7,34.0 9.3,32.0 9.2,29.6 Z"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Bubble B (front, smaller) */}
      <path
        d="M 27.4,30.7 C 27.2,28.4 28.8,26.5 31.1,26.3 L 50.8,26.4 C 53.2,26.5 55.1,28.5 54.9,30.9 L 54.8,42.0 C 54.6,44.3 52.7,46.1 50.4,46.2 L 41.6,46.3 L 47.7,53.5 C 48.2,54.1 47.5,54.9 46.8,54.5 L 36.4,49.0 L 32.3,49.1 C 29.9,49.1 28.0,47.2 27.9,44.9 Z"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Three dots in bubble A */}
      <circle cx="19.3" cy="22.4" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="26.4" cy="22.5" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="33.4" cy="22.4" r="1.3" fill="currentColor" stroke="none" />
    </IconShell>
  );
}

// ─── 2. Consultancy / Workshop — open book with bookmark ────────────────
export function SketchConsultancy({ strokeWidth = 1.4, ...rest }: Props) {
  return (
    <IconShell {...rest}>
      {/* Left page */}
      <path
        d="M 7.5,17.2 C 13.4,15.8 22.0,15.6 30.8,18.0 C 31.4,18.2 31.8,18.8 31.7,19.4 L 31.5,49.6 C 31.5,50.4 30.7,50.9 30.0,50.6 C 21.8,48.4 13.8,48.6 8.3,49.9 C 7.6,50.0 7.0,49.5 7.0,48.8 L 7.1,18.4 C 7.1,17.8 7.4,17.3 7.5,17.2 Z"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Right page */}
      <path
        d="M 31.7,19.4 C 38.5,17.1 47.7,15.5 56.5,17.3 C 56.9,17.4 57.2,17.8 57.2,18.2 L 57.1,49.0 C 57.1,49.6 56.6,50.1 56.0,50.0 C 47.5,48.7 39.8,48.4 30.7,50.7 C 30.9,49.7 31.3,33.6 31.6,28.4 Z"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Bookmark */}
      <path
        d="M 41.8,18.0 L 41.7,30.3 L 45.6,27.0 L 49.4,30.5 L 49.5,18.1"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Text lines on left */}
      <path d="M 12.2,26.7 C 17.0,26.0 22.0,26.2 26.4,27.0" strokeWidth={strokeWidth * 0.85} {...baseStroke} />
      <path d="M 12.4,33.0 C 17.0,32.4 22.0,32.6 26.2,33.4" strokeWidth={strokeWidth * 0.85} {...baseStroke} />
      <path d="M 12.4,39.3 C 16.6,38.8 20.5,39.0 24.3,39.6" strokeWidth={strokeWidth * 0.85} {...baseStroke} />
    </IconShell>
  );
}

// ─── 3. Fractional AI Officer — person inside dashed circle (embedded) ──
export function SketchFractional({ strokeWidth = 1.4, ...rest }: Props) {
  return (
    <IconShell {...rest}>
      {/* Dashed enclosing circle (the org around them) */}
      <path
        d="M 32.2,8.1 C 45.5,8.4 56.4,19.4 56.2,32.6 C 56.0,45.9 45.1,56.6 31.8,56.4 C 18.6,56.2 7.9,45.3 8.1,32.1 C 8.3,18.8 19.2,8.1 32.2,8.1 Z"
        strokeWidth={strokeWidth}
        strokeDasharray="3.4 3.0"
        {...baseStroke}
      />
      {/* Head */}
      <path
        d="M 32.0,21.1 C 35.7,21.0 38.6,24.1 38.5,27.9 C 38.4,31.7 35.4,34.6 31.7,34.5 C 28.0,34.4 25.2,31.3 25.3,27.5 C 25.4,23.8 28.4,21.0 32.0,21.1 Z"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Shoulders */}
      <path
        d="M 19.5,49.0 C 20.1,42.4 25.4,37.6 32.0,37.7 C 38.6,37.8 43.9,42.6 44.4,49.2"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
    </IconShell>
  );
}

// ─── 4. AI Due Diligence — magnifier with checkmark inside ──────────────
export function SketchDueDiligence({ strokeWidth = 1.4, ...rest }: Props) {
  return (
    <IconShell {...rest}>
      {/* Lens */}
      <path
        d="M 26.1,8.7 C 36.0,8.3 44.8,16.5 44.9,26.5 C 45.0,36.4 36.8,45.0 26.9,45.0 C 17.0,45.0 8.7,36.9 8.7,26.9 C 8.7,16.9 16.1,8.9 26.1,8.7 Z"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Handle */}
      <path
        d="M 40.6,40.4 L 55.7,55.6"
        strokeWidth={strokeWidth * 1.2}
        {...baseStroke}
      />
      {/* Checkmark inside */}
      <path
        d="M 17.6,27.7 L 24.0,33.7 L 35.8,19.7"
        strokeWidth={strokeWidth * 1.15}
        {...baseStroke}
      />
    </IconShell>
  );
}

// ─── 5. Portfolio — 3×3 grid with one cell highlighted ───────────────────
export function SketchPortfolio({ strokeWidth = 1.4, ...rest }: Props) {
  // Hand-drawn rectangle path generator (slight wobble baked in)
  const cell = (x: number, y: number, fill = false) => (
    <path
      key={`${x}-${y}`}
      d={`M ${x + 0.4},${y - 0.2} L ${x + 14.6},${y + 0.3} L ${x + 14.7},${y + 14.5} L ${x - 0.1},${y + 14.6} Z`}
      strokeWidth={strokeWidth}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={fill ? 'currentColor' : 'none'}
    />
  );
  return (
    <IconShell {...rest}>
      {/* 3×3 grid */}
      {cell(7, 7)}
      {cell(25, 7)}
      {cell(43, 7)}
      {cell(7, 25, true) /* highlighted */}
      {cell(25, 25)}
      {cell(43, 25)}
      {cell(7, 43)}
      {cell(25, 43)}
      {cell(43, 43)}
    </IconShell>
  );
}

// ─── 6. Clipboard with questionmark — "answer questions" ─────────────────
export function SketchClipboard({ strokeWidth = 1.4, ...rest }: Props) {
  return (
    <IconShell {...rest}>
      {/* Clip at top */}
      <path
        d="M 25.0,8.5 L 39.1,8.4 C 40.0,8.4 40.7,9.0 40.8,9.9 L 40.9,13.3 C 40.9,14.2 40.3,14.9 39.4,15.0 L 24.7,15.0 C 23.8,15.0 23.1,14.4 23.0,13.5 L 23.0,10.0 C 23.0,9.1 23.7,8.5 25.0,8.5 Z"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Board */}
      <path
        d="M 16.1,11.7 L 22.7,11.6 M 41.4,11.6 L 48.0,11.7 C 49.1,11.8 50.0,12.7 50.1,13.8 L 50.2,53.8 C 50.2,54.9 49.3,55.8 48.2,55.9 L 15.9,55.9 C 14.8,55.9 13.9,55.1 13.8,54.0 L 13.9,13.9 C 13.9,12.8 14.8,11.8 16.1,11.7 Z"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Question mark */}
      <path
        d="M 26.6,28.0 C 26.7,24.3 29.4,21.8 32.6,22.0 C 35.7,22.2 37.7,24.6 37.5,27.5 C 37.4,30.0 35.4,31.7 33.1,33.0 C 31.9,33.7 31.4,34.7 31.4,36.2 L 31.4,38.2"
        strokeWidth={strokeWidth * 1.15}
        {...baseStroke}
      />
      <circle cx="31.4" cy="43.7" r="1.7" fill="currentColor" stroke="none" />
    </IconShell>
  );
}

// ─── 7. Report — document with bar chart ─────────────────────────────────
export function SketchReport({ strokeWidth = 1.4, ...rest }: Props) {
  return (
    <IconShell {...rest}>
      {/* Page outline with folded corner */}
      <path
        d="M 13.4,7.5 L 39.5,7.4 L 51.0,19.2 L 50.8,55.0 C 50.8,56.0 50.0,56.7 49.0,56.7 L 14.0,56.7 C 13.0,56.7 12.2,55.9 12.2,54.9 L 12.4,9.4 C 12.4,8.4 13.0,7.6 13.4,7.5 Z"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Folded corner */}
      <path
        d="M 39.4,7.5 L 39.3,19.0 C 39.3,19.7 39.8,20.2 40.5,20.2 L 51.0,20.1"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Baseline */}
      <path
        d="M 18.2,46.5 L 45.0,46.5"
        strokeWidth={strokeWidth * 0.9}
        {...baseStroke}
      />
      {/* Bars */}
      <path d="M 21.3,46.3 L 21.4,38.0 L 25.0,38.0 L 25.0,46.3" strokeWidth={strokeWidth} {...baseStroke} />
      <path d="M 28.3,46.3 L 28.3,32.0 L 32.0,32.0 L 32.0,46.3" strokeWidth={strokeWidth} {...baseStroke} />
      <path d="M 35.2,46.3 L 35.2,26.0 L 38.8,26.0 L 38.8,46.3" strokeWidth={strokeWidth} {...baseStroke} />
    </IconShell>
  );
}

// ─── 8. Arrow forward — "next step" ──────────────────────────────────────
export function SketchArrow({ strokeWidth = 1.6, ...rest }: Props) {
  return (
    <IconShell {...rest}>
      {/* Shaft */}
      <path
        d="M 9.2,32.4 C 18.0,31.8 35.0,32.2 50.5,32.0"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Arrowhead — upper */}
      <path
        d="M 38.0,18.7 C 42.5,23.0 47.2,28.0 51.4,32.0"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Arrowhead — lower */}
      <path
        d="M 38.0,45.3 C 42.5,41.0 47.2,36.0 51.4,32.0"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
    </IconShell>
  );
}
