import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Link,
  Hr,
} from '@react-email/components';

interface Followup7DayEmailProps {
  name: string;
  offerName: string;
  intakeUrl?: string;
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

export default function Followup7DayEmail({
  name,
  offerName,
  intakeUrl = 'https://cal.com/wwdijkman/intake-call',
}: Followup7DayEmailProps) {
  return (
    <Html lang="nl">
      <Head />
      <Body style={wrap}>
        <Container style={card}>
          <Heading style={{ color: '#e4ecf5', fontSize: '22px', marginBottom: '16px' }}>
            Een week later &mdash; concrete vervolgstap
          </Heading>
          <Text style={{ color: '#cfe9ec' }}>Beste {name},</Text>
          <Text style={{ color: '#a8b8cc', lineHeight: 1.6 }}>
            Op basis van uw antwoorden past het traject{' '}
            <strong style={{ color: '#e4ecf5' }}>{offerName}</strong> het beste bij uw situatie. Dat
            is een aanname op basis van uw scorecard &mdash; geen verplichting.
          </Text>
          <Text style={{ color: '#a8b8cc', lineHeight: 1.6 }}>
            Twintig minuten op de telefoon is genoeg om te bepalen of dit klopt. Niet om te
            verkopen &mdash; om te toetsen of de hypothese stand houdt tegen uw werkelijkheid.
          </Text>
          <Text style={{ marginTop: '24px' }}>
            <Link
              href={intakeUrl}
              style={{
                background: '#F14C1D',
                color: '#ffffff',
                padding: '12px 22px',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Plan een gesprek van 20 minuten
            </Link>
          </Text>
          <Hr style={{ borderColor: 'rgba(107,125,150,0.2)', margin: '24px 0' }} />
          <Text style={{ color: '#6b7d96', fontSize: '13px' }}>
            Reageer met &quot;afmelden&quot; om geen vervolgmails meer te ontvangen.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
