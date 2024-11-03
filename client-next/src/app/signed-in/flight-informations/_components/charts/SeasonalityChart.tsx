/**
 * @file SeasonalityChart.tsx
 * @author
 * Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description React component for displaying seasonality analysis using Plotly charts.
 */

import React from "react";
// Import custom UI components for the card layout
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Import Plotly chart component
import Plot from "react-plotly.js";
// Import type definitions for seasonality data
import { PredictSeasonalityData } from "@/types";

// Define the props interface for the SeasonalityChart component
interface SeasonalityChartProps {
  data?: Array<PredictSeasonalityData | null>;
  loading?: boolean;
}

// Define the SeasonalityChart functional component
export const SeasonalityChart: React.FC<SeasonalityChartProps> = ({
  data,
  loading,
}) => {
  // Check if the data is still loading
  if (loading) {
    // Render a loading placeholder if data is not yet available
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
          Seasonality Analysis
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
                  // Extract months for the x-axis (demand)
                  x: data.map((d) => d!.month),
                  // Extract demand values for the y-axis
                  y: data.map((d) => d!.demand),
                  type: "scatter",
                  mode: "lines+markers",
                  name: "Demand",
                  // Fill area under the curve to zero
                  fill: "tozeroy",
                  // Customize the line color for demand
                  line: { color: "#8b5cf6" },
                },
                {
                  // Extract months for the x-axis (price)
                  x: data!.map((d) => d!.month),
                  // Extract price values for the y-axis
                  y: data!.map((d) => d!.price),
                  type: "scatter",
                  mode: "lines+markers",
                  name: "Price",
                  // Assign this trace to a secondary y-axis
                  yaxis: "y2",
                  // Customize the line color for price
                  line: { color: "#06b6d4" },
                },
              ]}
              // Configure the layout of the chart
              layout={{
                autosize: true,
                margin: { l: 50, r: 50, t: 20, b: 40 },
                showlegend: true,
                legend: { orientation: "h", y: -0.2 },
                // Configure x-axis properties
                xaxis: { title: "Month" },
                // Configure primary y-axis properties
                yaxis: { title: "Demand Index" },
                // Configure secondary y-axis properties
                yaxis2: {
                  title: "Price (AUD)",
                  overlaying: "y", // Overlay on the same x-axis
                  side: "right",   // Position on the right side
                },
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
