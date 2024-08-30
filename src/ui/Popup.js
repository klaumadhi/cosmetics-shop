import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function Popup({ onClose }) {
  const handleOverlayClick = (e) => {
    // Close the popup if the user clicks on the overlay (background)
    onClose();
  };

  const handlePopupClick = (e) => {
    // Prevent the click from propagating to the overlay
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick} // Listen for clicks on the overlay
    >
      <div
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg"
        onClick={handlePopupClick} // Prevent clicks inside the popup from closing it
      >
        <h2 className="mb-4 text-xl font-semibold text-center">
          Produkti u shtua me sukses në shportën tuaj.
        </h2>
        <div className="flex justify-center gap-4">
          <Button>
            <Link to="/cart" className="">
              Shikoni Shportën
            </Link>
          </Button>
          <Button
            onClick={onClose}
            className="px-4 py-2 text-gray-800 rounded-md bg-slate-900 border-slate-950"
          >
            Vazhdoni Blerjet
          </Button>
        </div>
      </div>
    </div>
  );
}
