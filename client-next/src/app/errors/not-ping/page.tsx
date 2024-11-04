/**
 * @file page.tsx
 * @author
 * Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description Defines the NotPing component that displays a server error message when the server is not responding.
 */

import React from "react"; // Import React library for building UI components
import Image from "next/image"; // Import Next.js Image component for optimized images
import Logo from "@/assets/images/image.png"; // Import the logo image

// Define the NotPing functional component
const NotPing = () => {
  // Return the JSX to render the error page
  return (
    // Main container div with styling for layout and appearance
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Display the logo image */}
      <Image src={Logo} alt="401" width={300} height={300} />
      {/* Error code heading */}
      <h1 className="text-6xl font-bold text-gray-800 mb-4">500</h1>
      {/* Error message */}
      <p className="text-2xl text-gray-600 mb-8">Oops! Server Error</p>
      {/* Decorative horizontal line */}
      <div className="w-16 h-1 bg-blue-500 mb-8"></div>
      {/* Additional error information */}
      <p className="text-gray-600 mb-8 text-center max-w-md">
        The server is not responding. Please try again later.
      </p>
    </div>
  );
};

export default NotPing; // Export the NotPing component as the default export
