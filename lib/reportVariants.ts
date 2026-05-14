import type { OfferType } from './scoring';
import type { Answers } from '../store/assessmentStore';
import { getQuestion } from './questions';

export type VariantId = 'A' | 'B' | 'C' | 'D';

export interface Intervention {
  title: string;
  body: string;
}

export interface VariantContent {
  id: VariantId;
  /** Interpretation paragraph with [X] placeholder for the raw dimension score. */
  interpretation: (rawScore: number) => string;
  /** Three interventions to render under the interpretation. */
  interventions: [Intervention, Intervention, Intervention];
  /** Pricing line for the conditional offer block. */
  price: string;
  /** Name of the offer (matches offerMap). */
  offerName: string;
}

export const variants: Record<VariantId, VariantContent> = {
  A: {
    id: 'A',
    offerName: 'Portfolio Intelligence',
    interpretation: (raw) =>
      `Uw score op Portfolio Intelligence is ${raw} van 15 punten. Dit is de dimensie waar de meeste partijen in de Nederlandse lower-mid market significant rendement verliezen, doorgaans onbewust. Wat we zien is dat uw MBR-cyclus draait, maar dat variantie-analyse niet diep genoeg wordt herleid om operationele bijsturing mogelijk te maken voordat een kwartaal verloren is. Concreet: een portefeuille van vijf bedrijven met dit profiel laat in onze inschatting tussen 80 en 200 basispunten IRR per jaar onbenut.`,
    interventions: [
      {
        title: 'Herontwerp van uw MBR-rapportagestructuur',
        body: 'Definieer per portfoliobedrijf de drie tot vijf leading indicators die als waarschuwingssignaal werken, los van de standaard P&L-variantie.',
      },
      {
        title: 'Variantie-analyse op operationele bron, niet rapportageniveau',
        body: 'Tot welk operationeel niveau is de oorzaak herleidbaar? Twee maanden werk, blijvende impact.',
      },
      {
        title: 'Maandelijkse peer-benchmark, ook handmatig',
        body: 'Tien minuten per portfoliobedrijf per maand. Het ritme is belangrijker dan de techniek.',
      },
    ],
    price: 'vanaf 8.500 euro per maand, looptijd minimaal 6 maanden',
  },
  B: {
    id: 'B',
    offerName: 'AI Due Diligence',
    interpretation: (raw) =>
      `Uw score op AI Readiness is ${raw} van 30 punten. Wat opvalt is dat AI-substitutierisico nog niet systematisch in uw entry-multiple wordt gemodelleerd, en in board-meetings van uw portfoliobedrijven niet expliciet wordt geagendeerd. Concreet: bij uw drie meest recente acquisities is de kans dat één van hen de komende 24 maanden materiële marge-erosie door AI-substitutie ondervindt, hoger dan u nu inschat.`,
    interventions: [
      {
        title: 'AI-substitutie-framework per functiegroep',
        body: 'Per type rol: schat het percentage van het werk dat binnen 24 maanden door AI vervangbaar is.',
      },
      {
        title: 'Sensitivity-analyse op marge-erosie',
        body: "Drie scenario's: 5%, 15%, 30% erosie. Reken door naar entry-multiple-aanpassing.",
      },
      {
        title: 'DD-vragenlijst uitbreiden met AI-readiness van het target',
        body: 'Welke AI-tools gebruikt het target al? Welk percentage van het personeel werkt actief met AI?',
      },
    ],
    price: 'vanaf 12.500 euro per deal, doorlooptijd 2-3 weken',
  },
  C: {
    id: 'C',
    offerName: 'Fractional AI Officer',
    interpretation: (raw) =>
      `Uw score op Knowledge Retention is ${raw} van 10 punten. Wat we zien is dat kennis uit DD-trajecten en portfoliobeheer grotendeels weglekt: weg met externe rapporten die niet structureel worden verwerkt, weg met dealmakers die uw organisatie verlaten. Concreet: in onze inschatting verliest u tussen 15 en 25 werkdagen per jaar aan herontdekking van wat u al wist.`,
    interventions: [
      {
        title: 'Centraal kennis-repository met DD-output',
        body: 'Niet als opslag, maar als doorzoekbare en gestructureerde kennisbasis.',
      },
      {
        title: 'Sector-specifieke playbooks per type deal',
        body: 'Voor uw vijf meest voorkomende deal-types: een levend document met aannames, modellen en leerpunten.',
      },
      {
        title: 'Onboarding-proces voor nieuwe dealmakers',
        body: 'Onboarding-tijd zakt van zes maanden naar zes weken.',
      },
    ],
    price: 'vanaf 6.500 euro per maand, looptijd minimaal 6 maanden',
  },
  D: {
    id: 'D',
    offerName: 'Strategic Enablement Masterclasses',
    interpretation: () =>
      `Uw scores op Capacity Engineering en Deal Velocity wijzen op een structureel patroon: uw team is gekwalificeerd, maar wordt belemmerd door operationele frictie. Vergelijkbare partijen die wel met AI werken zien hun screening-capaciteit verdubbelen zonder team-uitbreiding.`,
    interventions: [
      {
        title: 'AI-augmented screening-protocol',
        body: 'U verviervoudigt uw screening-capaciteit zonder kwaliteitsverlies.',
      },
      {
        title: "Template-bibliotheek voor IC-memo's",
        body: 'Modulaire bouwstenen die per deal worden samengesteld. Vermindert schrijftijd met 60%.',
      },
      {
        title: 'Maandelijkse capaciteit-audit',
        body: 'Welk werk had AI kunnen overnemen?',
      },
    ],
    price: 'vanaf 4.500 euro per workshop, voor een team van maximaal 8 personen',
  },
};

/**
 * Map the assigned offer (A/B/C/D/none) to its variant content.
 * Returns null if no variant applies (offer === 'none').
 */
export function variantForOffer(offer: OfferType): VariantContent | null {
  if (offer === 'none') return null;
  return variants[offer];
}

/**
 * Raw point total for a given variant's "headline" dimension. The numbers in
 * the [X] interpretation are denominated against the variant-specific max
 * (Portfolio Intelligence = 15, AI Readiness = 30, Knowledge Retention = 10).
 */
export function rawScoreForVariant(answers: Answers, variant: VariantId): number {
  const qIds: Record<VariantId, string[]> = {
    A: ['Q8', 'Q9', 'Q11'],
    B: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q10'],
    C: ['Q13', 'Q14'],
    D: ['Q12', 'Q15', 'Q6'],
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
  };
  return byDimension[dimByVariant[variant]] ?? 0;
}

export const HIGH_SCORER_THRESHOLD = 60;
export const TOTAL_MAX = 75;
export const OFFER_GATE_PERCENT = 40;
