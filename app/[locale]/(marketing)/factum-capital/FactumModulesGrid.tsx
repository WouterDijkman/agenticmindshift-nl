'use client';

import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const launchModules = [
  { n: '01', title: 'Financial DD', body: 'Quality of Earnings, werkkapitaalanalyse, netto schuld, cashflow en balansanalyse. De feitelijke basis voor elke overnameprijs.' },
  { n: '02', title: 'Commercial DD', body: 'Marktanalyse, klantanalyse, concurrentiepositie en business case. Toetst of de omzetaannames houdbaar zijn.' },
  { n: '03', title: 'AI Due Diligence', body: 'Kwantificeert het risico dat AI de kernactiviteit overneemt, per functiegroep en omzetstroom — vertaald naar impact op de overnameprijs.' },
  { n: '04', title: 'Legal', body: 'Corporate governance, contracten, geschillen, IP/data, arbeidsrecht en vastgoed. Vroegtijdige signalering van juridische dealbreakers.' },
  { n: '05', title: 'Tax', body: 'VPB, BTW, loonheffing, transfer pricing en fiscale structuur. Toetst historische compliance en structureert de transactie fiscaal.' },
  { n: '06', title: 'Valuation', body: 'DCF, trading multiples, transaction comps en synergie-waardering in een consistent football field. Onderbouwt de IC-beslissing.' },
  { n: '07', title: 'IC-Memo', body: 'Investment thesis, company & market, financial analysis, valuation en transaction structure. Klaar voor presentatie aan het Investment Committee.' },
  { n: '08', title: 'LBO-Model', body: 'Entry assumptions, capital structure, financial projections, debt schedule en returns analyse met sensitivity tabel.' },
  { n: '09', title: 'IBR', body: 'Cashflow reality check, liquiditeitsanalyse, business plan review, covenant analyse en going concern beoordeling.' },
  { n: '10', title: 'WHOA', body: 'Diagnose, crediteurenclassificatie, akkoordontwerp, waardering op recovery basis en homologatieprocedure.' },
  { n: '11', title: 'Vigil', body: 'Doorlopend portfolio monitoring: financiële prestaties, covenant monitoring, synergie-tracking en exit readiness per deelneming.' },
  { n: '12', title: 'Exit Readiness', body: 'Equity story, QoE readiness, governance, dataroom voorbereiding en CSRD/SFDR compliance voor een optimale verkoopklare positie.' },
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
          <h2 className="type-h2" style={{ marginBottom: '16px' }}>De modules bij livegang</h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '480px', lineHeight: 1.65 }}>
            De eerste reeks modules. Verdere uitbreiding volgt in H2 2026. Vroege deelnemers brengen mede de volgorde.
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
              <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 10px', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                {m.title}
              </p>
              <p style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)', color: 'var(--text-tertiary)', lineHeight: 1.7, margin: 0, flex: 1 }}>
                {m.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
