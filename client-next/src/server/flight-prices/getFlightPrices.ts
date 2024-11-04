/**
 * @file getFlightPrices.ts
 * @author Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description Server action file for fetching flight prices based on search criteria.
 * Handles both one-way and round-trip flight searches with passenger details.
 */

"use server";

// Import required utilities, types, and constants
import { authAction } from "@/lib/actionClient";
import { type SerpResponse } from "@/types";
import { flightPricesSearchMenuSchema } from "./schema";
import { authFetch } from "@/lib/authFetch";
import { API_URL } from "@/lib/constant";
import exampleResponse from "@/data/example_serp.json";

/**
 * Server action to retrieve flight prices based on search criteria
 * 
 * @function getFlightPrices
 * @async
 * @param {Object} params - The parameters object containing parsed input and context
 * @param {Object} params.parsedInput - Validated flight search parameters
 * @param {Object} params.ctx - Authentication context for the request
 * @returns {Promise<SerpResponse>} Promise containing flight search results
 * 
 * @description
 * This function:
 * 1. Validates input using flightPricesSearchMenuSchema
 * 2. Constructs appropriate request body based on trip type
 * 3. Makes authenticated API call to fetch flight prices
 * 4. Handles potential errors in the search process
 */
export const getFlightPrices = authAction
  // Apply validation schema to ensure input data meets requirements
  .schema(flightPricesSearchMenuSchema)
  .action(async ({ parsedInput, ctx }) => {
    try {
      // Destructure the validated input parameters
      const {
        tripType,      // Type of trip (one-way or round)
        from,          // Departure airport
        to,            // Arrival airport
        departDate,    // Outbound flight date
        returnDate,    // Return flight date (for round trips)
        adults,        // Number of adult passengers
        children,      // Number of child passengers
        infants,       // Number of infant passengers
      } = parsedInput;

      // Construct request body based on trip type
      // Different structure for round-trip vs one-way flights
      const body =
        tripType === "round" && returnDate !== undefined
          ? {
              // Round-trip flight body structure
              trip_type: tripType,
              departure_id: from.iata,
              arrival_id: to.iata,
              outbound_date: departDate.toISOString().split("T")[0], // Format date to YYYY-MM-DD
              return_date: returnDate?.toISOString().split("T")[0],  // Include return date
              currency: "AUD",
              adults,
              children,
              infants_on_lap: infants,
            }
          : {
              // One-way flight body structure
              trip_type: tripType,
              departure_id: from.iata,
              arrival_id: to.iata,
              outbound_date: departDate.toISOString().split("T")[0], // Format date to YYYY-MM-DD
              currency: "AUD",
              adults,
              children,
              infants_on_lap: infants,
            };

      // Make authenticated API request to fetch flight prices
      return await authFetch<SerpResponse>(`${API_URL}/flight-prices`, {
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
        ctx,
      });

      // Commented out example response for testing purposes
      // return Promise.resolve(exampleResponse as unknown as SerpResponse);
    } catch (err) {
      // Propagate any errors that occur during the search process
      throw new Error((err as Error).message);
    }
  });