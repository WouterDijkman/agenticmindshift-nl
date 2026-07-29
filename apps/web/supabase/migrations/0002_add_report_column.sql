-- Fix assigned_offer CHECK constraint: voeg 'E', 'F' toe (ontbraken in 0001)
ALTER TABLE leads
  DROP CONSTRAINT IF EXISTS leads_assigned_offer_check;

ALTER TABLE leads
  ADD CONSTRAINT leads_assigned_offer_check
  CHECK (assigned_offer IN ('A','B','C','D','E','F','none'));

-- Voeg rapport-kolom toe: het door DeepSeek gegenereerde JSON-rapport
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS report JSONB;

-- Voeg report_generated_at toe voor cache-invalidatie
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS report_generated_at TIMESTAMPTZ;

-- Index op report IS NULL: efficient opzoeken van leads zonder rapport
CREATE INDEX IF NOT EXISTS leads_report_null_idx ON leads (id) WHERE report IS NULL;
