import type { CSSProperties, ReactNode } from 'react';
import { Button } from '@repo/ui/Button';
import { Link } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';
import { auditUrl } from '@/lib/site';
import { ArrowRight } from './Icons';
import CtaProof from './CtaProof';
import SegmentField from './SegmentField';

/**
 * Exactly one screen tall — see `.fit-screen` in globals.css for why, and for
 * the scroll-cue trade-off it accepts. The H1 still never fades: an
 * `opacity: 0` LCP element keeps the LCP clock running.
 *
 * The background stays procedural. A full-bleed photograph was tried here and
 * read as restless behind display type — the generated scenes earn their keep
 * at card size, where they are looked *at* rather than read *through*.
 */
export default async function Hero({
  title,
  lead,
  cta,
  secondary,
  secondaryHref,
  footnote,
  aside
}: {
  title: string;
  lead: string;
  cta: string;
  secondary: string;
  secondaryHref: string;
  /**
   * Proof directly under the button. Optional, because on the homepage the
   * `GuaranteeBand` states the same promise at full size a hundred pixels
   * below — and small print restating the band it sits above is the shape of
   * repetition, not of reassurance. The inner pages have no band and keep it.
   */
  footnote?: string;
  /**
   * Optional artefact beside the copy. Without it the hero is type on flat navy:
   * measured at 1440 it was 373 characters over 723px, and it read — accurately
   * — as empty. An object here also answers "what do I actually get" while the
   * reader is still deciding whether to keep scrolling.
   */
  aside?: ReactNode;
}) {
  const audit = auditUrl(await getLocale());

  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <SegmentField value="{abdeg}" />

      <div className="container-wide fit-screen" style={{ position: 'relative', zIndex: 1 }}>
        <div className={aside ? 'hero-split' : undefined}>
          <div>
            {/* The eyebrow that sat here is gone, along with the other
                forty-five. Five of the eight sites this was measured against
                ship none at all, and a category label above an H1 that already
                states the category is the clearest case of the lot. */}
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
              <Button href={audit} size="lg" magnetic={false} className="plausible-event-name=Audit+CTA plausible-event-location=home-hero">
                {cta}
              </Button>
              <Link href={secondaryHref} className="link-quiet">
                {secondary}
                <ArrowRight />
              </Link>
            </div>

            {footnote && (
              <div
                className="hero-enter"
                style={
                  { marginTop: 'var(--fit-gap-sm)', '--enter-delay': '290ms' } as CSSProperties
                }
              >
                <CtaProof>{footnote}</CtaProof>
              </div>
            )}
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
