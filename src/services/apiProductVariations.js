import supabase from "./supabase";

export async function getVariationsFromProductId(id) {
  const { data, error } = await supabase
    .from("productVariations")
    .select("*")
    .eq("product_id", id)
    .order("value", { ascending: true });

  if (error) {
    console.error("Error fetching product variations:", error);
    throw new Error("Can't get product variations");
  }

  return data;
}
