"use client";
import React, { useEffect } from "react";
import { FlightCardSkeleton } from "./FlightCardSkeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFlightPrices } from "@/server/flight-prices/getFlightPrices";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export const FlightPricesTable: React.FC = () => {
  const searchParams = useSearchParams();
  const {
    result: { data: flights },
    isExecuting: loading,
    executeAsync,
  } = useAction(getFlightPrices);

  useEffect(() => {
    const doFetching = async () => {
      await executeAsync({
        tripType: searchParams.get("tripType") as "round" | "oneway",
        from: {
          airport: searchParams.get("fromAirport") as string,
          iata: searchParams.get("fromIATA") as string,
        },
        to: {
          airport: searchParams.get("toAirport") as string,
          iata: searchParams.get("toIATA") as string,
        },
        departDate: new Date(searchParams.get("departDate") as string),
        returnDate:
          searchParams.get("returnDate") !== "None"
            ? new Date(searchParams.get("returnDate") as string)
            : undefined,
        adults: searchParams.get("adults") as string,
        children: searchParams.get("children") as string,
        infants: searchParams.get("infants") as string,
      });
    };
    doFetching();
  }, [executeAsync]);

  return (
    <div className="bg-white rounded-lg p-6">
      {loading && !flights ? (
        <>
          <FlightCardSkeleton />
          <FlightCardSkeleton />
          <FlightCardSkeleton />
          <FlightCardSkeleton />
        </>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg p-4">Airline</TableHead>
              <TableHead className="text-lg p-4">Route</TableHead>
              <TableHead className="text-lg p-4">Departure Date</TableHead>
              <TableHead className="text-lg p-4">Departure Time</TableHead>
              <TableHead className="text-lg p-4">Arrival Date</TableHead>
              <TableHead className="text-lg p-4">Arrival Time</TableHead>
              <TableHead className="text-lg p-4">Price</TableHead>
              <TableHead className="text-lg p-4">Source</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flights &&
              flights.best_flights.map((flight, index) => (
                <TableRow key={index} className="border-b pb-4 mb-4">
                  <TableCell className="text-base py-6 px-4">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={flight.flights[0].airline_logo}
                        alt={flight.flights[0].airline}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <span className="font-medium">
                        {flight.flights[0].airline}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-base py-6 px-4">
                    {`${flight.flights[0].departure_airport.id} → ${flight.flights[0].arrival_airport.id}`}
                  </TableCell>
                  <TableCell className="text-base py-6 px-4">
                    {new Date(
                      flight.flights[0].departure_airport.time
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-base py-6 px-4">
                    {new Date(
                      flight.flights[0].departure_airport.time
                    ).toLocaleTimeString()}
                  </TableCell>
                  <TableCell className="text-base py-6 px-4">
                    {new Date(
                      flight.flights[0].arrival_airport.time
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-base py-6 px-4">
                    {new Date(
                      flight.flights[0].arrival_airport.time
                    ).toLocaleTimeString()}
                  </TableCell>
                  <TableCell className="text-base py-6 px-4 font-medium text-green-600">
                    $
                    {String(flight.price) +
                      " " +
                      flights.search_parameters.currency}
                  </TableCell>
                  <TableCell className="text-base py-6">
                    <div className="flex items-center space-x-2">
                      <Image
                        src="https://surdeepsingh.com/wp-content/uploads/2024/01/google-flights-logo.webp"
                        alt="Google Logo"
                        width={100}
                        height={50}
                        className="object-contain"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="py-6 px-4">
                    <Link href={flights.search_metadata.google_flights_url}>
                      <Button
                        variant="outline"
                        className="bg-blue-500 text-white px-6 py-3 text-base rounded-md hover:bg-blue-600 transition-colors"
                      >
                        Book Now!
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
