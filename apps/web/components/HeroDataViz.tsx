'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Hero data visual — "signal from the data room".
 * Faint scattered points = raw deal/portfolio data (noise); the rust
 * trend-line draws itself through them = the AI-extracted signal.
 * Purely graphical (no business claims / numbers), so locale-proof.
 */

const ease = [0.22, 1, 0.36, 1] as const;

// Plot bounds inside the card
const PLOT = { x0: 56, x1: 464, yTop: 96, yBase: 356 };

// Signal data points (ascending trajectory with one small dip)
const POINTS = [
  { x: 56, y: 322 },
  { x: 124, y: 300 },
  { x: 192, y: 310 },
  { x: 260, y: 250 },
  { x: 328, y: 232 },
  { x: 396, y: 172 },
  { x: 464, y: 120 },
];

// Faint "noise" dots — fixed coords (no Math.random → no hydration drift)
const NOISE = [
  [84, 250], [110, 332], [150, 214], [176, 300], [214, 268], [238, 196],
  [270, 318], [300, 224], [330, 290], [356, 188], [388, 250], [410, 312],
  [128, 268], [196, 244], [288, 286], [352, 256], [432, 206], [100, 296],
];

function smoothPath(pts: { x: number; y: number }[], k = 0.16) {
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

const linePath = smoothPath(POINTS);
const areaPath = `${linePath} L ${PLOT.x1} ${PLOT.yBase} L ${PLOT.x0} ${PLOT.yBase} Z`;
const gridYs = [356, 296, 236, 176, 116];

export default function HeroDataViz() {
  const reduce = useReducedMotion();
  const drawDelay = 0.5;
  const drawDur = 1.5;

  return (
    <motion.div
      className="hero-viz"
      aria-hidden="true"
      animate={reduce ? undefined : { y: [0, -8, 0] }}
      transition={reduce ? undefined : { duration: 7, ease: 'easeInOut', repeat: Infinity }}
    >
      <svg
        viewBox="0 0 520 440"
        role="img"
        aria-label="AI-gedreven analyse: ruwe datapunten worden omgezet in een helder signaal"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <defs>
          <linearGradient id="heroArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-cta)" stopOpacity={0.22} />
            <stop offset="100%" stopColor="var(--accent-cta)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="heroScan" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent-cta)" stopOpacity={0} />
            <stop offset="50%" stopColor="var(--accent-cta)" stopOpacity={0.6} />
            <stop offset="100%" stopColor="var(--accent-cta)" stopOpacity={0} />
          </linearGradient>
          <clipPath id="heroPlot">
            <rect x={PLOT.x0 - 4} y={PLOT.yTop - 24} width={PLOT.x1 - PLOT.x0 + 8} height={PLOT.yBase - PLOT.yTop + 28} />
          </clipPath>
        </defs>

        {/* Card frame */}
        <rect
          x={8}
          y={8}
          width={504}
          height={424}
          rx={20}
          fill="var(--bg-secondary)"
          stroke="var(--border-subtle)"
          strokeWidth={1}
        />

        {/* Header chrome: live pulse + faux UI tabs */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <circle cx={40} cy={44} r={4} fill="var(--accent-cta)" />
          {!reduce && (
            <motion.circle
              cx={40}
              cy={44}
              r={4}
              fill="none"
              stroke="var(--accent-cta)"
              strokeWidth={1.5}
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2.6, opacity: 0 }}
              transition={{ duration: 1.8, ease: 'easeOut', repeat: Infinity }}
              style={{ transformOrigin: '40px 44px' }}
            />
          )}
          <rect x={56} y={40} width={64} height={8} rx={4} fill="var(--text-primary)" opacity={0.16} />
          <rect x={446} y={40} width={34} height={8} rx={4} fill="var(--text-primary)" opacity={0.1} />
        </motion.g>

        {/* Gridlines */}
        {gridYs.map((gy, i) => (
          <motion.line
            key={gy}
            x1={PLOT.x0}
            y1={gy}
            x2={PLOT.x1}
            y2={gy}
            stroke="var(--border-subtle)"
            strokeWidth={1}
            initial={{ opacity: 0 }}
            animate={{ opacity: gy === PLOT.yBase ? 0.9 : 0.5 }}
            transition={{ duration: 0.5, delay: 0.25 + i * 0.05 }}
          />
        ))}

        {/* Noise — raw data points */}
        <g clipPath="url(#heroPlot)">
          {NOISE.map(([nx, ny], i) => (
            <motion.circle
              key={`${nx}-${ny}`}
              cx={nx}
              cy={ny}
              r={2.4}
              fill="var(--text-primary)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.13 }}
              transition={{ duration: 0.6, delay: 0.3 + (i % 6) * 0.04 }}
            />
          ))}
        </g>

        {/* Area fill — fades in as the line resolves */}
        <motion.path
          d={areaPath}
          fill="url(#heroArea)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: drawDelay + drawDur * 0.55 }}
        />

        {/* Signal line — draws itself */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="var(--accent-cta)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduce ? 0 : drawDur, delay: reduce ? 0 : drawDelay, ease }}
        />

        {/* Scan sweep — one pass synced with the draw */}
        {!reduce && (
          <motion.rect
            y={PLOT.yTop - 24}
            width={3}
            height={PLOT.yBase - PLOT.yTop + 28}
            fill="url(#heroScan)"
            clipPath="url(#heroPlot)"
            initial={{ x: PLOT.x0, opacity: 0 }}
            animate={{ x: [PLOT.x0, PLOT.x1], opacity: [0, 1, 1, 0] }}
            transition={{ duration: drawDur, delay: drawDelay, ease }}
          />
        )}

        {/* Vertices — pop in as the line passes each one */}
        {POINTS.map((p, i) => (
          <motion.circle
            key={`v-${p.x}`}
            cx={p.x}
            cy={p.y}
            r={4}
            fill="var(--accent-cta)"
            stroke="var(--bg-secondary)"
            strokeWidth={2.5}
            initial={{ scale: reduce ? 1 : 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.35, delay: reduce ? 0 : drawDelay + (i / (POINTS.length - 1)) * drawDur, ease }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        ))}

        {/* Endpoint emphasis */}
        <motion.circle
          cx={POINTS[POINTS.length - 1].x}
          cy={POINTS[POINTS.length - 1].y}
          r={9}
          fill="var(--accent-cta)"
          opacity={0.14}
          initial={{ scale: reduce ? 1 : 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: reduce ? 0 : drawDelay + drawDur }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      </svg>
    </motion.div>
  );
}
