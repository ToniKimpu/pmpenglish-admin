import { supabase } from "./supabaseClient";

export const createUser = async (name, email) => {
  // Retrieve the authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error("Failed to retrieve user: " + authError.message);
  }

  const { data, error: insertError } = await supabase.from("users").insert({
    name: name,
    email: email,
    user_id: user.id,
    account_id: generateAccountID(),
    user_type: "admin",
  });

  if (insertError) {
    throw new Error("Failed to insert user: " + insertError.message);
  }
  return data;
};

export const allStudents = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("*,premium_users(id)")
    .eq("user_type", "student");
  if (error) {
    throw new Error("Failed to fetch users: " + error.message);
  }
  return data;
};
export const premiumStudents = async () => {
  const currentDate = new Date().toISOString();
  const { data, error } = await supabase
    .from("users")
    .select("*, premium_users!inner(expired_at)")
    .eq("user_type", "student")
    .gte("premium_users.expired_at", currentDate);

  if (error) {
    throw new Error("Failed to fetch users: " + error.message);
  }
  return data;
};

export const addPremiumUser = async (user_id) => {
  const currentDate = new Date();
  const expiredAt = new Date(currentDate); // Clone the current date
  expiredAt.setDate(expiredAt.getDate() + 30);
  const { data, error } = await supabase.from("premium_users").insert({
    user_id: user_id,
    expired_at: expiredAt,
  });
  if (error) {
    throw new Error("Failed to add premium user: " + error.message);
  }
  return data;
};

export const removePremiumUser = async (user_id) => {
  const { data, error } = await supabase
    .from("premium_users")
    .delete()
    .eq("user_id", user_id);

  if (error) {
    throw new Error("Failed to remove premium user: " + error.message);
  }
  return data;
};

const generateAccountID = () => {
  const passcode = Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
  return `PMP${passcode}`;
};
