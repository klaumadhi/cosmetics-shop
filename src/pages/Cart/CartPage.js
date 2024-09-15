import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart, clearCart } from "../../store/cartSlice";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import EmptyCart from "../../assets/images/empty-cart.png";
import useProducts from "../../hooks/useProducts";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../Products/ProductCard";

export default function CartPage() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const subtotal = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const { products } = useProducts({}, 6);

  const transportFee = 200;
  const totalAmount = subtotal > 1500 ? subtotal : subtotal + transportFee;

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="container max-w-3xl px-6 py-10 mx-auto bg-white rounded-lg shadow-md">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Your Cart</h1>
      {cartItems?.length === 0 ? (
        <div className="text-center">
          <img
            src={EmptyCart}
            alt="Empty Cart"
            className="w-40 h-40 mx-auto mb-6"
          />
          <p className="mb-4 text-lg font-semibold text-gray-700">
            Your cart is empty
          </p>
          <p className="mb-8 text-gray-500">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button onClick={() => navigate("/products")}>
            Continue Shopping
          </Button>
          <div className="mt-10">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              Newest Products
            </h2>
            <div className="container mx-auto overflow-hidden">
              {products?.length > 0 ? (
                <Slider {...settings}>
                  {products?.map((product) => (
                    <div key={product.id} className="p-2">
                      <ProductCard product={product} newProduct={true} />
                    </div>
                  ))}
                </Slider>
              ) : (
                <p className="text-center">No products found.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <ul className="space-y-6">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item?.variation?.variation_image || item.image}
                    alt={item.name}
                    className="object-cover w-20 h-20 rounded-md"
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-gray-600">
                      {item.quantity} x {item.price} Leke
                    </p>
                    {item.variation && (
                      <p className="text-sm text-gray-500">
                        {item.variation.type}: {item.variation.value}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  className="ml-4 text-red-500 hover:text-red-700"
                  onClick={() => dispatch(removeItemFromCart(item.id))}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>

          {/* Subtotal and Transport Fee Section */}
          <div className="pt-6 mt-8 border-t ">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-gray-800">Subtotal:</p>
              <p className="text-lg font-semibold text-gray-700">
                {subtotal} Leke
              </p>
            </div>

            <div className="flex items-center justify-between mt-2">
              <p className="text-lg font-bold text-gray-800">Transport Fee:</p>
              <p className="text-lg font-semibold text-gray-700">
                {subtotal > 1500 ? "Free" : `${transportFee} Leke`}
              </p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <p className="text-xl font-bold text-gray-800">Total:</p>
              <p className="text-xl font-bold text-gray-800">
                {totalAmount} Leke
              </p>
            </div>

            <div className="flex justify-between">
              <Button
                className="mt-5 text-white bg-red-500 hover:bg-red-600"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </Button>

              {/* Checkout Button */}
              <Button
                className="inset-y-0 right-0 mt-5 ml-4 text-white bg-green-500 hover:bg-green-600"
                onClick={() => navigate("checkout")}
              >
                Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
