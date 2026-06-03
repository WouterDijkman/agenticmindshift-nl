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
      'De dimensies zijn gebaseerd op praktijkervaring in acquisition finance en financial restructuring, en gebenchmarkt tegen anonieme indicatoren van vergelijkbare partijen in de Nederlandse lower-mid market.',
  },
  {
    id: 'wie',
    question: 'Wie staat er achter Agentic Mindshift?',
    answer:
      'Wouter Dijkman, founder. Acquisition finance en financial restructuring, Nederlandse mid-market. Meer op de Over-pagina.',
  },
  {
    id: 'sales-pitch',
    question: 'Is dit weer een verkapte sales pitch?',
    answer:
      'Nee. U ontvangt scores op zes dimensies, twee prioritaire aandachtspunten en een concreet vervolgvoorstel. Pas daarna beslist u of u verdergaat. Geen druk, geen follow-up tenzij u dat zelf initieert.',
  },
  {
    id: 'investering',
    question: 'Wat zijn de investeringsniveaus voor de verschillende trajecten?',
    answer:
      'Er zijn vier routes: een AI Sparring Sessie vanaf €395 (eenmalig, 60–90 minuten), Consultancy & Strategic Enablement vanaf €4.500 per traject of retainer, een Fractional AI Officer voor €3.500–€5.500 per maand (min. 3 maanden), en AI Due Diligence & Portfolio vanaf €10.000 per deal of €6.500–€8.500 per maand voor doorlopende portfolio-intelligence. Alle bedragen exclusief btw. Zie /werkwijze voor de volledige toelichting en volumetarieven.',
  },
  {
    id: 'voorbeeld',
    question: 'Wat als ik de Scorecard niet wil invullen, maar wel het rapport-format wil zien?',
    answer:
      'Stuur een bericht via LinkedIn of e-mail. Wij sturen dan een geanonimiseerd voorbeeldrapport toe.',
  },
];
