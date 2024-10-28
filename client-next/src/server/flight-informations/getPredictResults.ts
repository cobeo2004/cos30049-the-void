"use server";

import { authAction } from "@/lib/actionClient";
import { PredictResults } from "@/types";

export const getPredictResults = authAction.action(
  async (): Promise<PredictResults> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          statistics: {
            averagePrice: 980.75,
            priceChange: 5.2,
            lowestPrice: 720,
            bestTime: "October",
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
  }
);
