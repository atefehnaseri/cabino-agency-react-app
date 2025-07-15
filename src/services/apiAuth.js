import supabase from "./supabaseClient";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  //check the current session
  let { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  //if session exists, return the user
  let { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}
