import { z } from 'zod';

/**
 * Validatiefouten zijn message *keys*, geen zinnen.
 *
 * Dit formulier draait in vijf talen. Een hardcoded Nederlandse zin toonde een
 * Duitse of Spaanse bezoeker Nederlandse foutmeldingen bij zijn eigen formulier.
 * De keys worden opgelost in de `validation`-namespace van messages/<locale>.json,
 * op de plek waar de fout ook echt getoond wordt.
 */
export const validationKeys = {
  nameMin: 'name_min',
  emailInvalid: 'email_invalid',
  companyMin: 'company_min',
  websiteInvalid: 'website_invalid',
  contextMax: 'context_max',
} as const;

export const emailCaptureSchema = z.object({
  name: z.string().min(2, validationKeys.nameMin),
  email: z.string().email(validationKeys.emailInvalid),
  company: z.string().min(2, validationKeys.companyMin),
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
      validationKeys.websiteInvalid,
    ),
  /**
   * Korte vrije omschrijving van het bedrijf/fonds (optioneel).
   * Voor extra context in het rapport — bv. "PE-fonds, mid-market, 3 portfolio".
   */
  companyContext: z.string().trim().max(500, validationKeys.contextMax).optional(),
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
  name: z.string().min(2, validationKeys.nameMin),
  email: z.string().email(validationKeys.emailInvalid),
  company: z.string().min(2, validationKeys.companyMin),
  jobTitle: z.string().optional(),
  partyType: partyTypeEnum,
  notes: z.string().optional(),
});

export type EarlyAccessInput = z.infer<typeof earlyAccessSchema>;

export const answersSchema = z.record(
  z.string(),
  z.enum(['A', 'B', 'C', 'D', 'E']),
);

export const reportLocaleEnum = z.enum(['nl', 'en', 'de', 'es', 'pt']);
export type ReportLocale = z.infer<typeof reportLocaleEnum>;

export const scorecardSubmissionSchema = emailCaptureSchema.extend({
  answers: answersSchema,
  /** UI-taal van de prospect — bepaalt de taal van het gegenereerde rapport + e-mail. */
  locale: reportLocaleEnum.optional().default('nl'),
});

export type ScorecardSubmission = z.infer<typeof scorecardSubmissionSchema>;
