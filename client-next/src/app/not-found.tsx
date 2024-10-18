import React from "react";
import Image from "next/image";
import Logo from "@/assets/images/image.png";
import Link from "next/link";
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Image src={Logo} alt="404" width={300} height={300} />
      <div className="flex flex-col items-center justify-center mb-16">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Oops! Page not found</p>
        <div className="w-16 h-1 bg-blue-500 mb-8"></div>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          <p>Go back home</p>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
