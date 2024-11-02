import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  DollarSign,
  Calendar,
  ArrowUpRight,
  Clock,
} from "lucide-react";
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
          <div className="space-y-6">
            <div className="h-12 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const stats = data || {
    predictedPrice: 980.75,
    confidence: 92,
    priceChange: 5.2,
    lastUpdated: "2 hours ago",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="h-6 w-6 text-blue-500" />
          <span className="text-2xl font-bold">Predicted Price</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Main Price Display */}
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-bold text-blue-600">
              EUR{" "}
              {stats.predictedPrice.toLocaleString("en-AU", {
                minimumFractionDigits: 2,
              })}
            </span>
            <div className="flex items-center text-sm font-medium text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span>+{stats.priceChange}%</span>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            {/* Confidence Score */}
            <div className="space-y-2">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>Confidence</span>
              </div>
              <p className="text-xl font-semibold">{stats.confidence}%</p>
            </div>

            {/* Price Change */}
            <div className="space-y-2">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <ArrowUpRight className="h-4 w-4" />
                <span>Change</span>
              </div>
              <p className="text-xl font-semibold text-green-600">
                +{stats.priceChange}%
              </p>
            </div>

            {/* Last Updated */}
            <div className="space-y-2">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Updated</span>
              </div>
              <p className="text-xl font-semibold">{stats.lastUpdated}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
