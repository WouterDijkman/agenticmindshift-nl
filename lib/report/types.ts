/**
 * TypeScript schema voor het door DeepSeek gegenereerde adviesrapport.
 * Dit JSON object wordt opgeslagen in leads.report (JSONB kolom).
 */

export interface DimensionAnalysis {
  /** e.g. 'AIReadiness' */
  dimension: string;
  /** Nederlandse naam, e.g. 'AI Readiness' */
  label: string;
  /** Genormaliseerde score 0-100 */
  score: number;
  /** 2-3 zinnen substantiële analyse specifiek voor deze organisatie */
  assessment: string;
  /** Urgentieniveau voor deze dimensie */
  priority: 'critical' | 'attention' | 'adequate' | 'strong';
  /** Eén concrete actie die direct waarde toevoegt */
  quickWin: string;
}

export interface KeyInsight {
  title: string;
  body: string;
}

export interface RecommendedTrajectory {
  offerType: string;
  offerName: string;
  /** Waarom dit traject aansluit op de specifieke situatie */
  rationale: string;
  /** Concreet verwacht resultaat */
  expectedOutcome: string;
  /** De meest logische eerste stap */
  firstStep: string;
}

/** Eén fase van het gefaseerde actieplan (30 / 90 / 180 dagen). */
export interface RoadmapPhase {
  /** Tijdshorizon in de doeltaal, e.g. 'Eerste 30 dagen', 'First 90 days'. */
  horizon: string;
  /** Korte titel van de focus van deze fase. */
  focus: string;
  /** 2-3 concrete, uitvoerbare acties. */
  actions: string[];
  /** Wat deze fase concreet oplevert. */
  outcome: string;
}

/**
 * Eerlijke kwantificering van wat de huidige gaps kosten — de "cost of
 * inaction". Geen verzonnen precieze cijfers over dit bedrijf, wél
 * illustratieve ordes van grootte op basis van mid-market patronen.
 */
export interface ValueAtStake {
  /** Eén kernzin die de inzet samenvat, met een orde-van-grootte. */
  headline: string;
  /** 2-4 specifieke bronnen van rendementslek / gemiste waarde. */
  drivers: string[];
  /** Eerlijke toelichting op de aannames achter de schatting. */
  basis: string;
}

export interface CompanyContext {
  sector: string;
  estimatedProfile: string; // 'MKB', 'mid-market PE', 'family office', etc.
  keyActivities: string;
  /** Relevante signalen uit websearch — leeg array als geen research beschikbaar */
  researchSignals: string[];
  researchNote: string; // wat gevonden/niet gevonden
}

export interface ScoreProfile {
  totalScore: number;
  totalMax: number;
  percentile: number;
  /** Kort profiellabel, e.g. 'Analytisch gefundeerd', 'In transitie' */
  profileLabel: string;
  profileExplanation: string;
}

export interface GeneratedReport {
  /** UUID van de lead row */
  leadId: string;
  company: string;
  generatedAt: string; // ISO date string
  model: string;

  /** 2-3 zinnen overkoepelende beoordeling — het eerste wat de lead leest */
  executiveSummary: string;

  /** Bedrijfscontext op basis van antwoorden + eventuele websearch */
  companyContext: CompanyContext;

  /** Scoreprofliel met betekenisgeving */
  scoreProfile: ScoreProfile;

  /** Analyse per dimensie (6 dimensies) */
  dimensionAnalysis: DimensionAnalysis[];

  /** 3-5 kernobservaties die direct relevant zijn voor de lead */
  keyInsights: KeyInsight[];

  /** Aanbevolen vervolgtraject op basis van scores + Q4-segmentatie */
  recommendedTrajectory: RecommendedTrajectory;

  /**
   * Wat de huidige gaps kosten — eerlijk gekwantificeerd. Optioneel zodat
   * oudere rapporten en de PDF/e-mail blijven werken.
   */
  valueAtStake?: ValueAtStake;

  /**
   * Gefaseerd actieplan (30 / 90 / 180 dagen). Optioneel — de meest
   * bruikbare sectie: zegt precies wat te doen, in welke volgorde.
   */
  actionRoadmap?: RoadmapPhase[];

  /** Urgentiesignaal op basis van totaalscores + zwakste dimensies */
  urgency: 'high' | 'medium' | 'low';
  urgencyExplanation: string;
}

/**
 * JSON schema string voor in de DeepSeek prompt.
 * Expliciet schema zorgt voor betrouwbare JSON output.
 */
export const REPORT_JSON_SCHEMA = `{
  "leadId": "string",
  "company": "string",
  "generatedAt": "ISO date string",
  "model": "string",
  "executiveSummary": "string (2-3 zinnen)",
  "companyContext": {
    "sector": "string",
    "estimatedProfile": "string",
    "keyActivities": "string",
    "researchSignals": ["string"],
    "researchNote": "string"
  },
  "scoreProfile": {
    "totalScore": "number",
    "totalMax": 75,
    "percentile": "number (1-99)",
    "profileLabel": "string (max 4 woorden)",
    "profileExplanation": "string (2-3 zinnen)"
  },
  "dimensionAnalysis": [
    {
      "dimension": "string (camelCase key)",
      "label": "string (Nederlandse naam)",
      "score": "number (0-100)",
      "assessment": "string (2-3 zinnen specifiek voor dit bedrijf)",
      "priority": "critical | attention | adequate | strong",
      "quickWin": "string (één concrete actie)"
    }
  ],
  "keyInsights": [
    {
      "title": "string (max 8 woorden)",
      "body": "string (2-3 zinnen)"
    }
  ],
  "recommendedTrajectory": {
    "offerType": "string",
    "offerName": "string",
    "rationale": "string (2-3 zinnen waarom dit traject aansluit)",
    "expectedOutcome": "string (1-2 zinnen concreet resultaat)",
    "firstStep": "string (1 zin concrete actie)"
  },
  "valueAtStake": {
    "headline": "string (1 zin: wat staat er op het spel, met orde-van-grootte)",
    "drivers": ["string (2-4 specifieke bronnen van rendementslek)"],
    "basis": "string (1-2 zinnen: eerlijke toelichting op de aannames)"
  },
  "actionRoadmap": [
    {
      "horizon": "string (tijdshorizon in doeltaal, e.g. 'Eerste 30 dagen')",
      "focus": "string (korte titel van de focus, max 6 woorden)",
      "actions": ["string (2-3 concrete uitvoerbare acties)"],
      "outcome": "string (1 zin: wat deze fase oplevert)"
    }
  ],
  "urgency": "high | medium | low",
  "urgencyExplanation": "string (1-2 zinnen)"
}`;
