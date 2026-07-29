'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { type GeneratedReport } from '@/lib/report/types';

interface ReportDeepAnalysisProps {
  leadId: string;
}

type Status = 'idle' | 'loading' | 'done' | 'error' | 'no_lead';

const PRIORITY_COLORS: Record<string, string> = {
  critical: '#F14C1D',
  attention: '#E8B23E',
  adequate: 'var(--text-secondary)',
  strong: '#5BA06B',
};

const PRIORITY_SYMBOLS: Record<string, string> = {
  critical: '⚡',
  attention: '◆',
  adequate: '○',
  strong: '✓',
};

export default function ReportDeepAnalysis({ leadId }: ReportDeepAnalysisProps) {
  const t = useTranslations('scorecard.rapport');
  const td = useTranslations('scorecard.rapport.deep');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');
  const [report, setReport] = useState<GeneratedReport | null>(null);
  const [error, setError] = useState<string>('');

  const generate = useCallback(async () => {
    if (!leadId) return;
    setStatus('loading');
    setError('');

    try {
      const res = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (res.status === 404) {
          setStatus('no_lead');
          return;
        }
        throw new Error(data.message ?? `HTTP ${res.status}`);
      }

      const data = await res.json();
      setReport(data.report);
      setStatus('done');
    } catch (err) {
      console.error('[ReportDeepAnalysis] error', err);
      setError(err instanceof Error ? err.message : 'Onbekende fout');
      setStatus('error');
    }
  }, [leadId]);

  useEffect(() => {
    if (leadId) {
      generate();
    }
  }, [leadId, generate]);

  // ── Loading state ──────────────────────────────────────────────────────────
  if (status === 'idle' || status === 'loading') {
    return (
      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          padding: '40px 32px',
          marginBottom: '48px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <div className="skeleton" style={{ width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0 }} />
          <div>
            <p className="eyebrow" style={{ marginBottom: '4px' }}>{td('loading_eyebrow')}</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', margin: 0 }}>
              {td('loading_body')}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[90, 70, 80, 65].map((w, i) => (
            <div key={i} className="skeleton" style={{ height: '14px', width: `${w}%`, borderRadius: '3px' }} />
          ))}
        </div>
      </div>
    );
  }

  // ── No lead / Supabase not configured ──────────────────────────────────────
  if (status === 'no_lead') {
    return (
      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          borderLeft: '3px solid var(--accent-cta)',
          padding: '24px 28px',
          marginBottom: '48px',
        }}
      >
        <p className="eyebrow" style={{ marginBottom: '8px' }}>{td('nolead_eyebrow')}</p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', margin: 0 }}>
          {td('nolead_body')}
        </p>
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (status === 'error') {
    return (
      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          borderLeft: '3px solid #E8B23E',
          padding: '24px 28px',
          marginBottom: '48px',
        }}
      >
        <p className="eyebrow" style={{ marginBottom: '8px' }}>{td('error_eyebrow')}</p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '16px' }}>
          {td('error_body')}
        </p>
        <button
          onClick={generate}
          className="btn btn-secondary"
          style={{ fontSize: '0.875rem' }}
        >
          {td('retry')}
        </button>
        {process.env.NODE_ENV === 'development' && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '8px', fontFamily: 'monospace' }}>
            {error}
          </p>
        )}
      </div>
    );
  }

  // ── Done — render het rapport ──────────────────────────────────────────────
  if (!report) return null;

  return (
    <div style={{ marginBottom: '48px' }}>
      <style>{`@media (max-width: 640px) { .roadmap-phase { grid-template-columns: 1fr !important; gap: 10px !important; } }`}</style>
      {/* Executive Summary */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          borderLeft: '3px solid var(--accent-cta)',
          padding: '28px 32px',
          marginBottom: '24px',
        }}
      >
        <p className="eyebrow" style={{ marginBottom: '10px' }}>{td('report_eyebrow')}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <span
            className="wb-card-chip"
            style={{
              position: 'static',
              color: report.scoreProfile?.profileLabel ? 'var(--accent-cta-ink)' : 'var(--text-muted)',
              fontSize: '0.75rem',
              letterSpacing: '0.06em',
              fontWeight: 800,
              textTransform: 'uppercase',
            }}
          >
            {report.scoreProfile?.profileLabel}
          </span>
          {report.urgency && (
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color:
                  report.urgency === 'high'
                    ? '#F14C1D'
                    : report.urgency === 'medium'
                    ? '#E8B23E'
                    : '#5BA06B',
              }}
            >
              {td(`urgency_${report.urgency}`)}
            </span>
          )}
        </div>
        <p
          style={{
            color: 'var(--text-primary)',
            fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          {report.executiveSummary}
        </p>
      </div>

      {/* Company Context */}
      {report.companyContext && (
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            padding: '24px 28px',
            marginBottom: '24px',
          }}
        >
          <p className="eyebrow" style={{ marginBottom: '10px' }}>{td('context_eyebrow')}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: report.companyContext.keyActivities ? '16px' : 0 }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{td('sector')}</p>
              <p style={{ color: 'var(--text-primary)', fontSize: '0.9375rem', margin: 0 }}>{report.companyContext.sector}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{td('profile')}</p>
              <p style={{ color: 'var(--text-primary)', fontSize: '0.9375rem', margin: 0 }}>{report.companyContext.estimatedProfile}</p>
            </div>
          </div>
          {report.companyContext.keyActivities && (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.65, margin: 0 }}>
              {report.companyContext.keyActivities}
            </p>
          )}
          {report.companyContext.researchSignals?.length > 0 && (
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '6px' }}>{td('found_online')}</p>
              {report.companyContext.researchSignals.map((s, i) => (
                <p key={i} style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', lineHeight: 1.5, margin: '0 0 4px' }}>
                  · {s}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Diensten × AI-kansen */}
      {report.serviceOpportunities && report.serviceOpportunities.length > 0 && (
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            padding: '28px 32px',
            marginBottom: '24px',
          }}
        >
          <p className="eyebrow" style={{ marginBottom: '20px' }}>{td('services_eyebrow')}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {report.serviceOpportunities.map((svc, i) => {
              const exposureColor =
                svc.exposure === 'high' ? '#F14C1D' : svc.exposure === 'medium' ? '#E8B23E' : '#5BA06B';
              return (
                <div
                  key={i}
                  style={{
                    paddingBottom: i < report.serviceOpportunities!.length - 1 ? '18px' : 0,
                    borderBottom: i < report.serviceOpportunities!.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                      {svc.service}
                    </h3>
                    {svc.exposure && (
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 800,
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          color: exposureColor,
                          border: `1px solid ${exposureColor}`,
                          borderRadius: '2px',
                          padding: '2px 7px',
                        }}
                      >
                        {td(`services_exposure_${svc.exposure}`)}
                      </span>
                    )}
                  </div>
                  {svc.whatItIs && (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.65, margin: '0 0 8px' }}>
                      {svc.whatItIs}
                    </p>
                  )}
                  {svc.aiOpportunity && (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-cta-ink)', flexShrink: 0, paddingTop: '2px' }}>
                        ◆
                      </span>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, margin: 0 }}>
                        <strong style={{ color: 'var(--text-primary)' }}>{td('services_ai_label')}:</strong>{' '}
                        {svc.aiOpportunity}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Teamopbouw */}
      {report.teamAnalysis && (report.teamAnalysis.composition || report.teamAnalysis.signals?.length > 0) && (
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            padding: '28px 32px',
            marginBottom: '24px',
          }}
        >
          <p className="eyebrow" style={{ marginBottom: '12px' }}>{td('team_eyebrow')}</p>
          {report.teamAnalysis.composition && (
            <p style={{ color: 'var(--text-primary)', fontSize: 'clamp(1rem, 1.6vw, 1.0625rem)', lineHeight: 1.7, margin: `0 0 ${report.teamAnalysis.signals?.length > 0 ? '16px' : '0'}` }}>
              {report.teamAnalysis.composition}
            </p>
          )}
          {report.teamAnalysis.signals?.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {report.teamAnalysis.signals.map((s, i) => (
                <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--accent-cta-ink)', fontWeight: 800, flexShrink: 0, paddingTop: '1px' }}>—</span>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.65, margin: 0 }}>{s}</p>
                </li>
              ))}
            </ul>
          )}
          {report.teamAnalysis.implication && (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', lineHeight: 1.55, marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
              <strong style={{ color: 'var(--text-secondary)' }}>{td('team_implication_label')}:</strong> {report.teamAnalysis.implication}
            </p>
          )}
        </div>
      )}

      {/* Dimensie-analyse */}
      {report.dimensionAnalysis?.length > 0 && (
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            padding: '28px 32px',
            marginBottom: '24px',
          }}
        >
          <p className="eyebrow" style={{ marginBottom: '20px' }}>{td('dimensions_eyebrow')}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {report.dimensionAnalysis
              .sort((a, b) => a.score - b.score) // laagste dimensies eerst
              .map((dim) => (
                <div
                  key={dim.dimension}
                  style={{
                    paddingBottom: '20px',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '10px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          letterSpacing: '0.05em',
                          color: PRIORITY_COLORS[dim.priority] ?? 'var(--text-muted)',
                        }}
                      >
                        {PRIORITY_SYMBOLS[dim.priority] ? `${PRIORITY_SYMBOLS[dim.priority]} ` : ''}
                        {td(`prio_${dim.priority}`)}
                      </span>
                      <h3
                        style={{
                          fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          margin: 0,
                        }}
                      >
                        {dim.label}
                      </h3>
                    </div>
                    <span
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        color: 'var(--text-muted)',
                      }}
                    >
                      {dim.score}/100
                    </span>
                  </div>

                  {/* Score bar */}
                  <div
                    style={{
                      height: '4px',
                      background: 'var(--border-subtle)',
                      borderRadius: '2px',
                      marginBottom: '12px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${dim.score}%`,
                        background: PRIORITY_COLORS[dim.priority] ?? 'var(--accent-cta)',
                        borderRadius: '2px',
                        transition: 'width 0.8s ease',
                      }}
                    />
                  </div>

                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)',
                      lineHeight: 1.75,
                      marginBottom: '10px',
                    }}
                  >
                    {dim.assessment}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'flex-start',
                      padding: '10px 14px',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-cta-ink)', flexShrink: 0, paddingTop: '1px' }}>
                      →
                    </span>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, margin: 0 }}>
                      <strong style={{ color: 'var(--text-primary)' }}>{td('quickwin_label')}:</strong>{' '}
                      {dim.quickWin}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Wat er op het spel staat */}
      {report.valueAtStake && (report.valueAtStake.headline || report.valueAtStake.drivers?.length > 0) && (
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderLeft: '3px solid #F14C1D',
            padding: '28px 32px',
            marginBottom: '24px',
          }}
        >
          <p className="eyebrow" style={{ marginBottom: '12px' }}>{t('value_eyebrow')}</p>
          {report.valueAtStake.headline && (
            <p
              style={{
                color: 'var(--text-primary)',
                fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
                fontWeight: 700,
                lineHeight: 1.6,
                marginBottom: report.valueAtStake.drivers?.length > 0 ? '18px' : 0,
              }}
            >
              {report.valueAtStake.headline}
            </p>
          )}
          {report.valueAtStake.drivers?.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {report.valueAtStake.drivers.map((d, i) => (
                <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#F14C1D', fontWeight: 800, flexShrink: 0, paddingTop: '1px' }}>—</span>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)', lineHeight: 1.65, margin: 0 }}>{d}</p>
                </li>
              ))}
            </ul>
          )}
          {report.valueAtStake.basis && (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', fontStyle: 'italic', lineHeight: 1.55, marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
              <strong style={{ fontStyle: 'normal' }}>{t('value_basis_label')}:</strong> {report.valueAtStake.basis}
            </p>
          )}
        </div>
      )}

      {/* Actieplan / roadmap */}
      {report.actionRoadmap && report.actionRoadmap.length > 0 && (
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            padding: '28px 32px',
            marginBottom: '24px',
          }}
        >
          <p className="eyebrow" style={{ marginBottom: '20px' }}>{t('roadmap_eyebrow')}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {report.actionRoadmap.map((phase, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 2fr)',
                  gap: '20px',
                  paddingBottom: i < report.actionRoadmap!.length - 1 ? '20px' : 0,
                  borderBottom: i < report.actionRoadmap!.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                }}
                className="roadmap-phase"
              >
                <div>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-cta-ink)',
                      border: '1px solid var(--accent-cta)',
                      borderRadius: '2px',
                      padding: '3px 8px',
                      marginBottom: '8px',
                    }}
                  >
                    {phase.horizon}
                  </span>
                  <p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1rem', lineHeight: 1.4, margin: 0 }}>
                    {phase.focus}
                  </p>
                </div>
                <div>
                  {phase.actions?.length > 0 && (
                    <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {phase.actions.map((a, j) => (
                        <li key={j} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                          <span style={{ color: 'var(--accent-cta-ink)', fontWeight: 800, flexShrink: 0, paddingTop: '1px' }}>→</span>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, margin: 0 }}>{a}</p>
                        </li>
                      ))}
                    </ol>
                  )}
                  {phase.outcome && (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', lineHeight: 1.55, marginTop: '12px' }}>
                      <strong style={{ color: 'var(--text-secondary)' }}>{t('roadmap_outcome_label')}:</strong> {phase.outcome}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Insights */}
      {report.keyInsights?.length > 0 && (
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            padding: '28px 32px',
            marginBottom: '24px',
          }}
        >
          <p className="eyebrow" style={{ marginBottom: '20px' }}>{td('insights_eyebrow')}</p>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {report.keyInsights.map((insight, i) => (
              <li key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: 'var(--accent-cta-ink)',
                    letterSpacing: '0.06em',
                    flexShrink: 0,
                    paddingTop: '3px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)', marginBottom: '4px' }}>
                    {insight.title}
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)', lineHeight: 1.7, margin: 0 }}>
                    {insight.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Aanbevolen traject */}
      {report.recommendedTrajectory && (
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderLeft: '3px solid var(--accent-cta)',
            padding: '28px 32px',
            marginBottom: '24px',
          }}
        >
          <p className="eyebrow" style={{ marginBottom: '10px' }}>{td('trajectory_eyebrow')}</p>
          <h2
            className="type-h2"
            style={{ marginBottom: '12px' }}
          >
            {report.recommendedTrajectory.offerName}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 1.6vw, 1.125rem)', lineHeight: 1.75, marginBottom: '12px' }}>
            {report.recommendedTrajectory.rationale}
          </p>
          {report.recommendedTrajectory.expectedOutcome && (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: '16px' }}>
              <strong style={{ color: 'var(--text-primary)' }}>{td('expected_label')}:</strong>{' '}
              {report.recommendedTrajectory.expectedOutcome}
            </p>
          )}
          {report.recommendedTrajectory.firstStep && (
            <div
              style={{
                padding: '12px 16px',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '0',
              }}
            >
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, margin: 0 }}>
                <strong style={{ color: 'var(--text-primary)' }}>{td('firststep_label')}:</strong>{' '}
                {report.recommendedTrajectory.firstStep}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Gegenereerd door indicator */}
      <p
        style={{
          color: 'var(--text-muted)',
          fontSize: '0.75rem',
          fontStyle: 'italic',
          textAlign: 'right',
          marginTop: '8px',
        }}
      >
        {td('generated', {
          model: report.model ?? 'DeepSeek',
          date: report.generatedAt
            ? new Date(report.generatedAt).toLocaleDateString(locale)
            : '—',
        })}
      </p>
    </div>
  );
}
