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
  PortfolioIntelligence: 'Analytical Quality',
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
    text: 'Hoe goed onderbouwd zijn uw dossiers op dit moment?',
    dimension: 'AIReadiness',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'We werken grotendeels op ervaring, zonder vaste werkwijze', points: 1 },
      { letter: 'B', label: 'We gebruiken standaard Excel-modellen, zonder vaste werkwijze of benchmark', points: 2 },
      { letter: 'C', label: 'Er is een basisaanpak, maar de kwaliteit verschilt per dossier en per persoon', points: 3 },
      { letter: 'D', label: 'We volgen een vaste werkwijze, maar nog niet overal consistent', points: 4 },
      { letter: 'E', label: 'Onze aanpak is systematisch, reproduceerbaar en overal gelijk', points: 5 },
    ],
  },
  {
    id: 'Q2',
    section: 1,
    text: 'Waar liep de voorbereiding bij uw recente dossiers het vaakst vast?',
    dimension: 'AIReadiness',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Onvoldoende tijd of capaciteit om het goed voor te bereiden', points: 2 },
      { letter: 'B', label: 'De data was er wel, maar niet gestructureerd of vergelijkbaar', points: 2 },
      { letter: 'C', label: 'Er was geen gedeelde werkwijze; elk dossier werd anders aangepakt', points: 3 },
      { letter: 'D', label: 'De aanpak was goed, maar te handmatig: veel verzamelen, weinig analyseren', points: 4 },
      { letter: 'E', label: 'Niets noemenswaardigs; we waren tevreden over de voorbereiding', points: 5 },
    ],
  },
  {
    id: 'Q3',
    section: 1,
    text: 'Hoeveel van uw analysewerk — modelleren, vergelijken, samenvatten — kan AI vandaag al overnemen zonder kwaliteitsverlies?',
    dimension: 'AIReadiness',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Vrijwel niets; het werk is te specifiek', points: 1 },
      { letter: 'B', label: 'Minder dan 20%', points: 2 },
      { letter: 'C', label: '20 tot 40%', points: 3 },
      { letter: 'D', label: '40 tot 60%', points: 4 },
      { letter: 'E', label: 'Meer dan 60%; het meeste routinewerk loopt al geautomatiseerd', points: 5 },
    ],
  },
  {
    id: 'Q4',
    section: 1,
    text: 'Welke situatie is voor u het meest relevant op dit moment?',
    dimension: 'AIReadiness',
    isSegmentation: true,
    options: [
      { letter: 'A', label: 'We bereiden een acquisitie voor: buy-side analyse en deal intelligence', points: 4, segmentTo: 'B' },
      { letter: 'B', label: 'We bereiden een financieringsaanvraag voor: onderbouwing voor bank of investeerder', points: 3, segmentTo: 'E' },
      { letter: 'C', label: 'We volgen bestaande deelnemingen: portefeuille-inzicht en vroege signalen', points: 4, segmentTo: 'A' },
      { letter: 'D', label: 'We zien financiële tegenwind: eerste signalen van stress bij een deelneming', points: 2, segmentTo: 'C' },
      { letter: 'E', label: 'We willen meer deals analyseren met dezelfde bezetting', points: 3, segmentTo: 'D' },
    ],
  },

  // ===== SECTION 2: Uw deal- en analysecyclus =====
  {
    id: 'Q5',
    section: 2,
    text: 'Rekent u het risico dat AI het werk overneemt mee in de entry-multiple bij dienstverlenende targets?',
    dimension: 'AIReadiness',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Nee; het zit impliciet in de algemene sectorrisico-opslag', points: 1 },
      { letter: 'B', label: 'Alleen als opmerking in de IC-memo', points: 2 },
      { letter: 'C', label: 'Generieke sensitivity-analyse op 10% marge-erosie', points: 3 },
      { letter: 'D', label: 'Sensitivity met eigen aannames per functiegroep', points: 4 },
      { letter: 'E', label: "Volledig doorgerekend, tot in de hold-period scenario's", points: 5 },
    ],
  },
  {
    id: 'Q6',
    section: 2,
    text: 'Hoeveel werkdagen zitten er gemiddeld tussen het binnenkomen van een Information Memorandum en uw eerste gefundeerde oordeel?',
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
    text: 'Bij uw laatste drie dossiers: hoe vaak liet u de kernaannames toetsen door iemand die er zelf niet aan gewerkt had?',
    dimension: 'BiasDetection',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Niet; het team staat zelf voor zijn aannames', points: 1 },
      { letter: 'B', label: 'Informeel, in een gesprek buiten het team', points: 2 },
      { letter: 'C', label: 'Eén keer, bij één van de drie', points: 3 },
      { letter: 'D', label: 'Standaard, door iemand binnen het bedrijf maar buiten het team', points: 4 },
      { letter: 'E', label: 'Standaard, door iemand van buiten het bedrijf', points: 5 },
    ],
  },

  // ===== SECTION 3: Portefeuille, financiering en monitoring =====
  {
    id: 'Q8',
    section: 3,
    text: 'Hoeveel van uw tijd gaat op aan het handmatig verzamelen, opschonen en interpreteren van data?',
    dimension: 'PortfolioIntelligence',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Meer dan 70%', points: 1 },
      { letter: 'B', label: '50 tot 70%', points: 2 },
      { letter: 'C', label: '30 tot 50%', points: 3 },
      { letter: 'D', label: '15 tot 30%', points: 4 },
      { letter: 'E', label: 'Minder dan 15%; het meeste loopt geautomatiseerd', points: 5 },
    ],
  },
  {
    id: 'Q9',
    section: 3,
    text: 'Hoe vaak heeft u een actuele sectorvergelijking bij de hand?',
    dimension: 'PortfolioIntelligence',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Nooit, of alleen incidenteel', points: 1 },
      { letter: 'B', label: 'Eén tot twee keer per jaar', points: 2 },
      { letter: 'C', label: 'Elk kwartaal', points: 3 },
      { letter: 'D', label: 'Per dossier, handmatig samengesteld', points: 4 },
      { letter: 'E', label: 'Per dossier, systematisch en reproduceerbaar', points: 5 },
    ],
  },
  {
    id: 'Q10',
    section: 3,
    text: 'Hoe compleet is uw onderbouwing op het moment dat een dossier af is?',
    dimension: 'PortfolioIntelligence',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Ad hoc, op de cijfers die er zijn, zonder vaste structuur', points: 1 },
      { letter: 'B', label: 'Op historische jaarcijfers, zonder vooruitblik of benchmark', points: 2 },
      { letter: 'C', label: 'Met een financieel model, maar zonder sectorvergelijking', points: 3 },
      { letter: 'D', label: 'Met model en benchmark, maar grotendeels handmatig samengesteld', points: 4 },
      { letter: 'E', label: 'Compleet dossier op alle relevante dimensies, systematisch en reproduceerbaar', points: 5 },
    ],
  },
  {
    id: 'Q11',
    section: 3,
    text: 'Wanneer een deelneming onder verwachting presteert: hoe snel weet u of het eenmalig is of structureel?',
    dimension: 'PortfolioIntelligence',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Pas na drie kwartalen, als het achteraf duidelijk is', points: 1 },
      { letter: 'B', label: 'Na twee kwartalen, uit de trendlijn', points: 2 },
      { letter: 'C', label: 'Binnen één kwartaal, uit eigen analyse', points: 3 },
      { letter: 'D', label: 'Binnen weken, uit vroege indicatoren', points: 4 },
      { letter: 'E', label: 'Direct, via geautomatiseerde signalen in onze systemen', points: 5 },
    ],
  },

  // ===== SECTION 4: Uw team en kennis =====
  {
    id: 'Q12',
    section: 4,
    text: 'Hoeveel van het routinewerk van uw team — modelleren, samenvatten, benchmarken — kan AI vandaag al doen, met een senior die controleert?',
    dimension: 'CapacityEngineering',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Vrijwel niets; het werk is te specifiek', points: 1 },
      { letter: 'B', label: 'Minder dan 20%', points: 2 },
      { letter: 'C', label: '20 tot 40%', points: 3 },
      { letter: 'D', label: '40 tot 60%', points: 4 },
      { letter: 'E', label: 'Meer dan 60%', points: 5 },
    ],
  },
  {
    id: 'Q13',
    section: 4,
    text: 'Er komt een extern rapport binnen, van een adviseur of accountant. Wat blijft daarvan structureel achter in uw organisatie?',
    dimension: 'KnowledgeRetention',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'We bewaren het rapport en verder niets', points: 1 },
      { letter: 'B', label: 'We bespreken het, zonder formele vastlegging', points: 2 },
      { letter: 'C', label: 'We halen de leerpunten eruit in een interne notitie', points: 3 },
      { letter: 'D', label: 'We hebben een vast systeem dat de uitkomsten verwerkt', points: 4 },
      { letter: 'E', label: 'De uitkomsten zitten in onze eigen modellen en werkwijze, klaar voor het volgende dossier', points: 5 },
    ],
  },
  {
    id: 'Q14',
    section: 4,
    text: 'Als een senior vertrekt: hoeveel van zijn of haar kennis blijft terugvindbaar achter?',
    dimension: 'KnowledgeRetention',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Vrijwel niets; het meeste zat in zijn of haar hoofd', points: 1 },
      { letter: 'B', label: 'Minder dan 25%', points: 2 },
      { letter: 'C', label: 'Ongeveer de helft', points: 3 },
      { letter: 'D', label: '75% of meer, dankzij strakke documentatie', points: 4 },
      { letter: 'E', label: 'Vrijwel alles; het zit in de systemen, niet in de personen', points: 5 },
    ],
  },
  {
    id: 'Q15',
    section: 4,
    text: 'Hoe vaak laat u een kans liggen doordat uw team het werk niet op tijd gereed heeft?',
    dimension: 'CapacityEngineering',
    isSegmentation: false,
    options: [
      { letter: 'A', label: 'Regelmatig; capaciteit is structureel onze bottleneck', points: 1 },
      { letter: 'B', label: 'Een paar keer per jaar', points: 2 },
      { letter: 'C', label: 'Zelden, maar het gebeurt', points: 3 },
      { letter: 'D', label: 'Vrijwel nooit; onze capaciteit is op orde', points: 4 },
      { letter: 'E', label: 'Nooit; onze capaciteit overtreft de huidige dealflow', points: 5 },
    ],
  },
];

export const questionsBySection = (section: 1 | 2 | 3 | 4): Question[] =>
  questions.filter((q) => q.section === section);

export const getQuestion = (id: string): Question | undefined =>
  questions.find((q) => q.id === id);

export const totalQuestions = questions.length;

// ── Localised helpers ──────────────────────────────────────────────────────────

import { questionTranslations } from './questions.locales';

export function getLocalizedQuestions(locale: string): Question[] {
  const translations = questionTranslations[locale] ?? questionTranslations['nl'];
  return questions.map((q) => ({
    ...q,
    text: translations[q.id]?.text ?? q.text,
    options: q.options.map((opt) => ({
      ...opt,
      label: translations[q.id]?.options[opt.letter] ?? opt.label,
    })),
  }));
}

export function getLocalizedQuestionsBySection(locale: string, section: 1 | 2 | 3 | 4): Question[] {
  return getLocalizedQuestions(locale).filter((q) => q.section === section);
}
