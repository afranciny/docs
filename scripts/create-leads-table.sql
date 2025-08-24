-- Create leads table for storing form submissions
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Basic contact information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  cnpj TEXT,
  company_website TEXT,
  
  -- Business information
  monthly_revenue DECIMAL,
  conversion_rate DECIMAL,
  average_ticket DECIMAL,
  company_size TEXT CHECK (company_size IN ('pequena', 'media', 'grande')),
  
  -- Product interest
  product_interest TEXT,
  
  -- Evaluation scores (1-5 scale)
  ai_score INTEGER CHECK (ai_score >= 1 AND ai_score <= 5),
  bi_score INTEGER CHECK (bi_score >= 1 AND bi_score <= 5),
  crm_score INTEGER CHECK (crm_score >= 1 AND crm_score <= 5),
  processes_score INTEGER CHECK (processes_score >= 1 AND processes_score <= 5),
  
  -- Additional details
  additional_details TEXT,
  
  -- Recommendation generated
  recommended_service TEXT,
  recommended_level TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_company_size ON leads(company_size);

-- Enable Row Level Security (RLS) - for now, allow all operations since this is a lead capture form
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert leads (public form)
CREATE POLICY "Allow public lead insertion" ON leads
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow reading leads (for admin purposes)
CREATE POLICY "Allow reading leads" ON leads
  FOR SELECT 
  USING (true);
