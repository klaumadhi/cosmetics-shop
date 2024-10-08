import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import useCreateProductWithDifferentSize from "../../hooks/useCreateProductWithDifferentSize";
import useCategories from "../../hooks/useCategories";
import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateProductWithSizesForm() {
  const { register, handleSubmit, control, formState, reset } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variations",
  });
  const { isSubmitting, errors } = formState;
  const { isCreating, createNewProductWithSizes } =
    useCreateProductWithDifferentSize();
  const { categories } = useCategories();

  const onSubmit = async (data) => {
    // Set discount_percentage to 0 if it's not provided
    data.discount_percentage = data.discount_percentage || 0;

    if (!data.image || data.image.length === 0) {
      toast.error("Please select a product image.");
      return;
    }

    if (
      data.variations.some(
        (variation) =>
          !variation.variation_image || variation.variation_image.length === 0
      )
    ) {
      toast.error("Please select images for all variations.");
      return;
    }

    try {
      await createNewProductWithSizes(data, {
        onSuccess: () => {
          toast.success("Product created successfully!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            theme: "dark",
            transition: Flip,
          });
          reset();
        },
        onError: () => {
          toast.error("Failed to create product. Please try again.", {
            position: "top-center",
            autoClose: 5000,
            theme: "dark",
            transition: Flip,
          });
        },
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  if (isCreating) {
    return <Spinner />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl p-6 mx-auto space-y-6 bg-white rounded-lg shadow-lg"
    >
      {/* Product Details */}
      <div className="space-y-4">
        <div>
          <label className="block font-bold text-gray-700" htmlFor="name">
            Product Name
          </label>
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            id="name"
            placeholder="Enter product name"
            {...register("name", { required: "Product Name is required" })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block font-bold text-gray-700" htmlFor="brand">
            Brand
          </label>
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            id="brand"
            placeholder="Enter brand"
            {...register("brand", { required: "Brand is required" })}
          />
          {errors.brand && (
            <p className="text-red-500">{errors.brand.message}</p>
          )}
        </div>

        <div>
          <label
            className="block font-bold text-gray-700"
            htmlFor="category_id"
          >
            Category
          </label>
          <select
            id="category_id"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("category_id", { required: "Category is required" })}
          >
            <option value="">Select a category</option>
            {categories?.data?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <p className="text-red-500">{errors.category_id.message}</p>
          )}
        </div>

        <div>
          <label
            className="block font-bold text-gray-700"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            id="description"
            placeholder="Enter product description"
            {...register("description", {
              required: "Description is required",
            })}
          ></textarea>
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block font-bold text-gray-700" htmlFor="price">
            Price
          </label>
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="number"
            id="price"
            placeholder="Enter price"
            {...register("price", { required: "Price is required" })}
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label
            className="block font-bold text-gray-700"
            htmlFor="discount_percentage"
          >
            Discount Percentage
          </label>
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="number"
            id="discount_percentage"
            placeholder="Enter discount percentage (optional)"
            {...register("discount_percentage")}
          />
        </div>

        <div>
          <label className="block font-bold text-gray-700" htmlFor="stock">
            Stock Quantity
          </label>
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="number"
            id="stock"
            placeholder="Enter stock quantity"
            {...register("stock_quantity", { required: "Stock is required" })}
          />
          {errors.stock_quantity && (
            <p className="text-red-500">{errors.stock_quantity.message}</p>
          )}
        </div>

        <div>
          <label className="block font-bold text-gray-700" htmlFor="image">
            Product Image
          </label>
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="file"
            id="image"
            {...register("image", { required: "Product Image is required" })}
            accept="image/*"
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>
      </div>

      {/* Variations Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-700">Variations</h3>
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 my-4 border rounded-lg">
            <div className="space-y-2">
              <div>
                <label className="block font-bold text-gray-700">
                  Value (ml)
                </label>
                <input
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="number"
                  {...register(`variations[${index}].value`, {
                    required: "Value is required",
                  })}
                />
                {errors.variations?.[index]?.value && (
                  <p className="text-red-500">
                    {errors.variations[index].value.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-bold text-gray-700">Price</label>
                <input
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="number"
                  {...register(`variations[${index}].price`, {
                    required: "Price is required",
                  })}
                />
                {errors.variations?.[index]?.price && (
                  <p className="text-red-500">
                    {errors.variations[index].price.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-bold text-gray-700">Barcode</label>
                <input
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="text"
                  {...register(`variations[${index}].barcode`, {
                    required: "Barcode is required",
                  })}
                />
                {errors.variations?.[index]?.barcode && (
                  <p className="text-red-500">
                    {errors.variations[index].barcode.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-bold text-gray-700">Stock</label>
                <input
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="number"
                  {...register(`variations[${index}].stock_quantity`, {
                    required: "Stock is required",
                  })}
                />
                {errors.variations?.[index]?.stock_quantity && (
                  <p className="text-red-500">
                    {errors.variations[index].stock_quantity.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-bold text-gray-700">
                  Variation Image
                </label>
                <input
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="file"
                  {...register(`variations[${index}].variation_image`, {
                    required: "Variation Image is required",
                  })}
                  accept="image/*"
                />
                {errors.variations?.[index]?.variation_image && (
                  <p className="text-red-500">
                    {errors.variations[index].variation_image.message}
                  </p>
                )}
              </div>

              <Button
                type="button"
                onClick={() => remove(index)}
                className="w-full text-white bg-red-500"
              >
                Remove Variation
              </Button>
            </div>
          </div>
        ))}

        <Button
          type="button"
          onClick={() =>
            append({ value: "", price: "", barcode: "", variation_image: "" })
          }
          className="w-full text-white bg-blue-500"
        >
          Add Variation
        </Button>
      </div>

      <div className="flex justify-between mt-6">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full text-white bg-purple-500"
        >
          {isSubmitting ? "Creating..." : "Create Product"}
        </Button>
      </div>
    </form>
  );
}

export default CreateProductWithSizesForm;
