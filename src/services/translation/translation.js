import { supabase, translationBucket, uploadFile } from "../supabaseClient";

export const allTranslations = async (day_id) => {
  const { data, error } = await supabase
    .from("translations")
    .select("*")
    .eq("is_deleted", false)
    .eq("translation_day_id", day_id)
    .order("created_at", { ascending: true });
  if (error) {
    console.log("error", error.message);
    throw new Error("Failed to fetch translations: " + error.message);
  }
  return data;
};

export const createTranslation = async (
  englishText,
  burmeseText,
  words,
  dayId,
  audioPath
) => {
  let audio;
  if (audioPath) {
    audio = await uploadFile({
      bucketId: translationBucket,
      file: audioPath,
    });
  }

  const { data, error } = await supabase.from("translations").insert({
    english_text: englishText,
    burmese_text: burmeseText,
    words: words,
    translation_day_id: dayId,
    audio_path: audio,
  });
  if (error) {
    console.log("error", error.message);
    throw new Error("Failed to create translation day: " + error.message);
  }
  return data;
};

export const editTranslation = async (
  id,
  englishText,
  burmeseText,
  words,
  dayId,
  audioPath
) => {
  const { error } = await supabase
    .from("translations")
    .update({
      english_text: englishText,
      burmese_text: burmeseText,
      words: words,
      translation_day_id: dayId,
      audio_path: audioPath,
    })
    .eq("id", id);
  if (error) {
    throw new Error("Failed to edit translation day: " + error.message);
  }
};

export const deleteTranslation = async (id) => {
  const { error } = await supabase
    .from("translations")
    .update({ is_deleted: true })
    .eq("id", id);
  if (error) {
    throw new Error("Failed to delete translation: " + error.message);
  }
};

export const allTranslationVocabularies = async (translationId) => {
  const { data, error } = await supabase
    .from("pattern_vocabularies")
    .select("*,translation_vocabulary_relation!inner()")
    .eq("is_deleted", false)
    .eq("translation_vocabulary_relation.translation_id", translationId)
    .order("created_at", { ascending: true });
  if (error) {
    console.log("error", error.message);
    throw new Error("Failed to fetch translations: " + error.message);
  }
  return data;
};

export const createTranslationVocabulary = async (
  translationId,
  english,
  burmese
) => {
  const { data, error } = await supabase
    .from("pattern_vocabularies")
    .insert({ english_text: english, burmese_text: burmese })
    .select();
  if (error) {
    throw new Error("Failed to create vocabulary: " + error.message);
  }
  const { error: relationError } = await supabase
    .from("translation_vocabulary_relation")
    .insert({
      translation_id: translationId,
      vocabulary_id: data[0].id,
    });
  if (relationError) {
    throw new Error("Failed to create vocabulary: " + error.message);
  }
  return data;
};

export const addTranslationVocabularyRelation = async (vocabularyRelations) => {
  const insertPromises = vocabularyRelations.map(
    async ({ vocabulary_id, translation_id }) => {
      const { data, error: selectError } = await supabase
        .from("translation_vocabulary_relation")
        .select("*")
        .eq("translation_id", translation_id)
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
        .from("translation_vocabulary_relation")
        .insert({
          translation_id: translation_id,
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
