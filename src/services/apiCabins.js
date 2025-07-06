import supabase, { supabaseUrl } from "./supabaseClient";

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

//use this function for both create and update a cabin
export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);
  //https://xqolfzuvdojuevzgizxx.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;

  //1. first create/edit the cabin
  let query = supabase.from("cabins");

  //Create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //Edit cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error(`Cabin could not be created!`);
  }

  // 2.then upload image into supabase bucket storage in create mode
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. delete the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      `Cabin image could not be uploaded and the canin was not created!`
    );
  }

  return data;
}
