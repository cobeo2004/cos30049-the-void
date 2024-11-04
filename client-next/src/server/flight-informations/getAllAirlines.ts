/**
 * @file getAllAirlines.ts
 * @author Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description Server action file for handling airline-related API requests. 
 * Provides functionality to fetch all available airlines from the flight prices API.
 */

"use server";

// Import required utilities and constants for authentication and API communication
import { authAction } from "@/lib/actionClient";
import { authFetch } from "@/lib/authFetch";
import { API_URL } from "@/lib/constant";

/**
 * Server action to retrieve a list of all available airlines
 * 
 * @function getAllAirlines
 * @async
 * @param {Object} params - The parameters object containing the context
 * @param {Object} params.ctx - The authentication context for the request
 * @returns {Promise<Array<string>>} A promise that resolves to an array of airline names
 * 
 * @description
 * This function creates an authenticated server action that:
 * 1. Makes a GET request to the flight-prices/airlines endpoint
 * 2. Uses authentication context for secure API communication
 * 3. Returns the list of airlines as an array of strings
 */
export const getAllAirlines = authAction.action(async ({ ctx }) => {
  // Make an authenticated API request to fetch all airlines
  // The authFetch utility ensures proper authentication headers are included
  const res = await authFetch<Array<string>>(
    `${API_URL}/flight-prices/airlines`,
    {
      options: {
        headers: {
          // Specify JSON content type for the API request
          "Content-Type": "application/json",
        },
      },
      // Pass the authentication context for secure communication
      ctx,
    }
  );

  // Return the response containing the array of airline names
  return res;
});