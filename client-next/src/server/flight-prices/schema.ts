/**
 * @file schema.ts
 * @author
 *   Xuan Tuan Minh Nguyen,
 *   Trong Dat Hoang,
 *   Henry Nguyen
 * @description Defines schemas for validating flight destination queries and
 * flight price search inputs using the Zod validation library.
 */

import { z } from "zod";

// Schema for validating the query when fetching destinations by region name
export const getDestinationsByRegionNameSchema = z.object({
  // 'q' is the query string representing the region name to search for
  q: z.string(),
});

// Schema for validating flight price search inputs
export const flightPricesSearchMenuSchema = z.object({
  // 'tripType' specifies the type of trip; allowed values are 'round' or 'oneway'
  tripType: z.enum(["round", "oneway"]),
  // 'from' contains details about the departure location
  from: z.object({
    // 'airport' is the name of the departure airport
    airport: z.string(),
    // 'iata' is the IATA code of the departure airport
    iata: z.string(),
  }),
  // 'to' contains details about the arrival location
  to: z.object({
    // 'airport' is the name of the arrival airport
    airport: z.string(),
    // 'iata' is the IATA code of the arrival airport
    iata: z.string(),
  }),
  // 'departDate' is the departure date; must be a valid Date object
  departDate: z.date(),
  // 'returnDate' is the return date for round trips; it's optional
  returnDate: z.date().optional(),
  // 'adults' represents the number of adult passengers as a string
  adults: z.string(),
  // 'children' represents the number of child passengers as a string
  children: z.string(),
  // 'infants' represents the number of infant passengers as a string
  infants: z.string(),
});
