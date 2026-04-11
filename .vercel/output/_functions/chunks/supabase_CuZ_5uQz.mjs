import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://jsizcludmgqflxdfhzkb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzaXpjbHVkbWdxZmx4ZGZoemtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NTE4ODUsImV4cCI6MjA5MTMyNzg4NX0.6W-AjXx3odTMzLWgsqCvpyuyeJMixIaxSfRbtg69zis";
createClient(supabaseUrl, supabaseAnonKey);
function createServerClient() {
  return createClient(
    "https://jsizcludmgqflxdfhzkb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzaXpjbHVkbWdxZmx4ZGZoemtiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTc1MTg4NSwiZXhwIjoyMDkxMzI3ODg1fQ.Rb-CjP7E--rf2-ribz-PkXbY5NeUyhTvhtvEZm5fg24"
  );
}

export { createServerClient };
