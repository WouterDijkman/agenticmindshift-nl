import type { ReactNode } from 'react';
import Reveal from './Reveal';

export function Section({
  children,
  seam = true,
  tight = false,
  id,
  width = 'wide',
  tone = 'default'
}: {
  children: ReactNode;
  seam?: boolean;
  tight?: boolean;
  id?: string;
  width?: 'narrow' | 'medium' | 'wide';
  /** 'inset' is the one full-width feature moment per page — use it once. */
  tone?: 'default' | 'inset';
}) {
  return (
    <section
      id={id}
      className={`section ${tight ? 'section-tight' : ''} ${seam ? 'seam' : ''} ${tone === 'inset' ? 'section-inset' : ''}`}
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

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = 'left',
  children
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: 'left' | 'wide';
  children?: ReactNode;
}) {
  return (
    <Reveal className="measure" style={align === 'wide' ? { maxWidth: '78ch' } : undefined}>
      {eyebrow && (
        <span className="eyebrow eyebrow-accent" style={{ marginBottom: 18 }}>
          {eyebrow}
        </span>
      )}
      <h2 className="type-h2">{title}</h2>
      {lead && (
        <p className="type-lead" style={{ marginTop: 20 }}>
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
  eyebrow,
  title,
  lead,
  className = '',
  children
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Reveal className={`measure ${className}`}>
      {eyebrow && (
        <span className="eyebrow eyebrow-accent" style={{ marginBottom: 14 }}>
          {eyebrow}
        </span>
      )}
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
