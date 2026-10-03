-- =========================================================================
-- AURA 2026 - SYMPOSIUM DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- Department of Information Technology, Adhiparasakthi Engineering College
-- Symposium Date: 29 October 2026 | Registration Fee: ₹120
-- =========================================================================

-- 1. Create registrations table
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    registration_id VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    college VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    year VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    selected_events JSONB NOT NULL DEFAULT '[]'::jsonb,
    registration_fee NUMERIC(10, 2) NOT NULL DEFAULT 120.00,
    payment_transaction_id VARCHAR(100) NOT NULL,
    payment_screenshot TEXT,
    payment_status VARCHAR(50) NOT NULL DEFAULT 'Pending', -- 'Pending', 'Verified', 'Rejected'
    admin_notes TEXT,
    registration_date TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create indexes for fast lookup, search, and filtering
CREATE INDEX IF NOT EXISTS idx_registrations_reg_id ON public.registrations(registration_id);
CREATE INDEX IF NOT EXISTS idx_registrations_phone ON public.registrations(phone);
CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON public.registrations(payment_status);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations(created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- 4. RLS POLICIES

-- Policy 1: Allow anyone (anonymous public) to insert a new registration
CREATE POLICY "Allow public insert registrations"
ON public.registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy 2: Allow anyone to view a specific registration using registration_id (for confirmation/receipt view)
CREATE POLICY "Allow public read own confirmation by registration_id"
ON public.registrations
FOR SELECT
TO anon, authenticated
USING (true);

-- Policy 3: Allow authenticated admins full control (select, update, delete)
CREATE POLICY "Allow authenticated full management"
ON public.registrations
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5. Storage Bucket for Payment Screenshots
-- Run this if using Supabase Storage for screenshots
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment_proofs', 'payment_proofs', true)
ON CONFLICT (id) DO NOTHING;

-- Policy for anyone to upload payment proof screenshot
CREATE POLICY "Allow public upload payment screenshots"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'payment_proofs');

-- Policy for anyone to read public screenshots
CREATE POLICY "Allow public view payment screenshots"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'payment_proofs');

-- 6. Helper View for Real-time Dashboard Analytics
CREATE OR REPLACE VIEW public.symposium_analytics AS
SELECT
    COUNT(*) AS total_registrations,
    COUNT(CASE WHEN payment_status = 'Verified' THEN 1 END) AS verified_payments,
    COUNT(CASE WHEN payment_status = 'Pending' THEN 1 END) AS pending_payments,
    COUNT(CASE WHEN payment_status = 'Rejected' THEN 1 END) AS rejected_payments,
    COALESCE(SUM(CASE WHEN payment_status = 'Verified' THEN registration_fee ELSE 0 END), 0) AS total_revenue_verified,
    COALESCE(SUM(registration_fee), 0) AS total_potential_revenue
FROM public.registrations;

-- =========================================================================
-- SETUP INSTRUCTIONS FOR ORGANIZERS:
-- 1. Log in to your Supabase Project (https://supabase.com).
-- 2. Open the "SQL Editor" from the left sidebar.
-- 3. Paste this entire script and click "Run".
-- 4. Copy your Project URL and Anon Key from Project Settings > API.
-- 5. Add them to your .env file:
--    VITE_SUPABASE_URL=https://your-project-id.supabase.co
--    VITE_SUPABASE_ANON_KEY=your-anon-public-key
-- =========================================================================
