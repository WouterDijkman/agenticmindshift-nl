import type { CSSProperties } from 'react';

/**
 * A defocused macro of a seven-segment readout, drawn rather than photographed.
 *
 * Reverse-engineered from the reference we measured (a macro of a physical LED
 * clock): lit pixels sit at hue ~18 deg with saturation ~0.87 and a luma ceiling
 * of ~0.46 — nothing is ever blown — over a ground that keeps the scene's own
 * hue instead of going neutral black. Factum's `--accent-cta` is hue 13.3 deg at
 * saturation 0.880 and luma 0.422, so the palette needed no translation at all.
 * Only the ground moved: warm near-black became `--surface-inset`.
 *
 * Drawn, not shipped as an asset, for three reasons. It costs no bytes. It
 * re-themes from CSS custom properties the moment the palette changes. And the
 * digits are our own audited figures, so the abstraction still states something
 * true rather than decorating.
 *
 * Renders no JavaScript: the drift is a CSS animation, the blur is a CSS filter.
 */

/** Glyph box is 1.0 wide by 2.0 tall. Everything below is in those units. */
const T = 0.155; // segment thickness
const GAP = 0.028; // space between two segments meeting at a corner
const ADVANCE = 0.25; // space between glyphs

type Shape = { points: string } | { cx: number; cy: number; r: number };

/** Chamfered bar, the way a real segment is cut, so the ends read at low blur. */
function hbar(x0: number, x1: number, cy: number): Shape {
  const h = T / 2;
  return {
    points: [
      [x0, cy],
      [x0 + h, cy - h],
      [x1 - h, cy - h],
      [x1, cy],
      [x1 - h, cy + h],
      [x0 + h, cy + h]
    ]
      .map(([x, y]) => `${x},${y}`)
      .join(' ')
  };
}

function vbar(cx: number, y0: number, y1: number): Shape {
  const h = T / 2;
  return {
    points: [
      [cx, y0],
      [cx + h, y0 + h],
      [cx + h, y1 - h],
      [cx, y1],
      [cx - h, y1 - h],
      [cx - h, y0 + h]
    ]
      .map(([x, y]) => `${x},${y}`)
      .join(' ')
  };
}

const H_X0 = T / 2 + GAP;
const H_X1 = 1 - T / 2 - GAP;
const V_TOP = [T / 2 + GAP, 1 - T / 2 - GAP] as const;
const V_BOT = [1 + T / 2 + GAP, 2 - T / 2 - GAP] as const;

const SEGMENT: Record<string, Shape> = {
  a: hbar(H_X0, H_X1, T / 2),
  b: vbar(1 - T / 2, V_TOP[0], V_TOP[1]),
  c: vbar(1 - T / 2, V_BOT[0], V_BOT[1]),
  d: hbar(H_X0, H_X1, 2 - T / 2),
  e: vbar(T / 2, V_BOT[0], V_BOT[1]),
  f: vbar(T / 2, V_TOP[0], V_TOP[1]),
  g: hbar(H_X0, H_X1, 1)
};

const DIGIT: Record<string, string> = {
  '0': 'abcdef',
  '1': 'bc',
  '2': 'abdeg',
  '3': 'abcdg',
  '4': 'bcfg',
  '5': 'acdfg',
  '6': 'acdefg',
  '7': 'abc',
  '8': 'abcdefg',
  '9': 'abcdfg'
};

const ALL = 'abcdefg';
const PUNCT_WIDTH = 0.42;
const DOT_R = 0.085;

/**
 * Tokenises a value into glyph cells.
 *
 * Beyond digits, `:` and `.`, two forms exist so a field can be lit without
 * spelling anything:
 *
 *   `-`      the dash state — segment g alone, what a clock shows before it is set
 *   `{acf}`  an explicit segment mask, any subset of a–g
 *
 * The mask is the useful one. A digit is a shape a reader will try to decode
 * even at heavy blur; `{acf}` is a hook of light that decodes to nothing, which
 * is what we actually want most of the time. It also means the artwork stops
 * depending on any particular figure being true.
 */
function tokenise(value: string): string[] {
  const out: string[] = [];
  for (let i = 0; i < value.length; i++) {
    if (value[i] === '{') {
      const end = value.indexOf('}', i);
      if (end === -1) break;
      out.push(value.slice(i + 1, end));
      i = end;
      continue;
    }
    if (value[i] === '-') {
      out.push('g');
      continue;
    }
    out.push(value[i]);
  }
  return out;
}

/** Lit shapes and unlit shapes, in glyph units, laid out left to right. */
function layout(value: string) {
  const lit: Shape[] = [];
  const unlit: Shape[] = [];
  let x = 0;

  for (const token of tokenise(value)) {
    if (token === ':' || token === '.') {
      const cx = x + PUNCT_WIDTH / 2;
      const ys = token === ':' ? [0.66, 1.34] : [2 - T / 2];
      for (const cy of ys) lit.push({ cx, cy, r: DOT_R });
      x += PUNCT_WIDTH + ADVANCE;
      continue;
    }

    // A single character is a digit to look up; anything longer is already a mask.
    const on = token.length === 1 ? (DIGIT[token] ?? token) : token;
    for (const key of ALL) {
      const shape = SEGMENT[key];
      const moved =
        'points' in shape
          ? {
              points: shape.points
                .split(' ')
                .map((p) => {
                  const [px, py] = p.split(',');
                  return `${Number(px) + x},${py}`;
                })
                .join(' ')
            }
          : shape;
      (on.includes(key) ? lit : unlit).push(moved);
    }
    x += 1 + ADVANCE;
  }

  return { lit, unlit, width: x - ADVANCE };
}

/**
 * A level-meter row, the other thing on the face of a clock radio.
 *
 * Worth having because it is the only silhouette in the set that is neither a
 * glyph nor a fragment of one: a run of short vertical bars reads as a
 * horizontal band of light, where every mask reads as a cluster. Across six
 * tiles that difference does more work than another crop of the same shape.
 *
 * Heights are 0..1 of the glyph box; the bar is drawn bottom-up.
 */
function bars(heights: number[]) {
  const W = 0.34; // bar width in glyph units
  const PITCH = 0.62;
  const lit: Shape[] = [];
  const unlit: Shape[] = [];

  heights.forEach((h, i) => {
    const cx = i * PITCH;
    const full = 1.9;
    const top = 2 - full;
    const cut = 2 - full * Math.max(0, Math.min(1, h));
    // The dark remainder of the column, so the bar sits in a physical channel.
    if (cut > top) unlit.push(rect(cx, cx + W, top, cut));
    if (cut < 2) lit.push(rect(cx, cx + W, cut, 2));
  });

  return { lit, unlit, width: heights.length * PITCH - (PITCH - W) };
}

/**
 * A scatter/sparkline row — a faint baseline axis with lit points plotted
 * above it at varying heights. Reads as a chart rather than a readout: no
 * two adjacent silhouettes in the preset set should be "a run of shapes",
 * this is the one built from dots instead of bars or glyph strokes.
 *
 * Heights are 0..1 of the glyph box, floor-referenced rather than
 * bottom-up like `bars` — the axis sits low in the frame and points rise
 * from it, the way a line chart's baseline sits under the data.
 */
function scatter(heights: number[]) {
  const PITCH = 0.5;
  const R = 0.15;
  const FLOOR = 1.86;
  const RISE = 1.55;
  const lit: Shape[] = [];
  const unlit: Shape[] = [];

  heights.forEach((h, i) => {
    const cx = i * PITCH;
    const cy = FLOOR - RISE * Math.max(0, Math.min(1, h));
    lit.push({ cx, cy, r: R });
  });

  const width = (heights.length - 1) * PITCH + R * 2;
  unlit.push(rect(-R, width - R, FLOOR + 0.08, FLOOR + 0.13));

  return { lit, unlit, width };
}

/**
 * A timeline row — a thin horizontal track with round nodes along it, one or
 * two lit larger than the rest. Reads as a roadmap or a progress line, the
 * only silhouette in the set that runs as a single connected spine rather
 * than a cluster or a series of separate marks.
 */
function timeline(nodes: number, active: number[]) {
  const PITCH = 0.46;
  const TRACK_H = 0.05;
  const R_OFF = 0.085;
  const R_ON = 0.24;
  const lit: Shape[] = [];
  const unlit: Shape[] = [];
  const width = (nodes - 1) * PITCH;

  unlit.push(rect(0, width, 1 - TRACK_H / 2, 1 + TRACK_H / 2));

  for (let i = 0; i < nodes; i++) {
    const cx = i * PITCH;
    const isActive = active.includes(i);
    const shape: Shape = { cx, cy: 1, r: isActive ? R_ON : R_OFF };
    (isActive ? lit : unlit).push(shape);
  }

  return { lit, unlit, width: width + R_ON * 2 };
}

function rect(x0: number, x1: number, y0: number, y1: number): Shape {
  return {
    points: [
      [x0, y0],
      [x1, y0],
      [x1, y1],
      [x0, y1]
    ]
      .map(([x, y]) => `${x},${y}`)
      .join(' ')
  };
}

function Shapes({ shapes, cell }: { shapes: Shape[]; cell: number }) {
  return (
    <>
      {shapes.map((s, i) =>
        'points' in s ? (
          <polygon
            key={i}
            points={s.points
              .split(' ')
              .map((p) => {
                const [x, y] = p.split(',');
                return `${Number(x) * cell},${Number(y) * cell}`;
              })
              .join(' ')}
          />
        ) : (
          <circle key={i} cx={s.cx * cell} cy={s.cy * cell} r={s.r * cell} />
        )
      )}
    </>
  );
}

const VIEW_W = 1600;
const VIEW_H = 1120;

/** Keeps float noise out of the emitted filter attributes. */
const round = (n: number) => Math.round(n * 1000) / 1000;

/** Deterministic small int from a string, so each uid gets its own stable
 *  grain pattern instead of every field on a page rolling the same noise. */
function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h % 1000;
}

export default function SegmentField({
  value,
  meter,
  dots,
  timeline: timelineProp,
  cell = 460,
  x = 560,
  y = 100,
  angle = -3,
  skew = 4,
  intensity = 1,
  defocus = 1,
  scrim = true,
  drift = true,
  uid = 'segfield',
  className,
  style
}: {
  /**
   * Digits, `:`, `.`, `-`, or `{acf}` to light an arbitrary set of segments.
   * Crop is deliberate — glyphs should bleed off the frame rather than sit in it.
   */
  value?: string;
  /** Level-meter bars instead of glyphs. Heights are 0..1. Takes priority over `value`. */
  meter?: number[];
  /** A scatter/sparkline row — dots at varying heights over a baseline axis.
   *  Heights are 0..1. Takes priority over `meter` and `value`. */
  dots?: number[];
  /** A horizontal timeline — a track with round nodes, some active (lit,
   *  larger). Takes priority over `dots`, `meter` and `value`. */
  timeline?: { nodes: number; active: number[] };
  /** Glyph height is 2x this. At 460 a digit is about the visible frame height. */
  cell?: number;
  /**
   * Offset of the first glyph inside the 1600x1120 view box.
   *
   * When the field sits behind copy this is an accessibility control, not a
   * taste one. Measured by re-rendering this component offline — same polygons,
   * same sigmas, same alpha gain and screen blend — and sampling the composite
   * under the real text boxes, worst case being the 98th percentile of
   * background luma inside each box:
   *
   *   lit mass centred left (x=-180)   eyebrow 4.48  lead 4.48  footnote 3.41
   *   lit mass held right  (x= 560)    eyebrow 7.33  lead 6.15  footnote 4.67
   *
   * AA wants 4.5 for all three. Scrimming the left version up to pass needs the
   * overlay near 0.8 opacity, which erases the picture. Moving the light to
   * where the words are not costs nothing and is what the reference does.
   */
  x?: number;
  y?: number;
  /** The reference is shot off-axis. Rotation plus skew is enough at this blur. */
  angle?: number;
  skew?: number;
  /** Scales the emissive layers. Below 1 the glyph reads as a further-off lamp. */
  intensity?: number;
  /**
   * Scales every blur radius. 1 is the sigma set tuned against the reference;
   * below 1 the glyph edges firm up, above 1 it melts. Varying this across a row
   * is what stops six crops of the same artwork reading as one repeated tile.
   */
  defocus?: number;
  /** The lateral falloff that protects overlaid copy. Off when nothing overlays. */
  scrim?: boolean;
  /** CSS drift — on by default, everywhere the field appears. */
  drift?: boolean;
  /** Only needed if two fields share a page, to keep filter ids apart. */
  uid?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const { lit, unlit } = timelineProp
    ? timeline(timelineProp.nodes, timelineProp.active)
    : dots
      ? scatter(dots)
      : meter
        ? bars(meter)
        : layout(value ?? '');
  const transform = `translate(${x} ${y}) rotate(${angle} ${VIEW_W / 2} ${VIEW_H / 2}) skewX(${skew})`;

  return (
    <div
      className={`segfield${className ? ` ${className}` : ''}`}
      aria-hidden="true"
      data-drift={drift ? 'true' : 'false'}
      style={style}
    >
      <div className="segfield-plate">
        <svg
          className="segfield-svg"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            {/*
              Blur then gain the alpha. The gain is the whole trick: a Gaussian
              wide enough to match the reference leaves the middle of a segment
              at about two-thirds opacity, which is why a plain CSS blur() comes
              out muddy brown instead of lit orange. Multiplying alpha back up
              re-saturates the body while leaving the falloff intact.

              stdDeviation is in view-box units, so the defocus stays a fixed
              share of the artwork at every viewport width. sRGB interpolation
              is not optional — linearRGB is the default and washes the hue out.

              When `defocus` widens the blur it also thins the body, so the gain
              rises with it. The square root is an eyeballed curve, not a
              derivation: it holds the lit body at roughly constant density
              across the range we actually use (0.7 to 1.4). Alpha clamps at 1,
              so overshooting only widens the plateau.
            */}
            {(
              [
                ['core', 54, 2.15],
                ['bloom', 240, 0.9],
                ['ghost', 42, 1.4]
              ] as const
            ).map(([name, baseDev, baseSlope]) => (
              <filter
                key={name}
                id={`${uid}-${name}`}
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
                colorInterpolationFilters="sRGB"
              >
                <feGaussianBlur stdDeviation={round(baseDev * defocus)} />
                <feComponentTransfer>
                  <feFuncA type="linear" slope={round(baseSlope * Math.sqrt(defocus))} />
                </feComponentTransfer>
              </filter>
            ))}

            {/*
              Film grain. The reference is real macro photography — sensor noise
              is part of what reads as "photographic" rather than "rendered", and
              our vector plate had none. feTurbulence's alpha channel is itself
              per-pixel noise; the matrix below throws away its RGB (fixed to
              white) and keeps only that alpha, scaled down to a few percent, so
              it composites as a faint speckle rather than a visible pattern.
              A fixed seed per uid keeps it stable across re-renders of the same
              card instead of re-rolling on every paint.
            */}
            <filter id={`${uid}-grain`} x="0%" y="0%" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.85"
                numOctaves={2}
                seed={Math.abs(hashSeed(uid))}
                stitchTiles="stitch"
                result="noise"
              />
              <feColorMatrix
                in="noise"
                type="matrix"
                values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0"
              />
            </filter>
          </defs>

          {/* The unlit segments. A real display is a physical "8" that catches a
              little light; without them it reads as a gradient, not an object. */}
          <g
            fill="currentColor"
            filter={`url(#${uid}-ghost)`}
            opacity={0.06}
            transform={transform}
          >
            <Shapes shapes={unlit} cell={cell} />
          </g>

          {/* Emissive, so it adds light to the ground rather than covering it.
              That is also what keeps the shadow navy instead of going grey. */}
          <g
            fill="currentColor"
            filter={`url(#${uid}-bloom)`}
            opacity={0.22 * intensity}
            transform={transform}
            style={{ mixBlendMode: 'screen' }}
          >
            <Shapes shapes={lit} cell={cell} />
          </g>
          <g
            fill="currentColor"
            filter={`url(#${uid}-core)`}
            opacity={intensity}
            transform={transform}
            style={{ mixBlendMode: 'screen' }}
          >
            <Shapes shapes={lit} cell={cell} />
          </g>

          {/* The grain pass. Sits above the light, blended so it only ever
              perturbs existing tone rather than adding a visible haze of its
              own — that's what keeps it reading as sensor noise, not as a
              texture someone applied on purpose. */}
          <rect
            x={0}
            y={0}
            width={VIEW_W}
            height={VIEW_H}
            filter={`url(#${uid}-grain)`}
            style={{ mixBlendMode: 'overlay' }}
          />
        </svg>
      </div>
      {/* A second, independently-drifting warm highlight. The base plate's pan
          is slow and wide (it has to stay steady enough to read); this is the
          thing that makes the field look alive at a glance, a bloom of light
          sliding across the glass rather than the whole picture crawling. */}
      <div className="segfield-glint" />
      {/* The colour-wash: a soft, off-centre duotone cast over the whole
          frame. A drawn plate on flat navy reads as "a UI element that glows",
          where the reference reads as "a photograph" — the difference is that
          real macro photography never has a neutral ground, the whole frame
          picks up a cast from whatever the light was doing. Multiply-blended
          so it can only ever deepen, never wash out, the existing tone. */}
      <div className="segfield-wash" />
      <div className="segfield-vignette" />
      {scrim && <div className="segfield-scrim" />}
    </div>
  );
}
