/**
 * Editorial PDF rapport — cream/navy/rust palet, matched aan de
 * homepage "Het Rapport" data-image stijl.
 *
 * Layout:
 *   Cover  → eyebrow, naam-bedrijf, profiellabel, executive summary
 *   Hero   → score-card met "X/6 dimensies onder vergelijkbare partijen"
 *            badge en peer-benchmark bars per dimensie
 *   Deep   → dimensie-analyse (de 3 zwakste eerst)
 *   Context→ bedrijfscontext (sector, activiteiten, gevonden signalen)
 *   Insight→ kernobservaties + aanbevolen traject + CTA
 */

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import {
  dimensionLabels,
  type Dimension,
} from '../questions';
import { offerMap, type OfferType } from '../scoring';
import { type GeneratedReport } from '../report/types';

// ───────────────────────────────────────────────────────────────────────────
// Fonts — match site: serif voor headings, sans voor body
// ───────────────────────────────────────────────────────────────────────────

Font.register({
  family: 'Noto Serif',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/notoserif/v23/ga6Iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZqFGjogv8AvhgWa5wuQ.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/notoserif/v23/ga6Iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZqFGjogv8AvhgZK9wuQ.ttf',
      fontWeight: 700,
    },
  ],
});

Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-500-normal.ttf',
      fontWeight: 500,
    },
    {
      src: 'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf',
      fontWeight: 700,
    },
  ],
});

// ───────────────────────────────────────────────────────────────────────────
// Brand palet — matched aan homepage Het Rapport screenshot
// ───────────────────────────────────────────────────────────────────────────

const brand = {
  bg: '#F7F2EB',              // cream
  bgCard: '#FFFFFF',          // white card on cream
  bgCardSoft: '#FBF7F1',      // softer cream for nested boxes
  border: '#E5DDD0',          // warm border
  borderStrong: '#D4C8B5',
  navy: '#0B1F3A',            // primary text
  navySoft: '#1F3556',        // secondary text
  textMuted: '#6B5E4E',       // warm muted
  rust: '#F14C1D',            // accent (cta + below-median)
  rustSoft: '#F47A4D',
  navyBar: '#0B1F3A',         // above-median bar
  peerLine: '#A89C8A',         // peer-median tick line
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: brand.bg,
    color: brand.navy,
    fontFamily: 'Inter',
    paddingHorizontal: 56,
    paddingTop: 52,
    paddingBottom: 64,
    fontSize: 10.5,
  },

  // ── Typography ─────────────────────────────────────────────────────────
  eyebrow: {
    fontFamily: 'Inter',
    fontSize: 8.5,
    fontWeight: 700,
    color: brand.rust,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  h1: {
    fontFamily: 'Noto Serif',
    fontSize: 34,
    fontWeight: 700,
    color: brand.navy,
    lineHeight: 1.15,
    marginBottom: 14,
  },
  h2: {
    fontFamily: 'Noto Serif',
    fontSize: 19,
    fontWeight: 700,
    color: brand.navy,
    lineHeight: 1.25,
    marginTop: 18,
    marginBottom: 10,
  },
  h3: {
    fontFamily: 'Inter',
    fontSize: 11,
    fontWeight: 700,
    color: brand.navy,
    marginBottom: 4,
  },
  body: {
    fontFamily: 'Inter',
    fontSize: 10.5,
    color: brand.navySoft,
    lineHeight: 1.7,
  },
  bodyLarge: {
    fontFamily: 'Noto Serif',
    fontSize: 13,
    color: brand.navy,
    lineHeight: 1.7,
  },
  bodyEmphasis: {
    fontFamily: 'Inter',
    fontSize: 10.5,
    color: brand.navy,
    lineHeight: 1.65,
    fontWeight: 500,
  },
  muted: {
    fontFamily: 'Inter',
    fontSize: 9,
    color: brand.textMuted,
    lineHeight: 1.5,
  },

  // ── Cards ──────────────────────────────────────────────────────────────
  card: {
    backgroundColor: brand.bgCard,
    border: `1px solid ${brand.border}`,
    borderRadius: 4,
    padding: 24,
    marginBottom: 18,
  },
  cardSoft: {
    backgroundColor: brand.bgCardSoft,
    border: `1px solid ${brand.border}`,
    borderRadius: 4,
    padding: 18,
    marginBottom: 14,
  },
  cardAccent: {
    backgroundColor: brand.bgCard,
    borderTop: `1px solid ${brand.border}`,
    borderRight: `1px solid ${brand.border}`,
    borderBottom: `1px solid ${brand.border}`,
    borderLeft: `3px solid ${brand.rust}`,
    borderRadius: 3,
    padding: 22,
    marginBottom: 18,
  },

  // ── Score bars ─────────────────────────────────────────────────────────
  barRow: {
    marginBottom: 16,
  },
  barLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  barLabel: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: 700,
    color: brand.navy,
  },
  barScore: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: 700,
    color: brand.navy,
  },
  barTrack: {
    height: 6,
    backgroundColor: '#EFE6D7',
    borderRadius: 3,
    position: 'relative',
  },
  barFillRust: {
    height: 6,
    backgroundColor: brand.rust,
    borderRadius: 3,
  },
  barFillNavy: {
    height: 6,
    backgroundColor: brand.navyBar,
    borderRadius: 3,
  },
  peerTick: {
    position: 'absolute',
    top: -2,
    width: 1,
    height: 10,
    backgroundColor: brand.peerLine,
  },

  // ── Footer ─────────────────────────────────────────────────────────────
  footer: {
    position: 'absolute',
    bottom: 28,
    left: 56,
    right: 56,
    borderTop: `1px solid ${brand.border}`,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerLeft: {
    fontFamily: 'Inter',
    fontSize: 8.5,
    color: brand.textMuted,
    letterSpacing: 0.6,
  },
  footerRight: {
    fontFamily: 'Inter',
    fontSize: 8.5,
    color: brand.textMuted,
  },

  // ── Pills / Chips ──────────────────────────────────────────────────────
  badge: {
    backgroundColor: brand.bgCard,
    border: `1px solid ${brand.rust}`,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeNumber: {
    fontFamily: 'Noto Serif',
    fontSize: 18,
    fontWeight: 700,
    color: brand.rust,
    lineHeight: 1.1,
  },
  badgeLabel: {
    fontFamily: 'Inter',
    fontSize: 8,
    color: brand.navySoft,
    lineHeight: 1.3,
    letterSpacing: 0.2,
    marginTop: 2,
  },

  // ── Legend ─────────────────────────────────────────────────────────────
  legendRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 10,
    paddingTop: 10,
    borderTop: `1px solid ${brand.border}`,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDotRust: { width: 8, height: 8, backgroundColor: brand.rust, borderRadius: 2 },
  legendDotNavy: { width: 8, height: 8, backgroundColor: brand.navyBar, borderRadius: 2 },
  legendDotPeer: { width: 1, height: 10, backgroundColor: brand.peerLine },
  legendText: {
    fontFamily: 'Inter',
    fontSize: 7.5,
    color: brand.textMuted,
    letterSpacing: 0.3,
  },

  // ── CTA ────────────────────────────────────────────────────────────────
  ctaBox: {
    backgroundColor: brand.rust,
    padding: 18,
    borderRadius: 4,
    marginTop: 14,
  },
  ctaTitle: {
    fontFamily: 'Inter',
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: 700,
    marginBottom: 4,
  },
  ctaBody: {
    fontFamily: 'Inter',
    fontSize: 9.5,
    color: '#FFE4D7',
    lineHeight: 1.5,
  },
});

// ───────────────────────────────────────────────────────────────────────────
// Helpers
// ───────────────────────────────────────────────────────────────────────────

const PEER_MEDIAN = 60; // gemiddelde van de peer-groep (0-100 schaal)

function priorityLabel(p?: string): string {
  switch (p) {
    case 'critical': return 'Kritiek';
    case 'attention': return 'Aandacht';
    case 'adequate': return 'Voldoende';
    case 'strong': return 'Sterk';
    default: return '';
  }
}

// ───────────────────────────────────────────────────────────────────────────
// Page-footer (herbruikbaar)
// ───────────────────────────────────────────────────────────────────────────

interface FooterProps { pageNumber?: number; company: string }
function PageFooter({ pageNumber, company }: FooterProps) {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerLeft}>
        Agentic Mindshift · Vertrouwelijk rapport voor {company}
      </Text>
      <Text style={styles.footerRight}>
        agenticmindshift.nl{pageNumber ? ` · ${pageNumber}` : ''}
      </Text>
    </View>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// Hoofd-document
// ───────────────────────────────────────────────────────────────────────────

interface ReportProps {
  name: string;
  company: string;
  totalScore: number;
  byDimension: Record<Dimension, number>;
  weakest: string[];
  offer: OfferType;
  generatedAt?: string;
  report?: GeneratedReport;
}

export function ReportDocument({
  name,
  company,
  totalScore,
  byDimension,
  weakest,
  offer,
  generatedAt = new Date().toLocaleDateString('nl-NL'),
  report,
}: ReportProps) {
  const offerInfo = offerMap[offer];
  const firstName = name.split(' ')[0];

  // Aantal dimensies onder peer-mediaan
  const dimensionEntries = Object.entries(byDimension) as [Dimension, number][];
  const belowPeer = dimensionEntries.filter(([, s]) => s < PEER_MEDIAN).length;
  const totalDims = dimensionEntries.length;

  return (
    <Document title={`AI Readiness Rapport — ${company}`}>

      {/* ═══════ PAGE 1 — COVER ═══════════════════════════════════════════ */}
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.eyebrow}>Het Rapport · {generatedAt}</Text>

          <Text style={styles.h1}>
            {report?.scoreProfile?.profileLabel ?? 'AI Readiness Profiel'}
          </Text>

          <Text style={{
            fontFamily: 'Inter',
            fontSize: 13,
            color: brand.navySoft,
            marginBottom: 4,
          }}>
            {company}
          </Text>
          <Text style={{ fontFamily: 'Inter', fontSize: 10, color: brand.textMuted, marginBottom: 32 }}>
            Voor {name}
          </Text>

          {/* Executive Summary box */}
          {report?.executiveSummary && (
            <View style={styles.cardAccent}>
              <Text style={[styles.eyebrow, { marginBottom: 8 }]}>Executive Summary</Text>
              <Text style={styles.bodyLarge}>
                {report.executiveSummary}
              </Text>
            </View>
          )}

          {/* Quick stats */}
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 8 }}>
            <View style={[styles.cardSoft, { flex: 1, marginBottom: 0 }]}>
              <Text style={styles.muted}>Totaalscore</Text>
              <Text style={{ fontFamily: 'Noto Serif', fontSize: 26, fontWeight: 700, color: brand.navy, marginTop: 2 }}>
                {totalScore}<Text style={{ fontSize: 14, color: brand.textMuted }}> / 75</Text>
              </Text>
            </View>
            <View style={[styles.cardSoft, { flex: 1, marginBottom: 0 }]}>
              <Text style={styles.muted}>Onder mediaan</Text>
              <Text style={{ fontFamily: 'Noto Serif', fontSize: 26, fontWeight: 700, color: brand.rust, marginTop: 2 }}>
                {belowPeer}<Text style={{ fontSize: 14, color: brand.textMuted }}> / {totalDims}</Text>
              </Text>
              <Text style={[styles.muted, { marginTop: 2 }]}>dimensies</Text>
            </View>
            <View style={[styles.cardSoft, { flex: 1, marginBottom: 0 }]}>
              <Text style={styles.muted}>Urgentie</Text>
              <Text style={{
                fontFamily: 'Noto Serif',
                fontSize: 18,
                fontWeight: 700,
                color: report?.urgency === 'high' ? brand.rust : report?.urgency === 'medium' ? '#C28A2C' : '#5E8A4E',
                marginTop: 4,
              }}>
                {report?.urgency === 'high' ? 'Hoog' : report?.urgency === 'medium' ? 'Gemiddeld' : 'Laag'}
              </Text>
            </View>
          </View>
        </View>

        <PageFooter pageNumber={1} company={company} />
      </Page>

      {/* ═══════ PAGE 2 — HERO SCORECARD ══════════════════════════════════ */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.eyebrow}>Scoreoverzicht</Text>
        <Text style={styles.h1}>Uw profiel vs. vergelijkbare partijen</Text>
        <Text style={[styles.body, { marginBottom: 20, maxWidth: 420 }]}>
          Elke dimensie afgezet tegen de mediaan van vergelijkbare organisaties in
          mid-market private equity en M&A. De peer-mediaan-tick markeert {PEER_MEDIAN}/100.
        </Text>

        {/* The hero card */}
        <View style={[styles.card, { padding: 26, position: 'relative' }]}>
          {/* Badge top-right */}
          <View style={{ position: 'absolute', top: -10, right: 22 }}>
            <View style={styles.badge}>
              <Text style={styles.badgeNumber}>{belowPeer}/{totalDims}</Text>
              <Text style={styles.badgeLabel}>onder mediaan</Text>
            </View>
          </View>

          <Text style={[styles.h3, { marginBottom: 14 }]}>
            Score per dimensie
          </Text>

          {dimensionEntries.map(([dim, score]) => {
            const isBelow = score < PEER_MEDIAN;
            const dimReport = report?.dimensionAnalysis?.find((d) => d.dimension === dim);
            const tickLeft = `${PEER_MEDIAN}%`;
            return (
              <View key={dim} style={styles.barRow}>
                <View style={styles.barLabelRow}>
                  <Text style={styles.barLabel}>
                    {dimensionLabels[dim]}
                  </Text>
                  <Text style={styles.barScore}>
                    {score}<Text style={{ color: brand.textMuted, fontWeight: 400 }}> / 100</Text>
                    {dimReport?.priority ? (
                      <Text style={{ fontSize: 8, color: brand.textMuted }}>  · {priorityLabel(dimReport.priority)}</Text>
                    ) : null}
                  </Text>
                </View>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      isBelow ? styles.barFillRust : styles.barFillNavy,
                      { width: `${score}%` },
                    ]}
                  />
                  {/* Peer-median tick */}
                  <View style={[styles.peerTick, { left: tickLeft }]} />
                </View>
              </View>
            );
          })}

          {/* Legend */}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={styles.legendDotRust} />
              <Text style={styles.legendText}>Onder mediaan</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={styles.legendDotNavy} />
              <Text style={styles.legendText}>Op / boven mediaan</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={styles.legendDotPeer} />
              <Text style={styles.legendText}>Peer-mediaan</Text>
            </View>
          </View>
        </View>

        {report?.scoreProfile?.profileExplanation && (
          <View style={styles.cardSoft}>
            <Text style={styles.h3}>Wat dit zegt</Text>
            <Text style={styles.body}>{report.scoreProfile.profileExplanation}</Text>
          </View>
        )}

        {report?.urgencyExplanation && (
          <View style={[styles.cardSoft, { borderLeft: `2px solid ${brand.rust}` }]}>
            <Text style={[styles.eyebrow, { fontSize: 8, marginBottom: 4 }]}>Urgentiesignaal</Text>
            <Text style={styles.body}>{report.urgencyExplanation}</Text>
          </View>
        )}

        <PageFooter pageNumber={2} company={company} />
      </Page>

      {/* ═══════ PAGE 3 — DIMENSIE DIEPTE ════════════════════════════════ */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.eyebrow}>Diepteanalyse</Text>
        <Text style={styles.h1}>Per dimensie</Text>
        <Text style={[styles.body, { marginBottom: 18, maxWidth: 460 }]}>
          De drie dimensies met de laagste score, met concrete duiding voor uw situatie
          en een direct-uitvoerbare quick win.
        </Text>

        {report?.dimensionAnalysis
          ?.sort((a, b) => a.score - b.score)
          .slice(0, 3)
          .map((dim) => (
            <View key={dim.dimension} style={styles.card}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <Text style={{ fontFamily: 'Noto Serif', fontSize: 16, fontWeight: 700, color: brand.navy }}>
                  {dim.label}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 700, color: dim.score < PEER_MEDIAN ? brand.rust : brand.navy }}>
                    {dim.score}
                    <Text style={{ fontSize: 10, color: brand.textMuted, fontWeight: 400 }}> / 100</Text>
                  </Text>
                </View>
              </View>
              <Text style={[styles.body, { marginBottom: 10 }]}>{dim.assessment}</Text>
              <View style={[styles.cardSoft, { marginBottom: 0, padding: 12 }]}>
                <Text style={[styles.eyebrow, { fontSize: 8, marginBottom: 3, letterSpacing: 1.6 }]}>Quick Win</Text>
                <Text style={styles.bodyEmphasis}>{dim.quickWin}</Text>
              </View>
            </View>
          ))}

        {!report?.dimensionAnalysis && (
          <View style={styles.card}>
            <Text style={styles.h3}>Grootste aandachtspunten</Text>
            {weakest.map((w) => (
              <Text key={w} style={[styles.body, { marginBottom: 6 }]}>· {w}</Text>
            ))}
          </View>
        )}

        <PageFooter pageNumber={3} company={company} />
      </Page>

      {/* ═══════ PAGE 4 — BEDRIJFSCONTEXT + INZICHTEN ════════════════════ */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.eyebrow}>Bedrijfscontext</Text>
        <Text style={styles.h1}>Wat wij zien bij {company}</Text>

        {report?.companyContext && (
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', gap: 18, marginBottom: 12 }}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.eyebrow, { fontSize: 8, marginBottom: 4 }]}>Sector</Text>
                <Text style={styles.bodyEmphasis}>{report.companyContext.sector}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.eyebrow, { fontSize: 8, marginBottom: 4 }]}>Profiel</Text>
                <Text style={styles.bodyEmphasis}>{report.companyContext.estimatedProfile}</Text>
              </View>
            </View>
            {report.companyContext.keyActivities && (
              <Text style={[styles.body, { marginBottom: 10 }]}>
                {report.companyContext.keyActivities}
              </Text>
            )}
            {report.companyContext.researchSignals?.length > 0 && (
              <View style={{ marginTop: 8, paddingTop: 10, borderTop: `1px solid ${brand.border}` }}>
                <Text style={[styles.eyebrow, { fontSize: 8, marginBottom: 6 }]}>Online observaties</Text>
                {report.companyContext.researchSignals.map((s, i) => (
                  <Text key={i} style={[styles.body, { marginBottom: 4 }]}>· {s}</Text>
                ))}
              </View>
            )}
          </View>
        )}

        <Text style={styles.h2}>Kernobservaties</Text>
        {report?.keyInsights?.slice(0, 4).map((insight, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 12, marginBottom: 14 }}>
            <Text style={{
              fontFamily: 'Inter',
              fontSize: 9,
              fontWeight: 700,
              color: brand.rust,
              letterSpacing: 1,
              paddingTop: 2,
              minWidth: 18,
            }}>
              {String(i + 1).padStart(2, '0')}
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.h3}>{insight.title}</Text>
              <Text style={styles.body}>{insight.body}</Text>
            </View>
          </View>
        ))}

        <PageFooter pageNumber={4} company={company} />
      </Page>

      {/* ═══════ PAGE 5 — TRAJECT + CTA ══════════════════════════════════ */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.eyebrow}>Vervolgstap</Text>
        <Text style={styles.h1}>Aanbevolen traject voor {firstName}</Text>

        <View style={styles.cardAccent}>
          <Text style={{ fontFamily: 'Noto Serif', fontSize: 22, fontWeight: 700, color: brand.navy, marginBottom: 10 }}>
            {report?.recommendedTrajectory?.offerName ?? offerInfo?.name}
          </Text>
          <Text style={[styles.bodyLarge, { marginBottom: 12 }]}>
            {report?.recommendedTrajectory?.rationale ?? offerInfo?.description}
          </Text>

          {report?.recommendedTrajectory?.expectedOutcome && (
            <View style={[styles.cardSoft, { marginBottom: 10 }]}>
              <Text style={[styles.eyebrow, { fontSize: 8, marginBottom: 4 }]}>Verwacht resultaat</Text>
              <Text style={styles.body}>{report.recommendedTrajectory.expectedOutcome}</Text>
            </View>
          )}

          {report?.recommendedTrajectory?.firstStep && (
            <View style={[styles.cardSoft, { marginBottom: 0, borderLeft: `2px solid ${brand.rust}` }]}>
              <Text style={[styles.eyebrow, { fontSize: 8, marginBottom: 4 }]}>Eerste stap</Text>
              <Text style={styles.bodyEmphasis}>{report.recommendedTrajectory.firstStep}</Text>
            </View>
          )}
        </View>

        {/* CTA */}
        <View style={styles.ctaBox}>
          <Text style={styles.ctaTitle}>
            Plan een sparring sessie van 20 minuten
          </Text>
          <Text style={styles.ctaBody}>
            cal.com/wwdijkman/intake-call · wouter@agenticmindshift.nl{'\n'}
            Geen verkoopgesprek — een toets of de aanbeveling aansluit op uw situatie.
          </Text>
        </View>

        {/* Registratie / juridisch */}
        <View style={{ position: 'absolute', bottom: 72, left: 56, right: 56 }}>
          <Text style={[styles.muted, { fontSize: 8 }]}>
            Agentic Mindshift Consultancy · Marius Bauerstraat 235 A 5, 1062 AL Amsterdam · KvK 99495945
            {'\n'}
            Dit rapport is gegenereerd met {report?.model ?? 'DeepSeek'} op basis van uw eigen scorecard-antwoorden
            {report?.companyContext?.researchSignals?.length ? ' en publiek beschikbare bedrijfsinformatie' : ''}.
            Vertrouwelijk; niet voor verspreiding zonder toestemming.
          </Text>
        </View>

        <PageFooter pageNumber={5} company={company} />
      </Page>
    </Document>
  );
}

export default ReportDocument;
