/**
 * @file page.tsx
 * @author Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description The flight price predictions page component that serves as the main interface
 * for flight price analysis. It implements a gradient background design and contains
 * the core predictions functionality through the PredictionsPage component.
 */

import React from "react";
import PredictionsPage from "../_components/PredictionsPage";
import Footer from "@/app/(landing)/_components/Footer";

/**
 * Main component for the flight price predictions interface
 * Features:
 * - Gradient background design
 * - Responsive container layout
 * - Centered header with gradient text
 * - Core predictions functionality
 * - Customized footer with gradient background
 * 
 * @returns {JSX.Element} The complete predictions page with header, content, and footer
 */
function Predictions() {
  return (
    <>
      {/* Main container with gradient background
          - Minimum full viewport height
          - Multi-stop gradient background
          - Flexbox column layout */}
      <div className="min-h-screen w-full bg-gradient-to-t from-[#FFF8F8] from-0% via-[#8BDFFF] via-53% to-[#18BFFF] to-100% flex flex-col">
        {/* Content container with padding and spacing
            - Centered with auto margins
            - Consistent padding
            - Vertical spacing between elements */}
        <div className="container mx-auto p-4 space-y-4">
          {/* Page header section
              - Full width with max screen width constraint
              - Centered text alignment
              - Margins for spacing */}
          <header className="w-full max-w-screen mb-8 mt-4 text-center">
            {/* Title with gradient text effect
                - Large text size
                - Bold weight
                - Gradient text color effect */}
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0B76B7] to-[#1C5BD9] bg-clip-text text-transparent">
              Flight Price Analysis
            </h1>
          </header>

          {/* Main predictions interface component */}
          <PredictionsPage />
        </div>
      </div>

      {/* Footer with custom gradient background
          - Gradient background flowing from white to blue
          - Transparent border
          - Positioned at bottom of layout */}
      <Footer
        bgColor="bg-gradient-to-b from-[#FFFFFF] via-[#D0F0FD] to-[#18BFFF]"
        className="border-transparent"
      />
    </>
  );
}

export default Predictions;