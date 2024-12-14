import { supabase } from "./supabaseClient";

export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error("Login failed: " + error.message);
  }

  return data;
};

export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    throw new Error("Failed to sign up: " + error.message);
  }
  return data;
};
