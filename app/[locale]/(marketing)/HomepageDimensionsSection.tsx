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
import DimensionRadar from '@/components/DimensionRadar';

type SketchIconComponent = ComponentType<{ size?: number; color?: string; opacity?: number; strokeWidth?: number }>;

const dimensions: { n: string; title: string; body: string; Icon: SketchIconComponent }[] = [
  { n: '01', title: 'Doorlooptijd', body: 'Hoeveel werkdagen verliest uw team tussen IM-ontvangst en een beslissingsrijp oordeel?', Icon: SketchSpeed },
  { n: '02', title: 'Portefeuille-inzicht', body: 'Stuurt uw maandrapportage bij, of bevestigt ze achteraf wat u al vermoedde?', Icon: SketchPortfolio },
  { n: '03', title: 'Oordeelsvorming', body: 'Hoeveel van uw analyse is data en hoeveel is de relatie met management?', Icon: SketchScale },
  { n: '04', title: 'AI-bestendigheid', body: 'Kan een AI-gedreven concurrent de kernactiviteit van uw deelneming overnemen?', Icon: SketchChip },
  { n: '05', title: 'Teamcapaciteit', body: 'Hoeveel deals laat uw team liggen door handmatig zoekwerk en rapportage?', Icon: SketchGear },
  { n: '06', title: 'Kennisborging', body: 'Vertrekt uw associate? Verdwijnt dan ook het geheugen van drie tot vijf dossiers?', Icon: SketchKnowledge },
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
          className="dim-header-grid"
          style={{ marginBottom: '64px' }}
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>Zes dimensies</p>
            <h2 className="type-h2" style={{ marginBottom: '16px' }}>De zes plekken waar rendement weglekt.</h2>
            <p style={{ fontSize: 'clamp(1.0625rem, 1.6vw, 1.125rem)', color: 'var(--text-muted)', margin: 0, maxWidth: '440px', lineHeight: 1.65 }}>
              De Scorecard meet elk van deze dimensies en vergelijkt uw profiel met vergelijkbare partijen.
            </p>
          </div>
          <div className="dim-radar-wrap">
            <DimensionRadar />
            <div className="dim-radar-legend">
              <span className="dim-radar-legend-item">
                <span className="dim-radar-swatch" style={{ background: 'var(--accent-cta)' }} />
                Voorbeeldprofiel
              </span>
              <span className="dim-radar-legend-item">
                <span className="dim-radar-swatch dim-radar-swatch--peer" />
                Vergelijkbare partijen
              </span>
            </div>
          </div>
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
