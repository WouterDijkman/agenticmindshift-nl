export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    id: 'duur',
    question: 'Hoe lang duurt de Scorecard echt?',
    answer:
      'Twaalf minuten gemiddeld. Vier secties, vijftien vragen. U kunt tussentijds pauzeren \u2014 uw antwoorden worden lokaal opgeslagen en blijven beschikbaar zodra u de pagina opnieuw opent.',
  },
  {
    id: 'voor-wie',
    question: 'Voor welk type partij is de Scorecard ontworpen?',
    answer:
      "Specifiek voor Nederlandse regionale PE-huizen, M&A-boutiques en DGA's in de lower-mid market. Niet voor startups, niet voor grote corporates, niet voor partijen buiten dit segment.",
  },
  {
    id: 'vertrouwelijk',
    question: 'Hoe vertrouwelijk is dit?',
    answer:
      'Volledig. Uw antwoorden worden niet gedeeld, niet verkocht, niet gebruikt voor benchmarks zonder anonimisering. U kunt anoniem invullen als u dat wenst \u2014 uw naam wordt pas gevraagd bij het ontvangen van het rapport.',
  },
  {
    id: 'onderbouwing',
    question: 'Wat is de onderbouwing van de zes dimensies?',
    answer:
      'De dimensies zijn opgebouwd vanuit zes jaar praktijkervaring aan beide kanten van de transactietafel \u2014 acquisition finance op leveraged buy-outs en financial restructuring op portefeuilles in stress \u2014 en gebenchmarkt tegen anonieme indicatoren van vergelijkbare partijen in de Nederlandse lower-mid market.',
  },
  {
    id: 'wie',
    question: 'Wie staat er achter Agentic Mindshift?',
    answer:
      'Wouter Dijkman, founder van Agentic Mindshift. Zes jaar deal-ervaring aan beide kanten van de transactietafel: acquisition finance op leveraged buy-outs en financial restructuring op portefeuilles in stress, Dutch mid-market 1\u201325M. Meer op de Over-pagina.',
  },
  {
    id: 'sales-pitch',
    question: 'Is dit weer een verkapte sales pitch?',
    answer:
      'Nee. U ontvangt een concreet rapport met scores en aanbevelingen. Als wij iets willen voorstellen, doen wij dat expliciet \u2014 en alleen als uw scoreprofiel daarvoor aanleiding geeft.',
  },
  {
    id: 'voorbeeld',
    question: 'Wat als ik de Scorecard niet wil invullen, maar wel het rapport-format wil zien?',
    answer:
      'Stuur een bericht via LinkedIn of e-mail. Wij sturen dan een geanonimiseerd voorbeeldrapport toe.',
  },
];
