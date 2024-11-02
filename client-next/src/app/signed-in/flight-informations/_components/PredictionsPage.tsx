"use client";

import React, { useEffect } from "react";
import { PriceStatistics } from "./charts/PriceStatistics";
import { PriceTrendChart } from "./charts/PriceTrendChart";
import { PriceDistributionChart } from "./charts/PriceDistributionChart";
import { SeasonalityChart } from "./charts/SeasonalityChart";
import { useAction } from "next-safe-action/hooks";
import { getPredictResults } from "@/server/flight-informations/getPredictResults";
import { useSearchParams } from "next/navigation";

const PredictionsPage: React.FC = () => {
  const params = useSearchParams();
  const {
    executeAsync,
    isExecuting: loading,
    result: { data },
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
