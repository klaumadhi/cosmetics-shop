import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart, clearCart } from "../../store/cartSlice";
import Button from "../../ui/Button";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  return (
    <div className="container px-4 mx-auto my-10">
      <h1 className="mb-4 text-2xl font-bold">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between mb-4">
                <div>
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p>
                    {item.quantity} x {item.price} Leke
                  </p>
                  {item.variation && (
                    <p className="text-sm text-gray-600">
                      {item.variation.type}: {item.variation.value}
                    </p>
                  )}
                </div>
                <Button onClick={() => dispatch(removeItemFromCart(item.id))}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-6">
            <p className="text-xl font-bold">Total: {totalAmount} Leke</p>
            <Button onClick={() => dispatch(clearCart())}>Clear Cart</Button>
          </div>
        </>
      )}
    </div>
  );
}
