import { spokenPatternBucket, supabase, uploadFile } from "./supabaseClient";

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

export const allPatternsWithoutLesson = async () => {
  const { data, error } = await supabase
    .from("patterns")
    .select("*")
    .eq("is_deleted", false)
    .is("lesson_id", null)
    .order("created_at", { ascending: true });
  if (error) {
    throw new Error("Failed to fetch patterns: " + error.message);
  }
  return data;
};

export const allPatternsByLessonId = async (lessonId) => {
  const { data, error } = await supabase
    .from("patterns")
    .select("*")
    .eq("is_deleted", false)
    .eq("lesson_id", lessonId)
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
  audio_1,
  audio_2
) => {
  try {
    const [audio_path_1, audio_path_2] = await Promise.all([
      audio_1
        ? uploadFile({ bucketId: spokenPatternBucket, file: audio_1 })
        : Promise.resolve(""),
      audio_2
        ? uploadFile({ bucketId: spokenPatternBucket, file: audio_2 })
        : Promise.resolve(""),
    ]);

    // Insert the pattern into the database
    const { data, error } = await supabase
      .from("patterns")
      .insert({
        pattern,
        title,
        description,
        audio_path: audio_path_1,
        audio_path_2: audio_path_2,
      })
      .select();

    if (error) {
      throw new Error(`Failed to add pattern: ${error.message}`);
    }

    return data;
  } catch (err) {
    console.error(err); // Log the error for better debugging
    throw new Error(
      "An error occurred while creating the spoken pattern: " + err.message
    );
  }
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

export const attachPatternToLesson = async (patternRelations) => {
  const insertPromises = patternRelations.map(async ({ id, lessonId }) => {
    const { data: insertData, error: insertError } = await supabase
      .from("patterns")
      .update({ lesson_id: lessonId })
      .eq("id", id);
    if (insertError) {
      throw new Error("Failed to add Lesson_id: " + insertError.message);
    }
    return insertData;
  });
  const results = await Promise.allSettled(insertPromises);
  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error("Error during insertion:", result.reason);
    }
  });
};

export const unAttachPatternToLesson = async (patternId) => {
  const { data, error } = await supabase
    .from("patterns")
    .update({ lesson_id: null })
    .eq("id", patternId);
  if (error) {
    throw new Error("Failed to unattach Lesson_id: " + error.message);
  }
  return data;
};
