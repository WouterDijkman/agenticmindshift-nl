export default function PageHeader({
  eyebrow,
  title,
  lead
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="grain-overlay" style={{ position: 'relative', overflow: 'hidden' }}>
      <span
        className="glow"
        style={{
          width: 720,
          height: 340,
          left: '-12%',
          top: '-40%',
          background: 'rgba(132, 78, 88, 0.26)'
        }}
      />
      <div
        className="container-wide"
        style={{
          position: 'relative',
          paddingTop: 'clamp(56px, 8vw, 104px)',
          paddingBottom: 'clamp(40px, 5vw, 64px)'
        }}
      >
        <span className="eyebrow eyebrow-accent" style={{ marginBottom: 24 }}>
          {eyebrow}
        </span>
        <h1
          className="type-display"
          style={{ maxWidth: '22ch', fontSize: 'clamp(2.25rem, 1.45rem + 3.9vw, 4.875rem)' }}
        >
          {title}
        </h1>
        {lead && (
          <p className="type-lead" style={{ marginTop: 26, maxWidth: '62ch' }}>
            {lead}
          </p>
        )}
      </div>
    </header>
  );
}
