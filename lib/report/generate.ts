/**
 * Hoofd-generator: haalt lead-data op, doet websearch, roept DeepSeek aan,
 * valideert het JSON-rapport en slaat het op in Supabase.
 */

import { type Answers, calculateScores, determineOffer, type DimensionScores } from '@/lib/scoring';
import { type OfferType } from '@/lib/scoring';
import { researchCompany } from './webResearch';
import { buildReportPrompt } from './prompt';
import { type GeneratedReport } from './types';
import { isSupabaseConfigured, getSupabaseClient } from '@/lib/supabase';

const DEEPSEEK_BASE = 'https://api.deepseek.com';

function isDeepSeekConfigured(): boolean {
  return Boolean(process.env.DEEPSEEK_API_KEY);
}

/** Ruwe call naar DeepSeek chat completions (OpenAI-compatible) */
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
      model: 'deepseek-chat',
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
    model: 'deepseek-chat',
  } as GeneratedReport;
}

export interface GenerateReportOptions {
  leadId: string;
  name: string;
  company: string;
  jobTitle?: string;
  answers: Answers;
}

/**
 * Genereer een diepgaand adviesrapport voor de lead.
 * Slaat het op in Supabase (leads.report) als Supabase geconfigureerd is.
 * Gooit een Error als DeepSeek niet geconfigureerd is.
 */
export async function generateAndStoreReport(
  options: GenerateReportOptions,
): Promise<GeneratedReport> {
  const { leadId, name, company, jobTitle, answers } = options;

  if (!isDeepSeekConfigured()) {
    throw new Error('DeepSeek niet geconfigureerd (DEEPSEEK_API_KEY missing)');
  }

  // Bereken scores
  const scores = calculateScores(answers);
  const offerType = determineOffer(answers['Q4']) as OfferType;

  // Websearch (graceful no-op als geen SERPER_API_KEY)
  const research = await researchCompany(company, jobTitle);

  // Bouw prompt
  const { system, user } = buildReportPrompt({
    leadId,
    name,
    company,
    jobTitle,
    answers,
    totalScore: scores.total,
    byDimension: scores.byDimension as DimensionScores,
    weakest: scores.weakest,
    offerType,
  }, research);

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
  const report = validateReport(parsed, leadId);

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
  const { data, error } = await client
    .from('leads')
    .select('id, name, company, job_title, answers')
    .eq('id', leadId)
    .single();

  if (error || !data) return null;
  return {
    leadId: data.id,
    name: data.name,
    company: data.company,
    jobTitle: data.job_title ?? undefined,
    answers: data.answers as Answers,
  };
}
