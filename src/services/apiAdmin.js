import supabase from "./supabase";
import bcrypt from "bcryptjs";

// Login API
export async function loginAdmin({ username, password }) {
  const { data, error } = await supabase
    .from("admins")
    .select("*")
    .eq("username", username)
    .single();

  if (error || !data) {
    throw new Error("Invalid credentials");
  }

  const isValidPassword = password === data.password;
  if (!isValidPassword) {
    throw new Error("Invalid password");
  }

  // Store login session locally (e.g., in localStorage)
  localStorage.setItem("adminSession", JSON.stringify(data));
  return data;
}

// Logout API
export function logoutAdmin() {
  localStorage.removeItem("adminSession");
}

// Check if Admin is logged in
export function isAdminLoggedIn() {
  return !!localStorage.getItem("adminSession");
}
