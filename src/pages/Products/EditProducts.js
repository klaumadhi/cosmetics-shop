import React, { useState } from "react";
import { getVariationsFromProductId } from "../../services/apiProductVariations";
import {
  searchProductsByName,
  updateProduct,
} from "../../services/apiProducts";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [productVariations, setProductVariations] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [productImagePreview, setProductImagePreview] = useState(null);
  const [variationImagePreviews, setVariationImagePreviews] = useState([]);
  const [colorImagePreviews, setColorImagePreviews] = useState([]);

  // Search products by name or brand
  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await searchProductsByName(searchTerm);
      setProducts(result);
    } catch (error) {
      toast.error("Error fetching products. Try again.", {
        theme: "dark",
        transition: Flip,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load product details when clicking "Edit"
  const handleEdit = async (product) => {
    if (selectedProduct && selectedProduct.id === product.id) {
      // If clicked again on the same product, close the form
      setSelectedProduct(null);
      return;
    }

    setSelectedProduct(product);
    setProductImagePreview(product.image);
    try {
      const variations = await getVariationsFromProductId(product.id);
      setProductVariations(variations);
      setVariationImagePreviews(variations.map((v) => v.variation_image));
      setColorImagePreviews(variations.map((v) => v.color_image));
    } catch (error) {
      toast.error("Error loading product variations.", {
        theme: "dark",
        transition: Flip,
      });
    }
  };

  // Handle form submission for editing the product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateProduct(
        selectedProduct.id,
        selectedProduct,
        productVariations
      );
      toast.success("Product updated successfully!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        theme: "dark",
        transition: Flip,
      });

      // Update the product in the products array
      const updatedProducts = products.map((product) =>
        product.id === selectedProduct.id ? { ...selectedProduct } : product
      );
      setProducts(updatedProducts);

      setSelectedProduct(null);
      setProductVariations([]);
      setProductImagePreview(null);
      setVariationImagePreviews([]);
      setColorImagePreviews([]);
    } catch (error) {
      toast.error("Error updating product. Try again.", {
        theme: "dark",
        transition: Flip,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle new product image selection
  const handleProductImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImagePreview(URL.createObjectURL(file));
      setSelectedProduct({
        ...selectedProduct,
        image: file,
      });
    }
  };

  // Handle new variation image selection
  const handleVariationImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedVariations = [...productVariations];
      updatedVariations[index].variation_image = file;

      const updatedPreviews = [...variationImagePreviews];
      updatedPreviews[index] = URL.createObjectURL(file);

      setProductVariations(updatedVariations);
      setVariationImagePreviews(updatedPreviews);
    }
  };

  // Handle color image selection for variations
  const handleColorImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedVariations = [...productVariations];
      updatedVariations[index].color_image = file;

      const updatedColorImagePreviews = [...colorImagePreviews];
      updatedColorImagePreviews[index] = URL.createObjectURL(file);

      setProductVariations(updatedVariations);
      setColorImagePreviews(updatedColorImagePreviews);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl p-8 mx-auto bg-white rounded shadow-lg">
        <h1 className="text-2xl font-bold text-center text-purple-900">
          Edit Products
        </h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex my-6 space-x-4">
          <input
            type="text"
            className="w-full px-4 py-2 border-2 rounded focus:outline-none"
            placeholder="Search product by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" className="text-white bg-purple-900">
            Search
          </Button>
        </form>

        {/* Loading Spinner */}
        {isLoading && <Spinner />}

        {/* List of Products */}
        {products.length > 0 && (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col p-4 border rounded-lg bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-16 h-16 rounded"
                    />
                    <div>
                      <p className="font-bold text-gray-700">
                        {product.name}{" "}
                        <span className="text-sm">({product.brand})</span>
                      </p>
                    </div>
                  </div>
                  <Button
                    className={`text-white ${
                      selectedProduct && selectedProduct.id === product.id
                        ? "bg-red-500"
                        : "bg-blue-500"
                    }`}
                    onClick={() => handleEdit(product)}
                  >
                    {selectedProduct && selectedProduct.id === product.id
                      ? "Close"
                      : "Edit"}
                  </Button>
                </div>

                {/* Edit Product Form */}
                {selectedProduct && selectedProduct.id === product.id && (
                  <form onSubmit={handleSubmit} className="my-6 space-y-4">
                    <h2 className="text-xl font-bold">Edit Product</h2>

                    {/* Product Name */}
                    <div>
                      <label className="block font-bold text-gray-700">
                        Product Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded focus:outline-none"
                        value={selectedProduct.name}
                        onChange={(e) =>
                          setSelectedProduct({
                            ...selectedProduct,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Brand */}
                    <div>
                      <label className="block font-bold text-gray-700">
                        Brand
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded focus:outline-none"
                        value={selectedProduct.brand}
                        onChange={(e) =>
                          setSelectedProduct({
                            ...selectedProduct,
                            brand: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block font-bold text-gray-700">
                        Description
                      </label>
                      <textarea
                        className="w-full px-4 py-2 border rounded focus:outline-none"
                        value={selectedProduct.description}
                        onChange={(e) =>
                          setSelectedProduct({
                            ...selectedProduct,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block font-bold text-gray-700">
                        Price
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 border rounded focus:outline-none"
                        value={selectedProduct.price}
                        onChange={(e) =>
                          setSelectedProduct({
                            ...selectedProduct,
                            price: parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>

                    {/* Stock Quantity */}
                    <div>
                      <label className="block font-bold text-gray-700">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 border rounded focus:outline-none"
                        value={selectedProduct.stock_quantity}
                        onChange={(e) =>
                          setSelectedProduct({
                            ...selectedProduct,
                            stock_quantity: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>

                    {/* Discount Percentage */}
                    <div>
                      <label className="block font-bold text-gray-700">
                        Discount Percentage
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 border rounded focus:outline-none"
                        value={selectedProduct.discount_percentage}
                        onChange={(e) =>
                          setSelectedProduct({
                            ...selectedProduct,
                            discount_percentage: parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>

                    {/* Product Image */}
                    <div>
                      <label className="block font-bold text-gray-700">
                        Product Image
                      </label>
                      {productImagePreview && (
                        <img
                          src={productImagePreview}
                          alt="Product Preview"
                          className="object-cover w-32 h-32 my-2 rounded"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full px-4 py-2 border rounded focus:outline-none"
                        onChange={handleProductImageChange}
                      />
                    </div>

                    {/* Variations */}
                    {productVariations.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold">
                          Product Variations
                        </h3>
                        {productVariations.map((variation, index) => (
                          <div
                            key={variation.id}
                            className="p-4 my-2 border rounded"
                          >
                            <label className="block font-bold text-gray-700">
                              Value (ml)
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-2 border rounded focus:outline-none"
                              value={variation.value}
                              onChange={(e) => {
                                const updatedVariations = [
                                  ...productVariations,
                                ];
                                updatedVariations[index].value = e.target.value;
                                setProductVariations(updatedVariations);
                              }}
                            />

                            <label className="block font-bold text-gray-700">
                              Barcode
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-2 border rounded focus:outline-none"
                              value={variation.barcode}
                              onChange={(e) => {
                                const updatedVariations = [
                                  ...productVariations,
                                ];
                                updatedVariations[index].barcode =
                                  e.target.value;
                                setProductVariations(updatedVariations);
                              }}
                            />

                            <label className="block font-bold text-gray-700">
                              Price
                            </label>
                            <input
                              type="number"
                              className="w-full px-4 py-2 border rounded focus:outline-none"
                              value={variation.price}
                              onChange={(e) => {
                                const updatedVariations = [
                                  ...productVariations,
                                ];
                                updatedVariations[index].price = parseFloat(
                                  e.target.value
                                );
                                setProductVariations(updatedVariations);
                              }}
                            />

                            <label className="block font-bold text-gray-700">
                              Stock Quantity
                            </label>
                            <input
                              type="number"
                              className="w-full px-4 py-2 border rounded focus:outline-none"
                              value={variation.stock_quantity}
                              onChange={(e) => {
                                const updatedVariations = [
                                  ...productVariations,
                                ];
                                updatedVariations[index].stock_quantity =
                                  parseInt(e.target.value);
                                setProductVariations(updatedVariations);
                              }}
                            />

                            {/* Variation Image */}
                            <label className="block font-bold text-gray-700">
                              Variation Image
                            </label>
                            {variationImagePreviews[index] && (
                              <img
                                src={variationImagePreviews[index]}
                                alt="Variation Preview"
                                className="object-cover w-24 h-24 my-2 rounded"
                              />
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              className="w-full px-4 py-2 border rounded focus:outline-none"
                              onChange={(e) =>
                                handleVariationImageChange(e, index)
                              }
                            />

                            {/* Conditionally render Color Image input if the type is "color" */}
                            {variation.type === "color" && (
                              <>
                                <label className="block font-bold text-gray-700">
                                  Color Image
                                </label>
                                {colorImagePreviews[index] && (
                                  <img
                                    src={colorImagePreviews[index]}
                                    alt="Color Variation Preview"
                                    className="object-cover w-24 h-24 my-2 rounded"
                                  />
                                )}
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="w-full px-4 py-2 border rounded focus:outline-none"
                                  onChange={(e) =>
                                    handleColorImageChange(e, index)
                                  }
                                />
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full text-white bg-purple-900"
                      disabled={isUpdating}
                    >
                      {isUpdating ? "Updating..." : "Update Product"}
                    </Button>
                  </form>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EditProducts;
