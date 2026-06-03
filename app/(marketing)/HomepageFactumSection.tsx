'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const TRACKS = [
  {
    tag: 'Deal-doer · PE / Family office / DGA',
    n: '01',
    title: 'Laat het voor u doen.',
    body: 'Wij leveren het volledige AI Due Diligence & Portfolio-traject op uw dossier. De scorecard bepaalt welk moment als eerste relevant is.',
    detail: 'Vanaf €10.000 per deal · of €6.500–€8.500/mnd portfolio-intelligence · excl. btw',
    cta: { label: 'Start de Scorecard', href: '/scorecard', variant: 'primary' as const },
    ctaSub: '12 minuten · direct uw profiel',
  },
  {
    tag: 'Adviseur · RA / RB / M&A-professional',
    n: '02',
    title: 'Werk zelf met het platform.',
    body: 'Factum Capital: 23 modules voor uw eigen deal-team. Van IM-screening tot exit-readiness. SaaS vanaf 1 juli 2026 — vroege toegang is nu open.',
    detail: 'SaaS · maandabonnement · vroeg-toegangstarief bij lancering',
    cta: { label: 'Factum Capital vroege toegang', href: '/factum-capital', variant: 'secondary' as const },
    ctaSub: 'Lancering 1 juli 2026',
  },
];

export default function HomepageFactumSection() {
  return (
    <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(80px, 11vw, 136px)' }}>
      <div className="container-medium">
        {/* Heading */}
        <motion.div
          style={{ marginBottom: '56px' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow" style={{ marginBottom: '16px' }}>Twee routes</p>
          <h2 className="type-h2" style={{ maxWidth: '560px', margin: 0 }}>
            Kies hoe u het probleem oplost.
          </h2>
        </motion.div>

        {/* Two-track grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1px',
            background: 'var(--border-subtle)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '48px',
          }}
        >
          {TRACKS.map((t, i) => (
            <motion.div
              key={t.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.58, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: 'var(--bg-secondary)',
                padding: 'clamp(36px, 4.5vw, 56px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
              }}
            >
              {/* Tag */}
              <p
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-cta)',
                  marginBottom: '24px',
                  opacity: 0.8,
                }}
              >
                {t.tag}
              </p>

              {/* Number */}
              <p
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(52px, 6vw, 72px)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.9,
                  color: 'var(--accent-cta)',
                  marginBottom: '28px',
                  opacity: 0.9,
                }}
              >
                {t.n}
              </p>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(1.25rem, 2.2vw, 1.625rem)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  marginBottom: '20px',
                }}
              >
                {t.title}
              </h3>

              {/* Body */}
              <p
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(1rem, 1.6vw, 1.125rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.75,
                  marginBottom: '28px',
                  flexGrow: 1,
                }}
              >
                {t.body}
              </p>

              {/* Detail */}
              <p
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.03em',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '20px',
                  marginBottom: '24px',
                }}
              >
                {t.detail}
              </p>

              {/* CTA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                <Button href={t.cta.href} variant={t.cta.variant} size="md">
                  {t.cta.label}
                </Button>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                    fontSize: '0.9375rem',
                    fontStyle: 'italic',
                    color: 'var(--text-muted)',
                    margin: 0,
                  }}
                >
                  {t.ctaSub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Factum platform attribution */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center' }}
        >
          <Link
            href="/factum-capital"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 20px',
              border: '1px solid var(--border-medium)',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.8125rem',
              fontWeight: 500,
              letterSpacing: '0.02em',
              transition: 'border-color 180ms ease, color 180ms ease',
            }}
          >
            <span
              style={{
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--accent-cta)',
              }}
            >
              POWERED BY
            </span>
            <span
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                fontWeight: 700,
                color: 'var(--text-primary)',
                fontSize: '0.9375rem',
              }}
            >
              Factum Capital
            </span>
            <span style={{ color: 'var(--accent-cta)', fontSize: '0.875rem' }}>→</span>
          </Link>
          <p
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontSize: '0.9375rem',
              fontStyle: 'italic',
              color: 'var(--text-muted)',
              marginTop: '10px',
            }}
          >
            Het AI-platform achter de AI Due Diligence &amp; Portfolio-dienstverlening · lancering 1 juli 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}
