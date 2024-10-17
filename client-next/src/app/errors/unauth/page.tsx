"use client";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">401</h1>
      <p className="text-2xl text-gray-600 mb-8">Oops! Unauthorized</p>
      <div className="w-16 h-1 bg-blue-500 mb-8"></div>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        You are not authorized to access this page. Please login to continue.
      </p>
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        onClick={() => {
          router.replace("/login");
        }}
      >
        <p>Go to login</p>
      </button>
    </div>
  );
};

export default NotFound;
