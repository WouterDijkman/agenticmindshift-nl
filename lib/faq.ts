export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    id: 'sales-pitch',
    question: 'Is dit weer een verkapte sales pitch?',
    answer:
      'Nee. U ontvangt een rapport. Geen vervolggesprek verplicht, niets te bevestigen. Als ik iets wil voorstellen doe ik dat expliciet, en alleen als uw score-profiel daarvoor aanleiding geeft.',
  },
  {
    id: 'vertrouwelijk',
    question: 'Hoe vertrouwelijk is dit?',
    answer:
      'Volledig. Uw antwoorden worden niet gedeeld, niet verkocht, niet gebruikt voor benchmarks zonder anonimisering. U kunt anoniem invullen als u dat wenst — u geeft uw naam pas bij het ontvangen van het rapport.',
  },
  {
    id: 'voor-wie',
    question: 'Voor welk type partij is de Scorecard ontworpen?',
    answer:
      "Specifiek voor Nederlandse regionale PE-huizen, M&A-boutiques en DGA's in de lower-mid market. Niet voor startups, niet voor grote corporates, niet voor partijen buiten dit segment.",
  },
  {
    id: 'onderbouwing',
    question: 'Wat is de onderbouwing van de zes dimensies?',
    answer:
      'De dimensies zijn opgebouwd vanuit bijna zes jaar bankpraktijk aan beide kanten van de transactietafel — Rabobank Financial Restructuring en ING Acquisition Finance & Leveraged Lending — en gebenchmarkt tegen anonieme indicatoren van vergelijkbare partijen.',
  },
  {
    id: 'wie',
    question: 'Wie staat er achter Agentic Mindshift?',
    answer:
      'Ik ben Wouter Dijkman, founder van Agentic Mindshift. Voormalig associate bij ING Acquisition Finance & Leveraged Lending en specialist bij Rabobank Financial Restructuring. Meer op de Over-pagina.',
  },
  {
    id: 'duur',
    question: 'Hoe lang duurt de Scorecard echt?',
    answer:
      'Twaalf minuten gemiddeld. Vier secties, vijftien vragen. U kunt tussentijds pauzeren — uw antwoorden worden lokaal opgeslagen.',
  },
  {
    id: 'voorbeeld',
    question: 'Wat als ik de Scorecard niet wil invullen, maar wel het rapport-format wil zien?',
    answer:
      'Stuur een bericht via LinkedIn of email. Ik stuur dan een geanonimiseerd voorbeeldrapport toe.',
  },
];
