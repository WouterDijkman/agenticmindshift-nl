import type { OfferType } from './scoring';
import type { Answers } from '../store/assessmentStore';
import { getQuestion } from './questions';

export type VariantId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

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
    offerName: 'AI Due Diligence & Portfolio',
    interpretation: (raw) =>
      `Uw score op Analytical Quality is ${raw} van 20 punten. Dit is de dimensie waar de meeste partijen in de Europese lower-mid market structureel rendement verliezen — doorgaans onbewust. Uw MBR-cyclus draait, maar vroegtijdige signalering ontbreekt: variantie-analyse gaat niet diep genoeg om bij te sturen voordat een kwartaal verloren is. Concreet: een portefeuille van vijf bedrijven met dit profiel laat tussen 80 en 200 basispunten IRR per jaar onbenut. De portfolio-intelligence dienst — uitgevoerd via Factum Capital (ons AI-platform) — is specifiek gebouwd voor dit scenario, met gedeeld dossier en koppeling naar gecertificeerde adviseurs waar nodig.`,
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
    price: '€6.500 – €8.500 investering per maand · minimaal 3 maanden · excl. btw',
  },
  B: {
    id: 'B',
    offerName: 'AI Due Diligence & Portfolio',
    interpretation: (raw) =>
      `Uw score op AI Readiness is ${raw} van 25 punten. Wat opvalt is dat AI-substitutierisico nog niet systematisch in uw deal-analyse wordt gemodelleerd, en dat uw analytisch fundament per dossier verschilt. Concreet: bij uw drie meest recente acquisities is de kans dat één ervan de komende 24 maanden materiële marge-erosie ondervindt, hoger dan u nu inschat. De AI Due Diligence dienst — uitgevoerd via Factum Capital (ons AI-platform) — levert het uitgebreide analytisch fundament voor uw volgende deal, inclusief gecertificeerde adviseurs (RA/RB/advocaten) voor formele sign-off.`,
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
    price: 'Vanaf €10.000 investering per deal · doorlooptijd 2–3 weken · excl. btw',
  },
  C: {
    id: 'C',
    offerName: 'Fractional AI Officer',
    interpretation: (raw) =>
      `Uw score op Knowledge Retention is ${raw} van 10 punten. Kennis weglekt op twee manieren: via externe rapporten die niet structureel worden verwerkt, en via medewerkers die uw organisatie verlaten. Bij signalen van financiële stress bij een deelneming is die kennislekkage extra kostbaar — de window voor tijdige bijsturing is klein. Als Fractional AI Officer signaleert Agentic Mindshift vroegtijdig wanneer een indicatieve doorlichting nodig is, en koppelt zo nodig gespecialiseerde restructuring consultants.`,
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
    price: '€3.500 – €5.500 investering per maand · minimaal 3 maanden · excl. btw',
  },
  D: {
    id: 'D',
    offerName: 'Consultancy, Workflow & Strategic Enablement',
    interpretation: () =>
      `Uw scores op Capacity Engineering en Deal Velocity wijzen op een structureel patroon: uw team is gekwalificeerd, maar wordt belemmerd door operationele frictie. Vergelijkbare partijen die analytische processen gestructureerder aanpakken, zien hun screening- en analysecapaciteit verdubbelen zonder team-uitbreiding. Met een gerichte consultancy- of enablement-aanpak lost u dit op.`,
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
    price: 'Vanaf €4.500 investering per traject of doorlopend in retainer · excl. btw',
  },
  E: {
    id: 'E',
    offerName: 'AI Due Diligence & Portfolio',
    interpretation: (raw) =>
      `Uw score op Analytical Quality is ${raw} van 20 punten. Wat opvalt is dat uw financierings- of deal-dossiers nog niet consequent op alle relevante dimensies zijn opgebouwd. Dit leidt tot langere doorlooptijden, onnodige herzieningsronden met de bank of investeerder, en een minder sterke onderhandelingspositie. Een bankklaar financieringsmemo is niet alleen een document — het is uw analytisch fundament. De financieringsmemo-dienst — uitgevoerd via Factum Capital (ons AI-platform) — levert dat fundament en koppelt de gecertificeerde adviseurs die formeel ondertekenen waar vereist.`,
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
    price: 'Vanaf €10.000 investering per deal · of €6.500 – €8.500 per maand portfolio-intelligence · excl. btw',
  },
  F: {
    id: 'F',
    offerName: 'AI Sparring Sessie',
    interpretation: () =>
      `Uw scorecard laat zien dat u aan het begin staat van het structureren van uw analytische aanpak — en dat is precies het juiste moment voor een concrete, gerichte eerste stap. Een AI Sparring Sessie is geen verkoopgesprek: het is 60–90 minuten gericht op uw specifieke vraag, met een schriftelijke samenvatting als uitkomst. U bepaalt het onderwerp; de sessie levert u concreet inzicht op waar u direct iets mee kunt.`,
    interventions: [
      {
        title: 'Definieer uw meest urgente blinde vlek',
        body: 'Welke beslissing staat er aan — en welke informatie ontbreekt om die beslissing gefundeerd te nemen? Dat is het startpunt van een sparring-sessie.',
      },
      {
        title: 'Toets uw aannames voordat u handelt',
        body: 'De sessie is bedoeld om aannames expliciet te maken — niet om ze te bevestigen. Eén sessie kan een kostbare fout voorkomen.',
      },
      {
        title: 'Kies daarna het juiste vervolgtraject',
        body: 'Na één sessie weet u welke structurele aanpak het beste past: portfolio-intelligence, due diligence, fractional of consultancy.',
      },
    ],
    price: 'Vanaf €395 investering · 60–90 minuten · schriftelijke samenvatting · excl. btw',
  },
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
