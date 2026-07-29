import type { OfferType } from './scoring';
import type { Answers } from '../store/assessmentStore';
import { getQuestion } from './questions';

export type VariantId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface VariantContent {
  id: VariantId;
}

/**
 * Actual variant copy (interpretation / interventions / price / offerName) is
 * sourced from the `scorecard.variants` i18n namespace at render time — this
 * map only carries the variant id used for score lookups and gating.
 */
export const variants: Record<VariantId, VariantContent> = {
  A: { id: 'A' },
  B: { id: 'B' },
  C: { id: 'C' },
  D: { id: 'D' },
  E: { id: 'E' },
  F: { id: 'F' },
};

/**
 * Map the assigned offer (A/B/C/D/E/F/none) to its variant content.
 * Returns null if no variant applies (offer === 'none').
 */
export function variantForOffer(offer: OfferType): VariantContent | null {
  if (offer === 'none') return null;
  return variants[offer as VariantId] ?? null;
}

/**
 * Raw point total for a given variant's "headline" dimension.
 */
export function rawScoreForVariant(answers: Answers, variant: VariantId): number {
  const qIds: Record<VariantId, string[]> = {
    A: ['Q8', 'Q9', 'Q10', 'Q11'],
    B: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
    C: ['Q13', 'Q14'],
    D: ['Q12', 'Q15', 'Q6'],
    E: ['Q8', 'Q10', 'Q6'],
    F: ['Q1', 'Q2', 'Q3'],
  };
  return qIds[variant].reduce((sum, id) => {
    const letter = answers[id];
    if (!letter) return sum;
    const q = getQuestion(id);
    const opt = q?.options.find((o) => o.letter === letter);
    return sum + (opt?.points ?? 0);
  }, 0);
}

/**
 * The "weakest dimension's normalized score" used to gate the offer block.
 * Uses the same normalization as calculateScores: ((avg - 1) / 4) * 100.
 */
export function weakestNormalizedForVariant(
  byDimension: Record<string, number>,
  variant: VariantId,
): number {
  const dimByVariant: Record<VariantId, string> = {
    A: 'PortfolioIntelligence',
    B: 'AIReadiness',
    C: 'KnowledgeRetention',
    D: 'CapacityEngineering',
    E: 'PortfolioIntelligence',
    F: 'AIReadiness',
  };
  return byDimension[dimByVariant[variant]] ?? 0;
}

export const HIGH_SCORER_THRESHOLD = 60;
export const TOTAL_MAX = 75;
export const OFFER_GATE_PERCENT = 40;
