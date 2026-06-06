import { z } from 'zod';

export const emailCaptureSchema = z.object({
  name: z.string().min(2, 'Naam moet ten minste 2 tekens bevatten'),
  email: z.string().email('Voer een geldig e-mailadres in'),
  company: z.string().min(2, 'Voer een bedrijfsnaam in'),
  jobTitle: z.string().optional(),
  phone: z.string().optional(),
  /**
   * Bedrijfs- of fondswebsite (optioneel) — voor diepgaande
   * company research via Jina Reader scraping in het rapport.
   * Accepteert URL met of zonder protocol.
   */
  website: z
    .string()
    .trim()
    .optional()
    .refine(
      (v) => !v || /^([a-z]+:\/\/)?[^\s.]+\.[^\s]{2,}$/i.test(v),
      'Voer een geldige URL in (bv. www.uwbedrijf.nl)',
    ),
  /**
   * Korte vrije omschrijving van het bedrijf/fonds (optioneel).
   * Voor extra context in het rapport — bv. "PE-fonds, mid-market, 3 portfolio".
   */
  companyContext: z.string().trim().max(500, 'Maximaal 500 tekens').optional(),
});

export type EmailCaptureInput = z.infer<typeof emailCaptureSchema>;

export const partyTypeEnum = z.enum([
  'PE-partner',
  'M&A-director',
  'DGA',
  'Restructuring-specialist',
  'Anders',
]);

export const earlyAccessSchema = z.object({
  name: z.string().min(2, 'Naam moet ten minste 2 tekens bevatten'),
  email: z.string().email('Voer een geldig e-mailadres in'),
  company: z.string().min(2, 'Voer een bedrijfsnaam in'),
  jobTitle: z.string().optional(),
  partyType: partyTypeEnum,
  notes: z.string().optional(),
});

export type EarlyAccessInput = z.infer<typeof earlyAccessSchema>;

export const answersSchema = z.record(
  z.string(),
  z.enum(['A', 'B', 'C', 'D', 'E']),
);

export const scorecardSubmissionSchema = emailCaptureSchema.extend({
  answers: answersSchema,
});

export type ScorecardSubmission = z.infer<typeof scorecardSubmissionSchema>;
