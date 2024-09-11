import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import useProducts from "../../hooks/useProducts.js";
import Spinner from "../../ui/Spinner.js";
import useGetCategoryIdByName from "../../hooks/useGetCategoryIdByName.js";
import useSearchProductsByName from "../../hooks/useSearchProductsByName.js";
import NoResultFound from "../NoResultFound.js";
import { FaHome } from "react-icons/fa"; // Import FontAwesome home icon
import Button from "../../ui/Button.js";

export default function ProductList() {
  const { category, searchTerm } = useParams(); // Retrieve URL parameters
  const [page, setPage] = useState(1); // Track the current page
  const [productsToDisplay, setProductsToDisplay] = useState([]); // Array to store products
  const [hasMoreProducts, setHasMoreProducts] = useState(true); // Track if more products are available

  // Custom hook to search products by name
  const {
    searchProducts,
    isLoading: isLoading2,
    isFetching: isFetchingSearch,
  } = useSearchProductsByName(searchTerm);

  // Custom hook to fetch category data by its name
  const {
    categoryRow,
    isLoading1,
    isFetching: isFetchingCat,
  } = useGetCategoryIdByName({
    name: category,
  });

  // Custom hook to fetch products based on the category ID
  const { products, isLoading, error, isFetching } = useProducts(
    categoryRow?.id
      ? {
          column: "category_id",
          equals: categoryRow?.id,
        }
      : "",
    16, // Limit to 10 products
    page // Use page state for pagination
  );

  // Effect to reset products when the category or search term changes
  useEffect(() => {
    setProductsToDisplay([]); // Clear displayed products when category or searchTerm changes
    setPage(1); // Reset page number to 1
    setHasMoreProducts(true); // Reset the flag to true
  }, [categoryRow, searchTerm]);

  // Effect to update productsToDisplay when new products are loaded
  useEffect(() => {
    if (!isLoading && !isLoading1 && !isLoading2 && !isFetching) {
      const newProducts = searchTerm ? searchProducts : products;

      // If less products than the limit are returned, there are no more products to load
      if (newProducts.length < 10) {
        setHasMoreProducts(false);
      }

      setProductsToDisplay((prev) => [...prev, ...newProducts]); // Append new products
    }
  }, [products, searchProducts, isLoading, isLoading1, isLoading2, isFetching]);

  // Display spinner while loading
  if (
    isLoading ||
    isLoading1 ||
    isLoading2 ||
    isFetching ||
    isFetchingCat ||
    isFetchingSearch
  ) {
    return <Spinner />;
  }

  return (
    <div className="my-5 ">
      {/* Breadcrumb Navigation */}
      <nav className="mt-4 mb-12 text-center ">
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
      {productsToDisplay.length < 1 && (
        <NoResultFound searchTerm={searchTerm} />
      )}
      {/* Grid for displaying product cards */}
      <div className="grid gap-6 mx-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {productsToDisplay.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      {/* Load More Button */}

      {hasMoreProducts && (
        <div className="mt-5 text-center">
          <Button
            onClick={() => setPage((prevPage) => prevPage + 1)}
            className="px-4 my-5 rounded-md"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
