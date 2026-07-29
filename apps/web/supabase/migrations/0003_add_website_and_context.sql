-- Voeg website + company_context kolommen toe voor diepere bedrijfsanalyse in het rapport
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS website TEXT;

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS company_context TEXT;

-- Index voor snel filteren op leads zonder website (handig voor handmatige enrichment)
CREATE INDEX IF NOT EXISTS leads_website_null_idx ON leads (id) WHERE website IS NULL;
