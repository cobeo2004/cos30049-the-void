"use client";

import React, { useEffect } from "react";
import { PriceStatistics } from "./charts/PriceStatistics";
import { PriceTrendChart } from "./charts/PriceTrendChart";
import { PriceDistributionChart } from "./charts/PriceDistributionChart";
import { SeasonalityChart } from "./charts/SeasonalityChart";
import { useAction } from "next-safe-action/hooks";
import { getPredictResults } from "@/server/flight-informations/getPredictResults";

const PredictionsPage: React.FC = () => {
  const {
    executeAsync,
    isExecuting: loading,
    result: { data },
  } = useAction(getPredictResults);
  useEffect(() => {
    const doExecute = async () => {
      await executeAsync();
    };
    doExecute();
  }, [executeAsync]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <PriceStatistics data={data?.statistics} loading={loading} />
      <PriceTrendChart data={data?.trendData} loading={loading} />
      <PriceDistributionChart data={data?.distributionData} loading={loading} />
      <SeasonalityChart data={data?.seasonalityData} loading={loading} />
    </div>
  );
};

export default PredictionsPage;
