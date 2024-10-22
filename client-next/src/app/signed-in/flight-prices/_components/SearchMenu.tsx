"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Plane, Calendar, Users, ArrowRightLeft, Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

// Simulated airport data
const airports = [
  { code: "JFK", name: "John F. Kennedy International Airport" },
  { code: "LHR", name: "London Heathrow Airport" },
  { code: "CDG", name: "Charles de Gaulle Airport" },
  { code: "LAX", name: "Los Angeles International Airport" },
  { code: "DXB", name: "Dubai International Airport" },
  { code: "HND", name: "Tokyo Haneda Airport" },
  { code: "SIN", name: "Singapore Changi Airport" },
  { code: "AMS", name: "Amsterdam Airport Schiphol" },
  { code: "FRA", name: "Frankfurt Airport" },
  { code: "IST", name: "Istanbul Airport" },
];

// Simulated API call
const searchAirports = (query: string): Promise<typeof airports> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = airports.filter(
        (airport) =>
          airport.name.toLowerCase().includes(query.toLowerCase()) ||
          airport.code.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 500); // Simulate network delay
  });
};

function SearchPage() {
  const [tripType, setTripType] = useState("round");
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState<typeof airports>([]);
  const [toSuggestions, setToSuggestions] = useState<typeof airports>([]);
  const [fromLoading, setFromLoading] = useState(false);
  const [toLoading, setToLoading] = useState(false);
  const [selectedFrom, setSelectedFrom] = useState<(typeof airports)[0] | null>(
    null
  );
  const [selectedTo, setSelectedTo] = useState<(typeof airports)[0] | null>(
    null
  );

  const debouncedFromQuery = useDebounce(fromQuery, 300);
  const debouncedToQuery = useDebounce(toQuery, 300);

  const performSearch = useCallback(
    async (
      query: string,
      setLoading: React.Dispatch<React.SetStateAction<boolean>>,
      setSuggestions: React.Dispatch<React.SetStateAction<typeof airports>>
    ) => {
      if (query) {
        setLoading(true);
        const results = await searchAirports(query);
        setSuggestions(results);
        setLoading(false);
      } else {
        setSuggestions([]);
      }
    },
    []
  );

  useEffect(() => {
    performSearch(debouncedFromQuery, setFromLoading, setFromSuggestions);
  }, [debouncedFromQuery, performSearch]);

  useEffect(() => {
    performSearch(debouncedToQuery, setToLoading, setToSuggestions);
  }, [debouncedToQuery, performSearch]);

  const handleFromSelect = (airport: (typeof airports)[0]) => {
    setSelectedFrom(airport);
    setFromQuery(airport.name);
    setFromSuggestions([]);
  };

  const handleToSelect = (airport: (typeof airports)[0]) => {
    setSelectedTo(airport);
    setToQuery(airport.name);
    setToSuggestions([]);
  };

  return (
    // <div className="min-h-screen bg-gradient-to-b from-sky-400 to-sky-200 flex flex-col items-center justify-center p-4">
    <div className="max-h-screen h-[90vh] flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-4xl mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0B76B7] to-[#1C5BD9] bg-clip-text text-transparent">
          Catch up with the cheapest flight prices.
        </h1>
      </header>
      <main className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-start mb-4">
          <button
            className={`mr-4 px-4 py-2 rounded-full ${
              tripType === "round"
                ? "bg-sky-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setTripType("round")}
          >
            Round Trip
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              tripType === "oneway"
                ? "bg-sky-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setTripType("oneway")}
          >
            One Way
          </button>
        </div>
        <form className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From
              </label>
              <div className="relative">
                <Plane
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Departure City"
                  value={fromQuery}
                  onChange={(e) => setFromQuery(e.target.value)}
                />
                {fromLoading && (
                  <Loader2
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 animate-spin"
                    size={20}
                  />
                )}
              </div>
              {fromSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
                  {fromSuggestions.map((airport) => (
                    <li
                      key={airport.code}
                      className="px-4 py-2 hover:bg-sky-100 cursor-pointer"
                      onClick={() => handleFromSelect(airport)}
                    >
                      {airport.name} ({airport.code})
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex-1 relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <div className="relative">
                <Plane
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Arrival City"
                  value={toQuery}
                  onChange={(e) => setToQuery(e.target.value)}
                />
                {toLoading && (
                  <Loader2
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 animate-spin"
                    size={20}
                  />
                )}
              </div>
              {toSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
                  {toSuggestions.map((airport) => (
                    <li
                      key={airport.code}
                      className="px-4 py-2 hover:bg-sky-100 cursor-pointer"
                      onClick={() => handleToSelect(airport)}
                    >
                      {airport.name} ({airport.code})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Depart
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="date"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
            {tripType === "round" && (
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Return
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="date"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Passengers
              </label>
              <div className="relative">
                <Users
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 appearance-none">
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>3 Adults</option>
                  <option>4 Adults</option>
                </select>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Children
              </label>
              <div className="relative">
                <Users
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 appearance-none">
                  <option>0 Children</option>
                  <option>1 Child</option>
                  <option>2 Children</option>
                  <option>3 Children</option>
                </select>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Infants
              </label>
              <div className="relative">
                <Users
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 appearance-none">
                  <option>0 Infants</option>
                  <option>1 Infant</option>
                  <option>2 Infants</option>
                </select>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-3 px-4 rounded-md hover:bg-sky-600 transition duration-300 flex items-center justify-center"
          >
            <ArrowRightLeft className="mr-2" size={20} />
            Search Flights
          </button>
        </form>
      </main>
    </div>
  );
}

export default SearchPage;
