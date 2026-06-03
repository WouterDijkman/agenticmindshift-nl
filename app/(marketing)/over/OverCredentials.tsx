'use client';

import { motion } from 'framer-motion';

const CREDS: { value: string; label: string; sub: string }[] = [
  { value: '6 jaar', label: 'Deal-ervaring', sub: 'Acquisition finance & financial restructuring' },
  { value: 'Twee kanten', label: 'Van de deal-tafel', sub: 'Financiering én herstructurering meegemaakt' },
  { value: '€1–25M', label: 'Mid-market focus', sub: 'Nederlandse PE- en M&A-dealgrootte' },
  { value: '23 modules', label: 'Eigen AI-platform', sub: 'Factum Capital — lancering 1 juli 2026' },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function OverCredentials() {
  return (
    <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(56px, 7vw, 88px)' }}>
      <div className="container-medium">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '40px' }}
        >
          <p className="eyebrow" style={{ marginBottom: '16px' }}>Waarom Wouter</p>
          <h2 className="type-h2" style={{ margin: 0, maxWidth: '520px' }}>
            Geen AI-generalist met toevallig PE-klanten.
          </h2>
        </motion.div>

        <motion.div
          className="cred-grid"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {CREDS.map((c) => (
            <motion.div key={c.label} className="cred-card" variants={item}>
              <p className="cred-value">{c.value}</p>
              <p className="cred-label">{c.label}</p>
              <p className="cred-sub">{c.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
