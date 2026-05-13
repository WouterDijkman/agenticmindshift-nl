export type OptionLetter = 'A' | 'B' | 'C' | 'D' | 'E';
export type Points = 1 | 2 | 3 | 4 | 5;

export type Dimension =
  | 'DealVelocity'
  | 'PortfolioIntelligence'
  | 'BiasDetection'
  | 'AIReadiness'
  | 'CapacityEngineering'
  | 'KnowledgeRetention';

export interface QuestionOption {
  letter: OptionLetter;
  label: string;
  points: Points;
}

export interface Question {
  id: string;
  section: 1 | 2 | 3 | 4;
  text: string;
  dimension: Dimension;
  isSegmentation: boolean;
  options: QuestionOption[];
}

export const dimensionLabels: Record<Dimension, string> = {
  DealVelocity: 'Deal Velocity',
  PortfolioIntelligence: 'Portfolio Intelligence',
  BiasDetection: 'Bias Detection',
  AIReadiness: 'AI Readiness',
  CapacityEngineering: 'Capacity Engineering',
  KnowledgeRetention: 'Knowledge Retention',
};

export const questions: Question[] = [
  // ===== SECTION 1: AI READINESS FOCUS =====
  {
    id: 'Q1',
    section: 1,
    text: 'Hoeveel AI-initiatieven zijn er de afgelopen 18 maanden binnen uw organisatie gestart?',
    dimension: 'AIReadiness',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Geen', points: 1 },
      { letter: 'B', label: '1-2', points: 2 },
      { letter: 'C', label: '3-5', points: 3 },
      { letter: 'D', label: '6-10', points: 4 },
      { letter: 'E', label: 'Meer dan 10', points: 5 },
    ],
  },
  {
    id: 'Q2',
    section: 1,
    text: 'In hoeverre voldoen de resultaten van die initiatieven aan uw verwachtingen?',
    dimension: 'AIReadiness',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Ver onder verwachting', points: 1 },
      { letter: 'B', label: 'Onder verwachting', points: 2 },
      { letter: 'C', label: 'Conform verwachting', points: 3 },
      { letter: 'D', label: 'Boven verwachting', points: 4 },
      { letter: 'E', label: 'Ver boven verwachting', points: 5 },
    ],
  },
  {
    id: 'Q3',
    section: 1,
    text: 'Wat is de voornaamste oorzaak wanneer resultaten achterblijven?',
    dimension: 'AIReadiness',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Onduidelijk waarom resultaten uitblijven', points: 1 },
      { letter: 'B', label: 'Te weinig adoptie door het team', points: 2 },
      { letter: 'C', label: 'Verkeerde use case gekozen', points: 3 },
      { letter: 'D', label: 'Technische integratie loopt achter', points: 4 },
      { letter: 'E', label: 'Geen achterstand, resultaten zijn op koers', points: 5 },
    ],
  },
  {
    id: 'Q4',
    section: 1,
    text: 'Welk type begeleiding past het beste bij uw situatie nu?',
    dimension: 'AIReadiness',
    isSegmentation: true,
    options: [
      { letter: 'A', label: 'Geen begeleiding nodig', points: 1 },
      { letter: 'B', label: 'Eenmalige workshops voor het team', points: 2 },
      { letter: 'C', label: 'Een afgebakend AI-project, bijvoorbeeld due diligence', points: 3 },
      { letter: 'D', label: 'Een fractional AI-officer, 2-3 dagen per maand', points: 4 },
      { letter: 'E', label: 'Doorlopende portfolio-intelligence', points: 5 },
    ],
  },

  // ===== SECTION 2 =====
  {
    id: 'Q5',
    section: 2,
    text: 'Modelleert u AI-substitutierisico expliciet in uw entry-multiple?',
    dimension: 'AIReadiness',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Nooit, dit komt niet ter sprake', points: 1 },
      { letter: 'B', label: 'Zelden, alleen bij tech-deals', points: 2 },
      { letter: 'C', label: 'Soms, afhankelijk van de sector', points: 3 },
      { letter: 'D', label: 'Vaak, expliciete sensitivity-analyse', points: 4 },
      { letter: 'E', label: 'Standaard onderdeel van elke deal', points: 5 },
    ],
  },
  {
    id: 'Q6',
    section: 2,
    text: 'Hoeveel werkdagen liggen er gemiddeld tussen Information Memorandum en een IC-ready oordeel?',
    dimension: 'DealVelocity',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Meer dan 30 dagen', points: 1 },
      { letter: 'B', label: '21-30 dagen', points: 2 },
      { letter: 'C', label: '14-20 dagen', points: 3 },
      { letter: 'D', label: '8-13 dagen', points: 4 },
      { letter: 'E', label: '7 dagen of minder', points: 5 },
    ],
  },
  {
    id: 'Q7',
    section: 2,
    text: 'Wie valideert het management buiten het deal-team om?',
    dimension: 'BiasDetection',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Niemand, het deal-team beslist autonoom', points: 1 },
      { letter: 'B', label: 'Soms een collega ad hoc', points: 2 },
      { letter: 'C', label: 'Een vaste partner buiten het team', points: 3 },
      { letter: 'D', label: 'Externe expert wordt ad hoc ingeschakeld', points: 4 },
      { letter: 'E', label: 'Gestructureerd extern panel per deal', points: 5 },
    ],
  },

  // ===== SECTION 3 =====
  {
    id: 'Q8',
    section: 3,
    text: 'Welk percentage van uw MBR-tijd gaat op aan handmatige dataconsolidatie?',
    dimension: 'PortfolioIntelligence',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Meer dan 60%', points: 1 },
      { letter: 'B', label: '40-60%', points: 2 },
      { letter: 'C', label: '20-40%', points: 3 },
      { letter: 'D', label: '5-20%', points: 4 },
      { letter: 'E', label: 'Minder dan 5%', points: 5 },
    ],
  },
  {
    id: 'Q9',
    section: 3,
    text: 'Hoe vaak benchmarkt u portefeuilleprestatie tegen peers in uw MBR?',
    dimension: 'PortfolioIntelligence',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Nooit', points: 1 },
      { letter: 'B', label: 'Jaarlijks', points: 2 },
      { letter: 'C', label: 'Per kwartaal', points: 3 },
      { letter: 'D', label: 'Maandelijks ad hoc', points: 4 },
      { letter: 'E', label: 'Elke MBR, gestructureerd', points: 5 },
    ],
  },
  {
    id: 'Q10',
    section: 3,
    text: 'Staat AI-substitutierisico op de bestuursagenda van uw portfolio?',
    dimension: 'AIReadiness',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Nooit', points: 1 },
      { letter: 'B', label: 'Eenmalig besproken', points: 2 },
      { letter: 'C', label: 'Per kwartaal aangestipt', points: 3 },
      { letter: 'D', label: 'Standaard per MBR', points: 4 },
      { letter: 'E', label: 'Vast agendapunt elke vergadering', points: 5 },
    ],
  },
  {
    id: 'Q11',
    section: 3,
    text: 'Hoe snel detecteert u structurele onderprestatie in een portfoliobedrijf?',
    dimension: 'PortfolioIntelligence',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Pas bij jaarrapportage', points: 1 },
      { letter: 'B', label: 'Pas bij halfjaarcijfers', points: 2 },
      { letter: 'C', label: 'Binnen het kwartaal', points: 3 },
      { letter: 'D', label: 'Binnen twee maanden', points: 4 },
      { letter: 'E', label: 'Binnen één maand', points: 5 },
    ],
  },

  // ===== SECTION 4 =====
  {
    id: 'Q12',
    section: 4,
    text: 'Welk percentage van het werk van uw associates zou AI kunnen overnemen?',
    dimension: 'CapacityEngineering',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Minder dan 5%', points: 1 },
      { letter: 'B', label: '5-15%', points: 2 },
      { letter: 'C', label: '15-30%', points: 3 },
      { letter: 'D', label: '30-50%', points: 4 },
      { letter: 'E', label: 'Meer dan 50%', points: 5 },
    ],
  },
  {
    id: 'Q13',
    section: 4,
    text: 'Hoe wordt DD-kennis intern vastgelegd?',
    dimension: 'KnowledgeRetention',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Niet, blijft bij de individuele dealmaker', points: 1 },
      { letter: 'B', label: 'Losse notities en e-mails', points: 2 },
      { letter: 'C', label: 'Gedeelde mapstructuur per deal', points: 3 },
      { letter: 'D', label: 'Centraal DD-archief met templates', points: 4 },
      { letter: 'E', label: 'Gestructureerde kennisbasis met AI-toegang', points: 5 },
    ],
  },
  {
    id: 'Q14',
    section: 4,
    text: 'Welk percentage van de kennis van een vertrekkende senior dealmaker blijft in systemen achter?',
    dimension: 'KnowledgeRetention',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Minder dan 10%', points: 1 },
      { letter: 'B', label: '10-25%', points: 2 },
      { letter: 'C', label: '25-50%', points: 3 },
      { letter: 'D', label: '50-75%', points: 4 },
      { letter: 'E', label: 'Meer dan 75%', points: 5 },
    ],
  },
  {
    id: 'Q15',
    section: 4,
    text: 'Hoe vaak mist u kansen door capaciteitsgebrek?',
    dimension: 'CapacityEngineering',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Wekelijks', points: 1 },
      { letter: 'B', label: 'Maandelijks', points: 2 },
      { letter: 'C', label: 'Per kwartaal', points: 3 },
      { letter: 'D', label: 'Een paar keer per jaar', points: 4 },
      { letter: 'E', label: 'Bijna nooit', points: 5 },
    ],
  },
];

export const questionsBySection = (section: 1 | 2 | 3 | 4): Question[] =>
  questions.filter((q) => q.section === section);

export const getQuestion = (id: string): Question | undefined =>
  questions.find((q) => q.id === id);

export const totalQuestions = questions.length;
