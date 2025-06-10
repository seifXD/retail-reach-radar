
-- Check if RLS is enabled and add basic policies for the retailers table
ALTER TABLE public.retailers ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all authenticated users to view all retailers
CREATE POLICY "Allow authenticated users to view retailers" 
ON public.retailers 
FOR SELECT 
TO authenticated 
USING (true);

-- Create a policy that allows all authenticated users to update retailers
CREATE POLICY "Allow authenticated users to update retailers" 
ON public.retailers 
FOR UPDATE 
TO authenticated 
USING (true);
