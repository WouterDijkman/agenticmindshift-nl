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
  reportUrl: string;
  totalScore: number;
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

export default function ScorecardReportEmail({
  name,
  reportUrl,
  totalScore,
}: ScorecardReportEmailProps) {
  return (
    <Html lang="nl">
      <Head />
      <Body style={wrap}>
        <Container style={card}>
          <Heading style={{ color: '#e4ecf5', fontSize: '24px', marginBottom: '16px' }}>
            Uw Portfolio Intelligence Rapport
          </Heading>
          <Text style={{ color: '#cfe9ec', fontSize: '16px' }}>Beste {name},</Text>
          <Text style={{ color: '#a8b8cc', fontSize: '16px', lineHeight: 1.6 }}>
            Bedankt voor het invullen van de Portfolio Intelligence Scorecard. Uw totaalscore is{' '}
            <strong style={{ color: '#e4ecf5' }}>{totalScore} van 75</strong>. Het volledige rapport
            van vier pagina&apos;s vindt u via onderstaande link.
          </Text>
          <Section style={{ margin: '24px 0' }}>
            <Link
              href={reportUrl}
              style={{
                display: 'inline-block',
                background: '#F14C1D',
                color: '#ffffff',
                padding: '12px 22px',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Open mijn rapport
            </Link>
          </Section>
          <Hr style={{ borderColor: 'rgba(107,125,150,0.2)' }} />
          <Text style={{ color: '#6b7d96', fontSize: '13px', lineHeight: 1.6 }}>
            U ontvangt deze e-mail omdat u de scorecard heeft ingevuld op
            agenticmindshift.nl. Wilt u geen vervolgmails ontvangen, antwoord dan met
            &quot;afmelden&quot;.
          </Text>
          <Text style={{ color: '#6b7d96', fontSize: '13px', marginTop: '12px' }}>
            Agentic Mindshift &middot; Wouter Dijkman
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
