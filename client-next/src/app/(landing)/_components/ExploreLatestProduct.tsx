/**
 * @file ExploreLatestProduct.tsx
 * @author
 * Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description Defines the ExploreLatestProduct component, displaying the latest products and handling navigation.
 */

import { MeteorCard } from "./MeteorCard"; // Import the MeteorCard component
import { useRouter } from "next/navigation"; // Import useRouter for client-side navigation

// Define and export the ExploreLatestProduct component
export default function ExploreLatestProduct() {
  const router = useRouter(); // Initialize the router for navigation

  // Return the component's UI structure
  return (
    // Main container with background gradient and styling
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFF8F8] from-0% via-[#8BDFFF] via-53% to-[#18BFFF] py-20 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto px-4">
        {/* Header text with gradient effect */}
        <h2 className="text-6xl font-bold text-center md:-mt-10 mb-20 bg-gradient-to-r from-[#0B76B7] to-[#1C5BD9] bg-clip-text text-transparent">
          Explore our latest product.
        </h2>
        {/* Container for the product cards */}
        <div className="flex flex-col items-center md:flex-row gap-8 justify-center">
          {/* MeteorCard for "Flight Prices" */}
          <MeteorCard
            title="Flight Prices"
            description="Explore the best flight prices and book your next flight with ease."
            buttonText="Explore"
            buttonFunction={() => {
              // Navigate to the flight prices page when clicked
              router.push("/signed-in/flight-prices");
            }}
          />
          {/* MeteorCard for "Flight Information" */}
          <MeteorCard
            title="Flight Information"
            description="Analyze the flight information and predict the delays."
            buttonText="Explore"
            buttonFunction={() => {
              // Navigate to the flight information page when clicked
              router.push("/signed-in/flight-informations");
            }}
          />
        </div>
      </div>
    </div>
  );
}
