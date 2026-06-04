'use client';

import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    n: '01',
    title: 'Scorecard of sparring',
    body: 'U vult de Scorecard in (12 min) of plant een sparring-sessie van twintig minuten. Geen voorbereiding nodig: het gesprek of rapport brengt de relevante punten vanzelf naar boven.',
  },
  {
    n: '02',
    title: 'Intake en voorstel',
    body: 'Op basis van uw scoreprofiel of het gesprek ontvangt u binnen twee werkdagen een concreet trajectvoorstel: scope, doorlooptijd, tarief en beoogd resultaat. Geen open einden.',
  },
  {
    n: '03',
    title: 'Start binnen een week',
    body: 'Na akkoord starten wij binnen zeven dagen. U ontvangt direct de eerste deliverable of wordt ingepland voor de eerste sessie. Geen wachttijd.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.56, ease } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export default function WerkwijzeOnboardingSteps() {
  return (
    <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(56px, 7vw, 88px)' }}>
      <div className="container-medium">
        <motion.div
          style={{ marginBottom: '44px' }}
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="eyebrow" style={{ marginBottom: '12px' }}>Van interesse naar samenwerking</p>
          <h2 className="type-h2" style={{ marginBottom: '12px' }}>Drie stappen</h2>
          <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '400px' }}>
            Geen langdurige selectietrajecten. Van eerste contact tot lopende samenwerking duurt doorgaans twee weken.
          </p>
        </motion.div>

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
          {steps.map((s) => (
            <motion.div
              key={s.n}
              className="step-card"
              variants={itemVariants}
              style={{
                background: 'var(--bg-secondary)',
                padding: 'clamp(32px, 4vw, 48px)',
                borderTop: '3px solid transparent',
              }}
              whileHover={{ borderTopColor: 'var(--accent-cta)', transition: { duration: 0.2 } }}
            >
              <p style={{
                                fontSize: 'clamp(44px, 6vw, 64px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
                color: 'var(--accent-cta)',
                marginBottom: '24px',
                opacity: 0.9,
              }}>
                {s.n}
              </p>
              <p style={{
                                fontSize: '1.0625rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '12px',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}>
                {s.title}
              </p>
              <p style={{ fontSize: 'clamp(1rem, 1.6vw, 1.125rem)', color: 'var(--text-secondary)', lineHeight: 1.75, margin: 0 }}>
                {s.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
