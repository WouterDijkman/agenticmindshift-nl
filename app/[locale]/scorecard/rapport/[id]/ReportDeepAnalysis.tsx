'use client';

import { useEffect, useState, useCallback } from 'react';
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

const PRIORITY_LABELS: Record<string, string> = {
  critical: '⚡ Kritiek',
  attention: '◆ Aandacht',
  adequate: '○ Voldoende',
  strong: '✓ Sterk',
};

const URGENCY_LABELS: Record<string, string> = {
  high: 'Directe actie vereist',
  medium: 'Verbeterpotentieel',
  low: 'Goede basis',
};

export default function ReportDeepAnalysis({ leadId }: ReportDeepAnalysisProps) {
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
            <p className="eyebrow" style={{ marginBottom: '4px' }}>AI-analyse bezig</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', margin: 0 }}>
              DeepSeek analyseert uw antwoorden en bedrijfscontext — dit duurt ca. 20–30 seconden.
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
        <p className="eyebrow" style={{ marginBottom: '8px' }}>Diepteanalyse niet beschikbaar</p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', margin: 0 }}>
          De AI-analyse is beschikbaar zodra Supabase geconfigureerd is en uw scorecard-gegevens zijn opgeslagen.
          Uw scores hierboven zijn correct berekend op basis van uw antwoorden.
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
        <p className="eyebrow" style={{ marginBottom: '8px' }}>Analyse tijdelijk niet beschikbaar</p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '16px' }}>
          De AI-diepteanalyse kon niet worden gegenereerd. Probeer het opnieuw of neem contact op.
        </p>
        <button
          onClick={generate}
          className="btn btn-secondary"
          style={{ fontSize: '0.875rem' }}
        >
          Opnieuw proberen
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
        <p className="eyebrow" style={{ marginBottom: '10px' }}>AI-adviesrapport</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <span
            className="wb-card-chip"
            style={{
              position: 'static',
              color: report.scoreProfile?.profileLabel ? 'var(--accent-cta)' : 'var(--text-muted)',
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
              {URGENCY_LABELS[report.urgency]}
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
          <p className="eyebrow" style={{ marginBottom: '10px' }}>Bedrijfscontext</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: report.companyContext.keyActivities ? '16px' : 0 }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Sector</p>
              <p style={{ color: 'var(--text-primary)', fontSize: '0.9375rem', margin: 0 }}>{report.companyContext.sector}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Profiel</p>
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
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '6px' }}>Online gevonden:</p>
              {report.companyContext.researchSignals.map((s, i) => (
                <p key={i} style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', lineHeight: 1.5, margin: '0 0 4px' }}>
                  · {s}
                </p>
              ))}
            </div>
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
          <p className="eyebrow" style={{ marginBottom: '20px' }}>Dimensie-analyse</p>
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
                        {PRIORITY_LABELS[dim.priority] ?? dim.priority}
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
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-cta)', flexShrink: 0, paddingTop: '1px' }}>
                      →
                    </span>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, margin: 0 }}>
                      <strong style={{ color: 'var(--text-primary)' }}>Quick win:</strong>{' '}
                      {dim.quickWin}
                    </p>
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
          <p className="eyebrow" style={{ marginBottom: '20px' }}>Kernobservaties</p>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {report.keyInsights.map((insight, i) => (
              <li key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: 'var(--accent-cta)',
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
          <p className="eyebrow" style={{ marginBottom: '10px' }}>Aanbevolen traject</p>
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
              <strong style={{ color: 'var(--text-primary)' }}>Verwacht resultaat:</strong>{' '}
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
                <strong style={{ color: 'var(--text-primary)' }}>Eerste stap:</strong>{' '}
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
        Rapport gegenereerd via {report.model ?? 'DeepSeek'} op{' '}
        {report.generatedAt
          ? new Date(report.generatedAt).toLocaleDateString('nl-NL')
          : 'onbekend'}
      </p>
    </div>
  );
}
