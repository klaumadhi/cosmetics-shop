import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Spinner from "../../ui/Spinner";
import useCreateProduct from "../../hooks/useCreateProduct";
import useCategories from "../../hooks/useCategories";
import Button from "../../ui/Button";
import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateProductForm() {
  const [imagePreview, setImagePreview] = useState(null);
  const { register, handleSubmit, formState, reset, watch } = useForm();
  const { errors, isSubmitting } = formState;
  const { isCreating, createNewProduct } = useCreateProduct();
  const { categories } = useCategories();

  const onSubmit = async (data) => {
    try {
      createNewProduct(data, {
        onSuccess: () => {
          toast.success("Product created successfully!", {
            position: "top-center",
            autoClose: 599,
            theme: "dark",
            transition: Flip,
          });
          reset();
          setImagePreview(null);
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

  const watchImage = watch("image");

  React.useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      const file = watchImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [watchImage]);

  if (isCreating) {
    return <Spinner />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-md"
    >
      <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">
        Create New Product
      </h2>

      <div className="space-y-4">
        {/* Product Name */}
        <div>
          <label
            className="block mb-1 font-semibold text-gray-600"
            htmlFor="name"
          >
            Product Name
          </label>
          <input
            className={`w-full px-4 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Brand */}
        <div>
          <label
            className="block mb-1 font-semibold text-gray-600"
            htmlFor="brand"
          >
            Brand
          </label>
          <input
            className={`w-full px-4 py-2 border ${
              errors.brand ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
            type="text"
            id="brand"
            {...register("brand", { required: "Brand is required" })}
          />
          {errors.brand && (
            <p className="mt-1 text-sm text-red-500">{errors.brand.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label
            className="block mb-1 font-semibold text-gray-600"
            htmlFor="category_id"
          >
            Category
          </label>
          <select
            id="category_id"
            className={`w-full px-4 py-2 border ${
              errors.category_id ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
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
            <p className="mt-1 text-sm text-red-500">
              {errors.category_id.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            className="block mb-1 font-semibold text-gray-600"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className={`w-full px-4 py-2 border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
            id="description"
            rows="3"
            {...register("description", {
              required: "Description is required",
            })}
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label
            className="block mb-1 font-semibold text-gray-600"
            htmlFor="price"
          >
            Price
          </label>
          <input
            className={`w-full px-4 py-2 border ${
              errors.price ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
            type="number"
            id="price"
            {...register("price", { required: "Price is required" })}
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>

        {/* Stock Quantity */}
        <div>
          <label
            className="block mb-1 font-semibold text-gray-600"
            htmlFor="stock_quantity"
          >
            Stock Quantity
          </label>
          <input
            className={`w-full px-4 py-2 border ${
              errors.stock_quantity ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
            type="number"
            id="stock_quantity"
            {...register("stock_quantity", {
              required: "Stock quantity is required",
            })}
          />
          {errors.stock_quantity && (
            <p className="mt-1 text-sm text-red-500">
              {errors.stock_quantity.message}
            </p>
          )}
        </div>

        {/* Discount Percentage */}
        <div>
          <label
            className="block mb-1 font-semibold text-gray-600"
            htmlFor="discount_percentage"
          >
            Discount Percentage
          </label>
          <input
            className={`w-full px-4 py-2 border ${
              errors.discount_percentage ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
            type="number"
            id="discount_percentage"
            {...register("discount_percentage", {
              required: "Discount percentage is required",
            })}
          />
          {errors.discount_percentage && (
            <p className="mt-1 text-sm text-red-500">
              {errors.discount_percentage.message}
            </p>
          )}
        </div>

        {/* Barcode */}
        <div>
          <label
            className="block mb-1 font-semibold text-gray-600"
            htmlFor="barcode"
          >
            Barcode
          </label>
          <input
            className={`w-full px-4 py-2 border ${
              errors.barcode ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
            type="text"
            id="barcode"
            {...register("barcode", { required: "Barcode is required" })}
          />
          {errors.barcode && (
            <p className="mt-1 text-sm text-red-500">
              {errors.barcode.message}
            </p>
          )}
        </div>

        {/* Product Image with Preview */}
        <div>
          <label
            className="block mb-1 font-semibold text-gray-600"
            htmlFor="image"
          >
            Product Image
          </label>
          <input
            className={`w-full px-4 py-2 border ${
              errors.image ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
            type="file"
            id="image"
            {...register("image", { required: "Image is required" })}
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>
          )}
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Product Preview"
                className="object-cover w-full h-32 border border-gray-300 rounded-md"
              />
            </div>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 mt-6 font-semibold text-white transition-colors bg-purple-600 rounded-md hover:bg-purple-700"
      >
        {isSubmitting ? "Creating..." : "Create Product"}
      </Button>
    </form>
  );
}

export default CreateProductForm;
