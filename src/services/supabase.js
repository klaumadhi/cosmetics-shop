import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tntaffmvhubevkfkkjbp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRudGFmZm12aHViZXZrZmtramJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODg2OTcsImV4cCI6MjAzODg2NDY5N30.P-nP_ZFg3cdk_77HhvDanPsenYOC5ViuWgj-DPNN1kE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
export { supabaseUrl };
