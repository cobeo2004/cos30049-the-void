import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { PredictStatistics } from "@/types";

interface PriceStatisticsProps {
  data?: PredictStatistics;
  loading?: boolean;
}

export const PriceStatistics: React.FC<PriceStatisticsProps> = ({
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
          <div className="h-12 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col items-center justify-center">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="h-6 w-6 text-blue-500" />
          <span className="text-2xl font-bold">Predicted Price</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline">
          <span className="text-4xl font-bold text-blue-600">
            EUR{" "}
            {data &&
              data.predictedPrice.toLocaleString("en-AU", {
                minimumFractionDigits: 2,
              })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
