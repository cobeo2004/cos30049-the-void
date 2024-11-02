"use server";

import { authAction } from "@/lib/actionClient";
import { authFetch } from "@/lib/authFetch";
import { API_URL } from "@/lib/constant";

export const getAllAirlines = authAction.action(async ({ ctx }) => {
  const res = await authFetch<Array<string>>(
    `${API_URL}/flight-prices/airlines`,
    {
      options: {
        headers: {
          "Content-Type": "application/json",
        },
      },
      ctx,
    }
  );
  return res;
});
