import type { OfferType } from './scoring';
import type { Answers } from '../store/assessmentStore';
import { getQuestion } from './questions';

export type VariantId = 'A' | 'B' | 'C' | 'D' | 'E';

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
      `Uw score op Analytische Kwaliteit is ${raw} van 20 punten. Dit is de dimensie waar de meeste partijen in de Nederlandse lower-mid market structureel rendement verliezen — doorgaans onbewust. Uw MBR-cyclus draait, maar vroegtijdige signalering ontbreekt: variantie-analyse gaat niet diep genoeg om bij te sturen voordat een kwartaal verloren is. Concreet: een portefeuille van vijf bedrijven met dit profiel laat tussen 80 en 200 basispunten IRR per jaar onbenut. Factum Capital M3 (Portfolio review) is specifiek gebouwd voor dit scenario — met gedeeld dossier en koppeling naar gecertificeerde adviseurs waar nodig.`,
    interventions: [
      {
        title: 'Herontwerp uw MBR-rapportagestructuur',
        body: 'Definieer per portfoliobedrijf de drie tot vijf leading indicators die als waarschuwingssignaal werken, los van de standaard P&L-variantie.',
      },
      {
        title: 'Variantie-analyse op operationele bron, niet rapportageniveau',
        body: 'Tot welk operationeel niveau is de oorzaak herleidbaar? Twee maanden werk, blijvende impact.',
      },
      {
        title: 'Maandelijkse peer-benchmark — ook handmatig',
        body: 'Tien minuten per portfoliobedrijf per maand. Het ritme is belangrijker dan de techniek.',
      },
    ],
    price: 'vanaf 8.500 euro per maand, looptijd minimaal 6 maanden',
  },
  B: {
    id: 'B',
    offerName: 'AI Due Diligence',
    interpretation: (raw) =>
      `Uw score op AI Readiness is ${raw} van 25 punten. Wat opvalt is dat AI-substitutierisico nog niet systematisch in uw deal-analyse wordt gemodelleerd, en dat uw analytisch fundament per dossier verschilt. Concreet: bij uw drie meest recente acquisities is de kans dat één ervan de komende 24 maanden materiële marge-erosie ondervindt, hoger dan u nu inschat. Factum Capital M1 (Acquisitie) levert het uitgebreide analytisch fundament voor uw volgende deal — inclusief gecertificeerde adviseurs (RA/RB/advocaten) voor formele sign-off.`,
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
        title: 'DD-vragenlijst uitbreiden met analytische structuur',
        body: 'Welke data levert het target aan? Welk percentage van de rapportage is geautomatiseerd? Dit bepaalt mee de kwaliteit van het Factum-dossier.',
      },
    ],
    price: 'vanaf 12.500 euro per deal, doorlooptijd 2–3 weken',
  },
  C: {
    id: 'C',
    offerName: 'Fractional AI Officer',
    interpretation: (raw) =>
      `Uw score op Knowledge Retention is ${raw} van 10 punten. Kennis weglekt op twee manieren: via externe rapporten die niet structureel worden verwerkt, en via medewerkers die uw organisatie verlaten. Bij signalen van financiële stress bij een deelneming is die kennislekkage extra kostbaar — de window voor tijdige bijsturing is klein. Factum Capital M4 (Pre-IBR/WHOA) koppelt gespecialiseerde restructuring consultants op het moment dat een indicatieve doorlichting aangeeft dat een formeel traject nodig is.`,
    interventions: [
      {
        title: 'Centraal kennis-repository met dossier-output',
        body: 'Niet als opslag, maar als doorzoekbare kennisbasis die bij de volgende situatie direct inzetbaar is.',
      },
      {
        title: 'Sector-specifieke playbooks per type situatie',
        body: 'Voor uw vijf meest voorkomende scenario\'s: een levend document met aannames, modellen en leerpunten.',
      },
      {
        title: 'Vroege stresstesten per deelneming',
        body: 'Twee leading indicators per bedrijf die signaleren of een diepere doorlichting nodig is — vóór het te laat is.',
      },
    ],
    price: 'vanaf 6.500 euro per maand, looptijd minimaal 6 maanden',
  },
  D: {
    id: 'D',
    offerName: 'Strategic Enablement Masterclasses',
    interpretation: () =>
      `Uw scores op Capacity Engineering en Deal Velocity wijzen op een structureel patroon: uw team is gekwalificeerd, maar wordt belemmerd door operationele frictie. Vergelijkbare partijen die analytische processen gestructureerder aanpakken, zien hun screening- en analysecapaciteit verdubbelen zonder team-uitbreiding — relevant voor elk van de vier Factum Capital momenten.`,
    interventions: [
      {
        title: 'AI-augmented analyse-protocol',
        body: 'U verviervoudigt uw analysecapaciteit zonder kwaliteitsverlies — van deal-screening tot financieringsmemo.',
      },
      {
        title: 'Template-bibliotheek voor dossiers en memo\'s',
        body: 'Modulaire bouwstenen die per situatie worden samengesteld. Vermindert voorbereidingstijd met 60%.',
      },
      {
        title: 'Maandelijkse capaciteit-audit',
        body: 'Welk analytisch werk had AI of structuur kunnen overnemen? Tien minuten, blijvend inzicht.',
      },
    ],
    price: 'vanaf 4.500 euro per workshop, voor een team van maximaal 8 personen',
  },
  E: {
    id: 'E',
    offerName: 'Factum Capital — Financieringsmemo',
    interpretation: (raw) =>
      `Uw score op Analytische Kwaliteit is ${raw} van 20 punten. Wat opvalt is dat uw financierings- of deal-dossiers nog niet consequent op alle relevante dimensies zijn opgebouwd. Dit leidt tot langere doorlooptijden, onnodige herzieningsronden met de bank of investeerder, en een minder sterke onderhandelingspositie. Een goed gefinancierd financieringsmemo is niet alleen een document — het is uw analytisch fundament. Factum Capital M2 (Financiering) levert dat fundament en koppelt de gecertificeerde adviseurs die formeel ondertekenen waar vereist.`,
    interventions: [
      {
        title: 'Structureer uw financieringsmemo op vaste dimensies',
        body: 'Een bankklaar memo heeft minimaal vijf lagen: historische performance, forward-looking aannames, marktpositie, risicoprofiel en managementkwaliteit.',
      },
      {
        title: 'Bouw een sectorvergelijking in — ook handmatig',
        body: "Tien vergelijkbare bedrijven op drie ratio's. Twee uur werk. Het verschil tussen 'wij geloven in deze onderneming' en 'de markt bevestigt dit profiel'.",
      },
      {
        title: 'Koppel uw analytisch dossier aan gecertificeerde adviseurs',
        body: 'Een bank-proof presentatie vereist een formele financieel adviseur of accountant. Bouw het dossier zo op dat die adviseur in twee uur kan instappen — niet in twee weken.',
      },
    ],
    price: 'op maat per financieringsaanvraag · via Factum Capital M2 deal intelligence dienst',
  },
};

/**
 * Map the assigned offer (A/B/C/D/E/none) to its variant content.
 * Returns null if no variant applies (offer === 'none').
 */
export function variantForOffer(offer: OfferType): VariantContent | null {
  if (offer === 'none') return null;
  return variants[offer];
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
  };
  return byDimension[dimByVariant[variant]] ?? 0;
}

export const HIGH_SCORER_THRESHOLD = 60;
export const TOTAL_MAX = 75;
export const OFFER_GATE_PERCENT = 40;
