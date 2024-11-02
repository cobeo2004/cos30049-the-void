import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Plot from "react-plotly.js";
import { PredictTrendData } from "@/types";

interface PriceTrendChartProps {
  data?: Array<PredictTrendData | null>;
  loading?: boolean;
}

export const PriceTrendChart: React.FC<PriceTrendChartProps> = ({
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
    { month: "Sep", price: 850, predicted: 820 },
    { month: "Oct", price: 900, predicted: 880 },
    { month: "Nov", price: 880, predicted: 920 },
    { month: "Dec", price: 950, predicted: 900 },
    { month: "Jan", price: 920, predicted: 940 },
    { month: "Feb", price: 980, predicted: 960 },
    { month: "Mar", price: 1000, predicted: 980 },
    { month: "Apr", price: 1020, predicted: 1000 },
  ];

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-2xl font-semibold text-gray-800">
          Price Trend Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px]">
          <Plot
            data={[
              {
                x: chartData.map((d) => d!.month),
                y: chartData.map((d) => d!.price),
                type: "scatter",
                mode: "lines+markers",
                name: "Actual Price",
                line: { color: "#2563eb" },
              },
              {
                x: chartData.map((d) => d!.month),
                y: chartData.map((d) => d!.predicted),
                type: "scatter",
                mode: "lines+markers",
                name: "Predicted Price",
                line: { color: "#10b981", dash: "dash" },
              },
            ]}
            layout={{
              autosize: true,
              margin: { l: 50, r: 20, t: 20, b: 80 },
              showlegend: true,
              legend: {
                orientation: "h",
                yanchor: "bottom",
                y: -0.4,
                xanchor: "center",
                x: 0.5,
              },
              xaxis: { title: "Month" },
              yaxis: { title: "Price (AUD)" },
            }}
            style={{ width: "100%", height: 300 }}
            config={{ responsive: true }}
          />
        </div>
      </CardContent>
    </Card>
  );
};
