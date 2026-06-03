'use client';

import { motion } from 'framer-motion';
import type { ComponentType } from 'react';
import {
  SketchSpeed,
  SketchPortfolio,
  SketchScale,
  SketchChip,
  SketchGear,
  SketchKnowledge,
} from '@/components/icons/SketchIcons';

type SketchIconComponent = ComponentType<{ size?: number; color?: string; opacity?: number; strokeWidth?: number }>;

const dimensions: { n: string; title: string; body: string; Icon: SketchIconComponent }[] = [
  { n: '01', title: 'Deal Velocity', body: 'Hoeveel werkdagen verliest uw team tussen IM-ontvangst en IC-ready oordeel?', Icon: SketchSpeed },
  { n: '02', title: 'Portfolio Intelligence', body: 'Stuurt uw MBR-cyclus bij — of bevestigt hij achteraf wat u al vermoedde?', Icon: SketchPortfolio },
  { n: '03', title: 'Bias Detection', body: 'Hoeveel van uw oordeelsvorming is data — en hoeveel is relatie met management?', Icon: SketchScale },
  { n: '04', title: 'AI Readiness', body: 'Kan een AI-native concurrent de kernactiviteit van uw portfoliobedrijf overnemen?', Icon: SketchChip },
  { n: '05', title: 'Capacity Engineering', body: 'Hoeveel mandaten laat uw team liggen door operationele frictie in zoekwerk?', Icon: SketchGear },
  { n: '06', title: 'Knowledge Retention', body: 'Vertrekt uw associate — verdwijnt dan ook het geheugen van drie tot vijf dossiers?', Icon: SketchKnowledge },
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
          <p className="eyebrow" style={{ marginBottom: '16px' }}>Zes dimensies</p>
          <h2 className="type-h2" style={{ marginBottom: '16px' }}>De zes plekken waar rendement weglekt.</h2>
          <p style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.0625rem, 1.6vw, 1.125rem)', color: 'var(--text-muted)', margin: 0, maxWidth: '440px', lineHeight: 1.65 }}>
            De Scorecard meet elk van deze dimensies en vergelijkt uw profiel met peers.
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
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  margin: '0 0 14px',
                  color: 'var(--accent-cta)',
                }}
              >
                <div style={{ opacity: 0.82 }}>
                  <d.Icon size={36} strokeWidth={1.4} />
                </div>
                <p
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    letterSpacing: '0.15em',
                    color: 'var(--accent-cta)',
                    margin: 0,
                  }}
                >
                  {d.n}
                </p>
              </div>
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
