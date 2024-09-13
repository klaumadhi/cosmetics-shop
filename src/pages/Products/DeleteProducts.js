import React, { useState } from "react";
import {
  searchProductsByName,
  deleteProductById,
} from "../../services/apiProducts";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DeleteProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle search
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

  // Handle delete
  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await deleteProductById(productId); // Assuming this function exists
      setProducts(products.filter((product) => product.id !== productId));
      toast.success("Product deleted successfully!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        theme: "dark",
        transition: Flip,
      });
    } catch (error) {
      toast.error("Error deleting product. Please try again.", {
        theme: "dark",
        transition: Flip,
      });
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl p-8 mx-auto bg-white rounded shadow-lg">
        <h1 className="text-2xl font-bold text-center text-purple-900">
          Delete Products
        </h1>

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

        {isLoading ? (
          <Spinner />
        ) : (
          <div className="space-y-4">
            {products.length === 0 ? (
              <p className="text-center text-gray-600">No products found.</p>
            ) : (
              products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
                >
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
                    className="text-white bg-red-500"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DeleteProducts;
