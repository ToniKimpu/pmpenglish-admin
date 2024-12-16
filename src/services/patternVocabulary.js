import { supabase } from "./supabaseClient";

export const allPatternVocabularies = async () => {
  const { data, error } = await supabase
    .from("pattern_vocabularies")
    .select("*")
    .eq("is_deleted", false)
    .order("id", { ascending: false });
  if (error) {
    console.log("error", error.message);
    throw new Error("Failed to fetch patterns: " + error.message);
  }
  return data;
};

export const patternVocabularies = async (patternId) => {
  const { data, error } = await supabase
    .from("pattern_vocabularies")
    .select("*,pattern_vocabulary_relation!inner()")
    .eq("is_deleted", false)
    .eq("pattern_vocabulary_relation.pattern_id", patternId)
    .order("id", { ascending: false });
  if (error) {
    console.log("error", error.message);
    throw new Error("Failed to fetch patterns: " + error.message);
  }
  return data;
};

export const createPatternVocabulary = async (patternId, english, burmese) => {
  const { data, error } = await supabase
    .from("pattern_vocabularies")
    .insert({ english_text: english, burmese_text: burmese })
    .select();
  if (error) {
    throw new Error("Failed to add vocabulary: " + error.message);
  }
  const { error: relationError } = await supabase
    .from("pattern_vocabulary_relation")
    .insert({
      pattern_id: patternId,
      vocabulary_id: data[0].id,
    });
  if (relationError) {
    throw new Error("Failed to add vocabulary: " + error.message);
  }
  return data;
};

export const editPatternVocabulary = async (vocabularyId, english, burmese) => {
  const { error } = await supabase
    .from("pattern_vocabularies")
    .update({ english_text: english, burmese_text: burmese })
    .eq("id", vocabularyId);
  if (error) {
    throw new Error("Failed to add vocabulary: " + error.message);
  }
};

export const deletePatternVocabulary = async (vocabulary_id) => {
  const { data, error } = await supabase
    .from("pattern_vocabularies")
    .update({ is_deleted: true })
    .eq("id", vocabulary_id);
  if (error) {
    throw new Error("Failed to delete vocabulary: " + error.message);
  }
  return data;
};
