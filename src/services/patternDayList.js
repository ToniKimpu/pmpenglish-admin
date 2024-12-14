import { supabase } from "./supabaseClient";

export const patternDayList = async (user_id) => {
  const { data, error } = await supabase
    .from("days")
    .select("*")
    .order("order_number", { ascending: true });
  if (error) {
    throw new Error("Failed to fetch days: " + error.message);
  }
  return data;
};

export const addPatternDay = async (order_number) => {
  const { data: selectData, error: selectError } = await supabase
    .from("days")
    .select("*")
    .eq("order_number", order_number);

  if (selectError) {
    throw new Error(
      "Failed to check existing order numbers: " + selectError.message
    );
  }
  if (selectData.length > 0) {
    throw new Error(`Day ${order_number} already exists.`);
  }

  const { data, error } = await supabase.from("days").insert({ order_number });

  if (error) {
    throw new Error("Failed to add order number: " + error.message);
  }

  return data;
};
