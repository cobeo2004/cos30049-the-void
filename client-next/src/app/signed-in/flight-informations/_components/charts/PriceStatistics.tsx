import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Calendar, ArrowUpRight } from "lucide-react";
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
          <div className="grid grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const stats = data || {
    averagePrice: 980.75,
    priceChange: 5.2,
    lowestPrice: 720,
    bestTime: "October",
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-2xl font-semibold text-gray-800">
          Price Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <DollarSign className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Average Price</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              AUD {stats.averagePrice.toLocaleString()}
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="font-medium">Price Change</span>
            </div>
            <p className="text-3xl font-bold text-green-600 flex items-center">
              +{stats.priceChange}%
              <ArrowUpRight className="h-5 w-5 ml-2" />
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <DollarSign className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Lowest Price</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              AUD {stats.lowestPrice.toLocaleString()}
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Best Time to Book</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.bestTime}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
