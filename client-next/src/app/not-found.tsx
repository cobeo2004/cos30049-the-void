/**
 * @file NotFound.tsx
 * @author Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description A custom 404 error page component that provides a user-friendly
 * interface when users encounter non-existent routes. Features a clean design
 * with the company logo, error message, and a link to return to the homepage.
 */

import React from "react";
import Image from "next/image";
import Logo from "@/assets/images/image.png";
import Link from "next/link";

/**
 * NotFound component for displaying a custom 404 error page
 * Features:
 * - Centered layout with company logo
 * - Clear error messaging
 * - Visual separator
 * - Explanatory text
 * - Call-to-action button to return home
 * 
 * @returns {JSX.Element} The 404 error page component
 */
const NotFound = () => {
  return (
    /* Main container
       - Full viewport height
       - Centered content layout
       - Light gray background */
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Company logo 
          - Optimized image loading with Next.js Image
          - Fixed dimensions
          - Maintains aspect ratio */}
      <Image src={Logo} alt="404" width={300} height={300} />

      {/* Content container
          - Centered layout
          - Bottom margin for spacing
          - Flexible column structure */}
      <div className="flex flex-col items-center justify-center mb-16">
        {/* Error code display */}
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>

        {/* Primary error message */}
        <p className="text-2xl text-gray-600 mb-8">Oops! Page not found</p>

        {/* Visual separator
            - Blue accent line
            - Provides visual break between content */}
        <div className="w-16 h-1 bg-blue-500 mb-8"></div>

        {/* Detailed error explanation
            - Centered text
            - Maximum width for readability
            - Light gray color for secondary information */}
        <p className="text-gray-600 mb-8 text-center max-w-md">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        {/* Home page navigation link
            - Styled as a button
            - Blue background with hover state
            - Smooth transition effect
            - Clear call-to-action */}
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