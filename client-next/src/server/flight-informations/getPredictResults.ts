"use server";

import { authAction } from "@/lib/actionClient";
import { authFetch } from "@/lib/authFetch";
import { PredictResults } from "@/types";
import { flightInformationsSearchMenuSchema } from "./schema";
import { API_URL } from "@/lib/constant";

export const getPredictResults = authAction
  .schema(flightInformationsSearchMenuSchema)
  .action(async ({ parsedInput, ctx }): Promise<PredictResults> => {
    const body = {
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
      departure_city: `${parsedInput.from.iata} ${parsedInput.from.airport}`,
      arrival_city: `${parsedInput.to.iata} ${parsedInput.to.airport}`,
      stops: parsedInput.stops,
      airline: parsedInput.airline,
    };
    const response = await authFetch<{ predictions: { prediction: string } }>(
      `${API_URL}/prediction`,
      {
        options: {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(body),
        },
        ctx,
      }
    );
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          statistics: {
            confidence: 92,
            predictedPrice: Number(response.predictions.prediction),
            priceChange: 5.2,
            lastUpdated: "2 hours ago",
          },
          trendData: [
            { month: "Sep", price: 850, predicted: 820 },
            { month: "Oct", price: 900, predicted: 880 },
            { month: "Nov", price: 880, predicted: 920 },
            { month: "Dec", price: 950, predicted: 900 },
            { month: "Jan", price: 920, predicted: 940 },
            { month: "Feb", price: 980, predicted: 960 },
            { month: "Mar", price: 1000, predicted: 980 },
            { month: "Apr", price: 1020, predicted: 1000 },
          ],
          distributionData: [
            { range: "600-700", count: 10 },
            { range: "700-800", count: 25 },
            { range: "800-900", count: 40 },
            { range: "900-1000", count: 30 },
            { range: "1000-1100", count: 15 },
            { range: "1100-1200", count: 8 },
          ],
          seasonalityData: [
            { month: "Jan", demand: 70, price: 900 },
            { month: "Feb", demand: 65, price: 850 },
            { month: "Mar", demand: 80, price: 950 },
            { month: "Apr", demand: 85, price: 980 },
            { month: "May", demand: 75, price: 920 },
            { month: "Jun", demand: 90, price: 1050 },
            { month: "Jul", demand: 95, price: 1100 },
            { month: "Aug", demand: 88, price: 1020 },
          ],
        });
      }, 2000);
    }) as Promise<PredictResults>;
  });
