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
import OrderConfirmationPage from "../pages/Cart/OrderConfirmationPage";

import LoginPage from "../pages/Admin/LoginPage";
import ProtectedRoute from "../pages/Admin/ProtectedRoute";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="products" element={<ProductsList />} />
      <Route path="products/:category" element={<ProductsList />} />
      <Route path="search/:searchTerm" element={<ProductsList />} />
      <Route path="product/:id" element={<ProductDetails />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="cart/checkout" element={<CheckoutPage />} />
      <Route path="order-confirmation" element={<OrderConfirmationPage />} />
      <Route path="login" element={<LoginPage />} /> {/* Add login route */}
      {/* Protected Admin Routes */}
      <Route path="admin" element={<ProtectedRoute element={<Admin />} />} />
      <Route
        path="admin/createProduct"
        element={<ProtectedRoute element={<CreateProductForm />} />}
      />
      <Route
        path="admin/deleteProducts"
        element={<ProtectedRoute element={<DeleteProducts />} />}
      />
      <Route
        path="admin/editProducts"
        element={<ProtectedRoute element={<EditProducts />} />}
      />
      <Route
        path="admin/CreateProductWithSizesForm"
        element={<ProtectedRoute element={<CreateProductWithSizesForm />} />}
      />
      <Route
        path="admin/CreateProductWithColorsForm"
        element={<ProtectedRoute element={<CreateProductWithColorsForm />} />}
      />
      <Route
        path="admin/wallpaper"
        element={<ProtectedRoute element={<WallpaperManagementPage />} />}
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
