import React from "react";
import ProductCard from "./ProductCard";
import useProducts from "../../hooks/useProducts.js";
import Spinner from "../../ui/Spinner.js";
import { useParams } from "react-router-dom";
import { getCategoryIdByName } from "../../services/apiCategories.js";
import useGetCategoryIdByName from "../../hooks/useGetCategoryIdByName.js";
import useSearchProductsByName from "../../hooks/useSearchProductsByName.js";
import NoResultFound from "../NoResultFound.js";

export default function ProductList() {
  const { category } = useParams();
  const { searchTerm } = useParams();

  const {
    searchProducts,
    isLoading: isLoading2,
    error: error2,
  } = useSearchProductsByName(searchTerm);

  console.log("useParams :", category);
  const { categoryId, isLoading1, error1 } = useGetCategoryIdByName({
    name: category, // Ensure you pass the correct name from useParams
  });

  const { products, isLoading, error } = useProducts(
    categoryId
      ? {
          column: "category_id",
          equals: categoryId, // Use the fetched category ID
        }
      : ""
  );

  const productsToDisplay = searchTerm ? searchProducts : products;

  // console.log(products);
  if (isLoading || isLoading1 || isLoading2) {
    return <Spinner />;
  }

  return (
    <div className="my-5">
      <h3 className="mb-5 text-xl font-semibold text-center text-slate-800 ">
        {searchTerm
          ? `Search for: "${searchTerm}"`
          : category
          ? `Category of:${category}`
          : "All Products"}
      </h3>
      {productsToDisplay.length < 1 && (
        <NoResultFound searchTerm={searchTerm} />
      )}
      <div className="grid gap-6 mx-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {productsToDisplay?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
