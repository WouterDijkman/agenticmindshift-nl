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

export function calLink(): string {
  return CAL_LINK;
}
