import { supabase } from "./supabaseClient";

export const allPatternVocabularies = async (keyword = "") => {
  let query = supabase
    .from("pattern_vocabularies")
    .select("*")
    .eq("is_deleted", false);
  if (keyword) {
    query = query.ilike("english_text", `%${keyword}%`);
  }
  const { data, error } = await query.order("id", { ascending: false });
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

export const createPatternExerciseVocabulary = async (
  patternExerciseId,
  english,
  burmese
) => {
  const { data, error } = await supabase
    .from("pattern_vocabularies")
    .insert({ english_text: english, burmese_text: burmese })
    .select();
  if (error) {
    throw new Error("Failed to add vocabulary: " + error.message);
  }
  const { error: relationError } = await supabase
    .from("pattern_exercises_vocabularies_relation")
    .insert({
      pattern_exercise_id: patternExerciseId,
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

export const deletePatternVocabulary = async (vocabulary_id, pattern_id) => {
  const { data, error } = await supabase
    .from("pattern_vocabulary_relation")
    .delete()
    .eq("vocabulary_id", vocabulary_id)
    .eq("pattern_id", pattern_id);

  if (error) {
    throw new Error("Failed to delete vocabulary: " + error.message);
  }
  return data;
};

export const addPatternVocabularyRelation = async (vocabularyRelations) => {
  const insertPromises = vocabularyRelations.map(
    async ({ vocabulary_id, patternId }) => {
      const { data, error: selectError } = await supabase
        .from("pattern_vocabulary_relation")
        .select("*")
        .eq("pattern_id", patternId)
        .eq("vocabulary_id", vocabulary_id)
        .maybeSingle();

      if (selectError && selectError.code !== "PGRST116") {
        throw new Error(
          "Failed to check existing relation: " + selectError.message
        );
      }

      if (data) {
        return null;
      }

      const { data: insertData, error: insertError } = await supabase
        .from("pattern_vocabulary_relation")
        .insert({ pattern_id: patternId, vocabulary_id: vocabulary_id });

      if (insertError) {
        throw new Error("Failed to add vocabulary: " + insertError.message);
      }

      return insertData;
    }
  );
  const results = await Promise.allSettled(insertPromises);
  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error("Error during insertion:", result.reason);
    }
  });
};
