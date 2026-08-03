/**
 * Taal-configuratie voor de gelokaliseerde rapport-pipeline.
 *
 * Eén bron van waarheid voor:
 *  - de taalnaam die we DeepSeek geven (rapport-inhoud)
 *  - de chrome-strings van de e-mail en de PDF (kop, knoppen, voettekst)
 *
 * Het rapportschema en de prompt-instructies blijven in het Nederlands —
 * alleen de OUTPUT-taal van DeepSeek en de vaste UI-teksten verschillen.
 */

export type ReportLocale = 'nl' | 'en' | 'de' | 'es' | 'pt';

export const REPORT_LOCALES: ReportLocale[] = ['nl', 'en', 'de', 'es', 'pt'];

export function normalizeReportLocale(value: unknown): ReportLocale {
  return typeof value === 'string' && (REPORT_LOCALES as string[]).includes(value)
    ? (value as ReportLocale)
    : 'nl';
}

/** Volledige taalnaam in de doeltaal zelf — voor de DeepSeek-instructie. */
export const LANGUAGE_NAME: Record<ReportLocale, string> = {
  nl: 'het Nederlands (Dutch)',
  en: 'English',
  de: 'Deutsch (German)',
  es: 'español (Spanish)',
  pt: 'português (Portuguese)',
};

/** BCP-47 tag voor datumformattering en het <html lang> attribuut. */
export const HTML_LANG: Record<ReportLocale, string> = {
  nl: 'nl-NL',
  en: 'en-GB',
  de: 'de-DE',
  es: 'es-ES',
  pt: 'pt-PT',
};

interface EmailStrings {
  eyebrow: (company: string) => string;
  heading: (firstName: string) => string;
  profileLabel: string;
  scoreLabel: string;
  urgencyHigh: string;
  urgencyMedium: string;
  urgencyLow: string;
  recommendation: (trajectory: string) => string;
  reportContents: string;
  cta: string;
  questions: (calLink: string) => string;
  footer: string;
  unsubscribe: string;
  subject: (firstName: string, profileLabel: string, urgent: boolean) => string;
}

const CAL_LINK = 'cal.com/wwdijkman/intake-call';

export const EMAIL_STRINGS: Record<ReportLocale, EmailStrings> = {
  nl: {
    eyebrow: (c) => `AI Readiness Rapport — ${c}`,
    heading: (n) => `${n}, uw rapport staat klaar`,
    profileLabel: 'Profiel',
    scoreLabel: 'Score',
    urgencyHigh: '⚡ Directe aandacht gewenst',
    urgencyMedium: 'Verbeterpotentieel aanwezig',
    urgencyLow: 'Sterke basis',
    recommendation: (t) =>
      `Op basis van uw antwoorden adviseren wij het traject ${t}. Het volledige rapport bevat een uitgebreide dimensie-analyse, concrete verbeteracties en een persoonlijke uitleg.`,
    reportContents: '',
    cta: 'Open uw volledige rapport →',
    questions: (l) => `Vragen? Antwoord op deze mail of plan een gesprek via ${l}.`,
    footer: 'Agentic Mindshift · Wouter Dijkman · agenticmindshift.nl',
    unsubscribe:
      'U ontvangt deze e-mail omdat u de AI Readiness Scorecard heeft ingevuld op agenticmindshift.nl.',
    subject: (n, p, u) => `${u ? '⚡ ' : ''}${n}, uw AI Readiness rapport is klaar — ${p}`,
  },
  en: {
    eyebrow: (c) => `AI Readiness Report — ${c}`,
    heading: (n) => `${n}, your report is ready`,
    profileLabel: 'Profile',
    scoreLabel: 'Score',
    urgencyHigh: '⚡ Immediate attention recommended',
    urgencyMedium: 'Improvement potential identified',
    urgencyLow: 'Strong foundation',
    recommendation: (t) =>
      `Based on your answers, we recommend the ${t} track. The full report contains an in-depth dimension analysis, concrete improvement actions and a personalised explanation.`,
    reportContents: '',
    cta: 'Open your full report →',
    questions: (l) => `Questions? Reply to this email or schedule a call via ${l}.`,
    footer: 'Agentic Mindshift · Wouter Dijkman · agenticmindshift.nl',
    unsubscribe:
      'You are receiving this email because you completed the AI Readiness Scorecard at agenticmindshift.nl.',
    subject: (n, p, u) => `${u ? '⚡ ' : ''}${n}, your AI Readiness report is ready — ${p}`,
  },
  de: {
    eyebrow: (c) => `AI-Readiness-Bericht — ${c}`,
    heading: (n) => `${n}, Ihr Bericht ist fertig`,
    profileLabel: 'Profil',
    scoreLabel: 'Punktzahl',
    urgencyHigh: '⚡ Sofortige Aufmerksamkeit empfohlen',
    urgencyMedium: 'Verbesserungspotenzial vorhanden',
    urgencyLow: 'Starke Grundlage',
    recommendation: (t) =>
      `Basierend auf Ihren Antworten empfehlen wir den Weg ${t}. Der vollständige Bericht enthält eine ausführliche Dimensionsanalyse, konkrete Verbesserungsmaßnahmen und eine persönliche Erläuterung.`,
    reportContents: '',
    cta: 'Vollständigen Bericht öffnen →',
    questions: (l) => `Fragen? Antworten Sie auf diese E-Mail oder planen Sie ein Gespräch über ${l}.`,
    footer: 'Agentic Mindshift · Wouter Dijkman · agenticmindshift.nl',
    unsubscribe:
      'Sie erhalten diese E-Mail, weil Sie die AI-Readiness-Scorecard auf agenticmindshift.nl ausgefüllt haben.',
    subject: (n, p, u) => `${u ? '⚡ ' : ''}${n}, Ihr AI-Readiness-Bericht ist fertig — ${p}`,
  },
  es: {
    eyebrow: (c) => `Informe de AI Readiness — ${c}`,
    heading: (n) => `${n}, su informe está listo`,
    profileLabel: 'Perfil',
    scoreLabel: 'Puntuación',
    urgencyHigh: '⚡ Se recomienda atención inmediata',
    urgencyMedium: 'Potencial de mejora identificado',
    urgencyLow: 'Base sólida',
    recommendation: (t) =>
      `Según sus respuestas, le recomendamos el trayecto ${t}. El informe completo contiene un análisis detallado por dimensión, acciones de mejora concretas y una explicación personalizada.`,
    reportContents: '',
    cta: 'Abrir su informe completo →',
    questions: (l) => `¿Preguntas? Responda a este correo o programe una llamada en ${l}.`,
    footer: 'Agentic Mindshift · Wouter Dijkman · agenticmindshift.nl',
    unsubscribe:
      'Recibe este correo porque completó la AI Readiness Scorecard en agenticmindshift.nl.',
    subject: (n, p, u) => `${u ? '⚡ ' : ''}${n}, su informe de AI Readiness está listo — ${p}`,
  },
  pt: {
    eyebrow: (c) => `Relatório de AI Readiness — ${c}`,
    heading: (n) => `${n}, o seu relatório está pronto`,
    profileLabel: 'Perfil',
    scoreLabel: 'Pontuação',
    urgencyHigh: '⚡ Recomenda-se atenção imediata',
    urgencyMedium: 'Potencial de melhoria identificado',
    urgencyLow: 'Base sólida',
    recommendation: (t) =>
      `Com base nas suas respostas, recomendamos o percurso ${t}. O relatório completo contém uma análise aprofundada por dimensão, ações de melhoria concretas e uma explicação personalizada.`,
    reportContents: '',
    cta: 'Abrir o seu relatório completo →',
    questions: (l) => `Questões? Responda a este e-mail ou agende uma chamada via ${l}.`,
    footer: 'Agentic Mindshift · Wouter Dijkman · agenticmindshift.nl',
    unsubscribe:
      'Recebe este e-mail porque preencheu a AI Readiness Scorecard em agenticmindshift.nl.',
    subject: (n, p, u) => `${u ? '⚡ ' : ''}${n}, o seu relatório de AI Readiness está pronto — ${p}`,
  },
};

/**
 * Chrome-strings voor de twee opvolgmails (dag 3 en dag 7).
 *
 * Deze stonden hardcoded in het Nederlands in de cron-route en in de templates.
 * Een Duitse of Spaanse lead kreeg dus een Nederlandse opvolgmail op een
 * Engelstalig rapport. De taal staat per lead in de `locale`-kolom.
 */
interface FollowupMail {
  subject: string;
  heading: string;
  /**
   * Gesplitst rond de vetgedrukte waarde (de zwakke dimensies resp. de naam van
   * het traject); de template zet daar het <strong>-element tussen.
   */
  body1Lead: string;
  body1Tail: string;
  body2: string;
  cta: string;
}

interface FollowupStrings {
  greeting: (firstName: string) => string;
  unsubscribe: string;
  /** Voegwoord tussen de twee zwakste dimensies. */
  and: string;
  day3: FollowupMail;
  day7: FollowupMail;
  /** Stap 4 hergebruikt de dag-7-tekst met een eigen onderwerpregel. */
  nudgeSubject: string;
}

export const FOLLOWUP_STRINGS: Record<ReportLocale, FollowupStrings> = {
  nl: {
    greeting: (n) => `Beste ${n},`,
    unsubscribe: 'Liever geen vervolgmails? Antwoord met "afmelden".',
    and: ' en ',
    day3: {
      subject: 'Uw twee zwakste dimensies',
      heading: 'Waar het rendement weglekt',
      body1Lead:
        'U heeft uw rapport inmiddels kunnen doornemen. Twee dimensies bleven achter: ',
      body1Tail: '.',
      body2:
        'Juist deze twee worden zelden expliciet gemeten. Daardoor blijft het verlies lang onzichtbaar. Twintig minuten is genoeg om te bepalen wat dit voor uw portefeuille betekent.',
      cta: 'Plan een sparring-sessie',
    },
    day7: {
      subject: 'Een concrete vervolgstap',
      heading: 'De vervolgstap die bij uw score past',
      body1Lead: 'Op basis van uw antwoorden sluit het traject ',
      body1Tail:
        ' het beste aan bij uw situatie. Dat is een hypothese uit uw scorecard, geen verplichting.',
      body2:
        'Twintig minuten aan de telefoon is genoeg om te toetsen of die hypothese standhoudt tegen uw praktijk.',
      cta: 'Plan een gesprek van 20 minuten',
    },
    nudgeSubject: 'Opvolging — wanneer komt het u uit?',
  },
  en: {
    greeting: (n) => `Dear ${n},`,
    unsubscribe: 'Prefer not to receive further emails? Reply with "unsubscribe".',
    and: ' and ',
    day3: {
      subject: 'Your two weakest dimensions',
      heading: 'Where the return leaks away',
      body1Lead:
        'You have had a few days with your report. Two dimensions fell behind: ',
      body1Tail: '.',
      body2:
        'Those two are rarely measured explicitly, so the loss stays invisible for a long time. Twenty minutes is enough to work out what it means for your portfolio.',
      cta: 'Book a sparring session',
    },
    day7: {
      subject: 'A concrete next step',
      heading: 'The next step your score points to',
      body1Lead: 'Based on your answers, the track that fits your situation best is ',
      body1Tail: '. That is a hypothesis from your scorecard, not a commitment.',
      body2:
        'Twenty minutes on the phone is enough to test whether it holds up against your reality.',
      cta: 'Book a 20-minute call',
    },
    nudgeSubject: 'Following up — when would suit you?',
  },
  de: {
    greeting: (n) => `Guten Tag ${n},`,
    unsubscribe: 'Keine weiteren E-Mails erwünscht? Antworten Sie mit „abmelden".',
    and: ' und ',
    day3: {
      subject: 'Ihre zwei schwächsten Dimensionen',
      heading: 'Wo die Rendite versickert',
      body1Lead:
        'Sie hatten einige Tage Zeit für Ihren Bericht. Zwei Dimensionen fielen ab: ',
      body1Tail: '.',
      body2:
        'Gerade diese beiden werden selten explizit gemessen. Der Verlust bleibt dadurch lange unsichtbar. Zwanzig Minuten genügen, um zu klären, was das für Ihr Portfolio bedeutet.',
      cta: 'Sparring-Gespräch vereinbaren',
    },
    day7: {
      subject: 'Ein konkreter nächster Schritt',
      heading: 'Der nächste Schritt zu Ihrem Ergebnis',
      body1Lead: 'Auf Basis Ihrer Antworten passt am besten der Weg ',
      body1Tail: '. Das ist eine Hypothese aus Ihrer Scorecard, keine Verpflichtung.',
      body2:
        'Zwanzig Minuten am Telefon genügen, um zu prüfen, ob sie Ihrer Praxis standhält.',
      cta: 'Gespräch von 20 Minuten vereinbaren',
    },
    nudgeSubject: 'Nachfassen — wann passt es Ihnen?',
  },
  es: {
    greeting: (n) => `Estimado/a ${n}:`,
    unsubscribe: '¿Prefiere no recibir más correos? Responda con «baja».',
    and: ' y ',
    day3: {
      subject: 'Sus dos dimensiones más débiles',
      heading: 'Dónde se escapa la rentabilidad',
      body1Lead:
        'Ha tenido unos días para revisar su informe. Dos dimensiones quedaron rezagadas: ',
      body1Tail: '.',
      body2:
        'Precisamente esas dos se miden pocas veces de forma explícita, así que la pérdida tarda en hacerse visible. Veinte minutos bastan para determinar qué significa para su cartera.',
      cta: 'Reservar una sesión de sparring',
    },
    day7: {
      subject: 'Un siguiente paso concreto',
      heading: 'El siguiente paso que indica su puntuación',
      body1Lead: 'Según sus respuestas, el trayecto que mejor encaja con su situación es ',
      body1Tail: '. Es una hipótesis derivada de su scorecard, no un compromiso.',
      body2:
        'Veinte minutos por teléfono bastan para comprobar si se sostiene frente a su realidad.',
      cta: 'Reservar una llamada de 20 minutos',
    },
    nudgeSubject: 'Seguimiento: ¿cuándo le viene bien?',
  },
  pt: {
    greeting: (n) => `Caro(a) ${n},`,
    unsubscribe: 'Prefere não receber mais e-mails? Responda com «cancelar».',
    and: ' e ',
    day3: {
      subject: 'As suas duas dimensões mais fracas',
      heading: 'Onde a rentabilidade se perde',
      body1Lead:
        'Já teve alguns dias para rever o seu relatório. Duas dimensões ficaram para trás: ',
      body1Tail: '.',
      body2:
        'São precisamente essas duas que raramente se medem de forma explícita, pelo que a perda permanece invisível durante muito tempo. Vinte minutos chegam para perceber o que significa para a sua carteira.',
      cta: 'Marcar uma sessão de sparring',
    },
    day7: {
      subject: 'Um passo seguinte concreto',
      heading: 'O passo seguinte indicado pela sua pontuação',
      body1Lead: 'Com base nas suas respostas, o percurso que melhor se adequa à sua situação é ',
      body1Tail: '. É uma hipótese retirada da sua scorecard, não um compromisso.',
      body2:
        'Vinte minutos ao telefone chegam para verificar se se mantém perante a sua realidade.',
      cta: 'Marcar uma chamada de 20 minutos',
    },
    nudgeSubject: 'Seguimento — quando lhe é conveniente?',
  },
};

export function calLink(): string {
  return CAL_LINK;
}
