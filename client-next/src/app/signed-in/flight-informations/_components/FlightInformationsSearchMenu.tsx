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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePicker } from "@/components/time-picker/time-picker";
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

// Form schema
const formSchema = z.object({
  from: z.object({
    airport: z.string().min(1, "Departure city is required"),
    iata: z.string(),
    icao: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
  to: z.object({
    airport: z.string().min(1, "Arrival city is required"),
    iata: z.string(),
    icao: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
  departDate: z.date({
    required_error: "Departure date is required",
  }),
  returnDate: z.date({
    required_error: "Return date is required",
  }),
  stops: z.enum(["direct", "one", "two"]),
});

function FlightInformationsSearchMenu() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
  const [fromLoading, setFromLoading] = useState(false);
  const [toLoading, setToLoading] = useState(false);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [fromSelected, setFromSelected] = useState(false);
  const [toSelected, setToSelected] = useState(false);

  const debouncedFromQuery = useDebounce(fromQuery, 300);
  const debouncedToQuery = useDebounce(toQuery, 300);

  const { executeAsync: fromSearchDestination, result: fromSearchResult } =
    useAction(getDestinationsByRegionName);
  const { executeAsync: toSearchDestination, result: toSearchResult } =
    useAction(getDestinationsByRegionName);

  useEffect(() => {
    async function searchFrom() {
      if (debouncedFromQuery) {
        setFromLoading(true);
        await fromSearchDestination({ q: debouncedFromQuery });
        if (fromSearchResult.data) {
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
        await toSearchDestination({ q: debouncedToQuery });
        if (toSearchResult.data) {
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
                    <Popover>
                      <FormControl>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP HH:mm:ss")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                      </FormControl>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                        <div className="p-3 border-t border-border">
                          <TimePicker
                            setDate={field.onChange}
                            date={field.value}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="returnDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Return</FormLabel>
                    <Popover>
                      <FormControl>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP HH:mm:ss")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                      </FormControl>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                        <div className="p-3 border-t border-border">
                          <TimePicker
                            setDate={field.onChange}
                            date={field.value}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>

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
                      <SelectItem value="one">One Stop</SelectItem>
                      <SelectItem value="two">Two Stops</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

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
