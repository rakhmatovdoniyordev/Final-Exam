"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { FaAngleRight } from "react-icons/fa";
import type { RootState } from "../../redux/store";
import { clearCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    comments: "",
  });
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataFromEvent = new FormData(e.target as HTMLFormElement);
    const newFormData = {
      fullName: `${formDataFromEvent.get("firstName")} ${formDataFromEvent.get(
        "lastName"
      )}`,
      phone: formDataFromEvent.get("phone") as string,
      email: formDataFromEvent.get("email") as string,
      address: formDataFromEvent.get("address") as string,
      comments: formDataFromEvent.get("comments") as string,
    };
    setFormData(newFormData);

    const handlePurchase = async (data: typeof formData) => {
      if (!data.fullName || !data.phone || !data.address) {
        alert("Пожалуйста, заполните обязательные поля!");
        return;
      }

      const BOT_TOKEN = "7789896456:AAGFEFJyQ__peuqps7dDRo3XzMEtBuWhWQs";
      const CHAT_ID = "-4727047565";

      const text = `
🛍️ New order:

Client information:
- Name: ${data.fullName}
- Phone Number: ${data.phone}
- Email adrress: ${data.email || "Not specified"}
- Delivery address: ${data.address}
- Comment: ${data.comments || "Not specified"}

Ordered products:
${cartItems
  .map(
    (item) => `
- ${item.title}
  Quanity: ${item.quantity}
  Price: ${item.price} $
`
  )
  .join("\n")}

Итого:
- Cost of goods: ${subtotal.toFixed(2)} $
- Delivery: ${deliveryFee.toFixed(2)} $
- Total cost: ${total.toFixed(2)} $
`;

      try {
        const response = await fetch(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: CHAT_ID,
              text: text,
              parse_mode: "HTML",
            }),
          }
        );

        if (response.ok) {
          toast.success("Order accepted!");
          dispatch(clearCart());
          setFormData({
            fullName: "",
            phone: "",
            email: "",
            address: "",
            comments: "",
          });
          navigate("/cart");
        } else {
          throw new Error("Failed to send message to Telegram :(");
        }
      } catch (error) {
        console.error("Error:(", error);
        alert(
          "An error occurred while submitting your order. Please try again."
        );
      }
    };

    await handlePurchase(newFormData);
    setIsSubmitting(false);
  };

  return (
    <div className="container my-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-8">
        <button onClick={() => navigate("/")} className="hover:underline">
          Home
        </button>
        <span>
          <FaAngleRight />
        </span>
        <button onClick={() => navigate("/cart")} className="hover:underline">
          Cart
        </button>
        <span>
          <FaAngleRight />
        </span>
        <p>Checkout</p>
      </div>

      <h1 className="text-3xl font-bold text-center mb-12">Check Out</h1>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Contact Information Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="First Name"
                name="firstName"
                required
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Last Name"
                name="lastName"
                required
                fullWidth
                variant="outlined"
              />
            </div>
            <TextField
              label="Phone Number"
              name="phone"
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Email Address"
              name="email"
              type="email"
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Address"
              name="address"
              required
              fullWidth
              variant="outlined"
            />{" "}
            {/* Added Address field */}
            <TextField
              label="Comments"
              name="comments"
              fullWidth
              variant="outlined"
            />{" "}
            {/* Added Comments field */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#F0EEED] rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="border-t pt-4 mt-4 space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-red-500">
                <span>Discount (-20%)</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
