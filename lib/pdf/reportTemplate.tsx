/**
 * Editorial PDF rapport — Agentic Mindshift huisstijl.
 * Eén font (SUSE, geometrisch-humanist), cream/navy/rust palet, scherpe hoeken,
 * site-stijl "data images" als vectorgraphics. Geen serif.
 *
 * SUSE wordt geregistreerd uit lib/pdf/fonts/*.ttf met een try/catch-fallback
 * naar Helvetica, zodat de PDF blijft renderen als de fonts ontbreken (bv. in
 * een omgeving waar de bundle ze niet meekreeg).
 *
 * Pagina-overzicht (8):
 *  1. Cover — verdict, data-image hero, executive summary, kerncijfers
 *  2. Scoreprofiel — 6 dimensies vs peer-mediaan + duiding
 *  3. Wat nu aandacht vraagt — kritieke + aandachtsdimensies
 *  4. Waar u op bouwt — sterke dimensies + kernobservaties
 *  5. Uw route bij Agentic Mindshift — concrete, geprijsde dienst + Factum
 *  6. Actieplan — value-at-stake + 30/90/180 dagen
 *  7. Bedrijfsprofiel + antwoordoverzicht
 *  8. Colofon / Over Agentic Mindshift
 */

import path from 'path';
import fs from 'fs';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { dimensionLabels, questions, type Dimension } from '../questions';
import { offerMap, type OfferType, type Answers } from '../scoring';
import { type GeneratedReport } from '../report/types';
import { type ReportLocale } from '../report/locale';
import { getPdfStrings, type PdfStrings } from './strings';
import { CoverDataPanel, ScoreGauge, DimensionBar } from './dataviz';
import { getOfferRoute, getRouteLadder, activeRungId } from './offerRoutes';

// ── Font registration (SUSE, met Helvetica-fallback) ─────────────────────────
let useSuse = false;
try {
  const dir = path.join(process.cwd(), 'lib', 'pdf', 'fonts');
  if (fs.existsSync(path.join(dir, 'SUSE-Regular.ttf'))) {
    Font.register({ family: 'SUSE', fonts: [{ src: path.join(dir, 'SUSE-Regular.ttf') }] });
    Font.register({ family: 'SUSE Medium', fonts: [{ src: path.join(dir, 'SUSE-Medium.ttf') }] });
    Font.register({ family: 'SUSE Bold', fonts: [{ src: path.join(dir, 'SUSE-Bold.ttf') }] });
    Font.register({ family: 'SUSE XBold', fonts: [{ src: path.join(dir, 'SUSE-ExtraBold.ttf') }] });
    Font.registerHyphenationCallback((w) => [w]); // geen woordafbreking
    useSuse = true;
  }
} catch {
  useSuse = false;
}

const SANS = useSuse ? 'SUSE' : 'Helvetica';
const SANS_MED = useSuse ? 'SUSE Medium' : 'Helvetica';
const SANS_BOLD = useSuse ? 'SUSE Bold' : 'Helvetica-Bold';
const SANS_XB = useSuse ? 'SUSE XBold' : 'Helvetica-Bold';

// ── Exacte huisstijlkleuren ──────────────────────────────────────────────────
const brand = {
  bg: '#F7F2EB',
  bgCard: '#FDFAF5',
  bgCardSoft: '#EFE7D9',
  border: '#E4E1DA',
  borderMid: '#CFC0AD',
  navy: '#0B1F3A',
  navySoft: '#0F2B4A',
  textMuted: '#3A5470',
  rust: '#F14C1D',
  amber: '#B45309',
  green: '#1A7A3C',
  peerLine: '#8E97A4',
  track: '#E7DECF',
};

const PEER = 60;

const s = StyleSheet.create({
  page: {
    backgroundColor: brand.bg,
    color: brand.navy,
    paddingHorizontal: 48,
    paddingTop: 44,
    paddingBottom: 50,
    fontSize: 10.5,
    fontFamily: SANS,
  },
  eyebrow: {
    fontSize: 8,
    fontFamily: SANS_BOLD,
    color: brand.rust,
    letterSpacing: 2.6,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  eyebrowMuted: {
    fontSize: 8,
    fontFamily: SANS_BOLD,
    color: brand.textMuted,
    letterSpacing: 2.6,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  h1: { fontFamily: SANS_XB, fontSize: 27, color: brand.navy, lineHeight: 1.15, marginBottom: 10 },
  h2: { fontFamily: SANS_XB, fontSize: 18, color: brand.navy, marginBottom: 8 },
  h3: { fontFamily: SANS_BOLD, fontSize: 11.5, color: brand.navy, marginBottom: 4 },
  body: { fontSize: 10.5, color: brand.navySoft, lineHeight: 1.65 },
  bodyLarge: { fontFamily: SANS_MED, fontSize: 12.5, color: brand.navy, lineHeight: 1.55 },
  muted: { fontSize: 9, color: brand.textMuted, lineHeight: 1.5 },
  small: { fontSize: 8, color: brand.textMuted, letterSpacing: 0.2, lineHeight: 1.5 },
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
  card: { backgroundColor: brand.bgCard, border: `1pt solid ${brand.border}`, padding: 16, marginBottom: 11 },
  cardSoft: { backgroundColor: brand.bgCardSoft, border: `1pt solid ${brand.border}`, padding: 12, marginBottom: 10 },
  cardAccent: {
    backgroundColor: brand.bgCard,
    borderTop: `1pt solid ${brand.border}`,
    borderRight: `1pt solid ${brand.border}`,
    borderBottom: `1pt solid ${brand.border}`,
    borderLeft: `3pt solid ${brand.rust}`,
    padding: 16,
    marginBottom: 11,
  },
  statBox: { backgroundColor: brand.bgCardSoft, border: `1pt solid ${brand.border}`, padding: 11, flex: 1 },
  statNumber: { fontFamily: SANS_XB, fontSize: 24, color: brand.navy, marginTop: 2 },
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
    position: 'absolute',
    bottom: 28,
    left: 48,
    right: 48,
    paddingTop: 9,
    borderTop: `1pt solid ${brand.border}`,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: { fontSize: 8, color: brand.textMuted },
  ctaBox: { backgroundColor: brand.rust, padding: 16, marginTop: 14 },
  ctaTitle: { fontFamily: SANS_BOLD, fontSize: 12, color: '#FFFFFF', marginBottom: 4 },
  ctaBody: { fontSize: 9.5, color: '#FFE4D7', lineHeight: 1.5 },
  divider: { height: 1, backgroundColor: brand.border, marginVertical: 14 },
});

// ── Helpers ──────────────────────────────────────────────────────────────────

function priorityColor(p?: string): string {
  if (p === 'critical') return brand.rust;
  if (p === 'attention') return brand.amber;
  if (p === 'strong') return brand.green;
  return brand.textMuted;
}
function priorityLabel(p: string | undefined, t: PdfStrings): string {
  if (p === 'critical') return t.priorityCritical;
  if (p === 'attention') return t.priorityAttention;
  if (p === 'adequate') return t.priorityAdequate;
  if (p === 'strong') return t.priorityStrong;
  return '–';
}
function urgencyLabel(u: string | undefined, t: PdfStrings): string {
  if (u === 'high') return t.urgencyHigh;
  if (u === 'medium') return t.urgencyMedium;
  if (u === 'low') return t.urgencyLow;
  return '—';
}
function urgencyColor(u?: string): string {
  if (u === 'high') return brand.rust;
  if (u === 'medium') return brand.amber;
  return brand.green;
}
function footerEl(t: PdfStrings) {
  return (
    <View style={s.footer} fixed>
      <Text style={s.footerText}>{t.footerConfidential}</Text>
      <Text style={s.footerText} render={({ pageNumber, totalPages }) => t.footerPage(pageNumber, totalPages)} />
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

/** Score-badge rechtsboven in een dimensiekaart. */
function ScoreBadge({ score, color }: { score: number; color: string }) {
  return (
    <View style={{ backgroundColor: color, paddingHorizontal: 10, paddingVertical: 5, marginLeft: 12, alignItems: 'center' }}>
      <Text style={{ fontFamily: SANS_XB, fontSize: 16, color: '#FFFFFF' }}>{score}</Text>
      <Text style={{ fontSize: 7, color: '#FFFFFFCC' }}>/ 100</Text>
    </View>
  );
}

/** Eén dimensiekaart (kritiek/aandacht/sterk). */
function DimensionCard({
  dim,
  t,
  showQuickWin = true,
}: {
  dim: { dimension: string; label: string; score: number; assessment: string; priority?: string; quickWin?: string };
  t: PdfStrings;
  showQuickWin?: boolean;
}) {
  const c = priorityColor(dim.priority);
  const quickLabel =
    dim.priority === 'critical' ? t.quickWinActionable : dim.priority === 'strong' ? t.anchoring : t.quickWin;
  return (
    <View
      style={{
        backgroundColor: brand.bgCard,
        borderTop: `1pt solid ${brand.border}`,
        borderRight: `1pt solid ${brand.border}`,
        borderBottom: `1pt solid ${brand.border}`,
        borderLeft: `4pt solid ${c}`,
        padding: 11,
        marginBottom: 8,
      }}
      wrap={false}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
        <View style={{ flex: 1, paddingRight: 8 }}>
          <Text style={{ fontFamily: SANS_BOLD, fontSize: 7.5, color: c, letterSpacing: 1.6, textTransform: 'uppercase', marginBottom: 3 }}>
            {priorityLabel(dim.priority, t)}
          </Text>
          <Text style={{ fontFamily: SANS_XB, fontSize: 15, color: brand.navy }}>{dim.label}</Text>
        </View>
        <ScoreBadge score={dim.score} color={c} />
      </View>
      <View style={{ marginBottom: 7 }}>
        <DimensionBar score={dim.score} peer={PEER} color={c} />
      </View>
      <Text style={[s.body, { lineHeight: 1.5 }]}>{dim.assessment}</Text>
      {showQuickWin && dim.quickWin ? (
        <View style={[s.cardSoft, { marginTop: 10, marginBottom: 0, borderLeft: `2pt solid ${c}` }]}>
          <Text style={[s.smallLabel, { color: c }]}>{quickLabel}</Text>
          <Text style={[s.body, { color: brand.navy }]}>{dim.quickWin}</Text>
        </View>
      ) : null}
    </View>
  );
}

/** Compacte dimensiekaart — voor aandachtspunten (dichtere lijst, geen losse quick-win-box). */
function CompactDimCard({
  dim,
  t,
}: {
  dim: { dimension: string; label: string; score: number; assessment: string; priority?: string; quickWin?: string };
  t: PdfStrings;
}) {
  const c = priorityColor(dim.priority);
  return (
    <View
      style={{
        backgroundColor: brand.bgCard,
        borderTop: `1pt solid ${brand.border}`,
        borderRight: `1pt solid ${brand.border}`,
        borderBottom: `1pt solid ${brand.border}`,
        borderLeft: `3pt solid ${c}`,
        paddingVertical: 7,
        paddingHorizontal: 12,
        marginBottom: 5,
      }}
      wrap={false}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1, paddingRight: 8 }}>
          <Text style={{ fontFamily: SANS_XB, fontSize: 11.5, color: brand.navy }}>{dim.label}</Text>
          <Text style={{ fontFamily: SANS_BOLD, fontSize: 7, color: c, letterSpacing: 1.2, textTransform: 'uppercase' }}>
            {priorityLabel(dim.priority, t)}
          </Text>
        </View>
        <View style={{ width: 84 }}>
          <DimensionBar score={dim.score} peer={PEER} color={c} />
        </View>
        <Text style={{ fontFamily: SANS_XB, fontSize: 11, color: c, minWidth: 26, textAlign: 'right' }}>{dim.score}</Text>
      </View>
      <Text style={[s.body, { fontSize: 9.3, lineHeight: 1.38 }]}>{dim.assessment}</Text>
      {dim.quickWin ? (
        <Text style={{ fontSize: 8.7, color: brand.navy, marginTop: 3, lineHeight: 1.35 }}>
          <Text style={{ fontFamily: SANS_BOLD, color: c }}>{t.quickWin}: </Text>
          {dim.quickWin}
        </Text>
      ) : null}
    </View>
  );
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
  locale?: ReportLocale;
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
    locale = 'nl',
  } = props;

  const t = getPdfStrings(locale);
  const offerInfo = offerMap[offer];
  const firstName = name.split(' ')[0] || name;
  const dimensionEntries = Object.entries(byDimension) as [Dimension, number][];
  const belowPeer = dimensionEntries.filter(([, sc]) => sc < PEER).length;
  const totalDims = dimensionEntries.length;

  const allDims = report?.dimensionAnalysis ? [...report.dimensionAnalysis].sort((a, b) => a.score - b.score) : [];
  const criticalDims = allDims.filter((d) => d.priority === 'critical');
  const attentionDims = allDims.filter((d) => d.priority === 'attention');
  const adequateDims = allDims.filter((d) => d.priority === 'adequate' || d.priority === 'strong');
  const actionDims = [...criticalDims, ...attentionDims];

  const insights = report?.keyInsights ? report.keyInsights.slice(0, 4) : [];
  const sectionTitles = t.sectionTitles;
  const services = report?.serviceOpportunities?.slice(0, 4) ?? [];

  // Deterministische AM-route (uit Q4 → offer)
  const route = getOfferRoute(locale, offer);
  const ladder = getRouteLadder(locale);
  const activeId = activeRungId(offer);
  const routeUsesFactum = activeId === 'dd';

  const traj = report?.recommendedTrajectory;
  const routeName = traj?.offerName || route?.offerName || offerInfo?.name || '–';

  return (
    <Document title={`AI Readiness Report — ${company}`} author="Agentic Mindshift">

      {/* ═══ PAGINA 1 — COVER ═══ */}
      <Page size="A4" style={s.page}>
        <View style={{ height: 3, backgroundColor: brand.rust, marginBottom: 26 }} />

        <Text style={s.eyebrow}>{t.coverEyebrow} · {generatedAt}</Text>
        <Text style={s.h1}>{report?.scoreProfile?.profileLabel || t.profileFallback}</Text>
        <Text style={{ fontFamily: SANS_BOLD, fontSize: 14, color: brand.navySoft, marginBottom: 3 }}>{company}</Text>
        <Text style={{ fontSize: 9.5, color: brand.textMuted, marginBottom: 18 }}>{t.preparedFor(name)}</Text>

        {/* Data-image hero */}
        <View style={{ marginBottom: 16 }}>
          <CoverDataPanel height={132} />
        </View>

        {/* Executive summary */}
        {report?.executiveSummary ? (
          <View style={s.cardAccent}>
            <Text style={s.smallLabel}>{t.execSummary}</Text>
            <Text style={s.bodyLarge}>{report.executiveSummary}</Text>
          </View>
        ) : null}

        {/* Kerncijfers: gauge + 3 stats */}
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 4, alignItems: 'stretch' }}>
          <View style={[s.statBox, { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1.4 }]}>
            <View style={{ position: 'relative', width: 64, height: 64, alignItems: 'center', justifyContent: 'center' }}>
              <ScoreGauge value={totalScore} max={75} size={64} color={brand.rust} />
              <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontFamily: SANS_XB, fontSize: 17, color: brand.navy }}>{totalScore}</Text>
                <Text style={{ fontSize: 6.5, color: brand.textMuted }}>/ 75</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.smallLabelMuted}>{t.totalScore}</Text>
              <Text style={{ fontSize: 9, color: brand.textMuted, lineHeight: 1.4 }}>
                {report?.scoreProfile?.percentile ? t.percentileNote(report.scoreProfile.percentile) : t.outOf75}
              </Text>
            </View>
          </View>
          <View style={s.statBox}>
            <Text style={s.smallLabelMuted}>{t.belowMedian}</Text>
            <Text style={[s.statNumber, { color: brand.rust }]}>{belowPeer}/{totalDims}</Text>
            <Text style={{ fontSize: 8.5, color: brand.textMuted }}>{t.dimensions}</Text>
          </View>
          <View style={s.statBox}>
            <Text style={s.smallLabelMuted}>{t.urgency}</Text>
            <Text style={[s.statNumber, { fontSize: 17, color: urgencyColor(report?.urgency), marginTop: 7 }]}>
              {urgencyLabel(report?.urgency, t)}
            </Text>
          </View>
        </View>

        <View style={[s.statBox, { marginTop: 8, flexGrow: 0, flexShrink: 0, flexDirection: 'row', alignItems: 'center', gap: 10 }]}>
          <View style={{ width: 4, height: 30, backgroundColor: brand.rust }} />
          <View style={{ flex: 1 }}>
            <Text style={s.smallLabelMuted}>{t.track}</Text>
            <Text style={{ fontFamily: SANS_BOLD, fontSize: 11, color: brand.navy, marginTop: 2 }}>{routeName}</Text>
          </View>
          {route?.price ? <Text style={{ fontFamily: SANS_BOLD, fontSize: 9, color: brand.rust }}>{route.price}</Text> : null}
        </View>

        {footerEl(t)}
      </Page>

      {/* ═══ PAGINA 2 — SCOREPROFIEL ═══ */}
      <Page size="A4" style={s.page}>
        <Text style={s.eyebrow}>{t.scoreOverview}</Text>
        <Text style={s.h1}>{t.scoreOverviewTitle}</Text>
        <Text style={[s.body, { marginBottom: 16 }]}>{t.scoreOverviewIntro(PEER)}</Text>

        <View style={s.card}>
          {dimensionEntries
            .sort((a, b) => a[1] - b[1])
            .map(([dim, score]) => {
              const isBelow = score < PEER;
              const dimReport = report?.dimensionAnalysis?.find((d) => d.dimension === dim);
              const fillColor = isBelow ? brand.rust : brand.navySoft;
              return (
                <View key={dim} style={{ marginBottom: 12 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text style={{ fontFamily: SANS_BOLD, fontSize: 10, color: brand.navy }}>{dimensionLabels[dim]}</Text>
                    <Text style={{ fontSize: 9.5, color: isBelow ? brand.rust : brand.navySoft }}>
                      {score} / 100{dimReport?.priority ? `  ·  ${priorityLabel(dimReport.priority, t)}` : ''}
                    </Text>
                  </View>
                  <DimensionBar score={score} peer={PEER} color={fillColor} />
                </View>
              );
            })}

          <View style={s.legend}>
            <View style={s.legendItem}>
              <View style={[s.legendDot, { backgroundColor: brand.rust }]} />
              <Text style={s.legendText}>{t.belowPeerMedian}</Text>
            </View>
            <View style={s.legendItem}>
              <View style={[s.legendDot, { backgroundColor: brand.navySoft }]} />
              <Text style={s.legendText}>{t.atOrAboveMedian}</Text>
            </View>
            <View style={s.legendItem}>
              <View style={{ width: 1, height: 10, backgroundColor: brand.peerLine }} />
              <Text style={s.legendText}>{t.peerMedianLegend(PEER)}</Text>
            </View>
          </View>
        </View>

        {report?.scoreProfile?.profileExplanation ? (
          <View style={s.cardAccent}>
            <Text style={s.smallLabel}>{t.profileExplanation}</Text>
            <Text style={s.body}>{report.scoreProfile.profileExplanation}</Text>
          </View>
        ) : null}

        <View style={{ flexDirection: 'row', gap: 8, marginTop: 2 }}>
          <View style={[s.statBox, { flex: 1 }]}>
            <Text style={s.smallLabelMuted}>{t.weakestDims}</Text>
            {weakest.map((w, i) => (
              <Text key={i} style={{ fontSize: 9.5, color: brand.rust, marginTop: 2 }}>· {w}</Text>
            ))}
          </View>
          <View style={[s.statBox, { flex: 1 }]}>
            <Text style={s.smallLabelMuted}>{t.strongestDims}</Text>
            {dimensionEntries
              .sort((a, b) => b[1] - a[1])
              .slice(0, 2)
              .map(([dim, score]) => (
                <Text key={dim} style={{ fontSize: 9.5, color: brand.green, marginTop: 2 }}>
                  · {dimensionLabels[dim]} ({score})
                </Text>
              ))}
          </View>
        </View>

        {footerEl(t)}
      </Page>

      {/* ═══ PAGINA 3 — WAT NU AANDACHT VRAAGT ═══ */}
      <Page size="A4" style={s.page}>
        <Text style={[s.eyebrow, { marginBottom: 8 }]}>{t.criticalEyebrow}</Text>
        <Text style={[s.h1, { marginBottom: 7 }]}>{t.criticalTitle}</Text>
        <Text style={[s.body, { marginBottom: 12 }]}>{t.criticalIntro}</Text>

        {actionDims.length > 0 ? (
          actionDims.map((dim) => <CompactDimCard key={dim.dimension} dim={dim} t={t} />)
        ) : (
          <View style={s.cardSoft}>
            <Text style={s.body}>{t.noCritical}</Text>
          </View>
        )}

        {footerEl(t)}
      </Page>

      {/* ═══ PAGINA 4 — WAAR U OP BOUWT / KERNINZICHTEN ═══ */}
      <Page size="A4" style={s.page}>
        <Text style={s.eyebrow}>{adequateDims.length > 0 ? t.strongEyebrow : t.strongEyebrowAlt}</Text>
        <Text style={s.h1}>{adequateDims.length > 0 ? t.strongTitle : t.strongTitleAlt}</Text>
        <Text style={[s.body, { marginBottom: 11 }]}>{adequateDims.length > 0 ? t.strongIntro : t.strongIntroAlt}</Text>

        {adequateDims.length > 0
          ? adequateDims.map((dim) => <DimensionCard key={dim.dimension} dim={dim} t={t} showQuickWin={false} />)
          : null}

        {insights.length > 0 ? (
          <View style={{ marginTop: 4 }}>
            <Text style={[s.smallLabel, { marginBottom: 6 }]}>{t.insightsEyebrow}</Text>
            {insights.map((insight, i) => (
              <View key={i} style={{ flexDirection: 'row', gap: 10, marginBottom: 7 }} wrap={false}>
                <View style={{ width: 22, height: 22, backgroundColor: brand.rust, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Text style={{ fontFamily: SANS_XB, fontSize: 11, color: '#FFFFFF' }}>{String(i + 1)}</Text>
                </View>
                <View style={{ flex: 1, borderBottom: `1pt solid ${brand.border}`, paddingBottom: 6 }}>
                  <Text style={{ fontFamily: SANS_BOLD, fontSize: 10.5, color: brand.navy, marginBottom: 2 }}>{insight.title}</Text>
                  <Text style={[s.body, { lineHeight: 1.5 }]}>{insight.body}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {footerEl(t)}
      </Page>

      {/* ═══ PAGINA 5 — UW ROUTE BIJ AGENTIC MINDSHIFT ═══ */}
      <Page size="A4" style={s.page}>
        <Text style={s.eyebrow}>{t.routeEyebrow}</Text>
        <Text style={[s.h1, { marginBottom: 7 }]}>{t.routeTitle(firstName)}</Text>
        <Text style={[s.body, { marginBottom: 8, fontSize: 10, lineHeight: 1.45 }]}>{t.routeIntro}</Text>

        {/* 4-route ladder */}
        <Text style={[s.smallLabelMuted, { marginBottom: 5 }]}>{t.routeLadderLabel}</Text>
        <View style={{ marginBottom: 9 }}>
          {ladder.map((rung) => {
            const isActive = rung.id === activeId;
            return (
              <View
                key={rung.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  marginBottom: 2,
                  backgroundColor: isActive ? brand.navy : brand.bgCardSoft,
                  borderLeft: `3pt solid ${isActive ? brand.rust : brand.border}`,
                }}
              >
                <Text style={{ fontFamily: SANS_BOLD, fontSize: 10.5, color: isActive ? '#FFFFFF' : brand.navy, flex: 1 }}>{rung.name}</Text>
                {rung.price ? (
                  <Text style={{ fontSize: 8.5, color: isActive ? '#C9D4E2' : brand.textMuted }}>{rung.price}</Text>
                ) : null}
                {isActive ? (
                  <View style={{ backgroundColor: brand.rust, paddingHorizontal: 7, paddingVertical: 3, marginLeft: 2 }}>
                    <Text style={{ fontFamily: SANS_BOLD, fontSize: 7, color: '#FFFFFF', letterSpacing: 1 }}>{t.routeActiveBadge}</Text>
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>

        {/* Actieve route detail */}
        <View style={[s.cardAccent, { padding: 12, marginBottom: 8 }]} wrap={false}>
          <Text style={s.smallLabel}>{t.routeRecommended}</Text>
          {/* Titel op eigen regel (1 regel), prijs eronder op volle breedte —
              robuust voor lange prijsregels (bv. offer E) in elke taal. */}
          <Text style={{ fontFamily: SANS_XB, fontSize: 16, color: brand.navy, marginBottom: route?.price ? 3 : 6 }}>{routeName}</Text>
          {route?.price ? (
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6, marginBottom: 7 }}>
              <Text style={[s.smallLabelMuted, { flexShrink: 0 }]}>{t.routePriceLabel}</Text>
              <Text style={{ fontFamily: SANS_BOLD, fontSize: 9, color: brand.rust, flex: 1 }}>{route.price}</Text>
            </View>
          ) : null}
          {traj?.rationale ? <Text style={[s.body, { marginBottom: 7, fontSize: 9.5, lineHeight: 1.42 }]}>{traj.rationale}</Text> : null}

          {route && route.interventions.length > 0 ? (
            <>
              <Text style={[s.smallLabel, { marginBottom: 4 }]}>{t.routeWhatYouGet}</Text>
              {route.interventions.map((iv, i) => (
                <View key={i} style={{ flexDirection: 'row', gap: 8, marginBottom: 3 }}>
                  <View style={{ width: 5, height: 5, backgroundColor: brand.rust, marginTop: 3.5 }} />
                  <Text style={[s.body, { flex: 1, fontSize: 9.5, lineHeight: 1.42 }]}>
                    <Text style={{ fontFamily: SANS_BOLD, color: brand.navy }}>{iv.title}. </Text>
                    {iv.body}
                  </Text>
                </View>
              ))}
            </>
          ) : null}
        </View>

        {/* Verwacht resultaat + eerste stap */}
        <View style={{ flexDirection: 'row', gap: 8 }} wrap={false}>
          {traj?.expectedOutcome ? (
            <View style={[s.statBox, { flex: 1, padding: 8 }]}>
              <Text style={s.smallLabelMuted}>{t.expectedOutcome}</Text>
              <Text style={[s.body, { marginTop: 3, fontSize: 9.3 }]}>{traj.expectedOutcome}</Text>
            </View>
          ) : null}
          {traj?.firstStep ? (
            <View style={[s.statBox, { flex: 1, padding: 8, borderLeft: `2pt solid ${brand.rust}` }]}>
              <Text style={[s.smallLabel]}>{t.firstStep}</Text>
              <Text style={[s.body, { marginTop: 3, fontSize: 9.3, color: brand.navy }]}>{traj.firstStep}</Text>
            </View>
          ) : null}
        </View>

        {/* Factum positionering (alleen DD-routes) */}
        {routeUsesFactum ? (
          <View style={{ marginTop: 7, backgroundColor: brand.navy, padding: 10, flexDirection: 'row', gap: 10, alignItems: 'center' }} wrap={false}>
            <View style={{ width: 4, height: 28, backgroundColor: brand.rust }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: SANS_BOLD, fontSize: 7.5, color: brand.rust, letterSpacing: 1.6, textTransform: 'uppercase', marginBottom: 3 }}>
                {t.routeFactumLabel}
              </Text>
              <Text style={{ fontSize: 9, color: '#D7DEE8', lineHeight: 1.45 }}>{t.routeFactumNote}</Text>
            </View>
          </View>
        ) : null}

        {footerEl(t)}
      </Page>

      {/* ═══ PAGINA 6 — ACTIEPLAN ═══ */}
      <Page size="A4" style={s.page}>
        <Text style={[s.eyebrow, { marginBottom: 8 }]}>{t.roadmapEyebrow}</Text>
        <Text style={[s.h1, { marginBottom: 7 }]}>{t.roadmapTitle(firstName)}</Text>
        <Text style={[s.body, { marginBottom: 9, lineHeight: 1.45 }]}>{t.roadmapIntro}</Text>

        {report?.valueAtStake && (report.valueAtStake.headline || (report.valueAtStake.drivers?.length ?? 0) > 0) ? (
          <View style={[s.cardSoft, { borderLeft: `3pt solid ${brand.rust}`, marginBottom: 9, padding: 10 }]}>
            {report.valueAtStake.headline ? (
              <Text style={{ fontFamily: SANS_BOLD, fontSize: 10, color: brand.navy, marginBottom: 4, lineHeight: 1.35 }}>{report.valueAtStake.headline}</Text>
            ) : null}
            {report.valueAtStake.drivers?.map((d, i) => (
              <View key={i} style={{ flexDirection: 'row', gap: 8, marginBottom: 1 }}>
                <Text style={{ fontSize: 9, color: brand.rust }}>—</Text>
                <Text style={[s.body, { fontSize: 9.3, lineHeight: 1.35 }]}>{d}</Text>
              </View>
            ))}
            {report.valueAtStake.basis ? <Text style={[s.muted, { marginTop: 4, fontSize: 8 }]}>{report.valueAtStake.basis}</Text> : null}
          </View>
        ) : null}

        {report?.actionRoadmap && report.actionRoadmap.length > 0
          ? report.actionRoadmap.map((phase, i) => {
              const phaseColors = [brand.rust, brand.amber, brand.green];
              const c = phaseColors[i % phaseColors.length];
              return (
                <View key={i} style={[s.card, { padding: 10, marginBottom: 7 }]} wrap={false}>
                  <View style={{ flexDirection: 'row', gap: 10, marginBottom: 5, alignItems: 'center' }}>
                    <View style={{ backgroundColor: c, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start' }}>
                      <Text style={{ fontFamily: SANS_BOLD, fontSize: 9, color: '#FFFFFF' }}>{t.phase} {i + 1}</Text>
                      <Text style={{ fontSize: 7, color: '#FFFFFFCC' }}>{phase.horizon}</Text>
                    </View>
                    <Text style={[s.h3, { flex: 1, marginBottom: 0 }]}>{phase.focus}</Text>
                  </View>
                  {phase.actions?.map((a, j) => (
                    <View key={j} style={{ flexDirection: 'row', gap: 8, marginBottom: 2 }}>
                      <Text style={{ fontSize: 9, color: c }}>→</Text>
                      <Text style={[s.body, { flex: 1, fontSize: 9.3, lineHeight: 1.35 }]}>{a}</Text>
                    </View>
                  ))}
                  {phase.outcome ? (
                    <Text style={[s.muted, { marginTop: 3, lineHeight: 1.35 }]}>
                      <Text style={{ fontFamily: SANS_BOLD }}>{t.expectedOutcome}: </Text>
                      {phase.outcome}
                    </Text>
                  ) : null}
                </View>
              );
            })
          : (
            <View style={s.cardSoft}>
              <Text style={s.body}>{t.recTitle(firstName)}</Text>
            </View>
          )}

        <View style={s.ctaBox} wrap={false}>
          <Text style={s.ctaTitle}>{t.ctaTitle}</Text>
          <Text style={[s.ctaBody, { fontFamily: SANS_BOLD }]}>{t.ctaContact}</Text>
        </View>

        {footerEl(t)}
      </Page>

      {/* ═══ PAGINA 7 — BEDRIJFSPROFIEL + ANTWOORDEN ═══ */}
      <Page size="A4" style={s.page}>
        <Text style={s.eyebrow}>{t.companyEyebrow}</Text>
        <Text style={s.h1}>{t.companyTitle(company)}</Text>
        <Text style={[s.body, { marginBottom: 12 }]}>{t.companyIntro}</Text>

        {report?.companyContext ? (
          <>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 10 }}>
              <View style={[s.statBox, { flex: 1 }]}>
                <Text style={s.smallLabelMuted}>{t.sector}</Text>
                <Text style={{ fontFamily: SANS_BOLD, fontSize: 10, color: brand.navy, marginTop: 4 }}>{report.companyContext.sector || '–'}</Text>
              </View>
              <View style={[s.statBox, { flex: 2 }]}>
                <Text style={s.smallLabelMuted}>{t.profile}</Text>
                <Text style={{ fontSize: 9.5, color: brand.navySoft, marginTop: 4, lineHeight: 1.45 }}>{report.companyContext.estimatedProfile || '–'}</Text>
              </View>
            </View>

            {Array.isArray(report.companyContext.researchSignals) && report.companyContext.researchSignals.length > 0 ? (
              <View style={s.card}>
                <Text style={s.smallLabel}>{t.researchFindings}</Text>
                {report.companyContext.researchSignals.slice(0, 4).map((sig, i) => (
                  <View key={i} style={{ flexDirection: 'row', gap: 8, marginTop: 5 }}>
                    <Text style={{ fontSize: 9, color: brand.rust, marginTop: 1 }}>→</Text>
                    <Text style={[s.body, { flex: 1 }]}>{sig}</Text>
                  </View>
                ))}
              </View>
            ) : null}
          </>
        ) : (
          <View style={s.cardSoft}>
            <Text style={s.body}>{t.noWebsite}</Text>
          </View>
        )}

        {services.length > 0 ? (
          <View style={[s.card, { marginBottom: 10 }]}>
            <Text style={s.smallLabel}>{t.servicesTitle}</Text>
            {services.map((svc, i) => (
              <View key={i} style={{ marginTop: 5 }}>
                <Text style={{ fontFamily: SANS_BOLD, fontSize: 9.5, color: brand.navy }}>{svc.service}</Text>
                {svc.aiOpportunity ? <Text style={[s.body, { fontSize: 9.5 }]}>{svc.aiOpportunity}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Compact antwoordoverzicht */}
        <Text style={[s.smallLabel, { marginTop: 4, marginBottom: 6 }]}>{t.qaTitle}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
          {questions.map((q) => {
            const letter = answers?.[q.id];
            const q_ = questions.find((x) => x.id === q.id);
            const pts = q_?.options.find((o) => o.letter === letter)?.points ?? 0;
            return (
              <View key={q.id} style={{ width: '31.8%', flexDirection: 'row', gap: 5, alignItems: 'center', marginBottom: 2 }}>
                <Text style={{ fontSize: 7.5, fontFamily: SANS_BOLD, color: brand.rust, minWidth: 18 }}>{q.id}</Text>
                <View style={{ height: 4, flex: 1, backgroundColor: brand.track }}>
                  <View style={{ height: 4, width: `${(pts / 5) * 100}%` as `${number}%`, backgroundColor: pts >= 4 ? brand.green : pts <= 2 ? brand.rust : brand.amber }} />
                </View>
                <Text style={{ fontSize: 7, color: brand.textMuted, minWidth: 20 }}>{letter ?? '–'}·{pts}</Text>
              </View>
            );
          })}
        </View>

        {footerEl(t)}
      </Page>

      {/* ═══ PAGINA 8 — COLOFON ═══ */}
      <Page size="A4" style={s.page}>
        <View style={{ height: 3, backgroundColor: brand.navy, marginBottom: 26 }} />

        <Text style={s.eyebrow}>{t.colophonEyebrow}</Text>
        <Text style={s.h1}>{t.colophonTitle}</Text>

        <View style={[s.card, { marginBottom: 12 }]}>
          <Text style={[s.body, { marginBottom: 9 }]}>{t.about1}</Text>
          <Text style={[s.body, { marginBottom: 9 }]}>{t.about2}</Text>
          <Text style={s.body}>{t.about3}</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
          <View style={[s.statBox, { flex: 1 }]}>
            <Text style={s.smallLabelMuted}>{t.founder}</Text>
            <Text style={{ fontFamily: SANS_BOLD, fontSize: 10.5, color: brand.navy, marginTop: 4 }}>Wouter Dijkman</Text>
            <Text style={s.muted}>{t.founderRole}</Text>
            <Text style={[s.muted, { marginTop: 2 }]}>linkedin.com/in/wwdijkman</Text>
          </View>
          <View style={[s.statBox, { flex: 1 }]}>
            <Text style={s.smallLabelMuted}>{t.contact}</Text>
            <Text style={{ fontSize: 9.5, color: brand.navy, marginTop: 4 }}>wouter@agenticmindshift.nl</Text>
            <Text style={[s.muted, { marginTop: 2 }]}>agenticmindshift.nl</Text>
            <Text style={[s.muted, { marginTop: 2 }]}>cal.com/wwdijkman/intake-call</Text>
          </View>
          <View style={[s.statBox, { flex: 1 }]}>
            <Text style={s.smallLabelMuted}>{t.registration}</Text>
            <Text style={{ fontSize: 9.5, color: brand.navy, marginTop: 4 }}>KvK 99495945</Text>
            <Text style={[s.muted, { marginTop: 2 }]}>{t.city}</Text>
            <Text style={[s.muted, { marginTop: 2 }]}>Marius Bauerstraat 235 A 5{'\n'}1062 AL Amsterdam</Text>
          </View>
        </View>

        <View style={s.ctaBox}>
          <Text style={s.ctaTitle}>{t.finalCtaTitle}</Text>
          <Text style={s.ctaBody}>{t.finalCtaBody}</Text>
          <Text style={[s.ctaBody, { marginTop: 6, fontFamily: SANS_BOLD }]}>cal.com/wwdijkman/intake-call</Text>
        </View>

        <View style={{ marginTop: 22 }}>
          <View style={s.divider} />
          <Text style={[s.small, { marginBottom: 4 }]}>{t.confidential(name, company)}</Text>
          <Text style={s.small}>{t.generatedBy(report?.model || 'DeepSeek', generatedAt)}</Text>
        </View>

        {footerEl(t)}
      </Page>
    </Document>
  );
}

export default ReportDocument;
