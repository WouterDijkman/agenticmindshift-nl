-- ════════════════════════════════════════════════════════════════════════════
-- PASTE DEZE COMPLETE QUERY IN SUPABASE DASHBOARD → SQL EDITOR → RUN
--
-- Combineert 0001_init.sql, 0002_add_report_column.sql, 0003_add_website_and_context.sql
-- Idempotent: kan veilig meerdere keren gedraaid worden (IF NOT EXISTS overal).
-- ════════════════════════════════════════════════════════════════════════════

-- ─── leads tabel ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  job_title TEXT,
  phone TEXT,
  website TEXT,
  company_context TEXT,
  answers JSONB NOT NULL,
  total_score INTEGER NOT NULL,
  dimension_scores JSONB NOT NULL,
  assigned_offer TEXT,
  weakest_dimensions TEXT[],
  report JSONB,
  report_generated_at TIMESTAMPTZ,
  pdf_url TEXT,
  email_sequence_step INTEGER DEFAULT 0,
  last_email_sent_at TIMESTAMPTZ,
  responded_to_email3 BOOLEAN DEFAULT false,
  unsubscribed BOOLEAN DEFAULT false,
  unsubscribe_token TEXT DEFAULT gen_random_uuid()::TEXT
);

-- Constraint: assigned_offer mag A/B/C/D/E/F/none zijn (was 0001 bug: ontbrak E, F)
ALTER TABLE leads
  DROP CONSTRAINT IF EXISTS leads_assigned_offer_check;
ALTER TABLE leads
  ADD CONSTRAINT leads_assigned_offer_check
  CHECK (assigned_offer IS NULL OR assigned_offer IN ('A','B','C','D','E','F','none'));

-- Indices voor snelle queries
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads (email);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_report_null_idx ON leads (id) WHERE report IS NULL;
CREATE INDEX IF NOT EXISTS leads_website_null_idx ON leads (id) WHERE website IS NULL;
CREATE INDEX IF NOT EXISTS leads_email_seq_idx ON leads (email_sequence_step, last_email_sent_at)
  WHERE unsubscribed = false;

-- ─── early_access tabel (homepage waitlist) ─────────────────────────────────
CREATE TABLE IF NOT EXISTS early_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  job_title TEXT,
  party_type TEXT NOT NULL,
  notes TEXT
);
CREATE INDEX IF NOT EXISTS early_access_email_idx ON early_access (email);

-- ─── Row Level Security ─────────────────────────────────────────────────────
-- We schrijven alleen vanaf server (service_role key bypassed RLS), dus RLS
-- mag aan staan voor extra veiligheid. Geen public read.
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE early_access ENABLE ROW LEVEL SECURITY;

-- ─── Klaar ──────────────────────────────────────────────────────────────────
-- Verifieer in dashboard → Table Editor: 'leads' en 'early_access' moeten zichtbaar zijn.
SELECT 'leads' AS tabel, COUNT(*) AS rows FROM leads
UNION ALL
SELECT 'early_access' AS tabel, COUNT(*) AS rows FROM early_access;
