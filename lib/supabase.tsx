import React from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = () => {
  const supabase = createClient(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
    `${process.env.NEXT_PUBLIC_SUPABASE_KEY}`
  );
  return supabase;
};

export default supabase;
