'use server';

import { earlyAccessSchema, type EarlyAccessInput } from '@/lib/schemas';
import { isSupabaseConfigured, getSupabaseClient } from '@/lib/supabase';

export interface SubmitEarlyAccessResult {
  ok: boolean;
  errors?: Record<string, string>;
}

export async function submitEarlyAccess(
  input: EarlyAccessInput,
): Promise<SubmitEarlyAccessResult> {
  const parsed = earlyAccessSchema.safeParse(input);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join('.') || '_';
      if (!errors[key]) errors[key] = issue.message;
    }
    return { ok: false, errors };
  }

  if (!isSupabaseConfigured()) {
    console.log('[submitEarlyAccess] Supabase not configured. Logging submission.', parsed.data);
    // TODO: real insert when Supabase env is present.
    return { ok: true };
  }

  try {
    const client = getSupabaseClient();
    const { error } = await client.from('early_access').insert({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company,
      job_title: parsed.data.jobTitle,
      party_type: parsed.data.partyType,
      notes: parsed.data.notes ?? null,
    });
    if (error) {
      console.error('[submitEarlyAccess] Supabase insert error', error);
      return { ok: true };
    }
    return { ok: true };
  } catch (err) {
    console.error('[submitEarlyAccess] Unexpected error', err);
    return { ok: true };
  }
}
