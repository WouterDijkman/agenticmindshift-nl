'use client';

import { motion } from 'framer-motion';

const cols = [
  {
    label: 'Geschikt voor',
    icon: '✓',
    iconColor: 'var(--status-success)',
    bg: 'var(--bg-primary)',
    items: [
      'PE-partners met 50–500M AUM',
      'M&A-directors met meerdere deals per jaar',
      "DGA's met een buy-and-build-strategie",
      'Restructuring-specialists met portfoliodossiers',
    ],
  },
  {
    label: 'Niet geschikt voor',
    icon: '×',
    iconColor: 'var(--text-muted)',
    bg: 'var(--bg-elevated)',
    items: [
      'Generieke consultants zonder dealervaring',
      'Startups zonder portfoliostructuur',
      'Retailbeleggers op zoek naar advies',
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const colVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function HomepageVoorWieSection() {
  return (
    <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(80px, 11vw, 136px)' }}>
      <div className="container-medium">
        <motion.div
          style={{ marginBottom: '56px' }}
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="eyebrow" style={{ marginBottom: '16px' }}>Geschiktheid</p>
          <h2 className="type-h2" style={{ margin: 0 }}>Voor wie is dit?</h2>
        </motion.div>

        <motion.div
          className="voor-wie-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1px',
            background: 'var(--border-subtle)',
            border: '1px solid var(--border-subtle)',
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {cols.map((col) => (
            <motion.div
              key={col.label}
              className="voor-wie-col"
              variants={colVariants}
              style={{ background: col.bg, padding: 'clamp(36px, 4vw, 52px)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
                <span
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                    fontSize: '1.375rem',
                    fontWeight: 700,
                    color: col.iconColor,
                    lineHeight: 1,
                  }}
                >
                  {col.icon}
                </span>
                <p
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: col.iconColor,
                    margin: 0,
                  }}
                >
                  {col.label}
                </p>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {col.items.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                      fontSize: 'clamp(1rem, 1.6vw, 1.125rem)',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      paddingBlock: '13px',
                      borderBottom: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                        color: col.iconColor,
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: '1px',
                        fontSize: '1.125rem',
                        lineHeight: 1,
                      }}
                    >
                      {col.icon}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
