import type { Metadata } from 'next';
import EarlyAccessForm from './EarlyAccessForm';

export const metadata: Metadata = {
  title: 'Factum Capital — Lancering 1 juli 2026',
  description:
    'Het Agentic M&A- en Restructuring Operating System. Lancering 1 juli 2026.',
};

export default function FactumCapitalPage() {
  return (
    <>
      <section className="container-medium pt-20 pb-10">
        <p
          className="text-xs uppercase mb-5"
          style={{ color: 'var(--accent-cta)', letterSpacing: '0.22em' }}
        >
          Lancering 1 juli 2026
        </p>
        <h1 className="h-display mb-6">Factum Capital</h1>
        <p
          className="text-xl sm:text-2xl mb-10 measure"
          style={{ color: 'var(--text-secondary)' }}
        >
          Het Agentic M&amp;A- en Restructuring Operating System.
        </p>
        <div
          className="flex flex-col gap-5 text-lg measure"
          style={{ color: 'var(--text-tertiary)' }}
        >
          <p>
            Factum Capital is een operating system, geen tool. Drieentwintig modules die
            samen de M&amp;A- en restructuring-praktijk van een Nederlandse PE-firma
            instrumenteren: van Information-Memorandum-screening tot IC-rapportage, van
            MBR-cyclus tot exit-voorbereiding, en van AI-substitutie-modellering tot
            bias-toetsing.
          </p>
          <p>
            Het systeem is gebouwd vanuit de Nederlandse bancaire context. De vocabulaire,
            de regelgeving en de financieringsstructuren sluiten aan op de praktijk van
            Acquisition Finance en Restructuring zoals die binnen Nederlandse grootbanken
            wordt gevoerd. Geen Amerikaans framework dat half wordt vertaald.
          </p>
          <p>
            Op 1 juli 2026 lanceren we de eerste twaalf modules; de overige elf volgen in
            de zes maanden daarna. Vroege deelnemers krijgen op maat input op de roadmap
            en voorrang op exclusieve onboarding-trajecten. De wachtlijst is bewust beperkt
            om kwaliteit van onboarding te kunnen blijven leveren.
          </p>
        </div>
      </section>

      <section
        className="py-16"
        style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}
      >
        <div className="container-narrow">
          <h2 className="h-2 mb-3">Vroege toegang</h2>
          <p className="mb-8 measure" style={{ color: 'var(--text-tertiary)' }}>
            Vul onderstaande gegevens in als u op de hoogte wilt worden gehouden of in
            aanmerking wilt komen voor het early-access-traject. Geen vervolgmails buiten
            de Factum Capital-roadmap om.
          </p>
          <EarlyAccessForm />
        </div>
      </section>
    </>
  );
}
