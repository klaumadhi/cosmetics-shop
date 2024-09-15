import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import ProductsList from "../pages/Products/ProductsList";
import ProductDetails from "../pages/Products/ProductDetails";
import CartPage from "../pages/Cart/CartPage";
import { PageNotFound } from "../pages/PageNotFound";

import Admin from "../pages/Admin/Admin";
import CreateProductForm from "../pages/Products/CreateProductForm";
import CreateProductWithSizesForm from "../pages/Products/CreateProductWithSizesForm";
import CreateProductWithColorsForm from "../pages/Products/CreateProductWithColorsForm";
import WallpaperManagementPage from "../wallpaper/WallpaperManagementPage";

import DeleteProducts from "../pages/Products/DeleteProducts";
import EditProducts from "../pages/Products/EditProducts";
import CheckoutPage from "../pages/Cart/CheckoutPage";
import OrderConfirmationPage from "../pages/Cart/OrderConfirmationPage ";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="products" element={<ProductsList />} />
        {/* Dynamic Category Route */}
        <Route path="products/:category" element={<ProductsList />} />
        <Route path="search/:searchTerm" element={<ProductsList />} />
        <Route path="product/:id" element={<ProductDetails />} />

        <Route path="cart" element={<CartPage />} />
        <Route path="cart/checkout" element={<CheckoutPage />} />
        <Route path="order-confirmation" element={<OrderConfirmationPage />} />

        <Route path="admin" element={<Admin />} />
        <Route path="admin/createProduct" element={<CreateProductForm />} />
        <Route path="admin/deleteProducts" element={<DeleteProducts />} />
        <Route path="admin/editProducts" element={<EditProducts />} />

        <Route
          path="admin/CreateProductWithSizesForm"
          element={<CreateProductWithSizesForm />}
        />
        <Route
          path="admin/CreateProductWithColorsForm"
          element={<CreateProductWithColorsForm />}
        />

        <Route path="admin/wallpaper" element={<WallpaperManagementPage />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};
