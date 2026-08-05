import { Button } from '@repo/ui/Button';
import { INTAKE_URL } from '@/lib/site';
import Reveal from './Reveal';

import type { ReactNode } from 'react';

/** One primary action per screen — this band never carries a second button. */
export default function CtaBand({
  title,
  body,
  cta,
  note,
  aside
}: {
  title: string;
  body: string;
  cta: string;
  note?: string;
  /**
   * The right column. Measured at 1440 this band ran one narrow centred
   * column with the entire right half empty — on the last screen before the
   * footer, which is where the decision actually gets made. It is also the
   * place a trust element earns the most, because doubt peaks at the button.
   * In practice this carries the findings guarantee.
   */
  aside?: ReactNode;
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
      {/* Wide box, narrow measure — the same left edge as every Section above. */}
      <div className="container-wide" style={{ position: 'relative' }}>
        <div className={aside ? 'cta-split' : undefined}>
          <Reveal className="measure measure-medium">
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
          {aside && <Reveal delay={90}>{aside}</Reveal>}
        </div>
      </div>
    </section>
  );
}
