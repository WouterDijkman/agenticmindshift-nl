import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '/scorecard', label: 'Scorecard' },
  { href: '/werkwijze', label: 'Werkwijze' },
  { href: '/over', label: 'Over Wouter' },
  { href: '/factum-capital', label: 'Factum Capital' },
  { href: '/contact', label: 'Contact' },
];

const legalLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/voorwaarden', label: 'Voorwaarden' },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-elevated)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container-extra" style={{ paddingBlock: 'clamp(56px, 7vw, 88px)' }}>
        <div className="footer-grid">
          {/* Brand block */}
          <div className="footer-brand">
            <Image
              src="/logo.png"
              alt="Agentic Mindshift"
              width={2448}
              height={1632}
              style={{ height: '52px', width: 'auto', marginBottom: '20px' }}
            />
            <p
              style={{
                                fontSize: '1.0625rem',
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                margin: 0,
                maxWidth: '320px',
              }}
            >
              AI‑advies voor Nederlandse PE‑ en M&amp;A‑firma&apos;s. Concreet, vertrouwelijk, meetbaar.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '22px', flexWrap: 'wrap' }}>
              <a
                href="mailto:wouter@agenticmindshift.nl"
                className="footer-pill"
              >
                E-mail Wouter
              </a>
              <a
                href="https://www.linkedin.com/in/wwdijkman"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-pill"
              >
                LinkedIn →
              </a>
            </div>
          </div>

          {/* Navigatie */}
          <div>
            <p className="footer-heading">Navigatie</p>
            <ul className="footer-list">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Juridisch */}
          <div>
            <p className="footer-heading">Juridisch</p>
            <ul className="footer-list">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA card */}
          <div className="footer-cta-card">
            <p className="footer-cta-title">Klaar om uw blinde vlekken te zien?</p>
            <p className="footer-cta-sub">Vijftien vragen. Twaalf minuten. Geen account.</p>
            <Link href="/scorecard" className="footer-cta-button">
              Start de Scorecard
              <span aria-hidden="true">&nbsp;→</span>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p style={{ margin: 0 }}>&copy; 2026 Agentic Mindshift — opgericht oktober 2025.</p>
          <p style={{ margin: 0 }}>Founder Factum Capital · lancering 1 juli 2026</p>
        </div>
      </div>
    </footer>
  );
}
