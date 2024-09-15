import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import emailjs from "emailjs-com";
import { clearCart } from "../../store/cartSlice"; // Ensure you have this action
import { toast } from "react-toastify";
import Button from "../../ui/Button";

import "react-toastify/dist/ReactToastify.css";

export default function CheckoutPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); // To include cart details
  const subtotal = useSelector((state) => state.cart.totalAmount);
  console.log("cart", cartItems);

  // Inside onSubmit function in CheckoutPage
  const onSubmit = (data) => {
    const buyerEmailData = {
      firstName: data.firstName,
      surname: data.surname,
      city: data.city,
      streetAddress: data.streetAddress,
      postalCode: data.postalCode,
      telephone: data.telephone,
      email: data.email,
      cartItems: cartItems.map((item) => ({
        name: item.name,
        variation: item.variation
          ? `${item.variation.type}: ${item.variation.value}`
          : "", // Empty string if variation is undefined
        quantity: item.quantity,
        price: item.price,
        total: item.totalPrice,
        barcode: item.variation ? item.variation.barcode : item.barcode,
      })),
      subtotal:
        subtotal > 1500
          ? subtotal
          : `${subtotal + 200} Leke (${subtotal}+200 Transport)`,
    };

    console.log(buyerEmailData);
    // Send email to the buyer
    emailjs
      .send(
        "service_d45of4e",
        "client_template",
        buyerEmailData,
        "Xlwin0FIAhz_c6fVR"
      )
      .then((result) => {
        console.log("Buyer email sent:", result);
      })
      .catch((error) => {
        console.log("Error sending buyer email:", error);
      });

    // Show success toast
    toast.success("Order placed successfully!", {
      position: "top-center",
      autoClose: 5000,
    });

    // Redirect to the Order Confirmation page after 2 seconds
    setTimeout(() => {
      navigate("/order-confirmation");
    }, 1000);
  };

  // // Send email to the shop
  // emailjs
  //   .send(
  //     "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
  //     "YOUR_SHOP_TEMPLATE_ID", // Replace with your EmailJS template ID for shop email
  //     buyerEmailData,
  //     "YOUR_USER_ID" // Replace with your EmailJS user ID
  //   )
  //   .then((result) => {
  //     console.log("Shop email sent:", result);
  //   })
  //   .catch((error) => {
  //     console.log("Error sending shop email:", error);
  //   });

  return (
    <div className="container max-w-xl px-6 py-10 mx-auto bg-white rounded-lg shadow-md">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* firstName */}
          <div>
            <label className="block mb-1 text-gray-700">First Name</label>
            <input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-200"
              type="text"
              {...register("firstName", { required: true })}
            />
            {errors.firstName && (
              <p className="text-red-500">First Name is required</p>
            )}
          </div>

          {/* Surname */}
          <div>
            <label className="block mb-1 text-gray-700">Surname</label>
            <input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-200"
              type="text"
              {...register("surname", { required: true })}
            />
            {errors.surname && (
              <p className="text-red-500">Surname is required</p>
            )}
          </div>
        </div>

        {/* City */}
        <div className="mt-4">
          <label className="block mb-1 text-gray-700">City</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-200"
            type="text"
            {...register("city", { required: true })}
          />
          {errors.city && <p className="text-red-500">City is required</p>}
        </div>

        {/* Street Address */}
        <div className="mt-4">
          <label className="block mb-1 text-gray-700">Street Address</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-200"
            type="text"
            {...register("streetAddress", { required: true })}
          />
          {errors.streetAddress && (
            <p className="text-red-500">Street Address is required</p>
          )}
        </div>

        {/* Postal Code */}
        <div className="mt-4">
          <label className="block mb-1 text-gray-700">Postal Code</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-200"
            type="text"
            {...register("postalCode", { required: true })}
          />
          {errors.postalCode && (
            <p className="text-red-500">Postal Code is required</p>
          )}
        </div>

        {/* Telephone */}
        <div className="mt-4">
          <label className="block mb-1 text-gray-700">Telephone Number</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-200"
            type="text"
            {...register("telephone", { required: true })}
          />
          {errors.telephone && (
            <p className="text-red-500">Telephone is required</p>
          )}
        </div>

        {/* Email */}
        <div className="mt-4">
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-200"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <Button
            type="submit"
            className="w-full px-6 py-3 text-white bg-green-500 hover:bg-green-600"
          >
            Place Order
          </Button>
        </div>
      </form>
    </div>
  );
}
