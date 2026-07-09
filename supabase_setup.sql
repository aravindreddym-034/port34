-- ============================================================
-- Supabase Setup for Visitor Counter
-- Run this in the Supabase SQL Editor:
-- https://kopzbpjfnfizkozsvhdv.supabase.co
-- ============================================================

-- 1. Create the visitors table
CREATE TABLE IF NOT EXISTS public.visitors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  visitor_id TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Create an index on created_at for efficient rank queries
CREATE INDEX IF NOT EXISTS idx_visitors_created_at ON public.visitors (created_at ASC, id ASC);

-- 3. Enable Row Level Security
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policy: Allow anonymous users to INSERT (their own visitor row)
CREATE POLICY "Allow anonymous insert"
  ON public.visitors
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 5. RLS Policy: Allow anonymous users to SELECT (needed for count/rank)
CREATE POLICY "Allow anonymous select"
  ON public.visitors
  FOR SELECT
  TO anon
  USING (true);

-- 6. Create the RPC function that does everything in one call:
--    - Inserts visitor (ignore if duplicate)
--    - Computes rank (how many visitors came before or at the same time)
--    - Computes total visitor count
--    Returns JSON: { "rank": number, "total": number }
CREATE OR REPLACE FUNCTION public.get_visitor_stats(p_visitor_id TEXT)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_rank BIGINT;
  v_total BIGINT;
  v_created_at TIMESTAMPTZ;
BEGIN
  -- Insert the visitor, ignore if already exists
  INSERT INTO public.visitors (visitor_id)
  VALUES (p_visitor_id)
  ON CONFLICT (visitor_id) DO NOTHING;

  -- Get this visitor's created_at timestamp and id for deterministic ordering
  SELECT created_at INTO v_created_at
  FROM public.visitors
  WHERE visitor_id = p_visitor_id;

  -- If somehow the visitor doesn't exist (shouldn't happen), return nulls
  IF v_created_at IS NULL THEN
    RETURN json_build_object('rank', NULL, 'total', NULL);
  END IF;

  -- Compute rank: count of visitors created at or before this visitor
  -- Using (created_at, id) for deterministic ordering when timestamps match
  SELECT COUNT(*) INTO v_rank
  FROM public.visitors v
  WHERE v.created_at < v_created_at
     OR (v.created_at = v_created_at AND v.id <= (
       SELECT id FROM public.visitors WHERE visitor_id = p_visitor_id
     ));

  -- Compute total visitor count
  SELECT COUNT(*) INTO v_total
  FROM public.visitors;

  RETURN json_build_object('rank', v_rank, 'total', v_total);
END;
$$;

-- 7. Grant execute permission to anonymous users
GRANT EXECUTE ON FUNCTION public.get_visitor_stats(TEXT) TO anon;
