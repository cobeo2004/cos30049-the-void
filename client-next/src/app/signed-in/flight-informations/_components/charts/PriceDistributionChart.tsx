import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Plot from "react-plotly.js";
import { PredictDistributionData } from "@/types";

interface PriceDistributionChartProps {
  data?: Array<PredictDistributionData | null>;
  loading?: boolean;
}

export const PriceDistributionChart: React.FC<PriceDistributionChartProps> = ({
  data,
  loading,
}) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] bg-gray-100 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  const chartData = data || [
    { range: "600-700", count: 10 },
    { range: "700-800", count: 25 },
    { range: "800-900", count: 40 },
    { range: "900-1000", count: 30 },
    { range: "1000-1100", count: 15 },
    { range: "1100-1200", count: 8 },
  ];

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-2xl font-semibold text-gray-800">
          Price Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px]">
          <Plot
            data={[
              {
                x: chartData.map((d) => d!.range),
                y: chartData.map((d) => d!.count),
                type: "bar",
                marker: { color: "#3b82f6" },
              },
            ]}
            layout={{
              autosize: true,
              margin: { l: 50, r: 20, t: 20, b: 40 },
              showlegend: false,
              xaxis: { title: "Price Range (AUD)" },
              yaxis: { title: "Number of Flights" },
            }}
            style={{ width: "100%", height: 300 }}
            config={{ responsive: true }}
          />
        </div>
      </CardContent>
    </Card>
  );
};
