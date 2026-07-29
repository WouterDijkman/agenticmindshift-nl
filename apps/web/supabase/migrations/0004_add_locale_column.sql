-- Sla de UI-taal van de prospect op zodat het rapport + de e-mail in de juiste
-- taal worden gegenereerd (nl/en/de/es/pt). Default 'nl' voor bestaande rijen.
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS locale TEXT NOT NULL DEFAULT 'nl';
