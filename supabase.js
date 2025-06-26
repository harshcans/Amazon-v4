// lib/supabase.js
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://tnrfgqlhhznfhdyncgdu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRucmZncWxoaHpuZmhkeW5jZ2R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MzUxMTgsImV4cCI6MjA2NjUxMTExOH0.jEWnf8y2DbC-WhUxFlRcKPTBe481_Ajtb69BE93ctBA"
);
