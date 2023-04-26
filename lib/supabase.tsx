import { Database } from "./database";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient<Database>(
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
  `${process.env.SUPABASE_SERVICE_ROLE_KEY}`
);

export default supabase;
