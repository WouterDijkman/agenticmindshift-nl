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
  h1: { fontSize: 28, fontWeight: 700, marginBottom: 12 },
  h2: { fontSize: 18, fontWeight: 700, marginTop: 18, marginBottom: 8 },
  body: { fontSize: 11, color: brand.textTertiary, lineHeight: 1.55 },
  bodyPrimary: { fontSize: 12, color: brand.text, lineHeight: 1.55 },
  label: {
    fontSize: 9,
    color: brand.accent,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  cover: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  scoreBox: {
    backgroundColor: brand.bgSecondary,
    borderRadius: 4,
    padding: 20,
    marginBottom: 14,
    border: `1px solid ${brand.border}`,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  barTrack: {
    height: 8,
    backgroundColor: brand.bgElevated,
    borderRadius: 4,
    marginTop: 4,
    marginBottom: 12,
  },
  barFill: { height: 8, backgroundColor: brand.accent, borderRadius: 4 },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 48,
    right: 48,
    fontSize: 9,
    color: brand.textMuted,
    borderTop: `1px solid ${brand.border}`,
    paddingTop: 8,
  },
  ctaBox: {
    backgroundColor: brand.cta,
    color: '#ffffff',
    padding: 16,
    marginTop: 16,
    borderRadius: 4,
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
}

export function ReportDocument({
  name,
  company,
  totalScore,
  byDimension,
  weakest,
  offer,
  generatedAt = new Date().toLocaleDateString('nl-NL'),
}: ReportProps) {
  const offerInfo = offerMap[offer];

  return (
    <Document title={`Portfolio Intelligence Rapport - ${company}`}>
      {/* Page 1: Cover */}
      <Page size="A4" style={styles.page}>
        <View style={styles.cover}>
          <Text style={styles.label}>Portfolio Intelligence Scorecard</Text>
          <Text style={styles.h1}>Persoonlijk rapport</Text>
          <Text style={{ fontSize: 14, color: brand.textSecondary, marginBottom: 30 }}>
            {company}
          </Text>
          <Text style={styles.bodyPrimary}>Voor: {name}</Text>
          <Text style={styles.body}>Gegenereerd op {generatedAt}</Text>
          <View style={{ marginTop: 40 }}>
            <Text style={styles.body}>
              Dit rapport vat uw scores samen op zes dimensies: Deal Velocity, Portfolio
              Intelligence, Bias Detection, AI Readiness, Capacity Engineering en Knowledge
              Retention. Het slot bevat een concrete vervolgstap.
            </Text>
          </View>
        </View>
        <Text style={styles.footer}>
          Agentic Mindshift &middot; Vertrouwelijk &middot; agenticmindshift.nl
        </Text>
      </Page>

      {/* Page 2: Total + Dimensions */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.label}>Pagina 2</Text>
        <Text style={styles.h1}>Totaalscore &amp; dimensies</Text>
        <View style={styles.scoreBox}>
          <Text style={{ fontSize: 14, color: brand.textSecondary }}>Totaalscore</Text>
          <Text style={{ fontSize: 36, fontWeight: 700, color: brand.text }}>
            {totalScore} / 75
          </Text>
        </View>
        <Text style={styles.h2}>Per dimensie (0-100)</Text>
        {(Object.keys(byDimension) as Dimension[]).map((dim) => (
          <View key={dim}>
            <View style={styles.row}>
              <Text style={{ fontSize: 11, color: brand.textSecondary }}>
                {dimensionLabels[dim]}
              </Text>
              <Text style={{ fontSize: 11, color: brand.textTertiary }}>
                {byDimension[dim]} / 100
              </Text>
            </View>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: `${byDimension[dim]}%` }]} />
            </View>
          </View>
        ))}
        <Text style={styles.footer}>
          Agentic Mindshift &middot; Vertrouwelijk &middot; agenticmindshift.nl
        </Text>
      </Page>

      {/* Page 3: Weakest + Commentary */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.label}>Pagina 3</Text>
        <Text style={styles.h1}>Waar het knelt</Text>
        <Text style={styles.bodyPrimary}>
          Op basis van uw antwoorden vallen twee dimensies op als grootste aandachtspunten:
        </Text>
        <View style={{ marginTop: 14 }}>
          {weakest.map((w) => (
            <Text key={w} style={[styles.bodyPrimary, { marginBottom: 6 }]}>
              &bull; {w}
            </Text>
          ))}
        </View>
        <Text style={styles.h2}>Toelichting</Text>
        <Text style={styles.body}>
          De zwakste dimensies geven aan waar de meest waarschijnlijke rendementslekken zitten.
          In de meeste portefeuilles wordt verlies hier niet gemeten omdat de huidige MBR-cyclus
          niet expliciet op deze punten toetst. Een eerste stap is dan ook niet directe actie,
          maar het meetbaar maken: KPI&apos;s definieren, frequentie vaststellen en de uitkomst
          op de bestuursagenda zetten.
        </Text>
        <Text style={styles.body}>
          Wanneer u dit zes maanden volhoudt &mdash; met dezelfde discipline waarmee u financiele
          KPI&apos;s monitort &mdash; is in de praktijk een verschuiving van een half tot een
          heel exit-multiple verschilpunt zichtbaar. Niet als toezegging, wel als reeel resultaat
          bij vergelijkbare trajecten.
        </Text>
        <Text style={styles.footer}>
          Agentic Mindshift &middot; Vertrouwelijk &middot; agenticmindshift.nl
        </Text>
      </Page>

      {/* Page 4: Offer + Contact */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.label}>Pagina 4</Text>
        <Text style={styles.h1}>Aanbevolen vervolgstap</Text>
        <View style={styles.scoreBox}>
          <Text style={{ fontSize: 16, fontWeight: 700, color: brand.text, marginBottom: 6 }}>
            {offerInfo.name}
          </Text>
          <Text style={styles.body}>{offerInfo.description}</Text>
        </View>
        <Text style={styles.h2}>Hoe verder?</Text>
        <Text style={styles.body}>
          Een sparring-sessie van twintig minuten is de gangbare eerste stap. Doel: toetsen of de
          aanbevolen vervolgstap aansluit op uw werkelijke situatie. Geen verkoopgesprek, wel een
          gesprek over uw portefeuille en de meetinstrumenten die u nu gebruikt.
        </Text>
        <View style={styles.ctaBox}>
          <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: 700 }}>
            Plan via cal.com/wwdijkman/intake-call
          </Text>
          <Text style={{ color: '#ffffff', fontSize: 10, marginTop: 4 }}>
            Of e-mail rechtstreeks: wouter@agenticmindshift.nl
          </Text>
        </View>
        <Text style={styles.footer}>
          Agentic Mindshift &middot; Wouter Dijkman &middot; agenticmindshift.nl
        </Text>
      </Page>
    </Document>
  );
}

export default ReportDocument;
