"use server";

import { authAction } from "@/lib/actionClient";
import { Flight } from "@/types";
export const fetchFlights = authAction.action(async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          airline: "Vietnam Airlines",
          route: "Ho Chi Minh City - Hanoi",
          date: "25 February 2024 - 28 February 2024",
          price: "$750 AUD",
          source: "SkyScanner",
        },
        {
          id: "2",
          airline: "Vietnam Airlines",
          route: "Ho Chi Minh City - Hanoi",
          date: "25 February 2024 - 28 February 2024",
          price: "$720 AUD",
          source: "SkyScanner",
        },
        {
          id: "3",
          airline: "Vietnam Airlines",
          route: "Ho Chi Minh City - Hanoi",
          date: "25 February 2024 - 28 February 2024",
          price: "$690 AUD",
          source: "SkyScanner",
        },
        {
          id: "4",
          airline: "Vietnam Airlines",
          route: "Ho Chi Minh City - Hanoi",
          date: "25 February 2024 - 28 February 2024",
          price: "$780 AUD",
          source: "SkyScanner",
        },
      ]);
    }, 2000);
  }) as Promise<Flight[]>;
});
