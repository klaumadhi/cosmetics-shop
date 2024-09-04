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
    .select("*")
    .eq("name", name); // Assuming name is a valid field

  if (error) {
    console.error("Error fetching category:", error);
    throw new Error("Can't get categories");
  }

  console.log("Fetched category data:", data[0]);

  if (data.length === 0) {
    console.warn("No category found with name:", name);
    return null; // Or handle it appropriately
  }

  return data[0]; // Return the first item if expecting a single result
}
