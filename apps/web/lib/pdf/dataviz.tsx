/**
 * Reusable vector "data images" for the PDF, ported from the website's
 * HeroDataViz / CardVisual aesthetic to @react-pdf primitives.
 *
 * The visual language: a navy panel (deal-room), a faint cream dot-matrix of
 * raw data, faint gridlines, and a rising rust "signal line" extracted from the
 * noise — exactly the metaphor used across agenticmindshift.nl. Purely
 * graphical, locale-proof, no business claims.
 */

import { Svg, Path, Rect, Circle, Line, G, Defs, LinearGradient, Stop } from '@react-pdf/renderer';

const C = {
  navy: '#0B1F3A',
  navySoft: '#0F2B4A',
  cream: '#F7F2EB',
  rust: '#F14C1D',
};

// ── Signal line (catmull-rom → bezier), ascending with one dip ───────────────
const SIGNAL = [
  { x: 30, y: 150 },
  { x: 108, y: 138 },
  { x: 186, y: 146 },
  { x: 264, y: 108 },
  { x: 342, y: 96 },
  { x: 420, y: 58 },
  { x: 490, y: 40 },
];

function smoothPath(pts: { x: number; y: number }[], k = 0.16): string {
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) * k;
    const c1y = p1.y + (p2.y - p0.y) * k;
    const c2x = p2.x - (p3.x - p1.x) * k;
    const c2y = p2.y - (p3.y - p1.y) * k;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x} ${p2.y}`;
  }
  return d;
}

const SIGNAL_PATH = smoothPath(SIGNAL);
const SIGNAL_AREA = `${SIGNAL_PATH} L 490 196 L 30 196 Z`;

/**
 * Navy "deal-room" hero panel with cream dot-matrix + rust signal line.
 * Render inside a fixed-height View; width auto-scales.
 */
export function CoverDataPanel({ height = 150 }: { height?: number }) {
  // viewBox 520 x 200
  const dotCols = 17;
  const dotRows = 6;
  const dots: React.ReactNode[] = [];
  for (let r = 0; r < dotRows; r++) {
    for (let c = 0; c < dotCols; c++) {
      const x = 22 + c * 28;
      const y = 22 + r * 28;
      dots.push(<Circle key={`${r}-${c}`} cx={x} cy={y} r={1.1} fill={C.cream} fillOpacity={0.16} />);
    }
  }
  const gridYs = [56, 96, 136, 176];
  return (
    <Svg viewBox="0 0 520 200" style={{ width: '100%', height }}>
      <Defs>
        <LinearGradient id="panelBg" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={C.navySoft} />
          <Stop offset="1" stopColor={C.navy} />
        </LinearGradient>
        <LinearGradient id="signalArea" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={C.rust} stopOpacity={0.34} />
          <Stop offset="1" stopColor={C.rust} stopOpacity={0} />
        </LinearGradient>
      </Defs>

      <Rect x={0} y={0} width={520} height={200} fill="url(#panelBg)" />
      {/* dot-matrix */}
      <G>{dots}</G>
      {/* faint gridlines */}
      {gridYs.map((y) => (
        <Line key={y} x1={22} y1={y} x2={498} y2={y} stroke={C.cream} strokeOpacity={0.06} strokeWidth={0.6} />
      ))}
      {/* area under signal */}
      <Path d={SIGNAL_AREA} fill="url(#signalArea)" />
      {/* signal line */}
      <Path d={SIGNAL_PATH} stroke={C.rust} strokeWidth={2.4} fill="none" strokeLinecap="round" />
      {/* nodes on the signal */}
      {SIGNAL.map((p, i) => (
        <Circle key={i} cx={p.x} cy={p.y} r={i === SIGNAL.length - 1 ? 4 : 2.2} fill={C.rust} />
      ))}
      {/* leading focus ring on last node */}
      <Circle cx={490} cy={40} r={7.5} stroke={C.rust} strokeOpacity={0.5} strokeWidth={1} fill="none" />
    </Svg>
  );
}

// ── Radial score gauge ───────────────────────────────────────────────────────

function polar(cx: number, cy: number, rad: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + rad * Math.cos(a), y: cy + rad * Math.sin(a) };
}

function arc(cx: number, cy: number, rad: number, startDeg: number, endDeg: number): string {
  const s = polar(cx, cy, rad, endDeg);
  const e = polar(cx, cy, rad, startDeg);
  const large = endDeg - startDeg <= 180 ? 0 : 1;
  return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${rad} ${rad} 0 ${large} 0 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
}

/**
 * 270° radial gauge: rust progress arc on a faint track. `value`/`max` in points.
 */
export function ScoreGauge({
  value,
  max = 75,
  size = 96,
  color = C.rust,
}: {
  value: number;
  max?: number;
  size?: number;
  color?: string;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 9;
  const sweep = 270;
  const start = -135;
  const frac = Math.max(0, Math.min(1, value / max));
  const end = start + sweep * frac;
  return (
    <Svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size }}>
      {/* track */}
      <Path d={arc(cx, cy, r, start, start + sweep)} stroke="#D7CBBA" strokeWidth={6} fill="none" strokeLinecap="round" />
      {/* progress */}
      {frac > 0.001 ? (
        <Path d={arc(cx, cy, r, start, end)} stroke={color} strokeWidth={6} fill="none" strokeLinecap="round" />
      ) : null}
    </Svg>
  );
}

// ── Horizontal dimension bar with peer tick ──────────────────────────────────

export function DimensionBar({
  score,
  peer = 60,
  color,
  width = 100,
}: {
  score: number;
  peer?: number;
  color: string;
  width?: number;
}) {
  const h = 9;
  const s = Math.max(0, Math.min(100, score));
  return (
    <Svg viewBox={`0 0 ${width} ${h}`} style={{ width: '100%', height: h }}>
      <Rect x={0} y={2} width={width} height={5} rx={0} fill="#E7DECF" />
      <Rect x={0} y={2} width={(width * s) / 100} height={5} rx={0} fill={color} />
      {/* peer tick */}
      <Line x1={(width * peer) / 100} y1={0} x2={(width * peer) / 100} y2={h} stroke="#8E97A4" strokeWidth={0.9} />
    </Svg>
  );
}

export { C as vizColors };
