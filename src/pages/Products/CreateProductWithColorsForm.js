import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import useCreateProductWithDifferentColors from "../../hooks/useCreateProductWithDifferentColors";
import useCategories from "../../hooks/useCategories";
import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateProductWithColorsForm() {
  const { register, handleSubmit, control, formState, reset, setError } =
    useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "colorVariations",
  });
  const { isSubmitting, errors } = formState;
  const { isCreating, createNewProductWithColors } =
    useCreateProductWithDifferentColors();
  const { categories } = useCategories();
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    if (!data.image || data.image.length === 0) {
      setError("image", {
        type: "manual",
        message: "Product image is required",
      });
      return;
    }

    if (
      data.colorVariations.some(
        (variation) =>
          !variation.color_image ||
          variation.color_image.length === 0 ||
          !variation.variation_image ||
          variation.variation_image.length === 0 ||
          !variation.barcode
      )
    ) {
      console.error("Some color or variation images are not selected");
      return;
    }

    console.log("Form Data:", data);
    try {
      createNewProductWithColors(data, {
        onSuccess: () => {
          console.log("Product created successfully!");
          toast.success("Product created successfully!", {
            position: "top-center",
            autoClose: 599,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Flip,
          });
          reset(); // Reset the form after successful submission
          setImagePreview(null); // Reset image preview
        },
        onError: (error) => {
          toast.error("Failed to create product. Please try again.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Flip,
          });
        },
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  if (isCreating) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl p-6 mx-auto space-y-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-center text-purple-900">
        Create Product with Colors
      </h2>

      {/* Product Details */}
      <div className="space-y-4">
        {/* Product Name */}
        <div className="flex flex-col">
          <label className="font-bold text-gray-700" htmlFor="name">
            Product Name
          </label>
          <input
            className={`w-full px-4 py-2 mt-1 border-2 rounded focus:outline-none ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            type="text"
            id="name"
            {...register("name", { required: "Product Name is required" })}
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </div>

        {/* Brand */}
        <div className="flex flex-col">
          <label className="font-bold text-gray-700" htmlFor="brand">
            Brand
          </label>
          <input
            className={`w-full px-4 py-2 mt-1 border-2 rounded focus:outline-none ${
              errors.brand ? "border-red-500" : "border-gray-300"
            }`}
            type="text"
            id="brand"
            {...register("brand", { required: "Brand is required" })}
          />
          {errors.brand && (
            <span className="text-sm text-red-500">{errors.brand.message}</span>
          )}
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="font-bold text-gray-700" htmlFor="category_id">
            Category
          </label>
          <select
            className={`w-full px-4 py-2 mt-1 border-2 rounded focus:outline-none ${
              errors.category_id ? "border-red-500" : "border-gray-300"
            }`}
            id="category_id"
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
            <span className="text-sm text-red-500">
              {errors.category_id.message}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="font-bold text-gray-700" htmlFor="description">
            Description
          </label>
          <textarea
            className={`w-full px-4 py-2 mt-1 border-2 rounded focus:outline-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
          ></textarea>
          {errors.description && (
            <span className="text-sm text-red-500">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="font-bold text-gray-700" htmlFor="price">
            Price
          </label>
          <input
            className={`w-full px-4 py-2 mt-1 border-2 rounded focus:outline-none ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
            type="number"
            id="price"
            {...register("price", { required: "Price is required" })}
          />
          {errors.price && (
            <span className="text-sm text-red-500">{errors.price.message}</span>
          )}
        </div>

        {/* Product Image */}
        <div className="flex flex-col">
          <label className="font-bold text-gray-700" htmlFor="image">
            Product Image
          </label>
          <input
            className={`w-full px-4 py-2 mt-1 border-2 rounded focus:outline-none ${
              errors.image ? "border-red-500" : "border-gray-300"
            }`}
            type="file"
            id="image"
            {...register("image", { required: "Product image is required" })}
            onChange={handleImageChange}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Product Preview"
              className="h-40 mt-2"
            />
          )}
          {errors.image && (
            <span className="text-sm text-red-500">{errors.image.message}</span>
          )}
        </div>
      </div>

      {/* Color Variations */}
      <h3 className="mb-4 text-xl font-bold text-purple-900">
        Color Variations
      </h3>
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="p-4 mb-4 border rounded-lg shadow-sm bg-gray-50"
        >
          <div className="space-y-4">
            {/* Color Name */}
            <div className="flex flex-col">
              <label
                className="font-bold text-gray-700"
                htmlFor={`colorVariations[${index}].value`}
              >
                Color Name
              </label>
              <input
                className={`w-full px-4 py-2 mt-1 border-2 rounded focus:outline-none ${
                  errors.colorVariations?.[index]?.value
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                type="text"
                id={`colorVariations[${index}].value`}
                {...register(`colorVariations[${index}].value`, {
                  required: "Color Name is required",
                })}
              />
              {errors.colorVariations?.[index]?.value && (
                <span className="text-sm text-red-500">
                  {errors.colorVariations[index].value.message}
                </span>
              )}
            </div>
            {/* Barcode */}
            <div className="flex flex-col">
              <label
                className="font-bold text-gray-700"
                htmlFor={`colorVariations[${index}].barcode`}
              >
                Barcode
              </label>
              <input
                className={`w-full px-4 py-2 mt-1 border-2 rounded focus:outline-none ${
                  errors.colorVariations?.[index]?.barcode
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                type="text"
                id={`colorVariations[${index}].barcode`}
                {...register(`colorVariations[${index}].barcode`, {
                  required: "Barcode is required",
                })}
              />
              {errors.colorVariations?.[index]?.barcode && (
                <span className="text-sm text-red-500">
                  {errors.colorVariations[index].barcode.message}
                </span>
              )}
            </div>

            {/* Color Image */}
            <div className="flex flex-col">
              <label
                className="font-bold text-gray-700"
                htmlFor={`colorVariations[${index}].color_image`}
              >
                Color Image
              </label>
              <input
                className={`w-full px-4 py-2 mt-1 border-2 rounded focus:outline-none ${
                  errors.colorVariations?.[index]?.color_image
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                type="file"
                id={`colorVariations[${index}].color_image`}
                {...register(`colorVariations[${index}].color_image`, {
                  required: "Color Image is required",
                })}
              />
              {errors.colorVariations?.[index]?.color_image && (
                <span className="text-sm text-red-500">
                  {errors.colorVariations[index].color_image.message}
                </span>
              )}
            </div>

            {/* Variation Image */}
            <div className="flex flex-col">
              <label
                className="font-bold text-gray-700"
                htmlFor={`colorVariations[${index}].variation_image`}
              >
                Variation Image
              </label>
              <input
                className={`w-full px-4 py-2 mt-1 border-2 rounded focus:outline-none ${
                  errors.colorVariations?.[index]?.variation_image
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                type="file"
                id={`colorVariations[${index}].variation_image`}
                {...register(`colorVariations[${index}].variation_image`, {
                  required: "Variation Image is required",
                })}
              />
              {errors.colorVariations?.[index]?.variation_image && (
                <span className="text-sm text-red-500">
                  {errors.colorVariations[index].variation_image.message}
                </span>
              )}
            </div>

            {/* Remove Button */}
            <Button
              type="button"
              variant="danger"
              onClick={() => remove(index)}
            >
              Remove Color Variation
            </Button>
          </div>
        </div>
      ))}

      {/* Add Color Variation Button */}
      <Button
        className="mx-6 bg-purple-900"
        type="button"
        variant="secondary"
        onClick={() => append({})}
      >
        Add Color Variation
      </Button>

      {/* Submit Button */}
      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isCreating ? "Waiting to Create" : "Create Product"}
      </Button>
    </form>
  );
}

export default CreateProductWithColorsForm;
