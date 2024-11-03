/**
 * @file PriceDistributionChart.tsx
 * @author Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description A component that visualizes flight price distribution data using a bar chart.
 * It includes a loading state with skeleton animation and a responsive chart layout.
 * The component uses react-plotly.js for data visualization and implements shadcn/ui
 * Card components for consistent styling.
 */

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Plot from "react-plotly.js";
import { PredictDistributionData } from "@/types";

/**
 * Interface for the PriceDistributionChart component props
 * @interface
 * @property {Array<PredictDistributionData | null>} data - Optional array of price distribution data
 * @property {boolean} loading - Optional flag to indicate loading state
 */
interface PriceDistributionChartProps {
  data?: Array<PredictDistributionData | null>;
  loading?: boolean;
}

/**
 * Component that renders a bar chart showing flight price distribution
 * Includes loading state with skeleton UI and responsive chart layout
 * 
 * @param {PriceDistributionChartProps} props - Component props
 * @param {Array<PredictDistributionData | null>} props.data - Price distribution data array
 * @param {boolean} props.loading - Loading state flag
 * @returns {JSX.Element} A card containing either a loading skeleton or the price distribution chart
 */
export const PriceDistributionChart: React.FC<PriceDistributionChartProps> = ({
  data,
  loading,
}) => {
  // Render loading skeleton when in loading state
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {/* Animated loading skeleton for title */}
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Animated loading skeleton for chart area */}
          <div className="h-[300px] bg-gray-100 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  // Render actual chart when data is available
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-2xl font-semibold text-gray-800">
          Price Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px]">
          {/* Render Plotly chart when data is available */}
          {data && (
            <Plot
              // Configure chart data
              data={[
                {
                  x: data.map((d) => d!.range), // Price ranges on x-axis
                  y: data.map((d) => d!.count), // Flight counts on y-axis
                  type: "bar",
                  marker: { color: "#3b82f6" }, // Blue bars
                },
              ]}
              // Configure chart layout
              layout={{
                autosize: true,
                margin: { l: 50, r: 20, t: 20, b: 40 }, // Chart margins
                showlegend: false,
                xaxis: { title: "Price Range (AUD)" },
                yaxis: { title: "Number of Flights" },
              }}
              // Make chart responsive
              style={{ width: "100%", height: 300 }}
              config={{ responsive: true }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};