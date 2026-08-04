import type { CSSProperties, ReactNode } from 'react';
import SegmentField from './SegmentField';

/**
 * Six distinct silhouette/tone pairs, one per inner page. Ordered to match
 * the real adjacency chain a reader walks — the footer sitemap list, which
 * runs platform, diligence-sprint, governance, team, partnerships, contact —
 * not alphabetical call-site order, so that no two *consecutive* pages in
 * that list (or the nav's platform/diligence-sprint/governance/team run)
 * land on the same tone. Masks are unique to this component (not reused
 * from SegmentCard's presets) so a page that shows both a header and a row
 * of cards never doubles a silhouette.
 */
const HEADER_PRESETS: { value: string; tone?: 'wine' | 'mono' }[] = [
  { value: '{aceg}', tone: 'wine' }, // platform
  { value: '{bdf}', tone: 'mono' }, // diligence-sprint
  { value: '{acdfg}' }, // governance — distinct from Hero's '{abdeg}'
  { value: '{cdeg}', tone: 'wine' }, // team
  { value: '{abf}', tone: 'mono' }, // partnerships
  { value: '{bcdg}' } // contact
];

const TONE_COLOR: Record<'wine' | 'mono', string> = {
  wine: 'var(--wine-text)',
  mono: 'var(--text-display)'
};

export default function PageHeader({
  eyebrow,
  title,
  lead,
  aside,
  visual = 0
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  /**
   * Optional artefact for the right column. Without it, every inner page ran
   * a single centred measure on a wide container — true on a 1440 screen the
   * copy never filled the right half, and the header read as unfinished
   * rather than as a deliberate one-column layout. Mirrors Hero's aside.
   */
  aside?: ReactNode;
  /** Picks this header's segment-field silhouette/tone. Index follows the
   *  footer sitemap order (platform=0, diligence-sprint=1, governance=2,
   *  team=3, partnerships=4, contact=5) so adjacent pages never repeat. */
  visual?: number;
}) {
  const preset = HEADER_PRESETS[((visual % HEADER_PRESETS.length) + HEADER_PRESETS.length) % HEADER_PRESETS.length];
  const color = preset.tone ? TONE_COLOR[preset.tone] : undefined;

  return (
    <header style={{ position: 'relative', overflow: 'hidden' }}>
      <SegmentField value={preset.value} style={color ? { color } : undefined} />
      <div className="container-wide fit-screen" style={{ position: 'relative', zIndex: 1 }}>
        <div className={aside ? 'hero-split' : undefined}>
          <div>
            <span className="eyebrow eyebrow-accent" style={{ marginBottom: 'var(--fit-gap-md)' }}>
              {eyebrow}
            </span>
            <h1
              className="type-display"
              style={{
                maxWidth: '22ch',
                /* A notch under the homepage H1, and capped against viewport
                   height for the same reason .fit-screen caps the Hero's. */
                fontSize: 'clamp(2.25rem, min(1.45rem + 3.9vw, 8.8vh), 4.875rem)'
              }}
            >
              {title}
            </h1>
            {lead && (
              <p className="type-lead" style={{ marginTop: 'var(--fit-gap-md)', maxWidth: '62ch' }}>
                {lead}
              </p>
            )}
          </div>
          {aside && (
            <div className="hero-enter hero-aside" style={{ '--enter-delay': '220ms' } as CSSProperties}>
              {aside}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
