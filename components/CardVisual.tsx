import type { ComponentType } from 'react';

type SketchIconComponent = ComponentType<{
  size?: number;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
}>;

interface CardVisualProps {
  /** Stable index — drives the deterministic scene variation. */
  index: number;
  Icon: SketchIconComponent;
  /** Small corner chip, e.g. "01". */
  chip?: string;
  iconSize?: number;
  /**
   * Scene motif. `constellation` (default) is the node/arc data-scene;
   * `chart` is a denser data-image style (plotted axis + rising series +
   * grid) used to set a section visually apart from a neighbouring grid.
   */
  scene?: 'constellation' | 'chart';
}

/** Deterministic PRNG so every card gets a distinct-but-stable composition. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 400;
const H = 225;
const CORNERS: [number, number][] = [
  [0, 0],
  [W, 0],
  [0, H],
  [W, H],
];

/**
 * On-brand scene themes. Every theme stays inside the Factum navy/cream/rust
 * world, but shifts the gradient base, the line tint and the node accent so a
 * row of cards reads as a varied-yet-coherent series rather than identical tiles.
 */
type Theme = {
  g0: string;
  g1: string;
  g2: string;
  line: string;
  accent: string;
};
const THEMES: Theme[] = [
  // classic navy
  { g0: '#0b1f3a', g1: '#0f2b4a', g2: '#14375d', line: 'rgba(247,242,235,0.08)', accent: '#F14C1D' },
  // deep indigo-navy
  { g0: '#0a1830', g1: '#172447', g2: '#28315f', line: 'rgba(247,242,235,0.09)', accent: '#F14C1D' },
  // teal-navy
  { g0: '#08203a', g1: '#0d3450', g2: '#12485f', line: 'rgba(120,210,220,0.10)', accent: '#F4853A' },
  // near-black navy, brighter cream constellation
  { g0: '#071529', g1: '#0c1f3a', g2: '#11294b', line: 'rgba(247,242,235,0.12)', accent: '#F14C1D' },
  // warm rust-tinted navy
  { g0: '#0d1d34', g1: '#1c2742', g2: '#3a2c3f', line: 'rgba(241,76,29,0.12)', accent: '#FF6A33' },
];

/**
 * Branded "abstract data-scene" panel used as the image area of every card.
 * Pure vector → stays crisp at any size. Navy gradient base, dot matrix,
 * concentric arcs, a small node constellation and rust accents, with the
 * supplied line icon as the focal subject over a soft legibility scrim.
 */
export default function CardVisual({
  index,
  Icon,
  chip,
  iconSize = 74,
  scene = 'constellation',
}: CardVisualProps) {
  const rnd = mulberry32(index * 2654435761 + 101);
  const uid = `cv${index}`;
  const theme = THEMES[((index % THEMES.length) + THEMES.length) % THEMES.length];

  const arc = CORNERS[index % 4];
  const ring = CORNERS[(index + 2) % 4];

  const nodeCount = 6;
  const nodes = Array.from({ length: nodeCount }, () => ({
    x: 28 + rnd() * (W - 56),
    y: 22 + rnd() * (H - 44),
  }));
  const rustA = Math.floor(rnd() * nodeCount);
  let rustB = Math.floor(rnd() * nodeCount);
  if (rustB === rustA) rustB = (rustB + 1) % nodeCount;

  // Chart-scene geometry: a rising data series plotted on a baseline grid.
  const plotL = 40;
  const plotR = W - 36;
  const plotB = H - 40;
  const plotT = 46;
  const barCount = 7;
  const barGap = (plotR - plotL) / barCount;
  const bars = Array.from({ length: barCount }, (_, i) => {
    const base = 0.18 + (i / (barCount - 1)) * 0.62;
    const jitter = (rnd() - 0.5) * 0.16;
    const h = Math.max(0.1, Math.min(0.95, base + jitter));
    return { x: plotL + barGap * i + barGap * 0.18, w: barGap * 0.46, h };
  });
  const linePts = bars.map((b) => ({
    x: b.x + b.w / 2,
    y: plotB - (plotB - plotT) * b.h,
  }));
  const linePath = linePts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const peak = linePts.reduce((m, p) => (p.y < m.y ? p : m), linePts[0]);

  return (
    <div className="wb-card-media">
      <svg
        className="wb-card-scene"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${uid}g`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={theme.g0} />
            <stop offset="0.58" stopColor={theme.g1} />
            <stop offset="1" stopColor={theme.g2} />
          </linearGradient>
          <radialGradient id={`${uid}s`} cx="0.5" cy="0.52" r="0.5">
            <stop offset="0" stopColor="#06152b" stopOpacity="0.6" />
            <stop offset="1" stopColor="#06152b" stopOpacity="0" />
          </radialGradient>
          <pattern id={`${uid}d`} width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="rgba(247,242,235,0.10)" />
          </pattern>
        </defs>

        <rect width={W} height={H} fill={`url(#${uid}g)`} />
        <rect width={W} height={H} fill={`url(#${uid}d)`} />

        {scene === 'chart' ? (
          <>
            {/* horizontal grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((f, i) => {
              const y = plotB - (plotB - plotT) * f;
              return (
                <line
                  key={`g${i}`}
                  x1={plotL}
                  y1={y}
                  x2={plotR}
                  y2={y}
                  stroke={theme.line}
                  strokeWidth="1"
                />
              );
            })}

            {/* axis */}
            <line x1={plotL} y1={plotT} x2={plotL} y2={plotB} stroke={theme.line} strokeWidth="1" />
            <line x1={plotL} y1={plotB} x2={plotR} y2={plotB} stroke="rgba(247,242,235,0.18)" strokeWidth="1" />

            {/* bars */}
            {bars.map((b, i) => {
              const h = (plotB - plotT) * b.h;
              return (
                <rect
                  key={`b${i}`}
                  x={b.x}
                  y={plotB - h}
                  width={b.w}
                  height={h}
                  rx="2"
                  fill="rgba(247,242,235,0.07)"
                />
              );
            })}

            {/* rising series line + plotted points */}
            <path d={linePath} fill="none" stroke={theme.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {linePts.map((p, i) => (
              <circle
                key={`p${i}`}
                cx={p.x}
                cy={p.y}
                r={p === peak ? 3.6 : 2.1}
                fill={p === peak ? theme.accent : 'rgba(247,242,235,0.6)'}
              />
            ))}
          </>
        ) : (
          <>
            {/* concentric arcs from a corner */}
            {[72, 120, 168, 216].map((r, i) => (
              <circle
                key={`a${i}`}
                cx={arc[0]}
                cy={arc[1]}
                r={r}
                fill="none"
                stroke={theme.line}
                strokeWidth="1"
              />
            ))}

            {/* large faint ring on the opposite corner */}
            <circle cx={ring[0]} cy={ring[1]} r="84" fill="none" stroke={theme.line} strokeWidth="1" />

            {/* constellation links */}
            {nodes.slice(0, -1).map((n, i) => (
              <line
                key={`l${i}`}
                x1={n.x}
                y1={n.y}
                x2={nodes[i + 1].x}
                y2={nodes[i + 1].y}
                stroke="rgba(247,242,235,0.10)"
                strokeWidth="1"
              />
            ))}

            {/* nodes (two rust-accented) */}
            {nodes.map((n, i) => {
              const rust = i === rustA || i === rustB;
              return (
                <circle
                  key={`n${i}`}
                  cx={n.x}
                  cy={n.y}
                  r={rust ? 3.4 : 2.2}
                  fill={rust ? theme.accent : 'rgba(247,242,235,0.5)'}
                />
              );
            })}
          </>
        )}

        {/* soft scrim so the focal icon stays legible */}
        <ellipse cx={W / 2} cy={H / 2} rx="126" ry="84" fill={`url(#${uid}s)`} />
      </svg>

      {chip && <span className="wb-card-chip" style={{ color: theme.accent }}>{chip}</span>}
      <span className="wb-card-icon" style={{ color: theme.accent }}>
        <Icon size={iconSize} strokeWidth={1.3} color={theme.accent} />
      </span>
    </div>
  );
}
