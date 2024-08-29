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
  const { isSubmitting } = formState;
  const { isCreating, createNewProductWithSizes } =
    useCreateProductWithDifferentSize();
  const { categories } = useCategories();

  const onSubmit = async (data) => {
    if (!data.image || data.image.length === 0) {
      console.error("No product image selected");
      return;
    }

    if (
      data.variations.some(
        (variation) =>
          !variation.variation_image || variation.variation_image.length === 0
      )
    ) {
      console.error("Some variation images are not selected");
      return;
    }

    console.log("Form Data:", data);
    try {
      await createNewProductWithSizes(data, {
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

  if (isCreating) {
    return <Spinner />;
  }

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
            {...register("discount_percentage", {
              required: "Discount Percentage is required",
            })}
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
            {...register("image", { required: "Product Image is required" })}
            accept="image/*"
          />
        </div>

        {/* Variations Section */}
        <div className="mb-4">
          <h3 className="mb-2 text-xl font-bold text-gray-700">Variations</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 mb-2 border rounded-md">
              <div className="flex items-center mb-4">
                <label
                  className="block pr-4 font-bold text-gray-500"
                  htmlFor={`variations[${index}].value`}
                >
                  Value (ml)
                </label>
                <input
                  className="w-full px-4 py-2 bg-gray-200 border-2 rounded"
                  type="number"
                  {...register(`variations[${index}].value`, {
                    required: "Value is required",
                  })}
                />
              </div>

              <div className="flex items-center mb-4">
                <label
                  className="block pr-4 font-bold text-gray-500"
                  htmlFor={`variations[${index}].price`}
                >
                  Price
                </label>
                <input
                  className="w-full px-4 py-2 bg-gray-200 border-2 rounded"
                  type="number"
                  {...register(`variations[${index}].price`, {
                    required: "Price is required",
                  })}
                />
              </div>

              <div className="flex items-center mb-4">
                <label
                  className="block pr-4 font-bold text-gray-500"
                  htmlFor={`variations[${index}].barcode`}
                >
                  Barcode
                </label>
                <input
                  className="w-full px-4 py-2 bg-gray-200 border-2 rounded"
                  type="text"
                  {...register(`variations[${index}].barcode`, {
                    required: "Barcode is required",
                  })}
                />
              </div>

              <div className="flex items-center mb-4">
                <label
                  className="block pr-4 font-bold text-gray-500"
                  htmlFor={`variations[${index}].variation_image`}
                >
                  Variation Image
                </label>
                <input
                  className="w-full px-4 py-2 bg-gray-200 border-2 rounded"
                  type="file"
                  {...register(`variations[${index}].variation_image`, {
                    required: "Variation Image is required",
                  })}
                  accept="image/*"
                />
              </div>

              <Button
                type="button"
                onClick={() => remove(index)}
                className="text-white bg-red-500"
              >
                Remove Variation
              </Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={() =>
              append({ value: "", price: "", barcode: "", variation_image: "" })
            }
            className="text-white bg-blue-500"
          >
            Add Variation
          </Button>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="text-white bg-purple-500"
        >
          {isSubmitting ? "Creating..." : "Create Product"}
        </Button>
      </div>
    </form>
  );
}

export default CreateProductWithSizesForm;
