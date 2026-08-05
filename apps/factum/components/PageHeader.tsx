import type { CSSProperties, ReactNode } from 'react';
import { Button } from '@repo/ui/Button';
import { Link } from '@/i18n/navigation';
import { INTAKE_URL } from '@/lib/site';
import { ArrowRight } from './Icons';
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
 *
 * Photographs were tried here and behaved the same way they did in the hero:
 * too much going on behind display type. Headers stay procedural; the
 * generated scenes live on the cards.
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
  cta,
  secondary,
  secondaryHref,
  footnote,
  aside,
  visual = 0
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  /**
   * Primary action, pointing at the intake calendar. Optional only so the
   * component stays usable for a page that genuinely has nothing to ask for.
   *
   * It exists because `.fit-screen` made every inner page exactly one screen:
   * the first and only guaranteed screen of six pages was copy with no
   * question attached, and `/diligence-sprint` — the page someone lands on
   * once they are already interested — spent its lower two thirds on empty
   * gradient.
   */
  cta?: string;
  /** Quiet in-site link beside the primary action. Needs `secondaryHref`. */
  secondary?: string;
  secondaryHref?: string;
  /**
   * Sits directly under the button, which is where doubt peaks and therefore
   * where the proof belongs. In practice this is `shared.ctaProof` — the
   * findings guarantee with its condition spoken in the same breath.
   */
  footnote?: string;
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

            {cta && (
              <div
                style={{
                  marginTop: 'var(--fit-gap-lg)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 'clamp(20px, 3vw, 36px)'
                }}
              >
                <Button href={INTAKE_URL} size="lg" magnetic={false} className="plausible-event-name=Intake+CTA plausible-event-location=page-header">
                  {cta}
                </Button>
                {secondary && secondaryHref && (
                  <Link href={secondaryHref} className="link-quiet">
                    {secondary}
                    <ArrowRight />
                  </Link>
                )}
              </div>
            )}

            {cta && footnote && (
              <p
                className="type-small"
                style={{
                  marginTop: 'var(--fit-gap-sm)',
                  maxWidth: '58ch',
                  color: 'var(--text-quaternary)'
                }}
              >
                {footnote}
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
