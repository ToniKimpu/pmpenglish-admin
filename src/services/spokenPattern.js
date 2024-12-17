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

export const createSpokenPattern = async (
  pattern,
  title,
  description,
  audio_path
) => {
  const { data, error } = await supabase
    .from("patterns")
    .insert({
      pattern: pattern,
      title: title,
      description: description,
      audio_path: audio_path,
    })
    .select();
  if (error) {
    throw new Error("Failed to add pattern: " + error.message);
  }
  return data;
};

export const editSpokenPattern = async (
  id,
  pattern,
  title,
  description,
  audio_path
) => {
  const { error } = await supabase
    .from("patterns")
    .update({
      pattern: pattern,
      title: title,
      description: description,
      audio_path: audio_path,
    })
    .eq("id", id);
  if (error) {
    throw new Error("Failed to add pattern: " + error.message);
  }
};

export const deleteSpokenPattern = async (id) => {
  const { error } = await supabase
    .from("patterns")
    .update({ is_deleted: true })
    .eq("id", id);
  if (error) {
    throw new Error("Failed to delete pattern: " + error.message);
  }
};
