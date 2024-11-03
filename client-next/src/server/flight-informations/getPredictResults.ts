/**
 * @file getPredictResults.ts
 * @author Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description Server action file for handling flight price predictions.
 * Processes flight search parameters, retrieves price predictions and associated chart data
 * from the prediction API endpoint.
 */

"use server";

// Import required utilities and types for authentication and API communication
import { authAction } from "@/lib/actionClient";
import { authFetch } from "@/lib/authFetch";
import { ChartsData, PredictResults } from "@/types";
import { flightInformationsSearchMenuSchema } from "./schema";
import { API_URL } from "@/lib/constant";

/**
 * Server action to get flight price predictions and associated visualization data
 * 
 * @function getPredictResults
 * @async
 * @param {Object} params - The parameters object containing parsed input and context
 * @param {Object} params.parsedInput - Validated flight search parameters
 * @param {Object} params.ctx - Authentication context for the request
 * @returns {Promise<PredictResults>} Promise containing prediction results and visualization data
 * 
 * @description
 * This function:
 * 1. Validates input using flightInformationsSearchMenuSchema
 * 2. Formats dates and flight details for API consumption
 * 3. Makes two API calls:
 *    - One for price prediction
 *    - One for visualization data
 * 4. Combines and structures the results
 */
export const getPredictResults = authAction
  // Apply validation schema to ensure input data meets requirements
  .schema(flightInformationsSearchMenuSchema)
  .action(async ({ parsedInput, ctx }): Promise<PredictResults> => {
    // Format the input data into the structure expected by the prediction API
    const body = {
      // Split ISO datetime string to separate date and time components
      departure_date: parsedInput.departDate.toISOString().split("T")[0],
      departure_time: parsedInput.departDate
        .toISOString()
        .split("T")[1]
        .split(".")[0],
      arrival_date: parsedInput.arriveDate.toISOString().split("T")[0],
      arrival_time: parsedInput.arriveDate
        .toISOString()
        .split("T")[1]
        .split(".")[0],
      // Combine IATA code and airport name for city identification
      departure_city: `${parsedInput.from.iata} ${parsedInput.from.airport}`,
      arrival_city: `${parsedInput.to.iata} ${parsedInput.to.airport}`,
      stops: parsedInput.stops,
      airline: parsedInput.airline,
    };

    // First API call: Get the price prediction
    const predictionResult = await authFetch<{
      predictions: { prediction: string };
    }>(`${API_URL}/prediction`, {
      options: {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
      },
      ctx,
    });

    // Second API call: Get the visualization data for charts
    const chartData = await authFetch<ChartsData>(
      `${API_URL}/prediction/charts/data`,
      {
        options: {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        },
        ctx,
      }
    );

    // Combine and structure all results into the expected format
    return {
      statistics: {
        confidence: 92, // Confidence level for the prediction
        predictedPrice: Number(predictionResult.predictions.prediction),
        priceChange: 5.2, // Percentage change in price
        lastUpdated: "2 hours ago",
      },
      // Return different types of chart data for visualization
      trendData: chartData.price_trend,
      distributionData: chartData.price_distribution,
      seasonalityData: chartData.seasonal_analysis,
    };
  });