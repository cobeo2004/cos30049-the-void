/**
 * @file page.tsx
 * @author
 * Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description React component for displaying the flight information page with a search menu and footer.
 */

import Footer from "@/app/(landing)/_components/Footer";
import React from "react";
// Import the flight information search menu component
import FlightInformationsSearchMenu from "./_components/FlightInformationsSearchMenu";

// Define the main functional component for the flight information page
function FlightInformations() {
  return (
    <>
      {/* Main content area with a gradient background */}
      <div className="min-h-screen w-full bg-gradient-to-t from-[#FFF8F8] from-0% via-[#8BDFFF] via-53% to-[#18BFFF] to-100% flex flex-col">
        {/* Include the flight information search menu */}
        <FlightInformationsSearchMenu />
      </div>
      {/* Include the footer component with customized background and styles */}
      <Footer
        bgColor="bg-gradient-to-b from-[#FFFFFF] via-[#D0F0FD] to-[#18BFFF]"
        className="border-transparent"
      />
    </>
  );
}

// Export the component as the default export
export default FlightInformations;
