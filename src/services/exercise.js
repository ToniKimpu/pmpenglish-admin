import { supabase } from "./supabaseClient";

export const allExercises = async (dayId) => {
  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("is_deleted", false)
    .eq("day_id", dayId)
    .order("id", { ascending: true });
  if (error) {
    console.log("error", error.message);
    throw new Error("Failed to fetch pattern exercises: " + error.message);
  }
  return data;
};

export const createExercise = async (exerciseName, dayId) => {
  const { error } = await supabase
    .from("exercises")
    .insert({ exercise_name: exerciseName, day_id: dayId });
  if (error) {
    throw new Error("Failed to create exercise: " + error.message);
  }
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
