import React from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import useProducts from "../../hooks/useProducts.js";
import Spinner from "../../ui/Spinner.js";
import useGetCategoryIdByName from "../../hooks/useGetCategoryIdByName.js";
import useSearchProductsByName from "../../hooks/useSearchProductsByName.js";
import NoResultFound from "../NoResultFound.js";
import { FaHome } from "react-icons/fa"; // Import FontAwesome home icon

export default function ProductList() {
  const { category, searchTerm } = useParams(); // Retrieve URL parameters

  // Custom hook to search products by name
  const {
    searchProducts,
    isLoading: isLoading2,
    error: error2,
  } = useSearchProductsByName(searchTerm);

  // Custom hook to fetch category data by its name
  const { categoryRow, isLoading1, error1 } = useGetCategoryIdByName({
    name: category,
  });

  // Custom hook to fetch products based on the category ID
  const { products, isLoading, error, isFetching } = useProducts(
    categoryRow?.id
      ? {
          column: "category_id",
          equals: categoryRow?.id,
        }
      : ""
  );

  // Determine the products to display: filtered by search term or by category
  const productsToDisplay = searchTerm ? searchProducts : products;

  // Log the fetched products for debugging
  console.log(products);

  // Display spinner while data is loading .... isFetching is a must here so we dont see for a slight
  // of the second the old products then the spinner and then the new products
  if (isLoading || isLoading1 || isLoading2 || isFetching) {
    return <Spinner />;
  }

  return (
    <div className="my-5 ">
      {/* Breadcrumb Navigation */}
      <nav className="mt-4 mb-12 text-center ">
        {/* Home icon with link to home */}
        <Link
          to="/"
          className="inline-flex items-center align-middle text-slate-800 hover:underline"
        >
          <FaHome className="mr-1 text-pink-700" /> {/* Home icon */}
          Home
        </Link>
        <Link to="/products">
          <span className="mx-2 mb-2 ">{"»"}</span>
          <span className="align-middle text-slate-700">Products</span>
        </Link>
        {/* Conditional rendering of category or search term in breadcrumb */}
        {categoryRow?.description && (
          <>
            <span className="mx-2 mb-2 ">{"»"}</span>
            <span className="text-gray-500 align-middle">
              {categoryRow.description}
            </span>
          </>
        )}
        {searchTerm && (
          <>
            <span className="mx-2">{"»"}</span>
            <span className="text-gray-500 align-middle">{`Search for "${searchTerm}"`}</span>
          </>
        )}
      </nav>

      {/* Display "No Result Found" message if there are no products */}
      {productsToDisplay?.length < 1 && (
        <NoResultFound searchTerm={searchTerm} />
      )}

      {/* Grid for displaying product cards */}
      <div className="grid gap-6 mx-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {productsToDisplay?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
