import { supabase } from "./supabaseClient";

export const patternList = async () => {
  const { data, error } = await supabase
    .from("patterns")
    .select("*")
    .eq("is_deleted", false)
    .order("created_at", { ascending: true });
  if (error) {
    throw new Error("Failed to fetch patterns: " + error.message);
  }
  return data;
};
