import SegmentField from './SegmentField';

/**
 * The card image: a defocused macro of a lit display, cropped hard enough that
 * it reads as light rather than as a readout.
 *
 * The crop is the point. In the reference we measured, the glyphs always bleed
 * off frame — you get a lit edge and a falloff, not a legible number. At card
 * size a centred, fully visible digit reads as a calculator screenshot, so every
 * preset below pushes its lit mass past at least two edges.
 *
 * These used to be Factum's own figures. They are not any more, and the reason
 * is worth writing down: a digit is a shape a reader will try to decode even at
 * heavy blur, so the artwork kept dragging a number into a place where we were
 * not making a numerical claim. Segment masks like `{cfg}` decode to nothing.
 * The picture is now just light, which is all it was ever doing.
 */

/** cell is glyph width; glyph height is 2x that. The view box is 1600x1120,
 *  and a 16:9 card slices it to the middle 900 rows, so y lives in -400..900. */
type Preset = {
  value?: string;
  meter?: number[];
  dots?: number[];
  timeline?: { nodes: number; active: number[] };
  cell: number;
  x: number;
  y: number;
  angle: number;
  skew: number;
  intensity: number;
  defocus: number;
  /** Which accent carries the light. `cta` the brand orange, `wine` the
   *  rose, `mono` plain white — three hues that don't share a family, unlike
   *  a tint-of-orange would. Cycles on a different modulus than the shape
   *  below, so no two adjacent cards in a row ever repeat either axis. */
  tone: 'cta' | 'wine' | 'mono';
};

const TONE_COLOR: Record<Preset['tone'], string | undefined> = {
  cta: undefined,
  wine: 'var(--wine-text)',
  mono: 'var(--text-display)'
};

/**
 * Four silhouettes carry the variety, not just crop, blur and colour: a digit
 * mask (`value`), a level-meter row (`meter`), a scatter/sparkline (`dots`)
 * and a timeline of nodes (`timeline`). Four genuinely different objects, not
 * four crops of the same one — a bar chart, a dot chart, a roadmap and a
 * glyph fragment don't get mistaken for each other even at heavy blur, which
 * is what recolouring or recropping a single shape never achieved.
 *
 * Shape cycles on a period of 4, tone on a period of 3. Twelve presets is the
 * first index where both axes land back on their start together, so across
 * one full lap no two *adjacent* cards ever share a shape or a colour — the
 * two periods are coprime, which is what guarantees it, not hand-checking.
 *
 * Bolder than the previous pass on purpose: lower defocus and higher
 * intensity across the board so the pattern reads as a graphic rather than
 * a soft blur, and a larger `cell` on every non-glyph shape so bars, dots and
 * nodes hold real visual weight in the frame instead of sitting quietly in
 * a corner.
 *
 * Placement is computed, not eyeballed: a segment only lands in frame if its
 * own coordinates fall inside x 0..1600 and y 110..1010 after the offset.
 * Every value anchor below was checked segment by segment. The meter/dots/
 * timeline variants share one verified horizontal-band anchor (cell/x/y/
 * angle/skew) — each of those three shapes occupies a comparable footprint
 * to the level meter that anchor was proven against, so swapping the pattern
 * inside it carries no framing risk.
 */
const BAND = { cell: 620, x: -380, y: 200, angle: 4, skew: -3 } as const;

const PRESETS: Preset[] = [
  // shape: value — tone: cta
  { value: '{cfg}', cell: 600, x: 620, y: -260, angle: -3, skew: 4, intensity: 1.15, defocus: 0.65, tone: 'cta' },
  // shape: meter — tone: wine — rising-then-falling, the firmest band.
  { meter: [0.35, 0.62, 0.48, 0.85, 0.55, 0.7, 0.42], ...BAND, intensity: 1.2, defocus: 0.6, tone: 'wine' },
  // shape: dots — tone: mono — ascending scatter, climbing left to right.
  { dots: [0.2, 0.35, 0.5, 0.65, 0.8, 0.9, 0.75], ...BAND, intensity: 1.3, defocus: 0.55, tone: 'mono' },
  // shape: timeline — tone: cta — one node lit, a single milestone.
  { timeline: { nodes: 6, active: [2] }, ...BAND, intensity: 1.2, defocus: 0.6, tone: 'cta' },

  // shape: value — tone: wine — a second, smaller glyph fragment.
  { value: '{bg}', cell: 600, x: 700, y: -100, angle: 5, skew: -4, intensity: 1.15, defocus: 0.7, tone: 'wine' },
  // shape: meter — tone: mono — descending staircase.
  { meter: [0.92, 0.78, 0.64, 0.5, 0.36, 0.24, 0.15], ...BAND, intensity: 1.25, defocus: 0.65, tone: 'mono' },
  // shape: dots — tone: cta — spiky, no discernible trend.
  { dots: [0.3, 0.8, 0.25, 0.6, 0.9, 0.4, 0.55], ...BAND, intensity: 1.2, defocus: 0.75, tone: 'cta' },
  // shape: timeline — tone: wine — two nodes lit, a span rather than a point.
  { timeline: { nodes: 6, active: [1, 4] }, ...BAND, intensity: 1.15, defocus: 0.7, tone: 'wine' },

  // shape: value — tone: mono — a third glyph fragment, wider anchor.
  { value: '{bcef}', cell: 640, x: 280, y: -160, angle: 6, skew: 5, intensity: 1.2, defocus: 0.75, tone: 'mono' },
  // shape: meter — tone: cta — twin peaks either side of a dip.
  { meter: [0.7, 0.9, 0.4, 0.2, 0.45, 0.85, 0.6], ...BAND, intensity: 1.3, defocus: 0.55, tone: 'cta' },
  // shape: dots — tone: wine — a near-flat scatter, the quietest of the three.
  { dots: [0.45, 0.5, 0.48, 0.52, 0.47, 0.5, 0.46], ...BAND, intensity: 1.1, defocus: 0.8, tone: 'wine' },
  // shape: timeline — tone: mono — a longer track, one node lit near the end.
  { timeline: { nodes: 7, active: [5] }, ...BAND, intensity: 1.2, defocus: 0.65, tone: 'mono' }
];

export default function SegmentCard({
  index,
  chip
}: {
  /** Stable index — picks the preset, so a row reads as a varied series. */
  index: number;
  /** Small corner chip, e.g. "01". */
  chip?: string;
}) {
  const p = PRESETS[((index % PRESETS.length) + PRESETS.length) % PRESETS.length];
  const color = TONE_COLOR[p.tone];

  return (
    <div className="wb-card-media">
      <SegmentField
        value={p.value}
        meter={p.meter}
        dots={p.dots}
        timeline={p.timeline}
        cell={p.cell}
        x={p.x}
        y={p.y}
        angle={p.angle}
        skew={p.skew}
        intensity={p.intensity}
        defocus={p.defocus}
        scrim={false}
        drift
        uid={`segcard${index}`}
        className="segfield-card"
        style={color ? { color } : undefined}
      />
      {chip && <span className="wb-card-chip">{chip}</span>}
    </div>
  );
}
