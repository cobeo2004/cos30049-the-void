/**
 * @file FlightPricesTable.tsx
 * @author Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description Component for displaying flight search results in a table format
 * with booking functionality and responsive design
 */

"use client";
import React, { useEffect, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const FlightPricesTable: React.FC = () => {
  const searchParams = useSearchParams();
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");

  const {
    result: { data: flights, serverError },
    isExecuting: loading,
    executeAsync,
    hasErrored,
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

  const handleBookNowClick = (url: string) => {
    setRedirectUrl(url);
    setShowRedirectModal(true);
  };

  const handleRedirectConfirm = () => {
    window.open(redirectUrl, "_blank");
    setShowRedirectModal(false);
  };

  if (hasErrored || (serverError && !flights)) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center min-h-[400px]">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Oops!</h2>
            <h3 className="text-lg font-medium text-gray-800">
              <span className="text-red-600">Error:</span> Something went wrong
            </h3>
            <p className="text-gray-600">
              {serverError || "An error occurred while fetching flight prices"}
            </p>
            <Link href="/signed-in/flight-prices">
              <Button className="mt-8 bg-gradient-to-t from-[#8BDFFF] from-0% via-[#18BFFF] via-53% to-[#0B76B7] to-100% text-primary-foreground">
                Try Again
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <Dialog open={showRedirectModal} onOpenChange={setShowRedirectModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>External Redirect</DialogTitle>
            <DialogDescription>
              You are about to be redirected to an external website (Google
              Flights). Do you want to proceed?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowRedirectModal(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleRedirectConfirm}>Proceed</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
                    <Button
                      variant="outline"
                      className="bg-blue-500 text-white px-6 py-3 text-base rounded-md hover:bg-blue-600 transition-colors"
                      onClick={() =>
                        handleBookNowClick(
                          flights.search_metadata.google_flights_url
                        )
                      }
                    >
                      Book Now!
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
