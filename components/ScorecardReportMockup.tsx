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

/**
 * In-code rendering of the Scorecard report — used on the homepage showcase
 * and the scorecard welcome page. Pure presentational markup; the optional
 * floating callout is positioned by the parent's `.showcase-mockup-wrap`.
 */
export default function ScorecardReportMockup({ callout = true }: { callout?: boolean }) {
  return (
    <>
      {callout && (
        <div className="showcase-callout" aria-hidden="true">
          <span className="showcase-callout-num">2 van 6</span>
          <span className="showcase-callout-label">
            dimensies onder<br />vergelijkbare partijen
          </span>
        </div>
      )}

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
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.6875rem',
                color: 'var(--text-muted)',
                margin: '4px 0 0',
                letterSpacing: '0.02em',
              }}
            >
              Mid-market PE · 12 vergelijkbare fondsen
            </p>
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
    </>
  );
}
