'use client';

import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const launchModules = [
  { n: '01', title: 'IM-Screener', body: 'Gestructureerde analyse van het Information Memorandum op consistentie, aannames en rode vlaggen.' },
  { n: '02', title: 'Management Bias Checker', body: 'Toetsing van managementpresentaties op selectieve framing, ontbrekende tegenargumenten en wishful-thinking-patronen.' },
  { n: '03', title: 'AI-Kwetsbaarheidsmodel', body: 'Kwantificeert het risico dat AI de kernactiviteit overneemt, per functiegroep en omzetstroom, vertaald naar impact op de overnameprijs.' },
  { n: '04', title: 'Sensitiviteitsmatrix', body: "Geautomatiseerde gevoeligheidsanalyse op EBITDA-marge, omzetgroei en financieringsscenario's voor de IC-beslissing." },
  { n: '05', title: 'Maandrapportage-laag', body: 'Structureert de maandelijkse bestuursrapportage op zes dimensies; signaleert afwijkingen automatisch.' },
  { n: '06', title: 'DD-Kennisbank', body: 'Centraliseert DD-bevindingen per portfolio-bedrijf zodat institutionele kennis in-house blijft na personele wisseling.' },
  { n: '07', title: 'Restructuring Triage', body: 'Diagnostisch framework voor portefeuilles in stress: urgent/niet-urgent, financieel/operationeel, inside/outside court.' },
  { n: '08', title: 'IC-Rapportage Generator', body: 'Brengt deal-data naar een consistent IC-rapportageformat met gestandaardiseerde risicoparagraaf.' },
  { n: '09', title: 'Portfolio Health Monitor', body: 'Doorlopend dashboard over alle deelnemingen met peer-benchmark per sector en automatische trend-detectie.' },
  { n: '10', title: 'Capaciteitsplanner', body: 'Inzicht in deals die blijven liggen door handmatig zoekwerk. Prioriteert de inzet van uw team op rendement.' },
  { n: '11', title: 'Exit Readiness Checker', body: 'Toetst een portfoliobedrijf op de zes meest kritische exit-obstakels: governance, data-room, management-continuïteit.' },
  { n: '12', title: 'Compliance Radar', body: 'Monitort relevante Nederlandse en EU-regelgeving op impact voor M&A-transacties en bestaande portefeuille.' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export default function FactumModulesGrid() {
  return (
    <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
      <div className="container-medium">
        <motion.div
          style={{ marginBottom: '56px' }}
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="eyebrow" style={{ marginBottom: '16px' }}>Lancering 1 juli 2026</p>
          <h2 className="type-h2" style={{ marginBottom: '16px' }}>De twaalf modules bij livegang</h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '480px', lineHeight: 1.65 }}>
            Modules 13 t/m 23 volgen in H2 2026. Vroege deelnemers brengen mede de volgorde.
          </p>
        </motion.div>

        <motion.div
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
          viewport={{ once: true, amount: 0.1 }}
        >
          {launchModules.map((m) => (
            <motion.div
              key={m.n}
              className="dim-card"
              variants={itemVariants}
              style={{
                background: 'var(--bg-primary)',
                padding: '28px 24px 32px',
                display: 'flex',
                flexDirection: 'column',
                borderLeft: '3px solid transparent',
              }}
              whileHover={{
                borderLeftColor: 'var(--accent-cta)',
                backgroundColor: 'var(--bg-secondary)',
                transition: { duration: 0.18 },
              }}
            >
              <p style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.15em', color: 'var(--accent-cta)', margin: '0 0 12px' }}>
                {m.n}
              </p>
              <p style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif", fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 10px', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                {m.title}
              </p>
              <p style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)', color: 'var(--text-tertiary)', lineHeight: 1.7, margin: 0, flex: 1 }}>
                {m.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
