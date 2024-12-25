import { supabase } from "../supabaseClient";

export const allTranslationLevels = async () => {
  const { data, error } = await supabase
    .from("translation_levels")
    .select("*")
    .eq("is_deleted", false)
    .order("created_at", { ascending: true });
  if (error) {
    console.log("error", error.message);
    throw new Error("Failed to fetch translation levels: " + error.message);
  }
  return data;
};

export const createTranslationLevel = async (level_name) => {
  const { data, error } = await supabase
    .from("translation_levels")
    .insert({ level_name: level_name });
  if (error) {
    console.log("error", error.message);
    throw new Error("Failed to create translation level: " + error.message);
  }
  return data;
};

export const editTranslationLevel = async (id, level_name) => {
  const { error } = await supabase
    .from("translation_levels")
    .update({ level_name: level_name })
    .eq("id", id);
  if (error) {
    throw new Error("Failed to edit translation level: " + error.message);
  }
};

export const deleteTranslationLevel = async (id) => {
  const { error } = await supabase
    .from("translation_levels")
    .update({ is_deleted: true })
    .eq("id", id);
  if (error) {
    throw new Error("Failed to delete translation level: " + error.message);
  }
};
