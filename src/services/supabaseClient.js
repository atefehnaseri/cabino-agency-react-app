import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xqolfzuvdojuevzgizxx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhxb2xmenV2ZG9qdWV2emdpenh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzNjU4MjQsImV4cCI6MjA2Njk0MTgyNH0.h09AMwOcA1j35L3KyKVjloY0APJ52Sf0o38odBmzmrE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
