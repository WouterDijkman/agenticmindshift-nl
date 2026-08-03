/**
 * Bouwt de DeepSeek prompt op voor het genereren van het adviesrapport.
 * Alle data van de lead + websearch → gestructureerde prompt.
 */

import { questions, dimensionLabels, type Dimension } from '@/lib/questions';
import { type DimensionScores } from '@/lib/scoring';
import { type Answers } from '@/lib/scoring';
import { offerMap, type OfferType } from '@/lib/scoring';
import { getOfferName } from '@/lib/pdf/offerRoutes';
import { REPORT_JSON_SCHEMA } from './types';
import { type ResearchFindings, formatResearchForPrompt } from './webResearch';
import { type ReportLocale, LANGUAGE_NAME } from './locale';

/**
 * Placeholder die de naam van de contactpersoon vervangt in alles wat naar het
 * taalmodel gaat. De echte naam wordt NOOIT verstuurd; na generatie wordt deze
 * token lokaal terug-vervangen door de voornaam (zie rehydrateContact in
 * generate.ts). Zo blijft personalisatie behouden zonder PII te lekken.
 */
export const CONTACT_TOKEN = '[CONTACTPERSOON]';

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
  // De naam die de lead te zien krijgt, in diens eigen taal. offerMap bevat
  // alleen Nederlandse interne labels; die mogen nooit in het rapport belanden.
  const offerName = getOfferName(locale, lead.offerType);
  const targetLanguage = LANGUAGE_NAME[locale];

  // ── System prompt ──────────────────────────────────────────────────────────
  const system = `Je bent een senior adviseur bij Agentic Mindshift, een Europese adviespartner gespecialiseerd in AI-toepassing voor private equity, M&A-adviseurs en directeur-grootaandeelhouders in het Europese mid-market segment.

TAAL — ZEER BELANGRIJK: schrijf ALLE tekstvelden van het rapport (executiveSummary, companyContext, serviceOpportunities.service, serviceOpportunities.whatItIs, serviceOpportunities.aiOpportunity, teamAnalysis.composition, teamAnalysis.signals, teamAnalysis.implication, dimensionAnalysis.assessment, dimensionAnalysis.label, dimensionAnalysis.quickWin, keyInsights, recommendedTrajectory, valueAtStake.headline, valueAtStake.drivers, valueAtStake.basis, actionRoadmap.horizon, actionRoadmap.focus, actionRoadmap.actions, actionRoadmap.outcome, scoreProfile.profileLabel, profileExplanation, urgencyExplanation, researchNote) volledig in ${targetLanguage}. Vertaal vloeiend en professioneel — geen letterlijke vertaling. Behoud Engelse vakjargon-termen (zoals AI Readiness, due diligence, mid-market, IRR) waar dat in de doeltaal gangbaar is. De JSON-sleutels en enum-waarden (priority, urgency, offerType) blijven exact zoals in het schema; alleen de waarden van vrije-tekstvelden zijn in ${targetLanguage}.

Je taak: genereer een diepgaand, substantieel en persoonlijk adviesrapport in ${targetLanguage} op basis van (1) de scorecard-antwoorden, (2) de gescrapte inhoud van de bedrijfswebsite, en (3) eventuele aanvullende externe signalen. Het rapport moet specifiek zijn voor déze organisatie — geen generieke teksten.

Werkwijze (denk als een strateeg, niet als een samenvatter):
- De research-context bevat een VOLLEDIGE site-crawl: alle pagina's van de bedrijfswebsite, gelabeld per categorie ([Expertise / Diensten], [Sectoren / Markten], [Team / Leiderschap], [Referenties / Track record], [Actueel / Insights]), plus thematische externe signalen. Lees ze alle door.
- BOUW EERST een strategisch beeld op: welke sector/sub-sector, businessmodel, track record en deal-types (bij PE/M&A), wie de beslissers zijn, en de huidige digitale/AI-volwassenheid — expliciet én impliciet.
- ANALYSEER DE DIENSTEN EXPLICIET: loop de aangeboden diensten/expertises stuk voor stuk langs. Per dienst: wat het inhoudt, welk type werk en menselijke uren erachter zitten, en waar AI/automatisering de economie van díe dienst verandert. Benoem welke diensten het meest en welke het minst blootgesteld zijn aan AI.
- ANALYSEER HET TEAM EXPLICIET: gebruik de [Team / Leiderschap]-pagina om de samenstelling te duiden — omvang, senioriteitsmix (partners/consultants/associates), rollen en specialismen. Leid af waar de capaciteit zit, welke rollen het meest tijd kwijt zijn aan AI-versterkbaar werk, en wat dit betekent voor schaalbaarheid en kennisborging. Noem concrete rollen/functies waar de website die toont — verzin geen namen die er niet staan.
- REDENEER vervolgens: waar staat deze partij in de markt, wat is hun realistische volgende stap, en welke 1-2 strategische spanningen springen eruit? Bv: een sterk due-diligence-track-record gecombineerd met lage AI Readiness betekent dat concurrenten met AI-gedreven sourcing/screening hen kunnen inhalen — maak dat soort gevolg expliciet en concreet.
- KOPPEL elke observatie aan de scorecard-antwoorden en vertaal die naar zakelijke consequenties (gemiste deals, langzamere due diligence, capaciteitsverlies, kennislek), niet naar abstracte "verbeterpunten".
- VERZIN NOOIT feiten die niet in de antwoorden of de research staan. Als iets onbekend is, schrijf: "op basis van uw antwoorden vermoeden wij..." of laat het weg. Verzin geen portfoliobedrijven, diensten, teamleden, cijfers of deals.

Schrijfstijl:
- Directe, professionele adviestoon in ${targetLanguage} (peer-to-peer, niet bureaucratisch)
- Specifiek voor de organisatie en sector — gebruik bedrijfsnaam en concrete observaties uit de website
- Analytisch en feitelijk, geen marketing-taal
- Elk inzicht moet verankerd zijn in (a) de specifieke antwoorden, OF (b) de website-content
- Gebruik concrete percentages, tijdlijnen en vergelijkingen waar relevant

PRIVACY — HARDE EIS: de contactpersoon wordt uitsluitend aangeduid met de letterlijke tekst ${CONTACT_TOKEN}. Gebruik exact die tekst (inclusief de blokhaken) overal waar je de persoon aanspreekt of noemt; verzin of gebruik NOOIT een echte persoonsnaam voor de contactpersoon. Dit is een geanonimiseerd rapport-verzoek.

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

  // ── Research context ──────────────────────────────────────────────────────
  const researchBlock = formatResearchForPrompt(research);

  // ── User prompt ───────────────────────────────────────────────────────────
  const user = `Genereer een volledig adviesrapport voor de volgende lead:

BEDRIJF: ${lead.company}
CONTACTPERSOON: ${CONTACT_TOKEN}
FUNCTIE: ${lead.jobTitle ?? 'niet opgegeven'}
WEBSITE: ${lead.website ?? 'niet opgegeven'}
${lead.companyContext ? `EIGEN TOELICHTING DOOR LEAD: ${lead.companyContext}\n` : ''}

TOTAALSCORE: ${lead.totalScore}/75

DIMENSIESCORES (van laag naar hoog, focus op de laagste):
${dimLines.join('\n')}

ZWAKSTE DIMENSIES: ${lead.weakest.join(', ')}

AANBEVOLEN TRAJECT (op basis van Q4-segmentatie):
Trajecttype: ${lead.offerType}
Naam: ${offerName}
Beschrijving: ${offerInfo.description}

ALLE SCORECARD ANTWOORDEN:
${qaLines.join('\n\n')}

STRATEGISCHE RESEARCH-CONTEXT (multi-page scrape + thematische search):
${researchBlock}

Genereer nu het volledige rapport als JSON object met exact dit schema:
${REPORT_JSON_SCHEMA}

Vereisten:
1. executiveSummary: overkoepelende strategische beoordeling van 2-3 zinnen, specifiek voor ${lead.company} — benoem waar ze staan en wat er op het spel staat
2. companyContext: baseer op antwoorden + de VOLLEDIGE site-crawl. Wees concreet over (a) sector, businessmodel en marktpositie, (b) de specifieke DIENSTEN die ze aanbieden en wat die over hun operatie zeggen, (c) de TEAMSAMENSTELLING (omvang, senioriteit, sleutelrollen) zoals zichtbaar op de site, en (d) hun track record. Verwijs naar concrete diensten en rollen die je in de research-content hebt gezien — geen generieke sectoromschrijving.
2a. serviceOpportunities (BELANGRIJK — werk dit echt uit): één item PER dienst/expertise die de organisatie aanbiedt, zoals zichtbaar in de [Expertise / Diensten]- en [Sectoren / Markten]-pagina's van de crawl. Voor ${lead.company} betekent dit elke aparte dienst die je daadwerkelijk op de site terugziet. Per dienst: service = de naam zoals op de site; whatItIs = wat de dienst inhoudt en welk type (mensen)werk erachter zit; aiOpportunity = de CONCRETE AI-kans voor juist díe dienst (bv. AI-gedreven document-/dataverwerking bij due diligence, snellere scenariomodellen bij waardebepaling, AI-sourcing/screening bij executive search, geautomatiseerde liquiditeits-/rapportagemodellen bij restructuring) — geen algemeenheden; exposure = high/medium/low naar gelang hoeveel AI die dienst raakt. Geef 4-8 diensten. VERZIN GEEN diensten die niet op de site staan.
2b. teamAnalysis (BELANGRIJK — gebruik de teampagina): composition = omvang en senioriteitsmix (partners vs. consultants vs. associates) zoals zichtbaar op de [Team / Leiderschap]-pagina; signals = 2-4 concrete observaties over sleutelrollen, specialismen en waar de menselijke uren/capaciteit zitten (noem rollen/functies die je daadwerkelijk ziet, geen verzonnen namen); implication = wat deze teamopbouw betekent voor AI-versterking, schaalbaarheid en kennisborging — welke rollen winnen het meest bij AI, en waar zit het risico van capaciteits- of kennisverlies.
3. dimensionAnalysis: alle 6 dimensies, elke assessment van 2-3 substantiële zinnen gericht op ${lead.company}, met de zakelijke consequentie van de score
4. keyInsights: 4 STRATEGISCHE inzichten die een concurrentie- of marktconsequentie benoemen en direct relevant zijn voor de beslissingen van ${CONTACT_TOKEN} — geen generieke observaties
5. recommendedTrajectory: leg uit WAAROM ${offerName} aansluit op de specifieke strategische situatie en welke spanning het oplost
6. valueAtStake: kwantificeer eerlijk wat de huidige gaps kosten. Vertaal de twee zwakste dimensies naar een orde-van-grootte van rendementslek of gemiste waarde — in tijd (weken per deal), in kans (gemiste of vertraagde deals), of in risico (onopgemerkte onderprestatie). REGEL: gebruik illustratieve ranges op basis van typische mid-market patronen ("een mid-market deal-team verliest doorgaans 2-4 weken per transactie aan..."), NOOIT verzonnen precieze cijfers over ${lead.company} zelf. Het 'basis'-veld moet die aanname expliciet en eerlijk benoemen. headline = één scherpe zin met de inzet; drivers = 2-4 concrete lekken; basis = de eerlijke onderbouwing.
7. actionRoadmap: een gefaseerd plan in 3 horizonnen (bv. "Eerste 30 dagen", "60-90 dagen", "Dit kwartaal / half jaar"). Begin bij de zwakste dimensies (${lead.weakest.join(', ')}). Elke fase: focus (korte titel), 2-3 CONCRETE acties die ${CONTACT_TOKEN} daadwerkelijk kan uitvoeren of beleggen (geen vaagheden als "verbeter de cultuur"), en outcome (wat het oplevert). Bouw logische sequentie: eerst diagnose/fundament, dan implementatie, dan verankering. Maak het zo bruikbaar dat het ook zonder ons traject waarde heeft — dát wekt vertrouwen.
8. urgency: 'high' als 2+ dimensies < 40, 'medium' als weakest dimension < 50, anders 'low'
9. Geen placeholder-tekst of generieke formuleringen — elk woord moet specifiek zijn voor deze lead. Schrijf zoals een senior adviseur die het bedrijf kent, niet zoals een AI die een sjabloon invult.
10. TAAL: schrijf alle vrije-tekstvelden volledig in ${targetLanguage}. Dit is een harde eis.`;

  return { system, user };
}

