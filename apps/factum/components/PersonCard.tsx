type Role = { org: string; role: string; period: string };

/**
 * No headshots exist yet, so the card is designed around a monogram rather than
 * leaving a broken photo slot. The career table is the credibility, not the face.
 */
export default function PersonCard({
  name,
  title,
  bio,
  historyLabel,
  history
}: {
  name: string;
  title: string;
  bio: string;
  historyLabel: string;
  history: Role[];
}) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('');

  return (
    // Bios differ in length, so the card fills its grid row and the two panels
    // stay bottom-aligned instead of ending on a ragged edge.
    <article className="panel" style={{ height: '100%', padding: 'clamp(24px, 3vw, 40px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 24 }}>
        <span
          aria-hidden="true"
          style={{
            flex: 'none',
            width: 56,
            height: 56,
            display: 'grid',
            placeItems: 'center',
            borderRadius: 2,
            background: 'var(--wine)',
            color: '#ffffff',
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            letterSpacing: '0.02em'
          }}
        >
          {initials}
        </span>
        <div>
          <h2 className="type-h3" style={{ fontSize: '1.375rem' }}>
            {name}
          </h2>
          <p className="mono" style={{ color: 'var(--wine-text)', marginTop: 6 }}>
            {title}
          </p>
        </div>
      </div>

      <p className="type-body">{bio}</p>

      <span className="eyebrow" style={{ marginTop: 32, marginBottom: 4 }}>
        {historyLabel}
      </span>
      <dl style={{ margin: 0 }}>
        {history.map((entry) => (
          <div
            key={`${entry.org}-${entry.period}`}
            className="hairline-top"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) auto',
              gap: '4px 20px',
              paddingBlock: 14,
              alignItems: 'baseline'
            }}
          >
            <dt className="type-h4" style={{ fontSize: '0.9375rem' }}>
              {entry.org}
            </dt>
            <dd className="mono" style={{ margin: 0, color: 'var(--text-quaternary)' }}>
              {entry.period}
            </dd>
            <dd
              className="type-small"
              style={{ margin: 0, gridColumn: '1 / -1', color: 'var(--text-tertiary)' }}
            >
              {entry.role}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
