import supabase from "./supabase";

export async function getCategories() {
  const { data, error } = await supabase.from("category").select("*");

  if (error) {
    console.error(error);
    throw new Error("Can't get categories");
  }

  return { data };
}

export async function getCategoryIdByName({ name }) {
  const { data, error } = await supabase
    .from("category")
    .select("id")
    .or(`name.eq.${name}`);

  if (error) {
    console.error(error);
    throw new Error("Can't get categories");
  }

  return data;
}
