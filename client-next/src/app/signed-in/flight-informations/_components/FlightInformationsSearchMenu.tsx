"use client";

import React, { useState, useEffect } from "react";
import { Plane, ArrowRightLeft, Calendar as CalendarIcon } from "lucide-react";
import { GetDestinationsByRegionNameReturnValue } from "@/server/flight-prices/getDestionations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { getDestinationsByRegionName } from "@/server/flight-prices/getDestionations";
import { getAllAirlines } from "@/server/flight-informations/getAllAirlines";
import { flightInformationsSearchMenuSchema } from "@/server/flight-informations/schema";
import { processFlightInformationsURLParams } from "@/lib/data/processDataHelper";
import { useRouter } from "next/navigation";
import { DateTimePicker } from "@/components/time-picker/date-time-picker";

function FlightInformationsSearchMenu() {
  const router = useRouter();
  const form = useForm<z.infer<typeof flightInformationsSearchMenuSchema>>({
    resolver: zodResolver(flightInformationsSearchMenuSchema),
    defaultValues: {
      stops: "direct",
    },
  });

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

  const debouncedFromQuery = useDebounce(fromQuery, 300);
  const debouncedToQuery = useDebounce(toQuery, 300);

  const { executeAsync: fromSearchDestination } = useAction(
    getDestinationsByRegionName
  );
  const { executeAsync: toSearchDestination } = useAction(
    getDestinationsByRegionName
  );
  const { executeAsync: fetchAirlines } = useAction(getAllAirlines);

  useEffect(() => {
    const loadAirlines = async () => {
      const result = await fetchAirlines();
      if (result && result.data) {
        setAirlines(result.data);
      }
    };
    loadAirlines();
  }, []);

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
        setFromSuggestions([]);
        setShowFromSuggestions(false);
      }
    }
    searchFrom();
  }, [debouncedFromQuery]);

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
        setToSuggestions([]);
        setShowToSuggestions(false);
      }
    }
    searchTo();
  }, [debouncedToQuery]);

  const handleFromSelect = (
    airport: GetDestinationsByRegionNameReturnValue
  ) => {
    form.setValue("from", airport);
    setFromQuery(airport.airport);
    setShowFromSuggestions(false);
    setFromSelected(true);
  };

  const handleToSelect = (airport: GetDestinationsByRegionNameReturnValue) => {
    form.setValue("to", airport);
    setToQuery(airport.airport);
    setShowToSuggestions(false);
    setToSelected(true);
  };

  const onSubmit = (
    values: z.infer<typeof flightInformationsSearchMenuSchema>
  ) => {
    const url = processFlightInformationsURLParams(values);
    router.push(`/signed-in/flight-informations/predictions?${url}`);
  };

  return (
    <div className="max-h-screen h-[90vh] flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-4xl mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0B76B7] to-[#1C5BD9] bg-clip-text text-transparent">
          Utilize AI and see the best flight for your trip.
        </h1>
      </header>
      <main className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                          {fromLoading && (
                            <LoadingComponent
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size="small"
                            />
                          )}
                        </div>
                      </FormControl>
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
                          {toLoading && (
                            <LoadingComponent
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size="small"
                            />
                          )}
                        </div>
                      </FormControl>
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

            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="departDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Depart</FormLabel>
                    <FormControl>
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
