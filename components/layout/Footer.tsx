import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-elevated)',
        borderTop: '1px solid var(--border-subtle)',
        }}
    >
      <div className="container-extra py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          <div>
            <p
              className="text-lg font-semibold mb-3"
              style={{ color: 'var(--text-primary)', fontFamily: "var(--font-inter), 'Inter', system-ui, sans-serif" }}
            >
              Agentic Mindshift
            </p>
            <p
              className="text-sm leading-relaxed measure"
              style={{ color: 'var(--text-tertiary)' }}
            >
              AI-advies voor Nederlandse PE- en M&amp;A-firma&apos;s. Concreet, vertrouwelijk,
              meetbaar.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '16px' }}>
              <a
                href="mailto:wouter@agenticmindshift.nl"
                className="footer-link"
                style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}
              >
                wouter@agenticmindshift.nl
              </a>
              <a
                href="https://www.linkedin.com/in/wwdijkman"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}
              >
                linkedin.com/in/wwdijkman →
              </a>
            </div>
          </div>

          <div>
            <p
              className="text-sm font-semibold mb-4 uppercase tracking-wide"
              style={{ color: 'var(--text-secondary)', fontFamily: "var(--font-inter), 'Inter', system-ui, sans-serif" }}
            >
              Navigatie
            </p>
            <ul
              className="flex flex-col gap-3 text-sm"
              style={{ color: 'var(--text-tertiary)' }}
            >
              <li>
                <Link
                  href="/scorecard"
                  className="nav-link inline-flex items-center min-h-[44px]"
                >
                  Portfolio Intelligence Scorecard
                </Link>
              </li>
              <li>
                <Link
                  href="/werkwijze"
                  className="nav-link inline-flex items-center min-h-[44px]"
                >
                  Werkwijze
                </Link>
              </li>
              <li>
                <Link
                  href="/over"
                  className="nav-link inline-flex items-center min-h-[44px]"
                >
                  Over Wouter
                </Link>
              </li>
              <li>
                <Link
                  href="/factum-capital"
                  className="nav-link inline-flex items-center min-h-[44px]"
                >
                  Factum Capital
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="nav-link inline-flex items-center min-h-[44px]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p
              className="text-sm font-semibold mb-4 uppercase tracking-wide"
              style={{ color: 'var(--text-secondary)', fontFamily: "var(--font-inter), 'Inter', system-ui, sans-serif" }}
            >
              Juridisch
            </p>
            <ul
              className="flex flex-col gap-3 text-sm"
              style={{ color: 'var(--text-tertiary)' }}
            >
              <li>
                <Link
                  href="/privacy"
                  className="nav-link inline-flex items-center min-h-[44px]"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/voorwaarden"
                  className="nav-link inline-flex items-center min-h-[44px]"
                >
                  Voorwaarden
                </Link>
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
