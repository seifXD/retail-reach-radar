// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ywpmhcbddkntxbkefuqp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cG1oY2JkZGtudHhia2VmdXFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNjczOTMsImV4cCI6MjA2NDY0MzM5M30.d6J9L-EkmyYL9CHLV55N8THzogqADJirCI-wXvlJJyg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);