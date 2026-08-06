import type { ReactNode } from 'react';
import Reveal from './Reveal';

export function Section({
  children,
  seam = true,
  weight = 'normal',
  id,
  width = 'wide',
  tone = 'default'
}: {
  children: ReactNode;
  seam?: boolean;
  id?: string;
  width?: 'narrow' | 'medium' | 'wide';
  /**
   * How much air the section gets. Not a style choice per call site — a claim
   * about how much this section matters relative to the ones around it. The
   * page used to run one value for all of them, which is why it read as a
   * stack of equal trays; `loud` is for the argument the page is actually
   * built on and should appear once, `tight` for a coda hanging off the
   * section above it.
   */
  weight?: 'tight' | 'normal' | 'loud';
  /** A change of ground. At most two non-default bands per page. */
  tone?: 'default' | 'inset' | 'raised';
}) {
  const weightClass =
    weight === 'tight' ? 'section-tight' : weight === 'loud' ? 'section-loud' : '';
  const toneClass =
    tone === 'inset' ? 'section-inset' : tone === 'raised' ? 'section-raised' : '';

  return (
    <section
      id={id}
      className={`section ${weightClass} ${seam ? 'seam' : ''} ${toneClass}`}
      style={{ scrollMarginTop: 80 }}
    >
      {/*
        The box is always the wide container; `width` narrows the *measure*
        inside it. Each width used to pick its own centred container, so a
        single page ran two different left edges — measured on the homepage at
        1440, the wide sections started at x=145 and the medium ones at x=280.
        A shared left edge is the strongest alignment cue a page has, and
        trading it for a reading measure loses more than it buys. The narrower
        measure now comes off the right only, which also keeps the column
        left-aligned instead of centred.
      */}
      <div className="container-wide">
        <div className={width === 'wide' ? undefined : `measure-${width}`}>{children}</div>
      </div>
    </section>
  );
}

/**
 * There is no `eyebrow` prop here any more, and that is the point.
 *
 * This site carried forty-six of them — a mono, uppercase, wine-coloured label
 * above every single heading on every single page. It reads as a house style
 * until you notice that the house style *is* the repetition the reader is
 * complaining about: thirty-eight sections that all begin with the same three
 * moves in the same order.
 *
 * Of the eight sites this was measured against, five ship none at all —
 * Linear, Vercel, Cursor, Resend and Rogo have literally zero. Hebbia uses
 * them on about half its sections and Clay on a minority. Nobody at this tier
 * puts one on everything.
 *
 * Eyebrows that do real work are still allowed; they just are not a property
 * of "a section". A panel label ("Output contract — every finding"), a refusal
 * heading, a column label in a split — those name a specific artefact and stay
 * as plain `.eyebrow` spans where they belong.
 */
export function SectionHeader({
  title,
  lead,
  align = 'left',
  children
}: {
  title: string;
  lead?: string;
  align?: 'left' | 'wide';
  children?: ReactNode;
}) {
  return (
    <Reveal className="measure" style={align === 'wide' ? { maxWidth: '78ch' } : undefined}>
      <h2 className="type-h2">{title}</h2>
      {lead && (
        <p className="type-lead" style={{ marginTop: 24 }}>
          {lead}
        </p>
      )}
      {children}
    </Reveal>
  );
}

/**
 * A second movement inside one section. Sections were merged to cut the page
 * down; this keeps the copy but drops a whole section's worth of chrome, so the
 * heading steps down to h3 rather than starting a new h2 block.
 */
export function SubHeader({
  title,
  lead,
  className = '',
  children
}: {
  title: string;
  lead?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Reveal className={`measure ${className}`}>
      <h3 className="type-h3">{title}</h3>
      {lead && (
        <p className="type-body" style={{ marginTop: 14 }}>
          {lead}
        </p>
      )}
      {children}
    </Reveal>
  );
}
