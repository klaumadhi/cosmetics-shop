import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart, clearCart } from "../../store/cartSlice";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import EmptyCart from "../../assets/images/empty-cart.png";

export default function CartPage() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  return (
    <div className="container max-w-3xl px-6 py-10 mx-auto bg-white rounded-lg shadow-md">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <img
            src={EmptyCart} // Add an appropriate image path
            alt="Empty Cart"
            className="w-40 h-40 mx-auto mb-6"
          />
          <p className="mb-4 text-lg font-semibold text-gray-700">
            Your cart is empty
          </p>
          <p className="mb-8 text-gray-500">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button
            className="px-6 py-3 "
            onClick={() => navigate("/products")} // Adjust the URL to your shop page
          >
            Continue Shopping
          </Button>
          <div className="mt-10">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              Popular Products
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Example products, replace with dynamic data if available */}
              <div className="p-4 bg-gray-100 rounded-lg">
                <img
                  src="/images/product-1.jpg" // Replace with actual product image path
                  alt="Product 1"
                  className="object-cover w-full h-32 mb-2 rounded-lg"
                />
                <p className="text-gray-800">Product 1</p>
                <p className="text-sm text-gray-600">Price: 100 Leke</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                <img
                  src="/images/product-2.jpg" // Replace with actual product image path
                  alt="Product 2"
                  className="object-cover w-full h-32 mb-2 rounded-lg"
                />
                <p className="text-gray-800">Product 2</p>
                <p className="text-sm text-gray-600">Price: 150 Leke</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <ul className="space-y-6">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-100 rounded-lg"
              >
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
                <Button
                  className="ml-4 text-red-500 hover:text-red-700"
                  onClick={() => dispatch(removeItemFromCart(item.id))}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between pt-6 mt-8 border-t">
            <p className="text-xl font-bold text-gray-800">
              Total: {totalAmount} Leke
            </p>
            <Button
              className="text-white bg-red-500 hover:bg-red-600"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
