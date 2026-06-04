'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import ScorecardReportMockup from '@/components/ScorecardReportMockup';

export default function HomepageShowcaseSection() {
  return (
    <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(72px, 10vw, 120px)' }}>
      <div className="container-medium">
        <div className="showcase-grid">
          {/* ── Left: copy ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow" style={{ marginBottom: '16px' }}>Het rapport</p>
            <h2 className="type-h2" style={{ marginBottom: '20px', maxWidth: '460px' }}>
              Geen losse score. Een rapport dat u intern kunt delen.
            </h2>
            <p
              style={{
                                fontSize: 'clamp(1.0625rem, 1.6vw, 1.1875rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                maxWidth: '440px',
                marginBottom: '28px',
              }}
            >
              Elke dimensie krijgt een score, afgezet tegen het niveau van vergelijkbare
              partijen. U ziet in één oogopslag waar u voorloopt en welke twee punten
              de meeste aandacht verdienen.
            </p>

            <ul className="showcase-checklist">
              {[
                'Zes dimensies, elk gebenchmarkt tegen vergelijkbare fondsen',
                'De twee aandachtspunten met de hoogste impact, uitgelicht',
                'Direct deelbaar in uw IC, zonder extra toelichting',
              ].map((t) => (
                <li key={t}>
                  <span aria-hidden="true" className="showcase-check">✓</span>
                  {t}
                </li>
              ))}
            </ul>

            <div style={{ marginTop: '32px' }}>
              <Button href="/scorecard" variant="primary" size="lg">
                Start de Scorecard
              </Button>
            </div>
          </motion.div>

          {/* ── Right: report mockup ── */}
          <motion.div
            className="showcase-mockup-wrap"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <ScorecardReportMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
