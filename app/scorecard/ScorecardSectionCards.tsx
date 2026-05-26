'use client';

import { motion } from 'framer-motion';

const sections = [
  { n: '01', title: 'Uw analytische aanpak vandaag', q: '4 vragen' },
  { n: '02', title: 'Uw deal- en analysecyclus', q: '3 vragen' },
  { n: '03', title: 'Portefeuille, financiering en monitoring', q: '4 vragen' },
  { n: '04', title: 'Uw team en kennis', q: '4 vragen' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function ScorecardSectionCards() {
  return (
    <motion.div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1px',
        background: 'var(--border-subtle)',
        border: '1px solid var(--border-subtle)',
      }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {sections.map((s) => (
        <motion.div
          key={s.n}
          variants={itemVariants}
          style={{
            background: 'var(--bg-secondary)',
            padding: '28px 24px 32px',
            borderTop: '3px solid transparent',
            transition: 'border-top-color 200ms ease',
          }}
          whileHover={{ borderTopColor: 'var(--accent-cta)', transition: { duration: 0.2 } }}
        >
          <p
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
              fontSize: 'clamp(40px, 5vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              color: 'var(--accent-cta)',
              marginBottom: '20px',
              opacity: 0.85,
            }}
          >
            {s.n}
          </p>
          <p
            style={{
              fontSize: '0.9375rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '6px',
              lineHeight: 1.3,
            }}
          >
            {s.title}
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{s.q}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
