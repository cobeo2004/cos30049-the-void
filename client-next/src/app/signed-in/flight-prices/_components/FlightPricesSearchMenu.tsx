"use client";

import React, { useState, useEffect } from "react";
import { Plane, Calendar, ArrowRightLeft } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { GetDestinationsByRegionNameReturnValue } from "@/server/flight-prices/getDestionations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import LoadingComponent from "@/app/(auth)/_components/loading";
import { useAction } from "next-safe-action/hooks";
import { getDestinationsByRegionName } from "@/server/flight-prices/getDestionations";
import { flightPricesSearchMenuSchema } from "@/server/flight-prices/schema";
import { useRouter } from "next/navigation";
import { processFlightPricesURLParams } from "@/lib/data/processDataHelper";

function FlightPricesSearchMenu() {
  const form = useForm<z.infer<typeof flightPricesSearchMenuSchema>>({
    resolver: zodResolver(flightPricesSearchMenuSchema),
    defaultValues: {
      tripType: "round",
      adults: "1 Adult",
      children: "0 Children",
      infants: "0 Infants",
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

  const router = useRouter();

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

  function onSubmit(values: z.infer<typeof flightPricesSearchMenuSchema>) {
    const urlParams = processFlightPricesURLParams(values);
    router.push(`/signed-in/flight-prices/prices?${urlParams}`);
  }

  return (
    <div className="max-h-screen h-[90vh] flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-4xl mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0B76B7] to-[#1C5BD9] bg-clip-text text-transparent">
          Catch up with the cheapest flight prices.
        </h1>
      </header>
      <main className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-start mb-4">
          <Button
            variant={form.watch("tripType") === "round" ? "default" : "outline"}
            className={cn(
              "mr-4",
              form.watch("tripType") === "round" &&
                "bg-gradient-to-t from-[#8BDFFF] from-0% via-[#18BFFF] via-53% to-[#0B76B7] to-100% text-primary-foreground"
            )}
            onClick={() => form.setValue("tripType", "round")}
          >
            Round Trip
          </Button>
          <Button
            variant={
              form.watch("tripType") === "oneway" ? "default" : "outline"
            }
            className={cn(
              form.watch("tripType") === "oneway" &&
                "bg-gradient-to-t from-[#8BDFFF] from-0% via-[#18BFFF] via-53% to-[#0B76B7] to-100% text-primary-foreground"
            )}
            onClick={() => form.setValue("tripType", "oneway")}
          >
            One Way
          </Button>
        </div>

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
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="departDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Depart</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>

              {form.watch("tripType") === "round" && (
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="returnDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Return</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <Calendar className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="adults"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adults</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select adults" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1 Adult">1 Adult</SelectItem>
                          <SelectItem value="2 Adults">2 Adults</SelectItem>
                          <SelectItem value="3 Adults">3 Adults</SelectItem>
                          <SelectItem value="4 Adults">4 Adults</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="children"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Children</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select children" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0 Children">0 Children</SelectItem>
                          <SelectItem value="1 Child">1 Child</SelectItem>
                          <SelectItem value="2 Children">2 Children</SelectItem>
                          <SelectItem value="3 Children">3 Children</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="infants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Infants</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select infants" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0 Infants">0 Infants</SelectItem>
                          <SelectItem value="1 Infant">1 Infant</SelectItem>
                          <SelectItem value="2 Infants">2 Infants</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-t from-[#8BDFFF] from-0% via-[#18BFFF] via-53% to-[#0B76B7] to-100% text-primary-foreground"
            >
              <ArrowRightLeft className="mr-2" size={20} />
              Search Flights
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
}

export default FlightPricesSearchMenu;
