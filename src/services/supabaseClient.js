import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseClient = (() => {
  let instance;
  return () => {
    if (!instance) {
      instance = createClient(supabaseUrl, supabaseAnonKey);
    }
    return instance;
  };
})();

export const supabase = supabaseClient();

export async function uploadFile({ bucketId, file, cacheControl = "3600" }) {
  try {
    if (!file) throw new Error("No file provided for upload.");

    const fileExt = file.name.split(".").pop();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `${timestamp}.${fileExt}`;

    const { error } = await supabase.storage
      .from("stores/" + bucketId)
      .upload(fileName, file, {
        cacheControl,
        upsert: false,
      });

    if (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }
    const { data } = supabase.storage
      .from("stores/" + bucketId)
      .getPublicUrl(fileName);
    if (!data) throw new Error("Failed to retrieve public URL.");
    return data.publicUrl;
  } catch (err) {
    console.error("UploadFile Error:", err.message);
    throw err;
  }
}

export async function removeFile({ bucketId, filePath }) {
  try {
    const fileName = bucketId + filePath.split("/").pop();
    const { error } = await supabase.storage.from("stores").remove([fileName]);

    if (error) {
      throw new Error(`Error removing image: ${error.message}`);
    }
    console.log(`Image ${fileName} removed successfully`);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

export const spokenPatternBucket = "audios/spoken-patterns/";
export const patternExerciseBucket = "audios/pattern-exercises/";
export const translationBucket = "audios/translations/";
