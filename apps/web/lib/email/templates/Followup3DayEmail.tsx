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

import {
  FOLLOWUP_STRINGS,
  HTML_LANG,
  type ReportLocale,
} from '@/lib/report/locale';

interface Followup3DayEmailProps {
  name: string;
  weakestDimensions: string[];
  intakeUrl?: string;
  /** Taal van de lead. Default 'nl'. */
  locale?: ReportLocale;
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
  locale = 'nl',
}: Followup3DayEmailProps) {
  const s = FOLLOWUP_STRINGS[locale];
  const copy = s.day3;
  const firstName = name.split(' ')[0];

  return (
    <Html lang={HTML_LANG[locale]}>
      <Head />
      <Body style={wrap}>
        <Container style={card}>
          <Heading style={{ color: '#e4ecf5', fontSize: '22px', marginBottom: '16px' }}>
            {copy.heading}
          </Heading>
          <Text style={{ color: '#cfe9ec' }}>{s.greeting(firstName)}</Text>
          <Text style={{ color: '#a8b8cc', lineHeight: 1.6 }}>
            {copy.body1Lead}
            <strong style={{ color: '#e4ecf5' }}>
              {weakestDimensions.join(s.and)}
            </strong>
            {copy.body1Tail}
          </Text>
          <Text style={{ color: '#a8b8cc', lineHeight: 1.6 }}>{copy.body2}</Text>
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
              {copy.cta}
            </Link>
          </Text>
          <Hr style={{ borderColor: 'rgba(107,125,150,0.2)', margin: '24px 0' }} />
          <Text style={{ color: '#6b7d96', fontSize: '13px' }}>{s.unsubscribe}</Text>
        </Container>
      </Body>
    </Html>
  );
}
