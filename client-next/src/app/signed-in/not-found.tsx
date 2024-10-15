"use client";

import React from "react";
import { useRouter } from "next/navigation";

const SignedInError = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Access Denied</h1>
      <p className="text-xl text-gray-600 mb-8">
        You need to be signed in to access this page.
      </p>
      <div className="w-16 h-1 bg-blue-500 mb-8"></div>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Please sign in to view this content or access these features.
      </p>
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        onClick={() => router.push("/login")}
      >
        Go to Sign In
      </button>
    </div>
  );
};

export default SignedInError;
