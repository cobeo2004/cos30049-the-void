"use client";

import React, { useEffect } from "react";
import { PriceStatistics } from "./charts/PriceStatistics";
import { PriceTrendChart } from "./charts/PriceTrendChart";
import { PriceDistributionChart } from "./charts/PriceDistributionChart";
import { SeasonalityChart } from "./charts/SeasonalityChart";
import { useAction } from "next-safe-action/hooks";
import { getPredictResults } from "@/server/flight-informations/getPredictResults";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PredictionsPage: React.FC = () => {
  const params = useSearchParams();
  const {
    executeAsync,
    isExecuting: loading,
    result: { data, serverError },
    hasErrored,
  } = useAction(getPredictResults);

  useEffect(() => {
    const doExecute = async () => {
      await executeAsync({
        from: {
          airport: params.get("fromAirport") as string,
          iata: params.get("fromIATA") as string,
        },
        to: {
          airport: params.get("toAirport") as string,
          iata: params.get("toIATA") as string,
        },
        departDate: new Date(params.get("departDate") as string),
        arriveDate: new Date(params.get("arriveDate") as string),
        stops: params.get("stops") as "direct" | "1" | "2",
        airline: params.get("airline") as string,
      });
    };
    doExecute();
  }, [executeAsync]);

  if (hasErrored || serverError) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center min-h-[400px]">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Oops!</h2>
            <h3 className="text-lg font-medium text-gray-800">
              <span className="text-red-600">Error:</span> Something went wrong
            </h3>
            <p className="text-gray-600">
              {serverError || "An error occurred while fetching flight prices"}
            </p>
            <Link href="/signed-in/flight-prices">
              <Button className="mt-8 bg-gradient-to-t from-[#8BDFFF] from-0% via-[#18BFFF] via-53% to-[#0B76B7] to-100% text-primary-foreground">
                Try Again
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <PriceStatistics data={data?.statistics} loading={loading} />
        </div>
        <PriceTrendChart data={data?.trendData} loading={loading} />
        <PriceDistributionChart
          data={data?.distributionData}
          loading={loading}
        />
        <div className="md:col-span-2">
          <SeasonalityChart data={data?.seasonalityData} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default PredictionsPage;
