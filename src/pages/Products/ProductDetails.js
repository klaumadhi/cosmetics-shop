import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts.js";
import Spinner from "../../ui/Spinner.js";
import useGetVariationsFromProductId from "../../hooks/useGetVariationsFromProductId.js";
import Button from "../../ui/Button.js";

export default function ProductDetails() {
  const { id } = useParams();
  const { products, isLoading, error } = useProducts({
    column: "id",
    equals: id,
  });

  const { product_variations, isLoading2, error2 } =
    useGetVariationsFromProductId(id);

  const [selectedVariation, setSelectedVariation] = useState(
    product_variations?.length > 0 ? product_variations[0] : null
  );
  const [quantity, setQuantity] = useState(1);

  // Update the selected variation when product variations change
  useEffect(() => {
    if (product_variations?.length > 0) {
      setSelectedVariation(product_variations[0]);
    }
  }, [product_variations]);

  if (isLoading || isLoading2) {
    return <Spinner />;
  }

  if (error || error2 || !products.length) {
    return <p className="text-center text-red-500">Product not found!</p>;
  }

  const product = products[0];

  // Calculate the current price based on the selected variation or product price
  const variationPrice = selectedVariation?.price || product.price;
  const currentPrice = Math.round(
    product.discount_percentage
      ? variationPrice - (variationPrice * product.discount_percentage) / 100
      : variationPrice
  );

  const handleVariationClick = (variation) => {
    setSelectedVariation(variation);
  };

  const handleQuantityChange = (increment) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + increment));
  };

  return (
    <div className="container px-4 mx-auto my-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex justify-center">
          <img
            src={selectedVariation?.variation_image || product.image}
            alt={product.name}
            className="rounded-lg shadow-lg object-cover max-h-[500px]"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            {product.name}
          </h1>
          <p className="mb-2 text-lg text-gray-500">{product.brand}</p>

          {/* Render Variations Section Conditionally */}
          {product_variations?.length > 0 && (
            <div className="mb-4">
              {product_variations[0]?.type === "size" && (
                <>
                  <p className="font-semibold text-gray-700 text-md">
                    Select Size:
                  </p>
                  <div className="flex gap-2 mt-2">
                    {product_variations.map((variation) => (
                      <button
                        key={variation.id}
                        onClick={() => handleVariationClick(variation)}
                        className={`px-4 py-2 border rounded-md text-sm font-medium ${
                          selectedVariation?.id === variation.id
                            ? "bg-pink-600 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {variation.value}ml
                      </button>
                    ))}
                  </div>
                </>
              )}

              {product_variations[0]?.type === "color" && (
                <div>
                  <div className="flex gap-4 my-5">
                    <p className="my-auto font-semibold text-gray-700 text-md">
                      Ngjyra:
                    </p>
                    <div className="flex inline gap-2 my-auto">
                      {product_variations.map((variation) => (
                        <button
                          key={variation.id}
                          onClick={() => handleVariationClick(variation)}
                          className={`w-8 h-8 rounded-full border-1 ${
                            selectedVariation?.id === variation.id
                              ? "border-gray-500 outline-dashed"
                              : "border-gray-300"
                          }`}
                          style={{
                            backgroundImage: `url(${variation.color_image})`,
                            backgroundSize: "cover",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="font-semibold text-gray-700 text-md">
                    Nuanca: {"    "}
                    <span className="font-bold uppercase">
                      {selectedVariation?.color_name}
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Price and Discount Section */}
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
                  {variationPrice} Leke
                </span>
              </>
            )}
          </div>

          {/* Barcode Display */}
          <div className="flex mb-4">
            <p className="my-auto font-semibold text-gray-700 text-md">
              Barcode: {"  "}
            </p>
            <p className="text-lg text-gray-800">
              {selectedVariation?.barcode || product.barcode}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="px-3 py-2 bg-gray-200 rounded-md"
            >
              -
            </button>
            <span className="px-4 text-xl">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="px-3 py-2 bg-gray-200 rounded-md"
            >
              +
            </button>
          </div>

          <p className="leading-relaxed text-gray-700 text-md">
            {product.description}
          </p>
          <Button>Add {quantity} to Cart</Button>
        </div>
      </div>
    </div>
  );
}
