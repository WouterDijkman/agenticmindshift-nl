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

interface Followup3DayEmailProps {
  name: string;
  weakestDimensions: string[];
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

export default function Followup3DayEmail({
  name,
  weakestDimensions,
  intakeUrl = 'https://cal.com/wwdijkman/intake-call',
}: Followup3DayEmailProps) {
  return (
    <Html lang="nl">
      <Head />
      <Body style={wrap}>
        <Container style={card}>
          <Heading style={{ color: '#e4ecf5', fontSize: '22px', marginBottom: '16px' }}>
            Drie dagen later &mdash; wat valt op in uw rapport?
          </Heading>
          <Text style={{ color: '#cfe9ec' }}>Beste {name},</Text>
          <Text style={{ color: '#a8b8cc', lineHeight: 1.6 }}>
            De afgelopen dagen heeft u uw scorecard-rapport waarschijnlijk doorgenomen. In de
            meeste gevallen valt op dat twee dimensies achterblijven. Bij u zijn dat{' '}
            <strong style={{ color: '#e4ecf5' }}>{weakestDimensions.join(' en ')}</strong>.
          </Text>
          <Text style={{ color: '#a8b8cc', lineHeight: 1.6 }}>
            Dit zijn vaak de plaatsen waar de meeste IRR weglekt &mdash; niet door slecht beheer,
            maar omdat ze zelden expliciet gemeten worden. Wilt u een vrijblijvend gesprek over wat
            dit voor uw portefeuille betekent? Plan dan een sparring-sessie in.
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
              Plan een sparring-sessie
            </Link>
          </Text>
          <Hr style={{ borderColor: 'rgba(107,125,150,0.2)', margin: '24px 0' }} />
          <Text style={{ color: '#6b7d96', fontSize: '13px' }}>
            Wilt u geen vervolgmails meer? Antwoord met &quot;afmelden&quot;.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
