import {
  Dimension,
  OptionLetter,
  questions,
  getQuestion,
  dimensionLabels,
} from './questions';

export type Answers = Record<string, OptionLetter>;

export type DimensionScores = Record<Dimension, number>;

export interface ScoreResult {
  total: number;
  byDimension: DimensionScores;
  weakest: string[];
}

const dimensionMap: Record<Dimension, string[]> = {
  DealVelocity: ['Q6'],
  PortfolioIntelligence: ['Q8', 'Q9', 'Q10', 'Q11'],
  BiasDetection: ['Q7'],
  AIReadiness: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
  CapacityEngineering: ['Q12', 'Q15'],
  KnowledgeRetention: ['Q13', 'Q14'],
};

function pointsFor(questionId: string, letter: OptionLetter | undefined): number {
  if (!letter) return 0;
  const q = getQuestion(questionId);
  if (!q) return 0;
  const opt = q.options.find((o) => o.letter === letter);
  return opt ? opt.points : 0;
}

export function calculateScores(answers: Answers): ScoreResult {
  // total: sum of all 15 question points (max 75)
  let total = 0;
  for (const q of questions) {
    total += pointsFor(q.id, answers[q.id]);
  }

  // per-dimension normalized 0-100 (based on average of answered questions in that dim)
  const byDimension = {} as DimensionScores;
  (Object.keys(dimensionMap) as Dimension[]).forEach((dim) => {
    const qIds = dimensionMap[dim];
    let sum = 0;
    let count = 0;
    qIds.forEach((qid) => {
      const letter = answers[qid];
      if (letter) {
        sum += pointsFor(qid, letter);
        count += 1;
      }
    });
    if (count === 0) {
      byDimension[dim] = 0;
    } else {
      const avg = sum / count; // 1..5
      const normalized = ((avg - 1) / 4) * 100; // 0..100
      byDimension[dim] = Math.round(normalized);
    }
  });

  // weakest: two lowest dimensions (by score). Use Dutch label.
  const sortedDims = (Object.entries(byDimension) as [Dimension, number][])
    .sort((a, b) => a[1] - b[1])
    .slice(0, 2)
    .map(([dim]) => dimensionLabels[dim]);

  return {
    total,
    byDimension,
    weakest: sortedDims,
  };
}

export type OfferType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'none';

export const offerMap: Record<OfferType, { name: string; description: string }> = {
  A: {
    name: 'AI Due Diligence & Portfolio',
    description:
      'Doorlopende portfolio-intelligence over uw deelnemingen, met maandelijkse rapportage en vroegtijdige signalering van onderprestatie en AI-substitutierisico. Uitgevoerd via Factum Capital (ons AI-platform).',
  },
  B: {
    name: 'AI Due Diligence & Portfolio',
    description:
      'Een uitgebreid analytisch fundament voor uw volgende acquisitie — van IM-screening tot closing. Gecertificeerde adviseurs voor formele sign-off. Uitgevoerd via Factum Capital (ons AI-platform).',
  },
  C: {
    name: 'Fractional AI Officer',
    description:
      'Een fractional AI-officer, 2–3 dagen per maand, voor vroegtijdige interventie bij portfoliobedrijven. Bij signalen van financiële stress: koppeling met restructuring consultants via Factum Capital.',
  },
  D: {
    name: 'Consultancy, Workflow & Strategic Enablement',
    description:
      'Projectmatig of in retainer: AI concreet inzetten in uw processen, workflows of organisatie — met implementatie, masterclasses en team-enablement.',
  },
  E: {
    name: 'AI Due Diligence & Portfolio',
    description:
      'Analytisch onderbouwde financieringsmemo voor bankgesprekken, leningen of investeerderspresentaties. Ook voor kleinere financieringsaanvragen. Gecertificeerde adviseurs voor formele ondertekening. Via Factum Capital (ons AI-platform).',
  },
  F: {
    name: 'AI Sparring Sessie',
    description:
      'Een laagdrempelige eerste stap: 60–90 minuten om snel te bepalen wat AI concreet betekent voor uw volgende deal, uw portfolio of uw eerstvolgende beslissing.',
  },
  none: {
    name: 'Geen aanbeveling',
    description:
      'Op basis van uw antwoorden is er op dit moment geen specifiek traject van toepassing. U kunt de quickscan later opnieuw doen.',
  },
};

export function determineOffer(q4Answer: OptionLetter | undefined): OfferType {
  if (!q4Answer) return 'none';
  const q4 = getQuestion('Q4');
  if (!q4) return 'none';
  const opt = q4.options.find((o) => o.letter === q4Answer);
  return (opt?.segmentTo ?? 'none') as OfferType;
}
