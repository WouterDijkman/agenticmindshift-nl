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
  PortfolioIntelligence: ['Q8', 'Q9', 'Q11'],
  BiasDetection: ['Q7'],
  AIReadiness: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q10'],
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

export type OfferType = 'A' | 'B' | 'C' | 'D' | 'none';

export const offerMap: Record<OfferType, { name: string; description: string }> = {
  A: {
    name: 'Portfolio Intelligence',
    description:
      'Doorlopende portfolio-intelligence over uw deelnemingen, met maandelijkse MBR-rapportage en AI-substitutiemonitoring.',
  },
  B: {
    name: 'AI Due Diligence',
    description:
      'Een afgebakend AI-due-diligence-traject per acquisitie, met expliciete modellering van AI-substitutierisico in uw entry-multiple.',
  },
  C: {
    name: 'Fractional AI Officer',
    description:
      'Een fractional AI-officer, 2-3 dagen per maand, die portfoliobedrijven begeleidt bij AI-adoptie en bias-toetsing.',
  },
  D: {
    name: 'Strategic Enablement Masterclasses',
    description:
      'Eenmalige masterclasses voor uw deal-team over AI-substitutierisico, bias-detectie en MBR-discipline.',
  },
  none: {
    name: 'Geen begeleiding',
    description:
      'Op basis van uw antwoord heeft u op dit moment geen externe begeleiding nodig. U kunt de scorecard later opnieuw doen.',
  },
};

export function determineOffer(q4Answer: OptionLetter | undefined): OfferType {
  switch (q4Answer) {
    case 'A':
      return 'none';
    case 'B':
      return 'D';
    case 'C':
      return 'B';
    case 'D':
      return 'C';
    case 'E':
      return 'A';
    default:
      return 'none';
  }
}
