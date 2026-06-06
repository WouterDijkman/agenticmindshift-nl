/**
 * Editorial PDF rapport — cream/navy/rust palet, matched aan de
 * homepage "Het Rapport" data-image stijl.
 *
 * Robuuste implementatie: geen `fixed`, geen negatieve absolute waardes,
 * geen geneste Text-in-Text met conditionals. Alle conditionele blocks
 * gebruiken `&& null` patroon i.p.v. `&&` (anders krijgt @react-pdf
 * `false` als child wat in sommige posities crasht).
 */

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { dimensionLabels, type Dimension } from '../questions';
import { offerMap, type OfferType } from '../scoring';
import { type GeneratedReport } from '../report/types';

// Geen Font.register: we gebruiken built-in fonts (Times-Roman serif voor
// editorial headlines, Helvetica sans voor body). Geen netwerk-fetch =
// 100% betrouwbaar in alle runtimes (Node, Vercel edge, etc.).
const SERIF = 'Times-Roman';
const SERIF_BOLD = 'Times-Bold';
const SANS = 'Helvetica';
const SANS_BOLD = 'Helvetica-Bold';

const brand = {
  bg: '#F7F2EB',
  bgCard: '#FFFFFF',
  bgCardSoft: '#FBF7F1',
  border: '#E5DDD0',
  navy: '#0B1F3A',
  navySoft: '#1F3556',
  textMuted: '#6B5E4E',
  rust: '#F14C1D',
  navyBar: '#0B1F3A',
  peerLine: '#A89C8A',
};

const s = StyleSheet.create({
  page: {
    backgroundColor: brand.bg,
    color: brand.navy,
    paddingHorizontal: 50,
    paddingTop: 50,
    paddingBottom: 60,
    fontSize: 10.5,
    fontFamily: 'Helvetica',
  },
  eyebrow: {
    fontSize: 8.5,
    fontWeight: 700,
    color: brand.rust,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  h1: {
    fontFamily: SERIF_BOLD,
    fontSize: 32,
    fontWeight: 700,
    color: brand.navy,
    lineHeight: 1.15,
    marginBottom: 12,
  },
  h2: {
    fontFamily: SERIF_BOLD,
    fontSize: 18,
    fontWeight: 700,
    color: brand.navy,
    marginTop: 18,
    marginBottom: 8,
  },
  h3: {
    fontSize: 11,
    fontWeight: 700,
    color: brand.navy,
    marginBottom: 4,
  },
  body: {
    fontSize: 10.5,
    color: brand.navySoft,
    lineHeight: 1.7,
  },
  bodyLarge: {
    fontFamily: SERIF_BOLD,
    fontSize: 13,
    color: brand.navy,
    lineHeight: 1.65,
  },
  muted: {
    fontSize: 9,
    color: brand.textMuted,
    lineHeight: 1.5,
  },
  smallLabel: {
    fontSize: 8,
    color: brand.rust,
    fontWeight: 700,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  card: {
    backgroundColor: brand.bgCard,
    border: `1pt solid ${brand.border}`,
    padding: 20,
    marginBottom: 14,
  },
  cardSoft: {
    backgroundColor: brand.bgCardSoft,
    border: `1pt solid ${brand.border}`,
    padding: 14,
    marginBottom: 12,
  },
  cardAccent: {
    backgroundColor: brand.bgCard,
    borderTop: `1pt solid ${brand.border}`,
    borderRight: `1pt solid ${brand.border}`,
    borderBottom: `1pt solid ${brand.border}`,
    borderLeft: `3pt solid ${brand.rust}`,
    padding: 20,
    marginBottom: 14,
  },
  statBox: {
    backgroundColor: brand.bgCardSoft,
    border: `1pt solid ${brand.border}`,
    padding: 12,
    flex: 1,
  },
  statNumber: {
    fontFamily: SERIF_BOLD,
    fontSize: 24,
    fontWeight: 700,
    marginTop: 2,
  },
  barRow: { marginBottom: 14 },
  barLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  barLabel: { fontSize: 10, fontWeight: 700, color: brand.navy },
  barScore: { fontSize: 10, color: brand.navy },
  barTrack: {
    height: 6,
    backgroundColor: '#EFE6D7',
  },
  barFill: { height: 6 },
  legend: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 10,
    paddingTop: 10,
    borderTop: `1pt solid ${brand.border}`,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendDot: { width: 8, height: 8 },
  legendText: { fontSize: 7.5, color: brand.textMuted, letterSpacing: 0.3 },
  footer: {
    marginTop: 24,
    paddingTop: 10,
    borderTop: `1pt solid ${brand.border}`,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: { fontSize: 8.5, color: brand.textMuted },
  ctaBox: {
    backgroundColor: brand.rust,
    padding: 16,
    marginTop: 14,
  },
  ctaTitle: { fontSize: 11, color: '#FFFFFF', fontWeight: 700, marginBottom: 4 },
  ctaBody: { fontSize: 9.5, color: '#FFE4D7', lineHeight: 1.5 },
});

const PEER = 60;

function priorityLabel(p: string): string {
  if (p === 'critical') return 'Kritiek';
  if (p === 'attention') return 'Aandacht';
  if (p === 'adequate') return 'Voldoende';
  if (p === 'strong') return 'Sterk';
  return '';
}

function urgencyLabel(u?: string): string {
  if (u === 'high') return 'Hoog';
  if (u === 'medium') return 'Gemiddeld';
  if (u === 'low') return 'Laag';
  return '—';
}

function urgencyColor(u?: string): string {
  if (u === 'high') return brand.rust;
  if (u === 'medium') return '#C28A2C';
  return '#5E8A4E';
}

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

export function ReportDocument(props: ReportProps) {
  const {
    name,
    company,
    totalScore,
    byDimension,
    weakest,
    offer,
    generatedAt = new Date().toLocaleDateString('nl-NL'),
    report,
  } = props;

  const offerInfo = offerMap[offer];
  const firstName = name.split(' ')[0] || name;
  const dimensionEntries = Object.entries(byDimension) as [Dimension, number][];
  const belowPeer = dimensionEntries.filter(([, sc]) => sc < PEER).length;
  const totalDims = dimensionEntries.length;

  // Top 3 zwakste dimensies voor diepteanalyse
  const weakestDims = report && Array.isArray(report.dimensionAnalysis)
    ? [...report.dimensionAnalysis].sort((a, b) => a.score - b.score).slice(0, 3)
    : [];
  const insights = report && Array.isArray(report.keyInsights) ? report.keyInsights.slice(0, 4) : [];

  return (
    <Document title={`AI Readiness Rapport — ${company}`}>

      {/* ═══════════ PAGE 1 — COVER ═══════════════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <Text style={s.eyebrow}>Het Rapport · {generatedAt}</Text>
        <Text style={s.h1}>
          {report?.scoreProfile?.profileLabel || 'AI Readiness Profiel'}
        </Text>
        <Text style={{ fontSize: 13, color: brand.navySoft, marginBottom: 4 }}>{company}</Text>
        <Text style={{ fontSize: 10, color: brand.textMuted, marginBottom: 28 }}>
          Voor {name}
        </Text>

        {report?.executiveSummary ? (
          <View style={s.cardAccent}>
            <Text style={s.smallLabel}>Executive Summary</Text>
            <Text style={s.bodyLarge}>{report.executiveSummary}</Text>
          </View>
        ) : null}

        {/* Quick stats — 3 boxes side by side */}
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 8 }}>
          <View style={s.statBox}>
            <Text style={s.muted}>Totaalscore</Text>
            <Text style={[s.statNumber, { color: brand.navy }]}>
              {totalScore}
              <Text style={{ fontSize: 13, color: brand.textMuted }}> / 75</Text>
            </Text>
          </View>
          <View style={s.statBox}>
            <Text style={s.muted}>Onder mediaan</Text>
            <Text style={[s.statNumber, { color: brand.rust }]}>
              {belowPeer}
              <Text style={{ fontSize: 13, color: brand.textMuted }}> / {totalDims}</Text>
            </Text>
            <Text style={[s.muted, { marginTop: 2 }]}>dimensies</Text>
          </View>
          <View style={s.statBox}>
            <Text style={s.muted}>Urgentie</Text>
            <Text style={[s.statNumber, { fontSize: 18, color: urgencyColor(report?.urgency), marginTop: 4 }]}>
              {urgencyLabel(report?.urgency)}
            </Text>
          </View>
        </View>

        <View style={s.footer}>
          <Text style={s.footerText}>Agentic Mindshift · Vertrouwelijk</Text>
          <Text style={s.footerText}>agenticmindshift.nl · 1</Text>
        </View>
      </Page>

      {/* ═══════════ PAGE 2 — HERO SCORECARD ══════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <Text style={s.eyebrow}>Scoreoverzicht</Text>
        <Text style={s.h1}>Uw profiel vs. vergelijkbare partijen</Text>
        <Text style={[s.body, { marginBottom: 16, maxWidth: 420 }]}>
          Elke dimensie afgezet tegen de mediaan van vergelijkbare organisaties in
          mid-market private equity en M&A. De peer-mediaan ligt op {PEER}/100.
        </Text>

        {/* Hero kaart met badge bovenop */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}>
          <View
            style={{
              backgroundColor: brand.bgCard,
              border: `1pt solid ${brand.rust}`,
              paddingHorizontal: 10,
              paddingVertical: 6,
              marginRight: 12,
            }}
          >
            <Text style={{ fontFamily: SERIF_BOLD, fontSize: 18, fontWeight: 700, color: brand.rust }}>
              {belowPeer}/{totalDims}
            </Text>
            <Text style={{ fontSize: 7.5, color: brand.navySoft, marginTop: 2 }}>
              onder mediaan
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={s.h3}>Score per dimensie</Text>
            <Text style={s.muted}>Mid-market PE · vergelijkbare fondsen</Text>
          </View>
        </View>

        <View style={s.card}>
          {dimensionEntries.map(([dim, score]) => {
            const isBelow = score < PEER;
            const dimReport = report?.dimensionAnalysis?.find((d) => d.dimension === dim);
            const fillColor = isBelow ? brand.rust : brand.navyBar;
            const widthPct = `${Math.max(0, Math.min(100, score))}%` as `${number}%`;
            return (
              <View key={dim} style={s.barRow}>
                <View style={s.barLabelRow}>
                  <Text style={s.barLabel}>{dimensionLabels[dim]}</Text>
                  <Text style={s.barScore}>
                    {score}
                    <Text style={{ color: brand.textMuted }}> / 100</Text>
                    {dimReport?.priority ? (
                      <Text style={{ fontSize: 8, color: brand.textMuted }}>
                        {'  · '}{priorityLabel(dimReport.priority)}
                      </Text>
                    ) : null}
                  </Text>
                </View>
                {/* Track met fill — peer-mediaan tick via een tweede View die overlapt */}
                <View style={s.barTrack}>
                  <View style={[s.barFill, { width: widthPct, backgroundColor: fillColor }]} />
                </View>
                {/* Peer-mediaan as a thin horizontal segment in een nieuwe row */}
                <View
                  style={{
                    height: 4,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginTop: -3,
                  }}
                >
                  <View style={{ width: `${PEER}%` as `${number}%` }} />
                  <View style={{ width: 1, height: 10, backgroundColor: brand.peerLine }} />
                </View>
              </View>
            );
          })}

          <View style={s.legend}>
            <View style={s.legendItem}>
              <View style={[s.legendDot, { backgroundColor: brand.rust }]} />
              <Text style={s.legendText}>Onder mediaan</Text>
            </View>
            <View style={s.legendItem}>
              <View style={[s.legendDot, { backgroundColor: brand.navyBar }]} />
              <Text style={s.legendText}>Op / boven mediaan</Text>
            </View>
            <View style={s.legendItem}>
              <View style={{ width: 1, height: 10, backgroundColor: brand.peerLine }} />
              <Text style={s.legendText}>Peer-mediaan</Text>
            </View>
          </View>
        </View>

        {report?.scoreProfile?.profileExplanation ? (
          <View style={s.cardSoft}>
            <Text style={s.h3}>Wat dit zegt</Text>
            <Text style={s.body}>{report.scoreProfile.profileExplanation}</Text>
          </View>
        ) : null}

        {report?.urgencyExplanation ? (
          <View style={[s.cardSoft, { borderLeft: `2pt solid ${brand.rust}` }]}>
            <Text style={s.smallLabel}>Urgentiesignaal</Text>
            <Text style={s.body}>{report.urgencyExplanation}</Text>
          </View>
        ) : null}

        <View style={s.footer}>
          <Text style={s.footerText}>Agentic Mindshift · Vertrouwelijk</Text>
          <Text style={s.footerText}>agenticmindshift.nl · 2</Text>
        </View>
      </Page>

      {/* ═══════════ PAGE 3 — DIMENSIE DIEPTEANALYSE ═════════════════════ */}
      <Page size="A4" style={s.page}>
        <Text style={s.eyebrow}>Diepteanalyse</Text>
        <Text style={s.h1}>Per dimensie</Text>
        <Text style={[s.body, { marginBottom: 14, maxWidth: 460 }]}>
          De drie dimensies met de laagste score, met concrete duiding voor uw
          situatie en een direct uitvoerbare quick win.
        </Text>

        {weakestDims.length > 0 ? (
          weakestDims.map((dim) => (
            <View key={dim.dimension} style={s.card}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                <Text style={{ fontFamily: SERIF_BOLD, fontSize: 15, fontWeight: 700, color: brand.navy }}>
                  {dim.label}
                </Text>
                <Text style={{ fontSize: 13, fontWeight: 700, color: dim.score < PEER ? brand.rust : brand.navy }}>
                  {dim.score}
                  <Text style={{ fontSize: 10, color: brand.textMuted }}> / 100</Text>
                </Text>
              </View>
              <Text style={[s.body, { marginBottom: 10 }]}>{dim.assessment}</Text>
              <View style={[s.cardSoft, { marginBottom: 0 }]}>
                <Text style={s.smallLabel}>Quick Win</Text>
                <Text style={[s.body, { color: brand.navy }]}>{dim.quickWin}</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={s.card}>
            <Text style={s.h3}>Grootste aandachtspunten</Text>
            {weakest.map((w) => (
              <Text key={w} style={[s.body, { marginBottom: 4 }]}>· {w}</Text>
            ))}
          </View>
        )}

        <View style={s.footer}>
          <Text style={s.footerText}>Agentic Mindshift · Vertrouwelijk</Text>
          <Text style={s.footerText}>agenticmindshift.nl · 3</Text>
        </View>
      </Page>

      {/* ═══════════ PAGE 4 — BEDRIJFSCONTEXT + INZICHTEN ════════════════ */}
      <Page size="A4" style={s.page}>
        <Text style={s.eyebrow}>Bedrijfscontext</Text>
        <Text style={s.h1}>Wat wij zien bij {company}</Text>

        {report?.companyContext ? (
          <View style={s.card}>
            <View style={{ flexDirection: 'row', gap: 18, marginBottom: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={s.smallLabel}>Sector</Text>
                <Text style={[s.body, { color: brand.navy, fontWeight: 700 }]}>
                  {report.companyContext.sector}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.smallLabel}>Profiel</Text>
                <Text style={[s.body, { color: brand.navy, fontWeight: 700 }]}>
                  {report.companyContext.estimatedProfile}
                </Text>
              </View>
            </View>
            {report.companyContext.keyActivities ? (
              <Text style={[s.body, { marginBottom: 8 }]}>
                {report.companyContext.keyActivities}
              </Text>
            ) : null}
            {Array.isArray(report.companyContext.researchSignals) &&
            report.companyContext.researchSignals.length > 0 ? (
              <View style={{ marginTop: 6, paddingTop: 10, borderTop: `1pt solid ${brand.border}` }}>
                <Text style={s.smallLabel}>Online observaties</Text>
                {report.companyContext.researchSignals.map((sig, i) => (
                  <Text key={i} style={[s.body, { marginBottom: 3 }]}>· {sig}</Text>
                ))}
              </View>
            ) : null}
          </View>
        ) : null}

        <Text style={s.h2}>Kernobservaties</Text>
        {insights.length > 0
          ? insights.map((insight, i) => (
              <View key={i} style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
                <Text style={{ fontSize: 9, fontWeight: 700, color: brand.rust, paddingTop: 2, minWidth: 18 }}>
                  {String(i + 1).padStart(2, '0')}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.h3}>{insight.title}</Text>
                  <Text style={s.body}>{insight.body}</Text>
                </View>
              </View>
            ))
          : null}

        <View style={s.footer}>
          <Text style={s.footerText}>Agentic Mindshift · Vertrouwelijk</Text>
          <Text style={s.footerText}>agenticmindshift.nl · 4</Text>
        </View>
      </Page>

      {/* ═══════════ PAGE 5 — TRAJECT + CTA ══════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <Text style={s.eyebrow}>Vervolgstap</Text>
        <Text style={s.h1}>Aanbevolen traject voor {firstName}</Text>

        <View style={s.cardAccent}>
          <Text
            style={{
              fontFamily: SERIF_BOLD,
              fontSize: 20,
              fontWeight: 700,
              color: brand.navy,
              marginBottom: 8,
            }}
          >
            {report?.recommendedTrajectory?.offerName || offerInfo?.name || ''}
          </Text>
          <Text style={[s.bodyLarge, { marginBottom: 10 }]}>
            {report?.recommendedTrajectory?.rationale || offerInfo?.description || ''}
          </Text>

          {report?.recommendedTrajectory?.expectedOutcome ? (
            <View style={[s.cardSoft, { marginBottom: 8 }]}>
              <Text style={s.smallLabel}>Verwacht resultaat</Text>
              <Text style={s.body}>{report.recommendedTrajectory.expectedOutcome}</Text>
            </View>
          ) : null}

          {report?.recommendedTrajectory?.firstStep ? (
            <View style={[s.cardSoft, { borderLeft: `2pt solid ${brand.rust}` }]}>
              <Text style={s.smallLabel}>Eerste stap</Text>
              <Text style={[s.body, { color: brand.navy }]}>
                {report.recommendedTrajectory.firstStep}
              </Text>
            </View>
          ) : null}
        </View>

        <View style={s.ctaBox}>
          <Text style={s.ctaTitle}>Plan een sparring sessie van 20 minuten</Text>
          <Text style={s.ctaBody}>
            cal.com/wwdijkman/intake-call · wouter@agenticmindshift.nl
          </Text>
          <Text style={[s.ctaBody, { marginTop: 4 }]}>
            Geen verkoopgesprek — een toets of de aanbeveling aansluit op uw situatie.
          </Text>
        </View>

        <View style={{ marginTop: 28 }}>
          <Text style={[s.muted, { fontSize: 8 }]}>
            Agentic Mindshift Consultancy · Marius Bauerstraat 235 A 5, 1062 AL Amsterdam · KvK 99495945
          </Text>
          <Text style={[s.muted, { fontSize: 8, marginTop: 4 }]}>
            Dit rapport is gegenereerd met {report?.model || 'DeepSeek'} op basis van uw eigen
            scorecard-antwoorden. Vertrouwelijk; niet voor verspreiding zonder toestemming.
          </Text>
        </View>

        <View style={s.footer}>
          <Text style={s.footerText}>Agentic Mindshift · Vertrouwelijk</Text>
          <Text style={s.footerText}>agenticmindshift.nl · 5</Text>
        </View>
      </Page>
    </Document>
  );
}

export default ReportDocument;
