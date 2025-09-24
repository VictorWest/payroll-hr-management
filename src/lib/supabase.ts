import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with fallback for development
const supabaseUrl = 'https://dpytcyyoeeirzojmxmyo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRweXRjeXlvZWVpcnpvam14bXlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzODcxMzYsImV4cCI6MjA2NTk2MzEzNn0.V7whMPC-gh4xPdkb4lo_CftJnoGngvhkhNaYwvsxPgs';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

export { supabase };