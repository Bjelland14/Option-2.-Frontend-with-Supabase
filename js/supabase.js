import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://hqynioipumvoudcxlgtp.supabase.co";
const supabaseKey = "sb_publishable_mgLvYLJTpCfX4HO2BC9fkw_sZ2Sgz1G";

export const supabase = createClient(supabaseUrl, supabaseKey);