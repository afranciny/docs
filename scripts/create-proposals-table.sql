-- Create proposals table for storing generated proposals
CREATE TABLE IF NOT EXISTS public.proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Proposal metadata
  proposal_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'viewed', 'accepted', 'rejected')),
  
  -- Company information
  company_name TEXT NOT NULL,
  company_logo TEXT,
  
  -- Selected products and pricing
  selected_products JSONB NOT NULL DEFAULT '[]',
  total_value DECIMAL(10,2) NOT NULL,
  discount_percentage INTEGER DEFAULT 0,
  final_value DECIMAL(10,2) NOT NULL,
  
  -- Custom content
  custom_notes TEXT,
  
  -- Client access
  client_access_token TEXT UNIQUE NOT NULL,
  client_password TEXT NOT NULL,
  
  -- Acceptance data
  accepted_at TIMESTAMP WITH TIME ZONE,
  client_name TEXT,
  client_email TEXT,
  client_cnpj TEXT,
  client_cpf TEXT,
  client_address TEXT,
  
  -- Creator (internal user)
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "proposals_select_own" ON public.proposals 
  FOR SELECT USING (created_by = auth.uid());

CREATE POLICY "proposals_insert_own" ON public.proposals 
  FOR INSERT WITH CHECK (created_by = auth.uid());

CREATE POLICY "proposals_update_own" ON public.proposals 
  FOR UPDATE USING (created_by = auth.uid());

CREATE POLICY "proposals_delete_own" ON public.proposals 
  FOR DELETE USING (created_by = auth.uid());

-- Allow public access for client viewing (using access token)
CREATE POLICY "proposals_public_view" ON public.proposals 
  FOR SELECT USING (true);

-- Create index for faster lookups
CREATE INDEX idx_proposals_access_token ON public.proposals(client_access_token);
CREATE INDEX idx_proposals_number ON public.proposals(proposal_number);
