import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="demand"
                stackId="1"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="price"
                stackId="2"
                stroke="#06b6d4"
                fill="#06b6d4"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
