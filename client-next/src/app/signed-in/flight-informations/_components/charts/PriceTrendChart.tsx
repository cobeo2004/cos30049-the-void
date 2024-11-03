/**
* @file PriceTrendChart.tsx
* @author Xuan Tuan Minh Nguyen, Trong Dat Hoang,
* Henry Nguyen
* @description React component for displaying a price trend analysis chart using Plotly.
*/

import React from "react";
// Import custom UI components for card layout
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Import Plotly chart component
import Plot from "react-plotly.js";
// Import type definitions
import { PredictTrendData } from "@/types";

// Define the props interface for the component
interface PriceTrendChartProps {
  data?: Array<PredictTrendData | null>;
  loading?: boolean;
}

// Define the PriceTrendChart functional component
export const PriceTrendChart: React.FC<PriceTrendChartProps> = ({
  data,
  loading,
}) => {
  // Render a loading state if data is still being fetched
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {/* Placeholder for the card title during loading */}
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Placeholder for the chart content during loading */}
          <div className="h-[300px] bg-gray-100 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  // Render the chart once data is available
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      {/* Card header with title */}
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-2xl font-semibold text-gray-800">
          Price Trend Analysis
        </CardTitle>
      </CardHeader>
      {/* Card content containing the chart */}
      <CardContent className="pt-6">
        <div className="h-[300px]">
          {data && (
            <Plot
              // Define the data for the Plotly chart
              data={[
                {
                  // Extract months for the x-axis
                  x: data.map((d) => d!.month),
                  // Extract prices for the y-axis
                  y: data.map((d) => d!.price),
                  type: "scatter",
                  mode: "lines+markers",
                  name: "Price",
                  // Customize the line color
                  line: { color: "#2563eb" },
                },
              ]}
              // Configure the layout of the chart
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
                // Set titles for the axes
                xaxis: { title: "Month" },
                yaxis: { title: "Price (AUD)" },
              }}
              // Set the size and responsiveness of the chart
              style={{ width: "100%", height: 300 }}
              config={{ responsive: true }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
