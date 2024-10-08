import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts.js";
import Spinner from "../../ui/Spinner.js";
import useGetVariationsFromProductId from "../../hooks/useGetVariationsFromProductId.js";
import Button from "../../ui/Button.js";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cartSlice.js";
import Popup from "../../ui/Popup.js";
import { formatNumber } from "../../utilis/helpers.js";
import { Link } from "react-router-dom";
import useSearchProductsByName from "../../hooks/useSearchProductsByName.js";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../Products/ProductCard";
import useGetCategoryById from "../../hooks/useGetCategoryById.js";
import { FaHome } from "react-icons/fa";
import useGetProductsByCategoryId from "../../hooks/useGetProductsByCategoryId.js";

export default function ProductDetails() {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const dispatch = useDispatch();
  const { id } = useParams();
  const { products, isLoading, error } = useProducts({
    column: "id",
    equals: id,
  });

  const product = products?.length > 0 ? products[0] : null;
  // Fetch similar products based on the product's brand
  const { categoryRow, isLoadingCategory, errorCategory } = useGetCategoryById({
    id: product?.category_id,
  });
  const {
    searchProducts: brandProducts,
    isLoadingSimilar,
    errorSimilar,
  } = useSearchProductsByName(product?.brand);

  const {
    products: categoryProducts,
    isLoadingC,
    errorC,
    isFetching,
  } = useGetProductsByCategoryId(product?.category_id);

  // console.log(brandProducts, categoryProducts);

  const similarProducts =
    brandProducts?.length < 1 ? brandProducts : categoryProducts;

  // console.log(similarProducts);

  const { product_variations, isLoading2, error2, isFetching2 } =
    useGetVariationsFromProductId(id);

  const [selectedVariation, setSelectedVariation] = useState(
    product_variations?.length > 0 ? product_variations[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (product_variations?.length > 0) {
      setSelectedVariation(product_variations[0]); // Set the first variation by default
    } else {
      setSelectedVariation(null); // Reset variation if no variations exist
    }
    setQuantity(1); // Reset quantity to 1 when product changes
    setShowFullDescription(false); // Reset description visibility
    if (product_variations && product_variations.length > 0) {
      product_variations.forEach((variation) => {
        const img = new Image();
        img.src = variation.variation_image;
      });
    }
  }, [product, product_variations, id]);

  if (
    isLoading ||
    isLoading2 ||
    isLoadingCategory ||
    isLoadingSimilar ||
    isFetching ||
    isFetching2
  ) {
    return <Spinner />;
  }

  // console.log(products);

  if (error || error2 || !products.length) {
    return <p className="text-center text-red-500">Product not found!</p>;
  }

  // Calculate the current price based on the selected variation or product price
  const variationPrice = selectedVariation?.price || product.price;
  const currentPrice = Math.round(
    product.discount_percentage
      ? variationPrice - (variationPrice * product.discount_percentage) / 100
      : variationPrice
  );

  const handleVariationClick = (variation) => {
    setSelectedVariation(variation);
    setIsImageLoading(true); // Show spinner when a new variation is selected
  };

  const handleImageLoad = () => {
    setIsImageLoading(false); // Hide spinner once image is loaded
  };

  const handleQuantityChange = (increment) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + increment));
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const descriptionToShow = showFullDescription
    ? product.description
    : truncateText(product.description, 40);

  const handleAddToCart = () => {
    const item = {
      id: selectedVariation?.id || product.id,
      name: product.name,
      price: currentPrice,
      quantity,
      variation: selectedVariation,
      image: product.image,
      barcode: selectedVariation ? null : product.barcode,
    };

    dispatch(addItemToCart(item));
    setShowPopup(true);
  };

  const isOutOfStock =
    selectedVariation?.stock_quantity === 0 || product.stock_quantity === 0;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Show 5 products at a time
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <>
      <div className="container px-1 mx-auto mt-5">
        {/* Breadcrumb Navigation */}
        <nav className="justify-center mb-10 text-left ">
          <Link
            to="/"
            className="inline-flex items-center align-middle sm: text-slate-800 hover:underline"
          >
            <FaHome className="mr-1 text-pink-700 " /> {/* Home icon */}
            Home
          </Link>
          <Link to="/products">
            <span className="mx-2 mb-2 ">{"»"}</span>
            <span className="align-middle text-slate-700">Products</span>
          </Link>
          <Link to={`/products/${categoryRow?.name}`}>
            <span className="mx-2 mb-2 ">{"»"}</span>
            <span className="text-gray-700 align-middle">
              {categoryRow?.description}
            </span>
          </Link>

          <span className="mx-2 mb-2 ">{"»"}</span>
          <div>
            <span className="overflow-scroll align-middle sm:text-2xl text-slate-500">
              {product.name}
            </span>
          </div>
        </nav>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex justify-center">
            {isImageLoading && <Spinner />}{" "}
            {/* Show spinner while image loads */}
            <img
              src={selectedVariation?.variation_image || product.image}
              alt={product.name}
              className={`rounded-lg shadow-lg object-cover max-h-[500px] ${
                isImageLoading ? "hidden" : "block"
              }`}
              onLoad={handleImageLoad}
            />
          </div>
          <div className="flex flex-col justify-center">
            <Link
              to={`/search/${product.brand}`}
              className="mb-2 text-lg text-gray-500"
            >
              {product.brand}
            </Link>
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Render Variations Section Conditionally */}
            {product_variations?.length > 0 && (
              <div className="mb-4">
                {product_variations[0]?.type === "size" && (
                  <>
                    <p className="font-semibold text-gray-700 text-md">
                      Select Size:
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
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
                        Color:
                      </p>
                      <div className="flex inline gap-2 my-auto">
                        {product_variations?.map((variation) => (
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
                      Color Name: {"    "}
                      <span className="font-bold uppercase">
                        {selectedVariation?.value}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Price and Discount Section */}
            <div className="flex items-center mb-6">
              <span className="text-2xl font-semibold text-gray-800">
                Lek {formatNumber(currentPrice)}
              </span>
              {product.discount_percentage > 0 && (
                <>
                  <span className="ml-4 text-lg font-medium text-red-600">
                    {product.discount_percentage}% OFF
                  </span>
                  <span className="ml-4 text-lg text-gray-500 line-through">
                    {formatNumber(variationPrice)} Leke
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
            <div className="flex items-center gap-10 mb-6">
              <div className="flex items-center">
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
              <Button
                className={`${
                  isOutOfStock ? "bg-gray-400 hover:bg-gray-400" : ""
                }`}
                onClick={handleAddToCart}
                disabled={isOutOfStock}
              >
                {isOutOfStock ? "Out of Stock" : `Add ${quantity} to Cart`}
              </Button>
            </div>

            {/* Description Section */}
            <h2 className="my-6 text-xl font-bold text-center font-sans text-gray-900 underline underline-offset-[3px] decoration-1">
              Description
            </h2>
            <p className="leading-relaxed text-gray-700 text-md">
              {descriptionToShow}
            </p>
            {product.description.split(" ").length > 40 && (
              <button
                onClick={toggleDescription}
                className="flex mt-2 font-semibold text-pink-600"
              >
                {showFullDescription ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        </div>

        {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      </div>
      <div className="my-10">
        <h2 className="mb-6 font-sans text-xl font-bold text-center text-gray-900">
          Similar Products
        </h2>
        <div className="container mx-auto overflow-hidden">
          {/* {console.log("Rendered similarProducts:", similarProducts)}{" "} */}
          {/* Debugging Log */}
          {similarProducts?.length > 1 ? (
            <Slider {...settings}>
              {similarProducts.map((product) => (
                <div key={product.id} className="p-2">
                  <ProductCard product={product} newProduct={false} />
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-center">No similar products found.</p>
          )}
        </div>
      </div>
    </>
  );
}
