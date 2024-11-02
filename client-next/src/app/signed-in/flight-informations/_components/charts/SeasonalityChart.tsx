import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Plot from "react-plotly.js";
import { PredictSeasonalityData } from "@/types";

interface SeasonalityChartProps {
  data?: Array<PredictSeasonalityData | null>;
  loading?: boolean;
}

export const SeasonalityChart: React.FC<SeasonalityChartProps> = ({
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
    { month: "Jan", demand: 70, price: 900 },
    { month: "Feb", demand: 65, price: 850 },
    { month: "Mar", demand: 80, price: 950 },
    { month: "Apr", demand: 85, price: 980 },
    { month: "May", demand: 75, price: 920 },
    { month: "Jun", demand: 90, price: 1050 },
    { month: "Jul", demand: 95, price: 1100 },
    { month: "Aug", demand: 88, price: 1020 },
  ];

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-2xl font-semibold text-gray-800">
          Seasonality Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px]">
          <Plot
            data={[
              {
                x: chartData.map((d) => d!.month),
                y: chartData.map((d) => d!.demand),
                type: "scatter",
                mode: "lines+markers",
                name: "Demand",
                fill: "tozeroy",
                line: { color: "#8b5cf6" },
              },
              {
                x: chartData.map((d) => d!.month),
                y: chartData.map((d) => d!.price),
                type: "scatter",
                mode: "lines+markers",
                name: "Price",
                yaxis: "y2",
                line: { color: "#06b6d4" },
              },
            ]}
            layout={{
              autosize: true,
              margin: { l: 50, r: 50, t: 20, b: 40 },
              showlegend: true,
              legend: { orientation: "h", y: -0.2 },
              xaxis: { title: "Month" },
              yaxis: { title: "Demand Index" },
              yaxis2: {
                title: "Price (AUD)",
                overlaying: "y",
                side: "right",
              },
            }}
            style={{ width: "100%", height: 300 }}
            config={{ responsive: true }}
          />
        </div>
      </CardContent>
    </Card>
  );
};
