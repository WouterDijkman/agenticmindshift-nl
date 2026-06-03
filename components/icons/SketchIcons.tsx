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

// ─── 9. Eye hidden — "onzichtbaar risico" (eye with slash) ───────────────
export function SketchEyeHidden({ strokeWidth = 1.4, ...rest }: Props) {
  return (
    <IconShell {...rest}>
      {/* Eye outline — almond shape */}
      <path
        d="M 5.5,32.4 C 11.4,21.7 21.0,16.0 32.1,16.0 C 43.2,16.0 52.7,21.7 58.6,32.4 C 52.7,43.1 43.2,48.8 32.1,48.8 C 21.0,48.8 11.4,43.1 5.5,32.4 Z"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Iris */}
      <path
        d="M 32.1,23.6 C 36.9,23.5 40.8,27.4 40.9,32.2 C 41.0,37.1 37.1,41.0 32.3,41.1 C 27.4,41.2 23.4,37.3 23.3,32.5 C 23.2,27.7 27.2,23.7 32.1,23.6 Z"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Pupil */}
      <circle cx="32.1" cy="32.4" r="2.3" fill="currentColor" stroke="none" />
      {/* Slash through — top-left to bottom-right */}
      <path
        d="M 8.5,55.0 C 22.0,42.0 42.0,22.0 55.6,9.4"
        strokeWidth={strokeWidth * 1.4}
        stroke="var(--bg-primary, #f7f2eb)"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 8.5,55.0 C 22.0,42.0 42.0,22.0 55.6,9.4"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
    </IconShell>
  );
}

// ─── 10. Knowledge stack — "kennisretentie" (stacked documents) ─────────
export function SketchKnowledge({ strokeWidth = 1.4, ...rest }: Props) {
  return (
    <IconShell {...rest}>
      {/* Bottom doc (faintest, behind) */}
      <path
        d="M 11.0,18.5 L 39.5,18.0 L 51.3,29.5 L 51.0,49.0 C 51.0,49.9 50.3,50.7 49.4,50.7 L 11.8,50.8 C 10.9,50.8 10.2,50.1 10.2,49.2 L 10.3,19.9 C 10.3,19.0 10.5,18.7 11.0,18.5 Z"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      <path
        d="M 39.4,18.1 L 39.3,29.0 C 39.3,29.7 39.8,30.2 40.5,30.2 L 51.2,30.1"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Middle doc (offset up-right) */}
      <path
        d="M 17.0,11.5 L 45.5,11.0 L 57.3,22.5 L 57.0,42.5 C 57.0,43.4 56.3,44.2 55.4,44.2 L 17.8,44.3 C 16.9,44.3 16.2,43.6 16.2,42.7 L 16.3,12.9 C 16.3,12.0 16.5,11.7 17.0,11.5 Z"
        strokeWidth={strokeWidth}
        stroke="currentColor"
        fill="var(--bg-primary, #f7f2eb)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 45.4,11.1 L 45.3,22.0 C 45.3,22.7 45.8,23.2 46.5,23.2 L 57.2,23.1"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Text lines on middle doc */}
      <path d="M 22.5,29.5 C 28.5,29.0 36.0,29.2 42.0,29.6" strokeWidth={strokeWidth * 0.85} {...baseStroke} />
      <path d="M 22.5,34.7 C 28.5,34.2 36.0,34.4 41.0,34.8" strokeWidth={strokeWidth * 0.85} {...baseStroke} />
      <path d="M 22.5,39.9 C 27.0,39.4 32.0,39.6 36.5,40.0" strokeWidth={strokeWidth * 0.85} {...baseStroke} />
    </IconShell>
  );
}

// ─── 11. Hourglass — "te late signalering" (time running out) ────────────
export function SketchHourglass({ strokeWidth = 1.4, ...rest }: Props) {
  return (
    <IconShell {...rest}>
      {/* Top cap */}
      <path
        d="M 14.0,8.5 C 21.0,7.8 43.0,7.8 50.0,8.5"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Bottom cap */}
      <path
        d="M 14.0,55.5 C 21.0,56.2 43.0,56.2 50.0,55.5"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Left side — top bulb curving to neck */}
      <path
        d="M 15.8,8.7 C 16.0,18.0 22.0,26.0 31.0,32.0 C 22.0,38.0 16.0,46.0 15.8,55.3"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Right side — top bulb curving to neck */}
      <path
        d="M 48.2,8.7 C 48.0,18.0 42.0,26.0 33.0,32.0 C 42.0,38.0 48.0,46.0 48.2,55.3"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Sand in top bulb (small) */}
      <path
        d="M 21.0,14.0 C 25.0,18.0 39.0,18.0 43.0,14.0 L 36.5,22.0 L 27.5,22.0 Z"
        fill="currentColor"
        stroke="none"
        opacity="0.7"
      />
      {/* Sand in bottom bulb (larger pile) */}
      <path
        d="M 19.0,50.0 C 20.0,44.0 26.0,40.0 32.0,40.0 C 38.0,40.0 44.0,44.0 45.0,50.0 Z"
        fill="currentColor"
        stroke="none"
        opacity="0.7"
      />
      {/* Falling grain */}
      <path
        d="M 32.0,32.5 L 32.0,38.0"
        strokeWidth={strokeWidth * 0.8}
        {...baseStroke}
      />
    </IconShell>
  );
}

// ─── 12. Warning triangle — "financiële stress / restructuring" ──────────
export function SketchWarning({ strokeWidth = 1.5, ...rest }: Props) {
  return (
    <IconShell {...rest}>
      {/* Triangle outline */}
      <path
        d="M 32.0,8.4 C 33.1,8.4 34.0,9.0 34.6,10.0 L 56.8,49.0 C 57.4,50.0 57.4,51.3 56.7,52.4 C 56.1,53.4 55.0,54.0 53.8,54.0 L 10.2,54.0 C 9.0,54.0 7.9,53.4 7.3,52.4 C 6.6,51.3 6.6,50.0 7.2,49.0 L 29.4,10.0 C 30.0,9.0 30.9,8.4 32.0,8.4 Z"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Exclamation mark — bar */}
      <path
        d="M 32.0,23.0 L 32.0,40.0"
        strokeWidth={strokeWidth * 1.8}
        stroke="currentColor"
        strokeLinecap="round"
        fill="none"
      />
      {/* Exclamation dot */}
      <circle cx="32.0" cy="46.5" r="2.0" fill="currentColor" stroke="none" />
    </IconShell>
  );
}

// ─── 13. Speedometer — "deal velocity" ──────────────────────────────────
export function SketchSpeed({ strokeWidth = 1.4, ...rest }: Props) {
  return (
    <IconShell {...rest}>
      {/* Outer arc — half-circle dial */}
      <path
        d="M 9.0,44.0 C 9.0,30.0 19.0,17.0 32.0,17.0 C 45.0,17.0 55.0,30.0 55.0,44.0"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Inner arc — gauge groove */}
      <path
        d="M 14.0,44.0 C 14.5,33.0 22.0,23.0 32.0,23.0 C 42.0,23.0 49.5,33.0 50.0,44.0"
        strokeWidth={strokeWidth * 0.8}
        opacity="0.55"
        {...baseStroke}
      />
      {/* Tick — left */}
      <path d="M 11.5,38.0 L 15.0,39.0" strokeWidth={strokeWidth * 0.9} {...baseStroke} />
      {/* Tick — middle-left */}
      <path d="M 18.5,26.0 L 21.0,28.5" strokeWidth={strokeWidth * 0.9} {...baseStroke} />
      {/* Tick — top */}
      <path d="M 32.0,18.0 L 32.0,21.5" strokeWidth={strokeWidth * 0.9} {...baseStroke} />
      {/* Tick — middle-right */}
      <path d="M 45.5,26.0 L 43.0,28.5" strokeWidth={strokeWidth * 0.9} {...baseStroke} />
      {/* Tick — right */}
      <path d="M 52.5,38.0 L 49.0,39.0" strokeWidth={strokeWidth * 0.9} {...baseStroke} />
      {/* Needle — pointing to upper-right (fast) */}
      <path
        d="M 32.0,44.0 L 45.5,26.5"
        strokeWidth={strokeWidth * 1.4}
        stroke="currentColor"
        strokeLinecap="round"
        fill="none"
      />
      {/* Hub */}
      <circle cx="32.0" cy="44.0" r="2.5" fill="currentColor" stroke="none" />
    </IconShell>
  );
}

// ─── 14. Balance scale — "bias detection" ───────────────────────────────
export function SketchScale({ strokeWidth = 1.4, ...rest }: Props) {
  return (
    <IconShell {...rest}>
      {/* Center pole */}
      <path
        d="M 32.0,13.0 L 32.0,52.0"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Base */}
      <path
        d="M 22.0,52.5 C 26.0,52.0 38.0,52.0 42.0,52.5"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Top knob */}
      <circle cx="32.0" cy="12.0" r="2.2" fill="currentColor" stroke="none" />
      {/* Horizontal beam — slightly tilted (bias visible) */}
      <path
        d="M 11.0,19.5 C 21.0,19.0 43.0,19.8 53.0,21.0"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Left chain */}
      <path d="M 13.5,20.0 L 13.5,27.0" strokeWidth={strokeWidth * 0.85} {...baseStroke} />
      {/* Right chain */}
      <path d="M 50.5,20.5 L 50.5,27.5" strokeWidth={strokeWidth * 0.85} {...baseStroke} />
      {/* Left pan — lower (heavier) */}
      <path
        d="M 6.5,28.0 C 9.5,32.0 17.5,32.0 20.5,28.0"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      <path d="M 6.5,28.0 C 9.5,29.5 17.5,29.5 20.5,28.0" strokeWidth={strokeWidth * 0.7} opacity="0.5" {...baseStroke} />
      {/* Right pan — higher (lighter) */}
      <path
        d="M 43.5,28.5 C 46.5,32.5 54.5,32.5 57.5,28.5"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      <path d="M 43.5,28.5 C 46.5,30.0 54.5,30.0 57.5,28.5" strokeWidth={strokeWidth * 0.7} opacity="0.5" {...baseStroke} />
    </IconShell>
  );
}

// ─── 15. Chip — "AI readiness" (microprocessor) ─────────────────────────
export function SketchChip({ strokeWidth = 1.4, ...rest }: Props) {
  return (
    <IconShell {...rest}>
      {/* Outer chip body */}
      <path
        d="M 18.0,18.5 C 18.0,17.6 18.7,16.8 19.7,16.8 L 44.3,16.8 C 45.3,16.8 46.0,17.6 46.0,18.5 L 46.0,45.5 C 46.0,46.4 45.3,47.2 44.3,47.2 L 19.7,47.2 C 18.7,47.2 18.0,46.4 18.0,45.5 Z"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Inner core */}
      <path
        d="M 24.5,25.0 L 39.5,25.0 L 39.5,39.0 L 24.5,39.0 Z"
        strokeWidth={strokeWidth * 0.9}
        {...baseStroke}
      />
      {/* AI dot pattern inside core */}
      <circle cx="29.0" cy="29.5" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="35.0" cy="29.5" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="29.0" cy="34.5" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="35.0" cy="34.5" r="1.3" fill="currentColor" stroke="none" />
      {/* Connecting line — diagonal node link */}
      <path d="M 29.0,29.5 L 35.0,34.5" strokeWidth={strokeWidth * 0.7} opacity="0.55" {...baseStroke} />
      {/* Pins — top */}
      <path d="M 24.0,16.5 L 24.0,12.5" strokeWidth={strokeWidth * 0.9} {...baseStroke} />
      <path d="M 32.0,16.5 L 32.0,12.5" strokeWidth={strokeWidth * 0.9} {...baseStroke} />
      <path d="M 40.0,16.5 L 40.0,12.5" strokeWidth={strokeWidth * 0.9} {...baseStroke} />
      {/* Pins — bottom */}
      <path d="M 24.0,47.5 L 24.0,51.5" strokeWidth={strokeWidth * 0.9} {...baseStroke} />
      <path d="M 32.0,47.5 L 32.0,51.5" strokeWidth={strokeWidth * 0.9} {...baseStroke} />
      <path d="M 40.0,47.5 L 40.0,51.5" strokeWidth={strokeWidth * 0.9} {...baseStroke} />
      {/* Pins — left */}
      <path d="M 17.5,24.0 L 13.5,24.0" strokeWidth={strokeWidth * 0.9} {...baseStroke} />
      <path d="M 17.5,32.0 L 13.5,32.0" strokeWidth={strokeWidth * 0.9} {...baseStroke} />
      <path d="M 17.5,40.0 L 13.5,40.0" strokeWidth={strokeWidth * 0.9} {...baseStroke} />
      {/* Pins — right */}
      <path d="M 46.5,24.0 L 50.5,24.0" strokeWidth={strokeWidth * 0.9} {...baseStroke} />
      <path d="M 46.5,32.0 L 50.5,32.0" strokeWidth={strokeWidth * 0.9} {...baseStroke} />
      <path d="M 46.5,40.0 L 50.5,40.0" strokeWidth={strokeWidth * 0.9} {...baseStroke} />
    </IconShell>
  );
}

// ─── 16. Gear — "capacity engineering" ──────────────────────────────────
export function SketchGear({ strokeWidth = 1.4, ...rest }: Props) {
  return (
    <IconShell {...rest}>
      {/* Outer gear shape — 8 teeth via inset polygon (hand-sketched curves) */}
      <path
        d="
          M 32.0,8.0
          L 35.5,8.5 L 36.5,14.5
          C 38.5,15.0 40.5,15.8 42.2,16.8
          L 47.0,13.0 L 51.5,17.5
          L 47.7,22.3 C 48.7,24.0 49.5,25.9 50.0,27.9
          L 56.0,28.9 L 56.0,35.1 L 50.0,36.1
          C 49.5,38.1 48.7,40.0 47.7,41.7
          L 51.5,46.5 L 47.0,51.0
          L 42.2,47.2 C 40.5,48.2 38.5,49.0 36.5,49.5
          L 35.5,55.5 L 28.5,55.5 L 27.5,49.5
          C 25.5,49.0 23.5,48.2 21.8,47.2
          L 17.0,51.0 L 12.5,46.5
          L 16.3,41.7 C 15.3,40.0 14.5,38.1 14.0,36.1
          L 8.0,35.1 L 8.0,28.9 L 14.0,27.9
          C 14.5,25.9 15.3,24.0 16.3,22.3
          L 12.5,17.5 L 17.0,13.0
          L 21.8,16.8 C 23.5,15.8 25.5,15.0 27.5,14.5
          L 28.5,8.5 Z"
        strokeWidth={strokeWidth}
        {...baseStroke}
      />
      {/* Inner ring */}
      <circle cx="32.0" cy="32.0" r="9.5" strokeWidth={strokeWidth} {...baseStroke} />
      {/* Center dot */}
      <circle cx="32.0" cy="32.0" r="2.2" fill="currentColor" stroke="none" />
    </IconShell>
  );
}
