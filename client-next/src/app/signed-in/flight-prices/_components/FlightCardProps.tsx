import React from "react";
import { Plane } from "lucide-react";

interface FlightCardProps {
  airline: string;
  route: string;
  date: string;
  price: string;
  source: string;
}

export const FlightCard: React.FC<FlightCardProps> = ({
  airline,
  route,
  date,
  price,
  source,
}) => {
  return (
    <div className="bg-white rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
            <Plane className="text-sky-500" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{airline}</h3>
            <p className="text-sm text-gray-600">{route}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">{date}</p>
          <p className="font-bold text-green-600">{price}</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">{source}</span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Book Now!
          </button>
        </div>
      </div>
    </div>
  );
};
