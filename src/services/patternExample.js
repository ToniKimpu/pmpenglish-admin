import { supabase } from "./supabaseClient";

export const patternExamples = async (patternId) => {
  const { data, error } = await supabase
    .from("pattern_examples")
    .select("*")
    .eq("is_deleted", false)
    .eq("pattern_id", patternId)
    .order("id", { ascending: false });
  if (error) {
    console.log("error", error.message);
    throw new Error("Failed to fetch examples: " + error.message);
  }
  return data;
};

export const createPatternExample = async (patternId, english, burmese) => {
  const { error } = await supabase.from("pattern_examples").insert({
    english_text: english,
    burmese_text: burmese,
    pattern_id: patternId,
  });
  if (error) {
    throw new Error("Failed to add vocabulary: " + error.message);
  }
};

export const editPatternExample = async (id, english, burmese) => {
  const { error } = await supabase
    .from("pattern_examples")
    .update({ english_text: english, burmese_text: burmese })
    .eq("id", id);
  if (error) {
    throw new Error("Failed to add vocabulary: " + error.message);
  }
};

export const deletePatternExample = async (id) => {
  const { error } = await supabase
    .from("pattern_examples")
    .delete()
    .eq("id", id);
  if (error) {
    throw new Error("Failed to delete pattern: " + error.message);
  }
};
