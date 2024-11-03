/**
 * @file getDestinations.ts
 * @author
 *   Xuan Tuan Minh Nguyen,
 *   Trong Dat Hoang,
 *   Henry Nguyen
 * @description Handles fetching destinations by region name with authentication,
 * using defined schemas and fetching methods.
 */

"use server"; // Indicates that this file should be processed on the server side

import { authAction } from "@/lib/actionClient"; // Import the authenticated action helper
import { getDestinationsByRegionNameSchema } from "./schema"; // Import the input validation schema
import { API_URL } from "@/lib/constant"; // Import the base API URL
import { authFetch } from "@/lib/authFetch"; // Import the authenticated fetch function

// Define the return type for the destination data
export type GetDestinationsByRegionNameReturnValue = {
  country_code: string; // The country code of the destination
  region_name: string;  // The name of the region
  iata: string;         // IATA code of the airport
  icao: string;         // ICAO code of the airport
  airport: string;      // Name of the airport
  latitude: number;     // Latitude coordinate of the airport
  longitude: number;    // Longitude coordinate of the airport
};

// Create an authenticated action to get destinations by region name
export const getDestinationsByRegionName = authAction
  // Attach the input validation schema to the action
  .schema(getDestinationsByRegionNameSchema)
  // Define the action handler function
  .action(async ({ parsedInput, ctx }) => {
    try {
      // Perform an authenticated fetch request to the API endpoint with the query parameter
      const destinations = await authFetch<
        Array<GetDestinationsByRegionNameReturnValue>
      >(
        `${API_URL}/flight-prices/destinations/search?q=${parsedInput.q}`,
        {
          options: {
            method: "GET", // Use HTTP GET method for fetching data
          },
          ctx, // Pass the authentication context
        }
      );
      // Return the list of destinations retrieved from the API
      return destinations;
    } catch (error) {
      // Throw a new error if the fetch request fails
      throw new Error((error as Error).message);
    }
  });
