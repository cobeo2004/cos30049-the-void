/**
 * @file PriceStatistics.tsx
 * @author
 * Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description Defines the PriceStatistics component that displays the predicted price or a loading state.
 */

import React from "react"; // Import React library for building UI components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Import Card components for layout
import { DollarSign } from "lucide-react"; // Import DollarSign icon for visual representation
import { PredictStatistics } from "@/types"; // Import the type definition for prediction data

// Define the props interface for the PriceStatistics component
interface PriceStatisticsProps {
  data?: PredictStatistics; // Optional data prop containing the predicted price
  loading?: boolean; // Optional loading prop indicating if data is being fetched
}

// Define and export the PriceStatistics functional component
export const PriceStatistics: React.FC<PriceStatisticsProps> = ({
  data,
  loading,
}) => {
  // Check if the component is in a loading state
  if (loading) {
    // Render a skeleton UI to indicate loading
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {/* Placeholder for the title while loading */}
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Placeholder for the content while loading */}
          <div className="h-12 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  // Render the predicted price once loading is complete
  return (
    <Card className="flex flex-col items-center justify-center">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {/* Display a dollar sign icon */}
          <DollarSign className="h-6 w-6 text-blue-500" />
          {/* Display the title "Predicted Price" */}
          <span className="text-2xl font-bold">Predicted Price</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline">
          {/* Display the predicted price formatted as currency */}
          <span className="text-4xl font-bold text-blue-600">
            EUR{" "}
            {data &&
              data.predictedPrice.toLocaleString("en-AU", {
                minimumFractionDigits: 2, // Ensure two decimal places
              })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
