import { flightInformationsSearchMenuSchema } from "@/server/flight-informations/schema";
import { flightPricesSearchMenuSchema } from "@/server/flight-prices/schema";
import { z } from "zod";

export const processFlightPricesURLParams = (
  values: z.infer<typeof flightPricesSearchMenuSchema>
) => {
  const {
    tripType,
    from,
    to,
    departDate,
    returnDate,
    adults,
    children,
    infants,
  } = values;
  const retDate = tripType === "round" ? returnDate : "None";
  const adultsCount = adults.split(" ")[0];
  const childrenCount = children.split(" ")[0];
  const infantsCount = infants.split(" ")[0];
  return `tripType=${tripType}&fromAirport=${from.airport}&fromIATA=${from.iata}&toAirport=${to.airport}&toIATA=${to.iata}&departDate=${departDate}&returnDate=${retDate}&adults=${adultsCount}&children=${childrenCount}&infants=${infantsCount}`;
};

export const processFlightInformationsURLParams = (
  values: z.infer<typeof flightInformationsSearchMenuSchema>
) => {
  const { from, to, departDate, arriveDate, stops, airline } = values;
  return `fromAirport=${from.airport}&fromIATA=${from.iata}&toAirport=${to.airport}&toIATA=${to.iata}&departDate=${departDate}&arriveDate=${arriveDate}&stops=${stops}&airline=${airline}`;
};
