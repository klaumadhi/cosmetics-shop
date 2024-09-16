import supabase, { supabaseUrl } from "./supabase";

// Fetch wallpapers
export async function getWallpapers({ column, equals } = {}, limit = null) {
  let query = supabase
    .from("wallpapers")
    .select("*")
    .order("id", { ascending: false })
    .limit(limit);

  if (column && equals !== undefined) {
    query = query.eq(column, equals);
  }

  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("Can't get wallpapers");
  }

  return data;
}

export async function createWallpaper(newWallpaper) {
  // Handle the image file
  const imageFile = newWallpaper.image[0]; // Assuming image is a file input
  const imageName = new Date().getTime().toString(); // Unique image name (timestamp)
  const bucketName = "wallpapers_image"; // Your Supabase storage bucket name

  // Upload the image to Supabase storage
  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(imageName, imageFile, {
      contentType: imageFile.type,
    });

  if (uploadError) {
    throw new Error("Error uploading image");
  }

  // Get the image URL after uploading
  const imagePath = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${imageName}`;

  // Insert the new wallpaper into the database using the correct column 'product_image'
  const { data, error } = await supabase.from("wallpapers").insert([
    {
      product_name: newWallpaper.product_name,
      product_link: newWallpaper.product_link,
      product_image: imagePath, // Correct column name is 'product_image'
    },
  ]);

  if (error) {
    console.error("Error creating wallpaper:", error);
    throw new Error("Error creating wallpaper");
  }

  return data;
}

// Edit a wallpaper
export async function editWallpaper(id, updatedWallpaper) {
  let imagePath = updatedWallpaper.product_image; // Default to the existing image path

  // Check if a new image is uploaded
  if (updatedWallpaper.image && updatedWallpaper.image.length > 0) {
    const imageFile = updatedWallpaper.image[0]; // New image file

    const imageName = new Date().getTime().toString(); // Unique name (timestamp)
    const bucketName = "wallpapers_image"; // Supabase storage bucket name

    // Upload new image to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(imageName, imageFile, {
        contentType: imageFile.type,
      });

    if (uploadError) {
      throw new Error("Error uploading image");
    }

    // Get the new image URL after upload
    imagePath = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${imageName}`;
  }

  // Prepare the updated data, using the new or existing image path
  const updatedData = {
    product_name: updatedWallpaper.product_name,
    product_link: updatedWallpaper.product_link,
    product_image: imagePath, // Use the new image or the existing one
  };

  // Perform the update operation
  const { data, error } = await supabase
    .from("wallpapers")
    .update(updatedData)
    .eq("id", id);

  if (error) {
    console.error("Error editing wallpaper:", error);
    throw new Error("Error editing wallpaper");
  }

  return data;
}

// Delete a wallpaper
export async function deleteWallpaper(id) {
  const { data, error } = await supabase
    .from("wallpapers")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting wallpaper:", error);
    throw new Error("Error deleting wallpaper");
  }

  return data;
}
