CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  job_title TEXT NOT NULL,
  phone TEXT,
  answers JSONB NOT NULL,
  total_score INTEGER NOT NULL,
  dimension_scores JSONB NOT NULL,
  assigned_offer TEXT CHECK (assigned_offer IN ('A','B','C','D','none')),
  weakest_dimensions TEXT[],
  pdf_url TEXT,
  email_sequence_step INTEGER DEFAULT 1,
  last_email_sent_at TIMESTAMPTZ,
  responded_to_email3 BOOLEAN DEFAULT false,
  unsubscribed BOOLEAN DEFAULT false,
  unsubscribe_token TEXT DEFAULT gen_random_uuid()::TEXT
);

CREATE TABLE early_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  job_title TEXT NOT NULL,
  party_type TEXT NOT NULL,
  notes TEXT
);
