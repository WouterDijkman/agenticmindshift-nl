'use client';

import CountUpNumber from '@/components/motion/CountUpNumber';
import { motion } from 'framer-motion';
import SketchCrosshair from '@/components/icons/SketchCrosshair';

const stats = [
  {
    value: 0.5,
    decimals: 1,
    suffix: '×',
    label: 'EBITDA-multiple',
    sub: 'potentieel rendementsverlies per portfoliobedrijf — onzichtbaar zonder gerichte meting',
  },
  {
    value: 3,
    decimals: 0,
    suffix: '',
    label: 'werkdagen',
    sub: 'die een dealteam per MBR-cyclus kwijt is aan handmatige dataconsolidatie',
  },
  {
    value: 12,
    decimals: 0,
    suffix: '',
    label: 'minuten',
    sub: 'om zes dimensies van uw portefeuille te meten, scoren en te benchmarken',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function HomepageStatsSection() {
  return (
    <section style={{ background: 'var(--bg-secondary)' }}>
      <div className="container-wide">
        <motion.div
          className="stats-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              style={{
                padding: 'clamp(40px, 5vw, 72px) clamp(28px, 4vw, 56px)',
                borderRight: i < 2 ? '1px solid var(--border-subtle)' : 'none',
                borderTop: i === 0 ? '3px solid var(--accent-cta)' : '3px solid var(--border-medium)',
              }}
            >
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
                <div style={{
                  position: 'absolute',
                  right: '-20px',
                  top: '-16px',
                  pointerEvents: 'none',
                  opacity: 0.04,
                }}>
                  <SketchCrosshair size={72} color="var(--text-primary)" strokeWidth={1} />
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(56px, 8vw, 100px)',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    lineHeight: 0.9,
                    color: 'var(--accent-cta)',
                    position: 'relative',
                  }}
                >
                  <CountUpNumber
                    value={s.value}
                    decimals={s.decimals}
                    suffix={s.suffix}
                    duration={1100}
                  />
                </p>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-ui, 'Inter', system-ui, sans-serif)",
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                {s.label}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                  fontStyle: 'italic',
                  color: 'var(--text-muted)',
                  lineHeight: 1.65,
                  maxWidth: '260px',
                  margin: 0,
                }}
              >
                {s.sub}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
