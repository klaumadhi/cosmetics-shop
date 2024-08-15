import supabase, { supabaseUrl } from "./supabase";

export async function getProducts({ column, equals } = {}) {
  let query = supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false });

  // Apply the filter only if `column` and `equals` are defined
  if (column && equals !== undefined) {
    query = query.eq(column, equals);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Can't get products");
  }

  return data; // Return the data to use it elsewhere
}

// API function to create a product
export async function createProduct(newProduct) {
  // Ensure that the image is handled correctly
  const imageFile = newProduct.image[0]; // Assuming image is a file input
  const imageName = newProduct.barcode; // Use barcode as the image name
  const bucketName = "products_image";

  // Upload the image
  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(imageName, imageFile, {
      contentType: imageFile.type, // Ensure correct MIME type is set
    });

  if (uploadError) {
    console.error("Error uploading image:", uploadError);
    throw new Error("Error uploading image");
  }

  // Create the product entry with the image path
  const imagePath = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${imageName}`;
  const { data, error } = await supabase
    .from("products")
    .insert([{ ...newProduct, image: imagePath }]);

  if (error) {
    console.error("Error creating product:", error);
    throw new Error("Error creating product");
  }

  return data;
}

export async function searchProductsByName(name) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .ilike("name", `%${name}%`) // Use .ilike for case-insensitive search
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Can't search products");
  }

  console.log("Search products from apiProducts: " + data);

  return data;
}
