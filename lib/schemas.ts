import { z } from 'zod';

const bannedDomains = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'yahoo.com',
  'live.nl',
  'ziggo.nl',
  'kpn.com',
];

export const emailCaptureSchema = z.object({
  name: z.string().min(2, 'Naam moet ten minste 2 tekens bevatten'),
  email: z
    .string()
    .email('Voer een geldig e-mailadres in')
    .refine((e) => {
      const lower = e.toLowerCase();
      return !bannedDomains.some((d) => lower.endsWith('@' + d));
    }, 'Gebruik uw zakelijke e-mailadres'),
  company: z.string().min(2, 'Voer een bedrijfsnaam in'),
  jobTitle: z.string().min(2, 'Voer uw functietitel in'),
  phone: z.string().optional(),
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
  email: z
    .string()
    .email('Voer een geldig e-mailadres in')
    .refine((e) => {
      const lower = e.toLowerCase();
      return !bannedDomains.some((d) => lower.endsWith('@' + d));
    }, 'Gebruik uw zakelijke e-mailadres'),
  company: z.string().min(2, 'Voer een bedrijfsnaam in'),
  jobTitle: z.string().min(2, 'Voer uw functietitel in'),
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
