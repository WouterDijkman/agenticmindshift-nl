import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Link,
  Section,
  Hr,
} from '@react-email/components';

interface ScorecardReportEmailProps {
  name: string;
  company: string;
  reportUrl: string;
  totalScore: number;
  executiveSummary: string;
  profileLabel: string;
  recommendedTrajectoryName: string;
  urgency: 'high' | 'medium' | 'low';
}

const wrap: React.CSSProperties = {
  backgroundColor: '#081930',
  color: '#e4ecf5',
  fontFamily: "'Noto Serif', Georgia, serif",
  margin: 0,
  padding: '24px 0',
};
const card: React.CSSProperties = {
  background: '#0d1f3a',
  border: '1px solid rgba(107,125,150,0.2)',
  borderRadius: '4px',
  padding: '32px',
  maxWidth: '560px',
  margin: '0 auto',
};
const summaryBox: React.CSSProperties = {
  background: '#122844',
  border: '1px solid rgba(107,125,150,0.3)',
  borderLeft: '3px solid #F14C1D',
  borderRadius: '4px',
  padding: '16px 20px',
  margin: '20px 0',
};

export default function ScorecardReportEmail({
  name,
  company,
  reportUrl,
  totalScore,
  executiveSummary,
  profileLabel,
  recommendedTrajectoryName,
  urgency,
}: ScorecardReportEmailProps) {
  const firstName = name.split(' ')[0];
  const urgencyLabel = urgency === 'high' ? '⚡ Directe aandacht gewenst' : urgency === 'medium' ? 'Verbeterpotentieel aanwezig' : 'Sterke basis';

  return (
    <Html lang="nl">
      <Head />
      <Body style={wrap}>
        <Container style={card}>
          <Text style={{ color: '#F14C1D', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase' as const, marginBottom: '8px' }}>
            AI Readiness Rapport — {company}
          </Text>
          <Heading style={{ color: '#e4ecf5', fontSize: '22px', marginBottom: '8px', fontWeight: 700 }}>
            {firstName}, uw rapport staat klaar
          </Heading>
          <Text style={{ color: '#a8b8cc', fontSize: '14px', marginBottom: '20px' }}>
            Profiel: <strong style={{ color: '#e4ecf5' }}>{profileLabel}</strong> &nbsp;·&nbsp;
            Score: <strong style={{ color: '#e4ecf5' }}>{totalScore}/75</strong> &nbsp;·&nbsp;
            <span style={{ color: urgency === 'high' ? '#F14C1D' : '#a8b8cc' }}>{urgencyLabel}</span>
          </Text>

          <Section style={summaryBox}>
            <Text style={{ color: '#cfe9ec', fontSize: '15px', lineHeight: '1.65', margin: 0 }}>
              {executiveSummary}
            </Text>
          </Section>

          <Text style={{ color: '#a8b8cc', fontSize: '14px', lineHeight: '1.6' }}>
            Op basis van uw antwoorden adviseren wij het traject{' '}
            <strong style={{ color: '#e4ecf5' }}>{recommendedTrajectoryName}</strong>.
            Het volledige rapport bevat een uitgebreide dimensie-analyse,
            concrete verbeteracties en een persoonlijke uitleg.
          </Text>

          <Section style={{ margin: '24px 0' }}>
            <Link
              href={reportUrl}
              style={{
                display: 'inline-block',
                background: '#F14C1D',
                color: '#ffffff',
                padding: '13px 28px',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '15px',
              }}
            >
              Open uw volledige rapport →
            </Link>
          </Section>

          <Hr style={{ borderColor: 'rgba(107,125,150,0.2)', margin: '24px 0' }} />

          <Text style={{ color: '#6b7d96', fontSize: '12px', lineHeight: '1.6' }}>
            Vragen? Antwoord op deze mail of plan een gesprek via{' '}
            <Link href="https://cal.com/wwdijkman/intake-call" style={{ color: '#a8b8cc' }}>
              cal.com/wwdijkman/intake-call
            </Link>.
          </Text>
          <Text style={{ color: '#6b7d96', fontSize: '12px', marginTop: '8px' }}>
            Agentic Mindshift &middot; Wouter Dijkman &middot; agenticmindshift.nl
          </Text>
          <Text style={{ color: '#4a5a6e', fontSize: '11px', marginTop: '8px' }}>
            U ontvangt deze e-mail omdat u de AI Readiness Scorecard heeft ingevuld op agenticmindshift.nl.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
