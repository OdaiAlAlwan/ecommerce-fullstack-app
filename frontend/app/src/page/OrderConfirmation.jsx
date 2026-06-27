import React from "react";
import { Link } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";

export default function OrderConfirmation() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <BsCheckCircleFill className="text-6xl text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been successfully processed
          via simulated checkout.
        </p>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors inline-block w-full"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
