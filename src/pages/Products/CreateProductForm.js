import React from "react";
import { useForm } from "react-hook-form";
import Spinner from "../../ui/Spinner";
import useCreateProduct from "../../hooks/useCreateProduct";
import useCategories from "../../hooks/useCategories";

import Button from "../../ui/Button";
import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateProductForm() {
  const { register, handleSubmit, formState, reset } = useForm();
  const { isSubmitting } = formState;
  const { isCreating, createNewProduct } = useCreateProduct();
  const { categories } = useCategories();

  const onSubmit = async (data) => {
    try {
      createNewProduct(data, {
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
      // Show success message
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  if (isCreating) {
    return <Spinner />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full max-w-sm mt-5">
        <div className="flex items-center mb-6">
          <label
            className="block pr-4 mb-1 font-bold text-right text-gray-500 md:mb-0"
            htmlFor="name"
          >
            Product Name
          </label>
          <input
            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
          />
        </div>
        <div className="flex items-center mb-6">
          <label
            className="block pr-4 mb-1 font-bold text-right text-gray-500 md:mb-0"
            htmlFor="brand"
          >
            Brand
          </label>
          <input
            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            id="brand"
            {...register("brand", { required: "Brand is required" })}
          />
        </div>

        <div className="flex items-center mb-6">
          <label
            className="block pr-4 mb-1 font-bold text-right text-gray-500 md:mb-0"
            htmlFor="category_id"
          >
            Category
          </label>
          <select
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
        </div>
        <div className="flex items-center mb-6">
          <label
            className="block pr-4 mb-1 font-bold text-right text-gray-500 md:mb-0"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
          ></textarea>
        </div>
        <div className="flex items-center mb-6">
          <label
            className="block pr-4 mb-1 font-bold text-right text-gray-500 md:mb-0"
            htmlFor="price"
          >
            Price
          </label>
          <input
            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
            type="number"
            id="price"
            {...register("price", { required: "Price is required" })}
          />
        </div>
        <div className="flex items-center mb-6">
          <label
            className="block pr-4 mb-1 font-bold text-right text-gray-500 md:mb-0"
            htmlFor="stock_quantity"
          >
            Stock Quantity
          </label>
          <input
            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
            type="number"
            id="stock_quantity"
            {...register("stock_quantity", {
              required: "Stock quantity is required",
            })}
          />
        </div>
        <div className="flex items-center mb-6">
          <label
            className="block pr-4 mb-1 font-bold text-right text-gray-500 md:mb-0"
            htmlFor="discount_percentage"
          >
            Discount Percentage
          </label>
          <input
            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
            type="number"
            id="discount_percentage"
            {...register("discount_percentage", {
              required: "Discount percentage is required",
            })}
          />
        </div>

        <div className="flex items-center mb-6">
          <label
            className="block pr-4 mb-1 font-bold text-right text-gray-500 md:mb-0"
            htmlFor="barcode"
          >
            Barcode
          </label>
          <input
            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            id="barcode"
            {...register("barcode", { required: "Barcode is required" })}
          />
        </div>

        <div className="flex items-center mb-6">
          <label
            className="block pr-4 mb-1 font-bold text-right text-gray-500 md:mb-0"
            htmlFor="image"
          >
            Product Image
          </label>
          <input
            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
            type="file"
            id="image"
            {...register("image", { required: "Image is required" })}
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="m-4 ml-[200px]"
        >
          {isSubmitting ? "Creating..." : "Create Product"}
        </Button>
      </div>
    </form>
  );
}

export default CreateProductForm;
