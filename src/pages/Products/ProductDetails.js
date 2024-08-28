import React from "react";
import { useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts.js";
import Spinner from "../../ui/Spinner.js";

export default function ProductDetails() {
  const { id } = useParams();
  const { products, isLoading, error } = useProducts({
    column: "id",
    equals: id,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !products.length) {
    return <p className="text-center text-red-500">Product not found!</p>;
  }

  const product = products[0];

  // Calculate the current price based on the discount
  const currentPrice = Math.round(
    product.discount_percentage
      ? product.price - (product.price * product.discount_percentage) / 100
      : product.price
  );

  return (
    <div className="container px-4 mx-auto my-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-lg shadow-lg object-cover max-h-[500px]"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            {product.name}
          </h1>
          <p className="mb-2 text-lg text-gray-500">{product.brand}</p>

          <div className="flex items-center mb-6">
            <span className="text-2xl font-semibold text-gray-800">
              {currentPrice} Leke
            </span>
            {product.discount_percentage > 0 && (
              <>
                <span className="ml-4 text-lg font-medium text-red-600">
                  {product.discount_percentage}% OFF
                </span>
                <span className="ml-4 text-lg text-gray-500 line-through">
                  {product.price} Leke
                </span>
              </>
            )}
          </div>

          <p className="leading-relaxed text-gray-700 text-md">
            {product.description}
          </p>
          <button className="px-6 py-3 mt-6 text-white transition duration-300 ease-in-out bg-blue-600 rounded-md shadow-md hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
