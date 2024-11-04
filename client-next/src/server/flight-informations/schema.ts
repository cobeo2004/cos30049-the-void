/**
 * @file schema.ts
 * @author Xuan Tuan Minh Nguyen, Trong Dat Hoang,
 * Henry Nguyen
 * @description Defines the schema for validating flight information
 * search inputs using Zod validation library.
 */

import { z } from "zod";

// Define the schema for the flight information search menu
export const flightInformationsSearchMenuSchema = z.object({
  // 'from' represents the departure location details
  from: z.object({
    // 'airport' is a required string; it must have at least one character
    airport: z.string().min(1, "Departure city is required"),
    // 'iata' is a string for the IATA code of the departure airport
    iata: z.string(),
  }),
  // 'to' represents the arrival location details
  to: z.object({
    // 'airport' is a required string; it must have at least one character
    airport: z.string().min(1, "Arrival city is required"),
    // 'iata' is a string for the IATA code of the arrival airport
    iata: z.string(),
  }),
  // 'departDate' is a required date object for the departure date
  departDate: z.date({
    required_error: "Departure date is required",
  }),
  // 'arriveDate' is a required date object for the return date
  arriveDate: z.date({
    required_error: "Return date is required",
  }),
  // 'stops' indicates the number of stops; it can be 'direct', '1', or '2'
  stops: z.enum(["direct", "1", "2"]),
  // 'airline' is a required string; it must have at least one character
  airline: z.string().min(1, "Airline is required"),
});
