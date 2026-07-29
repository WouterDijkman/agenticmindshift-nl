'use client';

import { useTranslations } from 'next-intl';

export default function FactumModulesMockup() {
  const t = useTranslations('homepage.factum');

  const COLUMNS = [
    {
      phase: t('mockup_phase_acquisition'),
      modules: [
        { label: 'Financial DD' },
        { label: 'Commercial DD' },
        { label: 'AI Due Diligence', hot: true },
        { label: 'Legal' },
        { label: 'IC-Memo' },
      ],
    },
    {
      phase: t('mockup_phase_financing'),
      modules: [
        { label: 'LBO-Model' },
        { label: 'Fin-Memo' },
        { label: 'Structuring' },
        { label: 'Deal Economics' },
      ],
    },
    {
      phase: t('mockup_phase_portfolio'),
      modules: [
        { label: 'Vigil', hot: true },
        { label: 'MBR' },
        { label: 'Portfolio Health' },
        { label: 'PMI' },
      ],
    },
    {
      phase: t('mockup_phase_ibr'),
      modules: [
        { label: 'IBR' },
        { label: 'WHOA' },
        { label: t('mockup_module_boedelonderzoek') },
        { label: 'Tax' },
      ],
    },
  ];

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
          <span>{t('mockup_footer_left')}</span>
          <span>{t('mockup_footer_right')}</span>
        </div>
      </div>
    </div>
  );
}
