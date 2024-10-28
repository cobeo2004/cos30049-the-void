import React from "react";
import Image from "next/image";
import Logo from "@/assets/images/image.png";

const NotPing = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Image src={Logo} alt="401" width={300} height={300} />
      <h1 className="text-6xl font-bold text-gray-800 mb-4">500</h1>
      <p className="text-2xl text-gray-600 mb-8">Oops! Server Error</p>
      <div className="w-16 h-1 bg-blue-500 mb-8"></div>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        The server is not responding. Please try again later.
      </p>
    </div>
  );
};

export default NotPing;
