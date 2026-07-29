import type { ReactNode } from 'react';
import Reveal from './Reveal';

export function Section({
  children,
  seam = true,
  tight = false,
  id,
  width = 'wide'
}: {
  children: ReactNode;
  seam?: boolean;
  tight?: boolean;
  id?: string;
  width?: 'narrow' | 'medium' | 'wide';
}) {
  return (
    <section
      id={id}
      className={`section ${tight ? 'section-tight' : ''} ${seam ? 'seam' : ''}`}
      style={{ scrollMarginTop: 80 }}
    >
      <div className={`container-${width}`}>{children}</div>
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
