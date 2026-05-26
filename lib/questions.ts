export type OptionLetter = 'A' | 'B' | 'C' | 'D' | 'E';
export type Points = 1 | 2 | 3 | 4 | 5;

export type Dimension =
  | 'DealVelocity'
  | 'PortfolioIntelligence'
  | 'BiasDetection'
  | 'AIReadiness'
  | 'CapacityEngineering'
  | 'KnowledgeRetention';

export type OfferAssignment = 'A' | 'B' | 'C' | 'D' | 'E' | 'none';

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
  PortfolioIntelligence: 'Analytische Kwaliteit',
  BiasDetection: 'Bias Detection',
  AIReadiness: 'AI Readiness',
  CapacityEngineering: 'Capacity Engineering',
  KnowledgeRetention: 'Knowledge Retention',
};

export const questions: Question[] = [
  // ===== SECTION 1: Uw analytische aanpak vandaag =====
  {
    id: 'Q1',
    section: 1,
    text: 'Hoe omschrijft u de analytische kwaliteit van uw huidige dossiers — bij een deal, een financieringsaanvraag of een portefeuillereview?',
    dimension: 'AIReadiness',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'We werken grotendeels op ervaring, zonder gestructureerde analytische aanpak', points: 1 },
      { letter: 'B', label: 'We gebruiken standaard Excel-modellen, maar zonder vaste methodologie of benchmark', points: 2 },
      { letter: 'C', label: 'We hebben een basisaanpak, maar de kwaliteit verschilt per dossier en per persoon', points: 3 },
      { letter: 'D', label: 'We hanteren een gestructureerde methodologie, maar nog niet volledig consistent', points: 4 },
      { letter: 'E', label: 'Onze aanpak is systematisch, reproduceerbaar en consistent over alle dossiers', points: 5 },
    ],
  },
  {
    id: 'Q2',
    section: 1,
    text: 'Wanneer u terugkijkt op recente dossiers — acquisities, financieringsaanvragen of portefeuillereviews — wat was het meest voorkomende knelpunt in de analytische voorbereiding?',
    dimension: 'AIReadiness',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'We hadden onvoldoende tijd of capaciteit om het goed voor te bereiden', points: 2 },
      { letter: 'B', label: 'Data was beschikbaar maar niet gestructureerd of vergelijkbaar', points: 2 },
      { letter: 'C', label: 'Er ontbrak een gedeelde methodologie — elk dossier werd anders aangepakt', points: 3 },
      { letter: 'D', label: 'De aanpak was goed maar te handmatig — te veel tijd aan consolidatie, te weinig aan analyse', points: 4 },
      { letter: 'E', label: 'Geen significant knelpunt — we waren tevreden over de voorbereiding', points: 5 },
    ],
  },
  {
    id: 'Q3',
    section: 1,
    text: 'Welk aandeel van uw analytische werkzaamheden — modelleren, vergelijken, samenvatten — zou een goed-ingericht AI-systeem vandaag al kunnen overnemen zonder kwaliteitsverlies?',
    dimension: 'AIReadiness',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Vrijwel niets, het werk is te specifiek en contextueel', points: 1 },
      { letter: 'B', label: 'Minder dan 20%', points: 2 },
      { letter: 'C', label: '20 tot 40%', points: 3 },
      { letter: 'D', label: '40 tot 60%', points: 4 },
      { letter: 'E', label: 'Meer dan 60% — de meeste analytische routine is geautomatiseerd', points: 5 },
    ],
  },
  {
    id: 'Q4',
    section: 1,
    text: 'Welke situatie is voor u het meest relevant op dit moment?',
    dimension: 'AIReadiness',
    isSegmentation: true,
    options: [
      { letter: 'A', label: 'Wij bereiden een acquisitie voor — buy-side analyse en deal intelligence', points: 4, segmentTo: 'B' },
      { letter: 'B', label: 'Wij bereiden een financieringsaanvraag voor — onderbouwing voor bank of investeerder', points: 3, segmentTo: 'E' },
      { letter: 'C', label: 'Wij monitoren bestaande deelnemingen — portefeuille-intelligence en vroege signalering', points: 4, segmentTo: 'A' },
      { letter: 'D', label: 'Wij signaleren financiële tegenwind — eerste indicatie van stress bij een deelneming', points: 2, segmentTo: 'C' },
      { letter: 'E', label: 'Wij willen meer deals kunnen analyseren met minder capaciteit', points: 3, segmentTo: 'D' },
    ],
  },

  // ===== SECTION 2: Uw deal- en analysecyclus =====
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
    text: 'Hoeveel werkdagen verstrijken er gemiddeld tussen ontvangst van een Information Memorandum (of vergelijkbaar startdocument) en uw eerste gefundeerde oordeel?',
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
    text: 'Bij uw laatste drie analytische trajecten: hoe vaak heeft u de centrale aannames laten valideren door iemand die expliciet niet bij de voorbereiding betrokken was?',
    dimension: 'BiasDetection',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Niet, het team draagt zelf de verantwoordelijkheid voor de aannames', points: 1 },
      { letter: 'B', label: 'Informeel, via een gesprek buiten het team', points: 2 },
      { letter: 'C', label: 'Eén keer, in één van de drie trajecten', points: 3 },
      { letter: 'D', label: 'Standaard, intern door iemand buiten het team', points: 4 },
      { letter: 'E', label: 'Standaard, door iemand buiten onze organisatie', points: 5 },
    ],
  },

  // ===== SECTION 3: Portefeuille, financiering en monitoring =====
  {
    id: 'Q8',
    section: 3,
    text: 'Welk aandeel van uw tijd gaat op aan het handmatig consolideren, schoonmaken en interpreteren van data — voor portefeuillebeheer, financieringsdossiers of deal-analyses?',
    dimension: 'PortfolioIntelligence',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Meer dan 70% van de tijd', points: 1 },
      { letter: 'B', label: '50 tot 70%', points: 2 },
      { letter: 'C', label: '30 tot 50%', points: 3 },
      { letter: 'D', label: '15 tot 30%', points: 4 },
      { letter: 'E', label: 'Minder dan 15%, het meeste is geautomatiseerd of gestructureerd', points: 5 },
    ],
  },
  {
    id: 'Q9',
    section: 3,
    text: 'Hoe vaak heeft u een actuele sectorvergelijking beschikbaar — voor een portefeuillerapportage, een financieringsmemo of een deal-analyse?',
    dimension: 'PortfolioIntelligence',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Nooit of alleen ad hoc', points: 1 },
      { letter: 'B', label: 'Eén tot twee keer per jaar', points: 2 },
      { letter: 'C', label: 'Per kwartaal', points: 3 },
      { letter: 'D', label: 'Per dossier, handmatig samengesteld', points: 4 },
      { letter: 'E', label: 'Per dossier, systematisch en reproduceerbaar', points: 5 },
    ],
  },
  {
    id: 'Q10',
    section: 3,
    text: 'Wanneer u analytische onderbouwing voorbereidt — voor een acquisitie, financieringsaanvraag of portefeuillereview — hoe volledig en gestructureerd is het resultaat doorgaans?',
    dimension: 'PortfolioIntelligence',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Ad hoc, op basis van beschikbare cijfers, geen vaste structuur', points: 1 },
      { letter: 'B', label: 'Gebaseerd op historische jaarcijfers, zonder forward-looking analyse of benchmark', points: 2 },
      { letter: 'C', label: 'Met een financieel model, maar zonder gestructureerde sectorvergelijking', points: 3 },
      { letter: 'D', label: 'Met een financieel model en benchmark, maar grotendeels handmatig samengesteld', points: 4 },
      { letter: 'E', label: 'Volledig gestructureerd dossier op alle relevante dimensies, systematisch en reproduceerbaar', points: 5 },
    ],
  },
  {
    id: 'Q11',
    section: 3,
    text: 'Wanneer een deelneming of dossier onder verwachting presteert, hoe snel weet u typisch of het een eenmalig effect is of een structureel patroon?',
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
    text: 'Welk percentage van het analytische routinewerk van uw team — modelleren, samenvatten, benchmarken — kan een goed-getrainde AI-stack vandaag al overnemen, mits gecontroleerd door een senior?',
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
    text: 'Wanneer een extern rapport binnenkomt — van een adviseur, accountant of DD-leverancier — hoe wordt de kennis structureel teruggebracht in uw eigen organisatie?',
    dimension: 'KnowledgeRetention',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'We bewaren het rapport, verder niets', points: 1 },
      { letter: 'B', label: 'We bespreken het in een meeting, geen formele vastlegging', points: 2 },
      { letter: 'C', label: 'We onttrekken key learnings naar een interne notitie', points: 3 },
      { letter: 'D', label: 'We hebben een gestructureerd systeem dat rapport-output verwerkt', points: 4 },
      { letter: 'E', label: 'Rapport-output is ingebed in onze eigen modellen en methodologie, herbruikbaar bij volgende trajecten', points: 5 },
    ],
  },
  {
    id: 'Q14',
    section: 4,
    text: 'Wanneer een senior medewerker uw organisatie verlaat, welk aandeel van zijn of haar kennis over uw portefeuille, deals en aanpak blijft achter in vindbare systemen?',
    dimension: 'KnowledgeRetention',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Vrijwel niets, het meeste zit in zijn of haar hoofd', points: 1 },
      { letter: 'B', label: 'Minder dan 25%', points: 2 },
      { letter: 'C', label: 'Ongeveer de helft', points: 3 },
      { letter: 'D', label: '75% of meer, dankzij documentatie-discipline', points: 4 },
      { letter: 'E', label: 'Vrijwel alles, het zit ingebed in systemen, niet in personen', points: 5 },
    ],
  },
  {
    id: 'Q15',
    section: 4,
    text: 'Hoe vaak laat u een kans liggen — een deal, een financieringsronde, een exitmoment — doordat uw team de capaciteit of de analytische basis niet op tijd gereed heeft?',
    dimension: 'CapacityEngineering',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Regelmatig, capaciteit is structureel onze bottleneck', points: 1 },
      { letter: 'B', label: 'Een paar keer per jaar', points: 2 },
      { letter: 'C', label: 'Zelden, maar het gebeurt', points: 3 },
      { letter: 'D', label: 'Vrijwel nooit, we hebben capaciteit op orde', points: 4 },
      { letter: 'E', label: 'Nooit, we kunnen meer aanvragen of dealflow aan dan we momenteel hebben', points: 5 },
    ],
  },
];

export const questionsBySection = (section: 1 | 2 | 3 | 4): Question[] =>
  questions.filter((q) => q.section === section);

export const getQuestion = (id: string): Question | undefined =>
  questions.find((q) => q.id === id);

export const totalQuestions = questions.length;
