import { supabase } from "./supabaseClient";

export const lessonList = async (dayId) => {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("day_id", dayId)
    .eq("is_deleted", false)
    .order("created_at", { ascending: true });
  if (error) {
    throw new Error("Failed to fetch lessons: " + error.message);
  }
  return data;
};

export const lessonDetail = async (lessonId) => {
  const { data, error } = await supabase
    .from("patterns")
    .select("*,pattern_examples(*)")
    .eq("lesson_id", lessonId);
  if (error) {
    throw new Error("Failed to fetch lesson details: " + error.message);
  }
  return data;
};

export const addLesson = async (lesson_name, day_id) => {
  console.log("lesson", lesson_name);
  console.log("dayId", day_id);
  const { data, error } = await supabase
    .from("lessons")
    .insert({ lesson_name: lesson_name, day_id: day_id });
  if (error) {
    throw new Error("Failed to add lessons: " + error.message);
  }
  return data;
};

export const deleteLesson = async (lesson_id) => {
  const { data, error } = await supabase
    .from("lessons")
    .update({ is_deleted: true })
    .eq("id", lesson_id);
  if (error) {
    throw new Error("Failed to delete lesson: " + error.message);
  }
  return data;
};
