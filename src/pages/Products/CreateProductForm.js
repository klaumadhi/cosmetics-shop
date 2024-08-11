import React from "react";
import { useForm } from "react-hook-form";
import Spinner from "../../ui/Spinner";
import useCreateProduct from "../../hooks/useCreateProduct";
import useCategories from "../../hooks/useCategories";
import useGetCategoryIdByName from "../../hooks/useGetCategoryIdByName";
import Button from "../../ui/Button";

function CreateProductForm() {
  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;
  const { isCreating, createNewProduct } = useCreateProduct();
  const { categories } = useCategories();
  const { category } = useGetCategoryIdByName();

  const onSubmit = async (data) => {
    console.log("Form Data:", data); // Add this line
    try {
      createNewProduct(data);
      // Handle successful creation (e.g., show a success message, reset form)
    } catch (error) {
      console.error("Error creating product:", error);
      // Handle error (e.g., show an error message)
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
            className="block text-gray-500 font-bold text-right mb-1 md:mb-0 pr-4"
            htmlFor="name"
          >
            Product Name
          </label>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
          />
        </div>
        <div className="flex items-center mb-6">
          <label
            className="block text-gray-500 font-bold text-right mb-1 md:mb-0 pr-4"
            htmlFor="brand"
          >
            Brand
          </label>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            id="brand"
            {...register("brand", { required: "Brand is required" })}
          />
        </div>

        <div className="flex items-center mb-6">
          <label
            className="block text-gray-500 font-bold text-right mb-1 md:mb-0 pr-4"
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
            className="block text-gray-500 font-bold text-right mb-1 md:mb-0 pr-4"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
          ></textarea>
        </div>
        <div className="flex items-center mb-6">
          <label
            className="block text-gray-500 font-bold text-right mb-1 md:mb-0 pr-4"
            htmlFor="price"
          >
            Price
          </label>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="number"
            id="price"
            {...register("price", { required: "Price is required" })}
          />
        </div>
        <div className="flex items-center mb-6">
          <label
            className="block text-gray-500 font-bold text-right mb-1 md:mb-0 pr-4"
            htmlFor="stock_quantity"
          >
            Stock Quantity
          </label>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="number"
            id="stock_quantity"
            {...register("stock_quantity", {
              required: "Stock quantity is required",
            })}
          />
        </div>
        <div className="flex items-center mb-6">
          <label
            className="block text-gray-500 font-bold text-right mb-1 md:mb-0 pr-4"
            htmlFor="discount_percentage"
          >
            Discount Percentage
          </label>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="number"
            id="discount_percentage"
            {...register("discount_percentage", {
              required: "Discount percentage is required",
            })}
          />
        </div>

        <div className="flex items-center mb-6">
          <label
            className="block text-gray-500 font-bold text-right mb-1 md:mb-0 pr-4"
            htmlFor="barcode"
          >
            Barcode
          </label>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            id="barcode"
            {...register("barcode", { required: "Barcode is required" })}
          />
        </div>

        <div className="flex items-center mb-6">
          <label
            className="block text-gray-500 font-bold text-right mb-1 md:mb-0 pr-4"
            htmlFor="image"
          >
            Product Image
          </label>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
