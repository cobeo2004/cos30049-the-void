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

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-2xl font-semibold text-gray-800">
          Seasonality Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px]">
          {data && (
            <Plot
              data={[
                {
                  x: data.map((d) => d!.month),
                  y: data.map((d) => d!.demand),
                  type: "scatter",
                  mode: "lines+markers",
                  name: "Demand",
                  fill: "tozeroy",
                  line: { color: "#8b5cf6" },
                },
                {
                  x: data!.map((d) => d!.month),
                  y: data!.map((d) => d!.price),
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
          )}
        </div>
      </CardContent>
    </Card>
  );
};
