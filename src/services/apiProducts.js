import supabase, { supabaseUrl } from "./supabase";

export async function getProducts(
  { column, equals } = {},
  limit = 16,
  page = 1
) {
  let query = supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false })
    .limit(limit)
    .range((page - 1) * limit, page * limit - 1); // Calculate the range (offset based on page)

  // Apply the filter only if `column` and `equals` are defined
  if (column && equals !== undefined) {
    query = query.eq(column, equals);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Can't get products");
  }

  return data; // Return the data
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
    .or(`name.ilike.%${name}%,brand.ilike.%${name}%`) // Checks both name and brand for the search term
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Can't search products");
  }

  return data;
}

export async function createProductWithDifferentSize(productData) {
  const bucketName = "products_image";

  try {
    // Ensure product image is available and valid
    if (!productData.image || !productData.image[0]) {
      throw new Error("Product image is required");
    }

    const productImageFile = productData.image[0];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const productImageName =
      `${productData.barcode}-${uniqueSuffix}` || "default-product-image";

    // Upload the product image
    const { error: productImageError } = await supabase.storage
      .from(bucketName)
      .upload(productImageName, productImageFile, {
        contentType: productImageFile.type,
      });

    if (productImageError) {
      throw new Error(
        "Error uploading product image: " + productImageError.message
      );
    }

    // Manually construct the image path
    const productImagePath = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${productImageName}`;

    // Insert the main product into the products table
    const { data: productInsertData, error: productInsertError } =
      await supabase
        .from("products")
        .insert({
          name: productData.name,
          brand: productData.brand,
          description: productData.description,
          price: productData.price,
          discount_percentage: productData.discount_percentage,
          barcode: productData.barcode,
          image: productImagePath,
          category_id: productData.category_id,
          stock_quantity: productData.stock_quantity || 0,
        })
        .select()
        .single();

    if (productInsertError) {
      throw new Error("Error inserting product: " + productInsertError.message);
    }

    // Handle variations
    for (const variation of productData.variations) {
      if (!variation.variation_image || !variation.variation_image[0]) {
        throw new Error(
          `Image for variation with value ${variation.value} is missing`
        );
      }

      const variationImageFile = variation.variation_image[0];
      const variationImageName = `${productData.barcode}-${variation.value}-${uniqueSuffix}`;

      // Upload the variation image
      const { error: variationImageError } = await supabase.storage
        .from(bucketName)
        .upload(variationImageName, variationImageFile, {
          contentType: variationImageFile.type,
        });

      if (variationImageError) {
        throw new Error(
          "Error uploading variation image: " + variationImageError.message
        );
      }

      // Manually construct the variation image path
      const variationImagePath = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${variationImageName}`;

      // Insert the variation into the productVariations table
      const { error: variationInsertError } = await supabase
        .from("productVariations")
        .insert({
          product_id: productInsertData.id,
          type: "size", // Ensure this is dynamically set if needed
          value: variation.value,
          variation_image: variationImagePath,
          barcode: variation.barcode,
          price: variation.price,
          stock_quantity: variation.stock_quantity,
          color_image: variation.color_image || null, // Only if you are using color variations
        });

      if (variationInsertError) {
        throw new Error(
          "Error inserting variation: " + variationInsertError.message
        );
      }
    }

    return productInsertData;
  } catch (error) {
    console.error("Error during product creation:", error);
    throw error;
  }
}

export async function createProductWithDifferentColors(productData) {
  const bucketName = "products_image";

  try {
    // Ensure product image is available and valid
    if (!productData.image || !productData.image[0]) {
      throw new Error("Product image is required");
    }

    const productImageFile = productData.image[0];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const productImageName =
      `${productData.id}-${uniqueSuffix}` || "default-product-image";

    // Upload the product image
    const { error: productImageError } = await supabase.storage
      .from(bucketName)
      .upload(productImageName, productImageFile, {
        contentType: productImageFile.type,
      });

    if (productImageError) {
      throw new Error(
        "Error uploading product image: " + productImageError.message
      );
    }

    // Manually construct the image path
    const productImagePath = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${productImageName}`;

    // Insert the main product into the products table
    const { data: productInsertData, error: productInsertError } =
      await supabase
        .from("products")
        .insert({
          name: productData.name,
          brand: productData.brand,
          description: productData.description,
          price: productData.price,
          discount_percentage: productData.discount_percentage,
          image: productImagePath,
          category_id: productData.category_id,
        })
        .select()
        .single();

    if (productInsertError) {
      throw new Error("Error inserting product: " + productInsertError.message);
    }

    // Handle color variations
    for (const colorVariation of productData.colorVariations) {
      if (!colorVariation.color_image || !colorVariation.color_image[0]) {
        throw new Error(
          `Image for color variation ${colorVariation.value} is missing`
        );
      }

      if (
        !colorVariation.variation_image ||
        !colorVariation.variation_image[0]
      ) {
        throw new Error(
          `Variation image for color variation ${colorVariation.value} is missing`
        );
      }

      const colorImageFile = colorVariation.color_image[0];
      const colorImageName = `${
        productData?.id
      }-${colorVariation.value.replaceAll(" ", "")}-color-${uniqueSuffix}`;

      const variationImageFile = colorVariation.variation_image[0];
      const variationImageName = `${
        productData?.ud
      }-${colorVariation.value.replaceAll(" ", "")}-variation-${uniqueSuffix}`;

      // Upload the color variation image
      const { error: colorImageError } = await supabase.storage
        .from(bucketName)
        .upload(colorImageName, colorImageFile, {
          contentType: colorImageFile.type,
        });

      if (colorImageError) {
        throw new Error(
          "Error uploading color variation image: " + colorImageError.message
        );
      }

      // Upload the variation image
      const { error: variationImageError } = await supabase.storage
        .from(bucketName)
        .upload(variationImageName, variationImageFile, {
          contentType: variationImageFile.type,
        });

      if (variationImageError) {
        throw new Error(
          "Error uploading variation image: " + variationImageError.message
        );
      }

      // Manually construct the image paths
      const colorImagePath = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${colorImageName}`;
      const variationImagePath = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${variationImageName}`;

      // Insert the color variation into the productVariations table
      const { error: colorVariationInsertError } = await supabase
        .from("productVariations")
        .insert({
          product_id: productInsertData.id,
          type: "color",
          value: colorVariation.value,
          barcode: colorVariation.barcode,
          price: colorVariation.price,
          color_image: colorImagePath,

          variation_image: variationImagePath,
        });

      if (colorVariationInsertError) {
        throw new Error(
          "Error inserting color variation: " +
            colorVariationInsertError.message
        );
      }
    }

    return productInsertData;
  } catch (error) {
    console.error("Error during product creation:", error);
    throw error;
  }
}

export async function deleteProductById(productId) {
  const { error: variationError } = await supabase
    .from("productVariations")
    .delete()
    .eq("product_id", productId);

  if (variationError) {
    throw new Error(
      "Error deleting product variations: " + variationError.message
    );
  }

  const { error: productError } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (productError) {
    throw new Error("Error deleting product: " + productError.message);
  }
}

export async function updateProduct(productId, productData, variations) {
  const bucketName = "products_image";

  try {
    let productImagePath = productData.image;

    // Handle product image upload if a new file is provided
    if (productData.image instanceof File) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const productImageName = `${productId}-${uniqueSuffix}`;

      const { error: productImageError } = await supabase.storage
        .from(bucketName)
        .upload(productImageName, productData.image, {
          contentType: productData.image.type,
        });

      if (productImageError) {
        throw new Error(
          "Error uploading product image: " + productImageError.message
        );
      }

      // Update the product image path
      productImagePath = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${productImageName}`;
    }

    // Update product details
    const { error: productError } = await supabase
      .from("products")
      .update({
        name: productData.name,
        brand: productData.brand,
        description: productData.description,
        price: productData.price,
        stock_quantity: productData.stock_quantity,
        discount_percentage: productData.discount_percentage,
        image: productImagePath,
      })
      .eq("id", productId);

    if (productError) {
      throw new Error("Error updating product: " + productError.message);
    }

    // Update product variations
    for (const variation of variations) {
      let variationImagePath = variation.variation_image;
      let colorImagePath = variation.color_image; // New color image path handling

      // Handle variation image upload if a new file is provided
      if (variation.variation_image instanceof File) {
        const variationImageName = `${productId}-variation-${Date.now()}`;

        const { error: variationImageError } = await supabase.storage
          .from(bucketName)
          .upload(variationImageName, variation.variation_image, {
            contentType: variation.variation_image.type,
          });

        if (variationImageError) {
          throw new Error(
            "Error uploading variation image: " + variationImageError.message
          );
        }

        // Update the variation image path
        variationImagePath = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${variationImageName}`;
      }

      // Handle color image upload if a new file is provided and variation type is "color"
      if (variation.type === "color" && variation.color_image instanceof File) {
        const colorImageName = `${productId}-color-${Date.now()}`;

        const { error: colorImageError } = await supabase.storage
          .from(bucketName)
          .upload(colorImageName, variation.color_image, {
            contentType: variation.color_image.type,
          });

        if (colorImageError) {
          throw new Error(
            "Error uploading color image: " + colorImageError.message
          );
        }

        // Update the color image path
        colorImagePath = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${colorImageName}`;
      }

      // Update the variation with both variation_image and color_image paths
      const { error: variationError } = await supabase
        .from("productVariations")
        .update({
          value: variation.value,
          variation_image: variationImagePath,
          barcode: variation.barcode,
          price: variation.price,
          stock_quantity: variation.stock_quantity,
          color_image: variation.type === "color" ? colorImagePath : null, // Ensure color_image is only set for "color" type
        })
        .eq("id", variation.id);

      if (variationError) {
        throw new Error("Error updating variation: " + variationError.message);
      }
    }
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}
