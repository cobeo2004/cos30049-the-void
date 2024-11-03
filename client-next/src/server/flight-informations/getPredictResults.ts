"use server";

import { authAction } from "@/lib/actionClient";
import { authFetch } from "@/lib/authFetch";
import { ChartsData, PredictResults } from "@/types";
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
    return {
      statistics: {
        confidence: 92,
        predictedPrice: Number(predictionResult.predictions.prediction),
        priceChange: 5.2,
        lastUpdated: "2 hours ago",
      },
      trendData: chartData.price_trend,
      distributionData: chartData.price_distribution,
      seasonalityData: chartData.seasonal_analysis,
    };
  });
