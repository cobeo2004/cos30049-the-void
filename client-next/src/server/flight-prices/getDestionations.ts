"use server";

import { authAction } from "@/lib/actionClient";
import { getDestinationsByRegionNameSchema } from "./schema";
import { API_URL } from "@/lib/constant";
import { authFetch } from "@/lib/authFetch";

export type GetDestinationsByRegionNameReturnValue = {
  country_code: string;
  region_name: string;
  iata: string;
  icao: string;
  airport: string;
  latitude: number;
  longitude: number;
};

export const getDestinationsByRegionName = authAction
  .schema(getDestinationsByRegionNameSchema)
  .action(async ({ parsedInput, ctx }) => {
    try {
      const destinations = await authFetch<
        Array<GetDestinationsByRegionNameReturnValue>
      >(`${API_URL}/flight-prices/destinations/search?q=${parsedInput.q}`, {
        options: {
          method: "GET",
        },
        ctx,
      });
      return destinations;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  });
