'use server';

import { randomUUID } from 'crypto';
import {
  scorecardSubmissionSchema,
  type ScorecardSubmission,
} from '@/lib/schemas';
import { calculateScores, determineOffer } from '@/lib/scoring';
import { isSupabaseConfigured, getSupabaseClient } from '@/lib/supabase';

export interface SubmitScorecardResult {
  ok: boolean;
  leadId?: string;
  errors?: Record<string, string>;
}

export async function submitScorecard(
  input: ScorecardSubmission,
): Promise<SubmitScorecardResult> {
  const parsed = scorecardSubmissionSchema.safeParse(input);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join('.') || '_';
      if (!errors[key]) errors[key] = issue.message;
    }
    return { ok: false, errors };
  }

  const { answers, ...lead } = parsed.data;
  const scores = calculateScores(answers);
  const offer = determineOffer(answers['Q4']);

  const leadId = randomUUID();

  if (!isSupabaseConfigured()) {
    // Graceful no-op: log and return a synthetic id so the report page works in dev.
    console.log('[submitScorecard] Supabase not configured. Logging submission.', {
      leadId,
      lead,
      scores,
      offer,
    });
    // TODO: when Supabase env is present, the block below executes instead.
    return { ok: true, leadId };
  }

  try {
    const client = getSupabaseClient();
    const { error } = await client.from('leads').insert({
      id: leadId,
      name: lead.name,
      email: lead.email,
      company: lead.company,
      job_title: lead.jobTitle,
      phone: lead.phone ?? null,
      answers,
      total_score: scores.total,
      dimension_scores: scores.byDimension,
      assigned_offer: offer,
      weakest_dimensions: scores.weakest,
    });
    if (error) {
      console.error('[submitScorecard] Supabase insert error', error);
      // Still return a leadId so the user can see their report; data may have been written partially.
      return { ok: true, leadId };
    }
    return { ok: true, leadId };
  } catch (err) {
    console.error('[submitScorecard] Unexpected error', err);
    return { ok: true, leadId };
  }
}
