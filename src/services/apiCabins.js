import supabase from "./supabaseClient";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error(`Error fetching cabins: ${error.message}`);
  }
  return data;
}
