import { supabase, uploadFile } from "./supabaseClient";

export const allPatternExercises = async (exerciseId) => {
  const { data, error } = await supabase
    .from("pattern_exercises")
    .select(
      "*,pattern_exercises_vocabularies_relation(pattern_vocabularies(*))"
    )
    .eq("is_deleted", false)
    .eq("exercise_id", exerciseId)
    .order("id", { ascending: true });
  if (error) {
    console.log("error", error.message);
    throw new Error("Failed to fetch exercises: " + error.message);
  }
  return data;
};

export const createPatternExercise = async (
  englishText,
  burmeseText,
  exerciseId,
  audio
) => {
  let audioPath;
  if (audio) {
    audioPath = await uploadFile({
      bucketId: spokenPatternBucket,
      file: audio,
    });
  }

  const { error } = await supabase.from("pattern_exercises").insert({
    english_text: englishText,
    burmese_text: burmeseText,
    exercise_id: exerciseId,
    audio_path: audioPath,
  });
  if (error) {
    throw new Error("Failed to create exercise: " + error.message);
  }
};

export const patternExerciseVocabularies = async (exerciseId) => {
  const { data, error } = await supabase
    .from("pattern_vocabularies")
    .select("*,pattern_exercises_vocabularies_relation!inner()")
    .eq("is_deleted", false)
    .eq(
      "pattern_exercises_vocabularies_relation.pattern_exercise_id",
      exerciseId
    )
    .order("id", { ascending: true });
  if (error) {
    console.log("error", error.message);
    throw new Error("Failed to fetch pattern exercises: " + error.message);
  }
  return data;
};

export const editExercise = async (id, exerciseName) => {
  const { error } = await supabase
    .from("exercises")
    .update({ exercise_name: exerciseName })
    .eq("id", id);
  if (error) {
    throw new Error("Failed to edit exercise: " + error.message);
  }
};

export const deleteExercise = async (id) => {
  const { error } = await supabase
    .from("exercises")
    .update({ is_deleted: true })
    .eq("id", id);
  if (error) {
    throw new Error("Failed to delete exercise: " + error.message);
  }
};

export const addPatternExerciseVocabularyRelation = async (
  vocabularyRelations
) => {
  const insertPromises = vocabularyRelations.map(
    async ({ vocabulary_id, pattern_exercise_id }) => {
      const { data, error: selectError } = await supabase
        .from("pattern_exercises_vocabularies_relation")
        .select("*")
        .eq("pattern_exercise_id", pattern_exercise_id)
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
        .from("pattern_exercises_vocabularies_relation")
        .insert({
          pattern_exercise_id: pattern_exercise_id,
          vocabulary_id: vocabulary_id,
        });

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
