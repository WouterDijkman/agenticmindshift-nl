import { Button } from '@repo/ui/Button';
import { INTAKE_URL } from '@/lib/site';
import Reveal from './Reveal';

/** One primary action per screen — this band never carries a second button. */
export default function CtaBand({
  title,
  body,
  cta,
  note
}: {
  title: string;
  body: string;
  cta: string;
  note?: string;
}) {
  return (
    <section className="seam grain-overlay" style={{ paddingBlock: 'clamp(64px, 8vw, 112px)' }}>
      <span
        className="glow"
        style={{
          width: 620,
          height: 340,
          left: '50%',
          top: '10%',
          transform: 'translateX(-50%)',
          background: 'var(--wine-soft)'
        }}
      />
      <div className="container-medium" style={{ position: 'relative' }}>
        <Reveal className="measure">
          <h2 className="type-h2">{title}</h2>
          <p className="type-lead" style={{ marginTop: 20 }}>
            {body}
          </p>
          <div style={{ marginTop: 36 }}>
            <Button href={INTAKE_URL} size="lg" magnetic={false}>
              {cta}
            </Button>
          </div>
          {note && (
            <p className="type-small" style={{ marginTop: 18, color: 'var(--text-quaternary)' }}>
              {note}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
