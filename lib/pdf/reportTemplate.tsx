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

// Register Noto Serif from Google Fonts.
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

const brand = {
  bg: '#081930',
  bgSecondary: '#0d1f3a',
  bgElevated: '#122844',
  text: '#e4ecf5',
  textSecondary: '#cfe9ec',
  textTertiary: '#a8b8cc',
  textMuted: '#6b7d96',
  accent: '#844E58',
  cta: '#F14C1D',
  border: '#1f3556',
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: brand.bg,
    color: brand.text,
    fontFamily: 'Noto Serif',
    padding: 48,
  },
  h1: { fontSize: 26, fontWeight: 700, marginBottom: 10 },
  h2: { fontSize: 17, fontWeight: 700, marginTop: 16, marginBottom: 7 },
  h3: { fontSize: 13, fontWeight: 700, marginTop: 10, marginBottom: 5 },
  body: { fontSize: 10.5, color: brand.textTertiary, lineHeight: 1.6 },
  bodyPrimary: { fontSize: 11, color: brand.text, lineHeight: 1.6 },
  label: {
    fontSize: 8.5,
    color: brand.cta,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  muted: { fontSize: 9, color: brand.textMuted },
  cover: { flexGrow: 1, justifyContent: 'center' },
  box: {
    backgroundColor: brand.bgSecondary,
    borderRadius: 3,
    padding: 16,
    marginBottom: 12,
    border: `1px solid ${brand.border}`,
  },
  boxAccent: {
    backgroundColor: brand.bgSecondary,
    borderRadius: 3,
    padding: 16,
    marginBottom: 12,
    borderLeft: `3px solid ${brand.cta}`,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  barTrack: {
    height: 6,
    backgroundColor: brand.bgElevated,
    borderRadius: 3,
    marginTop: 3,
    marginBottom: 10,
  },
  barFill: { height: 6, backgroundColor: brand.cta, borderRadius: 3 },
  footer: {
    position: 'absolute',
    bottom: 22,
    left: 48,
    right: 48,
    fontSize: 8.5,
    color: brand.textMuted,
    borderTop: `1px solid ${brand.border}`,
    paddingTop: 7,
  },
  ctaBox: {
    backgroundColor: brand.cta,
    color: '#ffffff',
    padding: 14,
    marginTop: 14,
    borderRadius: 3,
  },
  chip: {
    fontSize: 8.5,
    letterSpacing: 0.8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
    marginRight: 4,
  },
});

interface ReportProps {
  name: string;
  company: string;
  totalScore: number;
  byDimension: Record<Dimension, number>;
  weakest: string[];
  offer: OfferType;
  generatedAt?: string;
  /** Optioneel: het volledige LLM-rapport voor rijkere content */
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

  return (
    <Document title={`AI Readiness Rapport — ${company}`}>
      {/* Page 1: Cover */}
      <Page size="A4" style={styles.page}>
        <View style={styles.cover}>
          <Text style={styles.label}>AI Readiness Scorecard</Text>
          <Text style={styles.h1}>
            {report?.scoreProfile?.profileLabel ?? 'Persoonlijk rapport'}
          </Text>
          <Text style={{ fontSize: 15, color: brand.textSecondary, marginBottom: 28 }}>
            {company}
          </Text>
          <Text style={styles.bodyPrimary}>Voor: {name}</Text>
          <Text style={styles.body}>Gegenereerd op {generatedAt}</Text>

          {report?.executiveSummary && (
            <View style={{ marginTop: 28, borderLeft: `3px solid ${brand.cta}`, paddingLeft: 14 }}>
              <Text style={[styles.bodyPrimary, { lineHeight: 1.7 }]}>
                {report.executiveSummary}
              </Text>
            </View>
          )}

          <View style={{ marginTop: 24, flexDirection: 'row', gap: 8 }}>
            <Text style={{ fontSize: 10, color: brand.textTertiary }}>
              Score: {totalScore}/75
            </Text>
            <Text style={{ fontSize: 10, color: brand.textTertiary }}>·</Text>
            <Text style={{ fontSize: 10, color: brand.textTertiary }}>
              Traject: {offerInfo?.name}
            </Text>
            {report?.urgency && (
              <>
                <Text style={{ fontSize: 10, color: brand.textTertiary }}>·</Text>
                <Text style={{ fontSize: 10, color: report.urgency === 'high' ? brand.cta : brand.textTertiary }}>
                  Urgentie: {report.urgency === 'high' ? 'Hoog' : report.urgency === 'medium' ? 'Gemiddeld' : 'Laag'}
                </Text>
              </>
            )}
          </View>
        </View>
        <Text style={styles.footer}>
          Agentic Mindshift · Vertrouwelijk · agenticmindshift.nl
        </Text>
      </Page>

      {/* Page 2: Scores + Dimensies */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.label}>Scoreoverzicht</Text>
        <Text style={styles.h1}>Totaalscore &amp; dimensies</Text>

        <View style={styles.box}>
          <Text style={{ fontSize: 12, color: brand.textSecondary }}>Totaalscore</Text>
          <Text style={{ fontSize: 34, fontWeight: 700, color: brand.text }}>
            {totalScore} / 75
          </Text>
          {report?.scoreProfile && (
            <Text style={[styles.body, { marginTop: 6 }]}>
              {report.scoreProfile.profileExplanation}
            </Text>
          )}
        </View>

        <Text style={styles.h2}>Per dimensie (0–100)</Text>
        {(Object.keys(byDimension) as Dimension[]).map((dim) => {
          const dimReport = report?.dimensionAnalysis?.find((d) => d.dimension === dim);
          return (
            <View key={dim}>
              <View style={styles.row}>
                <Text style={{ fontSize: 10.5, color: brand.textSecondary }}>
                  {dimensionLabels[dim]}
                </Text>
                <Text style={{ fontSize: 10.5, color: brand.textTertiary }}>
                  {byDimension[dim]} / 100
                  {dimReport?.priority === 'critical' ? ' ⚡' : dimReport?.priority === 'strong' ? ' ✓' : ''}
                </Text>
              </View>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${byDimension[dim]}%` }]} />
              </View>
            </View>
          );
        })}

        {report?.urgencyExplanation && (
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.label}>Urgentiesignaal</Text>
            <Text style={styles.body}>{report.urgencyExplanation}</Text>
          </View>
        )}
        <Text style={styles.footer}>
          Agentic Mindshift · Vertrouwelijk · agenticmindshift.nl
        </Text>
      </Page>

      {/* Page 3: Dimensie-analyse + Key Insights */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.label}>Diepteanalyse</Text>
        <Text style={styles.h1}>Dimensie-analyse</Text>

        {report?.dimensionAnalysis?.slice(0, 3).map((dim) => (
          <View key={dim.dimension} style={{ marginBottom: 14 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Text style={{ fontSize: 11, fontWeight: 700, color: brand.text, flex: 1 }}>
                {dim.label}
              </Text>
              <Text style={{ fontSize: 10, color: brand.textMuted }}>
                {dim.score}/100 · {dim.priority === 'critical' ? '⚡ Kritiek' : dim.priority === 'attention' ? 'Aandacht' : dim.priority === 'adequate' ? 'Voldoende' : 'Sterk'}
              </Text>
            </View>
            <Text style={styles.body}>{dim.assessment}</Text>
            <Text style={[styles.muted, { marginTop: 4, fontStyle: 'italic' }]}>
              Quick win: {dim.quickWin}
            </Text>
          </View>
        ))}

        {/* Fallback als geen LLM rapport */}
        {!report?.dimensionAnalysis && (
          <>
            <Text style={[styles.bodyPrimary, { marginBottom: 10 }]}>
              Grootste aandachtspunten:
            </Text>
            {weakest.map((w) => (
              <Text key={w} style={[styles.bodyPrimary, { marginBottom: 5 }]}>
                · {w}
              </Text>
            ))}
            <Text style={[styles.body, { marginTop: 14 }]}>
              De zwakste dimensies geven aan waar de meest waarschijnlijke rendementslekken zitten.
              Een eerste stap is het meetbaar maken: KPI&apos;s definiëren, frequentie vaststellen en
              de uitkomst op de bestuursagenda zetten.
            </Text>
          </>
        )}

        <Text style={styles.footer}>
          Agentic Mindshift · Vertrouwelijk · agenticmindshift.nl
        </Text>
      </Page>

      {/* Page 4: Key Insights + Aanbevolen traject */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.label}>Conclusie &amp; vervolgstap</Text>
        <Text style={styles.h1}>Kernobservaties &amp; aanbeveling</Text>

        {report?.keyInsights?.slice(0, 3).map((insight, i) => (
          <View key={i} style={{ marginBottom: 12, flexDirection: 'row', gap: 10 }}>
            <Text style={{ fontSize: 9, color: brand.cta, fontWeight: 700, paddingTop: 1 }}>
              {String(i + 1).padStart(2, '0')}
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 11, fontWeight: 700, color: brand.text, marginBottom: 3 }}>
                {insight.title}
              </Text>
              <Text style={styles.body}>{insight.body}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.h2}>Aanbevolen traject</Text>
        <View style={styles.boxAccent}>
          <Text style={{ fontSize: 13, fontWeight: 700, color: brand.text, marginBottom: 5 }}>
            {report?.recommendedTrajectory?.offerName ?? offerInfo.name}
          </Text>
          <Text style={styles.body}>
            {report?.recommendedTrajectory?.rationale ?? offerInfo.description}
          </Text>
          {report?.recommendedTrajectory?.firstStep && (
            <Text style={[styles.body, { marginTop: 8, color: brand.textSecondary }]}>
              Eerste stap: {report.recommendedTrajectory.firstStep}
            </Text>
          )}
        </View>

        <View style={styles.ctaBox}>
          <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: 700 }}>
            Plan een gesprek: cal.com/wwdijkman/intake-call
          </Text>
          <Text style={{ color: '#ffffff', fontSize: 10, marginTop: 3 }}>
            Of e-mail: wouter@agenticmindshift.nl
          </Text>
        </View>

        <Text style={styles.footer}>
          Agentic Mindshift · {firstName} · agenticmindshift.nl
        </Text>
      </Page>
    </Document>
  );
}

export default ReportDocument;
