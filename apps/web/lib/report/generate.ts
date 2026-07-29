/**
 * Hoofd-generator: haalt lead-data op, doet websearch, roept DeepSeek aan,
 * valideert het JSON-rapport en slaat het op in Supabase.
 */

import { type Answers, calculateScores, determineOffer, type DimensionScores } from '@/lib/scoring';
import { type OfferType } from '@/lib/scoring';
import { researchCompany } from './webResearch';
import { buildReportPrompt, CONTACT_TOKEN } from './prompt';
import { type GeneratedReport } from './types';
import { type ReportLocale, normalizeReportLocale } from './locale';
import { isSupabaseConfigured, getSupabaseClient } from '@/lib/supabase';

/**
 * Inference-endpoint is env-configureerbaar zodat het DeepSeek-model bij een
 * zero-data-retention provider (bv. Fireworks AI / Together AI, US/EU-hosted,
 * OpenAI-compatible) kan draaien i.p.v. de first-party api.deepseek.com — die
 * data in China opslaat en op input mag trainen. Default blijft backwards-compatible.
 * Zet DEEPSEEK_BASE_URL + DEEPSEEK_MODEL (+ DEEPSEEK_API_KEY) om te switchen.
 */
const DEEPSEEK_BASE = (process.env.DEEPSEEK_BASE_URL ?? 'https://api.deepseek.com').replace(/\/$/, '');
const DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL ?? 'deepseek-chat';

function isDeepSeekConfigured(): boolean {
  return Boolean(process.env.DEEPSEEK_API_KEY);
}

/** Ruwe call naar een OpenAI-compatible chat-completions endpoint (DeepSeek of ZDR-host) */
async function callDeepSeek(system: string, user: string): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error('DEEPSEEK_API_KEY not set');

  const response = await fetch(`${DEEPSEEK_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3, // laag voor consistente, feitelijke output
      max_tokens: 5000,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`DeepSeek API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('DeepSeek returned empty content');
  return content;
}

/** Valideert en normaliseert het geparseerde JSON-rapport */
function validateReport(raw: unknown, leadId: string): GeneratedReport {
  if (!raw || typeof raw !== 'object') throw new Error('Report is not an object');
  const r = raw as Record<string, unknown>;

  // Minimale validatie — DeepSeek met JSON mode + strak schema is betrouwbaar
  if (!r.executiveSummary) throw new Error('Missing executiveSummary');
  if (!Array.isArray(r.dimensionAnalysis)) throw new Error('Missing dimensionAnalysis');
  if (!Array.isArray(r.keyInsights)) throw new Error('Missing keyInsights');

  return {
    ...r,
    leadId, // forceer correcte leadId ongeacht wat DeepSeek teruggeeft
    generatedAt: new Date().toISOString(),
    model: DEEPSEEK_MODEL,
  } as GeneratedReport;
}

/**
 * Vervangt de geanonimiseerde CONTACT_TOKEN in alle string-velden van het
 * rapport door de echte voornaam van de lead. De naam is dus nooit naar het
 * taalmodel gestuurd; personalisatie gebeurt pas hier, lokaal op de server.
 */
function rehydrateContact<T>(value: T, firstName: string): T {
  const name = firstName.trim();
  if (!name) return value;
  const walk = (v: unknown): unknown => {
    if (typeof v === 'string') return v.split(CONTACT_TOKEN).join(name);
    if (Array.isArray(v)) return v.map(walk);
    if (v && typeof v === 'object') {
      const out: Record<string, unknown> = {};
      for (const [k, val] of Object.entries(v as Record<string, unknown>)) out[k] = walk(val);
      return out;
    }
    return v;
  };
  return walk(value) as T;
}

export interface GenerateReportOptions {
  leadId: string;
  name: string;
  company: string;
  jobTitle?: string;
  /** Bedrijfswebsite — voor diepe scrape via Jina Reader */
  website?: string;
  /** Korte vrije toelichting over het bedrijf van de lead */
  companyContext?: string;
  answers: Answers;
  /** Doeltaal van het rapport — bepaalt de output-taal van DeepSeek. */
  locale: ReportLocale;
}

/**
 * Genereer een diepgaand adviesrapport voor de lead.
 * Slaat het op in Supabase (leads.report) als Supabase geconfigureerd is.
 * Gooit een Error als DeepSeek niet geconfigureerd is.
 */
export async function generateAndStoreReport(
  options: GenerateReportOptions,
): Promise<GeneratedReport> {
  const { leadId, name, company, jobTitle, website, companyContext, answers, locale } = options;

  if (!isDeepSeekConfigured()) {
    throw new Error('DeepSeek niet geconfigureerd (DEEPSEEK_API_KEY missing)');
  }

  // Bereken scores
  const scores = calculateScores(answers);
  const offerType = determineOffer(answers['Q4']) as OfferType;

  // Strategisch bedrijfsonderzoek: multi-page Jina-scrape (track record, team,
  // propositie) + thematische Serper-search (deal-activiteit, leiderschap,
  // digitale signalen). Sector + locale sturen de prioriteit. Beide graceful.
  const research = await researchCompany(company, jobTitle, website, companyContext, locale);

  // Bouw prompt
  const { system, user } = buildReportPrompt({
    leadId,
    name,
    company,
    jobTitle,
    website,
    companyContext,
    answers,
    totalScore: scores.total,
    byDimension: scores.byDimension as DimensionScores,
    weakest: scores.weakest,
    offerType,
  }, research, locale);

  // Roep DeepSeek aan
  console.log(`[generateReport] Calling DeepSeek for lead ${leadId} (${company})`);
  const rawJson = await callDeepSeek(system, user);

  // Parse + valideer
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    throw new Error(`DeepSeek output is geen geldig JSON: ${rawJson.slice(0, 200)}`);
  }
  const validated = validateReport(parsed, leadId);

  // Personaliseer pas hier, lokaal: vervang de geanonimiseerde token door de
  // echte voornaam. De naam is nooit naar het taalmodel verstuurd.
  const firstName = name.trim().split(/\s+/)[0] ?? '';
  const report = rehydrateContact(validated, firstName);

  // Sla op in Supabase
  if (isSupabaseConfigured()) {
    const client = getSupabaseClient();
    const { error } = await client
      .from('leads')
      .update({
        report,
        report_generated_at: report.generatedAt,
      })
      .eq('id', leadId);

    if (error) {
      console.error('[generateReport] Supabase update error', error);
      // Geen throw — rapport is wel gegenereerd, alleen opslag mislukt
    } else {
      console.log(`[generateReport] Report stored for lead ${leadId}`);
    }
  }

  return report;
}

/**
 * Haal een bestaand rapport op uit Supabase.
 * Returns null als niet gevonden of Supabase niet geconfigureerd.
 */
export async function getStoredReport(leadId: string): Promise<GeneratedReport | null> {
  if (!isSupabaseConfigured()) return null;

  const client = getSupabaseClient();
  const { data, error } = await client
    .from('leads')
    .select('report')
    .eq('id', leadId)
    .single();

  if (error || !data?.report) return null;
  return data.report as GeneratedReport;
}

/**
 * Haal lead-data op voor rapportgeneratie (name, company, answers, etc.)
 */
export async function getLeadForReport(leadId: string): Promise<GenerateReportOptions | null> {
  if (!isSupabaseConfigured()) return null;

  const client = getSupabaseClient();
  const baseCols = 'id, name, company, job_title, website, company_context, answers';

  let { data, error } = await client
    .from('leads')
    .select(`${baseCols}, locale`)
    .eq('id', leadId)
    .single();

  // Defensief: als de `locale`-kolom nog niet bestaat (migratie 0004 niet
  // toegepast), val terug op een select zonder locale.
  if (error && /locale/i.test(`${error.message} ${error.details ?? ''}`)) {
    ({ data, error } = await client
      .from('leads')
      .select(baseCols)
      .eq('id', leadId)
      .single());
  }

  if (error || !data) return null;
  return {
    leadId: data.id,
    name: data.name,
    company: data.company,
    jobTitle: data.job_title ?? undefined,
    website: data.website ?? undefined,
    companyContext: data.company_context ?? undefined,
    answers: data.answers as Answers,
    locale: normalizeReportLocale((data as { locale?: unknown }).locale),
  };
}
