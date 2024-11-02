import { z } from "zod";

export const getDestinationsByRegionNameSchema = z.object({
  q: z.string(),
});

export const flightPricesSearchMenuSchema = z.object({
  tripType: z.enum(["round", "oneway"]),
  from: z.object({
    airport: z.string(),
    iata: z.string(),
  }),
  to: z.object({
    airport: z.string(),
    iata: z.string(),
  }),
  departDate: z.date(),
  returnDate: z.date().optional(),
  adults: z.string(),
  children: z.string(),
  infants: z.string(),
});
