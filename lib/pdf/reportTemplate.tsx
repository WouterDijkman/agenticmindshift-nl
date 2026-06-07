/**
 * Editorial PDF rapport — cream/navy/rust palet, ≥10 pagina's.
 * Built-in fonts only: Times-Roman (serif, headlines) + Helvetica (sans, body).
 * Geen Font.register → geen netwerk-fetch → 100% betrouwbaar op Vercel.
 *
 * Pagina-overzicht:
 *  1. Cover + Executive Summary
 *  2. Scoreoverzicht (alle 6 dimensies vs peer-mediaan)
 *  3. Diepteanalyse — kritieke dimensie 1
 *  4. Diepteanalyse — kritieke dimensie 2
 *  5. Diepteanalyse — overige dimensies
 *  6. Bedrijfsprofiel (web research)
 *  7. Kernobservaties
 *  8. Vraag & Antwoord samenvatting
 *  9. Aanbevolen traject + onderbouwing
 * 10. 90-dagen roadmap
 * 11. Colofon / Over Agentic Mindshift
 */

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { dimensionLabels, questions, type Dimension } from '../questions';
import { offerMap, type OfferType, type Answers } from '../scoring';
import { type GeneratedReport } from '../report/types';

const SERIF = 'Times-Roman';
const SERIF_BOLD = 'Times-Bold';
const SANS = 'Helvetica';
const SANS_BOLD = 'Helvetica-Bold';

const brand = {
  bg: '#F7F2EB',
  bgCard: '#FFFFFF',
  bgCardSoft: '#FBF7F1',
  border: '#E5DDD0',
  borderMid: '#CFC0AD',
  navy: '#0B1F3A',
  navySoft: '#1F3556',
  textMuted: '#6B5E4E',
  rust: '#F14C1D',
  amber: '#C28A2C',
  green: '#5E8A4E',
  peerLine: '#A89C8A',
};

const PEER = 60;

const s = StyleSheet.create({
  page: {
    backgroundColor: brand.bg,
    color: brand.navy,
    paddingHorizontal: 50,
    paddingTop: 46,
    paddingBottom: 56,
    fontSize: 10.5,
    fontFamily: SANS,
  },
  eyebrow: {
    fontSize: 8.5,
    fontFamily: SANS_BOLD,
    color: brand.rust,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  eyebrowMuted: {
    fontSize: 8.5,
    fontFamily: SANS_BOLD,
    color: brand.textMuted,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  h1: {
    fontFamily: SERIF_BOLD,
    fontSize: 30,
    color: brand.navy,
    lineHeight: 1.2,
    marginBottom: 10,
  },
  h2: {
    fontFamily: SERIF_BOLD,
    fontSize: 20,
    color: brand.navy,
    marginBottom: 8,
  },
  h3: {
    fontFamily: SANS_BOLD,
    fontSize: 11.5,
    color: brand.navy,
    marginBottom: 4,
  },
  h4: {
    fontFamily: SANS_BOLD,
    fontSize: 10,
    color: brand.navy,
    marginBottom: 3,
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
  small: {
    fontSize: 8,
    color: brand.textMuted,
    letterSpacing: 0.2,
  },
  smallLabel: {
    fontFamily: SANS_BOLD,
    fontSize: 7.5,
    color: brand.rust,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  smallLabelMuted: {
    fontFamily: SANS_BOLD,
    fontSize: 7.5,
    color: brand.textMuted,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  card: {
    backgroundColor: brand.bgCard,
    border: `1pt solid ${brand.border}`,
    padding: 18,
    marginBottom: 12,
  },
  cardSoft: {
    backgroundColor: brand.bgCardSoft,
    border: `1pt solid ${brand.border}`,
    padding: 12,
    marginBottom: 10,
  },
  cardAccent: {
    backgroundColor: brand.bgCard,
    borderTop: `1pt solid ${brand.border}`,
    borderRight: `1pt solid ${brand.border}`,
    borderBottom: `1pt solid ${brand.border}`,
    borderLeft: `3pt solid ${brand.rust}`,
    padding: 18,
    marginBottom: 12,
  },
  cardCritical: {
    backgroundColor: brand.bgCard,
    borderTop: `1pt solid ${brand.border}`,
    borderRight: `1pt solid ${brand.border}`,
    borderBottom: `1pt solid ${brand.border}`,
    borderLeft: `4pt solid ${brand.rust}`,
    padding: 18,
    marginBottom: 12,
  },
  cardAmber: {
    backgroundColor: brand.bgCard,
    borderTop: `1pt solid ${brand.border}`,
    borderRight: `1pt solid ${brand.border}`,
    borderBottom: `1pt solid ${brand.border}`,
    borderLeft: `4pt solid ${brand.amber}`,
    padding: 18,
    marginBottom: 12,
  },
  cardGreen: {
    backgroundColor: brand.bgCard,
    borderTop: `1pt solid ${brand.border}`,
    borderRight: `1pt solid ${brand.border}`,
    borderBottom: `1pt solid ${brand.border}`,
    borderLeft: `4pt solid ${brand.green}`,
    padding: 18,
    marginBottom: 12,
  },
  statBox: {
    backgroundColor: brand.bgCardSoft,
    border: `1pt solid ${brand.border}`,
    padding: 12,
    flex: 1,
  },
  statNumber: {
    fontFamily: SERIF_BOLD,
    fontSize: 26,
    color: brand.navy,
    marginTop: 2,
  },
  barRow: { marginBottom: 13 },
  barLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  barLabel: { fontFamily: SANS_BOLD, fontSize: 10, color: brand.navy },
  barScore: { fontSize: 10, color: brand.navy },
  barTrack: { height: 6, backgroundColor: '#EFE6D7' },
  barFill: { height: 6 },
  legend: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 10,
    paddingTop: 8,
    borderTop: `1pt solid ${brand.border}`,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendDot: { width: 8, height: 8 },
  legendText: { fontSize: 7.5, color: brand.textMuted },
  footer: {
    marginTop: 'auto',
    paddingTop: 10,
    borderTop: `1pt solid ${brand.border}`,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: { fontSize: 8, color: brand.textMuted },
  ctaBox: {
    backgroundColor: brand.rust,
    padding: 16,
    marginTop: 14,
  },
  ctaTitle: { fontFamily: SANS_BOLD, fontSize: 12, color: '#FFFFFF', marginBottom: 4 },
  ctaBody: { fontSize: 9.5, color: '#FFE4D7', lineHeight: 1.5 },
  divider: {
    height: 1,
    backgroundColor: brand.border,
    marginVertical: 14,
  },
  pillCritical: {
    backgroundColor: '#FEF0EC',
    border: `1pt solid ${brand.rust}`,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  pillAmber: {
    backgroundColor: '#FEF8ED',
    border: `1pt solid ${brand.amber}`,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  pillGreen: {
    backgroundColor: '#EDF5EA',
    border: `1pt solid ${brand.green}`,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
});

// ── Helpers ──────────────────────────────────────────────────────────────────

function priorityColor(p?: string): string {
  if (p === 'critical') return brand.rust;
  if (p === 'attention') return brand.amber;
  if (p === 'adequate') return brand.textMuted;
  if (p === 'strong') return brand.green;
  return brand.textMuted;
}

function priorityCardStyle(p?: string) {
  if (p === 'critical') return s.cardCritical;
  if (p === 'attention') return s.cardAmber;
  if (p === 'strong') return s.cardGreen;
  return s.card;
}

function priorityPillStyle(p?: string) {
  if (p === 'critical') return s.pillCritical;
  if (p === 'attention') return s.pillAmber;
  if (p === 'strong') return s.pillGreen;
  return s.cardSoft;
}

function priorityLabel(p?: string): string {
  if (p === 'critical') return '⚑ Kritiek';
  if (p === 'attention') return '◆ Aandacht';
  if (p === 'adequate') return '○ Voldoende';
  if (p === 'strong') return '✓ Sterk';
  return '–';
}

function urgencyLabel(u?: string): string {
  if (u === 'high') return 'Hoog';
  if (u === 'medium') return 'Gemiddeld';
  if (u === 'low') return 'Laag';
  return '—';
}

function urgencyColor(u?: string): string {
  if (u === 'high') return brand.rust;
  if (u === 'medium') return brand.amber;
  return brand.green;
}

function footerEl(page: number, total: number) {
  return (
    <View style={s.footer}>
      <Text style={s.footerText}>Agentic Mindshift · Vertrouwelijk</Text>
      <Text style={s.footerText}>{`agenticmindshift.nl · ${page} van ${total}`}</Text>
    </View>
  );
}

function getOptionLabel(questionId: string, letter?: string): string {
  if (!letter) return '—';
  const q = questions.find((q) => q.id === questionId);
  if (!q) return letter;
  const opt = q.options.find((o) => o.letter === letter);
  return opt ? opt.label : letter;
}

// ── Props ────────────────────────────────────────────────────────────────────

export interface ReportProps {
  name: string;
  company: string;
  totalScore: number;
  byDimension: Record<Dimension, number>;
  weakest: string[];
  offer: OfferType;
  generatedAt?: string;
  report?: GeneratedReport;
  answers?: Answers;
}

// ── Document ─────────────────────────────────────────────────────────────────

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
    answers,
  } = props;

  const offerInfo = offerMap[offer];
  const firstName = name.split(' ')[0] || name;
  const dimensionEntries = Object.entries(byDimension) as [Dimension, number][];
  const belowPeer = dimensionEntries.filter(([, sc]) => sc < PEER).length;
  const totalDims = dimensionEntries.length;

  // Sort dimensions by score for analysis pages
  const allDims = report?.dimensionAnalysis
    ? [...report.dimensionAnalysis].sort((a, b) => a.score - b.score)
    : [];
  const criticalDims = allDims.filter((d) => d.priority === 'critical');
  const attentionDims = allDims.filter((d) => d.priority === 'attention');
  const adequateDims = allDims.filter((d) => d.priority === 'adequate' || d.priority === 'strong');

  const insights = report?.keyInsights ? report.keyInsights.slice(0, 5) : [];

  // Q&A for summary page — group by section
  const sectionTitles: Record<number, string> = {
    1: 'Uw analytische aanpak vandaag',
    2: 'Deal- en analysecyclus',
    3: 'Portefeuille, financiering en monitoring',
    4: 'Team en kennisbeheer',
  };

  const TOTAL_PAGES = 11;

  return (
    <Document title={`AI Readiness Rapport — ${company}`} author="Agentic Mindshift">

      {/* ══════════════════════════════════════════════════════════════════════
          PAGINA 1 — COVER
          ══════════════════════════════════════════════════════════════════════ */}
      <Page size="A4" style={s.page}>
        {/* Top rule */}
        <View style={{ height: 3, backgroundColor: brand.rust, marginBottom: 36 }} />

        <Text style={s.eyebrow}>AI Readiness Scorecard · {generatedAt}</Text>
        <Text style={s.h1}>
          {report?.scoreProfile?.profileLabel || 'AI Readiness Profiel'}
        </Text>
        <Text style={{ fontFamily: SERIF_BOLD, fontSize: 15, color: brand.navySoft, marginBottom: 4 }}>
          {company}
        </Text>
        <Text style={{ fontSize: 10, color: brand.textMuted, marginBottom: 32 }}>
          Opgesteld voor {name}
        </Text>

        {/* Executive Summary */}
        {report?.executiveSummary ? (
          <View style={s.cardAccent}>
            <Text style={s.smallLabel}>Executive Summary</Text>
            <Text style={s.bodyLarge}>{report.executiveSummary}</Text>
          </View>
        ) : null}

        {/* 4 stat boxes */}
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
          <View style={s.statBox}>
            <Text style={s.smallLabelMuted}>Totaalscore</Text>
            <Text style={[s.statNumber, { color: brand.navy }]}>
              {totalScore}
            </Text>
            <Text style={{ fontSize: 9, color: brand.textMuted }}>van 75 punten</Text>
          </View>
          <View style={s.statBox}>
            <Text style={s.smallLabelMuted}>Onder mediaan</Text>
            <Text style={[s.statNumber, { color: brand.rust }]}>
              {belowPeer}/{totalDims}
            </Text>
            <Text style={{ fontSize: 9, color: brand.textMuted }}>dimensies</Text>
          </View>
          <View style={s.statBox}>
            <Text style={s.smallLabelMuted}>Urgentie</Text>
            <Text style={[s.statNumber, { fontSize: 20, color: urgencyColor(report?.urgency), marginTop: 6 }]}>
              {urgencyLabel(report?.urgency)}
            </Text>
          </View>
          <View style={s.statBox}>
            <Text style={s.smallLabelMuted}>Traject</Text>
            <Text style={{ fontFamily: SANS_BOLD, fontSize: 9.5, color: brand.navy, marginTop: 4, lineHeight: 1.4 }}>
              {report?.recommendedTrajectory?.offerName || offerInfo?.name || '–'}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
          <View style={{ flex: 2, backgroundColor: brand.bgCardSoft, border: `1pt solid ${brand.border}`, padding: 12 }}>
            <Text style={s.smallLabelMuted}>Zwakste dimensies</Text>
            {weakest.map((w, i) => (
              <Text key={i} style={{ fontSize: 10, color: brand.rust, marginTop: 2 }}>· {w}</Text>
            ))}
          </View>
          <View style={{ flex: 3, backgroundColor: brand.bgCardSoft, border: `1pt solid ${brand.border}`, padding: 12 }}>
            <Text style={s.smallLabelMuted}>Sterkste dimensies</Text>
            {dimensionEntries
              .sort((a, b) => b[1] - a[1])
              .slice(0, 2)
              .map(([dim, score]) => (
                <Text key={dim} style={{ fontSize: 10, color: brand.green, marginTop: 2 }}>
                  · {dimensionLabels[dim]} ({score}/100)
                </Text>
              ))}
          </View>
        </View>

        {footerEl(1, TOTAL_PAGES)}
      </Page>

      {/* ══════════════════════════════════════════════════════════════════════
          PAGINA 2 — SCOREOVERZICHT (6 dimensies vs peer)
          ══════════════════════════════════════════════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <Text style={s.eyebrow}>Scoreoverzicht</Text>
        <Text style={s.h1}>Uw profiel vs. peer-mediaan</Text>
        <Text style={[s.body, { marginBottom: 16 }]}>
          Elke dimensie afgezet tegen de mediaan van vergelijkbare partijen in
          het Europese mid-market (private equity, M&A, corporate finance).
          De peer-mediaan staat op {PEER}/100. Rood = onder mediaan.
        </Text>

        <View style={s.card}>
          {dimensionEntries
            .sort((a, b) => a[1] - b[1])
            .map(([dim, score]) => {
              const isBelow = score < PEER;
              const dimReport = report?.dimensionAnalysis?.find((d) => d.dimension === dim);
              const fillColor = isBelow ? brand.rust : brand.navySoft;
              const pct = `${Math.max(0, Math.min(100, score))}%` as `${number}%`;
              return (
                <View key={dim} style={s.barRow}>
                  <View style={s.barLabelRow}>
                    <Text style={s.barLabel}>{dimensionLabels[dim]}</Text>
                    <Text style={[s.barScore, { color: isBelow ? brand.rust : brand.navySoft }]}>
                      {score} / 100{dimReport?.priority ? `  · ${priorityLabel(dimReport.priority)}` : ''}
                    </Text>
                  </View>
                  <View style={s.barTrack}>
                    <View style={[s.barFill, { width: pct, backgroundColor: fillColor }]} />
                  </View>
                  {/* Peer tick */}
                  <View style={{ height: 4, flexDirection: 'row', alignItems: 'flex-start', marginTop: -2 }}>
                    <View style={{ width: `${PEER}%` as `${number}%` }} />
                    <View style={{ width: 1, height: 9, backgroundColor: brand.peerLine }} />
                  </View>
                </View>
              );
            })}

          <View style={s.legend}>
            <View style={s.legendItem}>
              <View style={[s.legendDot, { backgroundColor: brand.rust }]} />
              <Text style={s.legendText}>Onder peer-mediaan</Text>
            </View>
            <View style={s.legendItem}>
              <View style={[s.legendDot, { backgroundColor: brand.navySoft }]} />
              <Text style={s.legendText}>Op / boven mediaan</Text>
            </View>
            <View style={s.legendItem}>
              <View style={{ width: 1, height: 10, backgroundColor: brand.peerLine }} />
              <Text style={s.legendText}>Peer-mediaan (60)</Text>
            </View>
          </View>
        </View>

        {report?.scoreProfile?.profileExplanation ? (
          <View style={s.cardSoft}>
            <Text style={s.smallLabel}>Profielduidering</Text>
            <Text style={s.body}>{report.scoreProfile.profileExplanation}</Text>
          </View>
        ) : null}

        {footerEl(2, TOTAL_PAGES)}
      </Page>

      {/* ══════════════════════════════════════════════════════════════════════
          PAGINA 3 — KRITIEKE DIMENSIES (critical priority)
          ══════════════════════════════════════════════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <Text style={s.eyebrow}>Diepteanalyse · Kritieke aandachtspunten</Text>
        <Text style={s.h1}>Waar actie het meest urgent is</Text>
        <Text style={[s.body, { marginBottom: 16 }]}>
          De dimensies met prioriteit 'Kritiek' vragen directe aandacht. Ze liggen het
          verst onder de peer-mediaan en vormen de grootste rem op uw analytische kwaliteit.
        </Text>

        {criticalDims.length > 0 ? (
          criticalDims.map((dim) => (
            <View key={dim.dimension} style={s.cardCritical}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: SANS_BOLD, fontSize: 7.5, color: brand.rust, letterSpacing: 1.6, textTransform: 'uppercase', marginBottom: 3 }}>
                    ⚑  Kritiek
                  </Text>
                  <Text style={{ fontFamily: SERIF_BOLD, fontSize: 16, color: brand.navy }}>{dim.label}</Text>
                </View>
                <View style={{ backgroundColor: brand.rust, paddingHorizontal: 10, paddingVertical: 5, marginLeft: 12 }}>
                  <Text style={{ fontFamily: SERIF_BOLD, fontSize: 16, color: '#FFFFFF' }}>{dim.score}</Text>
                  <Text style={{ fontSize: 7.5, color: '#FFD4C7', textAlign: 'center' }}>/ 100</Text>
                </View>
              </View>

              {/* Mini-bar */}
              <View style={{ height: 4, backgroundColor: '#EFE6D7', marginBottom: 12 }}>
                <View style={{ height: 4, width: `${dim.score}%` as `${number}%`, backgroundColor: brand.rust }} />
              </View>

              <Text style={s.body}>{dim.assessment}</Text>

              <View style={[s.cardSoft, { marginTop: 10, marginBottom: 0 }]}>
                <Text style={s.smallLabel}>Direct uitvoerbare quick win</Text>
                <Text style={[s.body, { color: brand.navy }]}>{dim.quickWin}</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={s.cardSoft}>
            <Text style={s.body}>Geen dimensies met kritieke prioriteit gevonden op basis van uw scorecard.</Text>
          </View>
        )}

        {footerEl(3, TOTAL_PAGES)}
      </Page>

      {/* ══════════════════════════════════════════════════════════════════════
          PAGINA 4 — AANDACHTSDIMENSIES (attention priority)
          ══════════════════════════════════════════════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <Text style={s.eyebrow}>Diepteanalyse · Verbeterpotentieel</Text>
        <Text style={s.h1}>Dimensies met ruimte voor verbetering</Text>
        <Text style={[s.body, { marginBottom: 16 }]}>
          De dimensies met prioriteit 'Aandacht' liggen onder de peer-mediaan maar
          zijn niet acuut. Met gerichte actie kunnen zij snel op niveau worden gebracht.
        </Text>

        {attentionDims.length > 0 ? (
          attentionDims.map((dim) => (
            <View key={dim.dimension} style={s.cardAmber}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: SANS_BOLD, fontSize: 7.5, color: brand.amber, letterSpacing: 1.6, textTransform: 'uppercase', marginBottom: 3 }}>
                    ◆  Aandacht
                  </Text>
                  <Text style={{ fontFamily: SERIF_BOLD, fontSize: 16, color: brand.navy }}>{dim.label}</Text>
                </View>
                <View style={{ backgroundColor: brand.amber, paddingHorizontal: 10, paddingVertical: 5, marginLeft: 12 }}>
                  <Text style={{ fontFamily: SERIF_BOLD, fontSize: 16, color: '#FFFFFF' }}>{dim.score}</Text>
                  <Text style={{ fontSize: 7.5, color: '#FFF3D0', textAlign: 'center' }}>/ 100</Text>
                </View>
              </View>

              <View style={{ height: 4, backgroundColor: '#EFE6D7', marginBottom: 12 }}>
                <View style={{ height: 4, width: `${dim.score}%` as `${number}%`, backgroundColor: brand.amber }} />
              </View>

              <Text style={s.body}>{dim.assessment}</Text>

              <View style={[s.cardSoft, { marginTop: 10, marginBottom: 0 }]}>
                <Text style={[s.smallLabel, { color: brand.amber }]}>Quick win</Text>
                <Text style={[s.body, { color: brand.navy }]}>{dim.quickWin}</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={s.cardSoft}>
            <Text style={s.body}>Geen dimensies met aandachtsprioriteit gevonden.</Text>
          </View>
        )}

        {footerEl(4, TOTAL_PAGES)}
      </Page>

      {/* ══════════════════════════════════════════════════════════════════════
          PAGINA 5 — VOLDOENDE / STERKE DIMENSIES
          ══════════════════════════════════════════════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <Text style={s.eyebrow}>Diepteanalyse · Sterke punten</Text>
        <Text style={s.h1}>Wat u goed doet</Text>
        <Text style={[s.body, { marginBottom: 16 }]}>
          Deze dimensies scoren voldoende of sterk. Ze vormen uw operationele fundament
          en moeten worden geborgd bij AI-implementatie. Bouwen op sterkte is minstens
          zo strategisch als het repareren van zwaktes.
        </Text>

        {adequateDims.length > 0 ? (
          adequateDims.map((dim) => (
            <View key={dim.dimension} style={dim.priority === 'strong' ? s.cardGreen : s.card}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: SANS_BOLD, fontSize: 7.5, color: dim.priority === 'strong' ? brand.green : brand.textMuted, letterSpacing: 1.6, textTransform: 'uppercase', marginBottom: 3 }}>
                    {priorityLabel(dim.priority)}
                  </Text>
                  <Text style={{ fontFamily: SERIF_BOLD, fontSize: 15, color: brand.navy }}>{dim.label}</Text>
                </View>
                <View style={{ backgroundColor: dim.priority === 'strong' ? brand.green : brand.textMuted, paddingHorizontal: 8, paddingVertical: 4, marginLeft: 12 }}>
                  <Text style={{ fontFamily: SERIF_BOLD, fontSize: 14, color: '#FFFFFF' }}>{dim.score}</Text>
                  <Text style={{ fontSize: 7.5, color: '#FFFFFFAA', textAlign: 'center' }}>/ 100</Text>
                </View>
              </View>

              <View style={{ height: 4, backgroundColor: '#EFE6D7', marginBottom: 10 }}>
                <View style={{ height: 4, width: `${dim.score}%` as `${number}%`, backgroundColor: dim.priority === 'strong' ? brand.green : brand.textMuted }} />
              </View>

              <Text style={s.body}>{dim.assessment}</Text>

              {dim.quickWin ? (
                <View style={[s.cardSoft, { marginTop: 8, marginBottom: 0 }]}>
                  <Text style={[s.smallLabel, { color: brand.textMuted }]}>Verankering</Text>
                  <Text style={[s.body, { color: brand.navy }]}>{dim.quickWin}</Text>
                </View>
              ) : null}
            </View>
          ))
        ) : (
          <View style={s.card}>
            <Text style={s.body}>
              Elke dimensie valt in de categorie 'Aandacht' of 'Kritiek' — zie vorige
              pagina's voor de aanbevelingen.
            </Text>
          </View>
        )}

        {footerEl(5, TOTAL_PAGES)}
      </Page>

      {/* ══════════════════════════════════════════════════════════════════════
          PAGINA 6 — BEDRIJFSPROFIEL (web research)
          ══════════════════════════════════════════════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <Text style={s.eyebrow}>Bedrijfsprofiel</Text>
        <Text style={s.h1}>Onze kijk op {company}</Text>
        <Text style={[s.body, { marginBottom: 16 }]}>
          Dit profiel is opgesteld op basis van publiek beschikbare informatie (website, persberichten,
          sectordata) en uw eigen context. Het vormt de basis voor de bedrijfsspecifieke
          duiding in dit rapport.
        </Text>

        {report?.companyContext ? (
          <>
            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
              <View style={[s.statBox, { flex: 1 }]}>
                <Text style={s.smallLabelMuted}>Sector</Text>
                <Text style={{ fontFamily: SANS_BOLD, fontSize: 11, color: brand.navy, marginTop: 4 }}>
                  {report.companyContext.sector || '–'}
                </Text>
              </View>
              <View style={[s.statBox, { flex: 2 }]}>
                <Text style={s.smallLabelMuted}>Profiel</Text>
                <Text style={{ fontSize: 10.5, color: brand.navySoft, marginTop: 4, lineHeight: 1.5 }}>
                  {report.companyContext.estimatedProfile || '–'}
                </Text>
              </View>
            </View>

            {report.companyContext.keyActivities ? (
              <View style={s.card}>
                <Text style={s.smallLabel}>Kernactiviteiten</Text>
                <Text style={s.body}>{report.companyContext.keyActivities}</Text>
              </View>
            ) : null}

            {Array.isArray(report.companyContext.researchSignals) &&
            report.companyContext.researchSignals.length > 0 ? (
              <View style={s.card}>
                <Text style={s.smallLabel}>Bevindingen uit online onderzoek</Text>
                {report.companyContext.researchSignals.map((sig, i) => (
                  <View key={i} style={{ flexDirection: 'row', gap: 8, marginTop: 6 }}>
                    <Text style={{ fontSize: 9, color: brand.rust, marginTop: 2 }}>→</Text>
                    <Text style={[s.body, { flex: 1 }]}>{sig}</Text>
                  </View>
                ))}
              </View>
            ) : null}
          </>
        ) : (
          <View style={s.cardSoft}>
            <Text style={s.body}>
              Geen website opgegeven. Vul bij een volgend traject de bedrijfswebsite in
              voor een specifiek bedrijfsprofiel gebaseerd op actuele online informatie.
            </Text>
          </View>
        )}

        {report?.urgencyExplanation ? (
          <View style={s.cardAccent}>
            <Text style={s.smallLabel}>Urgentieverklaring</Text>
            <Text style={s.body}>{report.urgencyExplanation}</Text>
          </View>
        ) : null}

        {footerEl(6, TOTAL_PAGES)}
      </Page>

      {/* ══════════════════════════════════════════════════════════════════════
          PAGINA 7 — KERNOBSERVATIES
          ══════════════════════════════════════════════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <Text style={s.eyebrow}>Kernobservaties</Text>
        <Text style={s.h1}>Wat dit rapport ziet dat anderen missen</Text>
        <Text style={[s.body, { marginBottom: 18 }]}>
          De vijf strategisch meest relevante observaties, specifiek voor uw situatie en sector.
          Elk inzicht is direct gekoppeld aan uw scorecard-antwoorden en online bedrijfsprofiel.
        </Text>

        {insights.length > 0 ? (
          insights.map((insight, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: 12, marginBottom: 14 }}>
              <View style={{ width: 28, height: 28, backgroundColor: brand.rust, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Text style={{ fontFamily: SERIF_BOLD, fontSize: 13, color: '#FFFFFF' }}>
                  {String(i + 1)}
                </Text>
              </View>
              <View style={{ flex: 1, borderBottom: `1pt solid ${brand.border}`, paddingBottom: 12 }}>
                <Text style={{ fontFamily: SANS_BOLD, fontSize: 11, color: brand.navy, marginBottom: 4 }}>
                  {insight.title}
                </Text>
                <Text style={s.body}>{insight.body}</Text>
              </View>
            </View>
          ))
        ) : null}

        {footerEl(7, TOTAL_PAGES)}
      </Page>

      {/* ══════════════════════════════════════════════════════════════════════
          PAGINA 8 — VRAAG & ANTWOORD SAMENVATTING
          ══════════════════════════════════════════════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <Text style={s.eyebrow}>Scorecard resultaten</Text>
        <Text style={s.h1}>Vraag & Antwoord overzicht</Text>
        <Text style={[s.body, { marginBottom: 16 }]}>
          Uw antwoorden op de 15 scorecard-vragen. De analyse in dit rapport is volledig
          op deze input gebaseerd — aangevuld met extern onderzoek per bedrijf.
        </Text>

        {([1, 2, 3, 4] as const).map((section) => {
          const sectionQs = questions.filter((q) => q.section === section);
          return (
            <View key={section} style={{ marginBottom: 12 }}>
              <Text style={[s.smallLabel, { color: brand.navy, marginBottom: 6 }]}>
                {`Sectie ${section}: ${sectionTitles[section]}`}
              </Text>
              {sectionQs.map((q) => {
                const letter = answers?.[q.id];
                const optLabel = getOptionLabel(q.id, letter);
                const q_ = questions.find((x) => x.id === q.id);
                const pts = q_?.options.find((o) => o.letter === letter)?.points ?? 0;
                return (
                  <View key={q.id} style={{ flexDirection: 'row', gap: 8, marginBottom: 6 }}>
                    <Text style={{ fontSize: 8.5, fontFamily: SANS_BOLD, color: brand.rust, minWidth: 28 }}>
                      {q.id}
                    </Text>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 9, color: brand.textMuted, marginBottom: 2 }}>
                        {q.text.length > 80 ? q.text.slice(0, 77) + '…' : q.text}
                      </Text>
                      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                        <View style={{ backgroundColor: brand.bgCardSoft, border: `1pt solid ${brand.border}`, paddingHorizontal: 6, paddingVertical: 2 }}>
                          <Text style={{ fontSize: 8, color: brand.navy }}>
                            {letter ?? '–'} · {pts}/5
                          </Text>
                        </View>
                        <Text style={{ fontSize: 8.5, color: brand.navySoft, flex: 1 }}>
                          {optLabel.length > 90 ? optLabel.slice(0, 87) + '…' : optLabel}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          );
        })}

        {footerEl(8, TOTAL_PAGES)}
      </Page>

      {/* ══════════════════════════════════════════════════════════════════════
          PAGINA 9 — AANBEVOLEN TRAJECT
          ══════════════════════════════════════════════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <Text style={s.eyebrow}>Aanbeveling</Text>
        <Text style={s.h1}>Het meest passende traject voor {firstName}</Text>

        <View style={s.cardAccent}>
          <Text style={s.smallLabel}>Aanbevolen traject</Text>
          <Text style={{ fontFamily: SERIF_BOLD, fontSize: 22, color: brand.navy, marginBottom: 8 }}>
            {report?.recommendedTrajectory?.offerName || offerInfo?.name || '–'}
          </Text>
          <Text style={[s.bodyLarge, { marginBottom: 12 }]}>
            {report?.recommendedTrajectory?.rationale || offerInfo?.description || ''}
          </Text>

          {report?.recommendedTrajectory?.expectedOutcome ? (
            <View style={[s.cardSoft, { marginBottom: 8 }]}>
              <Text style={s.smallLabel}>Verwacht resultaat</Text>
              <Text style={s.body}>{report.recommendedTrajectory.expectedOutcome}</Text>
            </View>
          ) : null}

          {report?.recommendedTrajectory?.firstStep ? (
            <View style={[s.cardSoft, { borderLeft: `2pt solid ${brand.rust}`, marginBottom: 0 }]}>
              <Text style={s.smallLabel}>Eerste concrete stap</Text>
              <Text style={[s.body, { color: brand.navy }]}>{report.recommendedTrajectory.firstStep}</Text>
            </View>
          ) : null}
        </View>

        {/* Why this offer fits */}
        <Text style={[s.h3, { marginTop: 10 }]}>Waarom dit traject</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
          <View style={[s.statBox, { flex: 1, borderLeft: `2pt solid ${brand.rust}` }]}>
            <Text style={s.smallLabelMuted}>Uw score</Text>
            <Text style={[s.statNumber, { fontSize: 20 }]}>{totalScore}/75</Text>
          </View>
          <View style={[s.statBox, { flex: 1 }]}>
            <Text style={s.smallLabelMuted}>Aandacht vereist</Text>
            <Text style={[s.statNumber, { fontSize: 20, color: brand.rust }]}>{belowPeer} dim.</Text>
          </View>
          <View style={[s.statBox, { flex: 2 }]}>
            <Text style={s.smallLabelMuted}>Urgentie</Text>
            <Text style={[s.statNumber, { fontSize: 18, color: urgencyColor(report?.urgency), marginTop: 4 }]}>
              {urgencyLabel(report?.urgency)}
            </Text>
            {report?.urgencyExplanation ? (
              <Text style={[s.muted, { marginTop: 4 }]}>
                {report.urgencyExplanation.slice(0, 80)}...
              </Text>
            ) : null}
          </View>
        </View>

        <View style={s.ctaBox}>
          <Text style={s.ctaTitle}>Volgende stap: 20 minuten sparring</Text>
          <Text style={s.ctaBody}>
            cal.com/wwdijkman/intake-call · wouter@agenticmindshift.nl
          </Text>
          <Text style={[s.ctaBody, { marginTop: 4 }]}>
            Geen verkoopgesprek — een concrete toets of dit traject aansluit op uw situatie.
          </Text>
        </View>

        {footerEl(9, TOTAL_PAGES)}
      </Page>

      {/* ══════════════════════════════════════════════════════════════════════
          PAGINA 10 — 90-DAGEN ROADMAP
          ══════════════════════════════════════════════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <Text style={s.eyebrow}>Implementatieplan</Text>
        <Text style={s.h1}>90-dagen roadmap voor {firstName}</Text>
        <Text style={[s.body, { marginBottom: 18 }]}>
          Een concrete roadmap op basis van uw scorecard-profiel. Gefaseerd, zodat
          elke stap voortbouwt op de vorige — zonder de organisatie te overbelasten.
        </Text>

        {/* Fase 1 */}
        <View style={s.card}>
          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
            <View style={{ backgroundColor: brand.rust, paddingHorizontal: 8, paddingVertical: 4, alignSelf: 'flex-start' }}>
              <Text style={{ fontFamily: SANS_BOLD, fontSize: 9, color: '#FFFFFF' }}>FASE 1</Text>
              <Text style={{ fontSize: 7.5, color: '#FFD4C7' }}>Dag 1–30</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.h3}>Fundering leggen</Text>
            </View>
          </View>

          {report?.recommendedTrajectory?.firstStep ? (
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 6 }}>
              <Text style={{ fontSize: 9, color: brand.rust }}>→</Text>
              <Text style={s.body}>{report.recommendedTrajectory.firstStep}</Text>
            </View>
          ) : null}

          {criticalDims.slice(0, 2).map((dim, i) => (
            <View key={dim.dimension} style={{ flexDirection: 'row', gap: 8, marginBottom: 6 }}>
              <Text style={{ fontSize: 9, color: brand.rust }}>→</Text>
              <Text style={s.body}>
                <Text style={{ fontFamily: SANS_BOLD }}>{dim.label}:</Text>{' '}
                {dim.quickWin}
              </Text>
            </View>
          ))}
        </View>

        {/* Fase 2 */}
        <View style={s.card}>
          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
            <View style={{ backgroundColor: brand.amber, paddingHorizontal: 8, paddingVertical: 4, alignSelf: 'flex-start' }}>
              <Text style={{ fontFamily: SANS_BOLD, fontSize: 9, color: '#FFFFFF' }}>FASE 2</Text>
              <Text style={{ fontSize: 7.5, color: '#FFF0CC' }}>Dag 31–60</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.h3}>Processen optimaliseren</Text>
            </View>
          </View>

          {attentionDims.map((dim) => (
            <View key={dim.dimension} style={{ flexDirection: 'row', gap: 8, marginBottom: 6 }}>
              <Text style={{ fontSize: 9, color: brand.amber }}>→</Text>
              <Text style={s.body}>
                <Text style={{ fontFamily: SANS_BOLD }}>{dim.label}:</Text>{' '}
                {dim.quickWin}
              </Text>
            </View>
          ))}

          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 6 }}>
            <Text style={{ fontSize: 9, color: brand.amber }}>→</Text>
            <Text style={s.body}>
              Pilot-evaluatie na 60 dagen: meten wat werkt en bijsturen op basis van
              eerste resultaten in de praktijk.
            </Text>
          </View>
        </View>

        {/* Fase 3 */}
        <View style={s.card}>
          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
            <View style={{ backgroundColor: brand.green, paddingHorizontal: 8, paddingVertical: 4, alignSelf: 'flex-start' }}>
              <Text style={{ fontFamily: SANS_BOLD, fontSize: 9, color: '#FFFFFF' }}>FASE 3</Text>
              <Text style={{ fontSize: 7.5, color: '#D4EDCE' }}>Dag 61–90</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.h3}>Structureel verankeren</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 6 }}>
            <Text style={{ fontSize: 9, color: brand.green }}>→</Text>
            <Text style={s.body}>
              Sterke dimensies ({adequateDims.map((d) => d.label).join(', ')}) als
              fundament borgen en documenteren voor het volledige team.
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 6 }}>
            <Text style={{ fontSize: 9, color: brand.green }}>→</Text>
            <Text style={s.body}>
              AI-workflow geïntegreerd in de dagelijkse dossiervoorbereiding — niet
              als experiment, maar als standaard werkwijze.
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Text style={{ fontSize: 9, color: brand.green }}>→</Text>
            <Text style={s.body}>
              Opnieuw meten: herhaal de AI Readiness Scorecard na 90 dagen en
              vergelijk met dit rapport.
            </Text>
          </View>
        </View>

        {footerEl(10, TOTAL_PAGES)}
      </Page>

      {/* ══════════════════════════════════════════════════════════════════════
          PAGINA 11 — COLOFON / OVER AGENTIC MINDSHIFT
          ══════════════════════════════════════════════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <View style={{ height: 3, backgroundColor: brand.navy, marginBottom: 36 }} />

        <Text style={s.eyebrow}>Over de opsteller</Text>
        <Text style={s.h1}>Agentic Mindshift Consultancy</Text>

        <View style={[s.card, { marginBottom: 14 }]}>
          <Text style={[s.body, { marginBottom: 10 }]}>
            Agentic Mindshift helpt mid-market private equity fondsen, M&A-adviseurs en
            corporate financiers om AI structureel te benutten in hun analytische processen —
            van deal-screening tot portefeuillemonitoring.
          </Text>
          <Text style={[s.body, { marginBottom: 10 }]}>
            We werken uitsluitend in het segment waar het ertoe doet: complexe
            dossiers, hoge stakes, en een team dat al excellent is maar meer wil
            bereiken met dezelfde capaciteit.
          </Text>
          <Text style={s.body}>
            Onze aanpak is pragmatisch: geen frameworks, geen PowerPoint-trajecten.
            Wij implementeren AI daar waar het direct resultaat geeft — in uw dossiers,
            uw modellen, uw processen.
          </Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 14 }}>
          <View style={[s.statBox, { flex: 1 }]}>
            <Text style={s.smallLabelMuted}>Oprichter</Text>
            <Text style={{ fontFamily: SANS_BOLD, fontSize: 11, color: brand.navy, marginTop: 4 }}>Wouter Dijkman</Text>
            <Text style={s.muted}>Fractional AI Officer</Text>
            <Text style={[s.muted, { marginTop: 2 }]}>linkedin.com/in/wwdijkman</Text>
          </View>
          <View style={[s.statBox, { flex: 1 }]}>
            <Text style={s.smallLabelMuted}>Contact</Text>
            <Text style={{ fontSize: 10, color: brand.navy, marginTop: 4 }}>wouter@agenticmindshift.nl</Text>
            <Text style={[s.muted, { marginTop: 2 }]}>agenticmindshift.nl</Text>
            <Text style={[s.muted, { marginTop: 2 }]}>cal.com/wwdijkman/intake-call</Text>
          </View>
          <View style={[s.statBox, { flex: 1 }]}>
            <Text style={s.smallLabelMuted}>Registratie</Text>
            <Text style={{ fontSize: 10, color: brand.navy, marginTop: 4 }}>KvK 99495945</Text>
            <Text style={[s.muted, { marginTop: 2 }]}>Amsterdam</Text>
            <Text style={[s.muted, { marginTop: 2 }]}>Marius Bauerstraat 235 A 5{'\n'}1062 AL Amsterdam</Text>
          </View>
        </View>

        <View style={s.ctaBox}>
          <Text style={s.ctaTitle}>
            Dit rapport is uw startpunt — geen eindpunt
          </Text>
          <Text style={s.ctaBody}>
            Plan een gratis 20-minuten sessie om te bepalen of en hoe dit traject
            concreet voor uw organisatie werkt.
          </Text>
          <Text style={[s.ctaBody, { marginTop: 6, fontFamily: SANS_BOLD }]}>
            cal.com/wwdijkman/intake-call
          </Text>
        </View>

        <View style={{ marginTop: 24 }}>
          <View style={s.divider} />
          <Text style={[s.small, { marginBottom: 4 }]}>
            Dit rapport is vertrouwelijk en uitsluitend bestemd voor {name} bij {company}.
            Niet voor verdere verspreiding zonder schriftelijke toestemming van Agentic Mindshift Consultancy.
          </Text>
          <Text style={s.small}>
            Gegenereerd door {report?.model || 'DeepSeek'} op {generatedAt}, op basis van scorecard-antwoorden
            en publiek beschikbare bedrijfsinformatie. Agentic Mindshift Consultancy · KvK 99495945 ·
            agenticmindshift.nl
          </Text>
        </View>

        {footerEl(11, TOTAL_PAGES)}
      </Page>

    </Document>
  );
}

export default ReportDocument;
