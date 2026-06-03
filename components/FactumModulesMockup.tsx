type Col = { phase: string; modules: { label: string; hot?: boolean }[] };

const COLUMNS: Col[] = [
  {
    phase: 'Acquisitie',
    modules: [
      { label: 'IM-screener' },
      { label: 'Financial DD' },
      { label: 'Commercial DD' },
      { label: 'AI Due Diligence', hot: true },
      { label: 'IC Memorandum' },
    ],
  },
  {
    phase: 'Financiering',
    modules: [
      { label: 'LBO Modeler' },
      { label: 'Financing Memo' },
      { label: 'Capital Structuring' },
      { label: 'Deal Economics' },
    ],
  },
  {
    phase: 'Portfolio review',
    modules: [
      { label: 'Portfolio Health' },
      { label: 'Monthly Business Review', hot: true },
      { label: 'Value Creation Engine' },
      { label: 'Post-Merger Integration' },
    ],
  },
  {
    phase: 'Pre-IBR/WHOA',
    modules: [
      { label: 'Independent Business Review' },
      { label: 'WHOA Restructuring' },
      { label: 'Boedelonderzoek' },
      { label: 'Restructuring Triage', hot: true },
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
