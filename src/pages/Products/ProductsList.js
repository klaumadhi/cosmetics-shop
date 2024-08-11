import React from "react";
import ProductCard from "./ProductCard";
import useProducts from "../../hooks/useProducts.js";
import Spinner from "../../ui/Spinner.js";
import { useParams } from "react-router-dom";
import { getCategoryIdByName } from "../../services/apiCategories.js";
import useGetCategoryIdByName from "../../hooks/useGetCategoryIdByName.js";

export default function ProductList() {
  const { category } = useParams();

  console.log("useParams :", category);
  const { categoryId, isLoading1, error1 } = useGetCategoryIdByName({
    name: category, // Ensure you pass the correct name from useParams
  });

  console.log("Category id from name:", categoryId);

  const { products, isLoading, error } = useProducts(
    categoryId
      ? {
          column: "category_id",
          equals: categoryId, // Use the fetched category ID
        }
      : ""
  );

  // console.log(products);
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="my-5">
      <h1 className="text-center text-4xl font-bold mb-5">
        {category ? category : "All Products"}
      </h1>
      <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6  mx-4">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
