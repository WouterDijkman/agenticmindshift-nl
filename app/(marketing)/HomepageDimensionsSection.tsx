'use client';

import { motion } from 'framer-motion';

const dimensions = [
  { n: '01', title: 'Deal Velocity', body: 'Van IM naar IC-ready oordeel — en waar werkdagen verloren gaan in de deal-cyclus.' },
  { n: '02', title: 'Portfolio Intelligence', body: 'Doorlooptijd van uw MBR-cyclus en herleidbaarheid van variantie-analyses.' },
  { n: '03', title: 'Bias Detection', body: 'Aandeel oordeelsvorming op data versus persoonlijke relatie met management.' },
  { n: '04', title: 'AI Readiness', body: 'Weerbaarheid van uw portefeuille tegen AI-native concurrentie tijdens hold.' },
  { n: '05', title: 'Capacity Engineering', body: 'Mandaten die uw team laat liggen door operationele frictie in zoekwerk.' },
  { n: '06', title: 'Knowledge Retention', body: 'Mate waarin DD-kennis in-house blijft versus weggaat met externe rapporten.' },
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

const headingVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function HomepageDimensionsSection() {
  return (
    <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(80px, 11vw, 136px)' }}>
      <div className="container-medium">
        <motion.div
          style={{ marginBottom: '64px' }}
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="eyebrow" style={{ marginBottom: '16px' }}>Wat er gemeten wordt</p>
          <h2 className="type-h2" style={{ marginBottom: '16px' }}>De zes dimensies</h2>
          <p style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.0625rem, 1.6vw, 1.125rem)', color: 'var(--text-muted)', margin: 0, maxWidth: '440px', lineHeight: 1.65 }}>
            Elk gekozen op basis van waar in de praktijk rendement weglekt.
          </p>
        </motion.div>

        <motion.div
          className="dim-grid"
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
          viewport={{ once: true, amount: 0.15 }}
        >
          {dimensions.map((d) => (
            <motion.div
              key={d.n}
              className="dim-card"
              variants={itemVariants}
              style={{
                background: 'var(--bg-secondary)',
                padding: '32px 28px 36px',
                display: 'flex',
                flexDirection: 'column',
                borderLeft: '3px solid transparent',
                cursor: 'pointer',
              }}
              onClick={() => { window.location.href = '/scorecard'; }}
              whileHover={{
                borderLeftColor: 'var(--accent-cta)',
                backgroundColor: 'var(--bg-primary)',
                x: 2,
                transition: { duration: 0.2 },
              }}
            >
              <p
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '0.15em',
                  color: 'var(--accent-cta)',
                  margin: '0 0 14px',
                }}
              >
                {d.n}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                  fontSize: '1.0625rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  margin: '0 0 12px',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                }}
              >
                {d.title}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                  color: 'var(--text-tertiary)',
                  lineHeight: 1.7,
                  margin: 0,
                  flex: 1,
                }}
              >
                {d.body}
              </p>
              <p
                className="dim-card-cta"
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--accent-cta)',
                  margin: '16px 0 0',
                  fontWeight: 600,
                  opacity: 0,
                  transition: 'opacity 200ms ease',
                  letterSpacing: '0.02em',
                }}
              >
                Meet deze dimensie →
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
