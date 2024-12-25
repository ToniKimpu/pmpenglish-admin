import { supabase } from "../supabaseClient";

export const allTranslationDays = async (level_id) => {
  const { data, error } = await supabase
    .from("translation_days")
    .select("*")
    .eq("is_deleted", false)
    .eq("translation_level_id", level_id)
    .order("created_at", { ascending: true });
  if (error) {
    console.log("error", error.message);
    throw new Error("Failed to fetch translation days: " + error.message);
  }
  return data;
};

export const createTranslationDay = async (translation_level_id, day_name) => {
  const { data, error } = await supabase.from("translation_days").insert({
    translation_level_id: translation_level_id,
    day_name: day_name,
  });
  if (error) {
    console.log("error", error.message);
    throw new Error("Failed to create translation day: " + error.message);
  }
  return data;
};

export const editTranslationDay = async (id, day_name) => {
  const { error } = await supabase
    .from("translation_days")
    .update({ day_name: day_name })
    .eq("id", id);
  if (error) {
    throw new Error("Failed to edit translation day: " + error.message);
  }
};

export const deleteTranslationDay = async (id) => {
  const { error } = await supabase
    .from("translation_days")
    .update({ is_deleted: true })
    .eq("id", id);
  if (error) {
    throw new Error("Failed to delete translation day: " + error.message);
  }
};
