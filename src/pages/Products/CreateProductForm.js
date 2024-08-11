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
      <div>
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Name is required" })}
        />
      </div>
      <div>
        <label htmlFor="brand">Brand</label>
        <input
          type="text"
          id="brand"
          {...register("brand", { required: "Brand is required" })}
        />
      </div>

      <div>
        <label htmlFor="category_id">Category</label>
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
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          {...register("description", { required: "Description is required" })}
        ></textarea>
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          {...register("price", { required: "Price is required" })}
        />
      </div>
      <div>
        <label htmlFor="stock_quantity">Stock Quantity</label>
        <input
          type="number"
          id="stock_quantity"
          {...register("stock_quantity", {
            required: "Stock quantity is required",
          })}
        />
      </div>
      <div>
        <label htmlFor="discount_percentage">Discount Percentage</label>
        <input
          type="number"
          id="discount_percentage"
          {...register("discount_percentage", {
            required: "Discount percentage is required",
          })}
        />
      </div>

      <div>
        <label htmlFor="barcode">Barcode</label>
        <input
          type="text"
          id="barcode"
          {...register("barcode", { required: "Barcode is required" })}
        />
      </div>

      <div>
        <label htmlFor="image">Product Image</label>
        <input
          type="file"
          id="image"
          {...register("image", { required: "Image is required" })}
        />
      </div>
      <Button type="submit" disabled={isSubmitting} className="mt-4">
        {isSubmitting ? "Creating..." : "Create Product"}
      </Button>
    </form>
  );
}

export default CreateProductForm;
