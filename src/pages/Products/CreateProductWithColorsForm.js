import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import useCreateProductWithDifferentColors from "../../hooks/useCreateProductWithDifferentColors";
import useCategories from "../../hooks/useCategories";
import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateProductWithColorsForm() {
  const { register, handleSubmit, control, formState, reset } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "colorVariations",
  });
  const { isSubmitting } = formState;
  const { isCreating, createNewProductWithColors } =
    useCreateProductWithDifferentColors();
  const { categories } = useCategories();

  const onSubmit = async (data) => {
    if (!data.image || data.image.length === 0) {
      console.error("No product image selected");
      return;
    }

    if (
      data.colorVariations.some(
        (variation) =>
          !variation.color_image ||
          variation.color_image.length === 0 ||
          !variation.variation_image ||
          variation.variation_image.length === 0
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full max-w-md mt-5">
        {/* Product Details */}
        <div className="flex items-center mb-4">
          <label className="block pr-4 font-bold text-gray-500" htmlFor="name">
            Product Name
          </label>
          <input
            className="w-full px-4 py-2 bg-gray-200 border-2 rounded"
            type="text"
            id="name"
            {...register("name", { required: "Product Name is required" })}
          />
        </div>

        <div className="flex items-center mb-4">
          <label className="block pr-4 font-bold text-gray-500" htmlFor="brand">
            Brand
          </label>
          <input
            className="w-full px-4 py-2 bg-gray-200 border-2 rounded"
            type="text"
            id="brand"
            {...register("brand", { required: "Brand is required" })}
          />
        </div>

        <div className="flex items-center mb-4">
          <label
            className="block pr-4 font-bold text-gray-500"
            htmlFor="category_id"
          >
            Category
          </label>
          <select
            id="category_id"
            className="w-full px-4 py-2 bg-gray-200 border-2 rounded"
            {...register("category_id", { required: "Category is required" })}
          >
            <option value="">Select a category</option>
            {categories?.data?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center mb-4">
          <label
            className="block pr-4 font-bold text-gray-500"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="w-full px-4 py-2 bg-gray-200 border-2 rounded"
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
          ></textarea>
        </div>

        <div className="flex items-center mb-4">
          <label className="block pr-4 font-bold text-gray-500" htmlFor="price">
            Price
          </label>
          <input
            className="w-full px-4 py-2 bg-gray-200 border-2 rounded"
            type="number"
            id="price"
            {...register("price", { required: "Price is required" })}
          />
        </div>

        <div className="flex items-center mb-4">
          <label
            className="block pr-4 font-bold text-gray-500"
            htmlFor="discount_percentage"
          >
            Discount Percentage
          </label>
          <input
            className="w-full px-4 py-2 bg-gray-200 border-2 rounded"
            type="number"
            id="discount_percentage"
            {...register("discount_percentage")}
          />
        </div>

        <div className="flex items-center mb-4">
          <label className="block pr-4 font-bold text-gray-500" htmlFor="image">
            Product Image
          </label>
          <input
            className="w-full px-4 py-2 bg-gray-200 border-2 rounded"
            type="file"
            id="image"
            {...register("image", { required: "Product image is required" })}
          />
        </div>

        {/* Color Variations */}
        <h3 className="mb-2 text-lg font-bold">Color Variations</h3>
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="p-4 mb-6 border border-gray-300 rounded"
          >
            <div className="flex items-center mb-4">
              <label
                className="block pr-4 font-bold text-gray-500"
                htmlFor={`colorVariations[${index}].value`}
              >
                Color Name
              </label>
              <input
                className="w-full px-4 py-2 bg-gray-200 border-2 rounded"
                type="text"
                id={`colorVariations[${index}].value`}
                {...register(`colorVariations[${index}].value`, {
                  required: "Color Name is required",
                })}
              />
            </div>

            <div className="flex items-center mb-4">
              <label
                className="block pr-4 font-bold text-gray-500"
                htmlFor={`colorVariations[${index}].color_image`}
              >
                Color Image
              </label>
              <input
                className="w-full px-4 py-2 bg-gray-200 border-2 rounded"
                type="file"
                id={`colorVariations[${index}].color_image`}
                {...register(`colorVariations[${index}].color_image`, {
                  required: "Color Image is required",
                })}
              />
            </div>

            <div className="flex items-center mb-4">
              <label
                className="block pr-4 font-bold text-gray-500"
                htmlFor={`colorVariations[${index}].variation_image`}
              >
                Variation Image
              </label>
              <input
                className="w-full px-4 py-2 bg-gray-200 border-2 rounded"
                type="file"
                id={`colorVariations[${index}].variation_image`}
                {...register(`colorVariations[${index}].variation_image`, {
                  required: "Variation Image is required",
                })}
              />
            </div>

            <div className="flex items-center mb-4">
              <label
                className="block pr-4 font-bold text-gray-500"
                htmlFor={`colorVariations[${index}].price`}
              >
                Price
              </label>
              <input
                className="w-full px-4 py-2 bg-gray-200 border-2 rounded"
                type="number"
                id={`colorVariations[${index}].price`}
                {...register(`colorVariations[${index}].price`, {
                  required: "Price is required",
                })}
              />
            </div>

            <div className="flex items-center mb-4">
              <label
                className="block pr-4 font-bold text-gray-500"
                htmlFor={`colorVariations[${index}].barcode`}
              >
                Barcode
              </label>
              <input
                className="w-full px-4 py-2 bg-gray-200 border-2 rounded"
                type="text"
                id={`colorVariations[${index}].barcode`}
                {...register(`colorVariations[${index}].barcode`, {
                  required: "Barcode is required",
                })}
              />
            </div>

            <Button
              type="button"
              variant="danger"
              onClick={() => remove(index)}
            >
              Remove Color Variation
            </Button>
          </div>
        ))}
        <div className="gap-4">
          <Button
            className="mx-6 bg-purple-900"
            type="button"
            variant="secondary"
            onClick={() => append({})}
          >
            Add Color Variation
          </Button>

          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isCreating ? "Waiting to Create" : "Create Product"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CreateProductWithColorsForm;
