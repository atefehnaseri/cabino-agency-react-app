import supabase from "./supabaseClient";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error(`Error fetching cabins: ${error.message}`);
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error(`Cabin could not be deleted!`);
  }
  return error;
}
