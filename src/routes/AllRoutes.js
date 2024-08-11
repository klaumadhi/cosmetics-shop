import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import ProductsList from "../pages/Products/ProductsList";
import ProductDetails from "../pages/Products/ProductDetails";
import CartPage from "../pages/Cart/CartPage";
import { PageNotFound } from "../pages/PageNotFound";
import CategoryProducts from "../pages/Products/CategoryProducts";
import Admin from "../pages/Admin/Admin";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="products" element={<ProductsList />} />
        {/* Dynamic Category Route */}
        <Route path="products/:category" element={<CategoryProducts />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="admin" element={<Admin />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};
