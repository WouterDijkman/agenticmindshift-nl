'use client';

import { motion } from 'framer-motion';
import type { ComponentType } from 'react';
import { SketchClipboard, SketchReport, SketchArrow } from '@/components/icons/SketchIcons';

type SketchIconComponent = ComponentType<{ size?: number; color?: string; opacity?: number; strokeWidth?: number }>;

const steps: { n: string; title: string; body: string; Icon: SketchIconComponent }[] = [
  {
    n: '01',
    title: 'Beantwoord 15 vragen',
    body: 'Multiple choice over uw dealproces, maandrapportage, AI-bestendigheid en kennisborging. Twaalf minuten. Geen open velden.',
    Icon: SketchClipboard,
  },
  {
    n: '02',
    title: 'Ontvang uw rapport',
    body: 'Score op zes dimensies, twee prioritaire aandachtspunten en een concreet vervolgvoorstel — direct na afronding.',
    Icon: SketchReport,
  },
  {
    n: '03',
    title: 'Bepaal uw volgende stap',
    body: 'Intern delen, een sparring-sessie inplannen of direct een traject starten. Geen verplichtingen. U bepaalt het tempo.',
    Icon: SketchArrow,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function HomepageStepsSection() {
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
          <p className="eyebrow" style={{ marginBottom: '16px' }}>Zo werkt het</p>
          <h2 className="type-h2" style={{ margin: 0, maxWidth: '480px' }}>
            De Quickscan Methode: drie stappen, twaalf minuten.
          </h2>
        </motion.div>

        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1px',
            background: 'var(--border-subtle)',
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((s) => (
            <motion.div
              key={s.n}
              className="step-card"
              variants={itemVariants}
              style={{
                background: 'var(--bg-secondary)',
                padding: 'clamp(36px, 4vw, 52px)',
                borderTop: '3px solid transparent',
              }}
              whileHover={{
                borderTopColor: 'var(--accent-cta)',
                transition: { duration: 0.2 },
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '20px',
                  marginBottom: '32px',
                }}
              >
                <div style={{ color: 'var(--accent-cta)', opacity: 0.78, flexShrink: 0 }}>
                  <s.Icon size={56} strokeWidth={1.4} />
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(40px, 5vw, 56px)',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    lineHeight: 0.9,
                    color: 'var(--accent-cta)',
                    margin: 0,
                    opacity: 0.6,
                  }}
                >
                  {s.n}
                </p>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                  marginBottom: '14px',
                  lineHeight: 1.2,
                }}
              >
                {s.title}
              </h3>
              <p style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1rem, 1.6vw, 1.125rem)', color: 'var(--text-tertiary)', lineHeight: 1.7, margin: 0 }}>
                {s.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
