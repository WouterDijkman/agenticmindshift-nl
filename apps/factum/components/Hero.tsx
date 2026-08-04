import type { CSSProperties, ReactNode } from 'react';
import { Button } from '@repo/ui/Button';
import { Link } from '@/i18n/navigation';
import { INTAKE_URL } from '@/lib/site';
import { ArrowRight } from './Icons';
import SegmentField from './SegmentField';

/**
 * Exactly one screen tall — see `.fit-screen` in globals.css for why, and for
 * the scroll-cue trade-off it accepts. The H1 still never fades: an
 * `opacity: 0` LCP element keeps the LCP clock running.
 */
export default function Hero({
  eyebrow,
  title,
  lead,
  cta,
  secondary,
  secondaryHref,
  footnote,
  aside
}: {
  eyebrow: string;
  title: string;
  lead: string;
  cta: string;
  secondary: string;
  secondaryHref: string;
  footnote: string;
  /**
   * Optional artefact beside the copy. Without it the hero is type on flat navy:
   * measured at 1440 it was 373 characters over 723px, and it read — accurately
   * — as empty. An object here also answers "what do I actually get" while the
   * reader is still deciding whether to keep scrolling.
   */
  aside?: ReactNode;
}) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <SegmentField value="{abdeg}" />

      <div className="container-wide fit-screen" style={{ position: 'relative', zIndex: 1 }}>
        <div className={aside ? 'hero-split' : undefined}>
          <div>
            <span
              className="eyebrow eyebrow-accent hero-enter"
              style={{ marginBottom: 'var(--fit-gap-md)' }}
            >
              {eyebrow}
            </span>

            <h1 className="type-display hero-settle" style={{ maxWidth: '20ch' }}>
              {title}
            </h1>

            <p
              className="type-lead hero-enter"
              style={
                {
                  marginTop: 'var(--fit-gap-md)',
                  maxWidth: '52ch',
                  '--enter-delay': '120ms'
                } as CSSProperties
              }
            >
              {lead}
            </p>

            <div
              className="hero-enter"
              style={
                {
                  marginTop: 'var(--fit-gap-lg)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 'clamp(20px, 3vw, 36px)',
                  '--enter-delay': '210ms'
                } as CSSProperties
              }
            >
              <Button href={INTAKE_URL} size="lg" magnetic={false}>
                {cta}
              </Button>
              <Link href={secondaryHref} className="link-quiet">
                {secondary}
                <ArrowRight />
              </Link>
            </div>

            <p
              className="type-small hero-enter"
              style={
                {
                  marginTop: 'var(--fit-gap-sm)',
                  color: 'var(--text-quaternary)',
                  '--enter-delay': '290ms'
                } as CSSProperties
              }
            >
              {footnote}
            </p>
          </div>

          {aside && (
            <div
              className="hero-enter hero-aside"
              style={{ '--enter-delay': '340ms' } as CSSProperties}
            >
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
