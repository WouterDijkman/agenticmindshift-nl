import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-elevated)',
        borderTop: '1px solid var(--border-subtle)',
        marginTop: '120px',
      }}
    >
      <div className="container-extra py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p
              className="text-lg font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              Agentic Mindshift
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
              AI-advies voor Nederlandse PE- en M&amp;A-firma&apos;s. Concreet, vertrouwelijk,
              meetbaar.
            </p>
          </div>

          <div>
            <p
              className="text-sm font-semibold mb-4 uppercase tracking-wide"
              style={{ color: 'var(--text-secondary)' }}
            >
              Navigatie
            </p>
            <ul className="flex flex-col gap-2.5 text-sm" style={{ color: 'var(--text-tertiary)' }}>
              <li>
                <Link href="/scorecard">Portfolio Intelligence Scorecard</Link>
              </li>
              <li>
                <Link href="/werkwijze">Werkwijze</Link>
              </li>
              <li>
                <Link href="/over">Over Wouter</Link>
              </li>
              <li>
                <Link href="/factum-capital">Factum Capital</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <p
              className="text-sm font-semibold mb-4 uppercase tracking-wide"
              style={{ color: 'var(--text-secondary)' }}
            >
              Juridisch
            </p>
            <ul className="flex flex-col gap-2.5 text-sm" style={{ color: 'var(--text-tertiary)' }}>
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/voorwaarden">Voorwaarden</Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-6 text-xs"
          style={{ borderTop: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}
        >
          Agentic Mindshift, opgericht oktober 2025. Founder Factum Capital, lancering 1 juli
          2026. &copy; 2026
        </div>
      </div>
    </footer>
  );
}
