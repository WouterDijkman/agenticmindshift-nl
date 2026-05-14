export type OptionLetter = 'A' | 'B' | 'C' | 'D' | 'E';
export type Points = 1 | 2 | 3 | 4 | 5;

export type Dimension =
  | 'DealVelocity'
  | 'PortfolioIntelligence'
  | 'BiasDetection'
  | 'AIReadiness'
  | 'CapacityEngineering'
  | 'KnowledgeRetention';

export type OfferAssignment = 'A' | 'B' | 'C' | 'D' | 'none';

export interface QuestionOption {
  letter: OptionLetter;
  label: string;
  points: Points;
  /** Only set on Q4 (segmentation question): which offer should be assigned. */
  segmentTo?: OfferAssignment;
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
  // ===== SECTION 1: AI-realiteit vandaag =====
  {
    id: 'Q1',
    section: 1,
    text: 'Welke AI-initiatieven heeft uw organisatie de afgelopen 18 maanden daadwerkelijk in praktijk gebracht binnen uw deal- of portefeuille-werk?',
    dimension: 'AIReadiness',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Geen, we hebben het besproken maar niet uitgeprobeerd', points: 1 },
      { letter: 'B', label: 'We gebruiken ChatGPT of vergelijkbaar individueel, zonder organisatie-aanpak', points: 2 },
      { letter: 'C', label: 'Eén pilot met een specifieke use-case, beperkt in scope', points: 3 },
      { letter: 'D', label: 'Meerdere pilots of een gestructureerd traject, met externe ondersteuning', points: 4 },
      { letter: 'E', label: 'AI is geïntegreerd in onze operationele cyclus, met meetbare output', points: 5 },
    ],
  },
  {
    id: 'Q2',
    section: 1,
    text: 'Wanneer u terugkijkt op wat u met AI heeft geprobeerd, hoe verhouden de resultaten zich tot wat u oorspronkelijk verwachtte?',
    dimension: 'AIReadiness',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Niet van toepassing, we hebben niets geprobeerd', points: 1 },
      { letter: 'B', label: 'Resultaten bleven duidelijk achter bij verwachting', points: 2 },
      { letter: 'C', label: 'Wisselend, sommige onderdelen werkten, andere niet', points: 3 },
      { letter: 'D', label: 'Resultaten in lijn met verwachting, maar zonder duidelijke schaal-effecten', points: 4 },
      { letter: 'E', label: 'Resultaten overtroffen verwachting, met meetbare impact op deal-werk of portefeuille', points: 5 },
    ],
  },
  {
    id: 'Q3',
    section: 1,
    text: 'Als uw AI-initiatieven onder uw verwachting bleven, wat denkt u dat de hoofdoorzaak was?',
    dimension: 'AIReadiness',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Niet van toepassing, of we hebben geen reflectie gedaan', points: 1 },
      { letter: 'B', label: 'De tools zelf waren niet goed genoeg', points: 2 },
      { letter: 'C', label: 'Te weinig tijd of focus om er serieus mee aan de slag te gaan', points: 3 },
      { letter: 'D', label: 'Te weinig domein-specifieke begeleiding, generieke AI-experts begrepen onze deal-context niet', points: 4 },
      { letter: 'E', label: 'We hebben geleerd wat wel werkt en passen dat nu structureel toe', points: 5 },
    ],
  },
  {
    id: 'Q4',
    section: 1,
    text: 'Welk type begeleiding zoekt u idealiter voor uw volgende AI-stap?',
    dimension: 'AIReadiness',
    isSegmentation: true,
    options: [
      { letter: 'A', label: 'We zijn niet op zoek naar begeleiding op dit moment', points: 1, segmentTo: 'none' },
      { letter: 'B', label: 'Een training of workshop voor ons team', points: 2, segmentTo: 'D' },
      { letter: 'C', label: 'Een eenmalig project op een specifieke use-case', points: 3, segmentTo: 'B' },
      { letter: 'D', label: 'Doorlopende begeleiding van iemand die onze deal-context kent', points: 4, segmentTo: 'C' },
      { letter: 'E', label: 'Een complete operationele transformatie', points: 5, segmentTo: 'A' },
    ],
  },

  // ===== SECTION 2: Uw deal-cyclus =====
  {
    id: 'Q5',
    section: 2,
    text: 'Hoe modelleert u AI-substitutierisico in de entry-multiple bij dienstverlenende targets?',
    dimension: 'AIReadiness',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Niet, het zit impliciet in de algemene sectorrisico-opslag', points: 1 },
      { letter: 'B', label: 'Kwalitatieve vermelding in de IC-memo', points: 2 },
      { letter: 'C', label: 'Sensitivity-analyse op 10% marge-erosie, generiek', points: 3 },
      { letter: 'D', label: 'Sensitivity met specifieke aannames per functiegroep', points: 4 },
      { letter: 'E', label: "Volledig gemodelleerd, doorgerekend naar hold-period scenario's", points: 5 },
    ],
  },
  {
    id: 'Q6',
    section: 2,
    text: 'Hoeveel werkdagen verstrijken er gemiddeld tussen ontvangst van een Information Memorandum en uw eerste investment-committee-ready oordeel?',
    dimension: 'DealVelocity',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Meer dan 20 werkdagen', points: 1 },
      { letter: 'B', label: '15 tot 20 werkdagen', points: 2 },
      { letter: 'C', label: '10 tot 15 werkdagen', points: 3 },
      { letter: 'D', label: '5 tot 10 werkdagen', points: 4 },
      { letter: 'E', label: 'Minder dan 5 werkdagen', points: 5 },
    ],
  },
  {
    id: 'Q7',
    section: 2,
    text: 'Bij uw laatste drie acquisities: hoe vaak heeft u de management-presentatie van het target laten valideren door iemand die expliciet niet in het deal-team zat?',
    dimension: 'BiasDetection',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Niet, het deal-team draagt de verantwoordelijkheid', points: 1 },
      { letter: 'B', label: 'Informeel, via een gesprek buiten het team', points: 2 },
      { letter: 'C', label: 'Eén keer, in één van de drie deals', points: 3 },
      { letter: 'D', label: 'Standaard, intern door iemand buiten het team', points: 4 },
      { letter: 'E', label: 'Standaard, door iemand buiten onze organisatie', points: 5 },
    ],
  },

  // ===== SECTION 3: Uw portefeuille en MBR-cyclus =====
  {
    id: 'Q8',
    section: 3,
    text: 'Welk aandeel van uw maandelijkse MBR-cyclus bestaat uit het handmatig consolideren, schoonmaken en interpreteren van data uit verschillende portfoliobedrijven?',
    dimension: 'PortfolioIntelligence',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Meer dan 70% van de tijd', points: 1 },
      { letter: 'B', label: '50 tot 70%', points: 2 },
      { letter: 'C', label: '30 tot 50%', points: 3 },
      { letter: 'D', label: '15 tot 30%', points: 4 },
      { letter: 'E', label: 'Minder dan 15%, het meeste is geautomatiseerd', points: 5 },
    ],
  },
  {
    id: 'Q9',
    section: 3,
    text: 'Hoe vaak presenteert u in uw MBR een peer-benchmark voor het portfoliobedrijf, gebaseerd op vergelijkbare bedrijven in sector en omvang?',
    dimension: 'PortfolioIntelligence',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Nooit of alleen ad hoc', points: 1 },
      { letter: 'B', label: 'Eén tot twee keer per jaar', points: 2 },
      { letter: 'C', label: 'Per kwartaal', points: 3 },
      { letter: 'D', label: 'Maandelijks, handmatig samengesteld', points: 4 },
      { letter: 'E', label: 'Maandelijks, systematisch en geautomatiseerd', points: 5 },
    ],
  },
  {
    id: 'Q10',
    section: 3,
    text: 'Hoe vaak agendeert u AI-substitutierisico expliciet als onderwerp in board-meetings van uw portfoliobedrijven, los van algemene digitalisering?',
    dimension: 'AIReadiness',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Niet, of alleen als het portfoliobedrijf het zelf aankaart', points: 1 },
      { letter: 'B', label: 'Eén tot twee keer per jaar, als strategisch thema', points: 2 },
      { letter: 'C', label: 'Per kwartaal, maar zonder gestructureerde indicatoren', points: 3 },
      { letter: 'D', label: 'Maandelijks, met indicatoren per portfoliobedrijf', points: 4 },
      { letter: 'E', label: 'Continu, ingebed in de operationele cyclus', points: 5 },
    ],
  },
  {
    id: 'Q11',
    section: 3,
    text: 'Wanneer een portfoliobedrijf onder verwachting presteert, hoe snel weet u typisch of het een eenmalig kwartaal-effect is of een structureel patroon?',
    dimension: 'PortfolioIntelligence',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Pas na drie kwartalen, achteraf evident', points: 1 },
      { letter: 'B', label: 'Na twee kwartalen, op basis van trendlijnen', points: 2 },
      { letter: 'C', label: 'Binnen één kwartaal, op basis van eigen analyse', points: 3 },
      { letter: 'D', label: 'Binnen weken, op basis van leading indicators', points: 4 },
      { letter: 'E', label: 'Direct, op basis van geautomatiseerde signalen in onze systemen', points: 5 },
    ],
  },

  // ===== SECTION 4: Uw team en kennis =====
  {
    id: 'Q12',
    section: 4,
    text: 'Welk percentage van het werk van uw associates en analisten kan een goed-getrainde AI-stack vandaag al overnemen, zonder kwaliteitsverlies en mits gecontroleerd door een senior?',
    dimension: 'CapacityEngineering',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Vrijwel niets, het werk is te specifiek', points: 1 },
      { letter: 'B', label: 'Minder dan 20%', points: 2 },
      { letter: 'C', label: '20 tot 40%', points: 3 },
      { letter: 'D', label: '40 tot 60%', points: 4 },
      { letter: 'E', label: 'Meer dan 60%', points: 5 },
    ],
  },
  {
    id: 'Q13',
    section: 4,
    text: 'Wanneer een externe DD-leverancier (legal, financial, tax) een rapport oplevert, hoe wordt de onderliggende kennis structureel teruggebracht in uw eigen organisatie?',
    dimension: 'KnowledgeRetention',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'We bewaren het rapport, verder niets', points: 1 },
      { letter: 'B', label: 'We bespreken het in een team-meeting, geen formele vastlegging', points: 2 },
      { letter: 'C', label: 'We onttrekken key learnings naar een interne notitie', points: 3 },
      { letter: 'D', label: 'We hebben een gestructureerd systeem dat DD-output verwerkt', points: 4 },
      { letter: 'E', label: 'DD-output is ingebed in onze eigen modellen en methodologie, herbruikbaar bij volgende deals', points: 5 },
    ],
  },
  {
    id: 'Q14',
    section: 4,
    text: 'Wanneer een senior dealmaker uw organisatie verlaat, welk aandeel van zijn of haar accumulatieve kennis over uw portefeuille en pijplijn blijft achter in vindbare systemen?',
    dimension: 'KnowledgeRetention',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Vrijwel niets, het meeste zit in zijn of haar hoofd', points: 1 },
      { letter: 'B', label: 'Minder dan 25%', points: 2 },
      { letter: 'C', label: 'Ongeveer de helft', points: 3 },
      { letter: 'D', label: '75% of meer, dankzij documentatie-discipline', points: 4 },
      { letter: 'E', label: 'Vrijwel alles, het zit ingebed in systemen, niet personen', points: 5 },
    ],
  },
  {
    id: 'Q15',
    section: 4,
    text: 'Hoe vaak komt het voor dat uw team een kans laat lopen door operationele capaciteit?',
    dimension: 'CapacityEngineering',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Regelmatig, capaciteit is structureel onze bottleneck', points: 1 },
      { letter: 'B', label: 'Een paar keer per jaar', points: 2 },
      { letter: 'C', label: 'Zelden, maar het gebeurt', points: 3 },
      { letter: 'D', label: 'Vrijwel nooit, we hebben capaciteit op orde', points: 4 },
      { letter: 'E', label: 'Nooit, we kunnen meer dealflow aan dan we momenteel hebben', points: 5 },
    ],
  },
];

export const questionsBySection = (section: 1 | 2 | 3 | 4): Question[] =>
  questions.filter((q) => q.section === section);

export const getQuestion = (id: string): Question | undefined =>
  questions.find((q) => q.id === id);

export const totalQuestions = questions.length;
