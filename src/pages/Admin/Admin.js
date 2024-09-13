import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

export default function Admin() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-lg p-10 bg-white rounded-md shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Admin Panel
        </h1>
        <p className="mb-8 text-center text-gray-600">
          Manage your products and settings with ease
        </p>

        <div className="space-y-6">
          <Button className="w-full" onClick={() => navigate("createProduct")}>
            Create Simple Product
          </Button>
          <Button
            className="w-full"
            onClick={() => navigate("CreateProductWithSizesForm")}
          >
            Create Products with Different Sizes
          </Button>
          <Button
            className="w-full"
            onClick={() => navigate("CreateProductWithColorsForm")}
          >
            Create Products with Different Colors
          </Button>
          <Button className="w-full" onClick={() => navigate("editProducts")}>
            Edit Products
          </Button>
          <Button className="w-full" onClick={() => navigate("deleteProducts")}>
            Delete Products
          </Button>
          <Button className="w-full" onClick={() => navigate("wallpaper")}>
            Manage Wallpaper
          </Button>
        </div>
      </div>
    </div>
  );
}
