'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

const ease = [0.22, 1, 0.36, 1] as const;

const headingVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease } },
};

const tweeKanten = [
  {
    label: 'Vanuit restructuring',
    body: 'Drie jaar lang aannames toetsen op portefeuilles in stress leert u precies waar managementrapportages tekort schieten. Waar de MBR-cyclus onderprestatie maskeert in plaats van signaleert. Waar de aanname die niet werd uitgedaagd uiteindelijk de deal duurder maakte.',
  },
  {
    label: 'Vanuit acquisition finance',
    body: 'Twee jaar lang LBO-structurering aan de financierende kant leert u hoe een bank naar een deal kijkt — en waarom de aannames die in een IC-rapport staan soms heel anders uitpakken in de post-closing realiteit. Die blik is zeldzaam aan de PE-kant van de tafel.',
  },
  {
    label: 'Vertaald naar AI',
    body: 'Het executive AI-programma aan Nyenrode bracht de verbinding. De vraag is niet of AI uw portefeuille raakt — de vraag is wanneer, in welke dimensie, en of u het ziet voordat het in de jaarcijfers staat. Dat is precies wat de scorecard en de trajecten meten.',
  },
];

const hoeIkWerk = [
  {
    n: '01',
    title: 'AI Sparring Sessie',
    body: 'U wilt snel weten wat AI betekent voor uw bedrijf, uw deal of uw eerstvolgende beslissing. Eén gesprek, één samenvatting, geen vervolgverplichting.',
    price: 'Vanaf €395',
  },
  {
    n: '02',
    title: 'Consultancy, Workflow & Enablement',
    body: 'U wilt AI concreet inzetten in uw processen, workflows of organisatie — met implementatie-begeleiding, masterclasses en team-enablement.',
    price: 'Vanaf €4.500',
  },
  {
    n: '03',
    title: 'Fractional AI Officer',
    body: 'U wilt een AI-leider op MT-niveau zonder fulltime aanstelling. Strategie, leveranciersselectie en team-enablement geborgd in een embedded rol.',
    price: '€3.500 – €5.500 / maand',
  },
  {
    n: '04',
    title: 'AI Due Diligence & Portfolio',
    body: 'U doet M&A-deals of beheert een portfolio en wilt AI-substitutierisico structureel borgen — losse deal vanaf €10.000, of volumetarieven en portfolio-retainer.',
    price: 'Vanaf €10.000 / deal',
  },
];

export function TweeKantenGrid() {
  return (
    <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(56px, 7vw, 88px)' }}>
      <div className="container-medium">
        <motion.div
          style={{ marginBottom: '44px' }}
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="eyebrow" style={{ marginBottom: '12px' }}>Wat dit voor u betekent</p>
          <h2 className="type-h2" style={{ maxWidth: '520px' }}>
            Twee kanten van de deal-tafel. &Eacute;&eacute;n adviseur.
          </h2>
        </motion.div>
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1px',
            background: 'var(--border-subtle)',
            border: '1px solid var(--border-subtle)',
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {tweeKanten.map((item) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              style={{ background: 'var(--bg-primary)', padding: 'clamp(32px, 4vw, 48px)' }}
            >
              <p style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-cta)', marginBottom: '16px' }}>
                {item.label}
              </p>
              <p style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1rem, 1.6vw, 1.125rem)', color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0 }}>
                {item.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function HoeIkWerkGrid() {
  return (
    <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
      <div className="container-medium">
        <motion.div
          style={{ marginBottom: '56px' }}
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="eyebrow" style={{ marginBottom: '16px' }}>Werkwijze</p>
          <h2 className="type-h2" style={{ marginBottom: '16px' }}>Vier manieren om samen te werken</h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '440px', lineHeight: 1.65 }}>
            Geen retainer-constructies zonder concreet doel. Elk traject begint met een meetbare nulmeting.
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
          viewport={{ once: true, amount: 0.15 }}
        >
          {hoeIkWerk.map((b) => (
            <motion.div
              key={b.n}
              className="dim-card"
              variants={itemVariants}
              style={{ background: 'var(--bg-secondary)', padding: '32px 28px 36px', display: 'flex', flexDirection: 'column', borderLeft: '3px solid transparent' }}
              whileHover={{ borderLeftColor: 'var(--accent-cta)', backgroundColor: 'var(--bg-primary)', transition: { duration: 0.2 } }}
            >
              <p style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif", fontSize: 'clamp(48px, 6vw, 68px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.9, color: 'var(--accent-cta)', marginBottom: '28px', opacity: 0.9 }}>
                {b.n}
              </p>
              <p style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif", fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                {b.title}
              </p>
              <p style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)', color: 'var(--text-tertiary)', lineHeight: 1.7, flex: 1, margin: 0 }}>
                {b.body}
              </p>
              <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '20px', letterSpacing: '0.03em' }}>
                {b.price}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button href="/werkwijze" variant="secondary" size="md">
            Lees meer over tarieven en onboarding →
          </Button>
        </div>
      </div>
    </section>
  );
}
