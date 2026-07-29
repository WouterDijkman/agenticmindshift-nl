import type { CSSProperties } from 'react';
import { Button } from '@repo/ui/Button';
import { Link } from '@/i18n/navigation';
import { INTAKE_URL } from '@/lib/site';
import { ArrowRight } from './Icons';

/**
 * Deliberately not 100vh: the top edge of the next section has to stay visible,
 * and the H1 never fades — an `opacity: 0` LCP element keeps the LCP clock running.
 */
export default function Hero({
  eyebrow,
  title,
  lead,
  cta,
  secondary,
  secondaryHref,
  footnote
}: {
  eyebrow: string;
  title: string;
  lead: string;
  cta: string;
  secondary: string;
  secondaryHref: string;
  footnote: string;
}) {
  return (
    <section className="grain-overlay" style={{ position: 'relative', overflow: 'hidden' }}>
      <span
        className="glow hero-glow"
        style={{
          width: 900,
          height: 460,
          left: '-10%',
          top: '-24%',
          background: 'rgba(132, 78, 88, 0.30)'
        }}
      />
      <span
        className="glow hero-glow"
        style={{
          width: 460,
          height: 300,
          right: '-6%',
          top: '18%',
          background: 'rgba(241, 76, 29, 0.07)'
        }}
      />

      <div
        className="container-wide"
        style={{
          position: 'relative',
          paddingTop: 'clamp(72px, 11vw, 148px)',
          paddingBottom: 'clamp(56px, 8vw, 104px)'
        }}
      >
        <span className="eyebrow eyebrow-accent hero-enter" style={{ marginBottom: 28 }}>
          {eyebrow}
        </span>

        <h1 className="type-display hero-settle" style={{ maxWidth: '24ch' }}>
          {title}
        </h1>

        <p
          className="type-lead hero-enter"
          style={{ marginTop: 28, maxWidth: '66ch', '--enter-delay': '120ms' } as CSSProperties}
        >
          {lead}
        </p>

        <div
          className="hero-enter"
          style={
            {
              marginTop: 40,
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
              marginTop: 26,
              color: 'var(--text-quaternary)',
              '--enter-delay': '290ms'
            } as CSSProperties
          }
        >
          {footnote}
        </p>
      </div>
    </section>
  );
}
