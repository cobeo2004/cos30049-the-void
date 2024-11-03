/**
 * @file FlightInformationsSearchMenu.tsx
 * @author
 * Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description React component for searching flight information with advanced filters and date pickers.
 */

"use client";

import React, { useState, useEffect } from "react";
// Import icons from lucide-react library
import { Plane, ArrowRightLeft } from "lucide-react";
// Import type definitions for destination data
import { GetDestinationsByRegionNameReturnValue } from "@/server/flight-prices/getDestionations";
// Import form handling and validation libraries
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
// Import utility functions and components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
import LoadingComponent from "@/app/(auth)/_components/loading";
import { useAction } from "next-safe-action/hooks";
// Import server actions for fetching data
import { getDestinationsByRegionName } from "@/server/flight-prices/getDestionations";
import { getAllAirlines } from "@/server/flight-informations/getAllAirlines";
// Import validation schema and helper functions
import { flightInformationsSearchMenuSchema } from "@/server/flight-informations/schema";
import { processFlightInformationsURLParams } from "@/lib/data/processDataHelper";
import { useRouter } from "next/navigation";
import { DateTimePicker } from "@/components/time-picker/date-time-picker";

function FlightInformationsSearchMenu() {
  // Initialize Next.js router for navigation
  const router = useRouter();
  // Initialize form with validation using react-hook-form and zod
  const form = useForm<z.infer<typeof flightInformationsSearchMenuSchema>>({
    resolver: zodResolver(flightInformationsSearchMenuSchema),
    defaultValues: {
      stops: "direct",
    },
  });

  // State variables for managing form inputs and suggestions
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState<
    GetDestinationsByRegionNameReturnValue[]
  >([]);
  const [toSuggestions, setToSuggestions] = useState<
    GetDestinationsByRegionNameReturnValue[]
  >([]);
  const [airlines, setAirlines] = useState<string[]>([]);
  const [fromLoading, setFromLoading] = useState(false);
  const [toLoading, setToLoading] = useState(false);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [fromSelected, setFromSelected] = useState(false);
  const [toSelected, setToSelected] = useState(false);

  // Debounce the input queries to avoid excessive API calls
  const debouncedFromQuery = useDebounce(fromQuery, 300);
  const debouncedToQuery = useDebounce(toQuery, 300);

  // Initialize server actions for fetching destinations and airlines
  const { executeAsync: fromSearchDestination } = useAction(
    getDestinationsByRegionName
  );
  const { executeAsync: toSearchDestination } = useAction(
    getDestinationsByRegionName
  );
  const { executeAsync: fetchAirlines } = useAction(getAllAirlines);

  // Fetch the list of airlines on component mount
  useEffect(() => {
    const loadAirlines = async () => {
      const result = await fetchAirlines();
      if (result && result.data) {
        setAirlines(result.data);
      }
    };
    loadAirlines();
  }, []);

  // Effect to search for departure airports based on user input
  useEffect(() => {
    async function searchFrom() {
      if (debouncedFromQuery) {
        setFromLoading(true);
        const fromSearchResult = await fromSearchDestination({
          q: debouncedFromQuery,
        });
        if (fromSearchResult && fromSearchResult.data) {
          setFromSuggestions(fromSearchResult.data);
          setShowFromSuggestions(true);
        }
        setFromLoading(false);
      } else {
        // Clear suggestions if query is empty
        setFromSuggestions([]);
        setShowFromSuggestions(false);
      }
    }
    searchFrom();
  }, [debouncedFromQuery]);

  // Effect to search for arrival airports based on user input
  useEffect(() => {
    async function searchTo() {
      if (debouncedToQuery) {
        setToLoading(true);
        const toSearchResult = await toSearchDestination({
          q: debouncedToQuery,
        });
        if (toSearchResult && toSearchResult.data) {
          setToSuggestions(toSearchResult.data);
          setShowToSuggestions(true);
        }
        setToLoading(false);
      } else {
        // Clear suggestions if query is empty
        setToSuggestions([]);
        setShowToSuggestions(false);
      }
    }
    searchTo();
  }, [debouncedToQuery]);

  // Handle selection of a departure airport from suggestions
  const handleFromSelect = (
    airport: GetDestinationsByRegionNameReturnValue
  ) => {
    form.setValue("from", airport);
    setFromQuery(airport.airport);
    setShowFromSuggestions(false);
    setFromSelected(true);
  };

  // Handle selection of an arrival airport from suggestions
  const handleToSelect = (airport: GetDestinationsByRegionNameReturnValue) => {
    form.setValue("to", airport);
    setToQuery(airport.airport);
    setShowToSuggestions(false);
    setToSelected(true);
  };

  // Handle form submission
  const onSubmit = (
    values: z.infer<typeof flightInformationsSearchMenuSchema>
  ) => {
    // Process form values into URL parameters
    const url = processFlightInformationsURLParams(values);
    // Navigate to the predictions page with query parameters
    router.push(`/signed-in/flight-informations/predictions?${url}`);
  };

  return (
    <div className="max-h-screen h-[90vh] flex flex-col items-center justify-center p-4">
      {/* Header with title */}
      <header className="w-full max-w-4xl mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0B76B7] to-[#1C5BD9] bg-clip-text text-transparent">
          Utilize AI and see the best flight for your trip.
        </h1>
      </header>
      {/* Main content area with the search form */}
      <main className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Row for 'From' and 'To' airport inputs */}
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <FormField
                  control={form.control}
                  name="from"
                  render={() => (
                    <FormItem>
                      <FormLabel>From</FormLabel>
                      <FormControl>
                        <div className="relative">
                          {/* Plane icon inside the input field */}
                          <Plane
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <Input
                            placeholder="Departure City"
                            value={fromQuery}
                            onChange={(e) => {
                              setFromQuery(e.target.value);
                              setShowFromSuggestions(true);
                              setFromSelected(false);
                            }}
                            onFocus={() => {
                              setShowFromSuggestions(true);
                            }}
                            className="pl-10"
                          />
                          {/* Loading indicator while fetching suggestions */}
                          {fromLoading && (
                            <LoadingComponent
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size="small"
                            />
                          )}
                        </div>
                      </FormControl>
                      {/* Display suggestions dropdown if available */}
                      {!fromSelected &&
                        showFromSuggestions &&
                        fromSuggestions.length > 0 && (
                          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
                            {fromSuggestions.map((airport) => (
                              <li
                                key={airport.iata}
                                className="px-4 py-2 hover:bg-sky-100 cursor-pointer"
                                onClick={() => handleFromSelect(airport)}
                              >
                                {airport.airport} ({airport.iata})
                              </li>
                            ))}
                          </ul>
                        )}
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex-1 relative">
                <FormField
                  control={form.control}
                  name="to"
                  render={() => (
                    <FormItem>
                      <FormLabel>To</FormLabel>
                      <FormControl>
                        <div className="relative">
                          {/* Plane icon inside the input field */}
                          <Plane
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <Input
                            placeholder="Arrival City"
                            value={toQuery}
                            onChange={(e) => {
                              setToQuery(e.target.value);
                              setShowToSuggestions(true);
                              setToSelected(false);
                            }}
                            onFocus={() => {
                              setShowToSuggestions(true);
                            }}
                            className="pl-10"
                          />
                          {/* Loading indicator while fetching suggestions */}
                          {toLoading && (
                            <LoadingComponent
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size="small"
                            />
                          )}
                        </div>
                      </FormControl>
                      {/* Display suggestions dropdown if available */}
                      {!toSelected &&
                        showToSuggestions &&
                        toSuggestions.length > 0 && (
                          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
                            {toSuggestions.map((airport) => (
                              <li
                                key={airport.iata}
                                className="px-4 py-2 hover:bg-sky-100 cursor-pointer"
                                onClick={() => handleToSelect(airport)}
                              >
                                {airport.airport} ({airport.iata})
                              </li>
                            ))}
                          </ul>
                        )}
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Row for date and time pickers */}
            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="departDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Depart</FormLabel>
                    <FormControl>
                      {/* Date and time picker for departure */}
                      <DateTimePicker
                        value={field.value}
                        onChange={field.onChange}
                        hourCycle={24}
                        placeholder="Pick departure date & time"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="arriveDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Arrive</FormLabel>
                    <FormControl>
                      {/* Date and time picker for arrival */}
                      <DateTimePicker
                        value={field.value}
                        onChange={field.onChange}
                        hourCycle={24}
                        placeholder="Pick arrival date & time"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Row for number of stops and preferred airline */}
            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="stops"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Number of Stops</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select number of stops" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* Options for number of stops */}
                        <SelectItem value="direct">Direct Flight</SelectItem>
                        <SelectItem value="1">One Stop</SelectItem>
                        <SelectItem value="2">Two Stops</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="airline"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Preferred Airline</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select airline" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* Dynamically generated list of airlines */}
                        {airlines.map((airline) => (
                          <SelectItem key={airline} value={airline}>
                            {airline}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            {/* Submit button to start prediction */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-t from-[#8BDFFF] from-0% via-[#18BFFF] via-53% to-[#0B76B7] to-100% text-primary-foreground"
            >
              <ArrowRightLeft className="mr-2" size={20} />
              Start Prediction
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
}

export default FlightInformationsSearchMenu;
