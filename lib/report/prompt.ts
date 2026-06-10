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
import { type ReportLocale, LANGUAGE_NAME } from './locale';

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
  locale: ReportLocale = 'nl',
): { system: string; user: string } {
  const offerInfo = offerMap[lead.offerType];
  const targetLanguage = LANGUAGE_NAME[locale];

  // ── System prompt ──────────────────────────────────────────────────────────
  const system = `Je bent een senior adviseur bij Agentic Mindshift, een Europese adviespartner gespecialiseerd in AI-toepassing voor private equity, M&A-adviseurs en directeur-grootaandeelhouders in het Europese mid-market segment.

TAAL — ZEER BELANGRIJK: schrijf ALLE tekstvelden van het rapport (executiveSummary, companyContext, dimensionAnalysis.assessment, dimensionAnalysis.label, dimensionAnalysis.quickWin, keyInsights, recommendedTrajectory, valueAtStake.headline, valueAtStake.drivers, valueAtStake.basis, actionRoadmap.horizon, actionRoadmap.focus, actionRoadmap.actions, actionRoadmap.outcome, scoreProfile.profileLabel, profileExplanation, urgencyExplanation, researchNote) volledig in ${targetLanguage}. Vertaal vloeiend en professioneel — geen letterlijke vertaling. Behoud Engelse vakjargon-termen (zoals AI Readiness, due diligence, mid-market, IRR) waar dat in de doeltaal gangbaar is. De JSON-sleutels en enum-waarden (priority, urgency, offerType) blijven exact zoals in het schema; alleen de waarden van vrije-tekstvelden zijn in ${targetLanguage}.

Je taak: genereer een diepgaand, substantieel en persoonlijk adviesrapport in ${targetLanguage} op basis van (1) de scorecard-antwoorden, (2) de gescrapte inhoud van de bedrijfswebsite, en (3) eventuele aanvullende externe signalen. Het rapport moet specifiek zijn voor déze organisatie — geen generieke teksten.

Werkwijze (denk als een strateeg, niet als een samenvatter):
- De research-context bevat MEERDERE strategische bronpagina's (homepage, portfolio/track record, team/leiderschap, propositie) plus thematische externe signalen (deal-activiteit, leiderschap, digitale signalen). Lees ze alle door.
- BOUW EERST een strategisch beeld op: welke sector/sub-sector, businessmodel, track record en deal-types (bij PE/M&A), wie de beslissers zijn, en de huidige digitale/AI-volwassenheid — expliciet én impliciet.
- REDENEER vervolgens: waar staat deze partij in de markt, wat is hun realistische volgende stap, en welke 1-2 strategische spanningen springen eruit? Bv: een sterk due-diligence-track-record gecombineerd met lage AI Readiness betekent dat concurrenten met AI-gedreven sourcing/screening hen kunnen inhalen — maak dat soort gevolg expliciet en concreet.
- KOPPEL elke observatie aan de scorecard-antwoorden en vertaal die naar zakelijke consequenties (gemiste deals, langzamere due diligence, capaciteitsverlies, kennislek), niet naar abstracte "verbeterpunten".
- VERZIN NOOIT feiten die niet in de antwoorden of de research staan. Als iets onbekend is, schrijf: "op basis van uw antwoorden vermoeden wij..." of laat het weg. Verzin geen portfoliobedrijven, cijfers of deals.

Schrijfstijl:
- Directe, professionele adviestoon in ${targetLanguage} (peer-to-peer, niet bureaucratisch)
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

STRATEGISCHE RESEARCH-CONTEXT (multi-page scrape + thematische search):
${researchBlock}

Genereer nu het volledige rapport als JSON object met exact dit schema:
${REPORT_JSON_SCHEMA}

Vereisten:
1. executiveSummary: overkoepelende strategische beoordeling van 2-3 zinnen, specifiek voor ${lead.company} — benoem waar ze staan en wat er op het spel staat
2. companyContext: baseer op antwoorden + multi-page research — wees specifiek over sector, businessmodel, track record en marktpositie
3. dimensionAnalysis: alle 6 dimensies, elke assessment van 2-3 substantiële zinnen gericht op ${lead.company}, met de zakelijke consequentie van de score
4. keyInsights: 4 STRATEGISCHE inzichten die een concurrentie- of marktconsequentie benoemen en direct relevant zijn voor de beslissingen van ${lead.name} — geen generieke observaties
5. recommendedTrajectory: leg uit WAAROM ${offerInfo.name} aansluit op de specifieke strategische situatie en welke spanning het oplost
6. valueAtStake: kwantificeer eerlijk wat de huidige gaps kosten. Vertaal de twee zwakste dimensies naar een orde-van-grootte van rendementslek of gemiste waarde — in tijd (weken per deal), in kans (gemiste of vertraagde deals), of in risico (onopgemerkte onderprestatie). REGEL: gebruik illustratieve ranges op basis van typische mid-market patronen ("een mid-market deal-team verliest doorgaans 2-4 weken per transactie aan..."), NOOIT verzonnen precieze cijfers over ${lead.company} zelf. Het 'basis'-veld moet die aanname expliciet en eerlijk benoemen. headline = één scherpe zin met de inzet; drivers = 2-4 concrete lekken; basis = de eerlijke onderbouwing.
7. actionRoadmap: een gefaseerd plan in 3 horizonnen (bv. "Eerste 30 dagen", "60-90 dagen", "Dit kwartaal / half jaar"). Begin bij de zwakste dimensies (${lead.weakest.join(', ')}). Elke fase: focus (korte titel), 2-3 CONCRETE acties die ${lead.name} daadwerkelijk kan uitvoeren of beleggen (geen vaagheden als "verbeter de cultuur"), en outcome (wat het oplevert). Bouw logische sequentie: eerst diagnose/fundament, dan implementatie, dan verankering. Maak het zo bruikbaar dat het ook zonder ons traject waarde heeft — dát wekt vertrouwen.
8. urgency: 'high' als 2+ dimensies < 40, 'medium' als weakest dimension < 50, anders 'low'
9. Geen placeholder-tekst of generieke formuleringen — elk woord moet specifiek zijn voor deze lead. Schrijf zoals een senior adviseur die het bedrijf kent, niet zoals een AI die een sjabloon invult.
10. TAAL: schrijf alle vrije-tekstvelden volledig in ${targetLanguage}. Dit is een harde eis.`;

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
