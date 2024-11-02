import { z } from "zod";

export const flightInformationsSearchMenuSchema = z.object({
  from: z.object({
    airport: z.string().min(1, "Departure city is required"),
    iata: z.string(),
  }),
  to: z.object({
    airport: z.string().min(1, "Arrival city is required"),
    iata: z.string(),
  }),
  departDate: z.date({
    required_error: "Departure date is required",
  }),
  arriveDate: z.date({
    required_error: "Return date is required",
  }),
  stops: z.enum(["direct", "1", "2"]),
  airline: z.string().min(1, "Airline is required"),
});
