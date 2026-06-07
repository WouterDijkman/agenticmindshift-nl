/**
 * Bouwt de DeepSeek prompt op voor het genereren van het adviesrapport.
 * Alle data van de lead + websearch → gestructureerde prompt.
 */

import { questions, dimensionLabels, type Dimension } from '@/lib/questions';
import { type DimensionScores } from '@/lib/scoring';
import { type Answers } from '@/lib/scoring';
import { offerMap, type OfferType } from '@/lib/scoring';
import { REPORT_JSON_SCHEMA } from './types';
import { type ResearchFindings, formatResearchForPrompt } from './webResearch';

interface LeadData {
  leadId: string;
  name: string;
  company: string;
  jobTitle?: string;
  website?: string;
  companyContext?: string;
  answers: Answers;
  totalScore: number;
  byDimension: DimensionScores;
  weakest: string[];
  offerType: OfferType;
}

export function buildReportPrompt(
  lead: LeadData,
  research: ResearchFindings,
): { system: string; user: string } {
  const offerInfo = offerMap[lead.offerType];

  // ── System prompt ──────────────────────────────────────────────────────────
  const system = `Je bent een senior adviseur bij Agentic Mindshift, een Europese adviespartner gespecialiseerd in AI-toepassing voor private equity, M&A-adviseurs en directeur-grootaandeelhouders in het Europese mid-market segment.

Je taak: genereer een diepgaand, substantieel en persoonlijk adviesrapport in het Nederlands op basis van (1) de scorecard-antwoorden, (2) de gescrapte inhoud van de bedrijfswebsite, en (3) eventuele aanvullende externe signalen. Het rapport moet specifiek zijn voor déze organisatie — geen generieke teksten.

Werkwijze:
- LEES eerst de gescrapte website-inhoud volledig door en haal hieruit: welke sector/sub-sector, kernactiviteiten, kerncijfers indien zichtbaar, portfoliobedrijven indien PE/holding, governance-structuur, eventuele AI- of digitaliseringssignalen.
- KOPPEL deze observaties expliciet aan de scorecard-antwoorden. Bv: als de website een sterke nadruk legt op due diligence en de score op AI Readiness is laag, benoem dat als concrete tegenstelling.
- VERZIN NOOIT feiten die niet in de antwoorden of de scrape staan. Als iets onbekend is, schrijf: "op basis van uw antwoorden vermoeden wij..." of laat het weg.

Schrijfstijl:
- Directe, professionele Nederlandse adviestoon (peer-to-peer, niet bureaucratisch)
- Specifiek voor de organisatie en sector — gebruik bedrijfsnaam en concrete observaties uit de website
- Analytisch en feitelijk, geen marketing-taal
- Elk inzicht moet verankerd zijn in (a) de specifieke antwoorden, OF (b) de website-content
- Gebruik concrete percentages, tijdlijnen en vergelijkingen waar relevant

Je output is uitsluitend geldig JSON passend bij het opgegeven schema. Geen proza buiten het JSON-object.`;

  // ── Questies + antwoorden opbouwen ────────────────────────────────────────
  const qaLines: string[] = [];
  for (const q of questions) {
    const letter = lead.answers[q.id];
    if (!letter) continue;
    const opt = q.options.find((o) => o.letter === letter);
    if (!opt) continue;
    qaLines.push(
      `${q.id} (${dimensionLabels[q.dimension as Dimension]}, ${opt.points}/5p): ${q.text}\n   → ${opt.label}`,
    );
  }

  // ── Dimensiescores opbouwen ────────────────────────────────────────────────
  const dimLines = (Object.entries(lead.byDimension) as [Dimension, number][])
    .sort((a, b) => a[1] - b[1]) // van laag naar hoog
    .map(([dim, score]) => `  ${dimensionLabels[dim]}: ${score}/100`);

  // ── Percentiel berekenen ───────────────────────────────────────────────────
  const percentile = approxPercentile(lead.totalScore);

  // ── Research context ──────────────────────────────────────────────────────
  const researchBlock = formatResearchForPrompt(research);

  // ── User prompt ───────────────────────────────────────────────────────────
  const user = `Genereer een volledig adviesrapport voor de volgende lead:

BEDRIJF: ${lead.company}
NAAM: ${lead.name}
FUNCTIE: ${lead.jobTitle ?? 'niet opgegeven'}
WEBSITE: ${lead.website ?? 'niet opgegeven'}
${lead.companyContext ? `EIGEN TOELICHTING DOOR LEAD: ${lead.companyContext}\n` : ''}LEAD ID: ${lead.leadId}

TOTAALSCORE: ${lead.totalScore}/75 (top ${100 - percentile}% van respondenten — beter dan ${percentile}% van vergelijkbare organisaties)

DIMENSIESCORES (van laag naar hoog, focus op de laagste):
${dimLines.join('\n')}

ZWAKSTE DIMENSIES: ${lead.weakest.join(', ')}

AANBEVOLEN TRAJECT (op basis van Q4-segmentatie):
Trajecttype: ${lead.offerType}
Naam: ${offerInfo.name}
Beschrijving: ${offerInfo.description}

ALLE SCORECARD ANTWOORDEN:
${qaLines.join('\n\n')}

BEDRIJFSCONTEXT (websearch):
${researchBlock}

Genereer nu het volledige rapport als JSON object met exact dit schema:
${REPORT_JSON_SCHEMA}

Vereisten:
1. executiveSummary: overkoepelende beoordeling van 2-3 zinnen, specifiek voor ${lead.company}
2. companyContext: baseer op antwoorden + websearch — wees specifiek over de sector en situatie
3. dimensionAnalysis: alle 6 dimensies, elke assessment van 2-3 substantiële zinnen gericht op ${lead.company}
4. keyInsights: 4 inzichten die direct relevant zijn voor de beslissingen van ${lead.name}
5. recommendedTrajectory: leg uit WAAROM ${offerInfo.name} aansluit op de specifieke situatie
6. urgency: 'high' als 2+ dimensies < 40, 'medium' als weakest dimension < 50, anders 'low'
7. Geen placeholder-tekst of generieke formuleringen — elk woord moet specifiek zijn voor deze lead`;

  return { system, user };
}

/** Ruwe percentiel-berekening (normaalverdeling, gemiddelde 45, stdev 12) */
function approxPercentile(total: number): number {
  const z = (total - 45) / 12;
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804014327 * Math.exp((-z * z) / 2);
  let p =
    d *
    t *
    (0.319381530 +
      t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  if (z > 0) p = 1 - p;
  return Math.max(1, Math.min(99, Math.round((1 - p) * 100)));
}
