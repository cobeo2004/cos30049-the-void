import React from "react";

export const FlightCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse" />
          <div>
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-3" />
            <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="text-right">
          <div className="h-5 w-36 bg-gray-200 rounded animate-pulse mb-3" />
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="text-right">
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-3" />
          <div className="h-6 w-28 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex items-center space-x-4">
          <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
          <div className="h-12 w-32 bg-gray-200 rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  );
};
