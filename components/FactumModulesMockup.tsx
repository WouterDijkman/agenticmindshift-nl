type Col = { phase: string; modules: { label: string; hot?: boolean }[] };

const COLUMNS: Col[] = [
  {
    phase: 'Acquisitie',
    modules: [
      { label: 'IM-beoordeling' },
      { label: 'Marktscan' },
      { label: 'AI-kwetsbaarheid', hot: true },
      { label: 'Klantconcentratie' },
      { label: 'Management-assessment' },
    ],
  },
  {
    phase: 'Financiering',
    modules: [
      { label: 'Sources & Uses' },
      { label: 'DSCR-model' },
      { label: 'Sensitiviteit' },
      { label: 'Bancaire indiening' },
    ],
  },
  {
    phase: 'Portefeuille',
    modules: [
      { label: 'Maandrapportage-laag', hot: true },
      { label: 'KPI-tracking' },
      { label: 'Variantie-analyse' },
      { label: 'Capaciteitsplanner' },
      { label: 'Early-warning' },
    ],
  },
  {
    phase: 'Exit & kennis',
    modules: [
      { label: 'Verkoopdossier' },
      { label: 'Vendor DD' },
      { label: 'Waarderingsbrug' },
      { label: 'Koperslijst' },
      { label: 'Dossiergeheugen', hot: true },
    ],
  },
];

export default function FactumModulesMockup() {
  return (
    <div className="factum-modules-card">
      {/* window bar */}
      <div className="showcase-card-bar">
        <span className="showcase-dot" style={{ background: '#E0654B' }} />
        <span className="showcase-dot" style={{ background: '#E8B23E' }} />
        <span className="showcase-dot" style={{ background: '#5BA06B' }} />
        <span className="showcase-card-bar-label">Factum Capital · Platform</span>
      </div>

      <div className="factum-modules-body">
        <div className="factum-modules-grid">
          {COLUMNS.map((col) => (
            <div key={col.phase} className="factum-mod-col">
              <p className="factum-mod-phase">{col.phase}</p>
              {col.modules.map((m) => (
                <span
                  key={m.label}
                  className={`factum-mod-chip${m.hot ? ' factum-mod-chip--hot' : ''}`}
                >
                  {m.label}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="factum-modules-foot">
          <span>
            <strong style={{ color: 'var(--accent-cta)' }}>23 modules</strong> · 4 dealfasen
          </span>
          <span>SaaS · lancering 1 juli 2026</span>
        </div>
      </div>
    </div>
  );
}
