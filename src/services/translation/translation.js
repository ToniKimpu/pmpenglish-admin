import { supabase } from "../supabaseClient";

export const allTranslations = async (day_id) => {
  const { data, error } = await supabase
    .from("translations")
    .select("*,translation_vocabulary_relation(pattern_vocabularies(*))")
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
  const { data, error } = await supabase.from("translations").insert({
    english_text: englishText,
    burmese_text: burmeseText,
    words: words,
    translation_day_id: dayId,
    audio_path: audioPath,
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
