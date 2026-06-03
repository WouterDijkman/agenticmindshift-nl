'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

type Dim = { label: string; score: number; peer: number };

// Six dimensions with an illustrative score (0–100) and the peer-median marker.
const DIMENSIONS: Dim[] = [
  { label: 'Doorlooptijd', score: 58, peer: 70 },
  { label: 'Portefeuille-inzicht', score: 74, peer: 68 },
  { label: 'Oordeelsvorming', score: 63, peer: 66 },
  { label: 'AI-bestendigheid', score: 39, peer: 64 },
  { label: 'Teamcapaciteit', score: 71, peer: 67 },
  { label: 'Kennisborging', score: 46, peer: 65 },
];

const NAVY = 'var(--text-primary)';
const RUST = 'var(--accent-cta)';

function ScoreRow({ d, highlight }: { d: Dim; highlight: boolean }) {
  const below = d.score < d.peer;
  const fill = below ? RUST : NAVY;
  return (
    <div
      style={{
        padding: highlight ? '12px 14px' : '12px 4px',
        marginInline: highlight ? '-14px' : 0,
        background: highlight ? 'var(--accent-cta-soft)' : 'transparent',
        borderLeft: highlight ? `2px solid ${RUST}` : '2px solid transparent',
        borderRadius: highlight ? '6px' : 0,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '7px' }}>
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            letterSpacing: '-0.005em',
          }}
        >
          {d.label}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: below ? RUST : 'var(--text-muted)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {d.score}
          <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}> / 100</span>
        </span>
      </div>
      {/* bar track */}
      <div
        style={{
          position: 'relative',
          height: '7px',
          borderRadius: '999px',
          background: 'rgba(11,31,58,0.08)',
          overflow: 'visible',
        }}
      >
        {/* fill */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: `${d.score}%`,
            background: fill,
            borderRadius: '999px',
          }}
        />
        {/* peer-median tick */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-3px',
            bottom: '-3px',
            left: `${d.peer}%`,
            width: '2px',
            background: 'var(--text-muted)',
            opacity: 0.55,
            borderRadius: '2px',
          }}
        />
      </div>
    </div>
  );
}

export default function HomepageShowcaseSection() {
  return (
    <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(72px, 10vw, 120px)' }}>
      <div className="container-medium">
        <div className="showcase-grid">
          {/* ── Left: copy ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow" style={{ marginBottom: '16px' }}>Het rapport</p>
            <h2 className="type-h2" style={{ marginBottom: '20px', maxWidth: '460px' }}>
              Geen losse score. Een rapport dat u intern kunt delen.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.0625rem, 1.6vw, 1.1875rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                maxWidth: '440px',
                marginBottom: '28px',
              }}
            >
              Elke dimensie krijgt een score, afgezet tegen het niveau van vergelijkbare
              partijen. U ziet in één oogopslag waar u voorloopt — en welke twee punten
              de meeste aandacht verdienen.
            </p>

            <ul className="showcase-checklist">
              {[
                'Zes dimensies, elk gebenchmarkt tegen vergelijkbare fondsen',
                'De twee aandachtspunten met de hoogste impact, uitgelicht',
                'Direct deelbaar in uw IC — zonder extra toelichting',
              ].map((t) => (
                <li key={t}>
                  <span aria-hidden="true" className="showcase-check">✓</span>
                  {t}
                </li>
              ))}
            </ul>

            <div style={{ marginTop: '32px' }}>
              <Button href="/scorecard" variant="primary" size="lg">
                Start de Scorecard
              </Button>
            </div>
          </motion.div>

          {/* ── Right: report mockup ── */}
          <motion.div
            className="showcase-mockup-wrap"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            {/* floating callout — Metal-style stat highlight */}
            <div className="showcase-callout" aria-hidden="true">
              <span className="showcase-callout-num">2 van 6</span>
              <span className="showcase-callout-label">dimensies onder<br />vergelijkbare partijen</span>
            </div>

            <div className="showcase-card">
              {/* window bar */}
              <div className="showcase-card-bar">
                <span className="showcase-dot" style={{ background: '#E0654B' }} />
                <span className="showcase-dot" style={{ background: '#E8B23E' }} />
                <span className="showcase-dot" style={{ background: '#5BA06B' }} />
                <span className="showcase-card-bar-label">Scorecard-rapport · Vertrouwelijk</span>
              </div>

              {/* card body */}
              <div className="showcase-card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.0625rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        margin: 0,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      Uw profiel vs. vergelijkbare partijen
                    </p>
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', color: 'var(--text-muted)', margin: '4px 0 0', letterSpacing: '0.02em' }}>
                      Mid-market PE · 12 vergelijkbare fondsen
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '18px' }}>
                  {DIMENSIONS.map((d) => (
                    <ScoreRow key={d.label} d={d} highlight={d.label === 'AI-bestendigheid'} />
                  ))}
                </div>

                {/* legend */}
                <div className="showcase-legend">
                  <span className="showcase-legend-item">
                    <span className="showcase-legend-swatch" style={{ background: RUST }} />
                    Onder mediaan
                  </span>
                  <span className="showcase-legend-item">
                    <span className="showcase-legend-swatch" style={{ background: NAVY }} />
                    Op/boven mediaan
                  </span>
                  <span className="showcase-legend-item">
                    <span className="showcase-legend-tick" />
                    Peer-mediaan
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
