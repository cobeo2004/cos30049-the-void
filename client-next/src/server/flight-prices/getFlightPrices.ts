"use server";

import { authAction } from "@/lib/actionClient";
import { type SerpResponse } from "@/types";
import { flightPricesSearchMenuSchema } from "./schema";
import { authFetch } from "@/lib/authFetch";
import { API_URL } from "@/lib/constant";
import exampleResponse from "@/data/example_serp.json";

export const getFlightPrices = authAction
  .schema(flightPricesSearchMenuSchema)
  .action(async ({ parsedInput, ctx }) => {
    try {
      const {
        tripType,
        from,
        to,
        departDate,
        returnDate,
        adults,
        children,
        infants,
      } = parsedInput;
      const body =
        tripType === "round" && returnDate !== undefined
          ? {
              trip_type: tripType,
              departure_id: from.iata,
              arrival_id: to.iata,
              outbound_date: departDate.toISOString().split("T")[0],
              return_date: returnDate?.toISOString().split("T")[0],
              currency: "AUD",
              adults,
              children,
              infants_on_lap: infants,
            }
          : {
              trip_type: tripType,
              departure_id: from.iata,
              arrival_id: to.iata,
              outbound_date: departDate.toISOString().split("T")[0],
              currency: "AUD",
              adults,
              children,
              infants_on_lap: infants,
            };

      return await authFetch<SerpResponse>(`${API_URL}/flight-prices`, {
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
        ctx,
      });

      // return Promise.resolve(exampleResponse as unknown as SerpResponse);
    } catch (err) {
      throw new Error((err as Error).message);
    }
  });
