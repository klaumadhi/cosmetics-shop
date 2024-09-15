import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button"; // Assuming this Button component is styled with Tailwind

export default function Popup({ onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleOverlayClick = () => {
    triggerCloseAnimation();
  };

  const handlePopupClick = (e) => {
    e.stopPropagation(); // Prevent clicks inside the popup from closing it
  };

  const triggerCloseAnimation = () => {
    setIsClosing(true);
    setTimeout(onClose, 600); // Delay the onClose call until after the animation
  };

  return (
    <div
      className={`fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleOverlayClick}
    >
      <div
        className={`w-full max-w-sm p-6 bg-white rounded-lg shadow-lg transition-transform transform ${
          isClosing
            ? "scale-50 translate-x-20 -translate-y-64 rounded-full"
            : "scale-100"
        } duration-600 ease-in-out`}
        onClick={handlePopupClick}
      >
        <h2 className="mb-4 text-xl font-semibold text-center">
          Product successfully added to your cart.
        </h2>
        <div className="flex justify-center gap-4">
          <Button className="px-4 py-2 text-white bg-pink-500 rounded-lg hover:bg-pink-600">
            <Link to="/cart">View Cart</Link>
          </Button>
          <Button
            onClick={triggerCloseAnimation}
            className="px-4 py-2 text-white rounded-md bg-slate-900 hover:bg-black"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
