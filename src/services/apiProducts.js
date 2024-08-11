import supabase, { supabaseUrl } from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error(error);
    throw new Error("Can't get products");
  }

  console.log(data);

  return data;
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
