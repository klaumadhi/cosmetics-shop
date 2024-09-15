import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { clearCart } from "../../store/cartSlice";
import { formatNumber } from "../../utilis/helpers";

export default function OrderConfirmationPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const subtotal = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  // Clear cart when leaving the page

  return (
    <div className="container max-w-2xl px-8 py-10 mx-auto mt-10 bg-white rounded-lg shadow-lg">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-center text-gray-900">
        Order Confirmed 🎉
      </h1>

      <p className="mb-6 text-lg text-center text-gray-600">
        Thank you for your purchase! Here are the details of your order:
      </p>

      {/* Order Details Section */}
      <div className="p-6 mb-8 rounded-lg shadow-md bg-gray-50">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Items Purchased:
        </h2>
        <ul className="space-y-6">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg shadow-md lg:flex-row"
            >
              {/* Product Image */}
              <img
                src={item.variation?.variation_image || item.image}
                alt={item.name}
                className="object-cover w-32 h-32 rounded-lg"
              />

              {/* Product Details */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>

                {/* Show variation details if available */}
                {item.variation && (
                  <div className="text-sm text-gray-600">
                    {item.variation.type === "size" && (
                      <p>Size: {item.variation.value}</p>
                    )}
                    {item.variation.type === "color" && (
                      <p>
                        Color: {item.variation.value}{" "}
                        {item.variation.color_image && (
                          <img
                            src={item.variation.color_image}
                            alt={item.variation.value}
                            className="inline-block w-6 h-6 ml-2 rounded-full"
                          />
                        )}
                      </p>
                    )}
                    <p>Barcode: {item.variation.barcode}</p>
                  </div>
                )}
                {!item.variation && (
                  <p className="text-sm text-gray-600">
                    Barcode: {item.barcode}
                  </p>
                )}

                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm text-gray-600">
                  Price: {item.price.toLocaleString()} Leke
                </p>
                <p className="font-bold text-gray-800">
                  Total Price: {item.totalPrice.toLocaleString()} Leke
                </p>
              </div>
            </li>
          ))}
        </ul>
        {subtotal < 1500 && (
          <div className="flex justify-between mt-8 text-sm text-gray-500 p ">
            <span>Transport:</span>
            <span>200 Leke</span>
          </div>
        )}

        <div className="flex justify-between pt-4 text-xl font-bold text-gray-900 border-t">
          <span>Total Amount:</span>
          <span>
            {subtotal > 1500 ? formatNumber(subtotal) : subtotal + 200} Leke
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <Button onClick={() => dispatch(clearCart())} className="rounded-3xl">
          <Link
            to="/"
            className="flex items-center justify-center w-full h-full"
          >
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
