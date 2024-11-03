/**
 * @file MeteorCard.tsx
 * @author
 * Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description Defines the MeteorCard component, which displays a card with a meteor effect and handles button interactions.
 */

import React from "react"; // Import React library
import { Meteors } from "@/components/ui/meteors"; // Import the Meteors component for the meteor effect

// Define the type for the component's props
type MeteorCardProps = {
  title: string; // Title text displayed on the card
  description: string; // Description text displayed on the card
  buttonText: string; // Text displayed on the button
  buttonFunction: VoidFunction; // Function to be called when the button is clicked
};

// Define and export the MeteorCard component
export function MeteorCard({
  title,
  description,
  buttonText,
  buttonFunction,
}: MeteorCardProps) {
  return (
    <div className="">
      {/* Main container for the card */}
      <div className="w-full relative max-w-xs">
        {/* Background gradient with blur effect for visual appeal */}
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        {/* Card content container */}
        <div className="relative shadow-xl bg-gradient-to-br from-[#18BFFF] via-[#88DFFF] to-[#FFF8F8] border border-gray-400  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          {/* Decorative circle with an icon */}
          <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
            {/* SVG icon inside the circle */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-2 w-2 text-gray-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </div>

          {/* Display the title prop */}
          <h1 className="font-bold text-xl text-white mb-4 relative z-50">
            {title}
          </h1>

          {/* Display the description prop */}
          <p className="font-bold text-base text-slate-900 mb-4 relative z-50">
            {description}
          </p>

          {/* Button that triggers the provided function when clicked */}
          <button
            className="border px-4 py-1 rounded-lg  border-gray-500 text-slate-900"
            onClick={buttonFunction} // Attach the click handler function
          >
            {buttonText}
          </button>

          {/* Render the meteor effect over the card */}
          <Meteors number={20} /> {/* Display 20 meteors for visual effect */}
        </div>
      </div>
    </div>
  );
}
