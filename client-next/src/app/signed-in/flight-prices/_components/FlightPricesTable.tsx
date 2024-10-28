"use client";
import React, { useEffect } from "react";
import { Plane } from "lucide-react";
import { FlightCardSkeleton } from "./FlightCardSkeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchFlights } from "@/server/flight-prices/getFlightPrices";
import { useAction } from "next-safe-action/hooks";

export const FlightPricesTable: React.FC = () => {
  const {
    result: { data: flights },
    isExecuting: loading,
    executeAsync,
  } = useAction(fetchFlights);

  useEffect(() => {
    const doFetching = async () => {
      await executeAsync();
    };
    doFetching();
  }, [executeAsync]);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {loading && !flights ? (
        <div className="p-4">
          <FlightCardSkeleton />
          <FlightCardSkeleton />
          <FlightCardSkeleton />
          <FlightCardSkeleton />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg">Airline</TableHead>
              <TableHead className="text-lg">Route</TableHead>
              <TableHead className="text-lg">Date</TableHead>
              <TableHead className="text-lg">Price</TableHead>
              <TableHead className="text-lg">Source</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flights &&
              flights.map((flight) => (
                <TableRow key={flight.id}>
                  <TableCell className="text-base py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                        <Plane className="text-sky-500" size={24} />
                      </div>
                      <span className="font-medium">{flight.airline}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-base py-4">
                    {flight.route}
                  </TableCell>
                  <TableCell className="text-base py-4">
                    {flight.date}
                  </TableCell>
                  <TableCell className="text-base py-4 font-medium text-green-600">
                    {flight.price}
                  </TableCell>
                  <TableCell className="text-base py-4">
                    {flight.source}
                  </TableCell>
                  <TableCell className="py-4">
                    <button className="bg-blue-500 text-white px-6 py-3 text-base rounded-md hover:bg-blue-600 transition-colors">
                      Book Now!
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
